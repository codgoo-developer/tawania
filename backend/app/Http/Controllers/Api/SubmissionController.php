<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Submission;
use App\Models\GeneralAssemblyMember;
use Illuminate\Http\Request;

require_once dirname(__DIR__, 3) . '/Helpers/ApiResponseHelper.php';

class SubmissionController extends Controller
{
    public function index(Request $request)
    {
        $query = Submission::query();

        if ($request->has('module') && $request->module !== 'all') {
            $query->where('module', $request->module);
        }

        $submissions = $query->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $submissions,
            'counts' => [
                'total' => Submission::count(),
                'contact_message' => Submission::where('module', 'contact_message')->count(),
                'whistleblowing' => Submission::where('module', 'whistleblowing')->count(),
                'survey' => Submission::where('module', 'survey')->count(),
                'membership' => Submission::where('module', 'membership')->count(),
            ]
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $senderName = $data['senderName'] ?? $data['sender_name'] ?? 'مستخدم مجهول';
        $senderContact = $data['senderContact'] ?? $data['sender_contact'] ?? 'غير محدد';
        $title = $data['title'] ?? 'رسالة تواصل جديدة';
        $details = $data['details'] ?? '';
        $module = $data['module'] ?? 'contact_message';
        $status = $data['status'] ?? 'pending';

        $codePrefix = match($module) {
            'whistleblowing' => 'WB-',
            'survey' => 'SURV-',
            'membership' => 'SHM-',
            'contact_message' => 'CNT-',
            default => 'MSG-'
        };

        $submission = Submission::create([
            'submission_code' => $codePrefix . rand(100000, 999999),
            'module' => $module,
            'sender_name' => $senderName,
            'sender_contact' => $senderContact,
            'title' => $title,
            'details' => $details,
            'json_data' => $data['jsonData'] ?? $data['json_data'] ?? null,
            'status' => $status,
        ]);

        return api_response(true, 'تم استلام رسالتكم بنجاح', $submission, 201);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate(['status' => 'required|string']);
        $cleanId = preg_replace('/[^0-9]/', '', (string)$id);
        $submission = Submission::find($cleanId ?: $id);
        
        if (!$submission) {
            return api_response(false, 'الطلب غير موجود', null, 404);
        }

        $submission->status = $request->status;
        $submission->save();

        return api_response(true, 'تم تحديث حالة الرسالة/الطلب بنجاح', $submission);
    }

    public function confirmMembership(Request $request, $id)
    {
        $cleanId = preg_replace('/[^0-9]/', '', (string)$id);
        $submission = Submission::find($cleanId ?: $id);

        if (!$submission) {
            return api_response(false, 'طلب العضوية غير موجود', null, 404);
        }

        $submission->status = 'resolved';
        $submission->save();

        // Extract shares count from title / details
        $sharesCount = 50;
        if (preg_match('/(d+)s*سهم/', $submission->title, $m)) {
            $sharesCount = (int)$m[1];
        } elseif (preg_match('/عدد الأسهم[^d]*(d+)/', $submission->details, $dm)) {
            $sharesCount = (int)$dm[1];
        }

        // Extract national ID
        $nationalId = null;
        if (preg_match('/الهوية:s*(d+)/', $submission->sender_contact, $nm)) {
            $nationalId = $nm[1];
        }

        // Extract phone
        $phone = null;
        if (preg_match('/(05d{8})/', $submission->sender_contact, $pm)) {
            $phone = $pm[1];
        }

        // Extract city from address if mentioned
        $city = 'جدة';
        if (preg_match('/العنوان السكني:s*([^
•]+)/', $submission->details, $cm)) {
            $city = trim($cm[1]);
        }

        // Check if member already exists in General Assembly
        $existing = GeneralAssemblyMember::where('name', $submission->sender_name)->first();
        if (!$existing) {
            $existing = GeneralAssemblyMember::create([
                'name' => $submission->sender_name,
                'name_en' => null,
                'shares_count' => $sharesCount,
                'join_year' => '1446',
                'city' => $city,
                'phone' => $phone,
                'national_id' => $nationalId,
                'status' => 'approved',
            ]);
        }

        return api_response(true, 'تم اعتماد طلب العضوية وإضافة العضو بنجاح إلى سجل الجمعية العمومية!', [
            'submission' => $submission,
            'member' => $existing
        ]);
    }

    public function destroy($id)
    {
        $cleanId = preg_replace('/[^0-9]/', '', (string)$id);
        $submission = Submission::find($cleanId ?: $id);
        if ($submission) {
            $submission->delete();
            return api_response(true, 'تم حذف الرسالة بنجاح');
        }
        return api_response(true, 'تم حذف الرسالة بنجاح');
    }
}
