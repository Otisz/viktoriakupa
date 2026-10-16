<?php

namespace App\Filament\Resources\Posts\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Utilities\Get;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class PostForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('title')
                    ->label('Cím')
                    ->required()
                    ->maxLength(255)
                    ->trim()
                    ->live(onBlur: true)
                    ->afterStateUpdated(function (Get $get, Set $set, ?string $old, ?string $state): void {
                        if (($get('slug') ?? '') !== Str::slug($old ?? '')) {
                            return;
                        }

                        $set('slug', Str::slug($state ?? ''));
                    }),
                TextInput::make('slug')
                    ->label('Webcím')
                    ->helperText('Automatikusan kitöltődik a címből.')
                    ->required()
                    ->maxLength(255)
                    ->alphaDash()
                    ->unique(ignoreRecord: true),
                DateTimePicker::make('published_at')
                    ->label('Megjelenés dátuma')
                    ->helperText('Üresen hagyva piszkozat marad, jövőbeli dátummal időzítve jelenik meg.')
                    ->seconds(false),
                Textarea::make('description')
                    ->label('Összefoglaló')
                    ->rows(3)
                    ->columnSpanFull(),
                FileUpload::make('featured_image')
                    ->label('Borítókép')
                    ->image()
                    ->disk('public')
                    ->directory('posts')
                    ->visibility('public')
                    ->required()
                    ->columnSpanFull(),
                RichEditor::make('content')
                    ->label('Tartalom')
                    ->required()
                    ->toolbarButtons([
                        ['bold', 'italic', 'underline', 'link'],
                        ['h2', 'h3'],
                        ['bulletList', 'orderedList', 'blockquote'],
                        ['table', 'attachFiles'],
                        ['undo', 'redo'],
                    ])
                    ->fileAttachmentsDisk('public')
                    ->fileAttachmentsDirectory('posts/content')
                    ->fileAttachmentsVisibility('public')
                    ->columnSpanFull(),
            ]);
    }
}
