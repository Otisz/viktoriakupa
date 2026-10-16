<?php

namespace App\Http\Controllers;

use App\Models\Club;
use App\Models\DocumentType;
use Illuminate\Http\Request;
use Inertia\Inertia;
use LaraZeus\Sky\Models\Post;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $posts = Post::query()
            ->select(['id', 'title', 'slug', 'description', 'published_at'])
            ->published()
            ->orderBy('published_at', 'desc')
            ->with('media')
            ->limit(6)
            ->get();

        return Inertia::render('home', [
            'posts' => $posts,
        ]);
    }

    public function aboutUs()
    {
        $about = Post::query()->page()->whereSlug('rolunk')->firstOrFail();

        return Inertia::render('about-us', [
            'about' => $about,
        ]);
    }

    public function clubs()
    {
        $clubs = Club::query()->orderBy('name')->get();

        return Inertia::render('clubs', [
            'clubs' => $clubs,
        ]);
    }

    public function documents(DocumentType $documentType)
    {
        $documents = $documentType->documents()->orderBy('title')->get();

        return Inertia::render('documents', [
            'documentType' => $documentType->toArray(),
            'documents' => $documents->toArray(),
        ]);
    }

    public function calendar()
    {
        $calendar = Post::query()->page()->whereSlug('versenynaptar')->firstOrFail();

        return Inertia::render('calendar', [
            'calendar' => $calendar,
        ]);
    }

    public function contact()
    {
        return Inertia::render('contact');
    }
}
