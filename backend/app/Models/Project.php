<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title_ar',
        'title_en',
        'category_ar',
        'category_en',
        'location_ar',
        'location_en',
        'image_url',
        'description_ar',
        'sub_description',
        'features',
        'society_name_ar',
        'society_name_en',
        'description_en',
        'investment_amount',
        'status',
    ];

    protected $casts = [
        'features' => 'array',
    ];

    protected $appends = [
        'name',
        'image',
        'description',
        'subDescription',
        'societyNameAr',
        'societyNameEn',
    ];

    public function getNameAttribute()
    {
        return $this->attributes['title_ar'] ?? null;
    }

    public function getImageAttribute()
    {
        return $this->attributes['image_url'] ?? null;
    }

    public function getDescriptionAttribute()
    {
        return $this->attributes['description_ar'] ?? null;
    }

    public function getSubDescriptionAttribute()
    {
        return $this->attributes['sub_description'] ?? null;
    }

    public function getSocietyNameArAttribute()
    {
        return $this->attributes['society_name_ar'] ?? null;
    }

    public function getSocietyNameEnAttribute()
    {
        return $this->attributes['society_name_en'] ?? null;
    }
}
