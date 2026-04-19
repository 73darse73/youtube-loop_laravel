<?php

namespace App\Http\Controllers;

use App\Models\LoopSetting;
use App\UseCases\TrashPageUseCase;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TrashPageController extends Controller
{
    public function index(Request $request, TrashPageUseCase $useCase): Response
    {
        $results = $useCase->index($request->user());

        return Inertia::render('Trash', [
            'loopSettings' => $results['loopSettings'],
            'isPro' => $results['isPro'],
        ]);
    }

    public function restore(LoopSetting $loopSetting, TrashPageUseCase $useCase)
    {
        $useCase->restore($loopSetting);

        return redirect()->route('trash.index');
    }

    public function destroy(LoopSetting $loopSetting, TrashPageUseCase $useCase)
    {
        $useCase->destroy($loopSetting);

        return redirect()->route('trash.index');
    }
}
