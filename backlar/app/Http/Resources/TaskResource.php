<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class TaskResource extends JsonResource
{
    public static $wrap = false;

    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'task_name' => $this->task_name,
            'description' => $this->description,
            'task_date' => Carbon::parse($this->task_date)->format('Y-m-d\TH:i'),
            'task_status' => $this->task_status,
            'created_at' => $this->created_at,
            'user_id' => $this->user_id
        ];
    }
}
