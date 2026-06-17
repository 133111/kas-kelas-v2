import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Plus, 
    Calendar, 
    User, 
    Trash2, 
    ChevronRight,
    Users,
    DollarSign,
    FileText,
    AlertCircle,
    X
} from 'lucide-react';

export default function Index({ sessions }) {
    const [deletingId, setDeletingId] = useState(null);
    const { delete: destroy } = useForm();

    const formatIDR = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(value);
    };

    const handleDelete = (id) => {
        setDeletingId(id);
    };

    const confirmDelete = () => {
        if (!deletingId) return;
        destroy(`/billing/${deletingId}`, {
            onSuccess: () => setDeletingId(null),
            onError: () => setDeletingId(null),
        });
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.08 }
        }
    };

    const cardVariants = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
    };

    return (
        <AppLayout header="Daftar Sesi Penagihan Kas">
            <Head title="Penagihan Kas" />

            <div className="space-y-6">
                {/* Header Action */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Kelola Sesi</p>
                        <h2 className="text-xl font-bold text-gray-200">Semua Riwayat Penagihan</h2>
                    </div>
                    <Link
                        href="/billing/create"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-teal to-teal-500 hover:from-teal-400 hover:to-teal-600 text-dark-bg font-extrabold text-sm shadow-md shadow-accent-teal/10 hover:shadow-accent-teal/20 transition-all active:scale-95 shrink-0"
                    >
                        <Plus className="w-4.5 h-4.5 stroke-[3px]" />
                        Buat Sesi Baru
                    </Link>
                </div>

                {/* Sesi List Grid */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {sessions.length === 0 ? (
                        <div className="col-span-full p-12 rounded-2xl bg-dark-card border border-dark-border/60 text-center flex flex-col items-center justify-center space-y-4">
                            <div className="p-4 rounded-full bg-dark-surface border border-dark-border text-gray-500">
                                <Calendar className="w-8 h-8" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-gray-300">Belum Ada Sesi Penagihan</h3>
                                <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">Klik tombol "Buat Sesi Baru" di atas untuk memulai penagihan pertama kepada 36 siswa aktif.</p>
                            </div>
                        </div>
                    ) : (
                        sessions.map((session) => {
                            const percent = session.total_students > 0 
                                ? Math.round((session.paid_count / session.total_students) * 100) 
                                : 0;

                            return (
                                <motion.div
                                    key={session.id}
                                    variants={cardVariants}
                                    whileHover={{ y: -4 }}
                                    className="rounded-2xl bg-dark-card border border-dark-border/60 p-5 flex flex-col justify-between h-[270px] relative overflow-hidden group shadow-lg transition-all duration-300"
                                >
                                    {/* Top Metadata */}
                                    <div>
                                        <div className="flex justify-between items-start gap-4">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4.5 h-4.5 text-accent-teal" />
                                                <span className="text-sm font-bold text-gray-200">{session.billing_date_formatted}</span>
                                            </div>
                                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                                                session.status === 'open' 
                                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                                    : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                                            }`}>
                                                {session.status === 'open' ? 'Aktif' : 'Selesai'}
                                            </span>
                                        </div>

                                        {/* Financial details */}
                                        <div className="mt-4 space-y-1">
                                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Terkumpul</p>
                                            <h3 className="text-xl font-black text-white">{formatIDR(session.total_collected)}</h3>
                                            <p className="text-[11px] text-gray-500">
                                                Nominal per siswa: <span className="font-semibold text-gray-400">{formatIDR(session.amount_per_student)}</span>
                                            </p>
                                        </div>

                                        {/* Notes description snippet */}
                                        {session.notes && (
                                            <div className="mt-3 flex items-start gap-1.5 p-2 rounded-lg bg-dark-surface/40 border border-dark-border/30">
                                                <FileText className="w-3.5 h-3.5 text-gray-500 shrink-0 mt-0.5" />
                                                <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">{session.notes}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Footer stats & actions */}
                                    <div className="mt-4 pt-4 border-t border-dark-border/40 space-y-3.5">
                                        {/* Progress bar */}
                                        <div className="space-y-1.5">
                                            <div className="flex justify-between items-center text-xs">
                                                <span className="text-gray-500 flex items-center gap-1">
                                                    <Users className="w-3.5 h-3.5" />
                                                    Partisipasi
                                                </span>
                                                <span className="font-bold text-gray-300">{session.paid_count} / {session.total_students} ({percent}%)</span>
                                            </div>
                                            <div className="w-full h-2 rounded-full bg-dark-surface overflow-hidden">
                                                <div 
                                                    className="bg-gradient-to-r from-accent-teal to-emerald-400 h-full rounded-full transition-all duration-500" 
                                                    style={{ width: `${percent}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Action buttons */}
                                        <div className="flex justify-between items-center gap-2 pt-1">
                                            <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold">
                                                <User className="w-3.5 h-3.5" />
                                                <span className="max-w-[80px] truncate">{session.created_by}</span>
                                            </div>
                                            
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleDelete(session.id)}
                                                    className="p-2 rounded-xl bg-red-500/10 text-red-400 border border-red-500/10 hover:border-red-500/30 hover:bg-red-500/20 active:scale-95 transition-all"
                                                    title="Hapus sesi"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                                <Link
                                                    href={`/billing/${session.id}`}
                                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-dark-surface hover:bg-dark-surface/80 border border-dark-border text-xs font-bold text-gray-300 hover:text-white transition-all"
                                                >
                                                    Detail
                                                    <ChevronRight className="w-3.5 h-3.5" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })
                    )}
                </motion.div>
            </div>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {deletingId && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setDeletingId(null)}
                            className="absolute inset-0 bg-black"
                        />
                        
                        {/* Modal Box */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-md bg-dark-card border border-dark-border/80 rounded-2xl p-6 shadow-2xl z-10"
                        >
                            <button
                                onClick={() => setDeletingId(null)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 shrink-0">
                                    <AlertCircle className="w-6 h-6" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-bold text-gray-200">Konfirmasi Hapus Sesi</h3>
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        Apakah Anda yakin ingin menghapus sesi penagihan ini? Aksi ini akan menghapus semua record pembayaran dan pembukuan uang kas terkait sesi ini secara permanen.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end gap-3 text-sm">
                                <button
                                    onClick={() => setDeletingId(null)}
                                    className="px-4 py-2 rounded-xl bg-dark-surface hover:bg-dark-surface/80 border border-dark-border text-gray-400 hover:text-white font-semibold transition-all"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-md shadow-red-500/10 transition-all active:scale-95"
                                >
                                    Ya, Hapus Sesi
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </AppLayout>
    );
}
