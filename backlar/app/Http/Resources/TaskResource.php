<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
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
        'task_date' => $this->task_date,
        'description' => $this->description,
        'task_status' => $this->task_status,
        'created_at' => $this->created_at->format('Y-m-d H:i')
    ];
}}