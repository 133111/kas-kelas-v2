import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-dark-bg pt-6 sm:justify-center sm:pt-0 relative overflow-hidden select-none">
            {/* Background glowing gradients */}
            <div className="absolute top-[-30%] left-[-20%] w-[500px] h-[500px] rounded-full bg-accent-teal/5 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-30%] right-[-20%] w-[500px] h-[500px] rounded-full bg-accent-indigo/5 blur-[100px] pointer-events-none" />

            <div className="z-10 flex flex-col items-center gap-2 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-accent-teal to-accent-indigo flex items-center justify-center font-black text-white text-xl shadow-lg shadow-accent-teal/15">
                    KK
                </div>
                <h1 className="font-extrabold text-lg text-white tracking-tight">Kas Kelas</h1>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Management System</span>
            </div>

            <div className="mt-4 w-full overflow-hidden bg-dark-card border border-dark-border/60 px-6 py-6 shadow-2xl sm:max-w-md sm:rounded-2xl z-10 text-gray-100">
                {children}
            </div>
        </div>
    );
}
