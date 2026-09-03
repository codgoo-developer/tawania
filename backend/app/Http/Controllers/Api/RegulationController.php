<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\RegulationItem;
use App\Helpers\FileUploadHelper;
use Illuminate\Http\Request;

require_once dirname(__DIR__, 3) . '/Helpers/ApiResponseHelper.php';
require_once dirname(__DIR__, 3) . '/Helpers/FileUploadHelper.php';

class RegulationController extends Controller
{
    public function index(Request $request)
    {
        $query = RegulationItem::query();

        if ($request->has('sec') && !empty($request->sec) && $request->sec !== 'all') {
            $query->where('sec', $request->sec);
        }

        $regulations = $query->orderBy('id', 'asc')->get();

        return response()->json([
            'success' => true,
            'data' => $regulations,
            'counts' => [
                'total' => RegulationItem::count(),
                'foundation' => RegulationItem::where('sec', 'foundation')->count(),
                'financial' => RegulationItem::where('sec', 'financial')->count(),
                'laws' => RegulationItem::where('sec', 'laws')->count(),
            ]
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        $rawFile = $data['fileUrl'] ?? $data['file_url'] ?? $data['pdfUrl'] ?? null;
        $savedUrl = FileUploadHelper::saveBase64File($rawFile, 'documents', 'reg');

        $mapped = [
            'slug_id' => $data['slug_id'] ?? $data['slugId'] ?? $data['id'] ?? 'reg-' . time(),
            'sec' => $data['sec'] ?? 'foundation',
            'title_ar' => $data['titleAr'] ?? $data['title_ar'] ?? '',
            'title_en' => $data['titleEn'] ?? $data['title_en'] ?? null,
            'type' => $data['type'] ?? 'لائحة تنظيمية',
            'num' => $data['num'] ?? ('REG-' . rand(100, 999)),
            'desc_ar' => $data['descAr'] ?? $data['desc_ar'] ?? $data['descriptionAr'] ?? '',
            'desc_en' => $data['descEn'] ?? $data['desc_en'] ?? null,
            'file_size' => $data['fileSize'] ?? $data['file_size'] ?? '2.5 MB',
            'file_url' => $savedUrl,
        ];

        $reg = RegulationItem::create($mapped);

        return api_response(true, 'تمت إضافة اللائحة بنجاح', $reg, 201);
    }

    public function update(Request $request, $id)
    {
        $reg = RegulationItem::where('slug_id', $id)->first();
        if (!$reg && is_numeric($id)) $reg = RegulationItem::find($id);
        if (!$reg) $reg = RegulationItem::where('id', $id)->first();
        if (!$reg) $reg = RegulationItem::where('num', $id)->first();

        if (!$reg) {
            return api_response(false, 'اللائحة غير موجودة', null, 404);
        }

        $data = $request->all();
        if (isset($data['sec'])) $reg->sec = $data['sec'];
        if (isset($data['titleAr']) || isset($data['title_ar'])) $reg->title_ar = $data['titleAr'] ?? $data['title_ar'];
        if (isset($data['titleEn']) || isset($data['title_en'])) $reg->title_en = $data['titleEn'] ?? $data['title_en'];
        if (isset($data['type'])) $reg->type = $data['type'];
        if (isset($data['num'])) $reg->num = $data['num'];
        if (isset($data['descAr']) || isset($data['desc_ar']) || isset($data['descriptionAr'])) {
            $reg->desc_ar = $data['descAr'] ?? $data['desc_ar'] ?? $data['descriptionAr'];
        }
        if (isset($data['descEn']) || isset($data['desc_en'])) $reg->desc_en = $data['descEn'] ?? $data['desc_en'];
        if (isset($data['fileSize']) || isset($data['file_size'])) $reg->file_size = $data['fileSize'] ?? $data['file_size'];
        
        if (isset($data['fileUrl']) || isset($data['file_url']) || isset($data['pdfUrl'])) {
            $rawFile = $data['fileUrl'] ?? $data['file_url'] ?? $data['pdfUrl'];
            $savedUrl = FileUploadHelper::saveBase64File($rawFile, 'documents', 'reg-' . ($reg->slug_id ?: $reg->id));
            $reg->file_url = $savedUrl;
        }

        $reg->save();

        return api_response(true, 'تم تحديث بيانات اللائحة بنجاح', $reg);
    }

    public function destroy($id)
    {
        $reg = RegulationItem::where('slug_id', $id)->first();
        if (!$reg && is_numeric($id)) $reg = RegulationItem::find($id);
        if (!$reg) $reg = RegulationItem::where('id', $id)->first();
        if (!$reg) $reg = RegulationItem::where('num', $id)->first();

        if ($reg) {
            $reg->delete();
            return api_response(true, 'تم حذف اللائحة بنجاح');
        }

        return api_response(true, 'تم الحذف بنجاح');
    }
}
