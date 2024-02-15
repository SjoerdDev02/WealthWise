<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Investment;
use App\Models\Liability;
use App\Models\Preference;
use App\Models\Snapshot;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $users = User::factory(2)->create();

        foreach ($users as $user) {
            Preference::factory()->create([
                'user_id' => $user->id,
            ]);

            $snapshots = Snapshot::factory(5)->create([
                'user_id' => $user->id,
            ]);

            foreach ($snapshots as $snapshot) {
                Investment::factory(5)->create([
                    'snapshot_id' => $snapshot->id,
                ]);

                Liability::factory(5)->create([
                    'snapshot_id' => $snapshot->id,
                ]);
            }
        }
    }
}
