<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GalleryItem extends Model
{
    protected $table = 'gallery_items';

    protected $fillable = [
        'title_ar',
        'title_en',
        'category',
        'category_name_ar',
        'category_name_en',
        'image_url',
        'event_date',
        'location_ar',
        'location_en',
        'caption_ar',
        'caption_en',
    ];

    protected $appends = [
        'titleAr',
        'titleEn',
        'categoryNameAr',
        'categoryNameEn',
        'imageUrl',
        'date',
        'locationAr',
        'locationEn',
        'captionAr',
        'captionEn',
    ];

    public function getTitleArAttribute() { return $this->attributes['title_ar'] ?? null; }
    public function getTitleEnAttribute() { return $this->attributes['title_en'] ?? null; }
    public function getCategoryNameArAttribute() { return $this->attributes['category_name_ar'] ?? null; }
    public function getCategoryNameEnAttribute() { return $this->attributes['category_name_en'] ?? null; }
    public function getImageUrlAttribute() { return $this->attributes['image_url'] ?? null; }
    public function getDateAttribute() { return $this->attributes['event_date'] ?? null; }
    public function getLocationArAttribute() { return $this->attributes['location_ar'] ?? null; }
    public function getLocationEnAttribute() { return $this->attributes['location_en'] ?? null; }
    public function getCaptionArAttribute() { return $this->attributes['caption_ar'] ?? null; }
    public function getCaptionEnAttribute() { return $this->attributes['caption_en'] ?? null; }
}
