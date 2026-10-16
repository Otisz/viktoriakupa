<?php

namespace App\Filament\Resources\Posts\Tables;

use App\Models\Post;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;

class PostsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('featured_image')
                    ->label('Borítókép')
                    ->disk('public')
                    ->visibility('public'),
                TextColumn::make('title')
                    ->label('Cím')
                    ->searchable()
                    ->wrap(),
                self::statusColumn(),
                TextColumn::make('published_at')
                    ->label('Megjelenés dátuma')
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->label('Utoljára módosítva')
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('deleted_at')
                    ->dateTime()
                    ->sortable()
                    ->label('Törölve')
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('published_at', 'desc')
            ->filters([
                TrashedFilter::make(),
            ])
            ->recordActions([
                EditAction::make(),
            ]);
    }

    public static function statusColumn(): TextColumn
    {
        return TextColumn::make('status')
            ->label('Állapot')
            ->badge()
            ->state(fn (Post $record): string => match (true) {
                $record->published_at === null => 'Piszkozat',
                $record->published_at->isFuture() => 'Időzített',
                default => 'Megjelent',
            })
            ->color(fn (string $state): string => match ($state) {
                'Piszkozat' => 'gray',
                'Időzített' => 'warning',
                default => 'success',
            });
    }
}
