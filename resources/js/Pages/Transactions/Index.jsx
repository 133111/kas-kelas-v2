import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    PlusCircle, 
    ArrowUpRight, 
    ArrowDownRight, 
    Search, 
    Filter, 
    Trash2,
    Calendar,
    Pencil,
    X,
    AlertTriangle,
    Wallet
} from 'lucide-react';

export default function Index({ transactions, filters, totalIncome, totalExpense, currentBalance }) {
    const [search, setSearch] = useState(filters.search || '');
    const [type, setType] = useState(filters.type || '');
    const [showFilters, setShowFilters] = useState(false);
    
    const { delete: destroy, processing } = useForm();
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const formatIDR = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(value);
    };

    const handleFilter = (e) => {
        e?.preventDefault();
        router.get('/transactions', { search, type }, { preserveState: true });
    };

    // Confirm Delete
    const confirmDelete = (item) => {
        setItemToDelete(item);
        setConfirmingDeletion(true);
    };

    const closeModal = () => {
        setConfirmingDeletion(false);
        setTimeout(() => setItemToDelete(null), 300);
    };

    const deleteItem = (e) => {
        e.preventDefault();
        if (!itemToDelete) return;

        destroy(`/transactions/${itemToDelete.id}`, {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
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
        <AppLayout header="Pembukuan Kas Kelas">
            <Head title="Pembukuan Kas" />

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-6"
            >
                {/* Aggregate Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Saldo Akhir */}
                    <motion.div 
                        variants={itemVariants}
                        whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300 } }}
                        className="p-6 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 border border-emerald-400 shadow-lg relative overflow-hidden group hover-shimmer"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500">
                            <Wallet className="w-24 h-24 text-white" />
                        </div>
                        <div className="relative z-10 space-y-1">
                            <span className="text-xs font-bold text-emerald-100 uppercase tracking-wider">Saldo Kas Saat Ini</span>
                            <h3 className="text-3xl font-black text-white tracking-tight">{formatIDR(currentBalance)}</h3>
                            <p className="text-[11px] text-emerald-100 font-medium pt-1">Total ketersediaan dana kas operasional</p>
                        </div>
                    </motion.div>

                    {/* Total Pemasukan */}
                    <motion.div 
                        variants={itemVariants}
                        whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300 } }}
                        className="p-6 rounded-2xl bg-dark-card border border-dark-border/60 shadow-lg group hover-shimmer hover-glow-teal"
                    >
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Pemasukan</span>
                                <h3 className="text-xl font-black text-emerald-400">{formatIDR(totalIncome)}</h3>
                                <p className="text-[11px] text-gray-500 font-medium pt-1">Akumulasi iuran & donasi</p>
                            </div>
                            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:-translate-y-1 group-hover:scale-110 transition-transform">
                                <ArrowUpRight className="w-5 h-5" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Total Pengeluaran */}
                    <motion.div 
                        variants={itemVariants}
                        whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300 } }}
                        className="p-6 rounded-2xl bg-dark-card border border-dark-border/60 shadow-lg group hover-shimmer"
                        style={{ '--tw-hover-border-color': 'rgba(245, 158, 11, 0.3)', '--tw-hover-shadow-color': 'rgba(245, 158, 11, 0.2)' }}
                    >
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Pengeluaran</span>
                                <h3 className="text-xl font-black text-amber-400">{formatIDR(totalExpense)}</h3>
                                <p className="text-[11px] text-gray-500 font-medium pt-1">Akumulasi belanja operasional</p>
                            </div>
                            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 group-hover:translate-y-1 group-hover:scale-110 transition-transform">
                                <ArrowDownRight className="w-5 h-5" />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Filter and Actions Panel */}
                <motion.div 
                    variants={itemVariants}
                    className="bg-dark-card border border-dark-border/60 rounded-xl p-4"
                >
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`p-2.5 rounded-xl border transition-all ${
                                    showFilters || type !== '' 
                                        ? 'bg-accent-teal/10 border-accent-teal/30 text-accent-teal' 
                                        : 'bg-dark-surface border-dark-border text-gray-400 hover:text-white'
                                }`}
                            >
                                <Filter className="w-4 h-4" />
                            </button>
                            <div>
                                <h3 className="text-sm font-bold text-gray-200">Data Transaksi Kas</h3>
                                <p className="text-xs text-gray-500">Log aktivitas pemasukan dan pengeluaran</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
                            <form onSubmit={handleFilter} className="relative w-full sm:w-64">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Cari deskripsi transaksi..."
                                    className="w-full bg-dark-bg/60 border border-dark-border/40 focus:border-accent-teal focus:ring-1 focus:ring-accent-teal/30 rounded-xl pl-10 pr-4 py-2.5 text-xs text-gray-300 placeholder-gray-500 transition-all"
                                />
                                <button type="submit" className="hidden">Submit</button>
                            </form>
                            <Link
                                href="/transactions/create"
                                className="btn-ripple inline-flex justify-center items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-teal to-teal-500 hover:from-teal-400 hover:to-teal-600 text-dark-bg font-extrabold text-xs shadow-md shadow-accent-teal/15 hover:shadow-accent-teal/30 transition-all active:scale-95 shrink-0"
                            >
                                <PlusCircle className="w-4 h-4" />
                                Tambah Transaksi
                            </Link>
                        </div>
                    </div>

                    {/* Expandable Filter Box */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="overflow-hidden"
                            >
                                <div className="mt-4 pt-4 border-t border-dark-border/40 flex flex-wrap gap-2">
                                    <button 
                                        onClick={() => { setType(''); setTimeout(() => router.get('/transactions', { search, type: '' }, { preserveState: true }), 10); }}
                                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${type === '' ? 'bg-dark-surface border border-gray-500 text-white' : 'bg-dark-surface/50 border border-dark-border/50 text-gray-400 hover:text-gray-300'}`}
                                    >
                                        Semua
                                    </button>
                                    <button 
                                        onClick={() => { setType('income'); setTimeout(() => router.get('/transactions', { search, type: 'income' }, { preserveState: true }), 10); }}
                                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${type === 'income' ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400' : 'bg-dark-surface/50 border border-dark-border/50 text-gray-400 hover:text-emerald-400'}`}
                                    >
                                        Hanya Pemasukan
                                    </button>
                                    <button 
                                        onClick={() => { setType('expense'); setTimeout(() => router.get('/transactions', { search, type: 'expense' }, { preserveState: true }), 10); }}
                                        className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${type === 'expense' ? 'bg-amber-500/20 border border-amber-500/40 text-amber-400' : 'bg-dark-surface/50 border border-dark-border/50 text-gray-400 hover:text-amber-400'}`}
                                    >
                                        Hanya Pengeluaran
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Transactions Table */}
                <motion.div 
                    variants={itemVariants}
                    className="bg-dark-card border border-dark-border/60 rounded-2xl overflow-hidden shadow-xl"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-dark-border/60 text-[11px] font-bold text-gray-400 uppercase tracking-wider bg-dark-surface/30">
                                    <th className="py-4 px-6 w-40">Tanggal</th>
                                    <th className="py-4 px-4">Deskripsi / Keterangan</th>
                                    <th className="py-4 px-4 w-32">Kategori</th>
                                    <th className="py-4 px-4 text-right w-44">Jumlah Rupiah</th>
                                    <th className="py-4 px-6 text-center w-28">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-dark-border/30 text-sm font-medium text-gray-300">
                                {transactions.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="py-12 text-center text-gray-500 font-semibold">
                                            Tidak ada data transaksi kas yang ditemukan.
                                        </td>
                                    </tr>
                                ) : (
                                    transactions.data.map((tx, idx) => (
                                        <motion.tr 
                                            key={tx.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05, type: 'spring', stiffness: 100 }}
                                            className="hover:bg-dark-surface/30 transition-colors group"
                                        >
                                            <td className="py-4 px-6 text-xs text-gray-400 font-bold flex items-center gap-2">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {tx.date}
                                            </td>
                                            <td className="py-4 px-4 font-bold text-gray-200">
                                                <div className="flex items-center gap-2.5">
                                                    <motion.div 
                                                        whileHover={{ rotate: 15 }}
                                                        className={`p-1.5 rounded-lg shrink-0 ${
                                                            tx.type === 'income' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                                                        }`}
                                                    >
                                                        {tx.type === 'income' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                                                    </motion.div>
                                                    {tx.description}
                                                    {tx.student_name && (
                                                        <span className="px-2 py-0.5 rounded bg-dark-surface/50 border border-dark-border text-[10px] text-gray-400 ml-1">
                                                            {tx.student_name}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-dark-surface border border-dark-border/50 text-[10px] font-bold text-gray-400 capitalize">
                                                    {tx.category.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className={`py-4 px-4 text-right font-black ${
                                                tx.type === 'income' ? 'text-emerald-400' : 'text-amber-400'
                                            }`}>
                                                {tx.type === 'income' ? '+' : '-'}{formatIDR(tx.amount)}
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <div className="flex items-center justify-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                                                    <Link
                                                        href={`/transactions/${tx.id}/edit`}
                                                        className="p-1.5 text-gray-400 hover:text-accent-teal hover:bg-teal-500/10 rounded-lg transition-colors group/btn"
                                                        title="Edit"
                                                    >
                                                        <Pencil className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                                    </Link>
                                                    <button
                                                        onClick={() => confirmDelete(tx)}
                                                        className="p-1.5 text-gray-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors group/btn"
                                                        title="Hapus"
                                                    >
                                                        <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
                
                {/* Pagination (Simplified) */}
                {transactions.links && transactions.links.length > 3 && (
                    <motion.div variants={itemVariants} className="flex justify-center mt-6">
                        <div className="flex gap-1 bg-dark-card border border-dark-border/60 p-1 rounded-xl shadow-lg">
                            {transactions.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                                        link.active 
                                            ? 'bg-accent-teal text-white shadow-md shadow-accent-teal/20' 
                                            : !link.url 
                                                ? 'text-gray-600 cursor-not-allowed' 
                                                : 'text-gray-400 hover:bg-dark-surface hover:text-white'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </motion.div>

            {/* Modal Konfirmasi Hapus Transaksi */}
            <AnimatePresence>
                {confirmingDeletion && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pt-4 pb-20 text-center sm:p-0">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 transition-opacity bg-black/60 backdrop-blur-sm"
                            onClick={closeModal}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-dark-card border border-dark-border shadow-2xl rounded-2xl relative z-50"
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 rounded-full bg-rose-500/10 text-rose-500">
                                        <AlertTriangle className="w-6 h-6 animate-pulse" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-100">
                                            Hapus Transaksi Kas
                                        </h3>
                                        <p className="text-sm text-gray-400 mt-1">
                                            Konfirmasi penghapusan data
                                        </p>
                                    </div>
                                </div>
                                <button onClick={closeModal} className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-dark-surface/50 transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="mt-6 p-4 rounded-xl bg-dark-surface/50 border border-dark-border text-sm font-medium text-gray-300">
                                Apakah Anda yakin ingin menghapus transaksi <span className="font-bold text-white">"{itemToDelete?.description}"</span> sebesar <span className="font-bold text-rose-400">{formatIDR(itemToDelete?.amount)}</span>?
                                <br/><br/>
                                <span className="text-rose-400 text-xs">Catatan: Saldo kas akan otomatis disesuaikan (berkurang/bertambah) setelah dihapus.</span>
                            </div>

                            <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-5 py-2.5 bg-dark-surface hover:bg-dark-surface/80 border border-dark-border text-gray-300 font-bold text-sm rounded-xl transition-colors active:scale-95"
                                >
                                    Batal
                                </button>
                                <button
                                    type="button"
                                    onClick={deleteItem}
                                    disabled={processing}
                                    className="btn-ripple inline-flex justify-center items-center px-5 py-2.5 bg-rose-500 hover:bg-rose-600 border border-transparent text-white font-bold text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all disabled:opacity-50 disabled:scale-100 active:scale-95"
                                >
                                    {processing ? 'Menghapus...' : 'Ya, Hapus Data'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </AppLayout>
    );
}
