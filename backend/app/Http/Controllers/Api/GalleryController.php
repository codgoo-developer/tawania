<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GalleryItem;
use Illuminate\Http\Request;

require_once dirname(__DIR__, 3) . '/Helpers/ApiResponseHelper.php';

class GalleryController extends Controller
{
    public function index()
    {
        $items = GalleryItem::orderBy('id', 'asc')->get();
        return api_response(true, 'Gallery items retrieved successfully', $items);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        if (isset($data['titleAr'])) $data['title_ar'] = $data['titleAr'];
        if (isset($data['titleEn'])) $data['title_en'] = $data['titleEn'];
        if (isset($data['categoryNameAr'])) $data['category_name_ar'] = $data['categoryNameAr'];
        if (isset($data['categoryNameEn'])) $data['category_name_en'] = $data['categoryNameEn'];
        if (isset($data['imageUrl'])) $data['image_url'] = $data['imageUrl'];
        if (isset($data['date'])) $data['event_date'] = $data['date'];
        if (isset($data['locationAr'])) $data['location_ar'] = $data['locationAr'];
        if (isset($data['locationEn'])) $data['location_en'] = $data['locationEn'];
        if (isset($data['captionAr'])) $data['caption_ar'] = $data['captionAr'];
        if (isset($data['captionEn'])) $data['caption_en'] = $data['captionEn'];

        $item = GalleryItem::create($data);
        return api_response(true, 'تمت إضافة الصورة للمعرض بنجاح', $item, 201);
    }

    public function update(Request $request, $id)
    {
        $item = GalleryItem::findOrFail($id);
        $data = $request->all();
        if (isset($data['titleAr'])) $data['title_ar'] = $data['titleAr'];
        if (isset($data['titleEn'])) $data['title_en'] = $data['titleEn'];
        if (isset($data['categoryNameAr'])) $data['category_name_ar'] = $data['categoryNameAr'];
        if (isset($data['categoryNameEn'])) $data['category_name_en'] = $data['categoryNameEn'];
        if (isset($data['imageUrl'])) $data['image_url'] = $data['imageUrl'];
        if (isset($data['date'])) $data['event_date'] = $data['date'];
        if (isset($data['locationAr'])) $data['location_ar'] = $data['locationAr'];
        if (isset($data['locationEn'])) $data['location_en'] = $data['locationEn'];
        if (isset($data['captionAr'])) $data['caption_ar'] = $data['captionAr'];
        if (isset($data['captionEn'])) $data['caption_en'] = $data['captionEn'];

        $item->update($data);
        return api_response(true, 'تم تحديث بيانات المعرض بنجاح', $item);
    }

    public function destroy($id)
    {
        $item = GalleryItem::findOrFail($id);
        $item->delete();
        return api_response(true, 'تم حذف الصورة من المعرض بنجاح');
    }
}
