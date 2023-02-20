<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'task_name' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'task_date' => $this->faker->date('Y_m_d'),
            'task_status' => $this->faker->boolean,
        ];
    }
}
