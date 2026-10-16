<?php

namespace App\Filament\Resources\Clubs\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ClubForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Név')
                    ->required()
                    ->trim(),
                TextInput::make('url')
                    ->label('URL')
                    ->nullable()
                    ->url()
                    ->trim(),
                FileUpload::make('image_paths')
                    ->label('Kép')
                    ->image()
                    ->disk('public')
                    ->directory('trainers')
                    ->visibility('public')
                    ->downloadable()
                    ->openable()
                    ->required()
                    ->columnSpanFull(),
            ]);
    }
}
