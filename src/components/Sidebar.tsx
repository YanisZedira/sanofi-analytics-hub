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
          <svg width="120" height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-900">
            <path d="M12.5 18.5C12.5 21.5 10.5 23.5 7.5 23.5C4.5 23.5 2.5 21.5 2.5 18.5V13.5H0V18.5C0 23 3 26 7.5 26C12 26 15 23 15 18.5V13.5H12.5V18.5Z" fill="currentColor"/>
            <path d="M25 13.5H22.5V15.5C21.5 14 19.5 13.5 18 13.5C14.5 13.5 12 16 12 19.5C12 23 14.5 25.5 18 25.5C19.5 25.5 21.5 25 22.5 23.5V25.5H25V13.5ZM18.5 23C16.5 23 15 21.5 15 19.5C15 17.5 16.5 16 18.5 16C20.5 16 22 17.5 22 19.5C22 21.5 20.5 23 18.5 23Z" fill="currentColor"/>
            <path d="M35 13.5H32.5V15.5C31.5 14 29.5 13.5 28 13.5C24.5 13.5 22 16 22 19.5C22 23 24.5 25.5 28 25.5C29.5 25.5 31.5 25 32.5 23.5V25.5H35V13.5ZM28.5 23C26.5 23 25 21.5 25 19.5C25 17.5 26.5 16 28.5 16C30.5 16 32 17.5 32 19.5C32 21.5 30.5 23 28.5 23Z" fill="currentColor"/>
            <path d="M45 13.5H42.5V15.5C41.5 14 39.5 13.5 38 13.5C34.5 13.5 32 16 32 19.5C32 23 34.5 25.5 38 25.5C39.5 25.5 41.5 25 42.5 23.5V25.5H45V13.5ZM38.5 23C36.5 23 35 21.5 35 19.5C35 17.5 36.5 16 38.5 16C40.5 16 42 17.5 42 19.5C42 21.5 40.5 23 38.5 23Z" fill="currentColor"/>
            <path d="M55 13.5H52.5V15.5C51.5 14 49.5 13.5 48 13.5C44.5 13.5 42 16 42 19.5C42 23 44.5 25.5 48 25.5C49.5 25.5 51.5 25 52.5 23.5V25.5H55V13.5ZM48.5 23C46.5 23 45 21.5 45 19.5C45 17.5 46.5 16 48.5 16C50.5 16 52 17.5 52 19.5C52 21.5 50.5 23 48.5 23Z" fill="currentColor"/>
            <path d="M65 13.5H62.5V15.5C61.5 14 59.5 13.5 58 13.5C54.5 13.5 52 16 52 19.5C52 23 54.5 25.5 58 25.5C59.5 25.5 61.5 25 62.5 23.5V25.5H65V13.5ZM58.5 23C56.5 23 55 21.5 55 19.5C55 17.5 56.5 16 58.5 16C60.5 16 62 17.5 62 19.5C62 21.5 60.5 23 58.5 23Z" fill="currentColor"/>
            <circle cx="2.5" cy="23.5" r="2.5" fill="#7A00E6"/>
            <circle cx="62.5" cy="13.5" r="2.5" fill="#7A00E6"/>
          </svg>
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
