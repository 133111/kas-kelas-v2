import React from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, User, Hash, Save } from 'lucide-react';

export default function Edit({ student }) {
    const { data, setData, put, processing, errors } = useForm({
        name: student.name || '',
        nis: student.nis || '',
        nomor_absen: student.nomor_absen || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/students/${student.id}`);
    };

    return (
        <AppLayout header={`Edit Siswa - ${student.name}`}>
            <Head title={`Edit Siswa - ${student.name}`} />

            <div className="max-w-2xl mx-auto space-y-6">
                {/* Back Link */}
                <Link
                    href="/students"
                    className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Kembali ke Daftar Siswa
                </Link>

                {/* Form Card */}
                <div className="bg-white border border-slate-100 shadow-xl shadow-slate-200/50 rounded-2xl p-6 sm:p-8">
                    <div className="border-b border-slate-100 pb-5 mb-6">
                        <h2 className="text-lg font-black text-slate-800">Ubah Data Siswa</h2>
                        <p className="text-xs text-slate-500 mt-1">Perbarui informasi absensi dan NIS siswa secara permanen di database.</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">Nama Lengkap</label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                                    <User className="w-4 h-4" />
                                </span>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-800 placeholder-slate-400 transition-all font-semibold outline-none"
                                    placeholder="Masukkan nama lengkap siswa"
                                    required
                                />
                            </div>
                            {errors.name && <p className="text-xs text-rose-500 font-semibold">{errors.name}</p>}
                        </div>

                        {/* NIS */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">Nomor Induk Siswa (NIS)</label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                                    <span className="font-bold text-xs select-none">ID</span>
                                </span>
                                <input
                                    type="text"
                                    value={data.nis}
                                    onChange={e => setData('nis', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-800 placeholder-slate-400 transition-all font-semibold outline-none"
                                    placeholder="Masukkan NIS unik siswa"
                                    required
                                />
                            </div>
                            {errors.nis && <p className="text-xs text-rose-500 font-semibold">{errors.nis}</p>}
                        </div>

                        {/* Nomor Absen */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">Nomor Absen</label>
                            <div className="relative">
                                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Hash className="w-4 h-4" />
                                </span>
                                <input
                                    type="number"
                                    value={data.nomor_absen}
                                    onChange={e => setData('nomor_absen', e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl pl-10 pr-4 py-3 text-xs text-slate-800 placeholder-slate-400 transition-all font-semibold outline-none"
                                    placeholder="Masukkan nomor absen siswa"
                                    min="1"
                                    max="100"
                                    required
                                />
                            </div>
                            {errors.nomor_absen && <p className="text-xs text-rose-500 font-semibold">{errors.nomor_absen}</p>}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                            <Link
                                href="/students"
                                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs transition-all"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-xs shadow-md shadow-emerald-500/25 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 cursor-pointer"
                            >
                                <Save className="w-4 h-4" />
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
