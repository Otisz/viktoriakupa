<?php

namespace App\Filament\Resources\Pages\Tables;

use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class PagesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->label('Cím'),
                TextColumn::make('updated_at')
                    ->label('Utoljára módosítva')
                    ->dateTime(),
            ])
            ->defaultSort('title')
            ->paginated(false)
            ->recordActions([
                EditAction::make(),
            ]);
    }
}
