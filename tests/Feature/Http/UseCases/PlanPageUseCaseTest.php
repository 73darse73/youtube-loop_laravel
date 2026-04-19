<?php

use App\Models\LoopSetting;
use App\Models\User;
use App\UseCases\PlanPageUseCase;

beforeEach(function () {
    $this->useCase = new PlanPageUseCase;
});

test('ユーザーのプラン情報とループ数を取得できる', function () {
    $user = User::factory()->create(['is_pro' => false]);
    LoopSetting::factory()->count(2)->create(['user_id' => $user->id]);

    $results = $this->useCase->index($user);

    $this->assertFalse($results['isPro']);
    $this->assertEquals(2, $results['loopCount']);
});

test('Proユーザーのプラン情報を取得できる', function () {
    $user = User::factory()->create(['is_pro' => true]);

    $results = $this->useCase->index($user);

    $this->assertTrue($results['isPro']);
});
