// ==============================================================================
// LOCALIZATION PROVIDER (हिन्दी, English)
// Default Language: Hindi ('hi')
// Persisted across sessions via AsyncStorage
// ==============================================================================

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations } from '../localization/translations';

export type AppLanguage = 'hi' | 'en' | 'gu';

const LANGUAGE_STORAGE_KEY = '@chhatrachhaya_language';

interface LanguageContextType {
  language: AppLanguage;
  setLanguage: (lang: AppLanguage) => Promise<void>;
  t: (key: string, fallback?: string) => string;
  isEnglish: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'hi',
  setLanguage: async () => {},
  t: (key: string, fallback?: string) => fallback || key,
  isEnglish: false,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<AppLanguage>('hi');

  // Load persisted language on app startup
  useEffect(() => {
    const loadStoredLanguage = async () => {
      try {
        const storedLang = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (storedLang === 'en' || storedLang === 'hi' || storedLang === 'gu') {
          setLanguageState(storedLang as AppLanguage);
        }
      } catch (e) {
        console.warn('Error loading language from storage:', e);
      }
    };
    loadStoredLanguage();
  }, []);

  const setLanguage = async (lang: AppLanguage) => {
    try {
      setLanguageState(lang);
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch (e) {
      console.warn('Error saving language to storage:', e);
    }
  };

  const t = useCallback(
    (key: string, fallback?: string): string => {
      const activeLang = language === 'en' ? 'en' : 'hi';
      const dict = translations[activeLang];
      if (dict && dict[key]) {
        return dict[key];
      }
      // Fallback to Hindi translation if key exists in Hindi
      if (translations.hi && translations.hi[key]) {
        return translations.hi[key];
      }
      return fallback || key;
    },
    [language]
  );

  const isEnglish = language === 'en';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isEnglish }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
