<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BoardMember;
use Illuminate\Http\Request;

require_once dirname(__DIR__, 3) . '/Helpers/ApiResponseHelper.php';

class BoardMemberController extends Controller
{
    public function index()
    {
        // Strictly return the Board of Directors members (excluding CEO who has his own table/endpoint)
        $members = BoardMember::where('is_ceo', 0)
            ->orWhereNull('is_ceo')
            ->orderBy('order', 'asc')
            ->get();

        return api_response(true, 'Board members retrieved successfully', $members);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $mapped = [
            'name_ar' => $data['nameAr'] ?? $data['name_ar'] ?? '',
            'name_en' => $data['nameEn'] ?? $data['name_en'] ?? null,
            'role_ar' => $data['roleAr'] ?? $data['role_ar'] ?? 'عضو مجلس الإدارة',
            'role_en' => $data['roleEn'] ?? $data['role_en'] ?? 'Board Member',
            'badge_ar' => $data['badgeAr'] ?? $data['badge_ar'] ?? 'عضو مجلس الإدارة',
            'badge_en' => $data['badgeEn'] ?? $data['badge_en'] ?? 'Board Member',
            'phone' => $data['phone'] ?? null,
            'email' => $data['email'] ?? 'info@shamil.org.sa',
            'bio_ar' => $data['bioAr'] ?? $data['bio_ar'] ?? null,
            'bio_en' => $data['bioEn'] ?? $data['bio_en'] ?? null,
            'initials_ar' => $data['initialsAr'] ?? $data['initials_ar'] ?? null,
            'order' => (int)($data['order'] ?? 1),
            'is_chairman' => (bool)($data['isChairman'] ?? $data['is_chairman'] ?? false),
            'is_ceo' => false,
        ];

        $member = BoardMember::create($mapped);

        return api_response(true, 'تمت إضافة عضو مجلس الإدارة بنجاح', $member, 201);
    }

    public function update(Request $request, $id)
    {
        $cleanId = preg_replace('/[^0-9]/', '', (string)$id);
        $member = BoardMember::find($cleanId ?: $id);

        if (!$member) {
            return api_response(false, 'عضو مجلس الإدارة غير موجود', null, 404);
        }

        $data = $request->all();
        if (isset($data['nameAr']) || isset($data['name_ar'])) $member->name_ar = $data['nameAr'] ?? $data['name_ar'];
        if (isset($data['nameEn']) || isset($data['name_en'])) $member->name_en = $data['nameEn'] ?? $data['name_en'];
        if (isset($data['roleAr']) || isset($data['role_ar'])) $member->role_ar = $data['roleAr'] ?? $data['role_ar'];
        if (isset($data['roleEn']) || isset($data['role_en'])) $member->role_en = $data['roleEn'] ?? $data['role_en'];
        if (isset($data['badgeAr']) || isset($data['badge_ar'])) $member->badge_ar = $data['badgeAr'] ?? $data['badge_ar'];
        if (isset($data['badgeEn']) || isset($data['badge_en'])) $member->badge_en = $data['badgeEn'] ?? $data['badge_en'];
        if (isset($data['phone'])) $member->phone = $data['phone'];
        if (isset($data['email'])) $member->email = $data['email'];
        if (isset($data['bioAr']) || isset($data['bio_ar'])) $member->bio_ar = $data['bioAr'] ?? $data['bio_ar'];
        if (isset($data['bioEn']) || isset($data['bio_en'])) $member->bio_en = $data['bioEn'] ?? $data['bio_en'];
        if (isset($data['initialsAr']) || isset($data['initials_ar'])) $member->initials_ar = $data['initialsAr'] ?? $data['initials_ar'];
        if (isset($data['order'])) $member->order = (int)$data['order'];
        if (isset($data['isChairman']) || isset($data['is_chairman'])) $member->is_chairman = (bool)($data['isChairman'] ?? $data['is_chairman']);

        $member->save();

        return api_response(true, 'تم تحديث بيانات عضو مجلس الإدارة بنجاح', $member);
    }

    public function destroy($id)
    {
        $cleanId = preg_replace('/[^0-9]/', '', (string)$id);
        $member = BoardMember::find($cleanId ?: $id);
        if ($member) {
            $member->delete();
            return api_response(true, 'تم حذف عضو مجلس الإدارة بنجاح');
        }
        return api_response(true, 'تم حذف العضو بنجاح');
    }
}
