"use client";

import { useEffect, useState } from 'react';
import { useThemeStore } from '@/store/theme';
import { useLanguageStore } from '@/store/language';
import { TRANSLATIONS } from '@/store/translations';
import { Sun, Moon, Sprout, Clock, Globe } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setTab: (tab: string) => void;
}

export default function Header({ currentTab, setTab }: HeaderProps) {
  const { theme, toggleTheme } = useThemeStore();
  const { language, setLanguage } = useLanguageStore();
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [apiOnline, setApiOnline] = useState<boolean | null>(null);
  
  const t = TRANSLATIONS[language];

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

  // Ping existing FastAPI backend on port 8000
  useEffect(() => {
    const checkApi = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/v1/health");
        setApiOnline(res.ok);
      } catch {
        setApiOnline(false);
      }
    };
    checkApi();
    const interval = setInterval(checkApi, 5000);
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
        {/* API Status badge */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
          <span>{t.api_status}:</span>
          {apiOnline === null ? (
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
          ) : apiOnline ? (
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> {t.api_online}
            </span>
          ) : (
            <span className="flex items-center gap-1 text-rose-500 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> {t.api_offline}
            </span>
          )}
        </div>

        {/* Live Clock */}
        <div className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-muted)] font-medium">
          <Clock size={14} className="text-emerald-500" />
          <span>{dateStr}</span>
          <span className="text-[var(--text-main)] font-semibold border-l border-[var(--border-color)] pl-2.5">{timeStr}</span>
        </div>

        {/* Language selector */}
        <div className="flex items-center gap-1 border border-[var(--border-color)] bg-[var(--bg-card)] rounded-lg px-2 py-1.5">
          <Globe size={14} className="text-emerald-500" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'mr')}
            className="bg-transparent text-xs text-[var(--text-main)] font-bold focus:outline-none cursor-pointer"
          >
            <option value="en">English</option>
            <option value="mr">मराठी</option>
          </select>
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
