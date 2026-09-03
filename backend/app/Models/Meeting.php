<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Meeting extends Model
{
    protected $table = 'meetings';

    protected $fillable = [
        'slug_id',
        'type',
        'title_ar',
        'title_en',
        'meeting_number',
        'date_ar',
        'date_en',
        'location_ar',
        'location_en',
        'attendees_count',
        'decisions_count',
        'desc_ar',
        'desc_en',
        'file_size',
        'file_url',
    ];

    protected $casts = [
        'attendees_count' => 'integer',
        'decisions_count' => 'integer',
    ];

    protected $appends = [
        'titleAr',
        'titleEn',
        'meetingNumber',
        'dateAr',
        'dateEn',
        'locationAr',
        'locationEn',
        'attendeesCount',
        'decisionsCount',
        'descAr',
        'descEn',
        'fileSize',
        'fileUrl',
    ];

    public function getTitleArAttribute() { return $this->attributes['title_ar'] ?? ''; }
    public function getTitleEnAttribute() { return $this->attributes['title_en'] ?? ''; }
    public function getMeetingNumberAttribute() { return $this->attributes['meeting_number'] ?? ''; }
    public function getDateArAttribute() { return $this->attributes['date_ar'] ?? ''; }
    public function getDateEnAttribute() { return $this->attributes['date_en'] ?? ''; }
    public function getLocationArAttribute() { return $this->attributes['location_ar'] ?? 'المقر الرئيسي للجمعية'; }
    public function getLocationEnAttribute() { return $this->attributes['location_en'] ?? 'Main Headquarters'; }
    public function getAttendeesCountAttribute() { return (int)($this->attributes['attendees_count'] ?? 0); }
    public function getDecisionsCountAttribute() { return (int)($this->attributes['decisions_count'] ?? 0); }
    public function getDescArAttribute() { return $this->attributes['desc_ar'] ?? ''; }
    public function getDescEnAttribute() { return $this->attributes['desc_en'] ?? ''; }
    public function getFileSizeAttribute() { return $this->attributes['file_size'] ?? '2.0 MB'; }
    public function getFileUrlAttribute() { return $this->attributes['file_url'] ?? ''; }
}
