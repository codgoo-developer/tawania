import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useI18n } from '../../i18n';
import { useGovernanceData } from '../../context/GovernanceDataContext';

export const FloatingWhatsApp: React.FC = () => {
  const { t, locale } = useI18n();
  const { contactSettings } = useGovernanceData();

  const rawPhone = contactSettings?.whatsappPhone || contactSettings?.phone || '966504284861';
  const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
  const formattedPhone = cleanPhone.startsWith('0') ? `966${cleanPhone.slice(1)}` : (cleanPhone.startsWith('966') ? cleanPhone : `966${cleanPhone}`);

  const defaultMessage = locale === 'ar' 
    ? 'مرحباً، أود الاستفسار عن خدمات ومشاريع جمعية الشامل التعاونية.'
    : 'Hello, I would like to inquire about AlShamel Cooperative services and projects.';

  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <aside 
      id="floating-whatsapp-container" 
      aria-label="WhatsApp Contact"
      className="fixed bottom-6 start-6 z-50 flex items-center group"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        id="btn-floating-whatsapp"
        className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl hover:shadow-[#25D366]/40 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 border-2 border-white/20"
        aria-label={t.common.whatsappCTA}
      >
        <MessageCircle className="w-6 h-6 shrink-0 text-white fill-white/10 group-hover:rotate-12 transition-transform duration-300" />
        <span className="hidden sm:inline-block font-bold text-xs tracking-wide select-none">
          {t.common.whatsappCTA}
        </span>
      </a>
    </aside>
  );
};
