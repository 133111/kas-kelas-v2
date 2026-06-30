import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-emerald-50 via-teal-50/20 to-sky-100 pt-6 sm:justify-center sm:pt-0 relative overflow-hidden select-none">
            {/* Background glowing gradients */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-300/30 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-sky-300/30 blur-[120px] pointer-events-none" />

            <div className="z-10 flex flex-col items-center gap-2 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-sky-500 flex items-center justify-center font-black text-white text-2xl shadow-lg shadow-emerald-500/20 border border-white/20">
                    KK
                </div>
                <h1 className="font-extrabold text-2xl text-slate-800 tracking-tight">Kas Kelas</h1>
                <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest bg-emerald-100/60 px-2.5 py-0.5 rounded-full">Management System</span>
            </div>

            <div className="mt-4 w-full overflow-hidden bg-white/90 backdrop-blur-md border border-slate-100 px-8 py-8 shadow-xl shadow-slate-200/60 sm:max-w-md sm:rounded-2xl z-10 text-slate-700">
                {children}
            </div>
        </div>
    );
}
