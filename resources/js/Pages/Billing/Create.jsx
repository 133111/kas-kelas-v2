import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Check, DollarSign, Calendar, FileText } from 'lucide-react';

export default function Create({ defaultAmount }) {
    const { data, setData, post, processing, errors } = useForm({
        billing_date: new Date().toISOString().split('T')[0],
        amount_per_student: defaultAmount || 2000,
        notes: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/billing');
    };

    return (
        <AppLayout header="Buat Sesi Penagihan Baru">
            <Head title="Buat Sesi Penagihan" />

            <div className="max-w-2xl mx-auto space-y-6">
                {/* Back button */}
                <Link
                    href="/billing"
                    className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke Daftar Sesi
                </Link>

                {/* Form Card */}
                <div className="bg-dark-card border border-dark-border/60 rounded-2xl p-6 sm:p-8 shadow-xl">
                    <div className="border-b border-dark-border/40 pb-5 mb-6">
                        <h2 className="text-xl font-bold text-gray-200">Buka Penagihan Kas</h2>
                        <p className="text-xs text-gray-500 mt-1">
                            Membuat sesi penagihan baru otomatis menghasilkan 36 record tagihan siswa masing-masing senilai Rp 2.000 (atau nominal kustom).
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Billing Date */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 text-accent-teal" />
                                Tanggal Penagihan
                            </label>
                            <input
                                type="date"
                                value={data.billing_date}
                                onChange={e => setData('billing_date', e.target.value)}
                                className="w-full bg-dark-bg/50 border border-dark-border/60 focus:border-accent-teal focus:ring-1 focus:ring-accent-teal/50 rounded-xl px-4 py-3 text-sm text-gray-200 placeholder-gray-600 transition-all"
                            />
                            {errors.billing_date && (
                                <p className="text-xs font-semibold text-red-400 mt-1">{errors.billing_date}</p>
                            )}
                        </div>

                        {/* Amount per Student */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
                                <DollarSign className="w-4 h-4 text-accent-teal" />
                                Nominal Tagihan Per Siswa
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500">Rp</span>
                                <input
                                    type="number"
                                    min="1000"
                                    step="500"
                                    value={data.amount_per_student}
                                    onChange={e => setData('amount_per_student', e.target.value)}
                                    placeholder="2000"
                                    className="w-full bg-dark-bg/50 border border-dark-border/60 focus:border-accent-teal focus:ring-1 focus:ring-accent-teal/50 rounded-xl pl-11 pr-4 py-3 text-sm text-gray-200 placeholder-gray-600 transition-all font-semibold"
                                />
                            </div>
                            <p className="text-[11px] text-gray-500 font-medium">Standard nominal penagihan default adalah Rp 2.000.</p>
                            {errors.amount_per_student && (
                                <p className="text-xs font-semibold text-red-400 mt-1">{errors.amount_per_student}</p>
                            )}
                        </div>

                        {/* Notes */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1.5">
                                <FileText className="w-4 h-4 text-accent-teal" />
                                Catatan Sesi
                            </label>
                            <textarea
                                rows="3"
                                value={data.notes}
                                onChange={e => setData('notes', e.target.value)}
                                placeholder="Contoh: Pembayaran kas minggu kedua bulan Juni..."
                                className="w-full bg-dark-bg/50 border border-dark-border/60 focus:border-accent-teal focus:ring-1 focus:ring-accent-teal/50 rounded-xl px-4 py-3 text-sm text-gray-200 placeholder-gray-600 transition-all leading-relaxed"
                            />
                            {errors.notes && (
                                <p className="text-xs font-semibold text-red-400 mt-1">{errors.notes}</p>
                            )}
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end gap-3 pt-4 border-t border-dark-border/40">
                            <Link
                                href="/billing"
                                className="px-5 py-2.5 rounded-xl bg-dark-surface hover:bg-dark-surface/80 border border-dark-border text-sm font-bold text-gray-400 hover:text-white transition-all"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-teal to-teal-500 hover:from-teal-400 hover:to-teal-600 text-dark-bg font-extrabold text-sm shadow-md shadow-accent-teal/10 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100"
                            >
                                <Check className="w-4.5 h-4.5 stroke-[3px]" />
                                {processing ? 'Memproses...' : 'Buka Penagihan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
