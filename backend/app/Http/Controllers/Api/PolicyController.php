<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Helpers\FileUploadHelper;
use App\Models\Policy;
use Illuminate\Http\Request;

require_once dirname(__DIR__, 3) . '/Helpers/ApiResponseHelper.php';
require_once dirname(__DIR__, 3) . '/Helpers/FileUploadHelper.php';

class PolicyController extends Controller
{
    public function index(Request $request)
    {
        $query = Policy::query();

        if ($request->has('category') && !empty($request->category) && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        $policies = $query->orderBy('id', 'asc')->get();

        return response()->json([
            'success' => true,
            'data' => $policies,
            'counts' => [
                'total' => Policy::count(),
                'general' => Policy::where('category', 'general')->count(),
                'financial' => Policy::where('category', 'financial')->count(),
                'hr' => Policy::where('category', 'hr')->count(),
            ]
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        $rawFile = $data['fileUrl'] ?? $data['file_url'] ?? $data['pdfUrl'] ?? null;
        $fileUrl = FileUploadHelper::saveBase64File($rawFile, 'policies', 'policy');

        $mapped = [
            'slug_id' => $data['slug_id'] ?? $data['slugId'] ?? $data['id'] ?? 'pol-' . time(),
            'code' => $data['code'] ?? 'POL-' . rand(100, 999),
            'category' => $data['category'] ?? 'general',
            'title_ar' => $data['titleAr'] ?? $data['title_ar'] ?? '',
            'title_en' => $data['titleEn'] ?? $data['title_en'] ?? null,
            'desc_ar' => $data['descAr'] ?? $data['desc_ar'] ?? $data['descriptionAr'] ?? '',
            'desc_en' => $data['descEn'] ?? $data['desc_en'] ?? null,
            'version' => $data['version'] ?? '1.0',
            'approved_date' => $data['approvedDate'] ?? $data['approved_date'] ?? date('Y-m-d'),
            'file_size' => $data['fileSize'] ?? $data['file_size'] ?? '2.1 MB',
            'file_url' => $fileUrl,
        ];

        $policy = Policy::create($mapped);

        return api_response(true, 'تمت إضافة السياسة بنجاح', $policy, 201);
    }

    public function update(Request $request, $id)
    {
        $policy = Policy::where('slug_id', $id)->first();
        if (!$policy && is_numeric($id)) $policy = Policy::find($id);
        if (!$policy) $policy = Policy::where('id', $id)->first();

        if (!$policy) {
            return api_response(false, 'السياسة غير موجودة', null, 404);
        }

        $data = $request->all();
        if (isset($data['code'])) $policy->code = $data['code'];
        if (isset($data['category'])) $policy->category = $data['category'];
        if (isset($data['titleAr']) || isset($data['title_ar'])) $policy->title_ar = $data['titleAr'] ?? $data['title_ar'];
        if (isset($data['titleEn']) || isset($data['title_en'])) $policy->title_en = $data['titleEn'] ?? $data['title_en'];
        if (isset($data['descAr']) || isset($data['desc_ar']) || isset($data['descriptionAr'])) {
            $policy->desc_ar = $data['descAr'] ?? $data['desc_ar'] ?? $data['descriptionAr'];
        }
        if (isset($data['descEn']) || isset($data['desc_en'])) $policy->desc_en = $data['descEn'] ?? $data['desc_en'];
        if (isset($data['version'])) $policy->version = $data['version'];
        if (isset($data['approvedDate']) || isset($data['approved_date'])) {
            $policy->approved_date = $data['approvedDate'] ?? $data['approved_date'];
        }
        if (isset($data['fileSize']) || isset($data['file_size'])) $policy->file_size = $data['fileSize'] ?? $data['file_size'];
        if (isset($data['fileUrl']) || isset($data['file_url']) || isset($data['pdfUrl'])) {
            $rawFile = $data['fileUrl'] ?? $data['file_url'] ?? $data['pdfUrl'];
            $policy->file_url = FileUploadHelper::saveBase64File($rawFile, 'policies', 'policy');
        }

        $policy->save();

        return api_response(true, 'تم تحديث بيانات السياسة بنجاح', $policy);
    }

    public function destroy($id)
    {
        $policy = Policy::where('slug_id', $id)->first();
        if (!$policy && is_numeric($id)) $policy = Policy::find($id);
        if (!$policy) $policy = Policy::where('id', $id)->first();

        if ($policy) {
            $policy->delete();
            return api_response(true, 'تم حذف السياسة بنجاح');
        }

        return api_response(true, 'تم الحذف بنجاح');
    }
}
