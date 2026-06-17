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
    TrendingUp, 
    TrendingDown, 
    Activity, 
    Award, 
    AlertTriangle, 
    PieChartIcon, 
    Sparkles,
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

    // Color definitions for PieChart and charts
    const COLORS = ['#818cf8', '#2dd4bf', '#fb7185', '#fbbf24', '#a78bfa'];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
    };

    // Diligence chart tooltip
    const CustomDiligenceTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-dark-surface/95 border border-dark-border px-3.5 py-2.5 rounded-xl shadow-xl backdrop-blur-md text-xs font-sans">
                    <p className="font-bold text-gray-200">{data.name} (Absen {data.nomor_absen})</p>
                    <p className="text-accent-teal mt-1 font-semibold">Tingkat Kerajinan: {data.rate}%</p>
                    <p className="text-gray-400">Lunas: {data.paid_count} kali</p>
                    <p className="text-gray-400">Absen: {data.absent_count} kali</p>
                </div>
            );
        }
        return null;
    };

    // Monthly trend tooltip
    const CustomTrendTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-dark-surface/95 border border-dark-border px-3.5 py-2.5 rounded-xl shadow-xl backdrop-blur-md text-xs font-sans">
                    <p className="font-bold text-gray-400 mb-1">{label}</p>
                    <p className="text-emerald-400 font-semibold">Masuk: {formatIDR(payload[0].value)}</p>
                    <p className="text-rose-400 font-semibold">Keluar: {formatIDR(payload[1].value)}</p>
                    <p className="text-indigo-400 font-semibold border-t border-dark-border/40 mt-1 pt-1">Netto: {formatIDR(payload[2].value)}</p>
                </div>
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
                        className="lg:col-span-2 p-6 rounded-2xl bg-dark-card border border-dark-border/60 flex flex-col"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 rounded-xl bg-indigo-500/10 text-accent-indigo">
                                <Activity className="w-5 h-5" />
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
                                    <Tooltip content={<CustomTrendTooltip />} />
                                    <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '11px', fontWeight: 'bold' }} />
                                    <Line type="monotone" name="Pemasukan" dataKey="income" stroke="#10b981" strokeWidth={3} activeDot={{ r: 6 }} />
                                    <Line type="monotone" name="Pengeluaran" dataKey="expense" stroke="#ef4444" strokeWidth={3} activeDot={{ r: 6 }} />
                                    <Line type="monotone" name="Bersih (Net)" dataKey="net" stroke="#818cf8" strokeWidth={2} strokeDasharray="5 5" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Expense Pie Chart */}
                    <motion.div 
                        variants={itemVariants} 
                        className="p-6 rounded-2xl bg-dark-card border border-dark-border/60 flex flex-col justify-between"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400">
                                <PieChartIcon className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-gray-200">Proporsi Pengeluaran</h3>
                                <p className="text-xs text-gray-500">Pembagian kategori pengeluaran kelas</p>
                            </div>
                        </div>

                        {expenseCategories.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-2">
                                <AlertTriangle className="w-8 h-8 text-gray-600" />
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
                                            >
                                                {expenseCategories.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value) => formatIDR(value)} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                        <span className="text-xs text-gray-500 font-semibold">Total</span>
                                        <span className="text-sm font-black text-gray-200">
                                            {formatIDR(expenseCategories.reduce((acc, c) => acc + c.value, 0))}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-4 w-full space-y-1.5 text-xs font-semibold">
                                    {expenseCategories.map((entry, idx) => (
                                        <div key={idx} className="flex justify-between items-center text-gray-400">
                                            <span className="flex items-center gap-1.5">
                                                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                                                {entry.name}
                                            </span>
                                            <span className="text-gray-200">{formatIDR(entry.value)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Diligence index per student */}
                <motion.div 
                    variants={itemVariants}
                    className="p-6 rounded-2xl bg-dark-card border border-dark-border/60 flex flex-col"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2.5 rounded-xl bg-teal-500/10 text-accent-teal">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-gray-200">Indeks Kerajinan Pembayaran Siswa</h3>
                            <p className="text-xs text-gray-500">Persentase pelunasan kas per siswa untuk seluruh sesi ({totalSessions} sesi)</p>
                        </div>
                    </div>

                    {diligenceData.length === 0 ? (
                        <p className="text-sm text-gray-500 py-12 text-center">Belum ada data kedisiplinan siswa.</p>
                    ) : (
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={diligenceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#2e3348" opacity={0.3} />
                                    <XAxis dataKey="nomor_absen" stroke="#9ca3af" fontSize={11} tickLine={false} label={{ value: 'No. Absen Siswa', position: 'insideBottom', offset: -5, fill: '#9ca3af', fontSize: 10 }} />
                                    <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} domain={[0, 100]} tickFormatter={(val) => `${val}%`} />
                                    <Tooltip content={<CustomDiligenceTooltip />} />
                                    <Bar dataKey="rate" fill="#2dd4bf" radius={[4, 4, 0, 0]}>
                                        {diligenceData.map((entry, index) => (
                                            <Cell 
                                                key={`cell-${index}`} 
                                                fill={entry.rate >= 80 ? '#10b981' : entry.rate >= 50 ? '#fbbf24' : '#ef4444'} 
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
                        className="p-5 rounded-2xl bg-dark-card border border-dark-border/60 space-y-4 shadow-md"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                                <Award className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-200">Siswa Terajin (Top 5)</h3>
                                <p className="text-xs text-gray-500">Tingkat kelunasan paling tinggi di kelas</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {topPayers.map((student, idx) => (
                                <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-dark-surface/50 border border-dark-border/40">
                                    <span className="text-xs font-bold text-gray-300 flex items-center gap-2">
                                        <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] flex items-center justify-center font-extrabold">{idx + 1}</span>
                                        {student.name}
                                    </span>
                                    <span className="text-xs font-black text-emerald-400">{student.rate}% ({student.paid_count} Lunas)</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Bottom Payers */}
                    <motion.div 
                        variants={itemVariants} 
                        className="p-5 rounded-2xl bg-dark-card border border-dark-border/60 space-y-4 shadow-md"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400">
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-gray-200">Perlu Diingatkan (Bottom 5)</h3>
                                <p className="text-xs text-gray-500">Siswa dengan tunggakan paling banyak</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            {bottomPayers.map((student, idx) => (
                                <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-dark-surface/50 border border-dark-border/40">
                                    <span className="text-xs font-bold text-gray-300 flex items-center gap-2">
                                        <span className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] flex items-center justify-center font-extrabold">{idx + 1}</span>
                                        {student.name}
                                    </span>
                                    <span className="text-xs font-black text-rose-400">{student.rate}% ({student.absent_count} Absen)</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </AppLayout>
    );
}
