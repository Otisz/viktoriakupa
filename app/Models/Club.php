<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Appends;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

#[Appends([
    'image_url',
])]
class Club extends Model
{
    use HasUuids;
    use SoftDeletes;

    protected function imageUrl(): Attribute
    {
        return Attribute::make(
            get: fn ($value, array $attributes) => Storage::url($attributes['image_paths']),
        );
    }
}
