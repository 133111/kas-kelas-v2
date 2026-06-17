<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::create([
            'name' => 'XI TKJ 1',
            'username' => 'XI TKJ 1',
            'password' => Hash::make('impen ngawi'),
            'role' => 'admin',
        ]);

        $this->call([
            StudentSeeder::class,
            SettingSeeder::class,
        ]);
    }
}
