<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PreferenceController;
use App\Http\Controllers\SnapshotController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// Protected routes
Route::group(['middleware' => ['auth:sanctum']], function ()
{
    Route::get('/getUser', [AuthController::class, 'getUser']);
    Route::put('/updateInfo', [AuthController::class, 'updateInfo']);
    Route::put('/updatePassword', [AuthController::class, 'updatePassword']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::delete('/delete', [AuthController::class, 'delete']);
    Route::put('/updatePreferences', [PreferenceController::class, 'updatePreferences']);
    Route::post('/createSnapshot', [SnapshotController::class, 'createSnapshot']);
    Route::get('/getSnapshot', [SnapshotController::class, 'getSnapshot']);
    Route::put('updateSnapshot', [SnapshotController::class, 'updateSnapshot']);
});