<?php

namespace Tests\Feature;

use App\Filament\Resources\Pages\PageResource;
use App\Filament\Resources\Pages\Pages\EditPage;
use App\Filament\Resources\Pages\Pages\ListPages;
use App\Models\Page;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Livewire\Livewire;
use Tests\TestCase;

class PageResourceTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->actingAs(User::factory()->create());
    }

    public function test_list_shows_the_seeded_pages_without_create_action(): void
    {
        Livewire::test(ListPages::class)
            ->assertOk()
            ->assertCanSeeTableRecords(Page::all())
            ->assertActionDoesNotExist('create');
    }

    public function test_can_edit_a_page(): void
    {
        $page = Page::query()->whereSlug('rolunk')->sole();

        Livewire::test(EditPage::class, ['record' => $page->getRouteKey()])
            ->fillForm([
                'title' => 'Rólunk',
                'content' => '<p>Új tartalom</p>',
            ])
            ->call('save')
            ->assertHasNoFormErrors();

        $this->assertStringContainsString('Új tartalom', $page->refresh()->content);
        $this->assertSame('rolunk', $page->slug);
    }

    public function test_pages_cannot_be_created_or_deleted(): void
    {
        $this->assertFalse(PageResource::canCreate());
        $this->assertFalse(PageResource::canDelete(Page::query()->first()));
        $this->assertArrayNotHasKey('create', PageResource::getPages());
    }
}
