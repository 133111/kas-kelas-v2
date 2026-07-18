import React from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-dark-bg justify-center pt-6 sm:pt-0 relative overflow-hidden select-none font-sans">
            {/* Background glowing gradients & orbs */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-teal-400/[0.08] blur-[120px] pointer-events-none animate-float-slow" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-400/[0.08] blur-[120px] pointer-events-none animate-float-reverse" />
            <div className="absolute top-[30%] right-[20%] w-[300px] h-[300px] rounded-full bg-emerald-300/[0.05] blur-[100px] pointer-events-none animate-float" />

            {/* Subtle animated grid background */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik02MCAwaC02MHY2MGg2MFYweiIgZmlsbD0ibm9uZSIvPgo8cGF0aCBkPSJNNTkuNSAwSDB2NjBoNTkuNVYweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDIpIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+')] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] pointer-events-none opacity-50" />

            {/* Header / Logo */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="z-10 flex flex-col items-center gap-3 mb-6"
            >
                <motion.div 
                    whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-accent-teal via-teal-500 to-accent-indigo flex items-center justify-center font-black text-white text-3xl shadow-lg shadow-accent-teal/20 border border-white/10 animate-pulse-glow"
                >
                    KK
                </motion.div>
                <div className="text-center">
                    <h1 className="font-black text-3xl text-gray-100 tracking-tight bg-gradient-to-r from-teal-300 to-indigo-300 bg-clip-text text-transparent animate-gradient-text">Kas Kelas</h1>
                    <span className="text-[10px] text-teal-400 font-extrabold uppercase tracking-widest bg-teal-500/10 border border-teal-500/20 px-3 py-1 rounded-full mt-2 inline-block">Management System</span>
                </div>
            </motion.div>

            {/* Main Card */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 100 }}
                className="w-full sm:max-w-md z-10"
            >
                <div className="overflow-hidden bg-dark-card/90 backdrop-blur-xl border border-dark-border shadow-2xl px-8 py-8 sm:rounded-3xl hover-shimmer relative group">
                    {/* Decorative shimmer layer */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className="relative z-10">
                        {children}
                    </div>
                </div>
            </motion.div>
            
            {/* Footer */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-6 z-10 text-[10px] font-semibold text-gray-500 uppercase tracking-widest"
            >
                &copy; 2026 Kas Kelas Dashboard
            </motion.div>
        </div>
    );
}
