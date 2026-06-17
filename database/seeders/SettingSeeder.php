<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            ['key' => 'billing_amount', 'value' => '2000'],
            ['key' => 'debt_multiplier', 'value' => '2'],
            ['key' => 'class_name', 'value' => 'XII RPL 1'],
            ['key' => 'school_name', 'value' => 'SMK Negeri 1'],
            ['key' => 'academic_year', 'value' => '2024/2025'],
        ];

        foreach ($settings as $setting) {
            Setting::create($setting);
        }
    }
}
