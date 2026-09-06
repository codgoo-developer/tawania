import React from 'react';
import { Globe } from 'lucide-react';
import { useI18n } from '../../i18n';

export const NavActionsDropdown: React.FC = () => {
  const { locale, setLocale } = useI18n();

  const handleToggleLocale = () => {
    setLocale(locale === 'ar' ? 'en' : 'ar');
  };

  return (
    <button
      type="button"
      id="nav-language-toggle"
      onClick={handleToggleLocale}
      title={locale === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
      className="h-8 flex items-center gap-1.5 px-2.5 sm:px-3 rounded-full text-xs font-bold transition-all duration-200 border border-[#12332B]/10 bg-[#F7F8F6] hover:bg-[#EBF4F0] hover:border-[#0B6B4F]/30 text-[#17211E] hover:text-[#0B6B4F] shadow-2xs cursor-pointer select-none group shrink-0"
    >
      <Globe className="w-3.5 h-3.5 text-[#0B6B4F] group-hover:rotate-45 transition-transform duration-300" />
      <span className="font-mono text-[11px] uppercase tracking-wide text-[#0B6B4F] font-black">
        {locale === 'ar' ? 'EN' : 'العربية'}
      </span>
    </button>
  );
};
