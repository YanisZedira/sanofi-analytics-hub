import React from 'react';
import { 
  LayoutDashboard, 
  FlaskConical, 
  Globe, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronRight
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pipeline', label: 'R&D Pipeline', icon: FlaskConical },
    { id: 'financials', label: 'Financials', icon: BarChart3 },
    { id: 'global', label: 'Global Operations', icon: Globe },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0 z-20">
      <div className="p-8">
        <div className="flex items-center gap-2 mb-8">
          <img 
  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Logo_Sanofi_%282022%29.png/1280px-Logo_Sanofi_%282022%29.png" 
  alt="Sanofi Logo" 
  className="h-8 w-auto" 
  referrerPolicy="no-referrer"
/>
          
          <span className="text-[10px] font-bold bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 ml-1">HUB</span>
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
        <button className="sidebar-item w-full text-slate-500 hover:text-slate-900 mb-2">
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </button>
        <button className="sidebar-item w-full text-red-500 hover:bg-red-50">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
      <div className="mt-auto pt-6 border-t border-slate-200">
  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold mb-1">Developed by</p>
  <p className="text-sm font-bold text-slate-900 tracking-tight">YANIS ZEDIRA</p>
</div>
      
    </aside>
  );
}
