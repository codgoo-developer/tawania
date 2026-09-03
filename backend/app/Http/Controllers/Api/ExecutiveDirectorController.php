<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ExecutiveDirector;
use Illuminate\Http\Request;

require_once dirname(__DIR__, 3) . '/Helpers/ApiResponseHelper.php';

class ExecutiveDirectorController extends Controller
{
    public function show()
    {
        $director = ExecutiveDirector::first();
        if (!$director) {
            $director = ExecutiveDirector::create([
                'name_ar' => 'أ. محمد ذواب مفرح الحربي',
                'name_en' => 'Mr. Mohammed Dhawab Mufreh Al-Harbi',
                'role_ar' => 'المدير التنفيذي',
                'role_en' => 'Executive Director',
                'badge_ar' => 'المدير التنفيذي',
                'badge_en' => 'Executive Director',
                'phone' => '+966531389196',
                'email' => 'mohamad89196@gmail.com',
                'description_ar' => 'يتولى إدارة وتسيير الأعمال التنفيذية اليومية لجمعية الشامل ومتابعة الأهداف التشغيلية والمبادرات التنموية.',
                'description_en' => 'Manages daily executive operations of AlShamel Cooperative.',
                'initials_ar' => 'م . ح',
                'image' => '',
            ]);
        }

        return api_response(true, 'Executive director retrieved successfully', $director);
    }

    public function update(Request $request)
    {
        $director = ExecutiveDirector::first();
        if (!$director) {
            $director = new ExecutiveDirector();
        }

        $data = $request->all();
        if (isset($data['nameAr'])) $director->name_ar = $data['nameAr'];
        if (isset($data['nameEn'])) $director->name_en = $data['nameEn'];
        if (isset($data['roleAr'])) $director->role_ar = $data['roleAr'];
        if (isset($data['roleEn'])) $director->role_en = $data['roleEn'];
        if (isset($data['badgeAr'])) $director->badge_ar = $data['badgeAr'];
        if (isset($data['badgeEn'])) $director->badge_en = $data['badgeEn'];
        if (isset($data['phone'])) $director->phone = $data['phone'];
        if (isset($data['email'])) $director->email = $data['email'];
        if (isset($data['descriptionAr'])) $director->description_ar = $data['descriptionAr'];
        if (isset($data['descriptionEn'])) $director->description_en = $data['descriptionEn'];
        if (isset($data['bioAr'])) $director->description_ar = $data['bioAr'];
        if (isset($data['initialsAr'])) $director->initials_ar = $data['initialsAr'];
        if (isset($data['image'])) $director->image = $data['image'];

        $director->save();

        return api_response(true, 'تم تحديث بيانات المدير التنفيذي بنجاح في قاعدة البيانات', $director);
    }
}
