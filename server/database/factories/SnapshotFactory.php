<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Snapshot>
 */
class SnapshotFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'year' => $this->faker->randomElement([2019, 2020, 2021, 2022, 2023, 2024]),
            'month' => $this->faker->numberBetween(1, 12),
            'income' => $this->faker->randomFloat(2, 2000, 10000),
            'expenses' => $this->faker->randomFloat(2, 2000, 10000),
            'total_investments' => $this->faker->randomFloat(2, 2000, 10000),
            'total_liabilities' => $this->faker->randomFloat(2, 2000, 10000),
        ];
    }
}