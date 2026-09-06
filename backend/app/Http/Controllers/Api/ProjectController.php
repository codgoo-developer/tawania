<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Helpers\FileUploadHelper;
use Illuminate\Http\Request;

require_once dirname(__DIR__, 3) . '/Helpers/ApiResponseHelper.php';

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::orderBy('id', 'asc')->get();
        return api_response(true, 'Projects retrieved successfully', $projects);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        if (isset($data['name']) && !isset($data['title_ar'])) {
            $data['title_ar'] = $data['name'];
        }
        if (isset($data['image']) || isset($data['image_url'])) {
            $rawImg = $data['image_url'] ?? $data['image'];
            $data['image_url'] = FileUploadHelper::saveBase64File($rawImg, 'projects', 'proj');
        }
        if (isset($data['description']) && !isset($data['description_ar'])) {
            $data['description_ar'] = $data['description'];
        }
        if (isset($data['subDescription']) && !isset($data['sub_description'])) {
            $data['sub_description'] = $data['subDescription'];
        }
        if (isset($data['societyNameAr']) && !isset($data['society_name_ar'])) {
            $data['society_name_ar'] = $data['societyNameAr'];
        }
        if (isset($data['societyNameEn']) && !isset($data['society_name_en'])) {
            $data['society_name_en'] = $data['societyNameEn'];
        }

        $project = Project::create($data);
        return api_response(true, 'تمت إضافة المشروع بنجاح', $project, 201);
    }

    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);
        $data = $request->all();
        if (isset($data['name']) && !isset($data['title_ar'])) {
            $data['title_ar'] = $data['name'];
        }
        if (isset($data['image']) || isset($data['image_url'])) {
            $rawImg = $data['image_url'] ?? $data['image'];
            $data['image_url'] = FileUploadHelper::saveBase64File($rawImg, 'projects', 'proj');
        }
        if (isset($data['description']) && !isset($data['description_ar'])) {
            $data['description_ar'] = $data['description'];
        }
        if (isset($data['subDescription']) && !isset($data['sub_description'])) {
            $data['sub_description'] = $data['subDescription'];
        }
        if (isset($data['societyNameAr']) && !isset($data['society_name_ar'])) {
            $data['society_name_ar'] = $data['societyNameAr'];
        }
        if (isset($data['societyNameEn']) && !isset($data['society_name_en'])) {
            $data['society_name_en'] = $data['societyNameEn'];
        }

        $project->update($data);
        return api_response(true, 'تم تحديث بيانات المشروع بنجاح', $project);
    }

    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();
        return api_response(true, 'تم حذف المشروع بنجاح');
    }
}
