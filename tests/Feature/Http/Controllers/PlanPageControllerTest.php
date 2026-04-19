<?php

use App\Models\User;

test('index 正常時 200が返ってくる', function () {
    $user = User::factory()->create();
    $response = $this->actingAs($user)->get('/plan');

    $response->assertStatus(200);
});

test('index 異常時 未認証はリダイレクトされる', function () {
    $response = $this->get('/plan');

    $response->assertRedirect('/login');
});
