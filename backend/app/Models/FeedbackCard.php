<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FeedbackCard extends Model
{
    protected $table = 'feedback_cards';

    protected $fillable = [
        'slug_id', 'title_ar', 'title_en',
        'description_ar', 'description_en',
        'url', 'platform', 'platform_name',
        'badge_ar', 'badge_en', 'accent_color',
    ];

    protected $appends = [
        'slugId', 'titleAr', 'titleEn',
        'descriptionAr', 'descriptionEn',
        'platformName', 'badgeAr', 'badgeEn',
        'accentColor',
    ];

    public function getIdAttribute() { return $this->attributes['slug_id'] ?? $this->attributes['id']; }
    public function getSlugIdAttribute() { return $this->attributes['slug_id'] ?? ''; }
    public function getTitleArAttribute() { return $this->attributes['title_ar'] ?? ''; }
    public function getTitleEnAttribute() { return $this->attributes['title_en'] ?? ''; }
    public function getDescriptionArAttribute() { return $this->attributes['description_ar'] ?? ''; }
    public function getDescriptionEnAttribute() { return $this->attributes['description_en'] ?? ''; }
    public function getPlatformNameAttribute() { return $this->attributes['platform_name'] ?? 'Google Maps'; }
    public function getBadgeArAttribute() { return $this->attributes['badge_ar'] ?? 'Google Maps'; }
    public function getBadgeEnAttribute() { return $this->attributes['badge_en'] ?? 'Google Maps Location'; }
    public function getAccentColorAttribute() { return $this->attributes['accent_color'] ?? 'emerald'; }
}
