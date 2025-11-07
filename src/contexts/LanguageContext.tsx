"use client";

import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import en from '@/locales/en.json';
import pt from '@/locales/pt.json';
import de from '@/locales/de.json';

type Language = 'en' | 'pt' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
}

const translations: Record<Language, any> = { en, pt, de };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('pt');

  const setLanguage = (lang: string) => {
    if (lang === 'en' || lang === 'pt' || lang === 'de') {
      setLanguageState(lang as Language);
    }
  };

  const t = useCallback((key: string): string => {
    const keys = key.split('.');
    let result = translations[language];
    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        // Fallback to English if translation is missing
        let fallbackResult = translations['en'];
        for (const fk of keys) {
            fallbackResult = fallbackResult?.[fk];
            if(fallbackResult === undefined) return key;
        }
        return fallbackResult || key;
      }
    }
    return result;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
