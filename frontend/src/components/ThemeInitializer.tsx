"use client";

import { useEffect } from 'react';
import { useThemeStore } from '@/store/theme';

export default function ThemeInitializer() {
  const { setTheme } = useThemeStore();

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initialTheme = saved || 'dark';
    setTheme(initialTheme);
  }, [setTheme]);

  return null;
}
