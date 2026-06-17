import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    ArrowLeft, 
    Calendar, 
    Award, 
    Coins, 
    AlertTriangle, 
    CheckCircle2, 
    XCircle, 
    UserMinus, 
    User,
    TrendingUp,
    Check,
    Clock
} from 'lucide-react';

export default function Show({ student, paymentHistory, chartData, debts }) {
    const { post, processing } = useForm();

    const formatIDR = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(value);
    };

    const handleSettleDebt = (debtId) => {
        post(`/debts/${debtId}/settle`, {
            preserveScroll: true
        });
    };

    // Diligence rate color
    const getDiligenceColor = (rate) => {
        if (rate >= 80) return 'text-emerald-400';
        if (rate >= 50) return 'text-amber-400';
        return 'text-rose-400';
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'paid':
                return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
            case 'absent':
                return <UserMinus className="w-4 h-4 text-rose-400" />;
            case 'unpaid':
            default:
                return <XCircle className="w-4 h-4 text-amber-400" />;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'paid': return 'Lunas';
            case 'absent': return 'Absen';
            case 'unpaid': return 'Belum Bayar';
            default: return status;
        }
    };

    return (
        <AppLayout header={`Profil Siswa - ${student.name}`}>
            <Head title={`Profil Siswa - ${student.name}`} />

            <div className="space-y-8">
                {/* Back Link */}
                <Link
                    href="/students"
                    className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke Daftar Siswa
                </Link>

                {/* Profile Banner */}
                <div className="p-6 rounded-2xl bg-dark-card border border-dark-border/60 shadow-xl relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-accent-teal to-accent-indigo flex items-center justify-center font-black text-white text-2xl uppercase shadow-md shadow-accent-teal/10">
                            {student.name.charAt(0)}
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl font-extrabold text-white">{student.name}</h2>
                                <span className="px-2 py-0.5 rounded-lg bg-dark-surface border border-dark-border text-xs text-gray-400 font-bold">
                                    Absen {student.nomor_absen}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 font-medium">NIS: <span className="font-mono text-gray-300">{student.nis}</span></p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:items-end gap-1">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Tingkat Kedisplinan Kas</span>
                        <h3 className={`text-3xl font-black ${getDiligenceColor(student.payment_rate)}`}>
                            {student.payment_rate}%
                        </h3>
                        <p className="text-[10px] text-gray-500 font-medium">
                            Telah melunasi {student.paid_count} dari {student.total_sessions} sesi penagihan
                        </p>
                    </div>
                </div>

                {/* Student Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Terbayar */}
                    <div className="p-5 rounded-2xl bg-dark-card border border-dark-border/60 flex items-center justify-between shadow-md">
                        <div className="space-y-1">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Kas Terbayar</span>
                            <h3 className="text-xl font-black text-emerald-400">{formatIDR(student.total_paid_amount)}</h3>
                            <p className="text-[10px] text-gray-500 font-semibold">Dana yang sudah masuk kas kelas</p>
                        </div>
                        <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                            <Coins className="w-5 h-5" />
                        </div>
                    </div>

                    {/* Tunggakan */}
                    <div className="p-5 rounded-2xl bg-dark-card border border-dark-border/60 flex items-center justify-between shadow-md">
                        <div className="space-y-1">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Tunggakan</span>
                            <h3 className="text-xl font-black text-rose-400">{formatIDR(student.total_debt)}</h3>
                            <p className="text-[10px] text-gray-500 font-semibold">Sanksi absen 2x lipat / belum bayar</p>
                        </div>
                        <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400">
                            <AlertTriangle className="w-5 h-5" />
                        </div>
                    </div>

                    {/* Sesi Diikuti */}
                    <div className="p-5 rounded-2xl bg-dark-card border border-dark-border/60 flex items-center justify-between shadow-md">
                        <div className="space-y-1">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Sesi Terlacak</span>
                            <h3 className="text-xl font-black text-indigo-400">{student.total_sessions} Sesi</h3>
                            <p className="text-[10px] text-gray-500 font-semibold">Jumlah sesi penagihan kelas keseluruhan</p>
                        </div>
                        <div className="p-3 rounded-xl bg-indigo-500/10 text-accent-indigo">
                            <Calendar className="w-5 h-5" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Payment History Log (2/3 col) */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Session Compliance Contribution-style block grid */}
                        <div className="bg-dark-card border border-dark-border/60 rounded-2xl p-5 space-y-4 shadow-xl">
                            <div>
                                <h3 className="text-sm font-bold text-gray-200">Timeline Pembayaran Terakhir</h3>
                                <p className="text-xs text-gray-500 mt-1">Status keikutsertaan kas pada 12 sesi penagihan terakhir</p>
                            </div>

                            <div className="flex flex-wrap gap-2.5 pt-2">
                                {chartData.length === 0 ? (
                                    <p className="text-xs text-gray-500 font-semibold py-2">Belum ada data visualisasi.</p>
                                ) : (
                                    chartData.map((data, index) => {
                                        let bgClass = 'bg-dark-surface border-dark-border text-gray-500';
                                        if (data.status === 'paid') bgClass = 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400';
                                        if (data.status === 'absent') bgClass = 'bg-rose-500/15 border-rose-500/30 text-rose-400';
                                        if (data.status === 'unpaid') bgClass = 'bg-amber-500/15 border-amber-500/30 text-amber-400';

                                        return (
                                            <div 
                                                key={index} 
                                                className={`px-3 py-2 rounded-xl border text-center flex flex-col items-center justify-between w-20 h-16 shrink-0 font-sans ${bgClass}`}
                                            >
                                                <span className="text-[10px] font-bold tracking-tight">{data.date}</span>
                                                <div className="mt-1">
                                                    {getStatusIcon(data.status)}
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>

                        {/* Payment Log Table */}
                        <div className="bg-dark-card border border-dark-border/60 rounded-2xl overflow-hidden shadow-xl">
                            <div className="px-6 py-4 border-b border-dark-border/40 bg-dark-surface/10">
                                <h3 className="text-sm font-bold text-gray-200">Riwayat Transaksi & Pembayaran</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-dark-border/60 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-dark-surface/20">
                                            <th className="py-3 px-6">Tanggal Sesi</th>
                                            <th className="py-3 px-4">Jumlah Bayar</th>
                                            <th className="py-3 px-4">Status</th>
                                            <th className="py-3 px-6 text-right">Tanggal Pelunasan</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-dark-border/30 text-xs font-semibold text-gray-300">
                                        {paymentHistory.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="py-12 text-center text-gray-500 font-semibold">
                                                    Belum ada riwayat transaksi kas.
                                                </td>
                                            </tr>
                                        ) : (
                                            paymentHistory.map((history) => (
                                                <tr key={history.id} className="hover:bg-dark-surface/10 transition-colors">
                                                    <td className="py-3.5 px-6 font-bold text-gray-200 flex items-center gap-2">
                                                        <Calendar className="w-3.5 h-3.5 text-gray-500" />
                                                        {history.session_date}
                                                    </td>
                                                    <td className="py-3.5 px-4 font-mono font-bold text-gray-300">
                                                        {formatIDR(history.amount)}
                                                    </td>
                                                    <td className="py-3.5 px-4">
                                                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                                                            history.status === 'paid' 
                                                                ? 'bg-emerald-500/15 text-emerald-400' 
                                                                : history.status === 'absent'
                                                                ? 'bg-rose-500/15 text-rose-400'
                                                                : 'bg-amber-500/15 text-amber-400'
                                                        }`}>
                                                            {getStatusText(history.status)}
                                                        </span>
                                                    </td>
                                                    <td className="py-3.5 px-6 text-right text-gray-400 font-mono text-[10px]">
                                                        {history.paid_at ? (
                                                            <span className="flex items-center justify-end gap-1 text-emerald-400">
                                                                <Clock className="w-3 h-3" />
                                                                {history.paid_at}
                                                            </span>
                                                        ) : (
                                                            <span className="text-gray-500 font-sans font-medium">—</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Debts list Sidebar (1/3 col) */}
                    <div className="space-y-6">
                        {/* Settle Debts Box */}
                        <div className="bg-dark-card border border-dark-border/60 rounded-2xl p-5 space-y-4 shadow-xl">
                            <div>
                                <h3 className="text-base font-bold text-gray-200 flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
                                    Tunggakan Aktif Siswa
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">Daftar hutang/sanksi absen yang belum dilunasi</p>
                            </div>

                            <div className="space-y-3">
                                {debts.length === 0 ? (
                                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-center text-xs font-semibold py-8 space-y-1">
                                        <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500 mb-1" />
                                        <p>Semua Tagihan Lunas!</p>
                                        <p className="text-[10px] text-gray-500 font-medium">Siswa ini tidak memiliki tunggakan kas.</p>
                                    </div>
                                ) : (
                                    debts.map((debt) => (
                                        <div key={debt.id} className="p-3.5 rounded-xl bg-dark-surface/50 border border-dark-border/40 flex items-center justify-between gap-3 group">
                                            <div className="min-w-0 space-y-0.5">
                                                <p className="text-xs text-gray-400 font-medium">Asal Sesi: <span className="font-bold text-gray-300">{debt.session_date}</span></p>
                                                <p className="text-xs font-black text-rose-400 mt-1.5">{formatIDR(debt.amount)}</p>
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
