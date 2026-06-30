<?php

namespace Database\Seeders;

use App\Models\Student;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        $students = [
            ['name' => 'Ahmad Fauzi', 'nomor_absen' => 1],
            ['name' => 'Aisyah Putri', 'nomor_absen' => 2],
            ['name' => 'Bayu Pratama', 'nomor_absen' => 3],
            ['name' => 'Citra Dewi', 'nomor_absen' => 4],
            ['name' => 'Dimas Arya', 'nomor_absen' => 5],
            ['name' => 'Eka Sari', 'nomor_absen' => 6],
            ['name' => 'Fajar Nugroho', 'nomor_absen' => 7],
            ['name' => 'Gita Nanda', 'nomor_absen' => 8],
            ['name' => 'Hendra Wijaya', 'nomor_absen' => 9],
            ['name' => 'Indah Permata', 'nomor_absen' => 10],
            ['name' => 'Joko Susanto', 'nomor_absen' => 11],
            ['name' => 'Kartika Sari', 'nomor_absen' => 12],
            ['name' => 'Lukman Hakim', 'nomor_absen' => 13],
            ['name' => 'Maya Anggraini', 'nomor_absen' => 14],
            ['name' => 'Nur Hidayat', 'nomor_absen' => 15],
            ['name' => 'Oktavia Rahma', 'nomor_absen' => 16],
            ['name' => 'Putra Aditya', 'nomor_absen' => 17],
            ['name' => 'Qori Amelia', 'nomor_absen' => 18],
            ['name' => 'Rizky Maulana', 'nomor_absen' => 19],
            ['name' => 'Sinta Maharani', 'nomor_absen' => 20],
            ['name' => 'Taufik Hidayat', 'nomor_absen' => 21],
            ['name' => 'Ulfa Nabila', 'nomor_absen' => 22],
            ['name' => 'Vino Pratama', 'nomor_absen' => 23],
            ['name' => 'Wulan Sari', 'nomor_absen' => 24],
            ['name' => 'Yoga Setiawan', 'nomor_absen' => 25],
            ['name' => 'Zahra Aulia', 'nomor_absen' => 26],
            ['name' => 'Arif Rahman', 'nomor_absen' => 27],
            ['name' => 'Bella Safitri', 'nomor_absen' => 28],
            ['name' => 'Chandra Putra', 'nomor_absen' => 29],
            ['name' => 'Dina Rahmawati', 'nomor_absen' => 30],
            ['name' => 'Eza Mahendra', 'nomor_absen' => 31],
            ['name' => 'Fitri Handayani', 'nomor_absen' => 32],
            ['name' => 'Galang Ramadhan', 'nomor_absen' => 33],
            ['name' => 'Hani Puspita', 'nomor_absen' => 34],
            ['name' => 'Irfan Maulana', 'nomor_absen' => 35],
            ['name' => 'Jasmine Azzahra', 'nomor_absen' => 36],
        ];

        foreach ($students as $student) {
            Student::create($student);
        }
    }
}
