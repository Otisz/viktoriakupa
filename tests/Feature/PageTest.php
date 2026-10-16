<?php

namespace Tests\Feature;

use App\Models\Page;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia;
use Tests\TestCase;

class PageTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
    }

    public function test_about_us_renders_the_rolunk_page(): void
    {
        Page::query()->whereSlug('rolunk')->update(['content' => '<p>Rólunk szöveg</p>']);

        $this->get(route('about-us'))
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $page) => $page
                ->component('about-us')
                ->where('about.content', '<p>Rólunk szöveg</p>'));
    }

    public function test_calendar_renders_the_versenynaptar_page(): void
    {
        Page::query()->whereSlug('versenynaptar')->update(['content' => '<table></table>']);

        $this->get(route('calendar'))
            ->assertOk()
            ->assertInertia(fn (AssertableInertia $page) => $page
                ->component('calendar')
                ->where('calendar.content', '<table></table>'));
    }
}
