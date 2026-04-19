<?php

use App\Models\User;

test('index 正常時 200が返ってくる', function () {
    $user = User::factory()->create();
    $response = $this->actingAs($user)->get('/home');

    $response->assertStatus(200);
});

test('index 異常時 403が返ってくる', function () {
    $response = $this->get('/home');
    $response->assertStatus(302);
});

test('store 正常時 ループ設定が保存されてリダイレクトされる', function () {
    $user = User::factory()->create();
    $payload = [
        'video_id' => 'dQw4w9WgXcQ',
        'title' => 'テストタイトル',
        'description' => 'テストメモ',
        'start_time' => 10.5,
        'end_time' => 30.0,
    ];

    $response = $this->actingAs($user)->post('/home', $payload);

    $response->assertRedirect('/home');
    $this->assertDatabaseHas('loop_settings', [
        'user_id' => $user->id,
        'video_id' => 'dQw4w9WgXcQ',
        'title' => 'テストタイトル',
    ]);
});

test('store 正常時 titleがnullでも保存できる', function () {
    $user = User::factory()->create();
    $payload = [
        'video_id' => 'dQw4w9WgXcQ',
        'title' => null,
        'start_time' => 10.0,
        'end_time' => 30.0,
    ];

    $response = $this->actingAs($user)->post('/home', $payload);

    $response->assertRedirect('/home');
    $this->assertDatabaseHas('loop_settings', [
        'user_id' => $user->id,
        'video_id' => 'dQw4w9WgXcQ',
        'title' => null,
    ]);
});

test('store 異常時 未認証はリダイレクトされる', function () {
    $response = $this->post('/home', [
        'video_id' => 'dQw4w9WgXcQ',
        'start_time' => 10.0,
        'end_time' => 30.0,
    ]);

    $response->assertRedirect('/login');
});

test('store 異常時 video_idがない場合はバリデーションエラー', function () {
    $user = User::factory()->create();
    $response = $this->actingAs($user)->post('/home', [
        'start_time' => 10.0,
        'end_time' => 30.0,
    ]);

    $response->assertSessionHasErrors('video_id');
});
