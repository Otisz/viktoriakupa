<?php

namespace App\Http\Controllers;

use App\Models\DocumentType;
use App\Models\Post;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $staticUrls = collect(['home', 'posts.index', 'about-us', 'clubs', 'calendar', 'contact'])
            ->map(fn (string $name): array => ['loc' => route($name), 'lastmod' => null]);

        $documentTypeUrls = DocumentType::query()
            ->orderBy('title')
            ->get(['slug', 'updated_at'])
            ->map(fn (DocumentType $documentType): array => [
                'loc' => route('documents.by-type', $documentType->slug),
                'lastmod' => $documentType->updated_at,
            ]);

        $postUrls = Post::query()
            ->published()
            ->orderBy('published_at', 'desc')
            ->get(['slug', 'updated_at'])
            ->map(fn (Post $post): array => [
                'loc' => route('posts.show', $post->slug),
                'lastmod' => $post->updated_at,
            ]);

        return response()
            ->view('sitemap', ['urls' => $staticUrls->concat($documentTypeUrls)->concat($postUrls)])
            ->header('Content-Type', 'application/xml');
    }
}
