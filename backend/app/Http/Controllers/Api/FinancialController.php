<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Helpers\FileUploadHelper;
use App\Models\FinancialItem;
use Illuminate\Http\Request;

require_once dirname(__DIR__, 3) . '/Helpers/ApiResponseHelper.php';
require_once dirname(__DIR__, 3) . '/Helpers/FileUploadHelper.php';

class FinancialController extends Controller
{
    public function index()
    {
        $financials = FinancialItem::orderBy('year', 'desc')->get();

        return response()->json([
            'success' => true,
            'data' => $financials,
            'count' => $financials->count(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $year = $data['year'] ?? date('Y');

        $mapped = [
            'slug_id' => $data['slug_id'] ?? $data['slugId'] ?? $data['id'] ?? "fin-{$year}",
            'year' => (string)$year,
            'title_ar' => $data['titleAr'] ?? $data['title_ar'] ?? "القوائم المالية المدققة للعام المالي {$year}م",
            'title_en' => $data['titleEn'] ?? $data['title_en'] ?? "Audited Financial Statements for FY {$year}",
            'status' => $data['status'] ?? 'معتمد',
            'audit_firm_ar' => $data['auditFirmAr'] ?? $data['audit_firm_ar'] ?? 'مكتب المحاسب القانوني المعتمد',
            'audit_firm_en' => $data['auditFirmEn'] ?? $data['audit_firm_en'] ?? 'Certified Chartered Accountants',
            'file_size' => $data['fileSize'] ?? $data['file_size'] ?? '3.5 MB',
            'file_url' => $data['fileUrl'] ?? $data['file_url'] ?? $data['pdfUrl'] ?? $data['downloadUrl'] ?? null,
            'revenue' => $data['revenue'] ?? '0 ر.س',
            'expenses' => $data['expenses'] ?? '0 ر.س',
            'net_surplus' => $data['netSurplus'] ?? $data['net_surplus'] ?? $data['surplus'] ?? '0 ر.س',
        ];

        $fin = FinancialItem::create($mapped);

        return api_response(true, 'تمت إضافة القائمة المالية بنجاح', $fin, 201);
    }

    public function update(Request $request, $id)
    {
        $fin = FinancialItem::where('slug_id', $id)->first();
        if (!$fin && is_numeric($id)) $fin = FinancialItem::find($id);
        if (!$fin) $fin = FinancialItem::where('id', $id)->first();
        if (!$fin) $fin = FinancialItem::where('year', $id)->first();

        if (!$fin) {
            return api_response(false, 'القائمة المالية غير موجودة', null, 404);
        }

        $data = $request->all();
        if (isset($data['year'])) $fin->year = (string)$data['year'];
        if (isset($data['titleAr']) || isset($data['title_ar'])) $fin->title_ar = $data['titleAr'] ?? $data['title_ar'];
        if (isset($data['titleEn']) || isset($data['title_en'])) $fin->title_en = $data['titleEn'] ?? $data['title_en'];
        if (isset($data['status'])) $fin->status = $data['status'];
        if (isset($data['auditFirmAr']) || isset($data['audit_firm_ar'])) $fin->audit_firm_ar = $data['auditFirmAr'] ?? $data['audit_firm_ar'];
        if (isset($data['auditFirmEn']) || isset($data['audit_firm_en'])) $fin->audit_firm_en = $data['auditFirmEn'] ?? $data['audit_firm_en'];
        if (isset($data['fileSize']) || isset($data['file_size'])) $fin->file_size = $data['fileSize'] ?? $data['file_size'];
        if (isset($data['fileUrl']) || isset($data['file_url']) || isset($data['pdfUrl']) || isset($data['downloadUrl'])) {
            $fin->file_url = $data['fileUrl'] ?? $data['file_url'] ?? $data['pdfUrl'] ?? $data['downloadUrl'];
        }
        if (isset($data['revenue'])) $fin->revenue = $data['revenue'];
        if (isset($data['expenses'])) $fin->expenses = $data['expenses'];
        if (isset($data['netSurplus']) || isset($data['net_surplus']) || isset($data['surplus'])) {
            $fin->net_surplus = $data['netSurplus'] ?? $data['net_surplus'] ?? $data['surplus'];
        }

        $fin->save();

        return api_response(true, 'تم تحديث بيانات القائمة المالية بنجاح', $fin);
    }

    public function destroy($id)
    {
        $fin = FinancialItem::where('slug_id', $id)->first();
        if (!$fin && is_numeric($id)) $fin = FinancialItem::find($id);
        if (!$fin) $fin = FinancialItem::where('id', $id)->first();

        if ($fin) {
            $fin->delete();
            return api_response(true, 'تم حذف القائمة المالية بنجاح');
        }

        return api_response(true, 'تم الحذف بنجاح');
    }
}
