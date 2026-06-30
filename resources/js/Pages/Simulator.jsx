import React, { useState, useRef, useEffect } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Smartphone, 
    RotateCw, 
    RefreshCw, 
    ExternalLink, 
    Home, 
    Wifi, 
    Battery, 
    Signal, 
    Info, 
    Globe,
    Sparkles,
    Laptop,
    Maximize,
    ChevronRight,
    Search
} from 'lucide-react';

const DEVICES = [
    { id: 'iphone15', name: 'iPhone 15 Pro', width: 393, height: 852, bezel: 'rounded-[48px]', island: true, type: 'phone' },
    { id: 'iphonese', name: 'iPhone SE', width: 375, height: 667, bezel: 'rounded-[32px]', island: false, type: 'phone' },
    { id: 'galaxy23', name: 'Galaxy S23', width: 360, height: 800, bezel: 'rounded-[36px]', island: true, holepunch: true, type: 'phone' },
    { id: 'ipadmini', name: 'iPad Mini', width: 744, height: 1133, bezel: 'rounded-[24px]', island: false, type: 'tablet' },
];

export default function Simulator() {
    const [selectedDevice, setSelectedDevice] = useState(DEVICES[0]);
    const [isLandscape, setIsLandscape] = useState(false);
    const [iframeUrl, setIframeUrl] = useState('/dashboard');
    const [iframeKey, setIframeKey] = useState(0);
    const [zoom, setZoom] = useState(100);
    const [timeString, setTimeString] = useState('09:41');
    const iframeRef = useRef(null);

    // Update time for the phone status bar
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            setTimeString(`${hours}:${minutes}`);
        };
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    // Get current dimensions
    const deviceWidth = isLandscape ? selectedDevice.height : selectedDevice.width;
    const deviceHeight = isLandscape ? selectedDevice.width : selectedDevice.height;

    // Handle home button
    const goHome = () => {
        setIframeUrl('/dashboard');
        setIframeKey(prev => prev + 1);
    };

    // Handle refresh
    const refreshIframe = () => {
        setIframeKey(prev => prev + 1);
    };

    // Quick paths to load
    const quickLinks = [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Penagihan', path: '/billing' },
        { name: 'Transaksi', path: '/transactions' },
        { name: 'Siswa', path: '/students' },
        { name: 'Tunggakan', path: '/debts' },
        { name: 'Laporan', path: '/reports' },
    ];

    // Detect when iframe navigates (same-origin only)
    const handleIframeLoad = () => {
        try {
            if (iframeRef.current) {
                const currentPath = iframeRef.current.contentWindow.location.pathname;
                if (currentPath && currentPath !== 'blank') {
                    setIframeUrl(currentPath);
                }
            }
        } catch (e) {
            // Silence cross-origin error if it happens (should not happen on localhost)
        }
    };

    return (
        <AppLayout header="Simulator Tampilan HP">
            <Head title="Simulator HP" />

            <div className="space-y-6">
                {/* Header Info */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                                    <Smartphone className="w-5 h-5" />
                                </span>
                                <h2 className="text-lg font-bold text-slate-800">Uji Responsivitas Mobile</h2>
                            </div>
                            <p className="text-slate-500 text-xs mt-1">
                                Test dan rasakan performa serta visual website Kas Kelas dalam berbagai ukuran layar HP secara interaktif.
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100/80 text-emerald-700">
                                <Sparkles className="w-3.5 h-3.5" />
                                Terintegrasi Sesi Login
                            </span>
                        </div>
                    </div>
                </div>

                {/* Workspace */}
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                    {/* Controls Panel */}
                    <div className="xl:col-span-1 space-y-6">
                        {/* Device Selector */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Pilih Perangkat</h3>
                            
                            <div className="space-y-2">
                                {DEVICES.map((device) => (
                                    <button
                                        key={device.id}
                                        onClick={() => setSelectedDevice(device)}
                                        className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                                            selectedDevice.id === device.id
                                                ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-sm'
                                                : 'border-slate-100 hover:border-slate-300 text-slate-600 bg-slate-50/50 hover:bg-slate-50'
                                        }`}
                                    >
                                        <div>
                                            <p className="text-xs font-bold">{device.name}</p>
                                            <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                                                {device.width} × {device.height} px
                                            </p>
                                        </div>
                                        <Smartphone className={`w-4 h-4 ${selectedDevice.id === device.id ? 'text-emerald-600' : 'text-slate-400'}`} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Orientation & Scaling */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Orientasi & Zoom</h3>
                            
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setIsLandscape(false)}
                                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                                        !isLandscape
                                            ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                                            : 'border-slate-200 hover:border-slate-300 text-slate-600'
                                    }`}
                                >
                                    Tegak (Portrait)
                                </button>
                                <button
                                    onClick={() => setIsLandscape(true)}
                                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                                        isLandscape
                                            ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                                            : 'border-slate-200 hover:border-slate-300 text-slate-600'
                                    }`}
                                >
                                    <RotateCw className="w-3.5 h-3.5 rotate-90" />
                                    Miring (Landscape)
                                </button>
                            </div>

                            {/* Zoom Slider */}
                            <div className="space-y-2 pt-2">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-slate-500">Skala Zoom</span>
                                    <span className="font-extrabold text-emerald-600">{zoom}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="50"
                                    max="120"
                                    step="5"
                                    value={zoom}
                                    onChange={(e) => setZoom(Number(e.target.value))}
                                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                                />
                            </div>
                        </div>

                        {/* Navigation Shortcut */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Buka Halaman Cepat</h3>
                            <div className="grid grid-cols-2 gap-1.5">
                                {quickLinks.map((link, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => {
                                            setIframeUrl(link.path);
                                            setIframeKey(prev => prev + 1);
                                        }}
                                        className="py-2 px-3 rounded-lg bg-slate-50 hover:bg-emerald-50/50 border border-slate-100 hover:border-emerald-200 text-[11px] font-bold text-slate-700 hover:text-emerald-800 text-center transition-all"
                                    >
                                        {link.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Simulator Device Frame Viewport */}
                    <div className="xl:col-span-3 bg-slate-100 rounded-2xl p-6 border border-slate-200 flex items-center justify-center min-h-[600px] xl:min-h-[850px] overflow-hidden relative shadow-inner">
                        {/* Simulation Workspace Container with Zoom scale */}
                        <div 
                            style={{ 
                                transform: `scale(${zoom / 100})`, 
                                transformOrigin: 'center center',
                                transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)' 
                            }}
                            className="flex items-center justify-center p-8"
                        >
                            {/* Smartphone / Tablet Frame Container */}
                            <div 
                                style={{ 
                                    width: `${deviceWidth + 24}px`, 
                                    height: `${deviceHeight + 72}px`,
                                }}
                                className={`bg-slate-900 border-[12px] border-slate-950 rounded-[44px] shadow-2xl relative transition-all duration-300 flex flex-col items-center p-1.5`}
                            >
                                {/* Front Camera / Speaker Notch (Dynamic Island or Bezel) */}
                                {selectedDevice.island && !isLandscape && (
                                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-28 h-7 bg-black rounded-3xl z-40 flex items-center justify-end px-3">
                                        <div className="w-2.5 h-2.5 bg-zinc-900 border border-zinc-800 rounded-full" />
                                    </div>
                                )}

                                {/* Samsung holepunch camera */}
                                {selectedDevice.holepunch && !isLandscape && (
                                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full z-40" />
                                )}

                                {/* Device Hardware Buttons Mockups (Volume, Power) */}
                                <div className="absolute -left-[14px] top-24 w-1 h-12 bg-slate-950 rounded-r-sm" />
                                <div className="absolute -left-[14px] top-40 w-1 h-16 bg-slate-950 rounded-r-sm" />
                                <div className="absolute -left-[14px] top-60 w-1 h-16 bg-slate-950 rounded-r-sm" />
                                <div className="absolute -right-[14px] top-32 w-1 h-20 bg-slate-950 rounded-l-sm" />

                                {/* Mock Device Screen Contents */}
                                <div className="w-full h-full bg-white rounded-[32px] overflow-hidden flex flex-col relative">
                                    
                                    {/* Mock Top Status Bar */}
                                    <div className="h-8 bg-white border-b border-slate-100 flex justify-between items-center px-6 shrink-0 select-none z-30">
                                        <span className="text-xs font-black text-slate-800">{timeString}</span>
                                        <div className="flex items-center gap-1.5 text-slate-800">
                                            <Signal className="w-3.5 h-3.5" />
                                            <Wifi className="w-3.5 h-3.5" />
                                            <Battery className="w-4 h-4" />
                                        </div>
                                    </div>

                                    {/* Mock Safari/Chrome Address Bar */}
                                    <div className="bg-slate-50 border-b border-slate-100 py-1.5 px-3 flex items-center justify-between gap-2 shrink-0 z-30">
                                        <div className="flex gap-1 shrink-0">
                                            <button 
                                                onClick={goHome} 
                                                className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-colors"
                                                title="Kembali ke Dashboard"
                                            >
                                                <Home className="w-3.5 h-3.5" />
                                            </button>
                                        </div>

                                        {/* URL Bar */}
                                        <div className="flex-1 bg-white border border-slate-200/80 rounded-lg px-2.5 py-1 flex items-center gap-1.5 min-w-0">
                                            <Search className="w-3 h-3 text-slate-400 shrink-0" />
                                            <span className="text-[10px] font-semibold text-slate-500 truncate select-all flex-1">
                                                localhost:8000{iframeUrl}
                                            </span>
                                        </div>

                                        <div className="flex gap-1 shrink-0">
                                            <button 
                                                onClick={refreshIframe} 
                                                className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-colors"
                                                title="Muat Ulang Halaman"
                                            >
                                                <RefreshCw className="w-3.5 h-3.5" />
                                            </button>
                                            <a 
                                                href={iframeUrl} 
                                                target="_blank" 
                                                rel="noreferrer"
                                                className="p-1 rounded hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition-colors flex items-center"
                                                title="Buka di Tab Baru"
                                            >
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Iframe Viewport containing the application */}
                                    <div className="flex-1 w-full bg-slate-50 relative">
                                        <iframe
                                            key={iframeKey}
                                            ref={iframeRef}
                                            src={iframeUrl}
                                            onLoad={handleIframeLoad}
                                            className="w-full h-full border-none bg-white"
                                            style={{
                                                width: '100%',
                                                height: '100%'
                                            }}
                                            title="Mobile App View"
                                        />
                                    </div>

                                    {/* Home Indicator Bar for iPhone models */}
                                    {!isLandscape && selectedDevice.type === 'phone' && (
                                        <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-slate-900/40 rounded-full z-40 pointer-events-none" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Developer Instructions */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                        <Info className="w-5 h-5 text-emerald-600" />
                        <h3 className="font-bold text-slate-800 text-sm">Metode Pengujian Responsivitas Lainnya</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600">
                        <div className="space-y-2 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                            <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
                                <Globe className="w-4 h-4 text-emerald-600" />
                                Mode Developer Chrome DevTools (F12)
                            </div>
                            <p className="leading-relaxed">
                                Anda dapat menekan tombol <strong className="text-slate-800">F12</strong> (atau klik kanan & pilih <strong className="text-slate-800">Inspect</strong>) di browser Anda, kemudian klik ikon <strong className="text-slate-800">Toggle Device Toolbar</strong> (ikon HP & tablet) di pojok kiri atas jendela inspeksi. Ini memungkinkan simulasi layar sentuh (touch event), koneksi internet lambat (network throttling), dan ukuran custom.
                            </p>
                        </div>

                        <div className="space-y-2 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                            <div className="flex items-center gap-1.5 font-bold text-slate-800 mb-1">
                                <Laptop className="w-4 h-4 text-indigo-600" />
                                Menggunakan Ekstensi Browser Tambahan
                            </div>
                            <p className="leading-relaxed">
                                Jika Anda menginginkan alat pengetesan layar handphone yang mirip dengan Figma di browser Anda, kami merekomendasikan memasang ekstensi Chrome/Edge gratis berikut:
                            </p>
                            <ul className="list-disc pl-4 space-y-1 mt-1 font-semibold text-slate-700">
                                <li><strong>Responsive Viewer</strong> — Membuka beberapa layar HP sekaligus secara berdampingan.</li>
                                <li><strong>Mobile Simulator - responsive testing tool</strong> — Simulasi bingkai ponsel nyata lengkap dengan keyboard virtual.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
