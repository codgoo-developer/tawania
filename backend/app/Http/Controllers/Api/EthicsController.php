<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Helpers\FileUploadHelper;
use App\Models\EthicsItem;
use Illuminate\Http\Request;

require_once dirname(__DIR__, 3) . '/Helpers/ApiResponseHelper.php';
require_once dirname(__DIR__, 3) . '/Helpers/FileUploadHelper.php';

class EthicsController extends Controller
{
    public function index()
    {
        $ethics = EthicsItem::orderBy('num', 'asc')->orderBy('id', 'asc')->get();

        return response()->json([
            'success' => true,
            'data' => $ethics,
            'count' => $ethics->count(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $nextNum = EthicsItem::max('num') + 1;

        $rawFile = $data['fileUrl'] ?? $data['file_url'] ?? $data['pdfUrl'] ?? null;
        $fileUrl = FileUploadHelper::saveBase64File($rawFile, 'ethics', 'eth');

        $mapped = [
            'slug_id' => $data['slug_id'] ?? $data['slugId'] ?? $data['id'] ?? 'eth-' . time(),
            'num' => (int)($data['num'] ?? $nextNum),
            'title_ar' => $data['titleAr'] ?? $data['title_ar'] ?? '',
            'title_en' => $data['titleEn'] ?? $data['title_en'] ?? null,
            'desc_ar' => $data['descAr'] ?? $data['desc_ar'] ?? $data['descriptionAr'] ?? '',
            'desc_en' => $data['descEn'] ?? $data['desc_en'] ?? $data['descriptionEn'] ?? null,
            'file_name' => $data['fileName'] ?? $data['file_name'] ?? 'Ethical-Charter.pdf',
            'file_size' => $data['fileSize'] ?? $data['file_size'] ?? '2.4 MB',
            'file_url' => $fileUrl,
        ];

        $ethics = EthicsItem::create($mapped);

        return api_response(true, 'تمت إضافة بند الميثاق الأخلاقي بنجاح', $ethics, 201);
    }

    public function update(Request $request, $id)
    {
        $ethics = EthicsItem::where('slug_id', $id)->first();
        if (!$ethics && is_numeric($id)) {
            $ethics = EthicsItem::find($id);
        }
        if (!$ethics) {
            $ethics = EthicsItem::where('id', $id)->first();
        }

        if (!$ethics) {
            return api_response(false, 'بند الميثاق الأخلاقي غير موجود', null, 404);
        }

        $data = $request->all();
        if (isset($data['num'])) $ethics->num = (int)$data['num'];
        if (isset($data['titleAr']) || isset($data['title_ar'])) $ethics->title_ar = $data['titleAr'] ?? $data['title_ar'];
        if (isset($data['titleEn']) || isset($data['title_en'])) $ethics->title_en = $data['titleEn'] ?? $data['title_en'];
        if (isset($data['descAr']) || isset($data['desc_ar']) || isset($data['descriptionAr'])) {
            $ethics->desc_ar = $data['descAr'] ?? $data['desc_ar'] ?? $data['descriptionAr'];
        }
        if (isset($data['descEn']) || isset($data['desc_en']) || isset($data['descriptionEn'])) {
            $ethics->desc_en = $data['descEn'] ?? $data['desc_en'] ?? $data['descriptionEn'];
        }
        if (isset($data['fileName']) || isset($data['file_name'])) $ethics->file_name = $data['fileName'] ?? $data['file_name'];
        if (isset($data['fileSize']) || isset($data['file_size'])) $ethics->file_size = $data['fileSize'] ?? $data['file_size'];
        if (isset($data['fileUrl']) || isset($data['file_url']) || isset($data['pdfUrl'])) {
            $rawFile = $data['fileUrl'] ?? $data['file_url'] ?? $data['pdfUrl'];
            $ethics->file_url = FileUploadHelper::saveBase64File($rawFile, 'ethics', 'eth');
        }

        $ethics->save();

        return api_response(true, 'تم تحديث الميثاق الأخلاقي بنجاح', $ethics);
    }

    public function destroy($id)
    {
        $ethics = EthicsItem::where('slug_id', $id)->first();
        if (!$ethics && is_numeric($id)) {
            $ethics = EthicsItem::find($id);
        }
        if (!$ethics) {
            $ethics = EthicsItem::where('id', $id)->first();
        }

        if ($ethics) {
            $ethics->delete();
            return api_response(true, 'تم حذف بند الميثاق الأخلاقي بنجاح');
        }

        return api_response(true, 'تم حذف البند بنجاح');
    }
}
