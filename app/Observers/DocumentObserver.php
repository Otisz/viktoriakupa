<?php

namespace App\Observers;

use App\Models\Document;
use Illuminate\Support\Facades\Storage;

class DocumentObserver
{
    public function deleted(Document $document): void
    {
        Storage::disk('public')->delete($document->file_path);
    }
}
