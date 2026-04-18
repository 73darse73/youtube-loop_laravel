<?php

use App\Models\User;
use App\Models\LoopSetting;
use App\UseCases\HomePageUseCase;

beforeEach(function () {
    $this->useCase = new HomePageUseCase;
});

test('保存済みループやプロ機能の有無を取得できているか', function () {
    $user = User::factory()->create();
    $loopSettings = LoopSetting::factory()->count(3)->create(['user_id' => $user->id]);
    $results = $this->useCase->index($user);

    $this->assertEquals(
        $loopSettings->pluck('id')->toArray(),
        $results['loopSettings']->pluck('id')->toArray()
    );
    $this->assertEquals($user->is_pro, $results['isPro']);
});
