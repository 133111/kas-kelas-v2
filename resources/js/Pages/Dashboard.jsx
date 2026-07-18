import React, { useEffect, useState, useRef } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { motion, useInView } from 'framer-motion';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    Legend
} from 'recharts';
import { 
    Wallet, 
    TrendingUp, 
    TrendingDown, 
    AlertCircle, 
    PlusCircle,
    ArrowUpRight,
    ArrowDownRight,
    Users,
    ChevronRight,
    Calendar,
    Activity
} from 'lucide-react';

// Animated counter component
function AnimatedCounter({ value, formatFn, duration = 1200 }) {
    const [display, setDisplay] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const step = value / (duration / 16);
        const timer = setInterval(() => {
            start += step;
            if (start >= value) {
                setDisplay(value);
                clearInterval(timer);
            } else {
                setDisplay(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [isInView, value, duration]);

    return <span ref={ref}>{formatFn ? formatFn(display) : display}</span>;
}

export default function Dashboard({ stats, monthlyData, recentSessions, recentTransactions }) {
    
    const formatIDR = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(value);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 24, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 14 } }
    };

    const cards = [
        {
            title: 'Saldo Kas Kelas',
            value: stats.balance,
            icon: Wallet,
            color: 'from-emerald-100/90 to-emerald-50/70 border-emerald-300 text-emerald-800',
            subtitle: 'Total dana kas saat ini',
            glow: 'rgba(16, 185, 129, 0.05)',
            pulseClass: 'animate-pulse-glow'
        },
        {
            title: 'Hutang / Tunggakan',
            value: stats.active_debts,
            icon: AlertCircle,
            color: 'from-rose-100/90 to-rose-50/70 border-rose-300 text-rose-800',
            subtitle: 'Dana belum tertagih',
            glow: 'rgba(239, 68, 68, 0.05)',
            pulseClass: 'animate-pulse-glow-rose'
        },
        {
            title: 'Pemasukan Bulan Ini',
            value: stats.current_month_income,
            icon: TrendingUp,
            color: 'from-indigo-100/90 to-indigo-50/70 border-indigo-300 text-indigo-800',
            subtitle: 'Bulan ini',
            glow: 'rgba(99, 102, 241, 0.05)',
            pulseClass: 'animate-pulse-glow-indigo'
        },
        {
            title: 'Pengeluaran Bulan Ini',
            value: stats.current_month_expense,
            icon: TrendingDown,
            color: 'from-amber-100/90 to-amber-50/70 border-amber-300 text-amber-800',
            subtitle: 'Bulan ini',
            glow: 'rgba(245, 158, 11, 0.05)',
            pulseClass: 'animate-pulse-glow-amber'
        }
    ];

    // Custom Tooltip component for chart
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-dark-surface/95 border border-dark-border px-4 py-3 rounded-xl shadow-xl backdrop-blur-md"
                >
                    <p className="text-xs font-semibold text-gray-400 mb-1.5">{label}</p>
                    <p className="text-sm font-semibold text-emerald-400">Pemasukan: {formatIDR(payload[0].value)}</p>
                    <p className="text-sm font-semibold text-amber-400">Pengeluaran: {formatIDR(payload[1].value)}</p>
                </motion.div>
            );
        }
        return null;
    };

    return (
        <AppLayout header="Ringkasan Dashboard">
            <Head title="Dashboard" />

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-8"
            >
                {/* Stat Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards.map((card, i) => {
                        const Icon = card.icon;
                        return (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                whileHover={{ 
                                    y: -6, 
                                    transition: { type: 'spring', stiffness: 300, damping: 20 }
                                }}
                                className={`p-6 rounded-2xl border-2 bg-gradient-to-tr ${card.color} flex flex-col justify-between h-40 relative overflow-hidden group transition-all duration-300 hover-shimmer ${card.pulseClass}`}
                                style={{ boxShadow: `0 10px 15px -3px ${card.glow}` }}
                            >
                                {/* Decorative shimmer overlay */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                                </div>

                                <div className="flex justify-between items-start relative z-10">
                                    <div>
                                        <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">{card.title}</p>
                                        <h3 className="text-2xl font-extrabold text-slate-900 mt-2 tracking-tight">
                                            <AnimatedCounter value={card.value} formatFn={formatIDR} />
                                        </h3>
                                    </div>
                                    <motion.div 
                                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
                                        transition={{ duration: 0.4 }}
                                        className="p-3 rounded-xl bg-white border border-white/50 shadow-sm text-slate-800"
                                    >
                                        <Icon className="w-5 h-5" />
                                    </motion.div>
                                </div>
                                <div className="text-xs font-semibold opacity-80 mt-2 relative z-10">
                                    {card.subtitle}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Quick Actions & Chart Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recharts Chart */}
                    <motion.div 
                        variants={itemVariants} 
                        className="lg:col-span-2 p-6 rounded-2xl bg-dark-card border border-dark-border/60 flex flex-col hover-shimmer"
                    >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-200">Tren Kas Kelas</h3>
                                <p className="text-xs font-medium text-gray-500">Pemasukan vs Pengeluaran 6 bulan terakhir</p>
                            </div>
                            <div className="flex items-center gap-4 text-xs font-semibold">
                                <span className="flex items-center gap-1.5 text-emerald-400">
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span> Pemasukan
                                </span>
                                <span className="flex items-center gap-1.5 text-amber-400">
                                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span> Pengeluaran
                                </span>
                            </div>
                        </div>

                        <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2}/>
                                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#2e3348" opacity={0.3} />
                                    <XAxis dataKey="month" stroke="#9ca3af" fontSize={11} tickLine={false} />
                                    <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} tickFormatter={(val) => `Rp ${val/1000}k`} />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorIncome)" />
                                    <Area type="monotone" dataKey="expense" stroke="#f59e0b" strokeWidth={2.5} fillOpacity={1} fill="url(#colorExpense)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Quick Action Panel */}
                    <motion.div 
                        variants={itemVariants} 
                        className="p-6 rounded-2xl bg-dark-card border border-dark-border/60 flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-lg font-bold text-gray-200 mb-2">Aksi Cepat</h3>
                            <p className="text-xs font-medium text-gray-500 mb-6">Navigasi langsung untuk mengelola operasional kas</p>
                            
                            <div className="space-y-3">
                                {[
                                    { href: '/billing/create', icon: PlusCircle, title: 'Buat Sesi Penagihan', sub: 'Mulai penagihan baru Rp 2.000', iconBg: 'bg-teal-500/10 text-accent-teal', hoverBorder: 'hover:border-accent-teal/30' },
                                    { href: '/transactions/create', icon: TrendingDown, title: 'Catat Pengeluaran', sub: 'Tambah pengeluaran kas manual', iconBg: 'bg-indigo-500/10 text-accent-indigo', hoverBorder: 'hover:border-accent-indigo/30' },
                                    { href: '/debts', icon: AlertCircle, title: 'Bayar Tunggakan', sub: 'Lunasi hutang/absen siswa', iconBg: 'bg-rose-500/10 text-rose-400', hoverBorder: 'hover:border-rose-500/30' },
                                ].map((action, idx) => {
                                    const ActionIcon = action.icon;
                                    return (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ x: 4 }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                        >
                                            <Link 
                                                href={action.href} 
                                                className={`flex items-center justify-between p-4 rounded-xl bg-dark-surface/40 hover:bg-dark-surface border border-dark-border/40 ${action.hoverBorder} text-gray-300 hover:text-white transition-all group`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-lg ${action.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                                                        <ActionIcon className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold">{action.title}</p>
                                                        <p className="text-[11px] text-gray-500">{action.sub}</p>
                                                    </div>
                                                </div>
                                                <ChevronRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className="mt-6 p-4 rounded-xl bg-dark-surface/20 border border-dark-border/40 flex items-center gap-3"
                        >
                            <Users className="w-5 h-5 text-accent-teal shrink-0 animate-bounce-subtle" />
                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-gray-400">Total Siswa Terdaftar</p>
                                <p className="text-sm font-extrabold text-slate-800 mt-0.5">
                                    <AnimatedCounter value={stats.total_students} /> Siswa Aktif
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Sesi Penagihan Terbaru & Transaksi Terakhir */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Sesi Penagihan Terbaru */}
                    <motion.div 
                        variants={itemVariants} 
                        className="p-6 rounded-2xl bg-dark-card border border-dark-border/60 flex flex-col hover-shimmer"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-200">Sesi Penagihan Terbaru</h3>
                                <p className="text-xs font-medium text-gray-500">Status penagihan mingguan/harian</p>
                            </div>
                            <Link href="/billing" className="text-xs font-bold text-accent-teal hover:underline flex items-center gap-1 group">
                                Lihat Semua <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-dark-border/60 text-xs font-bold text-gray-400 uppercase">
                                        <th className="pb-3 font-semibold">Tanggal</th>
                                        <th className="pb-3 font-semibold">Progress</th>
                                        <th className="pb-3 font-semibold">Terkumpul</th>
                                        <th className="pb-3 font-semibold text-center">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-dark-border/30 text-sm font-medium text-gray-300">
                                    {recentSessions.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="py-6 text-center text-gray-500">Belum ada sesi penagihan.</td>
                                        </tr>
                                    ) : (
                                        recentSessions.map((session, idx) => (
                                            <motion.tr 
                                                key={session.id} 
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.08, type: 'spring', stiffness: 100 }}
                                                className="group hover:bg-dark-surface/10 transition-colors"
                                            >
                                                <td className="py-3.5 font-semibold text-gray-200">
                                                    <Link href={`/billing/${session.id}`} className="hover:text-accent-teal flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-gray-500" />
                                                        {session.billing_date}
                                                    </Link>
                                                </td>
                                                <td className="py-3.5">
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-bold">{session.paid_count}/{session.total_students}</span>
                                                        <div className="w-20 bg-dark-surface h-1.5 rounded-full overflow-hidden">
                                                            <motion.div 
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${(session.paid_count / session.total_students) * 100}%` }}
                                                                transition={{ duration: 1, delay: idx * 0.1, ease: 'easeOut' }}
                                                                className="bg-accent-teal h-full rounded-full"
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-3.5 font-semibold text-emerald-400">
                                                    {formatIDR(session.total_collected)}
                                                </td>
                                                <td className="py-3.5 text-center">
                                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                        session.status === 'open' 
                                                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                                            : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                                                    }`}>
                                                        {session.status === 'open' ? 'Aktif' : 'Selesai'}
                                                    </span>
                                                </td>
                                            </motion.tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    {/* Transaksi Terakhir */}
                    <motion.div 
                        variants={itemVariants} 
                        className="p-6 rounded-2xl bg-dark-card border border-dark-border/60 flex flex-col hover-shimmer"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-200">Aktivitas Transaksi Terakhir</h3>
                                <p className="text-xs font-medium text-gray-500">Aliran kas masuk dan keluar</p>
                            </div>
                            <Link href="/transactions" className="text-xs font-bold text-accent-indigo hover:underline flex items-center gap-1 group">
                                Lihat Semua <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {recentTransactions.length === 0 ? (
                                <p className="py-6 text-center text-gray-500 text-sm">Belum ada data transaksi.</p>
                            ) : (
                                recentTransactions.map((tx, idx) => (
                                    <motion.div 
                                        key={tx.id} 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.08, type: 'spring', stiffness: 100 }}
                                        whileHover={{ x: 4 }}
                                        className="flex items-center justify-between p-3.5 rounded-xl bg-dark-surface/30 hover:bg-dark-surface/60 border border-dark-border/30 hover:border-dark-border/70 transition-all group"
                                    >
                                        <div className="flex items-center gap-3.5 min-w-0">
                                            <motion.div 
                                                whileHover={{ rotate: 15 }}
                                                className={`p-2.5 rounded-xl shrink-0 ${
                                                tx.type === 'income' 
                                                    ? 'bg-emerald-500/10 text-emerald-400' 
                                                    : 'bg-rose-500/10 text-rose-400'
                                            }`}>
                                                {tx.type === 'income' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                            </motion.div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold text-gray-200 truncate group-hover:text-slate-900 transition-colors">{tx.description}</p>
                                                <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-0.5">
                                                    <span className="capitalize font-semibold">{tx.category.replace('_', ' ')}</span>
                                                    <span>•</span>
                                                    <span>{tx.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`text-sm font-extrabold shrink-0 ${
                                            tx.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                                        }`}>
                                            {tx.type === 'income' ? '+' : '-'}{formatIDR(tx.amount)}
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </AppLayout>
    );
}
