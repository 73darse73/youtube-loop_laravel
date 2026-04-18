<?php

namespace Database\Seeders;

use App\Models\LoopSetting;
use App\Models\User;
use Illuminate\Database\Seeder;

class LoopSettingSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('email', 'test@example.com')->first();

        LoopSetting::factory(5)->create(['user_id' => $user->id]);
    }
}
