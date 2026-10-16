<?php

namespace App\Http\Controllers;

use App\Models\Club;
use App\Models\DocumentType;
use App\Models\Page;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        $posts = Post::query()
            ->select(['id', 'title', 'slug', 'description', 'featured_image', 'published_at'])
            ->published()
            ->orderBy('published_at', 'desc')
            ->limit(6)
            ->get();

        return Inertia::render('home', [
            'posts' => $posts,
        ]);
    }

    public function aboutUs()
    {
        $about = Page::query()->whereSlug('rolunk')->firstOrFail();

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
        $calendar = Page::query()->whereSlug('versenynaptar')->firstOrFail();

        return Inertia::render('calendar', [
            'calendar' => $calendar,
        ]);
    }

    public function contact()
    {
        return Inertia::render('contact');
    }
}
