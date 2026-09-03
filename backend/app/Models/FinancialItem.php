<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FinancialItem extends Model
{
    protected $table = 'financials';

    protected $fillable = [
        'slug_id', 'year', 'title_ar', 'title_en', 'status',
        'audit_firm_ar', 'audit_firm_en', 'file_size', 'file_url',
        'revenue', 'expenses', 'net_surplus',
    ];

    protected $appends = [
        'slugId', 'titleAr', 'titleEn', 'auditFirmAr', 'auditFirmEn',
        'fileSize', 'fileUrl', 'pdfUrl', 'netSurplus', 'surplus', 'downloadUrl',
    ];

    public function getIdAttribute() { return $this->attributes['slug_id'] ?? $this->attributes['id']; }
    public function getSlugIdAttribute() { return $this->attributes['slug_id'] ?? ''; }
    public function getTitleArAttribute() { return $this->attributes['title_ar'] ?? ''; }
    public function getTitleEnAttribute() { return $this->attributes['title_en'] ?? ''; }
    public function getAuditFirmArAttribute() { return $this->attributes['audit_firm_ar'] ?? 'مكتب المحاسب القانوني المعتمد'; }
    public function getAuditFirmEnAttribute() { return $this->attributes['audit_firm_en'] ?? 'Certified Chartered Accountants'; }
    public function getFileSizeAttribute() { return $this->attributes['file_size'] ?? '3.5 MB'; }
    public function getFileUrlAttribute() { return $this->attributes['file_url'] ?? ''; }
    public function getPdfUrlAttribute() { return $this->attributes['file_url'] ?? ''; }
    public function getDownloadUrlAttribute() { return $this->attributes['file_url'] ?? ''; }
    public function getNetSurplusAttribute() { return $this->attributes['net_surplus'] ?? ''; }
    public function getSurplusAttribute() { return $this->attributes['net_surplus'] ?? ''; }
}
