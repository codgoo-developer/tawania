<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FeedbackCard;
use Illuminate\Http\Request;

require_once dirname(__DIR__, 3) . '/Helpers/ApiResponseHelper.php';

class FeedbackCardController extends Controller
{
    public function index()
    {
        $cards = FeedbackCard::orderBy('id', 'asc')->get();

        return response()->json([
            'success' => true,
            'data' => $cards,
            'count' => $cards->count(),
        ]);
    }

    public function sync(Request $request)
    {
        $cards = $request->input('cards', $request->all());
        if (is_array($cards)) {
            FeedbackCard::truncate();
            foreach ($cards as $c) {
                FeedbackCard::create([
                    'slug_id' => $c['slug_id'] ?? $c['slugId'] ?? $c['id'] ?? 'card-' . rand(100, 999),
                    'title_ar' => $c['titleAr'] ?? $c['title_ar'] ?? '',
                    'title_en' => $c['titleEn'] ?? $c['title_en'] ?? null,
                    'description_ar' => $c['descriptionAr'] ?? $c['description_ar'] ?? $c['descAr'] ?? '',
                    'description_en' => $c['descriptionEn'] ?? $c['description_en'] ?? $c['descEn'] ?? null,
                    'url' => $c['url'] ?? '',
                    'platform' => $c['platform'] ?? 'maps',
                    'platform_name' => $c['platformName'] ?? $c['platform_name'] ?? 'Google Maps',
                    'badge_ar' => $c['badgeAr'] ?? $c['badge_ar'] ?? 'Google Maps',
                    'badge_en' => $c['badgeEn'] ?? $c['badge_en'] ?? 'Google Maps Location',
                    'accent_color' => $c['accentColor'] ?? $c['accent_color'] ?? 'emerald',
                ]);
            }
        }
        return api_response(true, 'تمت مزامنة وحفظ منصات التقييم بنجاح', FeedbackCard::all());
    }

    public function store(Request $request)
    {
        $data = $request->all();
        $platform = $data['platform'] ?? 'maps';

        $mapped = [
            'slug_id' => $data['slug_id'] ?? $data['slugId'] ?? $data['id'] ?? 'card-' . time(),
            'title_ar' => $data['titleAr'] ?? $data['title_ar'] ?? '',
            'title_en' => $data['titleEn'] ?? $data['title_en'] ?? null,
            'description_ar' => $data['descriptionAr'] ?? $data['description_ar'] ?? $data['descAr'] ?? '',
            'description_en' => $data['descriptionEn'] ?? $data['description_en'] ?? $data['descEn'] ?? null,
            'url' => $data['url'] ?? '',
            'platform' => $platform,
            'platform_name' => $data['platformName'] ?? $data['platform_name'] ?? ($platform === 'drive' ? 'Google Drive' : 'Google Maps'),
            'badge_ar' => $data['badgeAr'] ?? $data['badge_ar'] ?? ($platform === 'drive' ? 'Google Drive PDF' : 'Google Maps'),
            'badge_en' => $data['badgeEn'] ?? $data['badge_en'] ?? ($platform === 'drive' ? 'Verified Document' : 'Google Maps Location'),
            'accent_color' => $data['accentColor'] ?? $data['accent_color'] ?? ($platform === 'drive' ? 'emerald' : 'amber'),
        ];

        $card = FeedbackCard::create($mapped);

        return api_response(true, 'تمت إضافة منصة التقييم بنجاح', $card, 201);
    }

    public function update(Request $request, $id)
    {
        $card = FeedbackCard::where('slug_id', $id)->first();
        if (!$card && is_numeric($id)) $card = FeedbackCard::find($id);
        if (!$card) $card = FeedbackCard::where('id', $id)->first();

        if (!$card) {
            return api_response(false, 'منصة التقييم غير موجودة', null, 404);
        }

        $data = $request->all();
        if (isset($data['titleAr']) || isset($data['title_ar'])) $card->title_ar = $data['titleAr'] ?? $data['title_ar'];
        if (isset($data['titleEn']) || isset($data['title_en'])) $card->title_en = $data['titleEn'] ?? $data['title_en'];
        if (isset($data['descriptionAr']) || isset($data['description_ar']) || isset($data['descAr'])) {
            $card->description_ar = $data['descriptionAr'] ?? $data['description_ar'] ?? $data['descAr'];
        }
        if (isset($data['descriptionEn']) || isset($data['description_en']) || isset($data['descEn'])) {
            $card->description_en = $data['descriptionEn'] ?? $data['description_en'] ?? $data['descEn'];
        }
        if (isset($data['url'])) $card->url = $data['url'];
        if (isset($data['platform'])) $card->platform = $data['platform'];
        if (isset($data['platformName']) || isset($data['platform_name'])) $card->platform_name = $data['platformName'] ?? $data['platform_name'];
        if (isset($data['badgeAr']) || isset($data['badge_ar'])) $card->badge_ar = $data['badgeAr'] ?? $data['badge_ar'];
        if (isset($data['badgeEn']) || isset($data['badge_en'])) $card->badge_en = $data['badgeEn'] ?? $data['badge_en'];
        if (isset($data['accentColor']) || isset($data['accent_color'])) $card->accent_color = $data['accentColor'] ?? $data['accent_color'];

        $card->save();

        return api_response(true, 'تم تحديث منصة التقييم بنجاح', $card);
    }

    public function destroy($id)
    {
        $card = FeedbackCard::where('slug_id', $id)->first();
        if (!$card && is_numeric($id)) $card = FeedbackCard::find($id);
        if (!$card) $card = FeedbackCard::where('id', $id)->first();

        if ($card) {
            $card->delete();
            return api_response(true, 'تم حذف منصة التقييم بنجاح');
        }

        return api_response(true, 'تم الحذف بنجاح');
    }
}
