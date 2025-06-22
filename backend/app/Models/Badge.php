<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Badge extends Model
{
    protected $fillable = [
        'name', 
        'description', 
        'threshold_type', 
        'threshold_value', 
        'image'
    ];
}
