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
    Sparkles
} from 'lucide-react';

export default function Index({ debts, totalDebt, totalDebtors }) {
    const { post, processing } = useForm();
    const [search, setSearch] = useState('');

    const formatIDR = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(value);
    };

    const handleSettle = (id) => {
        post(`/debts/${id}/settle`, {
            preserveScroll: true
        });
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

            <div className="space-y-8">
                {/* Aggregate stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Total Tunggakan */}
                    <div className="p-6 rounded-2xl bg-dark-card border border-dark-border/60 flex items-center justify-between shadow-lg relative overflow-hidden group">
                        <div className="space-y-1">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Tunggakan Aktif</span>
                            <h3 className="text-2xl font-black text-rose-400">{formatIDR(totalDebt)}</h3>
                            <p className="text-[11px] text-gray-500 font-medium">Berdasarkan data sanksi siswa absen/belum lunas</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-rose-500/10 text-rose-400">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                    </div>

                    {/* Jumlah Siswa Menunggak */}
                    <div className="p-6 rounded-2xl bg-dark-card border border-dark-border/60 flex items-center justify-between shadow-lg relative overflow-hidden group">
                        <div className="space-y-1">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Jumlah Siswa Menunggak</span>
                            <h3 className="text-2xl font-black text-amber-400">{totalDebtors} Siswa</h3>
                            <p className="text-[11px] text-gray-500 font-medium">Siswa aktif dengan kewajiban pembayaran tertunda</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-amber-500/10 text-amber-400">
                            <Users className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* Filter and Search Panel */}
                <div className="bg-dark-card border border-dark-border/60 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="text-sm font-bold text-gray-200">Data Tunggakan / Hutang Kas</h3>
                        <p className="text-xs text-gray-500">Membantu menagih tunggakan saat sesi kas berjalan</p>
                    </div>

                    <div className="w-full sm:w-80">
                        <div className="relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Cari nama atau NIS siswa..."
                                className="w-full bg-dark-bg/60 border border-dark-border/40 focus:border-accent-teal focus:ring-1 focus:ring-accent-teal/30 rounded-xl pl-10 pr-4 py-2 text-xs text-gray-300 placeholder-gray-500 transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Debts Table */}
                <div className="bg-dark-card border border-dark-border/60 rounded-2xl overflow-hidden shadow-xl">
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
                            <tbody className="divide-y divide-dark-border/30 text-sm font-medium text-gray-300">
                                {filteredDebts.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-12 text-center text-gray-500 font-semibold">
                                            Tidak ada tunggakan aktif ditemukan.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredDebts.map((debt) => (
                                        <tr key={debt.id} className="hover:bg-dark-surface/10 transition-colors">
                                            <td className="py-4 px-6 text-center font-bold text-gray-400 bg-dark-surface/10">
                                                {debt.nomor_absen}
                                            </td>
                                            <td className="py-4 px-4 font-bold text-gray-200">
                                                {debt.student_name}
                                            </td>
                                            <td className="py-4 px-4 text-xs font-mono text-gray-500">
                                                {debt.student_nis}
                                            </td>
                                            <td className="py-4 px-4 text-xs text-gray-400 font-semibold flex items-center gap-1.5 mt-4">
                                                <Calendar className="w-3.5 h-3.5 text-gray-500" />
                                                Sesi {debt.session_date}
                                            </td>
                                            <td className="py-4 px-4 text-right font-black text-rose-400">
                                                {formatIDR(debt.amount)}
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <button
                                                    onClick={() => handleSettle(debt.id)}
                                                    disabled={processing}
                                                    className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-dark-bg border border-emerald-500/20 hover:border-emerald-500 text-xs font-black tracking-wide transition-all active:scale-95 disabled:opacity-50 disabled:scale-100"
                                                >
                                                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                                                    Lunasi
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
