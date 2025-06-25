<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Challenge extends Model
{
        protected $fillable = [
        'title', 
        'description', 
        'difficulty',  
        'image'
    ];

     public function subproblems()
    {
        return $this->hasMany(Subproblem::class);
    }
}
