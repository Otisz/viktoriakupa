<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(): Response
    {
        $posts = Post::query()
            ->select(['id', 'title', 'slug', 'description', 'featured_image', 'published_at'])
            ->published()
            ->orderBy('published_at', 'desc')
            ->simplePaginate();

        return Inertia::render('posts', [
            'posts' => $posts,
        ]);
    }

    public function show(string $slug): Response
    {
        $post = Post::query()
            ->select(['id', 'title', 'slug', 'description', 'content', 'featured_image', 'published_at'])
            ->published()
            ->whereSlug($slug)
            ->firstOrFail();

        $post->content = $this->withoutBlankParagraphs($post->content);

        return Inertia::render('post', [
            'post' => $post,
        ]);
    }

    /**
     * Remove paragraphs the editor left as spacers, such as `<p><strong>&nbsp;</strong></p>`.
     */
    private function withoutBlankParagraphs(string $html): string
    {
        return preg_replace('#<p\b[^>]*>(?:\s|&nbsp;|\x{00A0}|<br\s*/?>|</?(?:strong|em|b|i|u|s|span)\b[^>]*>)*</p>#iu', '', $html) ?? $html;
    }
}
