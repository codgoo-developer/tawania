<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Submission;
use Illuminate\Http\Request;
use Carbon\Carbon;

require_once dirname(__DIR__, 3) . '/Helpers/ApiResponseHelper.php';

class NotificationController extends Controller
{
    /**
     * Get all notifications aggregated from submissions & system events
     */
    public function index(Request $request)
    {
        $query = Submission::query()->orderBy('created_at', 'desc');

        if ($request->has('module') && $request->module !== 'all') {
            $query->where('module', $request->module);
        }

        $submissions = $query->take(50)->get();

        $notifications = $submissions->map(function ($sub) {
            $isUnread = in_array(strtolower($sub->status), ['pending', 'unread', 'new']);
            
            // Map module to friendly title and tab
            $moduleInfo = match($sub->module) {
                'whistleblowing' => [
                    'category' => 'whistleblowing',
                    'titleAr' => 'بلاغ أو شكوى حوكمة جديدة',
                    'titleEn' => 'New Whistleblowing / Complaint',
                    'targetTab' => 'complaints',
                    'icon' => 'alert-triangle',
                    'badgeColor' => 'amber'
                ],
                'membership' => [
                    'category' => 'membership',
                    'titleAr' => 'طلب انضمام للجمعية العمومية',
                    'titleEn' => 'New Membership Application',
                    'targetTab' => 'membership-requests',
                    'icon' => 'user-plus',
                    'badgeColor' => 'emerald'
                ],
                'survey' => [
                    'category' => 'survey',
                    'titleAr' => 'مشاركة جديدة في استبيان رضا المستفيدين',
                    'titleEn' => 'New Survey Submission',
                    'targetTab' => 'feedback-surveys',
                    'icon' => 'smile',
                    'badgeColor' => 'purple'
                ],
                'contact_message' => [
                    'category' => 'contact_message',
                    'titleAr' => 'رسالة تواصل واردة جديدة',
                    'titleEn' => 'New Contact Message',
                    'targetTab' => 'overview',
                    'icon' => 'mail',
                    'badgeColor' => 'blue'
                ],
                default => [
                    'category' => 'general',
                    'titleAr' => 'إشعار نظام جديد',
                    'titleEn' => 'System Notification',
                    'targetTab' => 'overview',
                    'icon' => 'bell',
                    'badgeColor' => 'gray'
                ]
            };

            $createdAt = $sub->created_at ? Carbon::parse($sub->created_at) : Carbon::now();

            return [
                'id' => (string)$sub->id,
                'code' => $sub->submission_code ?: ('SUB-' . $sub->id),
                'module' => $sub->module,
                'category' => $moduleInfo['category'],
                'title' => $sub->title ?: $moduleInfo['titleAr'],
                'titleAr' => $moduleInfo['titleAr'],
                'titleEn' => $moduleInfo['titleEn'],
                'message' => $sub->details ?: ($sub->sender_name ? 'وارد من: ' . $sub->sender_name : ''),
                'senderName' => $sub->sender_name ?: 'زائر مجهول',
                'senderContact' => $sub->sender_contact ?: '',
                'targetTab' => $moduleInfo['targetTab'],
                'icon' => $moduleInfo['icon'],
                'badgeColor' => $moduleInfo['badgeColor'],
                'status' => $sub->status,
                'isRead' => !$isUnread,
                'timeAgo' => $createdAt->diffForHumans(),
                'createdAt' => $createdAt->format('Y-m-d H:i'),
                'rawCreatedAt' => $createdAt->toISOString(),
            ];
        });

        $unreadCount = $notifications->where('isRead', false)->count();

        return response()->json([
            'success' => true,
            'data' => $notifications->values(),
            'unreadCount' => $unreadCount,
            'totalCount' => $notifications->count(),
            'counts' => [
                'unread' => $unreadCount,
                'whistleblowing' => $notifications->where('module', 'whistleblowing')->where('isRead', false)->count(),
                'membership' => $notifications->where('module', 'membership')->where('isRead', false)->count(),
                'survey' => $notifications->where('module', 'survey')->where('isRead', false)->count(),
                'contact' => $notifications->where('module', 'contact_message')->where('isRead', false)->count(),
            ]
        ]);
    }

    /**
     * Mark single notification as read
     */
    public function markAsRead(Request $request, $id)
    {
        $cleanId = preg_replace('/[^0-9]/', '', (string)$id);
        $submission = Submission::find($cleanId ?: $id);

        if (!$submission) {
            return api_response(false, 'الإشعار غير موجود', null, 404);
        }

        // If it's pending, update status to reviewed / read
        if (in_array(strtolower($submission->status), ['pending', 'unread', 'new'])) {
            $submission->status = 'reviewed';
            $submission->save();
        }

        return api_response(true, 'تم تحديد الإشعار كمقروء بنجاح', [
            'id' => (string)$submission->id,
            'status' => $submission->status,
            'isRead' => true
        ]);
    }

    /**
     * Mark all notifications as read
     */
    public function markAllAsRead(Request $request)
    {
        Submission::whereIn('status', ['pending', 'unread', 'new'])
            ->update(['status' => 'reviewed']);

        return api_response(true, 'تم تحديد جميع الإشعارات كمقروءة بنجاح');
    }

    /**
     * Delete notification
     */
    public function destroy($id)
    {
        $cleanId = preg_replace('/[^0-9]/', '', (string)$id);
        $submission = Submission::find($cleanId ?: $id);

        if ($submission) {
            $submission->delete();
            return api_response(true, 'تم حذف الإشعار بنجاح');
        }

        return api_response(true, 'تم حذف الإشعار بنجاح');
    }
}
