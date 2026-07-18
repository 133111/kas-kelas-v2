import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    AlertTriangle, 
    Search, 
    Coins, 
    Users, 
    CheckCircle2, 
    ArrowUpRight,
    TrendingUp,
    Calendar,
    ChevronRight,
    Sparkles,
    PartyPopper
} from 'lucide-react';

export default function Index({ debts, totalDebt, totalDebtors }) {
    const { post, processing } = useForm();
    const [search, setSearch] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [settledDebtId, setSettledDebtId] = useState(null); // for local animation before removing

    const formatIDR = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(value);
    };

    const handleSettle = (id) => {
        setSettledDebtId(id); // Trigger local animation
        setTimeout(() => {
            post(`/debts/${id}/settle`, {
                preserveScroll: true,
                onFinish: () => setSettledDebtId(null)
            });
        }, 400); // Wait for exit animation
    };

    // Filter debts
    const filteredDebts = debts.filter(debt => {
        return debt.student_name.toLowerCase().includes(search.toLowerCase()) || 
               debt.student_nis.includes(search);
    });

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
    };

    return (
        <AppLayout header="Daftar Tunggakan Uang Kas">
            <Head title="Tunggakan Uang Kas" />

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-8"
            >
                {/* Aggregate stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Total Tunggakan */}
                    <motion.div 
                        variants={itemVariants}
                        whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300 } }}
                        className="p-6 rounded-2xl bg-dark-card border border-rose-500/30 flex items-center justify-between shadow-[0_0_15px_rgba(244,63,94,0.1)] relative overflow-hidden group hover-shimmer animate-pulse-glow-rose card-hover-lift"
                    >
                        <div className="space-y-1 relative z-10">
                            <span className="text-xs font-semibold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span> 
                                Total Tunggakan Aktif
                            </span>
                            <h3 className="text-3xl font-black text-rose-400 tracking-tight">{formatIDR(totalDebt)}</h3>
                            <p className="text-[11px] text-gray-400 font-medium pt-1">Berdasarkan data sanksi siswa absen/belum lunas</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-rose-500/10 text-rose-400 relative z-10 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300">
                            <AlertTriangle className="w-8 h-8" />
                        </div>
                    </motion.div>

                    {/* Jumlah Siswa Menunggak */}
                    <motion.div 
                        variants={itemVariants}
                        whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300 } }}
                        className="p-6 rounded-2xl bg-dark-card border border-dark-border/60 flex items-center justify-between shadow-lg relative overflow-hidden group hover-shimmer card-hover-lift hover-glow-teal"
                        style={{ '--tw-hover-border-color': 'rgba(245, 158, 11, 0.3)', '--tw-hover-shadow-color': 'rgba(245, 158, 11, 0.2)' }}
                    >
                        <div className="space-y-1 relative z-10">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Jumlah Siswa Menunggak</span>
                            <h3 className="text-3xl font-black text-amber-400 tracking-tight">{totalDebtors} <span className="text-xl">Siswa</span></h3>
                            <p className="text-[11px] text-gray-500 font-medium pt-1">Siswa aktif dengan kewajiban pembayaran tertunda</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-amber-500/10 text-amber-400 relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                            <Users className="w-8 h-8" />
                        </div>
                    </motion.div>
                </div>

                {/* Filter and Search Panel */}
                <motion.div 
                    variants={itemVariants}
                    className="bg-dark-card border border-dark-border/60 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden"
                >
                    {/* Subtle animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-rose-500/5 to-transparent animate-shimmer pointer-events-none" style={{ backgroundSize: '200% 100%' }} />

                    <div className="relative z-10">
                        <h3 className="text-sm font-bold text-gray-200">Data Tunggakan / Hutang Kas</h3>
                        <p className="text-xs text-gray-500">Membantu menagih tunggakan saat sesi kas berjalan</p>
                    </div>

                    <motion.div 
                        animate={isSearchFocused ? { scale: 1.02 } : { scale: 1 }}
                        className="w-full sm:w-80 relative z-10"
                    >
                        <div className="relative">
                            <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${isSearchFocused ? 'text-rose-400' : 'text-gray-500'}`} />
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setIsSearchFocused(false)}
                                placeholder="Cari nama atau NIS siswa..."
                                className="w-full bg-dark-bg/60 border border-dark-border/40 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30 rounded-xl pl-10 pr-4 py-2 text-xs text-gray-300 placeholder-gray-500 transition-all shadow-inner"
                            />
                        </div>
                    </motion.div>
                </motion.div>

                {/* Debts Table */}
                <motion.div 
                    variants={itemVariants}
                    className="bg-dark-card border border-dark-border/60 rounded-2xl overflow-hidden shadow-xl"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-dark-border/60 text-[11px] font-bold text-gray-400 uppercase tracking-wider bg-dark-surface/30">
                                    <th className="py-4 px-6 text-center w-20">Absen</th>
                                    <th className="py-4 px-4">Nama Siswa</th>
                                    <th className="py-4 px-4 w-32">NIS</th>
                                    <th className="py-4 px-4">Asal Sesi Penagihan</th>
                                    <th className="py-4 px-4 w-44 text-right">Jumlah Tunggakan</th>
                                    <th className="py-4 px-6 text-center w-36">Aksi Pelunasan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-dark-border/30 text-sm font-medium text-gray-300 relative">
                                <AnimatePresence>
                                    {filteredDebts.length === 0 ? (
                                        <motion.tr
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <td colSpan="6" className="py-16 text-center">
                                                {search === '' ? (
                                                    <motion.div 
                                                        initial={{ scale: 0.8, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        transition={{ type: 'spring', bounce: 0.5 }}
                                                        className="flex flex-col items-center justify-center space-y-4"
                                                    >
                                                        <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 relative">
                                                            <div className="absolute inset-0 rounded-full animate-ping bg-emerald-500/20"></div>
                                                            <PartyPopper className="w-10 h-10" />
                                                        </div>
                                                        <div className="text-center">
                                                            <h3 className="text-lg font-bold text-emerald-400">Luar Biasa!</h3>
                                                            <p className="text-sm text-gray-500 font-medium">Tidak ada satu pun siswa yang menunggak kas kelas saat ini.</p>
                                                        </div>
                                                    </motion.div>
                                                ) : (
                                                    <div className="text-gray-500 font-semibold">Tunggakan untuk "{search}" tidak ditemukan.</div>
                                                )}
                                            </td>
                                        </motion.tr>
                                    ) : (
                                        filteredDebts.map((debt, idx) => (
                                            <motion.tr 
                                                key={debt.id} 
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, scale: 0.95, x: 50, backgroundColor: 'rgba(16, 185, 129, 0.1)' }} // exit animation when settled
                                                transition={{ delay: idx * 0.05, duration: 0.3 }}
                                                className="hover:bg-dark-surface/30 transition-colors group relative"
                                            >
                                                {/* Success overlay during settle animation */}
                                                {settledDebtId === debt.id && (
                                                    <motion.div 
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        className="absolute inset-0 bg-emerald-500/20 z-10 flex items-center justify-center"
                                                    >
                                                        <CheckCircle2 className="w-6 h-6 text-emerald-400 animate-bounce" />
                                                    </motion.div>
                                                )}

                                                <td className="py-4 px-6 text-center font-bold text-gray-400 bg-dark-surface/10 group-hover:text-gray-300 transition-colors">
                                                    {debt.nomor_absen}
                                                </td>
                                                <td className="py-4 px-4 font-bold text-gray-200 group-hover:text-white transition-colors">
                                                    {debt.student_name}
                                                </td>
                                                <td className="py-4 px-4 text-xs font-mono text-gray-500">
                                                    {debt.student_nis}
                                                </td>
                                                <td className="py-4 px-4 text-xs text-gray-400 font-semibold">
                                                    <div className="flex items-center gap-1.5">
                                                        <Calendar className="w-3.5 h-3.5 text-gray-500" />
                                                        Sesi {debt.session_date}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-right font-black text-rose-400 group-hover:scale-105 transition-transform origin-right">
                                                    {formatIDR(debt.amount)}
                                                </td>
                                                <td className="py-4 px-6 text-center relative z-20">
                                                    <button
                                                        onClick={() => handleSettle(debt.id)}
                                                        disabled={processing || settledDebtId === debt.id}
                                                        className={`btn-ripple inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black tracking-wide transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 ${
                                                            settledDebtId === debt.id 
                                                                ? 'bg-emerald-500 text-white border border-emerald-500' 
                                                                : 'bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-dark-bg border border-emerald-500/20 hover:border-emerald-500'
                                                        }`}
                                                    >
                                                        {settledDebtId === debt.id ? (
                                                            <>
                                                                <CheckCircle2 className="w-4 h-4 shrink-0" />
                                                                Lunas!
                                                            </>
                                                        ) : (
                                                            <>
                                                                <CheckCircle2 className="w-4 h-4 shrink-0" />
                                                                Lunasi
                                                            </>
                                                        )}
                                                    </button>
                                                </td>
                                            </motion.tr>
                                        ))
                                    )}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </motion.div>
        </AppLayout>
    );
}
