<?php

namespace Database\Factories;

use App\Models\Snapshot;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Liability>
 */
class LiabilityFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'source' => $this->faker->words(3, true),
            'amount' => $this->faker->randomFloat(2, 2000, 10000),
        ];
    }
}
