<?php

namespace App\Models;
use Database\Factories\TaskFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{

    protected static function newFactory()
{
    return TaskFactory::new();
}

    use HasFactory;
    protected $fillable = [
        'task_name',
        'description',
        'task_date',
        // 'task_status'
    ];

    public function User () {
        return $this->belongsTo(User::class);
    }
}
