<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Subproblem extends Model
{
    use HasFactory;

    protected $fillable = [
        'challenge_id',
        'title',
        'description',
        'hint',
        'expected_output',
        'test_cases'
    ];

     // Relationship: Each Subproblem belongs to one Challenge
    public function challenge()
    {
        return $this->belongsTo(Challenge::class);
    }
}
