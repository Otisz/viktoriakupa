<?php

namespace App\Filament\Widgets;

use App\Filament\Resources\Posts\PostResource;
use App\Filament\Resources\Posts\Tables\PostsTable;
use App\Models\Post;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget;

class LatestPosts extends TableWidget
{
    protected int|string|array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->heading('Legutóbbi hírek')
            ->query(Post::query()->latest('updated_at')->limit(5))
            ->paginated(false)
            ->columns([
                TextColumn::make('title')
                    ->label('Cím')
                    ->wrap(),
                PostsTable::statusColumn(),
                TextColumn::make('published_at')
                    ->label('Megjelenés dátuma')
                    ->dateTime(),
            ])
            ->recordUrl(fn (Post $record): string => PostResource::getUrl('edit', ['record' => $record]));
    }
}
