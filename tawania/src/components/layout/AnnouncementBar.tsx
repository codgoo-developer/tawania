import React from 'react';
import { Phone, Mail, MapPin, Clock, Sparkles } from 'lucide-react';
import { useI18n } from '../../i18n';
import { useGovernanceData } from '../../context/GovernanceDataContext';

export const AnnouncementBar: React.FC = () => {
  const { t, locale } = useI18n();
  const { contactSettings } = useGovernanceData();

  const phoneNum = contactSettings?.phone || '0504284861';
  const emailAddr = contactSettings?.email || 'info@shamil.org.sa';
  const addressText = locale === 'ar' ? (contactSettings?.addressAr || 'جدة، المملكة العربية السعودية') : (contactSettings?.addressEn || 'Jeddah, Saudi Arabia');
  const workingHoursText = locale === 'ar' ? (contactSettings?.workingHoursAr || 'الأحد - الخميس: 8:00 صباحاً - 4:00 مساءً') : (contactSettings?.workingHoursEn || 'Sun - Thu: 8:00 AM - 4:00 PM');

  return (
    <div id="announcement-bar" className="bg-gradient-to-br from-[#12332B] to-[#0B211C] text-white text-xs py-2 border-b border-[#0B6B4F]/30 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left Side: Contact Quick Details */}
        <div className="flex items-center gap-6 text-[#CBD5CE]">
          <div className="flex items-center gap-1.5 hover:text-white transition-colors">
            <MapPin className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>{addressText}</span>
          </div>
          <a
            href={`tel:${phoneNum}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
            dir="ltr"
          >
            <Phone className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>{phoneNum}</span>
          </a>
          <a
            href={`mailto:${emailAddr}`}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>{emailAddr}</span>
          </a>
        </div>

        {/* Right Side: Working hours & Vision 2030 tag */}
        <div className="flex items-center gap-4 text-[#CBD5CE]">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>{workingHoursText}</span>
          </div>
          <div className="h-3 w-px bg-white/20" />
          <div className="flex items-center gap-1.5 text-[#C9A45C] font-medium">
            <Sparkles className="w-3 h-3" />
            <span>{t.common.saudiVision2030}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
