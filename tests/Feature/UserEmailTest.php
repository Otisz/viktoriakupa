<?php

namespace Tests\Feature;

use App\Filament\Pages\Auth\Login;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Livewire\Livewire;
use Tests\TestCase;

class UserEmailTest extends TestCase
{
    use RefreshDatabase;

    public function test_email_is_stored_in_lowercase(): void
    {
        $user = User::factory()->create(['email' => 'Admin@Example.COM']);

        $this->assertSame('admin@example.com', $user->fresh()->email);
    }

    public function test_user_can_log_in_with_differently_cased_email(): void
    {
        $user = User::factory()->create(['email' => 'admin@example.com']);

        Livewire::test(Login::class)
            ->fillForm([
                'email' => 'Admin@Example.COM',
                'password' => 'password',
            ])
            ->call('authenticate')
            ->assertHasNoFormErrors();

        $this->assertAuthenticatedAs($user);
    }
}
