<?php

namespace App\Http\Controllers;

use App\Http\Requests\HomeStoreRequest;
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

    public function store(HomeStoreRequest $request, HomePageUseCase $useCase)
    {
        $params = $request->validated();
        $params['user_id'] = $request->user()->id;
        $useCase->store($params);

        return redirect()->route('home.index');
    }
}
