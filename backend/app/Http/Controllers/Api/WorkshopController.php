<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Helpers\FileUploadHelper;
use App\Models\WorkshopItem;
use Illuminate\Http\Request;

require_once dirname(__DIR__, 3) . '/Helpers/ApiResponseHelper.php';
require_once dirname(__DIR__, 3) . '/Helpers/FileUploadHelper.php';

class WorkshopController extends Controller
{
    public function index(Request $request)
    {
        $query = WorkshopItem::query();

        if ($request->has('type') && !empty($request->type) && $request->type !== 'all') {
            $query->where('type', $request->type);
        }

        $workshops = $query->orderBy('id', 'asc')->get();

        return response()->json([
            'success' => true,
            'data' => $workshops,
            'counts' => [
                'total' => WorkshopItem::count(),
                'internal' => WorkshopItem::where('type', 'internal')->count(),
                'community' => WorkshopItem::where('type', 'community')->count(),
            ]
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        $rawFile = $data['fileUrl'] ?? $data['file_url'] ?? $data['pdfUrl'] ?? null;
        $fileUrl = FileUploadHelper::saveBase64File($rawFile, 'workshops', 'wkp');

        $mapped = [
            'slug_id' => $data['slug_id'] ?? $data['slugId'] ?? $data['id'] ?? 'wkp-' . time(),
            'type' => $data['type'] ?? 'internal',
            'title_ar' => $data['titleAr'] ?? $data['title_ar'] ?? '',
            'title_en' => $data['titleEn'] ?? $data['title_en'] ?? null,
            'date_ar' => $data['dateAr'] ?? $data['date_ar'] ?? $data['date'] ?? '',
            'date_en' => $data['dateEn'] ?? $data['date_en'] ?? null,
            'location_ar' => $data['locationAr'] ?? $data['location_ar'] ?? 'المقر الرئيسي للجمعية',
            'location_en' => $data['locationEn'] ?? $data['location_en'] ?? null,
            'attendees_count' => (int)($data['attendeesCount'] ?? $data['attendees_count'] ?? 30),
            'hours_count' => (int)($data['hoursCount'] ?? $data['hours_count'] ?? 4),
            'target_audience_ar' => $data['targetAudienceAr'] ?? $data['target_audience_ar'] ?? 'منسوبو الجمعية والشركاء',
            'target_audience_en' => $data['targetAudienceEn'] ?? $data['target_audience_en'] ?? null,
            'trainer_ar' => $data['trainerAr'] ?? $data['trainer_ar'] ?? 'مستشار الحوكمة والتدريب',
            'trainer_en' => $data['trainerEn'] ?? $data['trainer_en'] ?? null,
            'desc_ar' => $data['descAr'] ?? $data['desc_ar'] ?? $data['descriptionAr'] ?? '',
            'desc_en' => $data['descEn'] ?? $data['desc_en'] ?? null,
            'objectives_ar' => isset($data['objectivesAr']) ? (is_array($data['objectivesAr']) ? json_encode($data['objectivesAr'], JSON_UNESCAPED_UNICODE) : $data['objectivesAr']) : null,
            'objectives_en' => isset($data['objectivesEn']) ? (is_array($data['objectivesEn']) ? json_encode($data['objectivesEn'], JSON_UNESCAPED_UNICODE) : $data['objectivesEn']) : null,
            'file_size' => $data['fileSize'] ?? $data['file_size'] ?? '3.5 MB',
            'file_url' => $fileUrl,
        ];

        $wkp = WorkshopItem::create($mapped);

        return api_response(true, 'تمت إضافة الورشة بنجاح', $wkp, 201);
    }

    public function update(Request $request, $id)
    {
        $wkp = WorkshopItem::where('slug_id', $id)->first();
        if (!$wkp && is_numeric($id)) $wkp = WorkshopItem::find($id);
        if (!$wkp) $wkp = WorkshopItem::where('id', $id)->first();

        if (!$wkp) {
            return api_response(false, 'الورشة غير موجودة', null, 404);
        }

        $data = $request->all();
        if (isset($data['type'])) $wkp->type = $data['type'];
        if (isset($data['titleAr']) || isset($data['title_ar'])) $wkp->title_ar = $data['titleAr'] ?? $data['title_ar'];
        if (isset($data['titleEn']) || isset($data['title_en'])) $wkp->title_en = $data['titleEn'] ?? $data['title_en'];
        if (isset($data['dateAr']) || isset($data['date_ar']) || isset($data['date'])) {
            $wkp->date_ar = $data['dateAr'] ?? $data['date_ar'] ?? $data['date'];
        }
        if (isset($data['dateEn']) || isset($data['date_en'])) $wkp->date_en = $data['dateEn'] ?? $data['date_en'];
        if (isset($data['locationAr']) || isset($data['location_ar'])) $wkp->location_ar = $data['locationAr'] ?? $data['location_ar'];
        if (isset($data['locationEn']) || isset($data['location_en'])) $wkp->location_en = $data['locationEn'] ?? $data['location_en'];
        if (isset($data['attendeesCount']) || isset($data['attendees_count'])) {
            $wkp->attendees_count = (int)($data['attendeesCount'] ?? $data['attendees_count']);
        }
        if (isset($data['hoursCount']) || isset($data['hours_count'])) {
            $wkp->hours_count = (int)($data['hoursCount'] ?? $data['hours_count']);
        }
        if (isset($data['targetAudienceAr']) || isset($data['target_audience_ar'])) {
            $wkp->target_audience_ar = $data['targetAudienceAr'] ?? $data['target_audience_ar'];
        }
        if (isset($data['targetAudienceEn']) || isset($data['target_audience_en'])) {
            $wkp->target_audience_en = $data['targetAudienceEn'] ?? $data['target_audience_en'];
        }
        if (isset($data['trainerAr']) || isset($data['trainer_ar'])) {
            $wkp->trainer_ar = $data['trainerAr'] ?? $data['trainer_ar'];
        }
        if (isset($data['trainerEn']) || isset($data['trainer_en'])) {
            $wkp->trainer_en = $data['trainerEn'] ?? $data['trainer_en'];
        }
        if (isset($data['descAr']) || isset($data['desc_ar']) || isset($data['descriptionAr'])) {
            $wkp->desc_ar = $data['descAr'] ?? $data['desc_ar'] ?? $data['descriptionAr'];
        }
        if (isset($data['descEn']) || isset($data['desc_en'])) $wkp->desc_en = $data['descEn'] ?? $data['desc_en'];
        if (isset($data['objectivesAr'])) {
            $wkp->objectives_ar = is_array($data['objectivesAr']) ? json_encode($data['objectivesAr'], JSON_UNESCAPED_UNICODE) : $data['objectivesAr'];
        }
        if (isset($data['objectivesEn'])) {
            $wkp->objectives_en = is_array($data['objectivesEn']) ? json_encode($data['objectivesEn'], JSON_UNESCAPED_UNICODE) : $data['objectivesEn'];
        }
        if (isset($data['fileSize']) || isset($data['file_size'])) $wkp->file_size = $data['fileSize'] ?? $data['file_size'];
        if (isset($data['fileUrl']) || isset($data['file_url']) || isset($data['pdfUrl'])) {
            $rawFile = $data['fileUrl'] ?? $data['file_url'] ?? $data['pdfUrl'];
            $wkp->file_url = FileUploadHelper::saveBase64File($rawFile, 'workshops', 'wkp');
        }

        $wkp->save();

        return api_response(true, 'تم تحديث بيانات الورشة بنجاح', $wkp);
    }

    public function destroy($id)
    {
        $wkp = WorkshopItem::where('slug_id', $id)->first();
        if (!$wkp && is_numeric($id)) $wkp = WorkshopItem::find($id);
        if (!$wkp) $wkp = WorkshopItem::where('id', $id)->first();

        if ($wkp) {
            $wkp->delete();
            return api_response(true, 'تم حذف الورشة بنجاح');
        }

        return api_response(true, 'تم الحذف بنجاح');
    }
}
