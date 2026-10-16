<?php

namespace App\Filament\Resources\Clubs\Tables;

use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;

class ClubsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Név')
                    ->searchable(),
                ImageColumn::make('image_paths')
                    ->visibility('public')
                    ->label('Kép'),
                TextColumn::make('url')
                    ->label('URL')
                    ->default('Nincs megadva'),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->label('Létrehozva')
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->label('Utoljára módítva')
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('deleted_at')
                    ->dateTime()
                    ->sortable()
                    ->label('Törölve')
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('name')
            ->filters([
                TrashedFilter::make(),
            ])
            ->recordActions([
                EditAction::make(),
            ]);
    }
}
