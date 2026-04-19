<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\UseCases\HomePageUseCase;

class HomePageController extends Controller
{
    /**
     * Display the home page.
     */
    public function index(Request $request, HomePageUseCase $useCase): Response
    {
        $results = $useCase->index($request->user());

        return Inertia::render('Home', [
            'loopSettings' => $results['loopSettings'],
            'isPro' => $results['isPro'],
        ]);
    }
}
