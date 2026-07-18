import { Head, useForm, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { User, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import GuestLayout from '@/Layouts/GuestLayout';
import { useState } from 'react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
        remember: false,
    });
    
    const [isSuccess, setIsSuccess] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        
        // Brief local success animation before redirect
        setIsSuccess(true);
        setTimeout(() => {
            post(route('login'), {
                onFinish: () => {
                    reset('password');
                    setIsSuccess(false);
                },
                onError: () => setIsSuccess(false)
            });
        }, 500); // Allow animation to play
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 15, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120 } }
    };

    return (
        <GuestLayout>
            <Head title="Masuk Akun" />

            {status && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl flex items-center gap-2"
                >
                    <CheckCircle2 className="w-4 h-4" />
                    {status}
                </motion.div>
            )}

            <motion.form 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                onSubmit={submit} 
                className="space-y-6"
            >
                <div>
                    <motion.h2 variants={itemVariants} className="text-xl font-bold text-gray-100 mb-1">Selamat Datang Kembali</motion.h2>
                    <motion.p variants={itemVariants} className="text-xs text-gray-400 font-medium mb-4">Masuk untuk mengelola keuangan kas kelas</motion.p>
                </div>

                {/* Username */}
                <motion.div variants={itemVariants} className="space-y-2 relative group">
                    <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Username</label>
                    <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-accent-teal transition-colors" />
                        <input
                            id="username"
                            type="text"
                            name="username"
                            value={data.username}
                            className="w-full bg-dark-bg/80 border border-dark-border/60 focus:border-accent-teal focus:ring-1 focus:ring-accent-teal/30 rounded-xl pl-10 pr-4 py-3.5 text-sm text-gray-200 placeholder-gray-600 transition-all font-semibold outline-none hover:border-dark-border"
                            autoComplete="username"
                            required
                            onChange={(e) => setData('username', e.target.value)}
                            placeholder="Masukkan Username"
                        />
                    </div>
                    {errors.username && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-xs text-rose-500 font-semibold">{errors.username}</motion.p>}
                </motion.div>

                {/* Password */}
                <motion.div variants={itemVariants} className="space-y-2 relative group">
                    <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block flex justify-between">
                        <span>Password</span>
                    </label>
                    <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-accent-teal transition-colors" />
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="w-full bg-dark-bg/80 border border-dark-border/60 focus:border-accent-teal focus:ring-1 focus:ring-accent-teal/30 rounded-xl pl-10 pr-4 py-3.5 text-sm text-gray-200 placeholder-gray-600 transition-all font-semibold outline-none hover:border-dark-border"
                            autoComplete="current-password"
                            required
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>
                    {errors.password && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1 text-xs text-rose-500 font-semibold">{errors.password}</motion.p>}
                </motion.div>

                {/* Remember Me & Utilities */}
                <motion.div variants={itemVariants} className="flex items-center justify-between pt-1">
                    <label className="flex items-center cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="peer appearance-none w-4 h-4 border-2 border-dark-border rounded bg-transparent checked:bg-accent-teal checked:border-accent-teal focus:ring-0 transition-colors"
                            />
                            <CheckCircle2 className="w-3 h-3 text-dark-bg absolute opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                        </div>
                        <span className="ms-2.5 text-xs font-bold text-gray-400 group-hover:text-gray-300 transition-colors select-none">
                            Ingat sesi saya
                        </span>
                    </label>

                    <Link href="/register" className="text-xs font-bold text-accent-teal hover:text-teal-400 transition-colors">
                        Belum punya akun?
                    </Link>
                </motion.div>

                {/* Submit button */}
                <motion.div variants={itemVariants} className="pt-4">
                    <button
                        type="submit"
                        disabled={processing || isSuccess}
                        className={`btn-ripple relative w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-white font-extrabold text-sm shadow-md transition-all duration-300 overflow-hidden ${
                            isSuccess 
                                ? 'bg-emerald-500 scale-95' 
                                : 'bg-gradient-to-r from-accent-teal via-teal-500 to-accent-indigo hover:shadow-accent-teal/30 active:scale-95 disabled:opacity-70 disabled:scale-100 shadow-accent-teal/15'
                        }`}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {isSuccess ? (
                                <>
                                    <CheckCircle2 className="w-5 h-5 animate-bounce-subtle" />
                                    Berhasil!
                                </>
                            ) : processing ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Memproses...
                                </>
                            ) : (
                                <>
                                    Masuk Dashboard
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </span>
                        
                        {/* Hover glow effect background */}
                        {!isSuccess && !processing && (
                            <div className="absolute inset-0 bg-white/20 translate-y-full hover:translate-y-0 transition-transform duration-300 ease-in-out pointer-events-none"></div>
                        )}
                    </button>
                </motion.div>
            </motion.form>
        </GuestLayout>
    );
}
