import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Pipeline from './components/Pipeline';
import Financials from './components/Financials';
import ChatBot from './components/ChatBot';
import { Bell, Search, User, ExternalLink, Linkedin, Globe as GlobeIcon, ChevronDown, ChevronUp, MapPin, Users, Briefcase, X, Sparkles, LogOut, Settings as SettingsIcon, Shield, Moon, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { mockData } from './data';
import { Map, Marker, ZoomControl } from 'pigeon-maps';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { translations, type Language } from './translations';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function Login({ onLogin, language, setLanguage }: { onLogin: () => void, language: Language, setLanguage: (l: Language) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sanofi-purple/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />
      </div>

      <div className="absolute top-8 right-8 flex gap-2">
        <button 
          onClick={() => setLanguage('en')}
          className={cn("px-3 py-1 rounded-lg text-xs font-bold transition-all", language === 'en' ? "bg-white text-slate-900" : "bg-white/10 text-white hover:bg-white/20")}
        >
          EN
        </button>
        <button 
          onClick={() => setLanguage('fr')}
          className={cn("px-3 py-1 rounded-lg text-xs font-bold transition-all", language === 'fr' ? "bg-white text-slate-900" : "bg-white/10 text-white hover:bg-white/20")}
        >
          FR
        </button>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative"
      >
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[32px] shadow-2xl">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-sanofi-purple rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-sanofi-purple/40">
              <Sparkles size={32} />
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">{t.loginTitle}</h1>
            <p className="text-slate-400 text-sm">{t.loginSubtitle}</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">{t.username}</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-sanofi-purple/50 transition-all"
                placeholder="e.g., admin@sanofi.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">{t.password}</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-sanofi-purple/50 transition-all"
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-sanofi-purple hover:bg-sanofi-purple/90 text-white font-bold py-4 rounded-2xl shadow-xl shadow-sanofi-purple/20 transition-all active:scale-95 mt-4"
            >
              {t.signIn}
            </button>
          </form>
          
          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-black">
              {t.developedBy} <span className="text-white">Yanis Zedira</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [language, setLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);
  const [expandedCountryId, setExpandedCountryId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCountry, setModalCountry] = useState<any>(null);
  const autocompleteRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const t = translations[language];

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('dashboard');
  };

  const searchResults = searchQuery.length > 1 ? [
    ...mockData.pipeline.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).map(p => ({ type: 'Pipeline', name: p.name, tab: 'pipeline' })),
    ...mockData.countries.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())).map(c => ({ type: 'Region', name: c.name, tab: 'global' })),
    ...mockData.metrics.filter(m => m.label.toLowerCase().includes(searchQuery.toLowerCase())).map(m => ({ type: 'Metric', name: m.label, tab: 'dashboard' }))
  ].slice(0, 5) : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
        setShowAutocomplete(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAutocompleteClick = (tab: string) => {
    setActiveTab(tab);
    setSearchQuery('');
    setShowAutocomplete(false);
  };

  const handleCountrySelect = (id: string) => {
    setSelectedCountryId(id);
    setExpandedCountryId(id);
    const country = mockData.countries.find(c => c.id === id);
    if (country) {
      setModalCountry(country);
      setIsModalOpen(true);
    }
    // Scroll to the country in the list
    const element = document.getElementById(`country-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => 
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className="bg-sanofi-purple/20 text-sanofi-purple rounded px-0.5">{part}</span>
          ) : part
        )}
      </span>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard language={language} />;
      case 'pipeline': return <Pipeline language={language} />;
      case 'financials': return <Financials language={language} />;
      case 'global': return (
        <div className="space-y-8">
          <header>
            <h1 className="text-3xl font-bold text-slate-900">{t.global}</h1>
            <p className="text-slate-500 mt-1">{t.interactiveMap}</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Map Section */}
            <div className="lg:col-span-2 glass-card overflow-hidden h-[600px] relative">
              <Map 
                height={600} 
                defaultCenter={[20, 0]} 
                defaultZoom={2}
                metaWheelZoom={true}
              >
                <ZoomControl />
                {mockData.countries.map((country) => (
                  <Marker 
                    key={country.id}
                    width={selectedCountryId === country.id ? 40 : 30}
                    anchor={country.coordinates} 
                    color={selectedCountryId === country.id ? '#7A00E6' : '#94a3b8'}
                    onClick={() => handleCountrySelect(country.id)}
                  />
                ))}
              </Map>
              
              {/* Map Overlay Tooltip */}
              <AnimatePresence>
                {selectedCountryId && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-sanofi-purple/20 z-10 flex justify-between items-center"
                  >
                    <div>
                      <h4 className="font-bold text-slate-900">{mockData.countries.find(c => c.id === selectedCountryId)?.name}</h4>
                      <p className="text-xs text-slate-500">{t.revenue}: <span className="font-bold text-sanofi-purple">{mockData.countries.find(c => c.id === selectedCountryId)?.revenue}</span></p>
                    </div>
                    <button 
                      onClick={() => setSelectedCountryId(null)}
                      className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                    >
                      <ExternalLink size={16} className="text-slate-400" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Country List Section */}
            <div className="glass-card flex flex-col h-[600px]">
              <div className="p-6 border-b border-slate-100">
                <h3 className="font-bold text-lg">{t.strategicHubs}</h3>
                <p className="text-xs text-slate-500 mt-1">{t.clickToExplore}</p>
              </div>
              <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3">
                {mockData.countries.map((country) => (
                  <div 
                    key={country.id}
                    id={`country-${country.id}`}
                    className={cn(
                      "p-4 rounded-2xl border transition-all duration-300 cursor-pointer",
                      selectedCountryId === country.id 
                        ? "bg-sanofi-purple/5 border-sanofi-purple/30 shadow-sm" 
                        : "bg-white border-slate-100 hover:border-slate-200"
                    )}
                    onClick={() => {
                      setSelectedCountryId(country.id);
                      setExpandedCountryId(expandedCountryId === country.id ? null : country.id);
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center",
                          selectedCountryId === country.id ? "bg-sanofi-purple text-white" : "bg-slate-100 text-slate-400"
                        )}>
                          <MapPin size={16} />
                        </div>
                        <h4 className="font-bold text-slate-900">{country.name}</h4>
                      </div>
                      {expandedCountryId === country.id ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
                    </div>

                    <AnimatePresence>
                      {expandedCountryId === country.id && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-slate-50 p-3 rounded-xl">
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase mb-1">
                                  <Users size={12} /> {t.employees}
                                </div>
                                <p className="text-sm font-bold text-slate-900">{country.employees.toLocaleString()}</p>
                              </div>
                              <div className="bg-slate-50 p-3 rounded-xl">
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase mb-1">
                                  <Briefcase size={12} /> {t.revenue}
                                </div>
                                <p className="text-sm font-bold text-sanofi-purple">{country.revenue}</p>
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{t.keyTreatments}</p>
                              <div className="flex flex-wrap gap-1.5">
                                {country.treatments.map(t => (
                                  <span key={t} className="text-[10px] bg-sanofi-purple/10 text-sanofi-purple px-2 py-0.5 rounded-full font-medium">{t}</span>
                                ))}
                              </div>
                            </div>

                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{t.operations}</p>
                              <ul className="space-y-1">
                                {country.services.map(s => (
                                  <li key={s} className="text-xs text-slate-600 flex items-center gap-2">
                                    <div className="w-1 h-1 bg-sanofi-purple rounded-full" />
                                    {s}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
      case 'settings': return (
        <div className="space-y-8">
          <header>
            <h1 className="text-3xl font-bold text-slate-900">{t.settings}</h1>
            <p className="text-slate-500 mt-1">{t.settingsDescription}</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-card p-8">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <User size={20} className="text-sanofi-purple" />
                  {t.profile}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">{t.fullName}</label>
                    <input type="text" defaultValue="Yanis Zedira" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sanofi-purple/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">{t.emailAddress}</label>
                    <input type="email" defaultValue="y.zedira@sanofi.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sanofi-purple/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">{t.department}</label>
                    <input type="text" defaultValue="Global Strategic Analytics" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sanofi-purple/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">{t.location}</label>
                    <input type="text" defaultValue="Paris, France" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sanofi-purple/20" />
                  </div>
                </div>
                <button className="mt-8 bg-sanofi-purple text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-sanofi-purple/20 hover:bg-sanofi-purple/90 transition-all">
                  {t.saveChanges}
                </button>
              </div>

              <div className="glass-card p-8">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <GlobeIcon size={20} className="text-sanofi-purple" />
                  {t.language}
                </h3>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setLanguage('en')}
                    className={cn(
                      "flex-1 p-4 rounded-2xl border transition-all flex items-center justify-center gap-3",
                      language === 'en' ? "bg-sanofi-purple/5 border-sanofi-purple text-sanofi-purple" : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                    )}
                  >
                    <span className="text-xl">🇺🇸</span>
                    <span className="font-bold">English</span>
                  </button>
                  <button 
                    onClick={() => setLanguage('fr')}
                    className={cn(
                      "flex-1 p-4 rounded-2xl border transition-all flex items-center justify-center gap-3",
                      language === 'fr' ? "bg-sanofi-purple/5 border-sanofi-purple text-sanofi-purple" : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                    )}
                  >
                    <span className="text-xl">🇫🇷</span>
                    <span className="font-bold">Français</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass-card p-8">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Shield size={20} className="text-sanofi-purple" />
                  {t.security}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                    <div>
                      <p className="text-sm font-bold">{t.twoFactorAuth}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">{t.enabled}</p>
                    </div>
                    <div className="w-10 h-6 bg-sanofi-purple rounded-full relative p-1">
                      <div className="w-4 h-4 bg-white rounded-full absolute right-1" />
                    </div>
                  </div>
                  <button className="w-full py-3 text-sm font-bold text-slate-600 hover:text-sanofi-purple transition-colors">
                    {t.changePassword}
                  </button>
                </div>
              </div>

              <div className="glass-card p-8 bg-rose-50 border-rose-100">
                <h3 className="text-lg font-bold text-rose-900 mb-4 flex items-center gap-2">
                  <LogOut size={20} />
                  {t.session}
                </h3>
                <p className="text-xs text-rose-600 mb-6">{t.logoutDescription}</p>
                <button 
                  onClick={handleLogout}
                  className="w-full bg-rose-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-rose-600/20 hover:bg-rose-700 transition-all"
                >
                  {t.logout}
                </button>
              </div>
            </div>
          </div>
        </div>
      );
      default: return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} language={language} setLanguage={setLanguage} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} language={language} setLanguage={setLanguage} onLogout={handleLogout} />
      
      <main className="flex-1 ml-64 p-8 lg:p-12 pb-24">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-12">
          <div className="relative w-96" ref={autocompleteRef}>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowAutocomplete(true);
              }}
              onFocus={() => setShowAutocomplete(true)}
              placeholder={t.searchPlaceholder} 
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-sanofi-purple/20 outline-none transition-all"
            />
            
            <AnimatePresence>
              {showAutocomplete && searchResults.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden"
                >
                  {searchResults.map((result, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAutocompleteClick(result.tab)}
                      className="w-full px-4 py-3 text-left hover:bg-slate-50 flex items-center justify-between group"
                    >
                      <div>
                        <p className="text-sm font-bold text-slate-900">{highlightMatch(result.name, searchQuery)}</p>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">{result.type}</p>
                      </div>
                      <ExternalLink size={14} className="text-slate-300 group-hover:text-sanofi-purple transition-colors" />
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-500 hover:bg-slate-50 relative">
              <Bell size={20} />
              <div className="absolute top-3 right-3 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
            </button>
            <div className="h-10 w-[1px] bg-slate-200 mx-2" />
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">Yanis Zedira</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Data Analyst / Engineer</p>
                <div className="flex gap-2 mt-1 justify-end">
                  <a href="https://www.linkedin.com/in/yaniszedira/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sanofi-purple transition-colors">
                    <Linkedin size={14} />
                  </a>
                  <a href="https://yaniszedira.github.io/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sanofi-purple transition-colors">
                    <GlobeIcon size={14} />
                  </a>
                </div>
              </div>
              <div className="w-12 h-12 bg-sanofi-purple rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sanofi-purple/20 overflow-hidden border-2 border-white">
                <img 
                  src="https://raw.githubusercontent.com/yaniszedira/yaniszedira.github.io/main/assets/img/profile.jpg" 
                  alt="Yanis Zedira" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://picsum.photos/seed/yanis/100/100";
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <ChatBot language={language} />

      {/* Creator Badge */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] group"
      >
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-sanofi-purple to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative px-6 py-3 bg-white border border-slate-200 rounded-2xl flex items-center gap-3 shadow-2xl">
            <div className="w-2 h-2 bg-sanofi-purple rounded-full animate-pulse" />
            <span className="text-xs font-black text-slate-900 uppercase tracking-widest">
              {t.by} <span className="text-sanofi-purple">Yanis Zedira</span>
            </span>
          </div>
        </div>
      </motion.div>

      {/* Global Modal */}
      <AnimatePresence>
        {isModalOpen && modalCountry && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="bg-sanofi-purple p-8 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={20} className="text-white/60" />
                      <span className="text-xs font-bold uppercase tracking-widest text-white/60">{t.strategicHub}</span>
                    </div>
                    <h2 className="text-4xl font-bold tracking-tight">{modalCountry.name}</h2>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
              
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{t.keyMetrics}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 p-4 rounded-2xl">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{t.revenue}</p>
                        <p className="text-xl font-bold text-sanofi-purple">{modalCountry.revenue}</p>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{t.employees}</p>
                        <p className="text-xl font-bold text-slate-900">{modalCountry.employees.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{t.operations}</h4>
                    <div className="space-y-2">
                      {modalCountry.services.map((s: string) => (
                        <div key={s} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                          <div className="w-2 h-2 bg-sanofi-purple rounded-full" />
                          <span className="text-sm font-medium text-slate-700">{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{t.keyTreatments}</h4>
                    <div className="flex flex-wrap gap-2">
                      {modalCountry.treatments.map((t: string) => (
                        <span key={t} className="px-4 py-2 bg-sanofi-purple/10 text-sanofi-purple rounded-xl text-sm font-bold border border-sanofi-purple/10">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-slate-900 rounded-3xl text-white">
                    <h4 className="text-sm font-bold mb-2 flex items-center gap-2">
                      <Sparkles size={16} className="text-sanofi-purple" />
                      {t.strategicInsight}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {language === 'en' ? 
                        `${modalCountry.name} represents a critical node in our global value chain. Our focus here is on ${modalCountry.services[0].toLowerCase()} to drive long-term sustainable growth.` :
                        `${modalCountry.name} représente un nœud critique de notre chaîne de valeur mondiale. Notre objectif ici est de mettre l'accent sur ${modalCountry.services[0].toLowerCase()} pour stimuler une croissance durable à long terme.`
                      }
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
