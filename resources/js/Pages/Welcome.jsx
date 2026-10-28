import React, { useEffect, useRef } from 'react';
import { Head, Link } from '@inertiajs/react';
import { motion, useInView } from 'framer-motion';
import { 
    Coins, 
    ShieldCheck, 
    ArrowRight, 
    Sparkles, 
    Users, 
    BarChart3, 
    Receipt 
} from 'lucide-react';

// Animated counter hook
function useAnimatedCounter(end, duration = 1500) {
    const [count, setCount] = React.useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const step = end / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [isInView, end, duration]);

    return { count, ref };
}

export default function Welcome({ auth }) {
    const features = [
        {
            icon: Receipt,
            title: 'Penagihan Cepat',
            description: 'Tabel absensi penagihan Rp 2.000 untuk 36 siswa sekali klik.',
            color: 'text-teal-400 bg-teal-500/5 border-teal-500/10',
            glowClass: 'hover-glow-teal',
            hoverBorder: 'hover:border-teal-400/30'
        },
        {
            icon: ShieldCheck,
            title: 'Log Absen & Hutang',
            description: 'Siswa absen otomatis dikenakan tunggakan 2x lipat (Rp 4.000) di sesi berikutnya.',
            color: 'text-rose-400 bg-rose-500/5 border-rose-500/10',
            glowClass: '',
            hoverBorder: 'hover:border-rose-400/30'
        },
        {
            icon: Coins,
            title: 'CRUD Pembukuan Kas',
            description: 'Catat pemasukan donasi dan pengeluaran operasional kelas secara transparan.',
            color: 'text-indigo-400 bg-indigo-500/5 border-indigo-500/10',
            glowClass: '',
            hoverBorder: 'hover:border-indigo-400/30'
        },
        {
            icon: BarChart3,
            title: 'Grafik Kedisiplinan',
            description: 'Visualisasi grafik kerajinan bayar siswa dan diagram arus kas bulanan.',
            color: 'text-amber-400 bg-amber-500/5 border-amber-500/10',
            glowClass: '',
            hoverBorder: 'hover:border-amber-400/30'
        }
    ];

    // Staggered container
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { 
            opacity: 1, y: 0,
            transition: { type: 'spring', stiffness: 80, damping: 15 }
        }
    };

    return (
        <>
            <Head title="Selamat Datang di Kas Kelas" />
            <div className="relative min-h-screen bg-dark-bg text-gray-100 flex flex-col items-center justify-between overflow-hidden font-sans select-none selection:bg-accent-teal selection:text-dark-bg">
                {/* Animated background orbs */}
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-teal-400/[0.06] blur-[120px] pointer-events-none animate-float-slow" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-400/[0.06] blur-[120px] pointer-events-none animate-float-reverse" />
                <div className="absolute top-[30%] right-[20%] w-[300px] h-[300px] rounded-full bg-emerald-300/[0.04] blur-[100px] pointer-events-none animate-float" />

                {/* Decorative floating geometric shapes */}
                <div className="absolute top-20 right-[15%] w-4 h-4 rounded-full bg-teal-400/20 animate-float pointer-events-none" style={{ animationDelay: '0s' }} />
                <div className="absolute top-40 left-[10%] w-3 h-3 rounded-full bg-indigo-400/20 animate-float-reverse pointer-events-none" style={{ animationDelay: '1s' }} />
                <div className="absolute bottom-32 right-[30%] w-2 h-2 rounded-full bg-emerald-400/25 animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
                <div className="absolute top-[60%] left-[5%] w-5 h-5 rounded-sm bg-amber-400/10 rotate-45 animate-float-slow pointer-events-none" style={{ animationDelay: '0.5s' }} />
                <div className="absolute top-[25%] right-[8%] w-3 h-3 rounded-sm bg-teal-500/15 rotate-12 animate-float pointer-events-none" style={{ animationDelay: '1.5s' }} />

                {/* Navbar */}
                <motion.header 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="w-full max-w-7xl mx-auto h-20 px-6 sm:px-8 flex items-center justify-between z-10"
                >
                    <div className="flex items-center gap-3 group cursor-default">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-accent-teal to-accent-indigo flex items-center justify-center font-bold text-white shadow-md shadow-accent-teal/20 group-hover:shadow-accent-teal/40 transition-shadow duration-500 group-hover:scale-105 transform transition-transform">
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
                                className="btn-ripple inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-dark-surface hover:bg-dark-surface/80 border border-dark-border text-xs font-bold text-gray-200 hover:text-white transition-all active:scale-95 hover:shadow-lg"
                            >
                                Dashboard
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        ) : (
                                <Link
                                    href="/login"
                                    className="btn-ripple inline-flex items-center gap-1.5 px-4.5 py-2 rounded-xl bg-gradient-to-r from-accent-teal to-teal-500 hover:from-teal-400 hover:to-teal-600 text-dark-bg font-extrabold text-xs shadow-md shadow-accent-teal/10 hover:shadow-accent-teal/30 transition-all active:scale-95"
                                >
                                    Masuk Akun
                                </Link>
                        )}
                    </div>
                </motion.header>

                {/* Hero Section */}
                <main className="flex-1 w-full max-w-7xl mx-auto px-6 sm:px-8 flex flex-col lg:flex-row items-center justify-center gap-12 z-10 py-12">
                    {/* Left Column: Title & Intro */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="flex-1 text-center lg:text-left space-y-6 max-w-2xl lg:max-w-none"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-accent-teal text-[11px] font-bold uppercase tracking-wider animate-pulse-glow"
                        >
                            <Sparkles className="w-3.5 h-3.5 animate-bounce-subtle" />
                            Sistem Transparan & Efisien
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight"
                        >
                            Kelola Uang Kas Kelas <br />
                            <span className="bg-gradient-to-r from-accent-teal via-teal-300 to-accent-indigo bg-clip-text text-transparent bg-[length:200%_200%] animate-gradient-text">Lebih Praktis</span> & Rapi
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-sm sm:text-base text-gray-400 leading-relaxed font-medium max-w-lg mx-auto lg:mx-0"
                        >
                            Solusi digital untuk Wali Kelas dan Pengurus Kelas untuk mengelola iuran kas 36 siswa, memantau pengeluaran operasional, tracking otomatis tunggakan absen 2x lipat, dan menyajikan laporan visual secara real-time.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
                        >
                            {auth.user ? (
                                <Link
                                    href="/dashboard"
                                    className="btn-ripple group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-teal to-teal-500 hover:from-teal-400 hover:to-teal-600 text-dark-bg font-extrabold text-sm shadow-md shadow-accent-teal/15 hover:shadow-accent-teal/30 hover:shadow-lg transition-all active:scale-95"
                                >
                                    Masuk ke Dashboard
                                    <ArrowRight className="w-4 h-4 stroke-[3px] group-hover:translate-x-1 transition-transform" />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="btn-ripple group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-teal to-teal-500 hover:from-teal-400 hover:to-teal-600 text-dark-bg font-extrabold text-sm shadow-md shadow-accent-teal/15 hover:shadow-accent-teal/30 hover:shadow-lg transition-all active:scale-95"
                                    >
                                        Masuk Akun
                                        <ArrowRight className="w-4 h-4 stroke-[3px] group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </>
                            )}
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Visual Features list */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="show"
                        className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                        {features.map((feat, index) => {
                            const Icon = feat.icon;
                            return (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ 
                                        y: -6, 
                                        scale: 1.02,
                                        transition: { type: 'spring', stiffness: 300, damping: 20 }
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`p-5 rounded-2xl border ${feat.color} ${feat.hoverBorder} flex flex-col justify-between h-44 cursor-default hover-shimmer card-hover-lift group transition-all duration-300`}
                                >
                                    <div className="p-3 rounded-xl bg-dark-bg/60 w-fit group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-bold text-gray-200">{feat.title}</h4>
                                        <p className="text-xs text-gray-500 leading-relaxed font-semibold">{feat.description}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </main>

                {/* Footer */}
                <motion.footer 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="w-full h-16 border-t border-dark-border/40 flex items-center justify-center z-10"
                >
                    <span className="text-[10px] font-semibold text-gray-600 uppercase tracking-widest">
                        Kas Kelas Management System &copy; 2026. Made with Laravel & React
                    </span>
                </motion.footer>
            </div>
        </>
    );
}
