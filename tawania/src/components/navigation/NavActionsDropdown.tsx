import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useI18n } from '../../i18n';

export const NavActionsDropdown: React.FC = () => {
  const { locale, setLocale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLocale = (newLocale: 'ar' | 'en') => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-start" ref={dropdownRef}>
      {/* Language Switcher Trigger Button */}
      <button
        type="button"
        id="nav-language-dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        title={locale === 'ar' ? 'تغيير اللغة' : 'Change Language'}
        className={`h-8 flex items-center gap-1.5 px-3 rounded-full text-xs font-bold transition-all duration-200 border shadow-2xs cursor-pointer select-none group ${
          isOpen
            ? 'bg-[#EBF4F0] border-[#0B6B4F]/40 text-[#0B6B4F] ring-2 ring-[#0B6B4F]/10'
            : 'bg-[#F7F8F6] hover:bg-[#EBF4F0] border-[#12332B]/10 text-[#17211E]'
        }`}
      >
        <Globe className="w-3.5 h-3.5 text-[#0B6B4F] group-hover:rotate-12 transition-transform" />
        
        <span className="font-mono text-[11px] uppercase tracking-wide text-[#0B6B4F] font-black">
          {locale === 'ar' ? 'العربية' : 'English'}
        </span>

        <ChevronDown
          className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#0B6B4F]' : 'group-hover:text-gray-600'
          }`}
        />
      </button>

      {/* Language Options Dropdown */}
      {isOpen && (
        <div className="absolute top-full end-0 mt-2 w-48 bg-white rounded-2xl border border-gray-200 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 origin-top-right text-start">
          <div className="px-3 pt-2 pb-1.5 text-[10px] font-black uppercase text-gray-400 tracking-wider">
            {locale === 'ar' ? 'اختر لغة العرض' : 'Select Language'}
          </div>

          <div className="space-y-1">
            {/* Arabic */}
            <button
              type="button"
              onClick={() => handleSelectLocale('ar')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                locale === 'ar'
                  ? 'bg-[#EBF4F0] text-[#0B6B4F]'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100/70 text-[#0B6B4F] flex items-center justify-center text-[10px] font-mono font-bold">
                  ع
                </span>
                <span>العربية (AR)</span>
              </div>
              {locale === 'ar' && <Check className="w-4 h-4 text-[#0B6B4F]" />}
            </button>

            {/* English */}
            <button
              type="button"
              onClick={() => handleSelectLocale('en')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                locale === 'en'
                  ? 'bg-[#EBF4F0] text-[#0B6B4F]'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100/70 text-[#0B6B4F] flex items-center justify-center text-[10px] font-mono font-bold">
                  EN
                </span>
                <span>English (EN)</span>
              </div>
              {locale === 'en' && <Check className="w-4 h-4 text-[#0B6B4F]" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
