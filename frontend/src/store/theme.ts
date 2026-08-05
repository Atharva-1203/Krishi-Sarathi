import { create } from 'zustand';

interface ThemeState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'dark', // Premium dark mode by default
  toggleTheme: () => set((state) => {
    const next = state.theme === 'light' ? 'dark' : 'light';
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', next);
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(next);
    }
    return { theme: next };
  }),
  setTheme: (theme) => set(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
    }
    return { theme };
  })
}));
