<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Badge extends Model
{
    protected $fillable = [
        'name', 
        'description', 
        'threshold_type', 
        'threshold_value', 
        'image'
    ];

    public function users() : BelongsToMany
    {
        return $this->belongsToMany(\App\Models\User::class, 'learner_badge', 'badge_id', 'learner_id')
                    ->withTimestamps()
                    ->withPivot('awarded_at');
    }
}
