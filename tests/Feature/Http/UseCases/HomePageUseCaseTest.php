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

test('ループ設定を保存できる', function () {
    $user = User::factory()->create();
    $params = [
        'user_id' => $user->id,
        'video_id' => 'dQw4w9WgXcQ',
        'title' => 'テストタイトル',
        'description' => 'テストメモ',
        'start_time' => 10.5,
        'end_time' => 30.0,
    ];

    $result = $this->useCase->store($params);

    $this->assertInstanceOf(LoopSetting::class, $result);
    $this->assertEquals($user->id, $result->user_id);
    $this->assertEquals('dQw4w9WgXcQ', $result->video_id);
    $this->assertEquals('テストタイトル', $result->title);
});

test('titleがnullでもループ設定を保存できる', function () {
    $user = User::factory()->create();
    $params = [
        'user_id' => $user->id,
        'video_id' => 'dQw4w9WgXcQ',
        'title' => null,
        'start_time' => 10.0,
        'end_time' => 30.0,
    ];

    $result = $this->useCase->store($params);

    $this->assertNull($result->title);
});
