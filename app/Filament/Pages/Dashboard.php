<?php

namespace App\Filament\Pages;

use App\Filament\Resources\Posts\PostResource;
use Filament\Actions\Action;
use Filament\Pages\Dashboard as BaseDashboard;
use Filament\Support\Icons\Heroicon;

class Dashboard extends BaseDashboard
{
    protected static ?string $title = 'Kezdőlap';

    protected static ?string $navigationLabel = 'Kezdőlap';

    protected function getHeaderActions(): array
    {
        return [
            Action::make('createPost')
                ->label('Új hír')
                ->icon(Heroicon::OutlinedPlus)
                ->url(PostResource::getUrl('create')),
        ];
    }
}
