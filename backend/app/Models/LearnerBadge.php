<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class LearnerBadge extends Pivot
{
    protected $table = 'learner_badge';
    protected $casts = [
        'awarded_at' => 'datetime'
    ];

    public function badge()
{
    return $this->belongsTo(Badge::class);
}

}
