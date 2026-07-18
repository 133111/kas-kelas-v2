import React, { useState, useEffect, useRef } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, router } from '@inertiajs/react';
import { motion, useInView } from 'framer-motion';
import { 
    Search, 
    User, 
    Award, 
    AlertTriangle, 
    ArrowUpRight, 
    Sparkles, 
    TrendingUp, 
    ChevronRight,
    Users,
    Pencil
} from 'lucide-react';

// Animated counter component
function AnimatedCounter({ value, formatFn, duration = 1200 }) {
    const [display, setDisplay] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const step = value / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= value) {
                setDisplay(value);
                clearInterval(timer);
            } else {
                setDisplay(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [isInView, value, duration]);

    return <span ref={ref}>{formatFn ? formatFn(display) : display}</span>;
}

export default function Index({ students, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const formatIDR = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.get('/students', { search }, { preserveState: true });
    };

    // Calculate aggregated info
    const totalStudents = students.length;
    const avgDiligence = totalStudents > 0 
        ? Math.round(students.reduce((acc, student) => acc + student.payment_rate, 0) / totalStudents) 
        : 0;
    const totalOutstandingDebt = students.reduce((acc, student) => acc + student.total_debt, 0);

    const getStatusColor = (rate) => {
        if (rate >= 80) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]';
        if (rate >= 50) return 'text-amber-400 bg-amber-500/10 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.2)]';
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.2)]';
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
    };

    return (
        <AppLayout header="Daftar Siswa Kelas">
            <Head title="Daftar Siswa" />

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-8"
            >
                {/* Summary Widgets */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Total Siswa */}
                    <motion.div 
                        variants={itemVariants}
                        whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300 } }}
                        className="p-6 rounded-2xl bg-dark-card border border-dark-border/60 flex items-center justify-between shadow-lg relative overflow-hidden group hover-shimmer card-hover-lift animate-pulse-glow"
                    >
                        <div className="space-y-1 z-10">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Siswa Aktif</span>
                            <h3 className="text-2xl font-black text-gray-100"><AnimatedCounter value={totalStudents} /> Siswa</h3>
                            <p className="text-[11px] text-gray-500 font-medium">Terdaftar di absensi kas kelas</p>
                        </div>
                        <motion.div 
                            whileHover={{ scale: 1.15, rotate: 10 }}
                            className="p-3.5 rounded-xl bg-teal-500/10 text-accent-teal z-10 shadow-[0_0_15px_rgba(13,148,136,0.2)]"
                        >
                            <Users className="w-6 h-6" />
                        </motion.div>
                    </motion.div>

                    {/* Rata-rata Kerajinan */}
                    <motion.div 
                        variants={itemVariants}
                        whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300 } }}
                        className="p-6 rounded-2xl bg-dark-card border border-dark-border/60 flex items-center justify-between shadow-lg relative overflow-hidden group hover-shimmer card-hover-lift animate-pulse-glow-emerald"
                        style={{ animationName: 'pulse-glow' }}
                    >
                        <div className="space-y-1 z-10">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Rata-rata Indeks Kerajinan</span>
                            <h3 className="text-2xl font-black text-emerald-400"><AnimatedCounter value={avgDiligence} />%</h3>
                            <p className="text-[11px] text-gray-500 font-medium">Ketepatan bayar iuran kas kelas</p>
                        </div>
                        <motion.div 
                            whileHover={{ scale: 1.15, rotate: 10 }}
                            className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-400 z-10 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                        >
                            <Award className="w-6 h-6" />
                        </motion.div>
                    </motion.div>

                    {/* Total Tunggakan */}
                    <motion.div 
                        variants={itemVariants}
                        whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300 } }}
                        className="p-6 rounded-2xl bg-dark-card border border-dark-border/60 flex items-center justify-between shadow-lg relative overflow-hidden group hover-shimmer card-hover-lift animate-pulse-glow-rose"
                    >
                        <div className="space-y-1 z-10">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Akumulasi Tunggakan Siswa</span>
                            <h3 className="text-2xl font-black text-rose-400"><AnimatedCounter value={totalOutstandingDebt} formatFn={formatIDR} /></h3>
                            <p className="text-[11px] text-gray-500 font-medium">Uang kas kelas belum lunas</p>
                        </div>
                        <motion.div 
                            whileHover={{ scale: 1.15, rotate: -10 }}
                            className="p-3.5 rounded-xl bg-rose-500/10 text-rose-400 z-10 shadow-[0_0_15px_rgba(244,63,94,0.2)]"
                        >
                            <AlertTriangle className="w-6 h-6 animate-pulse" />
                        </motion.div>
                    </motion.div>
                </div>

                {/* Filter and Search Panel */}
                <motion.div 
                    variants={itemVariants}
                    className="bg-dark-card border border-dark-border/60 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                    <div>
                        <h3 className="text-sm font-bold text-gray-200">Daftar Anggota Kelas</h3>
                        <p className="text-xs text-gray-500">Menampilkan seluruh data siswa beserta kedisiplinan kas</p>
                    </div>

                    <form onSubmit={handleSearchSubmit} className="w-full sm:w-80">
                        <motion.div 
                            className="relative"
                            animate={isSearchFocused ? { scale: 1.02 } : { scale: 1 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        >
                            <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${isSearchFocused ? 'text-accent-teal' : 'text-gray-500'}`} />
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                                placeholder="Cari nama siswa..."
                                className="w-full bg-dark-bg/60 border border-dark-border/40 focus:border-accent-teal focus:ring-1 focus:ring-accent-teal/30 rounded-xl pl-10 pr-4 py-2 text-xs text-gray-300 placeholder-gray-500 transition-all shadow-inner"
                            />
                        </motion.div>
                    </form>
                </motion.div>

                {/* Students Table */}
                <motion.div 
                    variants={itemVariants}
                    className="bg-dark-card border border-dark-border/60 rounded-2xl overflow-hidden shadow-xl"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-dark-border/60 text-[11px] font-bold text-gray-400 uppercase tracking-wider bg-dark-surface/30">
                                    <th className="py-4 px-6 text-center w-20">No Absen</th>
                                    <th className="py-4 px-4">Nama Siswa</th>
                                    <th className="py-4 px-4 text-center w-40">Kerajinan Bayar</th>
                                    <th className="py-4 px-4 text-right w-44">Tunggakan Aktif</th>
                                    <th className="py-4 px-6 text-center w-28">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-dark-border/30 text-sm font-medium text-gray-300">
                                {students.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="py-12">
                                            <motion.div 
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="flex flex-col items-center justify-center text-gray-500 font-semibold space-y-3"
                                            >
                                                <Users className="w-10 h-10 animate-bounce-subtle opacity-50" />
                                                <p>Siswa tidak ditemukan.</p>
                                            </motion.div>
                                        </td>
                                    </tr>
                                ) : (
                                    students.map((student, index) => (
                                        <motion.tr 
                                            key={student.id} 
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05, type: 'spring', stiffness: 100 }}
                                            className="hover:bg-dark-surface/30 transition-colors group"
                                        >
                                            <td className="py-4 px-6 text-center font-bold text-gray-400 bg-dark-surface/10 transition-colors group-hover:text-gray-300">
                                                {student.nomor_absen}
                                            </td>
                                            <td className="py-4 px-4 font-bold text-gray-200 group-hover:text-white transition-colors">
                                                {student.name}
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                <motion.span 
                                                    whileHover={{ scale: 1.05 }}
                                                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border transition-shadow ${getStatusColor(student.payment_rate)}`}
                                                >
                                                    <Sparkles className="w-3 h-3 animate-pulse" />
                                                    {student.payment_rate}% ({student.paid_count}/{student.total_sessions})
                                                </motion.span>
                                            </td>
                                            <td className={`py-4 px-4 text-right font-black ${
                                                student.total_debt > 0 ? 'text-rose-400' : 'text-gray-500'
                                            }`}>
                                                {student.total_debt > 0 ? formatIDR(student.total_debt) : (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-dark-surface border border-dark-border/50 text-[10px] font-bold">Lunas</span>
                                                )}
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link
                                                        href={`/students/${student.id}`}
                                                        className="btn-ripple inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-dark-surface hover:bg-dark-surface/80 border border-dark-border text-xs font-bold text-gray-300 hover:text-white transition-all active:scale-95"
                                                    >
                                                        Detail
                                                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                                    </Link>
                                                    <Link
                                                        href={`/students/${student.id}/edit`}
                                                        className="btn-ripple inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/40 text-xs font-bold transition-all active:scale-95 cursor-pointer"
                                                    >
                                                        <Pencil className="w-3 h-3" />
                                                        Edit
                                                    </Link>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </motion.div>
        </AppLayout>
    );
}
