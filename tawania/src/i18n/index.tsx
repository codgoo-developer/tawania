import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ar } from './ar';
import { en } from './en';
import { Locale, LocalizedString } from '../types';

const STORAGE_LOCALE_KEY = 'tawania_locale';

interface I18nContextType {
  locale: Locale;
  t: typeof ar;
  dir: 'rtl' | 'ltr';
  setLocale: (newLocale: Locale) => void;
  getLocalized: (obj?: LocalizedString | null) => string;
  getLocalizedPath: (path: string, targetLocale?: Locale) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Read saved locale from localStorage (defaulting to 'ar')
  const [locale, setLocaleState] = useState<Locale>(() => {
    try {
      // Check path first if user typed /ar or /en in URL
      const pathParts = window.location.pathname.split('/').filter(Boolean);
      if (pathParts[0] === 'en') return 'en';
      if (pathParts[0] === 'ar') return 'ar';

      const saved = localStorage.getItem(STORAGE_LOCALE_KEY);
      if (saved === 'en' || saved === 'ar') return saved;
    } catch { }
    return 'ar';
  });

  // Handle legacy /ar or /en in URL by saving locale and stripping it from URL
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/ar') || path.startsWith('/en')) {
      const isEn = path.startsWith('/en');
      const targetLocale: Locale = isEn ? 'en' : 'ar';
      let cleanPath = path.replace(/^\/(ar|en)/, '') || '/';
      if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;
      
      setLocaleState(targetLocale);
      try {
        localStorage.setItem(STORAGE_LOCALE_KEY, targetLocale);
      } catch { }
      
      navigate(`${cleanPath}${location.search}${location.hash}`, { replace: true });
    }
  }, [location.pathname, location.search, location.hash, navigate]);

  // Update HTML dir and lang tags whenever locale changes
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem(STORAGE_LOCALE_KEY, locale);
    } catch { }
  }, [locale]);

  const t = locale === 'en' ? en : ar;
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  const getLocalized = (obj?: LocalizedString | null): string => {
    if (!obj) return '';
    return obj[locale] || obj.ar || '';
  };

  // Clean direct path (no /ar or /en prefix in URLs)
  const getLocalizedPath = (path: string): string => {
    let cleanPath = path;
    if (cleanPath.startsWith('/ar/')) cleanPath = cleanPath.substring(3);
    else if (cleanPath.startsWith('/en/')) cleanPath = cleanPath.substring(3);
    else if (cleanPath === '/ar' || cleanPath === '/en') cleanPath = '/';

    if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;
    return cleanPath;
  };

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_LOCALE_KEY, newLocale);
    } catch { }
  };

  const value = useMemo(() => ({
    locale,
    t,
    dir,
    setLocale,
    getLocalized,
    getLocalizedPath,
  }), [locale, t, dir]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
