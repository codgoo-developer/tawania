<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GeneralAssemblyMember;
use Illuminate\Http\Request;

require_once dirname(__DIR__, 3) . '/Helpers/ApiResponseHelper.php';

class GeneralAssemblyMemberController extends Controller
{
    public function index(Request $request)
    {
        $query = GeneralAssemblyMember::query();

        if ($request->has('search') && !empty($request->search)) {
            $q = $request->search;
            $query->where(function($b) use ($q) {
                $b->where('name', 'like', "%{$q}%")
                  ->orWhere('name_en', 'like', "%{$q}%")
                  ->orWhere('city', 'like', "%{$q}%");
            });
        }

        $members = $query->orderBy('id', 'asc')->get();

        return response()->json([
            'success' => true,
            'data' => $members,
            'total' => $members->count(),
            'total_shares' => $members->sum('shares_count'),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $mapped = [
            'name' => $data['name'] ?? '',
            'name_en' => $data['nameEn'] ?? $data['name_en'] ?? null,
            'shares_count' => (int)($data['sharesCount'] ?? $data['shares_count'] ?? 50),
            'join_year' => (string)($data['joinYear'] ?? $data['join_year'] ?? '1445'),
            'city' => $data['city'] ?? 'جدة',
            'phone' => $data['phone'] ?? null,
            'national_id' => $data['nationalId'] ?? $data['national_id'] ?? null,
            'status' => $data['status'] ?? 'approved',
        ];

        $member = GeneralAssemblyMember::create($mapped);

        return api_response(true, 'تمت إضافة العضو بنجاح في سجل الجمعية العمومية', $member, 201);
    }

    public function update(Request $request, $id)
    {
        $cleanId = preg_replace('/[^0-9]/', '', (string)$id);
        $member = GeneralAssemblyMember::find($cleanId ?: $id);

        if (!$member) {
            return api_response(false, 'عضو الجمعية العمومية غير موجود', null, 404);
        }

        $data = $request->all();
        if (isset($data['name'])) $member->name = $data['name'];
        if (isset($data['nameEn']) || isset($data['name_en'])) $member->name_en = $data['nameEn'] ?? $data['name_en'];
        if (isset($data['sharesCount']) || isset($data['shares_count'])) $member->shares_count = (int)($data['sharesCount'] ?? $data['shares_count']);
        if (isset($data['joinYear']) || isset($data['join_year'])) $member->join_year = (string)($data['joinYear'] ?? $data['join_year']);
        if (isset($data['city'])) $member->city = $data['city'];
        if (isset($data['phone'])) $member->phone = $data['phone'];
        if (isset($data['nationalId']) || isset($data['national_id'])) $member->national_id = $data['nationalId'] ?? $data['national_id'];
        if (isset($data['status'])) $member->status = $data['status'];

        $member->save();

        return api_response(true, 'تم تحديث بيانات العضو بنجاح في سجل الجمعية العمومية', $member);
    }

    public function destroy($id)
    {
        $cleanId = preg_replace('/[^0-9]/', '', (string)$id);
        $member = GeneralAssemblyMember::find($cleanId ?: $id);

        if ($member) {
            $member->delete();
            return api_response(true, 'تم حذف العضو من سجل الجمعية العمومية بنجاح');
        }

        return api_response(true, 'تم حذف العضو بنجاح');
    }
}
