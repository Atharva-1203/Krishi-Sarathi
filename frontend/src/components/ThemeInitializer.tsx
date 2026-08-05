"use client";

import { useEffect } from 'react';
import { useThemeStore } from '@/store/theme';
import { useLanguageStore } from '@/store/language';

export default function ThemeInitializer() {
  const { setTheme } = useThemeStore();
  const { setLanguage } = useLanguageStore();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    setTheme(savedTheme || 'dark');
    
    const savedLang = localStorage.getItem('language') as 'en' | 'mr' | null;
    setLanguage(savedLang || 'en');
  }, [setTheme, setLanguage]);

  return null;
}
