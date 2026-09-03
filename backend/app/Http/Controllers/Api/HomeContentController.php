<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HomeContent;
use Illuminate\Http\Request;

require_once dirname(__DIR__, 3) . '/Helpers/ApiResponseHelper.php';

class HomeContentController extends Controller
{
    public function index()
    {
        $contents = HomeContent::all()->pluck('content_data', 'section_key');
        return api_response(true, 'Home content loaded successfully', $contents);
    }

    public function updateSection(Request $request, string $sectionKey)
    {
        $data = $request->all();
        $record = HomeContent::updateOrCreate(
            ['section_key' => $sectionKey],
            ['content_data' => $data]
        );

        return api_response(true, "Section {$sectionKey} updated successfully", $record->content_data);
    }
}
