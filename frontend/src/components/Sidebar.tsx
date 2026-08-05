"use client";

import { Home, Sprout, Map, BarChart3, ChevronRight } from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setTab: (tab: string) => void;
}

export default function Sidebar({ currentTab, setTab }: SidebarProps) {
  const menuItems = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Analysis Engine', icon: Sprout },
    { id: 'insights', label: 'Maharashtra Map', icon: Map },
    { id: 'analytics', label: 'ML Analytics', icon: BarChart3 }
  ];

  return (
    <aside className="w-64 border-r border-[var(--border-color)] bg-[var(--bg-card)] p-4 flex flex-col justify-between hidden md:flex transition-colors duration-300">
      <div className="flex flex-col gap-6">
        <div className="text-[11px] font-bold text-[var(--text-muted)] tracking-widest uppercase pl-3">
          Navigation
        </div>
        <nav className="flex flex-col gap-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-emerald-600 to-green-500 text-white shadow-md shadow-emerald-500/10'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-hover)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
                {active && <ChevronRight size={14} className="animate-ping" />}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="p-3 rounded-xl border border-dashed border-emerald-500/20 bg-emerald-500/5 text-center">
        <div className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
          Motto
        </div>
        <div className="text-xs font-bold text-[var(--text-main)] tracking-wide mt-1">
          शाश्वत शेती – समृद्ध शेतकरी
        </div>
        <div className="text-[9px] text-[var(--text-muted)] italic">
          Sustainable Farming – Prosperous Farmer
        </div>
      </div>
    </aside>
  );
}
