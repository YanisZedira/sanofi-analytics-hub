import React from 'react';
import { 
  LayoutDashboard, 
  FlaskConical, 
  Globe, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronRight,
  Languages
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { translations, type Language } from '../translations';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onLogout: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, language, setLanguage, onLogout }: SidebarProps) {
  const t = translations[language];

  const menuItems = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'pipeline', label: t.pipeline, icon: FlaskConical },
    { id: 'financials', label: t.financials, icon: BarChart3 },
    { id: 'global', label: t.global, icon: Globe },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0 z-20">
      <div className="p-8">
        <div className="flex items-center gap-2 mb-8">
          <img 
  src="https://upload.wikimedia.org/wikipedia/fr/thumb/b/b4/Logo_Sanofi_-_2022.svg/1920px-Logo_Sanofi_-_2022.svg.png?_=20220304184055" 
  alt="Sanofi Logo" 
  className="h-8 w-auto" 
  referrerPolicy="no-referrer"
/>
          <span className="text-[10px] font-bold bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 ml-1">{t.hub}</span>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "sidebar-item w-full",
                activeTab === item.id ? "sidebar-item-active" : "text-slate-500 hover:text-slate-900"
              )}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
              {activeTab === item.id && <ChevronRight size={16} className="ml-auto" />}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-8 border-t border-slate-100">
        <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{t.developedBy}</p>
          <p className="text-sm font-black text-slate-900">YANIS ZEDIRA</p>
          <a 
            href="https://yaniszedira.github.io/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[10px] text-sanofi-purple font-bold hover:underline mt-1 block"
          >
            {t.viewPortfolio} →
          </a>
        </div>
        
        <div className="flex gap-2 mb-4">
          <button 
            onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
            className="sidebar-item w-full text-slate-500 hover:text-slate-900"
          >
            <Languages size={20} />
            <span className="font-medium">{language === 'en' ? 'Français' : 'English'}</span>
          </button>
        </div>

        <button 
          onClick={() => setActiveTab('settings')}
          className={cn(
            "sidebar-item w-full mb-2",
            activeTab === 'settings' ? "sidebar-item-active" : "text-slate-500 hover:text-slate-900"
          )}
        >
          <Settings size={20} />
          <span className="font-medium">{t.settings}</span>
        </button>
        <button 
          onClick={onLogout}
          className="sidebar-item w-full text-red-500 hover:bg-red-50"
        >
          <LogOut size={20} />
          <span className="font-medium">{t.logout}</span>
        </button>
      </div>
    </aside>
  );
}
