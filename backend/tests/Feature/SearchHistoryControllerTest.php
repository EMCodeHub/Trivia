<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\SearchHistory;

class SearchHistoryControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_store_search_history()
    {
        // Simulate a POST request with valid data
        $response = $this->postJson('/api/search-history', [
            'full_name' => 'John Doe',
            'email' => 'johndoe@example.com',
            'question_count' => 10,
            'difficulty' => 'easy',
            'type' => 'multiple'
        ]);

        // Check that the response is 201 (created)
        $response->assertStatus(201);

        // Verify that the data was inserted into the database
        $this->assertDatabaseHas('search_history', [
            'full_name' => 'John Doe',
            'email' => 'johndoe@example.com',
            'question_count' => 10,
            'difficulty' => 'easy',
            'type' => 'multiple',
        ]);
    }

    /** @test */
    public function it_requires_valid_data()
    {
        // Simulate a POST request with empty data to check validation
        $response = $this->postJson('/api/search-history', []);

        // Verify that the response is 422 (validation error)
        $response->assertStatus(422);
    }
}
