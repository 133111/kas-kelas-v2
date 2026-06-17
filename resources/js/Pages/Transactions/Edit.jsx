import React, { useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Check, Coins, Calendar, FileText, BarChart } from 'lucide-react';

export default function Edit({ transaction }) {
    const { data, setData, put, processing, errors } = useForm({
        type: transaction.type,
        amount: transaction.amount,
        description: transaction.description,
        category: transaction.category,
        transaction_date: transaction.transaction_date,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/transactions/${transaction.id}`);
    };

    return (
        <AppLayout header="Edit Transaksi Kas">
            <Head title="Edit Transaksi" />

            <div className="max-w-2xl mx-auto space-y-6">
                {/* Back button */}
                <Link
                    href="/transactions"
                    className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke Daftar Transaksi
                </Link>

                {/* Form Card */}
                <div className="bg-dark-card border border-dark-border/60 rounded-2xl p-6 sm:p-8 shadow-xl">
                    <div className="border-b border-dark-border/40 pb-5 mb-6">
                        <h2 className="text-xl font-bold text-gray-200">Perbarui Detail Transaksi</h2>
                        <p className="text-xs text-gray-500 mt-1">
                            Sesuaikan data transaksi manual kas masuk atau kas keluar di bawah.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Transaction Type (read-only or warned if changed) */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
                                <BarChart className="w-4 h-4 text-accent-indigo" />
                                Tipe Transaksi
                            </label>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setData('type', 'expense')}
                                    className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                                        data.type === 'expense'
                                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/40 shadow-sm'
                                            : 'bg-dark-bg/40 text-gray-400 border-dark-border/60 hover:text-gray-200'
                                    }`}
                                >
                                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                                    Pengeluaran (Kas Keluar)
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setData('type', 'income')}
                                    className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                                        data.type === 'income'
                                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/40 shadow-sm'
                                            : 'bg-dark-bg/40 text-gray-400 border-dark-border/60 hover:text-gray-200'
                                    }`}
                                >
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                    Pemasukan (Kas Masuk)
                                </button>
                            </div>
                            {errors.type && (
                                <p className="text-xs font-semibold text-red-400 mt-1">{errors.type}</p>
                            )}
                        </div>

                        {/* Amount */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
                                <Coins className="w-4 h-4 text-accent-indigo" />
                                Jumlah (Nominal)
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500">Rp</span>
                                <input
                                    type="number"
                                    min="1"
                                    required
                                    value={data.amount}
                                    onChange={e => setData('amount', e.target.value)}
                                    placeholder="Nominal transaksi..."
                                    className="w-full bg-dark-bg/50 border border-dark-border/60 focus:border-accent-indigo focus:ring-1 focus:ring-accent-indigo/50 rounded-xl pl-11 pr-4 py-3 text-sm text-gray-200 placeholder-gray-600 transition-all font-semibold"
                                />
                            </div>
                            {errors.amount && (
                                <p className="text-xs font-semibold text-red-400 mt-1">{errors.amount}</p>
                            )}
                        </div>

                        {/* Category */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
                                <BarChart className="w-4 h-4 text-accent-indigo" />
                                Kategori
                            </label>
                            <select
                                value={data.category}
                                onChange={e => setData('category', e.target.value)}
                                className="w-full bg-dark-bg/50 border border-dark-border/60 focus:border-accent-indigo focus:ring-1 focus:ring-accent-indigo/50 rounded-xl px-4 py-3 text-sm text-gray-200 transition-all font-semibold"
                            >
                                {data.type === 'expense' ? (
                                    <>
                                        <option value="pengeluaran">Pengeluaran Kelas (Membeli sapu, spidol, dll)</option>
                                        <option value="lainnya">Lainnya</option>
                                    </>
                                ) : (
                                    <>
                                        <option value="lainnya">Lainnya (Donasi, Pemasukan Tambahan, dll)</option>
                                        <option value="kas">Uang Kas Siswa</option>
                                        <option value="hutang_lunas">Pelunasan Hutang</option>
                                    </>
                                )}
                            </select>
                            {errors.category && (
                                <p className="text-xs font-semibold text-red-400 mt-1">{errors.category}</p>
                            )}
                        </div>

                        {/* Transaction Date */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 text-accent-indigo" />
                                Tanggal Transaksi
                            </label>
                            <input
                                type="date"
                                required
                                value={data.transaction_date}
                                onChange={e => setData('transaction_date', e.target.value)}
                                className="w-full bg-dark-bg/50 border border-dark-border/60 focus:border-accent-indigo focus:ring-1 focus:ring-accent-indigo/50 rounded-xl px-4 py-3 text-sm text-gray-200 transition-all"
                            />
                            {errors.transaction_date && (
                                <p className="text-xs font-semibold text-red-400 mt-1">{errors.transaction_date}</p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
                                <FileText className="w-4 h-4 text-accent-indigo" />
                                Deskripsi / Keterangan
                            </label>
                            <input
                                type="text"
                                required
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                placeholder="Contoh: Membeli sapu kelas baru..."
                                className="w-full bg-dark-bg/50 border border-dark-border/60 focus:border-accent-indigo focus:ring-1 focus:ring-accent-indigo/50 rounded-xl px-4 py-3 text-sm text-gray-200 placeholder-gray-600 transition-all"
                            />
                            {errors.description && (
                                <p className="text-xs font-semibold text-red-400 mt-1">{errors.description}</p>
                            )}
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-dark-border/40">
                            <Link
                                href="/transactions"
                                className="px-5 py-2.5 rounded-xl bg-dark-surface hover:bg-dark-surface/80 border border-dark-border text-sm font-bold text-gray-400 hover:text-white transition-all"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-indigo to-indigo-600 hover:from-indigo-500 hover:to-indigo-700 text-white font-extrabold text-sm shadow-md shadow-accent-indigo/10 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100"
                            >
                                <Check className="w-4.5 h-4.5 stroke-[3px]" />
                                {processing ? 'Memproses...' : 'Perbarui Transaksi'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
