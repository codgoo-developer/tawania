<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExecutiveDirector extends Model
{
    protected $table = 'executive_directors';

    protected $fillable = [
        'name_ar',
        'name_en',
        'role_ar',
        'role_en',
        'badge_ar',
        'badge_en',
        'phone',
        'email',
        'description_ar',
        'description_en',
        'initials_ar',
        'image',
    ];

    protected $appends = [
        'nameAr',
        'nameEn',
        'roleAr',
        'roleEn',
        'badgeAr',
        'badgeEn',
        'descriptionAr',
        'descriptionEn',
        'initialsAr',
    ];

    public function getNameArAttribute() { return $this->attributes['name_ar'] ?? null; }
    public function getNameEnAttribute() { return $this->attributes['name_en'] ?? null; }
    public function getRoleArAttribute() { return $this->attributes['role_ar'] ?? 'المدير التنفيذي'; }
    public function getRoleEnAttribute() { return $this->attributes['role_en'] ?? 'Executive Director'; }
    public function getBadgeArAttribute() { return $this->attributes['badge_ar'] ?? 'المدير التنفيذي'; }
    public function getBadgeEnAttribute() { return $this->attributes['badge_en'] ?? 'Executive Director'; }
    public function getDescriptionArAttribute() { return $this->attributes['description_ar'] ?? null; }
    public function getDescriptionEnAttribute() { return $this->attributes['description_en'] ?? null; }
    public function getInitialsArAttribute() { return $this->attributes['initials_ar'] ?? null; }
}
