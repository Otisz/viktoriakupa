<?php

namespace Tests\Feature;

use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class PostTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
    }

    public function test_index_lists_only_published_posts(): void
    {
        $published = Post::factory()->create();
        Post::factory()->draft()->create();
        Post::factory()->scheduled()->create();

        $this->get(route('posts.index'))
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $page) => $page
                ->component('posts')
                ->has('posts.data', 1)
                ->where('posts.data.0.slug', $published->slug)
                ->where('posts.data.0.featured_image_url', $published->featured_image_url));
    }

    public function test_home_lists_the_latest_five_published_posts(): void
    {
        Post::factory()->count(6)->create();
        Post::factory()->draft()->create();

        $this->get(route('home'))
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $page) => $page
                ->component('home')
                ->has('posts', 5));
    }

    public function test_show_renders_a_published_post(): void
    {
        $post = Post::factory()->create();

        $this->get(route('posts.show', $post->slug))
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $page) => $page
                ->component('post')
                ->where('post.title', $post->title)
                ->where('post.content', $post->content));
    }

    public function test_show_returns_not_found_for_draft_posts(): void
    {
        $post = Post::factory()->draft()->create();

        $this->get(route('posts.show', $post->slug))->assertNotFound();
    }

    public function test_show_returns_not_found_for_scheduled_posts(): void
    {
        $post = Post::factory()->scheduled()->create();

        $this->get(route('posts.show', $post->slug))->assertNotFound();
    }

    public function test_show_returns_not_found_for_deleted_posts(): void
    {
        $post = Post::factory()->create();
        $post->delete();

        $this->get(route('posts.show', $post->slug))->assertNotFound();
    }

    public function test_show_removes_blank_spacer_paragraphs(): void
    {
        $post = Post::factory()->create([
            'content' => '<p><strong>Cím</strong></p><p style="text-align: center"><strong>&nbsp;</strong></p><p></p><p><br></p><p>Szöveg</p>',
        ]);

        $this->get(route('posts.show', $post->slug))
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $page) => $page
                ->where('post.content', '<p><strong>Cím</strong></p><p>Szöveg</p>'));
    }
}
