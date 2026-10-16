<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/rolunk', [HomeController::class, 'aboutUs'])->name('about-us');
Route::get('/egyesuletek', [HomeController::class, 'clubs'])->name('clubs');
Route::redirect('/dokumentumok', '/')->name('documents.index');
Route::get('/dokumentumok/{documentType:slug}', [HomeController::class, 'documents'])->name('documents.by-type');
Route::get('/versenynaptar', [HomeController::class, 'calendar'])->name('calendar');
Route::get('/kapcsolat', [HomeController::class, 'contact'])->name('contact');
Route::get('/hirek', [PostController::class, 'index'])->name('posts.index');
Route::get('/hirek/{slug}', [PostController::class, 'show'])->name('posts.show');
