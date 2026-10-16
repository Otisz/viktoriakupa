<?php

namespace App\Filament\Resources\DocumentTypes\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Component;
use Filament\Schemas\Schema;

class DocumentTypeForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components(self::components());
    }

    /**
     * @return array<Component>
     */
    public static function components(): array
    {
        return [
            TextInput::make('title')
                ->maxLength(255)
                ->label('Cím')
                ->required()
                ->unique(ignoreRecord: true)
                ->columnSpanFull(),
        ];
    }
}
