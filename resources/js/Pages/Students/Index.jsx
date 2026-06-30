import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
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

export default function Index({ students, filters }) {
    const [search, setSearch] = useState(filters.search || '');

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
        if (rate >= 80) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
        if (rate >= 50) return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
        return 'text-rose-400 bg-rose-500/10 border-rose-500/20';
    };

    return (
        <AppLayout header="Daftar Siswa Kelas">
            <Head title="Daftar Siswa" />

            <div className="space-y-8">
                {/* Summary Widgets */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Total Siswa */}
                    <div className="p-6 rounded-2xl bg-dark-card border border-dark-border/60 flex items-center justify-between shadow-lg relative overflow-hidden group">
                        <div className="space-y-1">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Siswa Aktif</span>
                            <h3 className="text-2xl font-black text-gray-100">{totalStudents} Siswa</h3>
                            <p className="text-[11px] text-gray-500 font-medium">Terdaftar di absensi kas kelas</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-teal-500/10 text-accent-teal">
                            <Users className="w-6 h-6" />
                        </div>
                    </div>

                    {/* Rata-rata Kerajinan */}
                    <div className="p-6 rounded-2xl bg-dark-card border border-dark-border/60 flex items-center justify-between shadow-lg relative overflow-hidden group">
                        <div className="space-y-1">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Rata-rata Indeks Kerajinan</span>
                            <h3 className="text-2xl font-black text-emerald-400">{avgDiligence}%</h3>
                            <p className="text-[11px] text-gray-500 font-medium">Ketepatan bayar iuran kas kelas</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                            <Award className="w-6 h-6" />
                        </div>
                    </div>

                    {/* Total Tunggakan */}
                    <div className="p-6 rounded-2xl bg-dark-card border border-dark-border/60 flex items-center justify-between shadow-lg relative overflow-hidden group">
                        <div className="space-y-1">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Akumulasi Tunggakan Siswa</span>
                            <h3 className="text-2xl font-black text-rose-400">{formatIDR(totalOutstandingDebt)}</h3>
                            <p className="text-[11px] text-gray-500 font-medium">Uang kas kelas belum lunas</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-rose-500/10 text-rose-400">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* Filter and Search Panel */}
                <div className="bg-dark-card border border-dark-border/60 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="text-sm font-bold text-gray-200">Daftar Anggota Kelas</h3>
                        <p className="text-xs text-gray-500">Menampilkan seluruh data siswa beserta kedisiplinan kas</p>
                    </div>

                    <form onSubmit={handleSearchSubmit} className="w-full sm:w-80">
                        <div className="relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Cari nama siswa..."
                                className="w-full bg-dark-bg/60 border border-dark-border/40 focus:border-accent-teal focus:ring-1 focus:ring-accent-teal/30 rounded-xl pl-10 pr-4 py-2 text-xs text-gray-300 placeholder-gray-500 transition-all"
                            />
                        </div>
                    </form>
                </div>

                {/* Students Table */}
                <div className="bg-dark-card border border-dark-border/60 rounded-2xl overflow-hidden shadow-xl">
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
                                        <td colSpan="5" className="py-12 text-center text-gray-500 font-semibold">
                                            Siswa tidak ditemukan.
                                        </td>
                                    </tr>
                                ) : (
                                    students.map((student) => (
                                        <tr key={student.id} className="hover:bg-dark-surface/10 transition-colors group">
                                            <td className="py-4 px-6 text-center font-bold text-gray-400 bg-dark-surface/10">
                                                {student.nomor_absen}
                                            </td>
                                            <td className="py-4 px-4 font-bold text-gray-200">
                                                {student.name}
                                            </td>
                                            <td className="py-4 px-4 text-center">
                                                <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusColor(student.payment_rate)}`}>
                                                    <Sparkles className="w-3 h-3" />
                                                    {student.payment_rate}% ({student.paid_count}/{student.total_sessions})
                                                </span>
                                            </td>
                                            <td className={`py-4 px-4 text-right font-black ${
                                                student.total_debt > 0 ? 'text-rose-400' : 'text-gray-500'
                                            }`}>
                                                {student.total_debt > 0 ? formatIDR(student.total_debt) : 'Lunas'}
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link
                                                        href={`/students/${student.id}`}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-dark-surface hover:bg-dark-surface/80 border border-dark-border text-xs font-bold text-gray-300 hover:text-white transition-all active:scale-95"
                                                    >
                                                        Detail
                                                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                                    </Link>
                                                    <Link
                                                        href={`/students/${student.id}/edit`}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 hover:text-emerald-850 border border-emerald-200 text-xs font-bold transition-all active:scale-95 cursor-pointer"
                                                    >
                                                        <Pencil className="w-3 h-3 text-emerald-600" />
                                                        Edit
                                                    </Link>
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
        </AppLayout>
    );
}
