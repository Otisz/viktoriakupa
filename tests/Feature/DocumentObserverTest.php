<?php

namespace Tests\Feature;

use App\Models\Document;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class DocumentObserverTest extends TestCase
{
    use RefreshDatabase;

    public function test_deleting_a_document_removes_its_file_from_the_public_disk(): void
    {
        Storage::fake('public');
        $document = Document::factory()->create();
        Storage::disk('public')->put($document->file_path, 'pdf');

        $document->delete();

        Storage::disk('public')->assertMissing($document->file_path);
    }
}
