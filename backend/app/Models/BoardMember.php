<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BoardMember extends Model
{
    protected $table = 'board_members';

    protected $fillable = [
        'name_ar',
        'name_en',
        'role_ar',
        'role_en',
        'badge_ar',
        'badge_en',
        'phone',
        'email',
        'bio_ar',
        'bio_en',
        'initials_ar',
        'order',
        'is_ceo',
        'is_chairman',
    ];

    protected $casts = [
        'order' => 'integer',
        'is_ceo' => 'boolean',
        'is_chairman' => 'boolean',
    ];

    protected $appends = [
        'nameAr',
        'nameEn',
        'roleAr',
        'roleEn',
        'badgeAr',
        'badgeEn',
        'bioAr',
        'bioEn',
        'initialsAr',
        'isChairman',
        'isCeo',
    ];

    public function getNameArAttribute() { return $this->attributes['name_ar'] ?? null; }
    public function getNameEnAttribute() { return $this->attributes['name_en'] ?? null; }
    public function getRoleArAttribute() { return $this->attributes['role_ar'] ?? 'عضو مجلس الإدارة'; }
    public function getRoleEnAttribute() { return $this->attributes['role_en'] ?? 'Board Member'; }
    public function getBadgeArAttribute() { return $this->attributes['badge_ar'] ?? 'عضو مجلس الإدارة'; }
    public function getBadgeEnAttribute() { return $this->attributes['badge_en'] ?? 'Board Member'; }
    public function getBioArAttribute() { return $this->attributes['bio_ar'] ?? null; }
    public function getBioEnAttribute() { return $this->attributes['bio_en'] ?? null; }
    public function getInitialsArAttribute() { return $this->attributes['initials_ar'] ?? null; }
    public function getIsChairmanAttribute() { return (bool)($this->attributes['is_chairman'] ?? false); }
    public function getIsCeoAttribute() { return (bool)($this->attributes['is_ceo'] ?? false); }
}
