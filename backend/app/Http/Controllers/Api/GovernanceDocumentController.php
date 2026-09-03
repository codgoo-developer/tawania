<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GovernanceDocument;
use Illuminate\Http\Request;

class GovernanceDocumentController extends Controller
{
    public function index(Request $request)
    {
        $query = GovernanceDocument::query();
        if ($request->has('type')) {
            $query->where('type', $request->type);
        }
        $docs = $query->orderBy('id', 'desc')->get();
        return response()->json([
            'success' => true,
            'data' => $docs,
        ]);
    }

    public function store(Request $request)
    {
        $doc = GovernanceDocument::create($request->all());
        return response()->json([
            'success' => true,
            'message' => 'تم إضافة مستند الحوكمة بنجاح',
            'data' => $doc,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $doc = GovernanceDocument::findOrFail($id);
        $doc->update($request->all());
        return response()->json([
            'success' => true,
            'message' => 'تم تحديث المستند بنجاح',
            'data' => $doc,
        ]);
    }

    public function destroy($id)
    {
        $doc = GovernanceDocument::findOrFail($id);
        $doc->delete();
        return response()->json([
            'success' => true,
            'message' => 'تم حذف المستند بنجاح',
        ]);
    }
}
