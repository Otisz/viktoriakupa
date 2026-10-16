<?php

namespace Tests\Feature;

use App\Filament\Resources\Posts\Pages\CreatePost;
use App\Filament\Resources\Posts\Pages\EditPost;
use App\Filament\Resources\Posts\Pages\ListPosts;
use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Livewire\Livewire;
use Tests\TestCase;

class PostResourceTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->actingAs(User::factory()->create());
    }

    public function test_list_shows_posts_including_drafts(): void
    {
        $posts = Post::factory()->count(2)->create()
            ->push(Post::factory()->draft()->create());

        Livewire::test(ListPosts::class)
            ->assertOk()
            ->assertCanSeeTableRecords($posts);
    }

    public function test_can_create_a_post(): void
    {
        Storage::fake('public');

        Livewire::test(CreatePost::class)
            ->fillForm([
                'title' => 'Tavaszi verseny',
                'description' => 'Rövid összefoglaló',
                'featured_image' => UploadedFile::fake()->image('cover.jpg'),
                'content' => '<p>Tartalom</p>',
                'published_at' => now()->subHour(),
            ])
            ->assertSchemaStateSet(['slug' => 'tavaszi-verseny'])
            ->call('create')
            ->assertHasNoFormErrors()
            ->assertRedirect();

        $post = Post::query()->sole();

        $this->assertSame('tavaszi-verseny', $post->slug);
        Storage::disk('public')->assertExists($post->featured_image);
    }

    public function test_create_requires_title_content_and_featured_image(): void
    {
        Livewire::test(CreatePost::class)
            ->fillForm([
                'title' => null,
                'slug' => null,
                'content' => null,
                'featured_image' => null,
            ])
            ->call('create')
            ->assertHasFormErrors([
                'title' => 'required',
                'slug' => 'required',
                'content',
                'featured_image' => 'required',
            ]);
    }

    public function test_slug_must_be_unique(): void
    {
        Post::factory()->create(['slug' => 'foglalt']);

        Livewire::test(CreatePost::class)
            ->fillForm(['slug' => 'foglalt'])
            ->call('create')
            ->assertHasFormErrors(['slug' => 'unique']);
    }

    public function test_can_edit_a_post(): void
    {
        Storage::fake('public');

        $post = Post::factory()->create();
        Storage::disk('public')->put($post->featured_image, 'image');

        Livewire::test(EditPost::class, ['record' => $post->getRouteKey()])
            ->fillForm(['title' => 'Új cím'])
            ->call('save')
            ->assertHasNoFormErrors();

        $this->assertSame('Új cím', $post->refresh()->title);
    }
}
