import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    Legend,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { 
    Activity, 
    Award, 
    AlertTriangle, 
    PieChartIcon, 
    BookOpen
} from 'lucide-react';

export default function Index({ 
    diligenceData, 
    monthlyTrend, 
    expenseCategories, 
    topPayers, 
    bottomPayers, 
    totalSessions 
}) {

    const formatIDR = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(value);
    };

    // Color definitions
    const COLORS = ['#10b981', '#f59e0b', '#f43f5e', '#8b5cf6', '#06b6d4'];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 14 } }
    };

    const listVariants = {
        hidden: { opacity: 0, x: -10 },
        show: (i) => ({
            opacity: 1, 
            x: 0,
            transition: { delay: i * 0.1, type: 'spring', stiffness: 120 }
        })
    };

    // Tooltips
    const CustomDiligenceTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-dark-surface/95 border border-dark-border px-3.5 py-2.5 rounded-xl shadow-xl backdrop-blur-md text-xs font-sans"
                >
                    <p className="font-bold text-gray-200">{data.name} (Absen {data.nomor_absen})</p>
                    <p className="text-accent-teal mt-1 font-semibold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-accent-teal"></span> Tingkat Kerajinan: {data.rate}%
                    </p>
                    <div className="flex gap-4 mt-1.5 pt-1.5 border-t border-dark-border/50">
                        <p className="text-gray-400">Lunas: <span className="font-bold text-emerald-400">{data.paid_count}</span></p>
                        <p className="text-gray-400">Absen: <span className="font-bold text-rose-400">{data.absent_count}</span></p>
                    </div>
                </motion.div>
            );
        }
        return null;
    };

    const CustomTrendTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-dark-surface/95 border border-dark-border px-3.5 py-2.5 rounded-xl shadow-xl backdrop-blur-md text-xs font-sans"
                >
                    <p className="font-bold text-gray-400 mb-1.5">{label}</p>
                    <p className="text-emerald-400 font-semibold flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Pemasukan: {formatIDR(payload[0].value)}
                    </p>
                    <p className="text-amber-400 font-semibold flex items-center gap-1.5 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-amber-400"></span> Pengeluaran: {formatIDR(payload[1].value)}
                    </p>
                    <p className="text-indigo-400 font-semibold border-t border-dark-border/40 mt-1.5 pt-1.5">
                        Netto: {formatIDR(payload[2].value)}
                    </p>
                </motion.div>
            );
        }
        return null;
    };

    return (
        <AppLayout header="Laporan Keuangan & Kedisiplinan">
            <Head title="Laporan Keuangan & Kedisiplinan" />

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="space-y-8"
            >
                {/* Visual Overview: Monthly trend + Expense breakdown */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Monthly Trend Chart */}
                    <motion.div 
                        variants={itemVariants} 
                        className="lg:col-span-2 p-6 rounded-2xl bg-dark-card border border-dark-border/60 flex flex-col hover-shimmer"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-accent-indigo">
                                <Activity className="w-5 h-5 animate-pulse" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-gray-200">Tren Kas Bulanan</h3>
                                <p className="text-xs text-gray-500">Aliran kas masuk, keluar, dan selisih bersih</p>
                            </div>
                        </div>

                        <div className="h-72 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={monthlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#2e3348" opacity={0.3} />
                                    <XAxis dataKey="month" stroke="#9ca3af" fontSize={11} tickLine={false} />
                                    <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} tickFormatter={(val) => `Rp ${val/1000}k`} />
                                    <Tooltip content={<CustomTrendTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }} />
                                    <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
                                    <Line type="monotone" name="Pemasukan" dataKey="income" stroke="#10b981" strokeWidth={3} activeDot={{ r: 6, strokeWidth: 0, fill: '#10b981' }} dot={{ r: 3, fill: '#10b981' }} animationDuration={2000} />
                                    <Line type="monotone" name="Pengeluaran" dataKey="expense" stroke="#f59e0b" strokeWidth={3} activeDot={{ r: 6, strokeWidth: 0, fill: '#f59e0b' }} dot={{ r: 3, fill: '#f59e0b' }} animationDuration={2000} />
                                    <Line type="monotone" name="Bersih (Net)" dataKey="net" stroke="#818cf8" strokeWidth={2} strokeDasharray="5 5" animationDuration={2000} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Expense Pie Chart */}
                    <motion.div 
                        variants={itemVariants} 
                        className="p-6 rounded-2xl bg-dark-card border border-dark-border/60 flex flex-col justify-between hover-shimmer"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 group-hover:scale-110 transition-transform">
                                <PieChartIcon className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-gray-200">Proporsi Pengeluaran</h3>
                                <p className="text-xs text-gray-500">Pembagian kategori belanja</p>
                            </div>
                        </div>

                        {expenseCategories.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-2">
                                <AlertTriangle className="w-8 h-8 text-gray-600 animate-bounce-subtle" />
                                <p className="text-xs text-gray-500 font-semibold">Belum ada data pengeluaran kelas.</p>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center">
                                <div className="h-48 w-full relative">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={expenseCategories}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={4}
                                                dataKey="value"
                                                animationBegin={200}
                                                animationDuration={1500}
                                            >
                                                {expenseCategories.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip 
                                                formatter={(value) => formatIDR(value)} 
                                                contentStyle={{ backgroundColor: 'rgba(30, 41, 59, 0.95)', borderColor: '#475569', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}
                                                itemStyle={{ color: '#fff' }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Total</span>
                                        <span className="text-sm font-black text-gray-200">
                                            {formatIDR(expenseCategories.reduce((acc, c) => acc + c.value, 0))}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-4 w-full space-y-2 text-xs font-semibold">
                                    {expenseCategories.map((entry, idx) => (
                                        <motion.div 
                                            key={idx} 
                                            custom={idx}
                                            variants={listVariants}
                                            className="flex justify-between items-center text-gray-400 hover:bg-dark-surface/50 p-1.5 rounded-lg transition-colors cursor-default"
                                        >
                                            <span className="flex items-center gap-2">
                                                <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                                                <span className="capitalize">{entry.name.replace('_', ' ')}</span>
                                            </span>
                                            <span className="text-gray-200">{formatIDR(entry.value)}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Diligence index per student */}
                <motion.div 
                    variants={itemVariants}
                    className="p-6 rounded-2xl bg-dark-card border border-dark-border/60 flex flex-col hover-shimmer"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 rounded-xl bg-teal-500/10 text-accent-teal">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-gray-200">Indeks Kerajinan Pembayaran Siswa</h3>
                            <p className="text-xs text-gray-500">Persentase pelunasan kas per siswa ({totalSessions} sesi)</p>
                        </div>
                    </div>

                    {diligenceData.length === 0 ? (
                        <p className="text-sm text-gray-500 py-12 text-center flex flex-col items-center gap-3">
                            <Activity className="w-8 h-8 opacity-20" />
                            Belum ada data kedisiplinan siswa.
                        </p>
                    ) : (
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={diligenceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#2e3348" opacity={0.3} vertical={false} />
                                    <XAxis dataKey="nomor_absen" stroke="#9ca3af" fontSize={11} tickLine={false} label={{ value: 'No. Absen Siswa', position: 'insideBottom', offset: -5, fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
                                    <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} domain={[0, 100]} tickFormatter={(val) => `${val}%`} />
                                    <Tooltip content={<CustomDiligenceTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                                    <Bar dataKey="rate" radius={[4, 4, 0, 0]} animationDuration={1500} animationEasing="ease-out">
                                        {diligenceData.map((entry, index) => (
                                            <Cell 
                                                key={`cell-${index}`} 
                                                fill={entry.rate >= 80 ? '#10b981' : entry.rate >= 50 ? '#f59e0b' : '#f43f5e'} 
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </motion.div>

                {/* Top Payers vs Bottom Payers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Top Payers */}
                    <motion.div 
                        variants={itemVariants} 
                        className="p-5 rounded-2xl bg-dark-card border border-dark-border/60 space-y-4 shadow-md group hover-shimmer hover-glow-teal"
                        style={{ '--tw-hover-border-color': 'rgba(16, 185, 129, 0.3)', '--tw-hover-shadow-color': 'rgba(16, 185, 129, 0.15)' }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                                <Award className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-200">Siswa Terajin (Top 5)</h3>
                                <p className="text-xs text-gray-500">Tingkat kelunasan paling tinggi</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {topPayers.map((student, idx) => (
                                <motion.div 
                                    key={idx}
                                    custom={idx}
                                    variants={listVariants}
                                    whileHover={{ x: 4, scale: 1.01 }}
                                    className="flex justify-between items-center p-3 rounded-xl bg-dark-surface/50 border border-dark-border/40 hover:bg-dark-surface hover:border-emerald-500/30 transition-all cursor-default"
                                >
                                    <span className="text-xs font-bold text-gray-300 flex items-center gap-2.5">
                                        <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] flex items-center justify-center font-black shadow-sm">
                                            {idx + 1}
                                        </span>
                                        {student.name}
                                    </span>
                                    <div className="text-right">
                                        <span className="text-sm font-black text-emerald-400 block">{student.rate}%</span>
                                        <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">{student.paid_count} Lunas</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Bottom Payers */}
                    <motion.div 
                        variants={itemVariants} 
                        className="p-5 rounded-2xl bg-dark-card border border-dark-border/60 space-y-4 shadow-md group hover-shimmer hover-glow-teal"
                        style={{ '--tw-hover-border-color': 'rgba(244, 63, 94, 0.3)', '--tw-hover-shadow-color': 'rgba(244, 63, 94, 0.15)' }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 group-hover:scale-110 transition-transform">
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-200">Perlu Diingatkan (Bottom 5)</h3>
                                <p className="text-xs text-gray-500">Siswa dengan tunggakan paling banyak</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {bottomPayers.map((student, idx) => (
                                <motion.div 
                                    key={idx}
                                    custom={idx}
                                    variants={listVariants}
                                    whileHover={{ x: -4, scale: 1.01 }}
                                    className="flex justify-between items-center p-3 rounded-xl bg-dark-surface/50 border border-dark-border/40 hover:bg-dark-surface hover:border-rose-500/30 transition-all cursor-default"
                                >
                                    <span className="text-xs font-bold text-gray-300 flex items-center gap-2.5">
                                        <span className="w-6 h-6 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] flex items-center justify-center font-black shadow-sm">
                                            {idx + 1}
                                        </span>
                                        {student.name}
                                    </span>
                                    <div className="text-right">
                                        <span className="text-sm font-black text-rose-400 block">{student.rate}%</span>
                                        <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">{student.absent_count} Absen</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </AppLayout>
    );
}
