<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
 * @return array
 */
public function toArray($request)
{
    return [
        'id' => $this->id,
        'task_name' => $this->task_name,
        'description' => $this->description,
        'task_date' => $this->task_date,
        'task_status' => $this->task_status,
        'created_at' => $this->created_at
    ];
}}
