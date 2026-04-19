<?php

use App\Models\LoopSetting;
use App\Models\User;
use App\UseCases\TrashPageUseCase;

beforeEach(function () {
    $this->useCase = new TrashPageUseCase;
});

test('削除済みループ設定を取得できる', function () {
    $user = User::factory()->create();
    $loopSetting = LoopSetting::factory()->create(['user_id' => $user->id]);
    $loopSetting->delete();

    $results = $this->useCase->index($user);

    $this->assertCount(1, $results['loopSettings']);
    $this->assertEquals($loopSetting->id, $results['loopSettings']->first()->id);
});

test('削除済みでないループ設定は取得されない', function () {
    $user = User::factory()->create();
    LoopSetting::factory()->create(['user_id' => $user->id]);

    $results = $this->useCase->index($user);

    $this->assertCount(0, $results['loopSettings']);
});

test('ループ設定を復元できる', function () {
    $loopSetting = LoopSetting::factory()->create();
    $loopSetting->delete();

    $this->useCase->restore($loopSetting);

    $this->assertNotSoftDeleted('loop_settings', ['id' => $loopSetting->id]);
});

test('ループ設定を完全削除できる', function () {
    $loopSetting = LoopSetting::factory()->create();
    $loopSetting->delete();

    $this->useCase->destroy($loopSetting);

    $this->assertDatabaseMissing('loop_settings', ['id' => $loopSetting->id]);
});
