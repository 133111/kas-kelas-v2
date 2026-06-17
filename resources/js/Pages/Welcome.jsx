import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Coins, 
    ShieldCheck, 
    ArrowRight, 
    Sparkles, 
    Users, 
    BarChart3, 
    Receipt 
} from 'lucide-react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Selamat Datang di Kas Kelas" />
            <div className="relative min-h-screen bg-dark-bg text-gray-100 flex flex-col items-center justify-between overflow-hidden font-sans select-none selection:bg-accent-teal selection:text-dark-bg">
                {/* Background decorative glowing circles */}
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-accent-teal/5 blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-accent-indigo/5 blur-[120px] pointer-events-none" />

                {/* Navbar */}
                <header className="w-full max-w-7xl mx-auto h-20 px-6 sm:px-8 flex items-center justify-between z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent-teal to-accent-indigo flex items-center justify-center font-bold text-white shadow-md shadow-accent-teal/20">
                            KK
                        </div>
                        <div>
                            <span className="font-extrabold text-lg bg-gradient-to-r from-teal-300 to-indigo-300 bg-clip-text text-transparent">Kas Kelas</span>
                            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Management System</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-dark-surface hover:bg-dark-surface/80 border border-dark-border text-xs font-bold text-gray-200 hover:text-white transition-all active:scale-95"
                            >
                                Dashboard
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-xs font-bold text-gray-400 hover:text-white transition-colors"
                                >
                                    Masuk Akun
                                </Link>
                                <Link
                                    href="/register"
                                    className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-xl bg-gradient-to-r from-accent-teal to-teal-500 hover:from-teal-400 hover:to-teal-600 text-dark-bg font-extrabold text-xs shadow-md shadow-accent-teal/10 hover:shadow-accent-teal/20 transition-all active:scale-95"
                                >
                                    Daftar Wali Kelas
                                </Link>
                            </>
                        )}
                    </div>
                </header>

                {/* Hero Section */}
                <main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-8 flex flex-col lg:flex-row items-center justify-center gap-12 z-10 py-12">
                    {/* Left Column: Title & Intro */}
                    <div className="flex-1 text-center lg:text-left space-y-6 max-w-2xl lg:max-w-none">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-accent-teal text-[11px] font-bold uppercase tracking-wider"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            Sistem Transparan & Efisien
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight"
                        >
                            Kelola Uang Kas Kelas <br />
                            <span className="bg-gradient-to-r from-accent-teal via-teal-300 to-accent-indigo bg-clip-text text-transparent">Lebih Praktis</span> & Rapi
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-sm sm:text-base text-gray-400 leading-relaxed font-medium max-w-lg mx-auto lg:mx-0"
                        >
                            Solusi digital untuk Wali Kelas dan Pengurus Kelas untuk mengelola iuran kas 36 siswa, memantau pengeluaran operasional, tracking otomatis tunggakan absen 2x lipat, dan menyajikan laporan visual secara real-time.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
                        >
                            {auth.user ? (
                                <Link
                                    href="/dashboard"
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-teal to-teal-500 hover:from-teal-400 hover:to-teal-600 text-dark-bg font-extrabold text-sm shadow-md shadow-accent-teal/15 hover:shadow-accent-teal/25 transition-all active:scale-95"
                                >
                                    Masuk ke Dashboard
                                    <ArrowRight className="w-4 h-4 stroke-[3px]" />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-teal to-teal-500 hover:from-teal-400 hover:to-teal-600 text-dark-bg font-extrabold text-sm shadow-md shadow-accent-teal/15 hover:shadow-accent-teal/25 transition-all active:scale-95"
                                    >
                                        Mulai Sekarang
                                        <ArrowRight className="w-4 h-4 stroke-[3px]" />
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-dark-surface hover:bg-dark-surface/80 border border-dark-border hover:border-dark-border/80 text-sm font-bold text-gray-300 hover:text-white transition-all active:scale-95"
                                    >
                                        Registrasi Akun Baru
                                    </Link>
                                </>
                            )}
                        </motion.div>
                    </div>

                    {/* Right Column: Visual Features list */}
                    <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                            {
                                icon: Receipt,
                                title: 'Penagihan Cepat',
                                description: 'Tabel absensi penagihan Rp 2.000 untuk 36 siswa sekali klik.',
                                color: 'text-teal-400 bg-teal-500/5 border-teal-500/10'
                            },
                            {
                                icon: ShieldCheck,
                                title: 'Log Absen & Hutang',
                                description: 'Siswa absen otomatis dikenakan tunggakan 2x lipat (Rp 4.000) di sesi berikutnya.',
                                color: 'text-rose-400 bg-rose-500/5 border-rose-500/10'
                            },
                            {
                                icon: Coins,
                                title: 'CRUD Pembukuan Kas',
                                description: 'Catat pemasukan donasi dan pengeluaran operasional kelas secara transparan.',
                                color: 'text-indigo-400 bg-indigo-500/5 border-indigo-500/10'
                            },
                            {
                                icon: BarChart3,
                                title: 'Grafik Kedisiplinan',
                                description: 'Visualisasi grafik kerajinan bayar siswa dan diagram arus kas bulanan.',
                                color: 'text-amber-400 bg-amber-500/5 border-amber-500/10'
                            }
                        ].map((feat, index) => {
                            const Icon = feat.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className={`p-5 rounded-2xl border ${feat.color} flex flex-col justify-between h-44`}
                                >
                                    <div className="p-3 rounded-xl bg-dark-bg/60 w-fit">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-bold text-gray-200">{feat.title}</h4>
                                        <p className="text-xs text-gray-500 leading-relaxed font-semibold">{feat.description}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </main>

                {/* Footer */}
                <footer className="w-full h-16 border-t border-dark-border/40 flex items-center justify-center z-10">
                    <span className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest">
                        Kas Kelas Management System &copy; 2026. Made with Laravel & React
                    </span>
                </footer>
            </div>
        </>
    );
}
