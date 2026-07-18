import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    LayoutDashboard, 
    Receipt, 
    Coins, 
    Users, 
    AlertTriangle, 
    BarChart3, 
    Menu, 
    X, 
    User, 
    LogOut, 
    Settings,
    ChevronDown,
    Bell,
    CheckCircle,
    XCircle,
    Smartphone
} from 'lucide-react';

export default function AppLayout({ children, header }) {
    const { auth, flash } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [toast, setToast] = useState(null);

    const currentRoute = window.location.pathname;

    useEffect(() => {
        if (flash?.success) {
            setToast({ type: 'success', message: flash.success });
            const timer = setTimeout(() => setToast(null), 4000);
            return () => clearTimeout(timer);
        } else if (flash?.error) {
            setToast({ type: 'error', message: flash.error });
            const timer = setTimeout(() => setToast(null), 4000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', active: currentRoute === '/dashboard' },
        { name: 'Penagihan Kas', icon: Receipt, href: '/billing', active: currentRoute.startsWith('/billing') },
        { name: 'Transaksi Kas', icon: Coins, href: '/transactions', active: currentRoute.startsWith('/transactions') },
        { name: 'Daftar Siswa', icon: Users, href: '/students', active: currentRoute.startsWith('/students') },
        { name: 'Tunggakan / Hutang', icon: AlertTriangle, href: '/debts', active: currentRoute.startsWith('/debts') },
        { name: 'Laporan', icon: BarChart3, href: '/reports', active: currentRoute.startsWith('/reports') }
    ];

    // Page transition variants
    const pageVariants = {
        initial: { opacity: 0, y: 12 },
        animate: { 
            opacity: 1, y: 0,
            transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }
        },
        exit: { 
            opacity: 0, y: -8,
            transition: { duration: 0.2 }
        }
    };

    // Nav item animation stagger
    const navContainerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.04, delayChildren: 0.1 }
        }
    };

    const navItemVariants = {
        hidden: { opacity: 0, x: -12 },
        show: { 
            opacity: 1, x: 0,
            transition: { type: 'spring', stiffness: 120, damping: 14 }
        }
    };

    return (
        <div className="min-h-screen bg-dark-bg text-gray-100 flex font-sans antialiased">
            {/* Toast Notification — Enhanced with spring bounce */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -30, scale: 0.85, x: 20 }}
                        animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9, x: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                        className="fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-md bg-dark-surface/90"
                        style={{ borderColor: toast.type === 'success' ? '#10b981' : '#ef4444' }}
                    >
                        {toast.type === 'success' ? (
                            <motion.div
                                initial={{ scale: 0, rotate: -90 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.1 }}
                            >
                                <CheckCircle className="w-5 h-5 text-emerald-400" />
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.1 }}
                            >
                                <XCircle className="w-5 h-5 text-red-500" />
                            </motion.div>
                        )}
                        <span className="text-sm font-medium">{toast.message}</span>
                        <button onClick={() => setToast(null)} className="ml-2 hover:opacity-70 text-gray-400 hover:rotate-90 transition-transform duration-300">
                            <X className="w-4 h-4" />
                        </button>
                        {/* Toast progress bar */}
                        <motion.div 
                            initial={{ scaleX: 1 }}
                            animate={{ scaleX: 0 }}
                            transition={{ duration: 4, ease: 'linear' }}
                            className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl origin-left"
                            style={{ backgroundColor: toast.type === 'success' ? '#10b981' : '#ef4444' }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sidebar (Desktop) */}
            <aside className="hidden lg:flex flex-col w-64 bg-dark-card border-r border-dark-border/60 shrink-0">
                {/* Brand Logo — with hover animation */}
                <div className="h-16 flex items-center gap-3 px-6 border-b border-dark-border/40">
                    <motion.div 
                        whileHover={{ rotate: [0, -5, 5, 0], scale: 1.08 }}
                        transition={{ duration: 0.5 }}
                        className="w-9 h-9 rounded-lg bg-gradient-to-tr from-accent-teal to-accent-indigo flex items-center justify-center font-bold text-white shadow-md shadow-accent-teal/20"
                    >
                        KK
                    </motion.div>
                    <div>
                        <h1 className="font-bold text-base bg-gradient-to-r from-accent-teal to-accent-indigo bg-clip-text text-transparent">Kas Kelas</h1>
                        <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Management</span>
                    </div>
                </div>

                {/* Nav Links — Staggered animation + active indicator */}
                <motion.nav 
                    variants={navContainerVariants}
                    initial="hidden"
                    animate="show"
                    className="flex-1 py-6 px-4 space-y-1 overflow-y-auto"
                >
                    {navItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div key={index} variants={navItemVariants}>
                                <Link
                                    href={item.href}
                                    className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group ${
                                        item.active 
                                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100/80 shadow-sm shadow-emerald-100/10' 
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                                    }`}
                                >
                                    {/* Active indicator bar */}
                                    {item.active && (
                                        <motion.div
                                            layoutId="activeNavIndicator"
                                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-emerald-500"
                                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                        />
                                    )}
                                    <Icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${item.active ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                                    {item.name}
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.nav>

                {/* Footer User Info — with avatar pulse ring */}
                <div className="p-4 border-t border-dark-border/40 bg-dark-surface/20">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white uppercase text-sm border-2 border-dark-border shadow-sm animate-ring-pulse">
                            {auth.user.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold truncate text-gray-200">{auth.user.name}</h4>
                            <p className="text-xs text-gray-500 font-medium capitalize">{auth.user.role.replace('_', ' ')}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 z-40 bg-black lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 z-50 w-64 bg-dark-card border-r border-dark-border flex flex-col lg:hidden"
                        >
                            <div className="h-16 flex items-center justify-between px-6 border-b border-dark-border/40">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-accent-teal to-accent-indigo flex items-center justify-center font-bold text-white">
                                        KK
                                    </div>
                                    <h1 className="font-bold text-base text-gray-200">Kas Kelas</h1>
                                </div>
                                <motion.button 
                                    whileTap={{ rotate: 90 }}
                                    onClick={() => setSidebarOpen(false)} 
                                    className="text-gray-400 hover:text-white"
                                >
                                    <X className="w-5 h-5" />
                                </motion.button>
                            </div>
                            <nav className="flex-1 py-6 px-4 space-y-1">
                                {navItems.map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05, type: 'spring', stiffness: 120 }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={() => setSidebarOpen(false)}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                                                    item.active 
                                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                                                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                                                }`}
                                            >
                                                <Icon className="w-5 h-5" />
                                                {item.name}
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </nav>
                            <div className="p-4 border-t border-dark-border/40">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white uppercase text-sm">
                                        {auth.user.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-semibold truncate text-gray-200">{auth.user.name}</h4>
                                        <p className="text-xs text-gray-500 capitalize">{auth.user.role.replace('_', ' ')}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Area */}
            <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
                {/* Header/Topbar */}
                <header className="h-16 bg-dark-card/50 backdrop-blur-md border-b border-dark-border/60 flex items-center justify-between px-4 sm:px-8 z-30 sticky top-0">
                    <div className="flex items-center gap-4">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-surface/50"
                        >
                            <Menu className="w-5 h-5" />
                        </motion.button>
                        {header && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                                className="font-semibold text-lg sm:text-xl text-gray-100"
                            >
                                {header}
                            </motion.div>
                        )}
                    </div>

                    {/* Right utilities */}
                    <div className="flex items-center gap-4">
                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                onBlur={() => setTimeout(() => setUserDropdownOpen(false), 200)}
                                className="flex items-center gap-2 p-1.5 pr-3 rounded-full hover:bg-dark-surface/50 text-gray-300 hover:text-white transition-all border border-transparent hover:border-dark-border/40"
                            >
                                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-xs uppercase shadow-sm">
                                    {auth.user.name.charAt(0)}
                                </div>
                                <span className="text-sm font-medium hidden sm:inline-block max-w-[120px] truncate">{auth.user.name}</span>
                                <motion.div
                                    animate={{ rotate: userDropdownOpen ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ChevronDown className="w-4 h-4" />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {userDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
                                        className="absolute right-0 mt-2 w-48 rounded-xl bg-dark-card border border-dark-border shadow-xl py-1 z-50 overflow-hidden"
                                    >
                                        <div className="px-4 py-2 border-b border-dark-border/40 bg-dark-surface/20">
                                            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Role</p>
                                            <p className="text-sm font-bold text-accent-teal capitalize">{auth.user.role.replace('_', ' ')}</p>
                                        </div>
                                        <Link
                                            href="/profile"
                                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:bg-dark-surface hover:text-white transition-all group"
                                        >
                                            <User className="w-4 h-4 text-gray-400 group-hover:scale-110 transition-transform" />
                                            Profil Saya
                                        </Link>
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-all text-left font-semibold group"
                                        >
                                            <LogOut className="w-4 h-4 text-rose-500 group-hover:translate-x-0.5 transition-transform" />
                                            Keluar Sesi
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                {/* Main Content View — with page transition */}
                <main className="flex-1 p-4 sm:p-8">
                    <motion.div
                        key={currentRoute}
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
