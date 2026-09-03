<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GovernanceDocument extends Model
{
    protected $table = 'governance_documents';

    protected $fillable = [
        'type',
        'title_ar',
        'title_en',
        'doc_number',
        'year',
        'file_url',
        'category',
        'metadata',
    ];

    protected $casts = [
        'metadata' => 'array',
    ];
}
