import React from 'react';
import { Calendar, Phone, Send, Twitter, Instagram } from 'lucide-react';
import { useGovernanceData } from '../../context/GovernanceDataContext';
import { useI18n } from '../../i18n';

export const AnnouncementBar: React.FC = () => {
  const { locale } = useI18n();
  const { contactSettings } = useGovernanceData();

  const phoneNum = contactSettings?.phone || '0504284861';
  const emailAddr = contactSettings?.email || 'info@shamil.org.sa';
  const twitterUrl = contactSettings?.twitterUrl || 'https://x.com/shamel_coo';
  const instagramUrl = contactSettings?.instagramUrl || 'https://instagram.com/shamel_coo';

  // Dynamic Today Date (DD/MM/YYYY)
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return (
    <div
      id="top-announcement-bar"
      className="w-full text-white text-[12.5px] py-2 px-4 sm:px-6 lg:px-8 border-b border-black/10 z-50 relative"
      style={{ backgroundColor: '#0B6B4F' }}
    >
      <div className="w-full max-w-[1720px] mx-auto flex items-center justify-between gap-4">
        {/* Contact Info & Date */}
        <div className="flex items-center gap-5 sm:gap-6 flex-wrap font-medium">
          {/* Today's Date */}
          <div className="flex items-center gap-1.5 text-white/95">
            <Calendar className="w-3.5 h-3.5 text-[#C9A45C] shrink-0" />
            <span className="font-mono tracking-wide">{formattedDate}</span>
          </div>

          {/* Phone */}
          <a
            href={`tel:${phoneNum}`}
            className="flex items-center gap-1.5 text-white/95 hover:text-[#C9A45C] transition-colors dir-ltr"
          >
            <Phone className="w-3.5 h-3.5 text-[#C9A45C] shrink-0" />
            <span className="font-mono">{phoneNum}</span>
          </a>

          {/* Email */}
          <a
            href={`mailto:${emailAddr}`}
            className="hidden sm:flex items-center gap-1.5 text-white/95 hover:text-[#C9A45C] transition-colors"
          >
            <Send className="w-3.5 h-3.5 text-[#C9A45C] shrink-0" />
            <span>{emailAddr}</span>
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0 text-white/90">
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/25 hover:text-[#C9A45C] transition-all flex items-center justify-center cursor-pointer"
            aria-label="Twitter / X"
          >
            <Twitter className="w-3.5 h-3.5" />
          </a>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/25 hover:text-[#C9A45C] transition-all flex items-center justify-center cursor-pointer"
            aria-label="Instagram"
          >
            <Instagram className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
