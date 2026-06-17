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
                <div className="mb-4 text-xs font-semibold text-emerald-400">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-5">
                {/* Username */}
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Username</label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        value={data.username}
                        className="w-full bg-dark-bg/60 border border-dark-border/40 focus:border-accent-teal focus:ring-1 focus:ring-accent-teal/30 rounded-xl px-4 py-2.5 text-xs text-gray-200 placeholder-gray-600 transition-all font-semibold outline-none"
                        autoComplete="username"
                        required
                        onChange={(e) => setData('username', e.target.value)}
                    />
                    <InputError message={errors.username} className="mt-1.5 text-xs" />
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="w-full bg-dark-bg/60 border border-dark-border/40 focus:border-accent-teal focus:ring-1 focus:ring-accent-teal/30 rounded-xl px-4 py-2.5 text-xs text-gray-200 placeholder-gray-600 transition-all font-semibold outline-none"
                        autoComplete="current-password"
                        required
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-1.5 text-xs" />
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="rounded bg-dark-bg border-dark-border/60 text-accent-teal focus:ring-accent-teal/30"
                        />
                        <span className="ms-2 text-xs font-bold text-gray-400 hover:text-gray-300 select-none">
                            Ingat saya
                        </span>
                    </label>
                </div>

                {/* Submit button */}
                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-accent-teal to-teal-500 hover:from-teal-400 hover:to-teal-600 text-dark-bg font-extrabold text-xs shadow-md shadow-accent-teal/10 hover:shadow-accent-teal/20 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100"
                    >
                        {processing ? 'Memproses...' : 'Masuk Dashboard'}
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}
