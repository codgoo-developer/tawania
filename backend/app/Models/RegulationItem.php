<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RegulationItem extends Model
{
    protected $table = 'regulations';

    protected $fillable = [
        'slug_id', 'sec', 'title_ar', 'title_en', 'type', 'num',
        'desc_ar', 'desc_en', 'file_size', 'file_url',
    ];

    protected $appends = [
        'slugId', 'titleAr', 'titleEn', 'descAr', 'descEn',
        'fileSize', 'fileUrl', 'pdfUrl',
    ];

    public function getIdAttribute() { return $this->attributes['slug_id'] ?? $this->attributes['id']; }
    public function getSlugIdAttribute() { return $this->attributes['slug_id'] ?? ''; }
    public function getTitleArAttribute() { return $this->attributes['title_ar'] ?? ''; }
    public function getTitleEnAttribute() { return $this->attributes['title_en'] ?? ''; }
    public function getDescArAttribute() { return $this->attributes['desc_ar'] ?? ''; }
    public function getDescEnAttribute() { return $this->attributes['desc_en'] ?? ''; }
    public function getFileSizeAttribute() { return $this->attributes['file_size'] ?? '2.5 MB'; }
    public function getFileUrlAttribute() { return $this->attributes['file_url'] ?? ''; }
    public function getPdfUrlAttribute() { return $this->attributes['file_url'] ?? ''; }
}
