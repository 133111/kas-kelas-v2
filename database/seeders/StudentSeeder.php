<?php

namespace Database\Seeders;

use App\Models\Student;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    public function run(): void
    {
        $students = [
            ['name' => 'Ahmad Fauzi', 'nis' => '2024001', 'nomor_absen' => 1],
            ['name' => 'Aisyah Putri', 'nis' => '2024002', 'nomor_absen' => 2],
            ['name' => 'Bayu Pratama', 'nis' => '2024003', 'nomor_absen' => 3],
            ['name' => 'Citra Dewi', 'nis' => '2024004', 'nomor_absen' => 4],
            ['name' => 'Dimas Arya', 'nis' => '2024005', 'nomor_absen' => 5],
            ['name' => 'Eka Sari', 'nis' => '2024006', 'nomor_absen' => 6],
            ['name' => 'Fajar Nugroho', 'nis' => '2024007', 'nomor_absen' => 7],
            ['name' => 'Gita Nanda', 'nis' => '2024008', 'nomor_absen' => 8],
            ['name' => 'Hendra Wijaya', 'nis' => '2024009', 'nomor_absen' => 9],
            ['name' => 'Indah Permata', 'nis' => '2024010', 'nomor_absen' => 10],
            ['name' => 'Joko Susanto', 'nis' => '2024011', 'nomor_absen' => 11],
            ['name' => 'Kartika Sari', 'nis' => '2024012', 'nomor_absen' => 12],
            ['name' => 'Lukman Hakim', 'nis' => '2024013', 'nomor_absen' => 13],
            ['name' => 'Maya Anggraini', 'nis' => '2024014', 'nomor_absen' => 14],
            ['name' => 'Nur Hidayat', 'nis' => '2024015', 'nomor_absen' => 15],
            ['name' => 'Oktavia Rahma', 'nis' => '2024016', 'nomor_absen' => 16],
            ['name' => 'Putra Aditya', 'nis' => '2024017', 'nomor_absen' => 17],
            ['name' => 'Qori Amelia', 'nis' => '2024018', 'nomor_absen' => 18],
            ['name' => 'Rizky Maulana', 'nis' => '2024019', 'nomor_absen' => 19],
            ['name' => 'Sinta Maharani', 'nis' => '2024020', 'nomor_absen' => 20],
            ['name' => 'Taufik Hidayat', 'nis' => '2024021', 'nomor_absen' => 21],
            ['name' => 'Ulfa Nabila', 'nis' => '2024022', 'nomor_absen' => 22],
            ['name' => 'Vino Pratama', 'nis' => '2024023', 'nomor_absen' => 23],
            ['name' => 'Wulan Sari', 'nis' => '2024024', 'nomor_absen' => 24],
            ['name' => 'Yoga Setiawan', 'nis' => '2024025', 'nomor_absen' => 25],
            ['name' => 'Zahra Aulia', 'nis' => '2024026', 'nomor_absen' => 26],
            ['name' => 'Arif Rahman', 'nis' => '2024027', 'nomor_absen' => 27],
            ['name' => 'Bella Safitri', 'nis' => '2024028', 'nomor_absen' => 28],
            ['name' => 'Chandra Putra', 'nis' => '2024029', 'nomor_absen' => 29],
            ['name' => 'Dina Rahmawati', 'nis' => '2024030', 'nomor_absen' => 30],
            ['name' => 'Eza Mahendra', 'nis' => '2024031', 'nomor_absen' => 31],
            ['name' => 'Fitri Handayani', 'nis' => '2024032', 'nomor_absen' => 32],
            ['name' => 'Galang Ramadhan', 'nis' => '2024033', 'nomor_absen' => 33],
            ['name' => 'Hani Puspita', 'nis' => '2024034', 'nomor_absen' => 34],
            ['name' => 'Irfan Maulana', 'nis' => '2024035', 'nomor_absen' => 35],
            ['name' => 'Jasmine Azzahra', 'nis' => '2024036', 'nomor_absen' => 36],
        ];

        foreach ($students as $student) {
            Student::create($student);
        }
    }
}
