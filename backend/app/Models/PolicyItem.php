<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PolicyItem extends Model
{
    protected $table = 'policies';

    protected $fillable = [
        'slug_id', 'category', 'title_ar', 'title_en', 'code', 'version',
        'approved_date', 'approved_by_ar', 'approved_by_en',
        'desc_ar', 'desc_en', 'file_size', 'file_url',
        'articles_ar', 'articles_en',
    ];

    protected $casts = [
        'articles_ar' => 'array',
        'articles_en' => 'array',
    ];

    protected $appends = [
        'slugId', 'titleAr', 'titleEn', 'descAr', 'descEn',
        'fileSize', 'fileUrl', 'approvedDate',
        'approvedByAr', 'approvedByEn',
        'articlesAr', 'articlesEn',
    ];

    public function getIdAttribute() { return $this->attributes['slug_id'] ?? $this->attributes['id']; }
    public function getSlugIdAttribute() { return $this->attributes['slug_id'] ?? ''; }
    public function getTitleArAttribute() { return $this->attributes['title_ar'] ?? ''; }
    public function getTitleEnAttribute() { return $this->attributes['title_en'] ?? ''; }
    public function getDescArAttribute() { return $this->attributes['desc_ar'] ?? ''; }
    public function getDescEnAttribute() { return $this->attributes['desc_en'] ?? ''; }
    public function getFileSizeAttribute() { return $this->attributes['file_size'] ?? '1.0 MB'; }
    public function getFileUrlAttribute() { return $this->attributes['file_url'] ?? ''; }
    public function getApprovedDateAttribute() { return $this->attributes['approved_date'] ?? ''; }
    public function getApprovedByArAttribute() { return $this->attributes['approved_by_ar'] ?? ''; }
    public function getApprovedByEnAttribute() { return $this->attributes['approved_by_en'] ?? ''; }
    public function getArticlesArAttribute() {
        $val = $this->attributes['articles_ar'] ?? null;
        if (is_string($val)) return json_decode($val, true);
        return $val;
    }
    public function getArticlesEnAttribute() {
        $val = $this->attributes['articles_en'] ?? null;
        if (is_string($val)) return json_decode($val, true);
        return $val;
    }
}
