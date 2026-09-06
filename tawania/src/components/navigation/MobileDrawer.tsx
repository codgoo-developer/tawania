import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  X,
  ChevronDown,
  Home,
  Users,
  Award,
  Briefcase,
  ShieldCheck,
  Calendar,
  FileText,
  FileCheck,
  BookOpen,
  Sparkles,
  Image,
  AlertTriangle,
  MessageSquareQuote,
  Smile,
  Phone,
  Search,
  Globe,
  UserPlus,
  UserCheck,
  UserCog,
  ChevronRight,
  ChevronLeft,
  Mail,
  Instagram,
  Twitter,
  MessageCircle,
  DollarSign
} from 'lucide-react';
import { useI18n } from '../../i18n';
import { useAuth } from '../../context/AuthContext';
import { useGovernanceData } from '../../context/GovernanceDataContext';
import { AlShamelLogo } from '../common/AlShamelLogo';

export const MobileDrawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}> = ({ isOpen, onClose, onOpenSearch }) => {
  const { locale, t, dir, setLocale, getLocalizedPath } = useI18n();
  const { isAuthenticated } = useAuth();
  const { financials, contactSettings } = useGovernanceData();
  const phoneNum = contactSettings?.phone || '0504284861';
  const rawWa = contactSettings?.whatsappPhone || phoneNum;
  const cleanWa = rawWa.replace(/[^0-9]/g, '');
  const formattedWa = cleanWa.startsWith('0') ? `966${cleanWa.slice(1)}` : (cleanWa.startsWith('966') ? cleanWa : `966${cleanWa}`);
  const availableFinancialYears = Array.from(
    new Set([...financials.map((f) => f.year), '2024', '2023', '2022', '2021', '2020', '2019'])
  ).sort((a, b) => Number(b) - Number(a));
  const location = useLocation();

  // Multi-level accordion expansion state
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const toggle = (key: string) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleLinkClick = () => {
    onClose();
  };

  const isCurrent = (path: string) => {
    const current = location.pathname.replace(/^\/(ar|en)/, '').replace(/\/+$/, '') || '/';
    const target = path.replace(/^\/(ar|en)/, '').replace(/\/+$/, '') || '/';

    if (target === '/') {
      return current === '/';
    }
    return current === target || current.startsWith(`${target}/`);
  };

  return (
    <div
      id="mobile-nav-drawer"
      className="fixed inset-0 z-50 flex bg-[#12332B]/60 backdrop-blur-xs lg:hidden animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`w-[85%] max-w-sm bg-white h-full flex flex-col shadow-2xl overflow-hidden ${
          dir === 'rtl' ? 'mr-auto' : 'ml-auto'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-[#12332B]/10 flex items-center justify-between bg-[#05241C] text-white">
          <AlShamelLogo size="xs" textColor="#FFFFFF" />
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label={t.nav.closeMenu}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Search Action */}
        <div className="p-3 border-b border-[#12332B]/10 bg-[#F7F8F6]">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-medium bg-white rounded-xl border border-[#12332B]/15 text-[#68736F] shadow-2xs text-start hover:border-[#0B6B4F] transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4 text-[#0B6B4F]" />
            <span>{t.common.search}</span>
          </button>
        </div>

        {/* Nested Navigation Accordions */}
        <div className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          {/* 1. الرئيسية (Home) */}
          <Link
            to={getLocalizedPath('/')}
            onClick={handleLinkClick}
            className={`flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
              isCurrent('/')
                ? 'text-[#0B6B4F] bg-[#EBF4F0] font-bold'
                : 'text-[#17211E] hover:bg-[#F7F8F6]'
            }`}
          >
            <Home className="w-4 h-4 text-[#0B6B4F]" />
            <span>{locale === 'ar' ? 'الرئيسية' : 'Home'}</span>
          </Link>

          {/* 2. الأعضاء (Members - Direct Link to Directory) */}
          <Link
            to={getLocalizedPath('/members/directory')}
            onClick={handleLinkClick}
            className={`flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
              isCurrent('/members/directory') || isCurrent('/members')
                ? 'text-[#0B6B4F] bg-[#EBF4F0] font-bold'
                : 'text-[#17211E] hover:bg-[#F7F8F6]'
            }`}
          >
            <Users className="w-4 h-4 text-[#0B6B4F]" />
            <span>{locale === 'ar' ? 'الأعضاء' : 'Members'}</span>
          </Link>

          {/* 3. مجلس الإدارة (Board of Directors - Direct Link to /board) */}
          <Link
            to={getLocalizedPath('/board')}
            onClick={handleLinkClick}
            className={`flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
              isCurrent('/board')
                ? 'text-[#0B6B4F] bg-[#EBF4F0] font-bold'
                : 'text-[#17211E] hover:bg-[#F7F8F6]'
            }`}
          >
            <Award className="w-4 h-4 text-[#C9A45C]" />
            <span>{locale === 'ar' ? 'مجلس الإدارة' : 'Board of Directors'}</span>
          </Link>

          {/* 4. مشاريعنا (Our Projects) */}
          <Link
            to={getLocalizedPath('/projects')}
            onClick={handleLinkClick}
            className={`flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
              isCurrent('/projects')
                ? 'text-[#0B6B4F] bg-[#EBF4F0] font-bold'
                : 'text-[#17211E] hover:bg-[#F7F8F6]'
            }`}
          >
            <Briefcase className="w-4 h-4 text-[#0B6B4F]" />
            <span>{locale === 'ar' ? 'مشاريعنا' : 'Our Projects'}</span>
          </Link>

          {/* 5. الحوكمة (Governance - Direct Link) */}
          <Link
            to={getLocalizedPath('/governance')}
            onClick={handleLinkClick}
            className={`flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
              isCurrent('/governance') || isCurrent('/policies') || isCurrent('/regulations')
                ? 'text-[#0B6B4F] bg-[#EBF4F0] font-bold'
                : 'text-[#17211E] hover:bg-[#F7F8F6]'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-[#0B6B4F]" />
            <span>{locale === 'ar' ? 'الحوكمة والسياسات' : 'Governance & Policies'}</span>
          </Link>

          {/* 6. الجمعية في صور (Society in Photos) */}
          <Link
            to={getLocalizedPath('/gallery')}
            onClick={handleLinkClick}
            className={`flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
              isCurrent('/gallery')
                ? 'text-[#0B6B4F] bg-[#EBF4F0] font-bold'
                : 'text-[#17211E] hover:bg-[#F7F8F6]'
            }`}
          >
            <Image className="w-4 h-4 text-[#0B6B4F]" />
            <span>{locale === 'ar' ? 'الجمعية في صور' : 'Society in Photos'}</span>
          </Link>

          {/* 7. الشكاوى (Whistleblowing / Complaints - Direct Link) */}
          <Link
            to={getLocalizedPath('/whistleblowing')}
            onClick={handleLinkClick}
            className={`flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
              isCurrent('/whistleblowing')
                ? 'text-[#0B6B4F] bg-[#EBF4F0] font-bold'
                : 'text-[#17211E] hover:bg-[#F7F8F6]'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-[#0B6B4F]" />
            <span>{locale === 'ar' ? 'الشكاوى' : 'Complaints'}</span>
          </Link>

          {/* 8. قياس الرضا (Satisfaction Surveys - Direct Link) */}
          <Link
            to={getLocalizedPath('/surveys')}
            onClick={handleLinkClick}
            className={`flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
              isCurrent('/surveys')
                ? 'text-[#0B6B4F] bg-[#EBF4F0] font-bold'
                : 'text-[#17211E] hover:bg-[#F7F8F6]'
            }`}
          >
            <Smile className="w-4 h-4 text-[#0B6B4F]" />
            <span>{locale === 'ar' ? 'قياس الرضا' : 'Satisfaction Surveys'}</span>
          </Link>

          {/* 8. التغذية الراجعة (Feedback) */}
          <Link
            to={getLocalizedPath('/feedback')}
            onClick={handleLinkClick}
            className={`flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
              isCurrent('/feedback')
                ? 'text-[#0B6B4F] bg-[#EBF4F0] font-bold'
                : 'text-[#17211E] hover:bg-[#F7F8F6]'
            }`}
          >
            <MessageSquareQuote className="w-4 h-4 text-[#0B6B4F]" />
            <span>{locale === 'ar' ? 'التغذية الراجعة' : 'Feedback'}</span>
          </Link>

          {/* 9. قنوات التواصل (Contact Channels) */}
          <Link
            to={getLocalizedPath('/contact')}
            onClick={handleLinkClick}
            className={`flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
              isCurrent('/contact')
                ? 'text-[#0B6B4F] bg-[#EBF4F0] font-bold'
                : 'text-[#17211E] hover:bg-[#F7F8F6]'
            }`}
          >
            <Phone className="w-4 h-4 text-[#0B6B4F]" />
            <span>{locale === 'ar' ? 'قنوات التواصل' : 'Contact Channels'}</span>
          </Link>

          {/* 10. المدير التنفيذي (Executive Director) */}
          <Link
            to={getLocalizedPath('/executive-director')}
            onClick={handleLinkClick}
            className={`flex items-center gap-3 px-3 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
              isCurrent('/executive-director')
                ? 'text-[#0B6B4F] bg-[#EBF4F0] font-bold'
                : 'text-[#17211E] hover:bg-[#F7F8F6]'
            }`}
          >
            <UserCog className="w-4 h-4 text-[#0B6B4F]" />
            <span>{locale === 'ar' ? 'المدير التنفيذي' : 'Executive Director'}</span>
          </Link>
        </div>

        {/* Drawer Footer with Complete Contact Info */}
        <div className="p-3.5 border-t border-[#12332B]/10 bg-[#F7F8F6] space-y-2.5">
          {/* Quick Action Buttons: WhatsApp & Phone */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={`https://wa.me/${formattedWa}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-gradient-to-br from-[#25D366] to-[#128C4A] text-white rounded-xl text-xs font-bold shadow-xs hover:brightness-110"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>{locale === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
            </a>
            <a
              href={`tel:${phoneNum}`}
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 bg-white border border-[#12332B]/15 text-[#12332B] rounded-xl text-xs font-mono font-bold hover:text-[#0B6B4F]"
              dir="ltr"
            >
              <Phone className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>{phoneNum}</span>
            </a>
          </div>

          {/* Email and Social Media Icons */}
          <div className="flex items-center justify-between pt-1 border-t border-gray-200/60 text-xs">
            <a
              href="mailto:info@shamil.org.sa"
              className="flex items-center gap-1.5 text-[#68736F] hover:text-[#0B6B4F] text-[11px] font-mono"
            >
              <Mail className="w-3.5 h-3.5 text-[#0B6B4F]" />
              <span>info@shamil.org.sa</span>
            </a>

            <div className="flex items-center gap-2">
              <a
                href={contactSettings?.instagramUrl || "https://instagram.com/shamel_coo"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-[#E1306C] hover:bg-gray-50 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href={contactSettings?.twitterUrl || "https://x.com/shamel_coo"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-[#1DA1F2] hover:bg-gray-50 transition-colors"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Admin Login / Dashboard Quick Action */}
          <div className="pt-2 border-t border-gray-200/60">
            
          </div>

          {/* Language Switch */}
          <div className="flex items-center justify-between pt-1 border-t border-gray-200/60">
            <span className="text-[11px] text-[#68736F]">
              {locale === 'ar' ? 'لغة الموقع' : 'Language'}
            </span>
            <button
              type="button"
              onClick={() => {
                setLocale(locale === 'ar' ? 'en' : 'ar');
                onClose();
              }}
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 bg-white border border-[#12332B]/15 rounded-lg text-[#0B6B4F] cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{locale === 'ar' ? 'English' : 'العربية'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
