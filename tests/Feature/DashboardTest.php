<?php

namespace Tests\Feature;

use App\Filament\Pages\Dashboard;
use App\Filament\Resources\Posts\PostResource;
use App\Filament\Widgets\LatestPosts;
use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Livewire\Livewire;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->actingAs(User::factory()->create());
    }

    public function test_dashboard_links_to_creating_a_post(): void
    {
        Livewire::test(Dashboard::class)
            ->assertOk()
            ->assertActionHasUrl('createPost', PostResource::getUrl('create'));
    }

    public function test_latest_posts_widget_shows_the_five_most_recently_updated_posts_including_drafts(): void
    {
        $older = Post::factory()->create(['updated_at' => now()->subWeek()]);
        $recent = Post::factory()->count(4)->create();
        $draft = Post::factory()->draft()->create();

        Livewire::test(LatestPosts::class)
            ->assertCanSeeTableRecords($recent->push($draft))
            ->assertCanNotSeeTableRecords([$older]);
    }
}
