<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Socialite;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\PlanPageController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\TrashPageController;
use App\Http\Controllers\WebhookController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/home', [HomePageController::class, 'index'])->name('home.index');
    Route::post('/home', [HomePageController::class, 'store'])->name('home.store');
    Route::post('/home/destroy/{loopSetting}', [HomePageController::class, 'destroy'])->name('home.destroy');
    Route::post('/home/favorite/{loopSetting}', [HomePageController::class, 'favorite'])->name('home.favorite');
    Route::get('/plan', [PlanPageController::class, 'index'])->name('plan.index');
    Route::post('/subscription/checkout', [SubscriptionController::class, 'checkout'])->name('subscription.checkout');
    Route::get('/subscription/success', [SubscriptionController::class, 'success'])->name('subscription.success');
    Route::get('/trash', [TrashPageController::class, 'index'])->name('trash.index');
    Route::post('/trash/restore/{loopSetting}', [TrashPageController::class, 'restore'])->name('trash.restore')->withTrashed();
    Route::delete('/trash/{loopSetting}', [TrashPageController::class, 'destroy'])->name('trash.destroy')->withTrashed();
});

Route::get('/auth/redirect', function () {
    return Socialite::driver('google')->redirect();
});

Route::get('/auth/google/callback', function () {
    $googleUser = Socialite::driver('google')->user();

    $user = User::where('google_id', $googleUser->id)
        ->orWhere('email', $googleUser->email)
        ->first();

    if ($user) {
        $user->update(['google_id' => $googleUser->id]);
    } else {
        $user = User::create([
            'name' => $googleUser->name,
            'email' => $googleUser->email,
            'google_id' => $googleUser->id,
        ]);
    }

    Auth::login($user);

    return redirect('/home');
});



Route::get('/terms', function () {
    return Inertia::render('TermsOfService');
})->name('terms');

Route::get('/privacy', function () {
    return Inertia::render('PrivacyPolicy');
})->name('privacy');

Route::post('/stripe/webhook', [WebhookController::class, 'handleWebhook']);

require __DIR__.'/auth.php';
