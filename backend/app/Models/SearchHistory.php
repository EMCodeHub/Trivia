<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SearchHistory extends Model
{
    use HasFactory;

    // Especificar el nombre de la tabla
    protected $table = 'search_history';

    // Campos que son asignables
    protected $fillable = [
        'full_name',
        'email',
        'question_count',
        'difficulty',
        'type',
    ];
}
