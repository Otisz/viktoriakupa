<?php

namespace Database\Factories;

use App\Models\Document;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Document>
 */
class DocumentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $fileName = fake()->word().'.pdf';

        return [
            'title' => fake()->sentence(3),
            'file_name' => $fileName,
            'file_path' => 'documents/'.fake()->uuid().'.pdf',
        ];
    }
}
