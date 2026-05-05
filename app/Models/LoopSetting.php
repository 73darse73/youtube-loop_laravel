<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class LoopSetting extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'video_id',
        'title',
        'description',
        'is_favorite',
        'start_time',
        'end_time',
        'share_token',
    ];

    protected $casts = [
        'start_time' => 'float',
        'end_time' => 'float',
        'is_favorite' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function generateShareToken(): string
    {
        $token = \Illuminate\Support\Str::uuid()->toString();
        $this->update(['share_token' => $token]);
        return $token;
    }
}
