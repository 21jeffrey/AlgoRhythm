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
    public function usersAttmepted(){
        return $this->$belongsToMany(User::class, 'user_attempt_challenge	')
        ->withTimestamps()
        ->withPivot('attempted_at');
    }

     public function subproblems()
    {
        return $this->hasMany(Subproblem::class);
    }
}
