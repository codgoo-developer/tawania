<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    protected $table = 'submissions';

    protected $fillable = [
        'submission_code',
        'module',
        'sender_name',
        'sender_contact',
        'title',
        'details',
        'json_data',
        'status',
    ];

    protected $casts = [
        'json_data' => 'array',
    ];

    protected $appends = [
        'senderName',
        'senderContact',
        'createdAt',
        'submissionCode',
    ];

    public function getSenderNameAttribute() { return $this->attributes['sender_name'] ?? null; }
    public function getSenderContactAttribute() { return $this->attributes['sender_contact'] ?? null; }
    public function getCreatedAtAttribute() { return isset($this->attributes['created_at']) ? date('Y-m-d H:i', strtotime($this->attributes['created_at'])) : date('Y-m-d H:i'); }
    public function getSubmissionCodeAttribute() { return $this->attributes['submission_code'] ?? null; }
}
