<?php

namespace Database\Factories;

use App\Models\LoopSetting;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<LoopSetting>
 */
class LoopSettingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $videoIds = ['dQw4w9WgXcQ', 'jNQXAC9IVRw', 'kJQP7kiw5Fk', 'RgKAFK5djSk', '9bZkp7q19f0'];
        $start = fake()->randomFloat(1, 0, 120);

        return [
            'user_id' => User::factory(),
            'video_id' => fake()->randomElement($videoIds),
            'title' => fake()->sentence(3),
            'description' => fake()->optional()->sentence(),
            'is_favorite' => fake()->boolean(20),
            'start_time' => $start,
            'end_time' => $start + fake()->randomFloat(1, 10, 60),
        ];
    }
}
