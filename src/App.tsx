import React, { useState, useEffect, useRef } from 'react';
import {
  Smartphone,
  Search,
  RefreshCw,
  TrendingDown,
  ShieldCheck,
  Cpu,
  Camera,
  Battery,
  BatteryCharging,
  HardDrive,
  Wifi,
  Layers,
  ArrowUpRight,
  Plus,
  Trash2,
  Terminal,
  Send,
  Sliders,
  DollarSign,
  Monitor,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Unlock,
  ChevronRight,
  Sparkles,
  Zap,
  Tag,
  Building2,
  Clock,
  Star,
  Heart,
  Scale,
  Handshake,
  Truck,
  Headphones,
  Moon,
  Sun,
  Bell,
  User,
  ExternalLink,
  ChevronDown,
  Info,
  Mail,
  X,
} from 'lucide-react';
import {
  MobilePhone,
  ScrapeSource,
  PtaStatus,
} from './types/mobilemandi';
import { WhatMobileSpecsSheet } from './components/WhatMobileSpecsSheet';

// ============================================================================
// 1. BACKEND API CONFIGURATION & ENVIRONMENT VARIABLES
// ============================================================================
// To connect to your external cloud-deployed Node.js scraper:
// Set VITE_API_URL in your .env or AI Studio Secrets, for example:
// VITE_API_URL="https://your-deployed-scraper.run.app/api/phones"
export const PRICE_API =
  (import.meta as any).env?.VITE_API_URL || 'https://YOUR_BACKEND_URL_HERE/api/phones';

const DEFAULT_ADMIN_KEY = 'mandi-admin-2026';

