<?php

namespace App\Http\Controllers;

use App\Models\LoopSetting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SharedLoopController extends Controller
{
    public function show(string $token): Response
    {
        $loop = LoopSetting::where('share_token', $token)->firstOrFail();

        return Inertia::render('Share', [
            'loop' => [
                'video_id'   => $loop->video_id,
                'title'      => $loop->title,
                'start_time' => $loop->start_time,
                'end_time'   => $loop->end_time,
            ],
        ]);
    }

    public function generateToken(Request $request, LoopSetting $loopSetting): JsonResponse
    {
        abort_if($loopSetting->user_id !== $request->user()->id, 403);

        if (!$loopSetting->share_token) {
            $loopSetting->generateShareToken();
        }

        return response()->json([
            'url' => url('/s/' . $loopSetting->share_token),
        ]);
    }
}
