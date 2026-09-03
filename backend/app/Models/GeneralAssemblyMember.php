<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GeneralAssemblyMember extends Model
{
    protected $table = 'general_assembly_members';

    protected $fillable = [
        'name',
        'name_en',
        'shares_count',
        'join_year',
        'city',
        'phone',
        'national_id',
        'status',
    ];

    protected $casts = [
        'shares_count' => 'integer',
    ];

    protected $appends = [
        'sharesCount',
        'joinYear',
        'nationalId',
        'nameEn',
    ];

    public function getSharesCountAttribute() { return (int)($this->attributes['shares_count'] ?? 0); }
    public function getJoinYearAttribute() { return (string)($this->attributes['join_year'] ?? '1440'); }
    public function getNationalIdAttribute() { return $this->attributes['national_id'] ?? null; }
    public function getNameEnAttribute() { return $this->attributes['name_en'] ?? null; }
}