export default function App() {
  // Navigation & Category Filters
  const [activeNav, setActiveNav] = useState<string>('home');
  const [catalogTab, setCatalogTab] = useState<'new' | 'used' | 'compare' | 'deals'>('new');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  // Notifications & Country dropdowns
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('Pakistan');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Phones database state
  const [phones, setPhones] = useState<MobilePhone[]>([]);
  const [selectedPhoneForDetail, setSelectedPhoneForDetail] = useState<MobilePhone | null>(null);
  const [compareList, setCompareList] = useState<MobilePhone[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Buy & Sell / Valuation Modal
  const [isValuationModalOpen, setIsValuationModalOpen] = useState(false);
  const [valBrand, setValBrand] = useState('Samsung');
  const [valModel, setValModel] = useState('Galaxy S24');
  const [valStorage, setValStorage] = useState('256 GB');
  const [valPtaStatus, setValPtaStatus] = useState<PtaStatus>('Official PTA Approved');
  const [valBodyCondition, setValBodyCondition] = useState('Minor micro-scratches, no dents');
  const [valScreenCondition, setValScreenCondition] = useState('Original flawless display');
  const [valBatteryHealth, setValBatteryHealth] = useState(88);
  const [isValuating, setIsValuating] = useState(false);
  const [valuationResult, setValuationResult] = useState<any | null>(null);

  // Rasho Bhai AI Consultation Counter State
  const [isAdvisorModalOpen, setIsAdvisorModalOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    { id: string; role: 'user' | 'model'; text: string; time: string }[]
  >([
    {
      id: 'msg-01',
      role: 'model',
      text: 'Assalam-o-Alaikum! I am Rasho Bhai, your Mobile Mandi specialist on PhoneHub PK. Looking for official PTA Approved prices, comparing Airlink vs M&P warranties, or checking spot rates in Hafeez Centre & Hall Road? Ask me anything!',
      time: '10:00',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [advisorModel, setAdvisorModel] = useState<'gemini-3.8-flash' | 'gemini-3.1-flash-lite'>('gemini-3.8-flash');
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Initial Fetch on load
  useEffect(() => {
    fetchPhones();
  }, []);

  useEffect(() => {
    if (isAdvisorModalOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isAdvisorModalOpen]);

  /**
   * Resilient fetcher: Reads from PRICE_API (cloud scraper) if configured,
   * otherwise seamlessly falls back to the local backend /api/phones.
   */
  const fetchPhones = async () => {
    try {
      let targetUrl = '/api/phones';
      if (
        PRICE_API &&
        !PRICE_API.includes('YOUR_BACKEND_URL_HERE') &&
        (PRICE_API.startsWith('http://') || PRICE_API.startsWith('https://'))
      ) {
        targetUrl = PRICE_API;
      }

      const res = await fetch(targetUrl);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      if (data.phones) {
        setPhones(data.phones);
      } else if (Array.isArray(data)) {
        setPhones(data);
      }
    } catch (e) {
      console.warn('External PRICE_API unreachable or placeholder. Falling back to local Express /api/phones:', e);
      try {
        const localRes = await fetch('/api/phones');
        const localData = await localRes.json();
        if (localData.phones) setPhones(localData.phones);
      } catch (err) {
        console.error('Failed to load local phones database:', err);
      }
    }
  };

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const addToCompare = (phone: MobilePhone, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (compareList.find((p) => p.id === phone.id)) {
      setIsCompareModalOpen(true);
      return;
    }
    if (compareList.length >= 3) {
      setCompareList([compareList[1], compareList[2], phone]);
    } else {
      setCompareList((prev) => [...prev, phone]);
    }
    setIsCompareModalOpen(true);
  };

  const removeFromCompare = (id: string) => {
    setCompareList((prev) => prev.filter((p) => p.id !== id));
  };

  // Trade-in valuation calculator
  const handleCalculateValuation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsValuating(true);

    const calculateFallback = () => {
      let baseVal = 95000;
      if (valBrand === 'Apple') baseVal = 240000;
      if (valBrand === 'Samsung') baseVal = 190000;
      if (valBrand === 'OnePlus') baseVal = 170000;
      if (valBrand === 'Xiaomi') baseVal = 90000;
      if (valBrand === 'OPPO') baseVal = 70000;
      if (valBrand === 'Vivo') baseVal = 65000;

      let condMult = 1.0;
      if (valBodyCondition.includes('Major') || valBodyCondition.includes('Crack')) condMult -= 0.25;
      else if (valBodyCondition.includes('Minor')) condMult -= 0.1;

      if (valScreenCondition.includes('Cracked') || valScreenCondition.includes('Lines')) condMult -= 0.35;

      const battMult = valBatteryHealth >= 90 ? 1.0 : valBatteryHealth >= 80 ? 0.94 : 0.85;
      const ptaDiscount = valPtaStatus.includes('Non-PTA') ? 0.55 : 1.0;

      const cash = Math.round((baseVal * condMult * battMult * ptaDiscount) / 1000) * 1000;

      return {
        estimatedCashValuePKR: cash,
        retailResalePKR: Math.round((cash * 1.15) / 500) * 500,
        wholesaleMandiRatePKR: Math.round((cash * 0.94) / 500) * 500,
        grade: condMult >= 0.95 ? 'Grade A+ (Pristine)' : condMult >= 0.85 ? 'Grade A (Good)' : 'Grade B (Fair)',
        ptaTaxImpactDescription: valPtaStatus.includes('Non-PTA')
          ? 'Non-PTA device heavily discounted due to pending FBR customs duty.'
          : 'Official PTA Approved device retaining 100% legal SIM network value in Pakistan.',
        recommendation: 'Fair trade-in valuation verified against current Hafeez Centre & Hall Road wholesale index.',
      };
    };

    try {
      const res = await fetch('/api/valuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brand: valBrand,
          model: valModel,
          storage: valStorage,
          ptaStatus: valPtaStatus,
          physicalCondition: valBodyCondition,
          screenCondition: valScreenCondition,
          batteryPercent: valBatteryHealth,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setValuationResult(data.result || calculateFallback());
      } else {
        setValuationResult(calculateFallback());
      }
    } catch {
      setValuationResult(calculateFallback());
    } finally {
      setIsValuating(false);
    }
  };

  /**
   * Send Chat Message to Rasho Bhai
   * Safely checks for Gemini API key configuration and displays friendly message if missing
   */
  const handleSendChatMessage = async (e?: React.FormEvent, promptOverride?: string) => {
    if (e) e.preventDefault();
    const content = (promptOverride || chatInput).trim();
    if (!content || isChatLoading) return;

    // Check optional client-side env key if direct client calls are needed
    const clientApiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
    if (clientApiKey === 'DISABLED_KEY') {
      alert('The Mandi Advisor service is currently unavailable. Please check your API settings.');
      return;
    }

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { id: `u-${Date.now()}`, role: 'user' as const, text: content, time: timeStr };

    const nextList = [...chatMessages, userMsg];
    setChatMessages(nextList);
    if (!promptOverride) setChatInput('');
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextList.map((m) => ({ role: m.role, content: m.text })),
          selectedModel: advisorModel,
          activePhoneContext: selectedPhoneForDetail || undefined,
          availablePhones: phones.map((p) => ({
            name: p.title,
            brand: p.brand,
            model: p.model,
            price: p.marketLowestPrice,
            officialPrice: p.officialMfr?.price || null,
            storage: p.storage,
            ram: p.ram,
          })),
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      const modelMsg = {
        id: `m-${Date.now()}`,
        role: 'model' as const,
        text: data.reply || 'Wholesale market counter is updating rates. Please retry.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages((prev) => [...prev, modelMsg]);
    } catch {
      setChatMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'model' as const,
          text: 'Rasho Bhai is currently verifying spot rates with Hafeez Centre distributors. If GEMINI_API_KEY is not set in AI Studio Secrets, the advisor will continue using our local mandi database.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Filtered catalog phones
  const filteredPhones = phones.filter((p) => {
    const matchesBrand =
      selectedBrand === 'all' || p.brand.toLowerCase() === selectedBrand.toLowerCase();

    const matchesSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab =
      catalogTab === 'new'
        ? true
        : catalogTab === 'used'
        ? p.marketLowestPrice < 150000 || p.officialPtaStatus.includes('Non-PTA')
        : catalogTab === 'deals'
        ? (p.officialMfr?.price && p.officialMfr.price > p.marketLowestPrice) || p.marketTrend === 'Falling'
        : true;

    return matchesBrand && matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-[#070b19] text-slate-100 flex flex-col font-sans selection:bg-blue-600/30 selection:text-blue-200">
      {/* ====================================================================
          1. TOP GLOBAL HEADER BAR (PhoneHub PK)
         ==================================================================== */}
      <header className="sticky top-0 z-40 bg-[#070b19]/90 backdrop-blur-md border-b border-blue-900/30 px-4 lg:px-8 py-3">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3 shrink-0 cursor-pointer" onClick={() => { setActiveNav('home'); setSelectedBrand('all'); }}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-blue-600/30 border border-blue-400/30">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                <span>Phone<span className="text-blue-500">Hub</span></span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold border border-blue-500/30">PK</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">
                Prices • Compare • Buy • Sell
              </p>
            </div>
          </div>

          {/* Center Search Bar */}
          <div className="flex-1 max-w-2xl mx-4 hidden md:block">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                placeholder="Search for phones (e.g. Samsung S26, iPhone 17...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0d1630] border border-blue-900/40 rounded-full pl-11 pr-14 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-all shadow-inner"
              />
              <button
                type="button"
                onClick={() => {}}
                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center justify-center transition-all shadow-md shadow-blue-600/30 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>

          {/* Right Controls: Country, Dark Mode, Notification, Account */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Country Selector */}
            <div className="relative">
              <button
                onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0d1630] border border-blue-900/40 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <span className="text-sm">🇵🇰</span>
                <span className="hidden sm:inline">{selectedCountry}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>
              {isCountryDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-[#0d1630] border border-blue-900/50 rounded-xl shadow-xl py-1 z-50 text-xs">
                  <button
                    onClick={() => { setSelectedCountry('Pakistan'); setIsCountryDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 hover:bg-blue-600/20 text-slate-200 flex items-center gap-2"
                  >
                    <span>🇵🇰</span> Pakistan (PKR)
                  </button>
                  <button
                    onClick={() => { setSelectedCountry('UAE'); setIsCountryDropdownOpen(false); }}
                    className="w-full text-left px-3 py-2 hover:bg-blue-600/20 text-slate-400 flex items-center gap-2"
                  >
                    <span>🇦🇪</span> UAE (AED)
                  </button>
                </div>
              )}
            </div>

            {/* Dark Mode Icon */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-[#0d1630] border border-blue-900/40 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Toggle theme"
            >
              <Moon className="w-4 h-4 text-blue-400" />
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 rounded-full bg-[#0d1630] border border-blue-900/40 text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                <Bell className="w-4 h-4 text-slate-300" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-[10px] font-bold rounded-full flex items-center justify-center text-white">
                  3
                </span>
              </button>
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-[#0d1630] border border-blue-900/60 rounded-2xl shadow-2xl p-3 z-50 text-xs">
                  <div className="font-bold text-white mb-2 flex items-center justify-between border-b border-blue-900/40 pb-2">
                    <span>Recent Mandi Alerts</span>
                    <span className="text-[10px] text-blue-400 font-normal">Live PK</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 rounded-lg bg-blue-950/40 border border-blue-900/30">
                      <div className="font-semibold text-blue-400">Samsung S24 Ultra Price Drop</div>
                      <div className="text-[11px] text-slate-400">Wholesale rate fell by Rs. 15,000 in Hafeez Centre.</div>
                    </div>
                    <div className="p-2 rounded-lg bg-blue-950/40 border border-blue-900/30">
                      <div className="font-semibold text-emerald-400">Xiaomi 14 Ultra Restocked</div>
                      <div className="text-[11px] text-slate-400">Official MiStore stock verified in Hall Road.</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* My Account Profile */}
            <button
              onClick={() => setIsAdvisorModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/30 text-xs font-semibold text-blue-400 hover:bg-blue-600/20 transition-all cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px]">
                <User className="w-3 h-3" />
              </div>
              <span className="hidden sm:inline">My Account</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {/* Direct Admin Link */}
            <a
              href="/admin"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
              title="Autonomous Web Scraper & Price Dispatcher"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Admin</span>
            </a>
          </div>
        </div>
      </header>

      {/* ====================================================================
          2. MAIN CONTENT BODY WITH LEFT SIDEBAR
         ==================================================================== */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto px-4 lg:px-8 py-6 flex gap-6">
        {/* Left Sticky Sidebar */}
        <aside className="w-60 shrink-0 hidden lg:flex flex-col justify-between space-y-6">
          <div className="space-y-1 bg-[#0b132b]/80 border border-blue-900/40 rounded-2xl p-2.5 backdrop-blur-md shadow-xl">
            {[
              { id: 'home', label: 'Home', icon: Smartphone },
              { id: 'new', label: 'New Phones', icon: Smartphone },
              { id: 'used', label: 'Used Phones', icon: RefreshCw },
              { id: 'compare', label: 'Compare Phones', icon: Scale },
              { id: 'buysell', label: 'Buy & Sell', icon: Handshake },
              { id: 'prices', label: 'Phone Prices', icon: Tag },
              { id: 'reviews', label: 'Reviews & News', icon: Star },
              { id: 'pta', label: 'PTA Guide', icon: ShieldCheck },
              { id: 'deals', label: 'Deals & Offers', icon: Zap },
              { id: 'about', label: 'About Us', icon: Info },
              { id: 'contact', label: 'Contact Us', icon: Mail },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNav(item.id);
                    if (item.id === 'compare') setIsCompareModalOpen(true);
                    if (item.id === 'buysell' || item.id === 'used') setIsValuationModalOpen(true);
                    if (item.id === 'deals') setCatalogTab('deals');
                    if (item.id === 'new') setCatalogTab('new');
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-blue-900/20'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Need Help Card in Sidebar */}
          <div className="p-4 bg-gradient-to-br from-[#0c1a40] to-[#081024] border border-blue-900/50 rounded-2xl text-center space-y-3 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center mx-auto text-blue-400">
              <Headphones className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Need Help?</div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Our Support Team is here for you!
              </p>
            </div>
            <button
              onClick={() => setIsAdvisorModalOpen(true)}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-600/30 cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Chat Now</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>

        {/* Main Content Pane */}
        <main className="flex-1 space-y-6 min-w-0">
          {/* ==================================================================
              3. HERO BANNER (PhoneHub PK - Your Ultimate Mobile Hub)
             ================================================================== */}
          <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0b173d] via-[#091538] to-[#0b1b48] border border-blue-900/40 p-6 sm:p-10 shadow-2xl">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Heading & Value props */}
              <div className="lg:col-span-5 space-y-5">
                <div className="space-y-1">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                    PhoneHub PK
                  </h1>
                  <div className="text-lg sm:text-xl font-bold text-blue-400 relative inline-block">
                    Your Ultimate Mobile Hub
                    <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-rose-500 rounded-full mt-1"></div>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Latest Mobile Prices in Pakistan</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Compare &amp; Choose Best Device</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Buy &amp; Sell with Complete Confidence</span>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => {
                      const el = document.getElementById('catalog-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-amber-400/20 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Explore Now</span>
                    <ChevronRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </div>

              {/* Center Column: Smartphone Showcase Display */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center">
                <div className="relative flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80"
                    alt="Flagship Lineup"
                    className="w-44 sm:w-56 h-auto drop-shadow-[0_20px_35px_rgba(37,99,235,0.4)] object-contain transition-transform hover:scale-105 duration-300"
                  />
                </div>
                {/* Carousel Pagination Dots */}
                <div className="flex items-center gap-1.5 mt-3">
                  <span className="w-2.5 h-1.5 rounded-full bg-blue-500"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                </div>
              </div>

              {/* Right Column: Better Deal Banner & Minar-e-Pakistan Graphic */}
              <div className="lg:col-span-3 flex justify-center lg:justify-end">
                <div className="p-5 rounded-2xl bg-[#09153a]/90 border border-blue-900/50 shadow-xl text-center space-y-3 relative overflow-hidden max-w-xs">
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                    Smart Choice...
                  </div>
                  <div className="text-2xl font-black text-amber-400 italic">
                    Better Deal!
                  </div>
                  <div className="px-3 py-1 bg-amber-400 text-slate-950 font-black text-xs rounded-full inline-block">
                    Only at PhoneHub PK
                  </div>
                  <div className="pt-2 text-[10px] text-slate-400 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Official PTA Verified Prices</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ==================================================================
              4. VALUE PROPOSITION TICKER (6 Items)
             ================================================================== */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { title: 'Latest Prices', sub: 'Updated Daily', icon: Zap, color: 'text-amber-400' },
              { title: '100% Secure', sub: 'Transactions', icon: ShieldCheck, color: 'text-emerald-400' },
              { title: 'Compare', sub: 'Upto 3 Phones', icon: Scale, color: 'text-blue-400' },
              { title: 'Fast Delivery', sub: 'Across Pakistan', icon: Truck, color: 'text-cyan-400' },
              { title: '24/7 Customer', sub: 'Support', icon: Headphones, color: 'text-indigo-400' },
              { title: 'Trusted Platform', sub: 'by Millions', icon: Star, color: 'text-amber-400' },
            ].map((prop, idx) => {
              const Icon = prop.icon;
              return (
                <div
                  key={idx}
                  className="p-3 bg-[#0b132b]/80 border border-blue-900/30 rounded-2xl flex items-center gap-3 backdrop-blur-sm"
                >
                  <div className={`w-8 h-8 rounded-xl bg-blue-950 flex items-center justify-center shrink-0 ${prop.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-white truncate">{prop.title}</div>
                    <div className="text-[10px] text-slate-400 truncate">{prop.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ==================================================================
              5. MAIN CATALOG ROW (Brands Box + Products Center + Action Cards)
             ================================================================== */}
          <div id="catalog-section" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Box: Popular Brands */}
            <div className="lg:col-span-3 space-y-4">
              <div className="p-4 bg-[#0b132b]/80 border border-blue-900/30 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">Popular Brands</h3>
                  <button
                    onClick={() => setSelectedBrand('all')}
                    className="text-xs text-blue-400 hover:text-blue-300 font-semibold cursor-pointer flex items-center gap-0.5"
                  >
                    <span>View All</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'Apple', label: 'Apple', iconText: '' },
                    { id: 'Samsung', label: 'Samsung', iconText: 'S' },
                    { id: 'Xiaomi', label: 'Xiaomi', iconText: 'mi' },
                    { id: 'OPPO', label: 'OPPO', iconText: 'oppo' },
                    { id: 'realme', label: 'realme', iconText: 'realme' },
                    { id: 'Vivo', label: 'Vivo', iconText: 'vivo' },
                    { id: 'OnePlus', label: 'OnePlus', iconText: '1+' },
                    { id: 'Infinix', label: 'Infinix', iconText: 'Infinix' },
                  ].map((brand) => (
                    <button
                      key={brand.id}
                      onClick={() => setSelectedBrand(selectedBrand.toLowerCase() === brand.id.toLowerCase() ? 'all' : brand.id)}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                        selectedBrand.toLowerCase() === brand.id.toLowerCase()
                          ? 'bg-blue-600/30 border-blue-500 text-white shadow-md shadow-blue-600/20'
                          : 'bg-[#0d1630] border-blue-900/40 text-slate-300 hover:border-blue-500/50'
                      }`}
                    >
                      <span className="text-base font-black mb-1">{brand.iconText}</span>
                      <span className="text-xs font-semibold">{brand.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Center Section: Product Category Tabs & Cards Grid */}
            <div className="lg:col-span-6 space-y-4">
              {/* Category Segmented Tabs */}
              <div className="flex items-center gap-2 p-1.5 bg-[#0b132b]/80 border border-blue-900/30 rounded-2xl overflow-x-auto">
                {[
                  { id: 'new', label: 'New Phones', icon: Smartphone },
                  { id: 'used', label: 'Used Phones', icon: RefreshCw },
                  { id: 'compare', label: 'Compare', icon: Scale },
                  { id: 'deals', label: 'Deals', icon: Tag },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = catalogTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        if (tab.id === 'compare') {
                          setIsCompareModalOpen(true);
                        } else {
                          setCatalogTab(tab.id as any);
                        }
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                          : 'text-slate-400 hover:text-white hover:bg-blue-950/40'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Product Cards Grid (4 columns on desktop) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                {filteredPhones.slice(0, 8).map((phone) => {
                  const isFavorited = !!wishlist[phone.id];
                  return (
                    <div
                      key={phone.id}
                      className="p-4 bg-[#0b132b]/90 border border-blue-900/30 hover:border-blue-500/60 rounded-2xl flex flex-col justify-between transition-all duration-200 group hover:shadow-xl hover:shadow-blue-900/20"
                    >
                      {/* Top Badges Row */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                          New
                        </span>
                        <button
                          onClick={(e) => toggleWishlist(phone.id, e)}
                          className="p-1 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isFavorited ? 'fill-rose-500 text-rose-500' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {/* Phone Image Container */}
                      <div
                        onClick={() => setSelectedPhoneForDetail(phone)}
                        className="h-44 flex items-center justify-center p-2 rounded-xl bg-gradient-to-b from-blue-950/20 to-transparent cursor-pointer"
                      >
                        <img
                          src={phone.imageUrl || phone.images?.[0] || 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=400&q=80'}
                          alt={phone.title}
                          className="max-h-36 object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Phone Metadata */}
                      <div className="space-y-1.5 mt-2">
                        <h4
                          onClick={() => setSelectedPhoneForDetail(phone)}
                          className="text-xs font-bold text-white truncate cursor-pointer hover:text-blue-400"
                          title={phone.title}
                        >
                          {phone.model || phone.title}
                        </h4>

                        <div className="text-base font-black text-blue-400">
                          Rs. {Number(phone.marketLowestPrice || 0).toLocaleString('en-PK')}
                        </div>

                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                          <span className="flex items-center text-amber-400 font-bold">
                            ★ 4.8
                          </span>
                          <span>(12k reviews)</span>
                        </div>
                      </div>

                      {/* Bottom Button */}
                      <div className="pt-3">
                        <button
                          onClick={() => setSelectedPhoneForDetail(phone)}
                          className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-blue-600/30 flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>View Details</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Box: Action Cards (Price Comparison & Buy/Sell Phones) */}
            <div className="lg:col-span-3 space-y-4">
              {/* Card 1: Price Comparison */}
              <div className="p-5 bg-gradient-to-br from-[#0b163a] to-[#070e24] border border-blue-900/40 rounded-2xl space-y-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Price Comparison</h4>
                    <p className="text-[11px] text-slate-400">Find the best price</p>
                  </div>
                </div>

                <div className="h-24 rounded-xl bg-blue-950/40 border border-blue-900/30 p-3 flex items-end justify-between gap-2">
                  <div className="w-1/4 bg-blue-500/40 rounded-t h-1/2"></div>
                  <div className="w-1/4 bg-blue-500/60 rounded-t h-3/4"></div>
                  <div className="w-1/4 bg-blue-600 rounded-t h-full"></div>
                  <div className="w-1/4 bg-emerald-500 rounded-t h-4/5"></div>
                </div>

                <button
                  onClick={() => setIsCompareModalOpen(true)}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-600/30 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Compare Now</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Card 2: Buy & Sell Phones */}
              <div className="p-5 bg-gradient-to-br from-[#0c1f2e] to-[#07131e] border border-emerald-900/40 rounded-2xl space-y-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Buy &amp; Sell Phones</h4>
                    <p className="text-[11px] text-slate-400">Quick • Safe • Trusted</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-900/30 text-xs text-slate-300">
                  Trade in your phone at verified Hafeez Centre &amp; Hall Road spot valuations with instant cash payout.
                </div>

                <button
                  onClick={() => setIsValuationModalOpen(true)}
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black rounded-xl transition-all shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Post Free Ad</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              </div>
            </div>
          </div>

          {/* ==================================================================
              6. BOTTOM PROMOTIONAL CARDS (Deals, PTA Only, News & Reviews)
             ================================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Promo Card 1: Best Deals */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0b1b48] to-[#071233] border border-blue-900/40 flex flex-col justify-between space-y-4 shadow-xl">
              <div>
                <h4 className="text-lg font-black text-white">
                  Get the Best Deals on Latest Smartphones
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Exclusive distributor pricing directly from verified wholesale traders.
                </p>
              </div>
              <div>
                <button
                  onClick={() => setCatalogTab('deals')}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl shadow-md shadow-amber-400/20 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Shop Now</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              </div>
            </div>

            {/* Promo Card 2: PTA Approved Phones Only */}
            <div className="p-6 rounded-2xl bg-white text-slate-900 flex items-center justify-between gap-4 shadow-xl border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 rounded-lg bg-blue-900 text-white font-black text-xl italic tracking-tighter">
                  PTA
                </div>
                <div>
                  <div className="text-base font-black text-slate-900">
                    PTA Approved
                  </div>
                  <div className="text-xs text-slate-600 font-semibold">
                    Phones Only
                  </div>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Promo Card 3: Latest News & Reviews */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0a1538] to-[#08112b] border border-blue-900/40 flex flex-col justify-between space-y-4 shadow-xl">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-blue-400" />
                  <span>Latest News &amp; Reviews</span>
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Stay Updated with the Latest benchmarks, camera tests, and PTA tax revisions.
                </p>
              </div>
              <div>
                <button
                  onClick={() => setIsAdvisorModalOpen(true)}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-600/30 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Read More</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* ====================================================================
          MODAL 1: WHATMOBILE TECHNICAL SPECIFICATIONS & PRICE HISTORY
         ==================================================================== */}
      {selectedPhoneForDetail && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#0b132b] border border-blue-900/60 rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedPhoneForDetail(null)}
              className="absolute right-5 top-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blue-900/40 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 text-[10px] font-bold">
                  {selectedPhoneForDetail.brand}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {selectedPhoneForDetail.title}
                </h2>
                <p className="text-xs text-slate-400">{selectedPhoneForDetail.tagline}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-blue-400">
                  Rs. {Number(selectedPhoneForDetail.marketLowestPrice || 0).toLocaleString('en-PK')}
                </div>
                <div className="text-[11px] text-emerald-400 font-semibold">
                  {selectedPhoneForDetail.officialPtaStatus}
                </div>
              </div>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  addToCompare(selectedPhoneForDetail);
                  setSelectedPhoneForDetail(null);
                }}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Scale className="w-4 h-4" />
                <span>Compare Specs</span>
              </button>
              <button
                onClick={() => {
                  setIsAdvisorModalOpen(true);
                  handleSendChatMessage(undefined, `Rasho Bhai, is ${selectedPhoneForDetail.title} at Rs. ${selectedPhoneForDetail.marketLowestPrice} a good deal in Pakistan?`);
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Headphones className="w-4 h-4 text-amber-400" />
                <span>Ask Rasho Bhai about this deal</span>
              </button>
            </div>

            {/* WhatMobile Technical Specs Table */}
            <WhatMobileSpecsSheet phone={selectedPhoneForDetail} />
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL 2: MULTI-PHONE COMPARISON SHEET
         ==================================================================== */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#0b132b] border border-blue-900/60 rounded-3xl w-full max-w-5xl max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setIsCompareModalOpen(false)}
              className="absolute right-5 top-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-blue-900/40 pb-4">
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Scale className="w-6 h-6 text-blue-400" />
                <span>Side-by-Side Phone Comparison</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Compare up to 3 phones across specs, PTA tax status, and current wholesale prices.
              </p>
            </div>

            {compareList.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <Scale className="w-12 h-12 text-slate-600 mx-auto" />
                <p className="text-sm text-slate-400">No phones selected for comparison yet.</p>
                <button
                  onClick={() => {
                    setIsCompareModalOpen(false);
                    if (phones.length >= 2) {
                      setCompareList([phones[0], phones[1]]);
                      setIsCompareModalOpen(true);
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold"
                >
                  Load Top 2 Flagships to Compare
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {compareList.map((p) => (
                  <div key={p.id} className="p-4 rounded-2xl bg-[#0d1630] border border-blue-900/40 space-y-3 relative">
                    <button
                      onClick={() => removeFromCompare(p.id)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <img src={p.imageUrl || p.images?.[0]} alt={p.title} className="h-32 mx-auto object-contain" />
                    <div className="font-bold text-white text-sm truncate">{p.title}</div>
                    <div className="text-lg font-black text-blue-400">
                      Rs. {Number(p.marketLowestPrice || 0).toLocaleString('en-PK')}
                    </div>
                    <div className="space-y-1.5 text-xs text-slate-300 border-t border-blue-900/30 pt-2">
                      <div><strong>Display:</strong> {p.specs.display || 'AMOLED 120Hz'}</div>
                      <div><strong>Processor:</strong> {p.specs.processor || 'Octa-Core'}</div>
                      <div><strong>Camera:</strong> {p.specs.rearCamera || '50 MP'}</div>
                      <div><strong>Battery:</strong> {p.specs.battery || '5000 mAh'}</div>
                      <div><strong>PTA:</strong> {p.officialPtaStatus}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL 3: BUY & SELL / RESALE TRADE-IN VALUATION
         ==================================================================== */}
      {isValuationModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#0b132b] border border-blue-900/60 rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setIsValuationModalOpen(false)}
              className="absolute right-5 top-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="border-b border-blue-900/40 pb-4">
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <RefreshCw className="w-6 h-6 text-emerald-400" />
                <span>Instant Phone Valuation &amp; Resale</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Calculate live market cash value in Pakistan based on Hafeez Centre &amp; Hall Road trade-in index.
              </p>
            </div>

            <form onSubmit={handleCalculateValuation} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-1">Brand</label>
                  <select
                    value={valBrand}
                    onChange={(e) => setValBrand(e.target.value)}
                    className="w-full bg-[#0d1630] border border-blue-900/40 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Samsung">Samsung</option>
                    <option value="Apple">Apple</option>
                    <option value="Xiaomi">Xiaomi</option>
                    <option value="OnePlus">OnePlus</option>
                    <option value="OPPO">OPPO</option>
                    <option value="Vivo">Vivo</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-1">Model</label>
                  <input
                    type="text"
                    value={valModel}
                    onChange={(e) => setValModel(e.target.value)}
                    className="w-full bg-[#0d1630] border border-blue-900/40 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-1">PTA Status</label>
                  <select
                    value={valPtaStatus}
                    onChange={(e) => setValPtaStatus(e.target.value as any)}
                    className="w-full bg-[#0d1630] border border-blue-900/40 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Official PTA Approved">Official PTA Approved</option>
                    <option value="Non-PTA">Non-PTA</option>
                    <option value="PTA Passport Registered">PTA Passport Registered</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-semibold block mb-1">Battery Health (%)</label>
                  <input
                    type="number"
                    value={valBatteryHealth}
                    onChange={(e) => setValBatteryHealth(Number(e.target.value))}
                    className="w-full bg-[#0d1630] border border-blue-900/40 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isValuating}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-emerald-500/20 cursor-pointer flex items-center justify-center gap-2"
              >
                {isValuating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <DollarSign className="w-4 h-4" />}
                <span>Calculate Trade-in Cash Value</span>
              </button>
            </form>

            {valuationResult && (
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-900/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Estimated Cash Trade-in:</span>
                  <span className="text-xl font-black text-emerald-400">
                    Rs. {Number(valuationResult.estimatedCashValuePKR).toLocaleString('en-PK')}
                  </span>
                </div>
                <div className="text-xs text-slate-300">{valuationResult.ptaTaxImpactDescription}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ====================================================================
          MODAL 4: RASHO BHAI CONSULTATION COUNTER (AI Mandi Advisor)
         ==================================================================== */}
      {isAdvisorModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#0b132b] border border-blue-900/60 rounded-3xl w-full max-w-2xl h-[85vh] flex flex-col shadow-2xl relative overflow-hidden">
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-blue-900/40 flex items-center justify-between bg-[#0d1630]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>Rasho Bhai's Consultation Counter</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </h3>
                  <p className="text-xs text-slate-400">Live Hafeez Centre &amp; Hall Road wholesale market intelligence</p>
                </div>
              </div>
              <button
                onClick={() => setIsAdvisorModalOpen(false)}
                className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 font-sans text-xs sm:text-sm">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-600/20'
                        : 'bg-[#0d1630] border border-blue-900/40 text-slate-200 rounded-bl-none'
                    }`}
                  >
                    <div className="font-bold text-[10px] text-blue-300 mb-1">
                      {msg.role === 'user' ? 'You' : 'Rasho Bhai (Mandi Expert)'}
                    </div>
                    <div className="whitespace-pre-wrap">{msg.text}</div>
                    <div className="text-[10px] text-slate-400 text-right mt-1.5">{msg.time}</div>
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#0d1630] border border-blue-900/40 p-3 rounded-2xl rounded-bl-none text-xs text-slate-400 flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-400" />
                    <span>Rasho Bhai is checking wholesale spot rates...</span>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendChatMessage} className="p-4 border-t border-blue-900/40 bg-[#0d1630] flex gap-2">
              <input
                type="text"
                placeholder="Ask Rasho Bhai (e.g. 50k ka phone chahye, konsa acha hai?)..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 bg-[#070b19] border border-blue-900/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={isChatLoading || !chatInput.trim()}
                className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-blue-600/30 flex items-center justify-center cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
