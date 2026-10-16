<?php

namespace Tests\Feature;

use App\Filament\Resources\Documents\Pages\CreateDocument;
use App\Models\DocumentType;
use App\Models\User;
use Filament\Actions\Testing\TestAction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Livewire\Livewire;
use Tests\TestCase;

class DocumentResourceTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $this->actingAs(User::factory()->create());
    }

    public function test_can_create_a_document_type_from_the_document_form(): void
    {
        $component = Livewire::test(CreateDocument::class)
            ->callAction(
                TestAction::make('createOption')->schemaComponent('document_type_id'),
                data: ['title' => 'Versenykiírás'],
            )
            ->assertHasNoFormErrors();

        $documentType = DocumentType::query()->sole();

        $this->assertSame('versenykiiras', $documentType->slug);
        $component->assertSchemaStateSet(['document_type_id' => $documentType->getKey()]);
    }
}
