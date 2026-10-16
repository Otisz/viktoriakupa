<?php

namespace Tests\Feature;

use App\Models\DocumentType;
use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class SeoTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
    }

    public function test_sitemap_lists_public_pages_document_types_and_published_posts(): void
    {
        $documentType = DocumentType::query()->forceCreate(['title' => 'Versenykiírások']);
        $published = Post::factory()->create();
        $draft = Post::factory()->draft()->create();

        $this->get(route('sitemap'))
            ->assertOk()
            ->assertHeader('Content-Type', 'application/xml')
            ->assertSee('<loc>'.route('home').'</loc>', false)
            ->assertSee('<loc>'.route('calendar').'</loc>', false)
            ->assertSee('<loc>'.route('documents.by-type', $documentType->slug).'</loc>', false)
            ->assertSee('<loc>'.route('posts.show', $published->slug).'</loc>', false)
            ->assertDontSee(route('posts.show', $draft->slug), false);
    }

    public function test_canonical_url_drops_query_parameters_except_the_page_number(): void
    {
        $this->get(route('posts.index', ['page' => 2, 'utm_source' => 'facebook']))
            ->assertInertia(fn (AssertableInertia $page) => $page
                ->where('canonicalUrl', route('posts.index').'?page=2'));

        $this->get(route('contact', ['utm_source' => 'facebook']))
            ->assertInertia(fn (AssertableInertia $page) => $page
                ->where('canonicalUrl', route('contact')));
    }

    public function test_pages_include_sports_organization_structured_data(): void
    {
        $this->get(route('contact'))
            ->assertOk()
            ->assertSee('"@type":"SportsOrganization"', false);
    }
}
