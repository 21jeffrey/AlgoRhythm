<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'subproblem_id',
        'code',
        'language',
        'passed',
        'output',
        'errors',
        'execution_time',
        'memory',
        'score',
    ];

    protected $casts = [
        'output' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function subproblem()
    {
        return $this->belongsTo(Subproblem::class);
    }
}
