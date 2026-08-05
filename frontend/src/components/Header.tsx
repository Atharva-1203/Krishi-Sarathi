"use client";

import { useEffect, useState } from 'react';
import { useThemeStore } from '@/store/theme';
import { Sun, Moon, Sprout, Clock } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setTab: (tab: string) => void;
}

export default function Header({ currentTab, setTab }: HeaderProps) {
  const { theme, toggleTheme } = useThemeStore();
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeStr(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setDateStr(d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[var(--border-color)] bg-[var(--bg-glass)] backdrop-blur-md px-6 py-4 transition-colors duration-300">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setTab('landing')}>
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 text-white shadow-md shadow-emerald-500/20">
          <Sprout size={22} className="animate-pulse" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[var(--text-main)] flex items-center gap-1.5">
            Krishi Sarathi
          </h1>
          <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 Sanskrit tracking-wider">
            ज्ञानसमन्विता कृषिः समृद्धये।
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* Live Clock */}
        <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-muted)] font-medium">
          <Clock size={14} className="text-emerald-500" />
          <span>{dateStr}</span>
          <span className="text-[var(--text-main)] font-semibold border-l border-[var(--border-color)] pl-2.5">{timeStr}</span>
          <span className="text-[10px] text-emerald-600 bg-emerald-500/10 px-1 rounded">IST</span>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] hover:bg-[var(--bg-hover)] text-[var(--text-main)] transition-colors cursor-pointer"
          title="Toggle Theme"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>
    </header>
  );
}
