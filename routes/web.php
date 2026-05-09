<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Socialite;
use App\Http\Controllers\HomePageController;
use App\Http\Controllers\PlanPageController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\TrashPageController;
use App\Http\Controllers\SharedLoopController;
use App\Http\Controllers\WebhookController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Middleware\AdminMiddleware;

Route::get('/', function () {
    return Inertia::render('Landing');
})->name('landing');


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
    Route::post('/subscription/cancel', [SubscriptionController::class, 'cancel'])->name('subscription.cancel');
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

Route::get('/commercial-disclosure', function () {
    return Inertia::render('CommercialDisclosure');
})->name('commercial-disclosure');

// 共有URL（ログイン不要）
Route::get('/s/{token}', [SharedLoopController::class, 'show'])->name('share.show');

// 共有トークン生成（ログイン必要）
Route::post('/home/share/{loopSetting}', [SharedLoopController::class, 'generateToken'])
    ->middleware('auth')
    ->name('share.generate');

Route::get('/sitemap.xml', function () {
    return response(view('sitemap'), 200)
        ->header('Content-Type', 'application/xml');
});

Route::post('/stripe/webhook', [WebhookController::class, 'handleWebhook']);

Route::middleware(['auth', AdminMiddleware::class])->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
});

require __DIR__.'/auth.php';
