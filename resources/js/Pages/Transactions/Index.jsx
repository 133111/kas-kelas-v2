import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    Plus, 
    Search, 
    ArrowUpRight, 
    ArrowDownRight, 
    Edit, 
    Trash2, 
    TrendingUp, 
    TrendingDown, 
    Wallet,
    ChevronLeft,
    ChevronRight,
    Filter
} from 'lucide-react';

export default function Index({ transactions, filters, totalIncome, totalExpense, balance }) {
    const { delete: destroy } = useForm();
    const [search, setSearch] = useState(filters.search || '');
    const [type, setType] = useState(filters.type || '');
    const [category, setCategory] = useState(filters.category || '');

    const formatIDR = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/transactions', { search, type, category }, { preserveState: true });
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { search, type, category, [key]: value };
        if (key === 'type') setType(value);
        if (key === 'category') setCategory(value);
        router.get('/transactions', newFilters, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus transaksi ini? Tindakan ini tidak dapat dibatalkan.')) {
            destroy(`/transactions/${id}`);
        }
    };

    const txList = transactions.data || [];

    return (
        <AppLayout header="Daftar Transaksi Kas">
            <Head title="Transaksi Kas" />

            <div className="space-y-8">
                {/* Header Action */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pembukuan Kas</p>
                        <h2 className="text-xl font-bold text-gray-200">Riwayat Kas Masuk & Keluar</h2>
                    </div>
                    <Link
                        href="/transactions/create"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-indigo to-indigo-600 hover:from-indigo-500 hover:to-indigo-700 text-white font-extrabold text-sm shadow-md shadow-accent-indigo/10 hover:shadow-accent-indigo/20 transition-all active:scale-95 shrink-0"
                    >
                        <Plus className="w-4.5 h-4.5 stroke-[3px]" />
                        Catat Transaksi Manual
                    </Link>
                </div>

                {/* Balance Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Saldo Kas */}
                    <div className="p-6 rounded-2xl bg-dark-card border border-dark-border/60 flex items-center justify-between shadow-lg relative overflow-hidden group">
                        <div className="space-y-1">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Saldo Kas</span>
                            <h3 className="text-2xl font-black text-gray-100">{formatIDR(balance)}</h3>
                            <p className="text-[11px] text-gray-500 font-medium">Selisih pemasukan dan pengeluaran</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-indigo-500/10 text-accent-indigo">
                            <Wallet className="w-6 h-6" />
                        </div>
                    </div>

                    {/* Total Pemasukan */}
                    <div className="p-6 rounded-2xl bg-dark-card border border-dark-border/60 flex items-center justify-between shadow-lg relative overflow-hidden group">
                        <div className="space-y-1">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Pemasukan</span>
                            <h3 className="text-2xl font-black text-emerald-400">{formatIDR(totalIncome)}</h3>
                            <p className="text-[11px] text-gray-500 font-medium">Dari iuran kas & pelunasan hutang</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                    </div>

                    {/* Total Pengeluaran */}
                    <div className="p-6 rounded-2xl bg-dark-card border border-dark-border/60 flex items-center justify-between shadow-lg relative overflow-hidden group">
                        <div className="space-y-1">
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Pengeluaran</span>
                            <h3 className="text-2xl font-black text-rose-400">{formatIDR(totalExpense)}</h3>
                            <p className="text-[11px] text-gray-500 font-medium">Digunakan untuk kebutuhan kelas</p>
                        </div>
                        <div className="p-3.5 rounded-xl bg-rose-500/10 text-rose-400">
                            <TrendingDown className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* Filter and Search Panel */}
                <div className="bg-dark-card border border-dark-border/60 rounded-xl p-5">
                    <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
                        {/* Search Input */}
                        <div className="space-y-1.5 sm:col-span-2">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Cari Deskripsi</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Cari deskripsi transaksi..."
                                    className="w-full bg-dark-bg/60 border border-dark-border/40 focus:border-accent-indigo focus:ring-1 focus:ring-accent-indigo/30 rounded-xl pl-9 pr-4 py-2 text-xs text-gray-300 placeholder-gray-500 transition-all"
                                />
                            </div>
                        </div>

                        {/* Type Select */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Tipe Transaksi</label>
                            <select
                                value={type}
                                onChange={e => handleFilterChange('type', e.target.value)}
                                className="w-full bg-dark-bg/60 border border-dark-border/40 focus:border-accent-indigo focus:ring-1 focus:ring-accent-indigo/30 rounded-xl px-3 py-2 text-xs text-gray-300 transition-all"
                            >
                                <option value="">Semua Tipe</option>
                                <option value="income">Pemasukan (+)</option>
                                <option value="expense">Pengeluaran (-)</option>
                            </select>
                        </div>

                        {/* Category Select */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Kategori</label>
                            <select
                                value={category}
                                onChange={e => handleFilterChange('category', e.target.value)}
                                className="w-full bg-dark-bg/60 border border-dark-border/40 focus:border-accent-indigo focus:ring-1 focus:ring-accent-indigo/30 rounded-xl px-3 py-2 text-xs text-gray-300 transition-all"
                            >
                                <option value="">Semua Kategori</option>
                                <option value="kas">Uang Kas</option>
                                <option value="pengeluaran">Pengeluaran Kelas</option>
                                <option value="hutang_lunas">Pelunasan Hutang</option>
                                <option value="lainnya">Lainnya</option>
                            </select>
                        </div>
                    </form>
                </div>

                {/* Table Data */}
                <div className="bg-dark-card border border-dark-border/60 rounded-2xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-dark-border/60 text-[11px] font-bold text-gray-400 uppercase tracking-wider bg-dark-surface/30">
                                    <th className="py-4 px-6 w-20 text-center">Tipe</th>
                                    <th className="py-4 px-4">Deskripsi Transaksi</th>
                                    <th className="py-4 px-4 w-36">Kategori</th>
                                    <th className="py-4 px-4 w-40">Tanggal Transaksi</th>
                                    <th className="py-4 px-4 w-36 text-right">Jumlah</th>
                                    <th className="py-4 px-6 w-28 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-dark-border/30 text-sm font-medium text-gray-300">
                                {txList.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-12 text-center text-gray-500 font-semibold">
                                            Tidak ada data transaksi ditemukan.
                                        </td>
                                    </tr>
                                ) : (
                                    txList.map((tx) => (
                                        <tr key={tx.id} className="hover:bg-dark-surface/10 transition-colors">
                                            <td className="py-4 px-6 text-center">
                                                <span className={`inline-flex p-1.5 rounded-lg ${
                                                    tx.type === 'income' 
                                                        ? 'bg-emerald-500/10 text-emerald-400' 
                                                        : 'bg-rose-500/10 text-rose-400'
                                                }`}>
                                                    {tx.type === 'income' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 font-bold text-gray-200">
                                                {tx.description}
                                            </td>
                                            <td className="py-4 px-4 text-xs font-semibold uppercase text-gray-500">
                                                {tx.category.replace('_', ' ')}
                                            </td>
                                            <td className="py-4 px-4 text-xs text-gray-400">
                                                {tx.transaction_date}
                                            </td>
                                            <td className={`py-4 px-4 text-right font-black ${
                                                tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                                            }`}>
                                                {tx.type === 'income' ? '+' : '-'}{formatIDR(tx.amount)}
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Link
                                                        href={`/transactions/${tx.id}/edit`}
                                                        className="p-1.5 rounded-lg bg-dark-surface hover:bg-dark-surface/80 border border-dark-border text-gray-400 hover:text-white transition-all"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4.5 h-4.5" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(tx.id)}
                                                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/10 hover:border-red-500/30 text-red-400 transition-all"
                                                        title="Hapus"
                                                    >
                                                        <Trash2 className="w-4.5 h-4.5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination links wrapper */}
                    {transactions.links && transactions.links.length > 3 && (
                        <div className="px-6 py-4 border-t border-dark-border/40 bg-dark-surface/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                            <span className="text-gray-500 font-semibold">
                                Menampilkan Halaman <span className="text-gray-300">{transactions.current_page}</span> dari <span className="text-gray-300">{transactions.last_page}</span>
                            </span>
                            
                            <div className="flex items-center gap-1">
                                {transactions.links.map((link, idx) => {
                                    // Ignore 'Previous' and 'Next' standard strings, render customized arrows instead
                                    let label = link.label;
                                    if (label.includes('Previous')) {
                                        return (
                                            <Link
                                                key={idx}
                                                href={link.url || '#'}
                                                disabled={!link.url}
                                                className={`p-2 rounded-lg border border-dark-border/60 hover:bg-dark-surface text-gray-400 hover:text-white transition-all ${!link.url ? 'opacity-30 pointer-events-none' : ''}`}
                                            >
                                                <ChevronLeft className="w-4 h-4" />
                                            </Link>
                                        );
                                    }
                                    if (label.includes('Next')) {
                                        return (
                                            <Link
                                                key={idx}
                                                href={link.url || '#'}
                                                disabled={!link.url}
                                                className={`p-2 rounded-lg border border-dark-border/60 hover:bg-dark-surface text-gray-400 hover:text-white transition-all ${!link.url ? 'opacity-30 pointer-events-none' : ''}`}
                                            >
                                                <ChevronRight className="w-4 h-4" />
                                            </Link>
                                        );
                                    }
                                    
                                    return (
                                        <Link
                                            key={idx}
                                            href={link.url || '#'}
                                            className={`px-3 py-2 rounded-lg border font-bold transition-all ${
                                                link.active
                                                    ? 'bg-accent-indigo border-accent-indigo text-white shadow-sm'
                                                    : 'bg-dark-surface border-dark-border/60 text-gray-400 hover:text-white'
                                            } ${!link.url ? 'opacity-50 pointer-events-none' : ''}`}
                                            dangerouslySetInnerHTML={{ __html: label }}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
