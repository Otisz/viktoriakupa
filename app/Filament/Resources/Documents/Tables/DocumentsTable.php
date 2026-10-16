<?php

namespace App\Filament\Resources\Documents\Tables;

use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class DocumentsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->label('Cím')
                    ->searchable(),
                TextColumn::make('documentType.title')
                    ->label('Típus'),
                TextColumn::make('updated_at')
                    ->label('Utoljára módosítva')
                    ->dateTime(),
            ])
            ->filters([
                //
            ])
            ->recordActions([
                EditAction::make(),
            ]);
    }
}
