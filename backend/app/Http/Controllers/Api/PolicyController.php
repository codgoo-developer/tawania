<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Helpers\FileUploadHelper;
use App\Models\PolicyItem;
use Illuminate\Http\Request;

require_once dirname(__DIR__, 3) . '/Helpers/ApiResponseHelper.php';
require_once dirname(__DIR__, 3) . '/Helpers/FileUploadHelper.php';

class PolicyController extends Controller
{
    public function index(Request $request)
    {
        $query = PolicyItem::query();

        if ($request->has('category') && !empty($request->category) && $request->category !== 'all') {
            $query->where('category', $request->category);
        }

        $policies = $query->orderBy('id', 'asc')->get();

        return response()->json([
            'success' => true,
            'data' => $policies,
            'counts' => [
                'total' => PolicyItem::count(),
                'general' => PolicyItem::where('category', 'general')->count(),
                'aml' => PolicyItem::where('category', 'aml')->count(),
            ]
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $mapped = [
            'slug_id' => $data['slug_id'] ?? $data['slugId'] ?? $data['id'] ?? 'pol-' . time(),
            'category' => $data['category'] ?? 'general',
            'title_ar' => $data['titleAr'] ?? $data['title_ar'] ?? '',
            'title_en' => $data['titleEn'] ?? $data['title_en'] ?? null,
            'code' => $data['code'] ?? 'POL-NEW-' . rand(10, 99),
            'version' => $data['version'] ?? 'الإصدار 1.0',
            'approved_date' => $data['approvedDate'] ?? $data['approved_date'] ?? date('Y/m/d'),
            'approved_by_ar' => $data['approvedByAr'] ?? $data['approved_by_ar'] ?? 'مجلس الإدارة',
            'approved_by_en' => $data['approvedByEn'] ?? $data['approved_by_en'] ?? 'Board of Directors',
            'desc_ar' => $data['descAr'] ?? $data['desc_ar'] ?? $data['descriptionAr'] ?? '',
            'desc_en' => $data['descEn'] ?? $data['desc_en'] ?? null,
            'file_size' => $data['fileSize'] ?? $data['file_size'] ?? '1.0 MB',
            'file_url' => $data['fileUrl'] ?? $data['file_url'] ?? $data['pdfUrl'] ?? null,
            'articles_ar' => isset($data['articlesAr']) ? (is_string($data['articlesAr']) ? $data['articlesAr'] : json_encode($data['articlesAr'], JSON_UNESCAPED_UNICODE)) : null,
            'articles_en' => isset($data['articlesEn']) ? (is_string($data['articlesEn']) ? $data['articlesEn'] : json_encode($data['articlesEn'], JSON_UNESCAPED_UNICODE)) : null,
        ];

        $policy = PolicyItem::create($mapped);
        return api_response(true, 'تمت إضافة السياسة بنجاح', $policy, 201);
    }

    public function update(Request $request, $id)
    {
        $policy = PolicyItem::where('slug_id', $id)->first();
        if (!$policy && is_numeric($id)) $policy = PolicyItem::find($id);
        if (!$policy) $policy = PolicyItem::where('id', $id)->first();
        if (!$policy) $policy = PolicyItem::where('code', $id)->first();

        if (!$policy) {
            return api_response(false, 'السياسة غير موجودة', null, 404);
        }

        $data = $request->all();
        if (isset($data['category'])) $policy->category = $data['category'];
        if (isset($data['titleAr']) || isset($data['title_ar'])) $policy->title_ar = $data['titleAr'] ?? $data['title_ar'];
        if (isset($data['titleEn']) || isset($data['title_en'])) $policy->title_en = $data['titleEn'] ?? $data['title_en'];
        if (isset($data['code'])) $policy->code = $data['code'];
        if (isset($data['version'])) $policy->version = $data['version'];
        if (isset($data['approvedDate']) || isset($data['approved_date'])) $policy->approved_date = $data['approvedDate'] ?? $data['approved_date'];
        if (isset($data['approvedByAr']) || isset($data['approved_by_ar'])) $policy->approved_by_ar = $data['approvedByAr'] ?? $data['approved_by_ar'];
        if (isset($data['approvedByEn']) || isset($data['approved_by_en'])) $policy->approved_by_en = $data['approvedByEn'] ?? $data['approved_by_en'];
        if (isset($data['descAr']) || isset($data['desc_ar']) || isset($data['descriptionAr'])) {
            $policy->desc_ar = $data['descAr'] ?? $data['desc_ar'] ?? $data['descriptionAr'];
        }
        if (isset($data['descEn']) || isset($data['desc_en'])) $policy->desc_en = $data['descEn'] ?? $data['desc_en'];
        if (isset($data['fileSize']) || isset($data['file_size'])) $policy->file_size = $data['fileSize'] ?? $data['file_size'];
        if (isset($data['fileUrl']) || isset($data['file_url']) || isset($data['pdfUrl'])) {
            $policy->file_url = $data['fileUrl'] ?? $data['file_url'] ?? $data['pdfUrl'];
        }
        if (isset($data['articlesAr'])) {
            $policy->articles_ar = is_string($data['articlesAr']) ? $data['articlesAr'] : json_encode($data['articlesAr'], JSON_UNESCAPED_UNICODE);
        }
        if (isset($data['articlesEn'])) {
            $policy->articles_en = is_string($data['articlesEn']) ? $data['articlesEn'] : json_encode($data['articlesEn'], JSON_UNESCAPED_UNICODE);
        }

        $policy->save();
        return api_response(true, 'تم تحديث السياسة بنجاح', $policy);
    }

    public function destroy($id)
    {
        $policy = PolicyItem::where('slug_id', $id)->first();
        if (!$policy && is_numeric($id)) $policy = PolicyItem::find($id);
        if (!$policy) $policy = PolicyItem::where('id', $id)->first();

        if ($policy) {
            $policy->delete();
            return api_response(true, 'تم حذف السياسة بنجاح');
        }
        return api_response(true, 'تم حذف السياسة بنجاح');
    }
}
