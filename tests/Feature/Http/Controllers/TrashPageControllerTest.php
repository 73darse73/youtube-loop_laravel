<?php

use App\Models\LoopSetting;
use App\Models\User;

test('index 正常時 200が返ってくる', function () {
    $user = User::factory()->create();
    $response = $this->actingAs($user)->get('/trash');

    $response->assertStatus(200);
});

test('index 異常時 未認証はリダイレクトされる', function () {
    $response = $this->get('/trash');

    $response->assertRedirect('/login');
});

test('restore 正常時 ループ設定が復元されてリダイレクトされる', function () {
    $user = User::factory()->create();
    $loopSetting = LoopSetting::factory()->create(['user_id' => $user->id]);
    $loopSetting->delete();

    $response = $this->actingAs($user)->post("/trash/restore/{$loopSetting->id}");

    $response->assertRedirect('/trash');
    $this->assertNotSoftDeleted('loop_settings', ['id' => $loopSetting->id]);
});

test('restore 異常時 未認証はリダイレクトされる', function () {
    $loopSetting = LoopSetting::factory()->create();
    $loopSetting->delete();

    $response = $this->post("/trash/restore/{$loopSetting->id}");

    $response->assertRedirect('/login');
});

test('destroy 正常時 ループ設定が完全削除されてリダイレクトされる', function () {
    $user = User::factory()->create();
    $loopSetting = LoopSetting::factory()->create(['user_id' => $user->id]);
    $loopSetting->delete();

    $response = $this->actingAs($user)->delete("/trash/{$loopSetting->id}");

    $response->assertRedirect('/trash');
    $this->assertDatabaseMissing('loop_settings', ['id' => $loopSetting->id]);
});

test('destroy 異常時 未認証はリダイレクトされる', function () {
    $loopSetting = LoopSetting::factory()->create();
    $loopSetting->delete();

    $response = $this->delete("/trash/{$loopSetting->id}");

    $response->assertRedirect('/login');
});
