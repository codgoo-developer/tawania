<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EthicsItem extends Model
{
    protected $table = 'ethics';

    protected $fillable = [
        'slug_id',
        'num',
        'title_ar',
        'title_en',
        'desc_ar',
        'desc_en',
        'file_name',
        'file_size',
        'file_url',
    ];

    protected $casts = [
        'num' => 'integer',
    ];

    protected $appends = [
        'titleAr',
        'titleEn',
        'descAr',
        'descEn',
        'fileName',
        'fileSize',
        'fileUrl',
    ];

    public function getTitleArAttribute() { return $this->attributes['title_ar'] ?? ''; }
    public function getTitleEnAttribute() { return $this->attributes['title_en'] ?? ''; }
    public function getDescArAttribute() { return $this->attributes['desc_ar'] ?? ''; }
    public function getDescEnAttribute() { return $this->attributes['desc_en'] ?? ''; }
    public function getFileNameAttribute() { return $this->attributes['file_name'] ?? 'Ethical-Charter-and-Code-of-Conduct.pdf'; }
    public function getFileSizeAttribute() { return $this->attributes['file_size'] ?? '2.4 MB'; }
    public function getFileUrlAttribute() { return $this->attributes['file_url'] ?? ''; }
}
