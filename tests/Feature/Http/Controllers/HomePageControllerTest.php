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
