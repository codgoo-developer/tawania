<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::orderBy('id', 'asc')->get();
        return response()->json([
            'success' => true,
            'data' => $projects,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->all();
        if (isset($data['name']) && !isset($data['title_ar'])) {
            $data['title_ar'] = $data['name'];
        }
        if (isset($data['image']) && !isset($data['image_url'])) {
            $data['image_url'] = $data['image'];
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
        return response()->json([
            'success' => true,
            'message' => 'تمت إضافة المشروع بنجاح',
            'data' => $project,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);
        $data = $request->all();
        if (isset($data['name']) && !isset($data['title_ar'])) {
            $data['title_ar'] = $data['name'];
        }
        if (isset($data['image']) && !isset($data['image_url'])) {
            $data['image_url'] = $data['image'];
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
        return response()->json([
            'success' => true,
            'message' => 'تم تحديث بيانات المشروع بنجاح',
            'data' => $project,
        ]);
    }

    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();
        return response()->json([
            'success' => true,
            'message' => 'تم حذف المشروع بنجاح',
        ]);
    }
}
