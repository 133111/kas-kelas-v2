import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
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
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
    };

    const cards = [
        {
            title: 'Saldo Kas Kelas',
            value: stats.balance,
            icon: Wallet,
            color: 'from-emerald-100/90 to-emerald-50/70 border-emerald-300 text-emerald-800',
            subtitle: 'Total dana kas saat ini',
            glow: 'rgba(16, 185, 129, 0.05)'
        },
        {
            title: 'Hutang / Tunggakan',
            value: stats.active_debts,
            icon: AlertCircle,
            color: 'from-rose-100/90 to-rose-50/70 border-rose-300 text-rose-800',
            subtitle: 'Dana belum tertagih',
            glow: 'rgba(239, 68, 68, 0.05)'
        },
        {
            title: 'Pemasukan Bulan Ini',
            value: stats.current_month_income,
            icon: TrendingUp,
            color: 'from-indigo-100/90 to-indigo-50/70 border-indigo-300 text-indigo-800',
            subtitle: 'Bulan ini',
            glow: 'rgba(99, 102, 241, 0.05)'
        },
        {
            title: 'Pengeluaran Bulan Ini',
            value: stats.current_month_expense,
            icon: TrendingDown,
            color: 'from-amber-100/90 to-amber-50/70 border-amber-300 text-amber-800',
            subtitle: 'Bulan ini',
            glow: 'rgba(245, 158, 11, 0.05)'
        }
    ];

    // Custom Tooltip component for chart
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-dark-surface/95 border border-dark-border px-4 py-3 rounded-xl shadow-xl backdrop-blur-md">
                    <p className="text-xs font-semibold text-gray-400 mb-1.5">{label}</p>
                    <p className="text-sm font-semibold text-emerald-400">Pemasukan: {formatIDR(payload[0].value)}</p>
                    <p className="text-sm font-semibold text-amber-400">Pengeluaran: {formatIDR(payload[1].value)}</p>
                </div>
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
                                whileHover={{ y: -4, shadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)' }}
                                className={`p-6 rounded-2xl border-2 bg-gradient-to-tr ${card.color} flex flex-col justify-between h-40 relative overflow-hidden group transition-all duration-300`}
                                style={{ boxShadow: `0 10px 15px -3px ${card.glow}` }}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">{card.title}</p>
                                        <h3 className="text-2xl font-extrabold text-slate-900 mt-2 tracking-tight">
                                            {formatIDR(card.value)}
                                        </h3>
                                    </div>
                                    <div className="p-3 rounded-xl bg-white border border-white/50 shadow-sm group-hover:scale-110 transition-transform text-slate-800">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                </div>
                                <div className="text-xs font-semibold opacity-80 mt-2">
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
                        className="lg:col-span-2 p-6 rounded-2xl bg-dark-card border border-dark-border/60 flex flex-col"
                    >
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-200">Tren Kas Kelas</h3>
                                <p className="text-xs font-medium text-gray-500">Pemasukan vs Pengeluaran 6 bulan terakhir</p>
                            </div>
                            <div className="flex items-center gap-4 text-xs font-semibold">
                                <span className="flex items-center gap-1.5 text-emerald-400">
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Pemasukan
                                </span>
                                <span className="flex items-center gap-1.5 text-amber-400">
                                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Pengeluaran
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
                                <Link 
                                    href="/billing/create" 
                                    className="flex items-center justify-between p-4 rounded-xl bg-dark-surface/40 hover:bg-dark-surface border border-dark-border/40 hover:border-accent-teal/30 text-gray-300 hover:text-white transition-all group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-teal-500/10 text-accent-teal group-hover:scale-105 transition-transform">
                                            <PlusCircle className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold">Buat Sesi Penagihan</p>
                                            <p className="text-[11px] text-gray-500">Mulai penagihan baru Rp 2.000</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-accent-teal transition-colors" />
                                </Link>

                                <Link 
                                    href="/transactions/create" 
                                    className="flex items-center justify-between p-4 rounded-xl bg-dark-surface/40 hover:bg-dark-surface border border-dark-border/40 hover:border-accent-indigo/30 text-gray-300 hover:text-white transition-all group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-indigo-500/10 text-accent-indigo group-hover:scale-105 transition-transform">
                                            <TrendingDown className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold">Catat Pengeluaran</p>
                                            <p className="text-[11px] text-gray-500">Tambah pengeluaran kas manual</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-accent-indigo transition-colors" />
                                </Link>

                                <Link 
                                    href="/debts" 
                                    className="flex items-center justify-between p-4 rounded-xl bg-dark-surface/40 hover:bg-dark-surface border border-dark-border/40 hover:border-rose-500/30 text-gray-300 hover:text-white transition-all group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 group-hover:scale-105 transition-transform">
                                            <AlertCircle className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold">Bayar Tunggakan</p>
                                            <p className="text-[11px] text-gray-500">Lunasi hutang/absen siswa</p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-rose-400 transition-colors" />
                                </Link>
                            </div>
                        </div>

                        <div className="mt-6 p-4 rounded-xl bg-dark-surface/20 border border-dark-border/40 flex items-center gap-3">
                            <Users className="w-5 h-5 text-accent-teal shrink-0" />
                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-gray-400">Total Siswa Terdaftar</p>
                                <p className="text-sm font-extrabold text-slate-800 mt-0.5">{stats.total_students} Siswa Aktif</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Sesi Penagihan Terbaru & Transaksi Terakhir */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Sesi Penagihan Terbaru */}
                    <motion.div 
                        variants={itemVariants} 
                        className="p-6 rounded-2xl bg-dark-card border border-dark-border/60 flex flex-col"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-200">Sesi Penagihan Terbaru</h3>
                                <p className="text-xs font-medium text-gray-500">Status penagihan mingguan/harian</p>
                            </div>
                            <Link href="/billing" className="text-xs font-bold text-accent-teal hover:underline flex items-center gap-1">
                                Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
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
                                        recentSessions.map((session) => (
                                            <tr key={session.id} className="group hover:bg-dark-surface/10 transition-colors">
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
                                                            <div 
                                                                className="bg-accent-teal h-full rounded-full" 
                                                                style={{ width: `${(session.paid_count / session.total_students) * 100}%` }}
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
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                    {/* Transaksi Terakhir */}
                    <motion.div 
                        variants={itemVariants} 
                        className="p-6 rounded-2xl bg-dark-card border border-dark-border/60 flex flex-col"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-200">Aktivitas Transaksi Terakhir</h3>
                                <p className="text-xs font-medium text-gray-500">Aliran kas masuk dan keluar</p>
                            </div>
                            <Link href="/transactions" className="text-xs font-bold text-accent-indigo hover:underline flex items-center gap-1">
                                Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {recentTransactions.length === 0 ? (
                                <p className="py-6 text-center text-gray-500 text-sm">Belum ada data transaksi.</p>
                            ) : (
                                recentTransactions.map((tx) => (
                                    <div key={tx.id} className="flex items-center justify-between p-3.5 rounded-xl bg-dark-surface/30 hover:bg-dark-surface/60 border border-dark-border/30 hover:border-dark-border/70 transition-all group">
                                        <div className="flex items-center gap-3.5 min-w-0">
                                            <div className={`p-2.5 rounded-xl shrink-0 ${
                                                tx.type === 'income' 
                                                    ? 'bg-emerald-500/10 text-emerald-400' 
                                                    : 'bg-rose-500/10 text-rose-400'
                                            }`}>
                                                {tx.type === 'income' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                            </div>
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
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </AppLayout>
    );
}
