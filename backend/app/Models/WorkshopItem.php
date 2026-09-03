<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkshopItem extends Model
{
    protected $table = 'workshops';

    protected $fillable = [
        'slug_id', 'type', 'title_ar', 'title_en', 'date_ar', 'date_en',
        'location_ar', 'location_en', 'attendees_count', 'hours_count',
        'target_audience_ar', 'target_audience_en', 'trainer_ar', 'trainer_en',
        'desc_ar', 'desc_en', 'objectives_ar', 'objectives_en',
        'file_size', 'file_url',
    ];

    protected $appends = [
        'slugId', 'titleAr', 'titleEn', 'dateAr', 'dateEn', 'date',
        'locationAr', 'locationEn', 'attendeesCount', 'hoursCount',
        'targetAudienceAr', 'targetAudienceEn', 'trainerAr', 'trainerEn',
        'descAr', 'descEn', 'descriptionAr', 'objectivesAr', 'objectivesEn',
        'fileSize', 'fileUrl', 'pdfUrl',
    ];

    public function getIdAttribute() { return $this->attributes['slug_id'] ?? $this->attributes['id']; }
    public function getSlugIdAttribute() { return $this->attributes['slug_id'] ?? ''; }
    public function getTitleArAttribute() { return $this->attributes['title_ar'] ?? ''; }
    public function getTitleEnAttribute() { return $this->attributes['title_en'] ?? ''; }
    public function getDateArAttribute() { return $this->attributes['date_ar'] ?? ''; }
    public function getDateEnAttribute() { return $this->attributes['date_en'] ?? ''; }
    public function getDateAttribute() { return $this->attributes['date_ar'] ?? ''; }
    public function getLocationArAttribute() { return $this->attributes['location_ar'] ?? ''; }
    public function getLocationEnAttribute() { return $this->attributes['location_en'] ?? ''; }
    public function getAttendeesCountAttribute() { return (int)($this->attributes['attendees_count'] ?? 0); }
    public function getHoursCountAttribute() { return (int)($this->attributes['hours_count'] ?? 0); }
    public function getTargetAudienceArAttribute() { return $this->attributes['target_audience_ar'] ?? ''; }
    public function getTargetAudienceEnAttribute() { return $this->attributes['target_audience_en'] ?? ''; }
    public function getTrainerArAttribute() { return $this->attributes['trainer_ar'] ?? ''; }
    public function getTrainerEnAttribute() { return $this->attributes['trainer_en'] ?? ''; }
    public function getDescArAttribute() { return $this->attributes['desc_ar'] ?? ''; }
    public function getDescEnAttribute() { return $this->attributes['desc_en'] ?? ''; }
    public function getDescriptionArAttribute() { return $this->attributes['desc_ar'] ?? ''; }
    public function getFileSizeAttribute() { return $this->attributes['file_size'] ?? '3.5 MB'; }
    public function getFileUrlAttribute() { return $this->attributes['file_url'] ?? ''; }
    public function getPdfUrlAttribute() { return $this->attributes['file_url'] ?? ''; }

    public function getObjectivesArAttribute()
    {
        $val = $this->attributes['objectives_ar'] ?? null;
        if (empty($val)) return [];
        if (is_array($val)) return $val;
        $decoded = json_decode($val, true);
        return is_array($decoded) ? $decoded : [$val];
    }

    public function getObjectivesEnAttribute()
    {
        $val = $this->attributes['objectives_en'] ?? null;
        if (empty($val)) return [];
        if (is_array($val)) return $val;
        $decoded = json_decode($val, true);
        return is_array($decoded) ? $decoded : [$val];
    }
}
