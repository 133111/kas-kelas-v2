import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Masuk Akun" />

            {status && (
                <div className="mb-4 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 p-3 rounded-xl">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                {/* Username */}
                <div className="space-y-2">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">Username</label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        value={data.username}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 transition-all font-semibold outline-none"
                        autoComplete="username"
                        required
                        onChange={(e) => setData('username', e.target.value)}
                        placeholder="Masukkan Username Kelas"
                    />
                    {errors.username && <p className="mt-1 text-xs text-rose-500 font-semibold">{errors.username}</p>}
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl px-4 py-3 text-xs text-slate-800 placeholder-slate-400 transition-all font-semibold outline-none"
                        autoComplete="current-password"
                        required
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Masukkan Password"
                    />
                    {errors.password && <p className="mt-1 text-xs text-rose-500 font-semibold">{errors.password}</p>}
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500/30"
                        />
                        <span className="ms-2 text-xs font-bold text-slate-500 hover:text-slate-700 select-none">
                            Ingat saya
                        </span>
                    </label>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-extrabold text-xs shadow-md shadow-emerald-500/25 hover:shadow-emerald-500/35 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 cursor-pointer"
                    >
                        {processing ? 'Memproses...' : 'Masuk Dashboard'}
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
