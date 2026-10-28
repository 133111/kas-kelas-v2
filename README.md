# 💰 Kas Kelas - Aplikasi Pengelolaan Uang Kas Kelas

Aplikasi web modern berbasis **Laravel 11**, **Inertia.js**, dan **React** untuk mempermudah Wali Kelas dan Pengurus Kelas (Bendahara) dalam mengelola iuran kas, pencatatan absensi penagihan, pelacakan otomatis tunggakan/hutang siswa, pembukuan arus kas (pemasukan/pengeluaran), serta visualisasi laporan keuangan secara real-time.

---

## 🚀 Fitur Utama

- **Dashboard Finansial Real-Time**: Ringkasan saldo kas, total pemasukan, total pengeluaran, total hutang aktif, dan grafik perkembangan bulanan.
- **Sistem Sesi Penagihan (Billing Session)**: Generate penagihan kas mingguan/bulanan untuk seluruh siswa secara otomatis dengan status bayar (`paid`, `unpaid`, `absent`).
- **Pelacakan Tunggakan Otomatis (Debt Tracking)**: Siswa yang tidak hadir/absen otomatis tercatat memiliki hutang 2x lipat tarif kas reguler, lengkap dengan fitur pelunasan (settlement).
- **Pembukuan Kas (Transactions)**: Pencatatan transaksi pemasukan (donasi, kas) dan pengeluaran operasional kelas.
- **Manajemen Data Siswa (Students)**: Daftar 36 siswa dengan nomor absen, statistik kerajinan bayar (payment rate), dan riwayat setoran.
- **Laporan & Diagram Interaktif (Reports)**: Peringkat siswa paling disiplin bayar, grafik tren kas bulanan, dan kategori pengeluaran.
- **Sistem Keamanan & Rate Limiting**: Proteksi login menggunakan pembatasan percobaan gagal.

---

## 🛠️ Tech Stack

- **Backend**: Laravel 11 (PHP 8.2+)
- **Frontend**: React 18, Inertia.js v2, Tailwind CSS, Lucide React, Framer Motion, Recharts
- **Database**: MySQL / MariaDB

---

## 📦 Panduan Instalasi Lokal

1. **Clone repository & masuk ke direktori**:
   ```bash
   git clone <repo-url>
   cd kas-kelas
   ```

2. **Install dependensi PHP & Node.js**:
   ```bash
   composer install
   npm install
   ```

3. **Konfigurasi Environment**:
   Salin file `.env.example` menjadi `.env`:
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Konfigurasi Database**:
   Sesuaikan kredensial database di file `.env`:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=kas_kelas
   DB_USERNAME=root
   DB_PASSWORD=
   ```

5. **Jalankan Migrasi & Seeder**:
   ```bash
   php artisan migrate --seed
   ```

6. **Kompilasi Frontend & Jalankan Server**:
   ```bash
   # Terminal 1: Vite dev server
   npm run dev

   # Terminal 2: Laravel server
   php artisan serve
   ```

---

## 🔑 Akun Login Default

Setelah seeder dijalankan, gunakan akun berikut untuk masuk:
- **URL Login**: `/login`
- **Username**: `XI TKJ 1`
- **Password**: `impen ngawi`

---

## 🌐 Panduan Deployment ke Production (VPS / cPanel)

### 1. Konfigurasi `.env` Production
Pastikan pengaturan berikut aktif di environment server:
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://domain-anda.com

CACHE_STORE=database
SESSION_DRIVER=file
QUEUE_CONNECTION=database
```

### 2. Migrasi Database Production
```bash
php artisan migrate --force --seed
```

### 3. Build Aset Frontend
Jalankan kompilasi aset production sebelum deploy:
```bash
npm run build
```

### 4. Cache & Optimasi Laravel (Sangat Disarankan)
Jalankan perintah berikut di server produksi untuk performa maksimal:
```bash
php artisan optimize
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### 5. Permission Direktori (Khusus Server Linux / VPS)
Pastikan web server memiliki akses tulis ke folder storage:
```bash
chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

---

## 🧪 Pengujian (Automated Testing)

Aplikasi telah dilengkapi unit & feature test lengkap yang mencakup autentikasi dan alur kerja utama aplikasi:
```bash
php artisan test
```

---

## 📄 Lisensi
Kas Kelas dikembangkan untuk kebutuhan internal kelas dan bersifat open-source di bawah lisensi [MIT](LICENSE).