import { create } from 'zustand';

export type Language = 'en' | 'mr';

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: 'en',
  setLanguage: (lang) => set(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
    return { language: lang };
  })
}));
