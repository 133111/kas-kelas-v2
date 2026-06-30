import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowLeft, 
    Check, 
    X, 
    AlertTriangle, 
    Lock, 
    Unlock, 
    Search,
    User,
    Calendar,
    Coins,
    TrendingUp,
    CheckCircle2,
    XCircle,
    UserMinus,
    Percent,
    Sparkles
} from 'lucide-react';

export default function Show({ session, payments, debts }) {
    const { post, processing } = useForm();
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'paid', 'unpaid', 'absent'

    const formatIDR = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(value);
    };

    const handleStatusUpdate = (studentId, status) => {
        if (session.status === 'closed') return;
        post(`/billing/${session.id}/pay/${studentId}`, {
            data: { status },
            preserveScroll: true
        });
    };

    const handleSettleDebt = (debtId) => {
        post(`/debts/${debtId}/settle`, {
            preserveScroll: true
        });
    };

    const handleCloseSession = () => {
        if (confirm('Apakah Anda yakin ingin menutup sesi penagihan ini? Sesi yang ditutup tidak dapat diubah status pembayarannya lagi.')) {
            post(`/billing/${session.id}/close`, {
                preserveScroll: true
            });
        }
    };

    // Filter payments
    const filteredPayments = payments.filter(payment => {
        const matchesSearch = payment.student_name.toLowerCase().includes(search.toLowerCase()) || 
                              payment.student_nis.includes(search);
        
        const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
        
        return matchesSearch && matchesStatus;
    });

    const percent = payments.length > 0 
        ? Math.round((session.paid_count / payments.length) * 100) 
        : 0;

    return (
        <AppLayout header={`Sesi Penagihan - ${session.billing_date_formatted}`}>
            <Head title={`Sesi Penagihan ${session.billing_date_formatted}`} />

            <div className="space-y-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <Link
                        href="/billing"
                        className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Kembali ke Sesi
                    </Link>

                    {session.status === 'open' ? (
                        <button
                            onClick={handleCloseSession}
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-500/40 font-bold text-sm shadow-md transition-all active:scale-95 shrink-0"
                        >
                            <Lock className="w-4 h-4" />
                            Tutup Sesi Penagihan
                        </button>
                    ) : (
                        <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-500/10 text-gray-400 border border-gray-500/20 font-bold text-sm select-none">
                            <Lock className="w-4 h-4" />
                            Sesi Terkunci
                        </span>
                    )}
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Stat: Total Terkumpul */}
                    <div className="p-6 rounded-2xl bg-dark-card border border-dark-border/60 flex items-center justify-between shadow-lg relative overflow-hidden group">
                        <div className="space-y-1">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Uang Terkumpul Sesi Ini</span>
                            <h3 className="text-2xl font-black text-emerald-400">{formatIDR(session.total_collected)}</h3>
                            <p className="text-[11px] text-gray-500 font-medium">Berdasarkan data siswa bertanda Lunas</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                            <Coins className="w-6 h-6" />
                        </div>
                    </div>

                    {/* Stat: Progress */}
                    <div className="p-6 rounded-2xl bg-dark-card border border-dark-border/60 flex flex-col justify-between shadow-lg relative overflow-hidden group">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Tingkat Kelunasan</span>
                                <h3 className="text-2xl font-black text-gray-100">{percent}%</h3>
                            </div>
                            <div className="p-3 rounded-xl bg-teal-500/10 text-accent-teal">
                                <Percent className="w-5 h-5" />
                            </div>
                        </div>
                        <div className="mt-4 space-y-1">
                            <div className="w-full h-2 rounded-full bg-dark-surface overflow-hidden">
                                <div 
                                    className="bg-gradient-to-r from-accent-teal to-emerald-400 h-full rounded-full transition-all duration-500" 
                                    style={{ width: `${percent}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-[10px] text-gray-500 font-semibold">
                                <span>{session.paid_count} Lunas</span>
                                <span>{session.unpaid_count} Belum</span>
                                <span>{session.absent_count} Absen</span>
                            </div>
                        </div>
                    </div>

                    {/* Stat: Keterangan / Notes */}
                    <div className="p-6 rounded-2xl bg-dark-card border border-dark-border/60 flex items-center gap-4 shadow-lg">
                        <div className="p-3.5 rounded-xl bg-indigo-500/10 text-accent-indigo shrink-0">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <div className="min-w-0">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Detail Sesi</span>
                            <p className="text-sm font-bold text-gray-300 mt-1 truncate">
                                Dibuat oleh: <span className="text-gray-100 font-extrabold">{session.created_by}</span>
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5 truncate">{session.notes || 'Tidak ada catatan tambahan.'}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Students Table (2/3 col) */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Table Header / Filter Tool */}
                        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 bg-dark-card border border-dark-border/60 rounded-xl p-4">
                            {/* Search */}
                            <div className="relative flex-1">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Cari nama atau NIS siswa..."
                                    className="w-full bg-dark-bg/60 border border-dark-border/40 focus:border-accent-teal focus:ring-1 focus:ring-accent-teal/30 rounded-xl pl-10 pr-4 py-2 text-xs text-gray-300 placeholder-gray-500 transition-all"
                                />
                            </div>

                            {/* Filters Tab */}
                            <div className="flex items-center gap-1.5 overflow-x-auto">
                                {[
                                    { id: 'all', label: 'Semua' },
                                    { id: 'paid', label: 'Lunas' },
                                    { id: 'unpaid', label: 'Belum' },
                                    { id: 'absent', label: 'Absen' }
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setFilterStatus(tab.id)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                                            filterStatus === tab.id
                                                ? 'bg-dark-surface text-accent-teal border border-accent-teal/20'
                                                : 'text-gray-400 hover:text-gray-200 border border-transparent'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Students Table */}
                        <div className="bg-dark-card border border-dark-border/60 rounded-2xl overflow-hidden shadow-xl">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-dark-border/60 text-[11px] font-bold text-gray-400 uppercase tracking-wider bg-dark-surface/30">
                                            <th className="py-4 px-6 text-center w-16">Absen</th>
                                            <th className="py-4 px-4">Nama Siswa</th>
                                            <th className="py-4 px-4 w-28">NIS</th>
                                            <th className="py-4 px-4 text-center w-28">Status</th>
                                            <th className="py-4 px-6 text-center w-60">Aksi Pembayaran</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-dark-border/30 text-sm font-medium text-gray-300">
                                        {filteredPayments.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="py-12 text-center text-gray-500 font-semibold">
                                                    Siswa tidak ditemukan.
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredPayments.map((payment) => (
                                                <tr key={payment.id} className="hover:bg-dark-surface/10 transition-colors">
                                                    <td className="py-4 px-6 text-center font-bold text-gray-400 bg-dark-surface/10">
                                                        {payment.nomor_absen}
                                                    </td>
                                                    <td className="py-4 px-4 font-bold text-gray-200">
                                                        {payment.student_name}
                                                    </td>
                                                    <td className="py-4 px-4 text-xs font-mono text-gray-500">
                                                        {payment.student_nis}
                                                    </td>
                                                    <td className="py-4 px-4 text-center">
                                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                            payment.status === 'paid' 
                                                                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/10' 
                                                                : payment.status === 'absent'
                                                                ? 'bg-rose-500/15 text-rose-400 border border-rose-500/10'
                                                                : 'bg-amber-500/15 text-amber-400 border border-amber-500/10'
                                                        }`}>
                                                            {payment.status === 'paid' ? 'Lunas' : payment.status === 'absent' ? 'Absen' : 'Belum'}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 px-6 text-center">
                                                        <div className="flex items-center justify-center gap-1.5">
                                                            {/* Button: Bayar */}
                                                            <button
                                                                onClick={() => handleStatusUpdate(payment.student_id, 'paid')}
                                                                disabled={session.status === 'closed' || processing}
                                                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 ${
                                                                    payment.status === 'paid'
                                                                        ? 'bg-emerald-600 text-white font-extrabold shadow-md shadow-emerald-500/10'
                                                                        : 'bg-dark-surface hover:bg-emerald-500/15 text-emerald-600 hover:text-emerald-700 border border-dark-border/40 hover:border-emerald-500/30'
                                                                } disabled:opacity-50 disabled:scale-100`}
                                                            >
                                                                Bayar
                                                            </button>

                                                            {/* Button: Belum */}
                                                            <button
                                                                onClick={() => handleStatusUpdate(payment.student_id, 'unpaid')}
                                                                disabled={session.status === 'closed' || processing}
                                                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 ${
                                                                    payment.status === 'unpaid'
                                                                        ? 'bg-amber-500 text-slate-900 font-extrabold shadow-md shadow-amber-500/10'
                                                                        : 'bg-dark-surface hover:bg-amber-500/15 text-amber-600 hover:text-amber-700 border border-dark-border/40 hover:border-amber-500/30'
                                                                } disabled:opacity-50 disabled:scale-100`}
                                                            >
                                                                Belum
                                                            </button>

                                                            {/* Button: Absen */}
                                                            <button
                                                                onClick={() => handleStatusUpdate(payment.student_id, 'absent')}
                                                                disabled={session.status === 'closed' || processing}
                                                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all active:scale-95 ${
                                                                    payment.status === 'absent'
                                                                        ? 'bg-rose-600 text-white font-extrabold shadow-md shadow-rose-500/10'
                                                                        : 'bg-dark-surface hover:bg-rose-500/15 text-rose-600 hover:text-rose-700 border border-dark-border/40 hover:border-rose-500/30'
                                                                } disabled:opacity-50 disabled:scale-100`}
                                                                title="Tandai absen, hutang 2x lipat"
                                                            >
                                                                Absen
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar section: Outstanding Debts (1/3 col) */}
                    <div className="space-y-6">
                        {/* Information Warning Box */}
                        <div className="p-5 rounded-2xl bg-gradient-to-tr from-rose-500/15 to-red-500/5 border border-rose-500/20 text-rose-400 space-y-2.5">
                            <div className="flex items-center gap-2 font-bold text-sm">
                                <AlertTriangle className="w-5 h-5 shrink-0" />
                                <h4>Aturan Hutang Absen</h4>
                            </div>
                            <p className="text-xs leading-relaxed text-gray-400 font-medium">
                                Siswa yang ditandai <span className="text-rose-400 font-bold">Absen</span> tidak dibebankan iuran kas hari ini, tetapi otomatis memicu pencatatan hutang/tunggakan sebesar <span className="text-rose-400 font-bold">2 kali lipat</span> (Rp 4.000) yang ditagihkan di sesi selanjutnya.
                            </p>
                        </div>

                        {/* Debts List Card */}
                        <div className="bg-dark-card border border-dark-border/60 rounded-2xl p-5 space-y-4 shadow-xl">
                            <div>
                                <h3 className="text-base font-bold text-gray-200 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-accent-indigo" />
                                    Daftar Hutang / Tunggakan
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">Daftar tunggakan aktif yang harus dilunasi siswa</p>
                            </div>

                            <div className="space-y-3.5 max-h-[420px] overflow-y-auto pr-1">
                                {debts.length === 0 ? (
                                    <p className="text-xs text-gray-500 text-center py-6 font-semibold">Tidak ada tunggakan kas aktif.</p>
                                ) : (
                                    debts.map((debt) => (
                                        <div key={debt.id} className="p-3.5 rounded-xl bg-dark-surface/50 border border-dark-border/40 flex items-center justify-between gap-3 group">
                                            <div className="min-w-0 space-y-0.5">
                                                <p className="text-sm font-bold text-gray-200 truncate">{debt.student_name}</p>
                                                <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                                                    <span>Sesi: {debt.from_session_date}</span>
                                                </div>
                                                <p className="text-xs font-black text-rose-400 mt-1">{formatIDR(debt.amount)}</p>
                                            </div>

                                            <button
                                                onClick={() => handleSettleDebt(debt.id)}
                                                disabled={processing}
                                                className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-dark-bg border border-emerald-500/20 hover:border-emerald-500 text-[11px] font-black tracking-wide transition-all active:scale-95 shrink-0"
                                            >
                                                Lunasi
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
