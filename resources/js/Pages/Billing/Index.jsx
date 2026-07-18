import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    PlusCircle, 
    Calendar, 
    Users, 
    Coins, 
    ChevronRight, 
    Trash2, 
    AlertTriangle,
    X,
    CheckCircle2
} from 'lucide-react';

export default function Index({ sessions }) {
    const { delete: destroy, processing } = useForm();
    const [confirmingSessionDeletion, setConfirmingSessionDeletion] = useState(false);
    const [sessionToDelete, setSessionToDelete] = useState(null);

    const formatIDR = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(value);
    };

    const confirmSessionDeletion = (session) => {
        setSessionToDelete(session);
        setConfirmingSessionDeletion(true);
    };

    const closeModal = () => {
        setConfirmingSessionDeletion(false);
        setTimeout(() => setSessionToDelete(null), 300);
    };

    const deleteSession = (e) => {
        e.preventDefault();
        if (!sessionToDelete) return;

        destroy(`/billing/${sessionToDelete.id}`, {
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
        <AppLayout header="Manajemen Sesi Penagihan Kas">
            <Head title="Sesi Penagihan Kas" />

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-6"
            >
                {/* Header Actions */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-dark-card border border-dark-border/60 p-4 rounded-xl">
                    <div>
                        <h3 className="text-sm font-bold text-gray-200">Daftar Sesi Penagihan</h3>
                        <p className="text-xs text-gray-500">Kelola penagihan kas mingguan atau harian</p>
                    </div>
                    <Link
                        href="/billing/create"
                        className="btn-ripple inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-teal to-teal-500 hover:from-teal-400 hover:to-teal-600 text-dark-bg font-extrabold text-xs shadow-md shadow-accent-teal/15 hover:shadow-accent-teal/30 hover:shadow-lg transition-all active:scale-95 group"
                    >
                        <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                        Buat Sesi Penagihan Baru
                    </Link>
                </motion.div>

                {/* Sessions Grid */}
                {sessions.length === 0 ? (
                    <motion.div 
                        variants={itemVariants}
                        className="bg-dark-card border border-dark-border/60 rounded-2xl py-24 flex flex-col items-center justify-center text-center shadow-xl hover-shimmer"
                    >
                        <motion.div 
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-16 h-16 rounded-full bg-dark-surface/50 border border-dark-border flex items-center justify-center mb-4"
                        >
                            <Calendar className="w-8 h-8 text-gray-500" />
                        </motion.div>
                        <h3 className="text-base font-bold text-gray-300">Belum ada sesi penagihan</h3>
                        <p className="text-sm text-gray-500 mt-2 font-medium max-w-sm">Mulai kumpulkan uang kas kelas dengan membuat sesi penagihan pertama Anda.</p>
                        <Link
                            href="/billing/create"
                            className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-surface border border-dark-border text-xs font-bold text-accent-teal hover:bg-teal-500/10 hover:border-teal-500/30 transition-all group"
                        >
                            Buat Sesi Sekarang
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                ) : (
                    <motion.div 
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {sessions.map((session, index) => {
                            const isCompleted = session.status === 'completed';
                            const progressPercentage = (session.paid_count / session.total_students) * 100;
                            
                            return (
                                <motion.div 
                                    key={session.id}
                                    variants={itemVariants}
                                    whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300 } }}
                                    className="bg-dark-card border border-dark-border/60 rounded-2xl p-5 shadow-lg flex flex-col justify-between group hover-shimmer card-hover-lift relative overflow-hidden"
                                >
                                    {/* Shimmer background overlay */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-gray-500" />
                                                    <h4 className="font-bold text-gray-200 text-sm group-hover:text-white transition-colors">{session.billing_date}</h4>
                                                </div>
                                                <div className="flex items-center gap-1.5 mt-1">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                                                        isCompleted ? 'bg-gray-500/10 text-gray-400 border border-gray-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                                    }`}>
                                                        {isCompleted ? 'Selesai' : 'Aktif'}
                                                    </span>
                                                </div>
                                            </div>
                                            
                                            <button
                                                onClick={() => confirmSessionDeletion(session)}
                                                className="p-2 text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors group/btn z-20"
                                                title="Hapus Sesi"
                                            >
                                                <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                                            </button>
                                        </div>

                                        <div className="space-y-4 mb-6">
                                            {/* Progress Bar */}
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-xs font-semibold">
                                                    <span className="text-gray-400">Progress Pembayaran</span>
                                                    <span className={isCompleted ? 'text-gray-400' : 'text-emerald-400'}>
                                                        {session.paid_count} / {session.total_students} Siswa
                                                    </span>
                                                </div>
                                                <div className="w-full bg-dark-surface border border-dark-border/40 h-2 rounded-full overflow-hidden relative">
                                                    <motion.div 
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${progressPercentage}%` }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 1, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                                                        className={`h-full rounded-full relative overflow-hidden ${isCompleted ? 'bg-gray-500' : 'bg-gradient-to-r from-emerald-500 to-teal-400'}`}
                                                    >
                                                        {/* Shimmer on progress bar */}
                                                        {!isCompleted && (
                                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-full animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                                                        )}
                                                    </motion.div>
                                                </div>
                                            </div>

                                            {/* Stats */}
                                            <div className="grid grid-cols-2 gap-3 pt-2">
                                                <div className="p-3 rounded-xl bg-dark-surface/50 border border-dark-border/40 group-hover:bg-dark-surface/80 transition-colors">
                                                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                                                        <Coins className="w-3 h-3 text-emerald-400" />
                                                        Terkumpul
                                                    </span>
                                                    <p className="text-sm font-black text-emerald-400">{formatIDR(session.total_collected)}</p>
                                                </div>
                                                <div className="p-3 rounded-xl bg-dark-surface/50 border border-dark-border/40 group-hover:bg-dark-surface/80 transition-colors">
                                                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                                                        <Users className="w-3 h-3 text-rose-400" />
                                                        Absen / Alpha
                                                    </span>
                                                    <p className="text-sm font-black text-rose-400">{session.total_students - session.paid_count} Siswa</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/billing/${session.id}`}
                                        className="relative z-10 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-dark-surface hover:bg-dark-surface/80 border border-dark-border hover:border-dark-border/80 text-xs font-bold text-gray-300 hover:text-white transition-all group/link"
                                    >
                                        Kelola Penagihan
                                        <ChevronRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </motion.div>

            {/* Modal Konfirmasi Hapus Sesi — Animated */}
            <AnimatePresence>
                {confirmingSessionDeletion && (
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
                                            Hapus Sesi Penagihan
                                        </h3>
                                        <p className="text-sm text-gray-400 mt-1">
                                            Tanggal: {sessionToDelete?.billing_date}
                                        </p>
                                    </div>
                                </div>
                                <button onClick={closeModal} className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-dark-surface/50 transition-colors">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="mt-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium leading-relaxed">
                                Apakah Anda yakin ingin menghapus sesi penagihan ini? Semua data pembayaran pada sesi ini akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
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
                                    onClick={deleteSession}
                                    disabled={processing}
                                    className="btn-ripple inline-flex justify-center items-center px-5 py-2.5 bg-rose-500 hover:bg-rose-600 border border-transparent text-white font-bold text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-all disabled:opacity-50 disabled:scale-100 active:scale-95"
                                >
                                    {processing ? 'Menghapus...' : 'Ya, Hapus Sesi'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </AppLayout>
    );
}
