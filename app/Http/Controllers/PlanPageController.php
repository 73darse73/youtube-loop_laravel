<?php

namespace App\Http\Controllers;

use App\UseCases\PlanPageUseCase;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PlanPageController extends Controller
{
    public function index(Request $request, PlanPageUseCase $useCase): Response
    {
        $results = $useCase->index($request->user());

        return Inertia::render('Plan', [
            'isPro' => $results['isPro'],
            'loopCount' => $results['loopCount'],
        ]);
    }
}
