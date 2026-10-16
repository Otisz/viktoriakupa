<?php

namespace App\Filament\Resources\Documents\Schemas;

use App\Models\DocumentType;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class DocumentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->maxLength(255)
                    ->label('Cím')
                    ->required(),
                Select::make('document_type_id')
                    ->label('Típus')
                    ->options(DocumentType::query()->pluck('title', 'id'))
                    ->required(),
                FileUpload::make('file_path')
                    ->directory('documents')
                    ->visibility('public')
                    ->disk('public')
                    ->storeFileNamesIn('file_name')
                    ->label('Fájl')
                    ->downloadable()
                    ->openable()
                    ->required(),
            ]);
    }
}
