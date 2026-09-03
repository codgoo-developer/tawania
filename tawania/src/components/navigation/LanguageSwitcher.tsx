import React from 'react';
import { useI18n } from '../../i18n';

export const LanguageSwitcher: React.FC<{ isScrolled?: boolean }> = () => {
  const { locale, setLocale } = useI18n();

  return (
    <div
      id="lang-switcher-pill"
      className="inline-flex items-center rounded-full bg-[#F7F8F6] p-1 border border-[#12332B]/10 text-xs font-semibold"
    >
      <button
        type="button"
        onClick={() => setLocale('ar')}
        className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
          locale === 'ar'
            ? 'bg-gradient-to-br from-[#0B6B4F] to-[#095B42] text-white shadow-xs'
            : 'text-[#68736F] hover:text-[#0B6B4F]'
        }`}
      >
        AR
      </button>
      <button
        type="button"
        onClick={() => setLocale('en')}
        className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
          locale === 'en'
            ? 'bg-gradient-to-br from-[#0B6B4F] to-[#095B42] text-white shadow-xs'
            : 'text-[#68736F] hover:text-[#0B6B4F]'
        }`}
      >
        EN
      </button>
    </div>
  );
};
