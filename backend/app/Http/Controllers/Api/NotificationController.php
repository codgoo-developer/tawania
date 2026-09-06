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

        if ($request->has('module') && $request->module !== 'all' && !empty($request->module)) {
            $query->where('module', $request->module);
        }

        if ($request->boolean('unread_only') || $request->get('filter') === 'unread') {
            $query->whereIn('status', ['pending', 'unread', 'new']);
        }

        $submissions = $query->take(100)->get();

        $notifications = $submissions->map(function ($sub) {
            $isUnread = in_array(strtolower($sub->status ?: 'pending'), ['pending', 'unread', 'new']);
            
            // Map module to friendly title and tab
            $moduleInfo = match($sub->module) {
                'whistleblowing' => [
                    'category' => 'whistleblowing',
                    'titleAr' => 'بلاغ أو شكوى حوكمة جديدة',
                    'titleEn' => 'New Whistleblowing / Complaint',
                    'targetTab' => 'submissions',
                    'icon' => 'alert-triangle',
                    'badgeColor' => 'amber'
                ],
                'membership' => [
                    'category' => 'membership',
                    'titleAr' => 'طلب انضمام جديد للجمعية العمومية',
                    'titleEn' => 'New Membership Application',
                    'targetTab' => 'membership-requests',
                    'icon' => 'user-plus',
                    'badgeColor' => 'emerald'
                ],
                'survey' => [
                    'category' => 'survey',
                    'titleAr' => 'مشاركة جديدة في استبيان قياس الرضا',
                    'titleEn' => 'New Survey Submission',
                    'targetTab' => 'submissions',
                    'icon' => 'smile',
                    'badgeColor' => 'purple'
                ],
                'feedback' => [
                    'category' => 'feedback',
                    'titleAr' => 'مقترح أو ملاحظة واردة جديدة',
                    'titleEn' => 'New Feedback / Suggestion',
                    'targetTab' => 'submissions',
                    'icon' => 'message-square',
                    'badgeColor' => 'indigo'
                ],
                'contact_message' => [
                    'category' => 'contact_message',
                    'titleAr' => 'رسالة تواصل واردة جديدة',
                    'titleEn' => 'New Contact Message',
                    'targetTab' => 'submissions',
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

            // Format human Arabic relative time
            $diffMinutes = $createdAt->diffInMinutes(Carbon::now());
            $diffHours = $createdAt->diffInHours(Carbon::now());
            $diffDays = $createdAt->diffInDays(Carbon::now());

            if ($diffMinutes < 2) {
                $arabicTimeAgo = 'الآن';
            } elseif ($diffMinutes < 60) {
                $arabicTimeAgo = "منذ {$diffMinutes} دقيقة";
            } elseif ($diffHours < 24) {
                $arabicTimeAgo = "منذ {$diffHours} ساعة";
            } elseif ($diffDays == 1) {
                $arabicTimeAgo = 'أمس ' . $createdAt->format('h:i A');
            } elseif ($diffDays < 7) {
                $arabicTimeAgo = "منذ {$diffDays} أيام";
            } else {
                $arabicTimeAgo = $createdAt->format('Y/m/d');
            }

            return [
                'id' => (string)$sub->id,
                'code' => $sub->submission_code ?: ('SUB-' . $sub->id),
                'module' => $sub->module ?: 'contact_message',
                'category' => $moduleInfo['category'],
                'title' => $sub->title ?: $moduleInfo['titleAr'],
                'titleAr' => $sub->title ?: $moduleInfo['titleAr'],
                'titleEn' => $moduleInfo['titleEn'],
                'message' => $sub->details ?: ($sub->sender_name ? 'وارد من: ' . $sub->sender_name : 'رسالة جديدة'),
                'senderName' => $sub->sender_name ?: 'زائر / مستخدم',
                'senderContact' => $sub->sender_contact ?: '',
                'targetTab' => $moduleInfo['targetTab'],
                'icon' => $moduleInfo['icon'],
                'badgeColor' => $moduleInfo['badgeColor'],
                'status' => $sub->status ?: 'pending',
                'isRead' => !$isUnread,
                'timeAgo' => $arabicTimeAgo,
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
                'total' => $notifications->count(),
                'whistleblowing' => $notifications->where('module', 'whistleblowing')->count(),
                'membership' => $notifications->where('module', 'membership')->count(),
                'survey' => $notifications->where('module', 'survey')->count(),
                'feedback' => $notifications->where('module', 'feedback')->count(),
                'contact' => $notifications->where('module', 'contact_message')->count(),
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
        if (in_array(strtolower($submission->status ?: 'pending'), ['pending', 'unread', 'new'])) {
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
        Submission::whereIn('status', ['pending', 'unread', 'new', null])
            ->orWhereNull('status')
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
