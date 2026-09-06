<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Helpers\FileUploadHelper;
use App\Models\Meeting;
use Illuminate\Http\Request;

require_once dirname(__DIR__, 3) . '/Helpers/ApiResponseHelper.php';
require_once dirname(__DIR__, 3) . '/Helpers/FileUploadHelper.php';

class MeetingController extends Controller
{
    public function index(Request $request)
    {
        $query = Meeting::query();

        if ($request->has('type') && !empty($request->type) && $request->type !== 'all') {
            $type = $request->type;
            if ($type === 'assembly' || $type === 'general-assembly') {
                $query->whereIn('type', ['general_assembly', 'assembly', 'general-assembly']);
            } else {
                $query->where('type', $type);
            }
        }

        $meetings = $query->orderBy('id', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $meetings,
            'counts' => [
                'total' => Meeting::count(),
                'general_assembly' => Meeting::whereIn('type', ['general_assembly', 'assembly', 'general-assembly'])->count(),
                'board' => Meeting::where('type', 'board')->count(),
            ]
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $rawType = $data['type'] ?? 'general_assembly';
        $type = ($rawType === 'board') ? 'board' : 'general_assembly';
        $prefix = $type === 'board' ? 'bm' : 'ga';
        $year = date('Y');

        $rawFile = $data['fileUrl'] ?? $data['file_url'] ?? $data['pdfUrl'] ?? null;
        $fileUrl = FileUploadHelper::saveBase64File($rawFile, 'meetings', 'meet');

        $mapped = [
            'slug_id' => $data['slug_id'] ?? $data['slugId'] ?? $data['id'] ?? "{$prefix}-{$year}-" . rand(10, 99),
            'type' => $type,
            'title_ar' => $data['titleAr'] ?? $data['title_ar'] ?? '',
            'title_en' => $data['titleEn'] ?? $data['title_en'] ?? null,
            'meeting_number' => $data['meetingNumber'] ?? $data['meeting_number'] ?? ($type === 'board' ? 'BM-' . rand(100, 999) : 'GA-' . rand(100, 999)),
            'date_ar' => $data['dateAr'] ?? $data['date_ar'] ?? $data['date'] ?? date('Y-m-d'),
            'date_en' => $data['dateEn'] ?? $data['date_en'] ?? null,
            'location_ar' => $data['locationAr'] ?? $data['location_ar'] ?? 'المقر الرئيسي للجمعية',
            'location_en' => $data['locationEn'] ?? $data['location_en'] ?? 'Main Headquarters',
            'attendees_count' => (int)($data['attendeesCount'] ?? $data['attendees_count'] ?? 0),
            'decisions_count' => (int)($data['decisionsCount'] ?? $data['decisions_count'] ?? 0),
            'desc_ar' => $data['descAr'] ?? $data['desc_ar'] ?? $data['descriptionAr'] ?? '',
            'desc_en' => $data['descEn'] ?? $data['desc_en'] ?? null,
            'file_size' => $data['fileSize'] ?? $data['file_size'] ?? '2.0 MB',
            'file_url' => $fileUrl,
        ];

        $meeting = Meeting::create($mapped);

        return api_response(true, 'تمت إضافة محضر الاجتماع بنجاح', $meeting, 201);
    }

    public function update(Request $request, $id)
    {
        $meeting = Meeting::where('slug_id', $id)->first();
        if (!$meeting && is_numeric($id)) {
            $meeting = Meeting::find($id);
        }
        if (!$meeting) {
            $meeting = Meeting::where('id', $id)->first();
        }
        if (!$meeting) {
            $meeting = Meeting::where('meeting_number', $id)->first();
        }

        if (!$meeting) {
            return api_response(false, 'محضر الاجتماع غير موجود', null, 404);
        }

        $data = $request->all();
        if (isset($data['type'])) {
            $rawType = $data['type'];
            $meeting->type = ($rawType === 'board') ? 'board' : 'general_assembly';
        }
        if (isset($data['titleAr']) || isset($data['title_ar'])) $meeting->title_ar = $data['titleAr'] ?? $data['title_ar'];
        if (isset($data['titleEn']) || isset($data['title_en'])) $meeting->title_en = $data['titleEn'] ?? $data['title_en'];
        if (isset($data['meetingNumber']) || isset($data['meeting_number'])) $meeting->meeting_number = $data['meetingNumber'] ?? $data['meeting_number'];
        if (isset($data['dateAr']) || isset($data['date_ar']) || isset($data['date'])) {
            $meeting->date_ar = $data['dateAr'] ?? $data['date_ar'] ?? $data['date'];
        }
        if (isset($data['dateEn']) || isset($data['date_en'])) $meeting->date_en = $data['dateEn'] ?? $data['date_en'];
        if (isset($data['locationAr']) || isset($data['location_ar'])) $meeting->location_ar = $data['locationAr'] ?? $data['location_ar'];
        if (isset($data['locationEn']) || isset($data['location_en'])) $meeting->location_en = $data['locationEn'] ?? $data['location_en'];
        if (isset($data['attendeesCount']) || isset($data['attendees_count'])) $meeting->attendees_count = (int)($data['attendeesCount'] ?? $data['attendees_count']);
        if (isset($data['decisionsCount']) || isset($data['decisions_count'])) $meeting->decisions_count = (int)($data['decisionsCount'] ?? $data['decisions_count']);
        if (isset($data['descAr']) || isset($data['desc_ar']) || isset($data['descriptionAr'])) {
            $meeting->desc_ar = $data['descAr'] ?? $data['desc_ar'] ?? $data['descriptionAr'];
        }
        if (isset($data['descEn']) || isset($data['desc_en'])) $meeting->desc_en = $data['descEn'] ?? $data['desc_en'];
        if (isset($data['fileSize']) || isset($data['file_size'])) $meeting->file_size = $data['fileSize'] ?? $data['file_size'];
        if (isset($data['fileUrl']) || isset($data['file_url']) || isset($data['pdfUrl'])) {
            $rawFile = $data['fileUrl'] ?? $data['file_url'] ?? $data['pdfUrl'];
            $meeting->file_url = FileUploadHelper::saveBase64File($rawFile, 'meetings', 'meet');
        }

        $meeting->save();

        return api_response(true, 'تم تحديث بيانات محضر الاجتماع بنجاح', $meeting);
    }

    public function destroy($id)
    {
        $meeting = Meeting::where('slug_id', $id)->first();
        if (!$meeting && is_numeric($id)) {
            $meeting = Meeting::find($id);
        }
        if (!$meeting) {
            $meeting = Meeting::where('id', $id)->first();
        }

        if ($meeting) {
            $meeting->delete();
            return api_response(true, 'تم حذف محضر الاجتماع بنجاح');
        }

        return api_response(true, 'تم حذف محضر الاجتماع بنجاح');
    }
}
