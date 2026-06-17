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
    XCircle
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
        { name: 'Laporan', icon: BarChart3, href: '/reports', active: currentRoute.startsWith('/reports') },
    ];

    return (
        <div className="min-h-screen bg-dark-bg text-gray-100 flex font-sans antialiased">
            {/* Toast Notification */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        className="fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg backdrop-blur-md bg-dark-surface/90"
                        style={{ borderColor: toast.type === 'success' ? '#10b981' : '#ef4444' }}
                    >
                        {toast.type === 'success' ? (
                            <CheckCircle className="w-5 h-5 text-emerald-400" />
                        ) : (
                            <XCircle className="w-5 h-5 text-red-500" />
                        )}
                        <span className="text-sm font-medium">{toast.message}</span>
                        <button onClick={() => setToast(null)} className="ml-2 hover:opacity-70 text-gray-400">
                            <X className="w-4 h-4" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sidebar (Desktop) */}
            <aside className="hidden lg:flex flex-col w-64 bg-dark-card border-r border-dark-border/60 shrink-0">
                {/* Brand Logo */}
                <div className="h-16 flex items-center gap-3 px-6 border-b border-dark-border/40">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-accent-teal to-accent-indigo flex items-center justify-center font-bold text-white shadow-md shadow-accent-teal/20">
                        KK
                    </div>
                    <div>
                        <h1 className="font-bold text-base bg-gradient-to-r from-teal-300 to-indigo-300 bg-clip-text text-transparent">Kas Kelas</h1>
                        <span className="text-[10px] text-gray-500 font-semibold tracking-wider uppercase">Management System</span>
                    </div>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
                    {navItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group ${
                                    item.active 
                                        ? 'bg-gradient-to-r from-accent-teal/20 to-accent-indigo/10 text-accent-teal border border-accent-teal/20 shadow-sm shadow-accent-teal/5' 
                                        : 'text-gray-400 hover:text-gray-200 hover:bg-dark-surface/50 border border-transparent'
                                }`}
                            >
                                <Icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${item.active ? 'text-accent-teal' : 'text-gray-400 group-hover:text-gray-200'}`} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer User Info */}
                <div className="p-4 border-t border-dark-border/40 bg-dark-surface/20">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white uppercase text-sm border-2 border-dark-border shadow-sm">
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
                                <button onClick={() => setSidebarOpen(false)} className="text-gray-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <nav className="flex-1 py-6 px-4 space-y-1">
                                {navItems.map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <Link
                                            key={index}
                                            href={item.href}
                                            onClick={() => setSidebarOpen(false)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                                                item.active 
                                                    ? 'bg-gradient-to-r from-accent-teal/20 to-accent-indigo/10 text-accent-teal border border-accent-teal/20' 
                                                    : 'text-gray-400 hover:text-gray-200 hover:bg-dark-surface/50 border border-transparent'
                                            }`}
                                        >
                                            <Icon className="w-5 h-5" />
                                            {item.name}
                                        </Link>
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
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-dark-surface/50"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        {header && (
                            <div className="font-semibold text-lg sm:text-xl text-gray-100">
                                {header}
                            </div>
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
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {userDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute right-0 mt-2 w-48 rounded-xl bg-dark-card border border-dark-border shadow-xl py-1 z-50 overflow-hidden"
                                    >
                                        <div className="px-4 py-2 border-b border-dark-border/40 bg-dark-surface/20">
                                            <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Role</p>
                                            <p className="text-sm font-bold text-accent-teal capitalize">{auth.user.role.replace('_', ' ')}</p>
                                        </div>
                                        <Link
                                            href="/profile"
                                            className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-300 hover:bg-dark-surface hover:text-white transition-all"
                                        >
                                            <User className="w-4 h-4 text-gray-400" />
                                            Profil Saya
                                        </Link>
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all text-left"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Keluar Sesi
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                {/* Main Content View */}
                <main className="flex-1 p-4 sm:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
