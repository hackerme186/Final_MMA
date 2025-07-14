import React, { createContext, useContext, useState } from 'react';

interface AppContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  language: 'en' | 'vi';
  setLanguage: (lang: 'en' | 'vi') => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [language, setLanguageState] = useState<'en' | 'vi'>('en');
  const [isLoading, setIsLoading] = useState(false);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const setLanguage = (lang: 'en' | 'vi') => {
    setLanguageState(lang);
  };

  const value = {
    theme,
    toggleTheme,
    language,
    setLanguage,
    isLoading,
    setIsLoading,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
