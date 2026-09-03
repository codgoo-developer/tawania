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
    if (path === '/' || path === `/${locale}` || path === `/${locale}/`) {
      return location.pathname === `/${locale}` || location.pathname === `/${locale}/` || location.pathname === '/';
    }
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return location.pathname === `/${locale}${cleanPath}` || location.pathname.startsWith(`/${locale}${cleanPath}/`);
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

          {/* 2. الأعضاء (Members Accordion) */}
          <div className="rounded-xl border border-gray-100 overflow-hidden bg-[#FAFBFA]">
            <button
              type="button"
              onClick={() => toggle('members')}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-[#17211E] hover:bg-[#EBF4F0] cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-[#0B6B4F]" />
                <span>{locale === 'ar' ? 'الأعضاء' : 'Members'}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  expanded['members'] ? 'rotate-180 text-[#0B6B4F]' : ''
                }`}
              />
            </button>

            {expanded['members'] && (
              <div className="p-2 pt-0 space-y-1 border-t border-gray-100 bg-white">
                {/* أعضاء الجمعية العمومية (Nested) */}
                <div className="rounded-lg bg-gray-50/70 p-1">
                  <button
                    type="button"
                    onClick={() => toggle('ga-members')}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-semibold text-[#17211E] hover:text-[#0B6B4F] cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <UserCheck className="w-3.5 h-3.5 text-[#0B6B4F]" />
                      {locale === 'ar' ? 'أعضاء الجمعية العمومية' : 'General Assembly Members'}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
                        expanded['ga-members'] ? 'rotate-180 text-[#0B6B4F]' : ''
                      }`}
                    />
                  </button>

                  {expanded['ga-members'] && (
                    <div className="ps-6 pe-2 py-1 space-y-1 text-xs border-s-2 border-[#0B6B4F]/30 ms-3 mt-1">
                      <Link
                        to={getLocalizedPath('/members/directory')}
                        onClick={handleLinkClick}
                        className={`block py-1.5 px-2 rounded-md transition-colors ${
                          isCurrent('/members/directory')
                            ? 'text-[#0B6B4F] bg-[#EBF4F0] font-bold'
                            : 'text-[#68736F] hover:text-[#0B6B4F] hover:bg-[#EBF4F0]'
                        }`}
                      >
                        {locale === 'ar' ? 'بيانات الاعضاء' : 'Members Directory'}
                      </Link>
                      <Link
                        to={getLocalizedPath('/members/register')}
                        onClick={handleLinkClick}
                        className={`block py-1.5 px-2 rounded-md transition-colors ${
                          isCurrent('/members/register')
                            ? 'text-[#0B6B4F] bg-[#EBF4F0] font-bold'
                            : 'text-[#68736F] hover:text-[#0B6B4F] hover:bg-[#EBF4F0]'
                        }`}
                      >
                        {locale === 'ar' ? 'نموذج تسجيل عضو جديد' : 'New Member Registration'}
                      </Link>
                    </div>
                  )}
                </div>

                {/* أعضاء مجلس الإدارة */}
                <Link
                  to={getLocalizedPath('/board')}
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-semibold text-[#17211E] hover:text-[#0B6B4F] hover:bg-gray-50"
                >
                  <Award className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span>{locale === 'ar' ? 'أعضاء مجلس الإدارة' : 'Board of Directors'}</span>
                </Link>
              </div>
            )}
          </div>

          {/* 3. مشاريعنا (Our Projects) */}
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

          {/* 4. الحوكمة (Governance Multi-Tier Accordion) */}
          <div className="rounded-xl border border-gray-100 overflow-hidden bg-[#FAFBFA]">
            <button
              type="button"
              onClick={() => toggle('governance')}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-[#17211E] hover:bg-[#EBF4F0] cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#0B6B4F]" />
                <span>{locale === 'ar' ? 'الحوكمة' : 'Governance'}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  expanded['governance'] ? 'rotate-180 text-[#0B6B4F]' : ''
                }`}
              />
            </button>

            {expanded['governance'] && (
              <div className="p-2 pt-0 space-y-1.5 border-t border-gray-100 bg-white">
                {/* محاضر اجتماع الجمعية العمومية */}
                <Link
                  to={getLocalizedPath('/meetings/general-assembly')}
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] hover:bg-gray-50"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#0B6B4F]" />
                  <span>{locale === 'ar' ? 'محاضر اجتماع الجمعية العمومية' : 'General Assembly Minutes'}</span>
                </Link>

                {/* محاضر اجتماع مجلس الادارة */}
                <Link
                  to={getLocalizedPath('/meetings/board')}
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] hover:bg-gray-50"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span>{locale === 'ar' ? 'محاضر اجتماع مجلس الادارة' : 'Board Meeting Minutes'}</span>
                </Link>

                {/* الميثاق الاخلاقي */}
                <Link
                  to={getLocalizedPath('/ethics')}
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] hover:bg-gray-50"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0B6B4F]" />
                  <span>{locale === 'ar' ? 'الميثاق الاخلاقي' : 'Ethical Charter'}</span>
                </Link>

                {/* السياسات (Nested) */}
                <div className="rounded-lg bg-gray-50/70 p-1">
                  <button
                    type="button"
                    onClick={() => toggle('policies')}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-semibold text-[#17211E] hover:text-[#0B6B4F] cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-[#0B6B4F]" />
                      {locale === 'ar' ? 'السياسات' : 'Policies'}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
                        expanded['policies'] ? 'rotate-180 text-[#0B6B4F]' : ''
                      }`}
                    />
                  </button>

                  {expanded['policies'] && (
                    <div className="ps-5 pe-2 py-1 space-y-1 text-xs border-s-2 border-[#0B6B4F]/30 ms-3 mt-1">
                      <Link to={getLocalizedPath('/policies/conflict-of-interest')} onClick={handleLinkClick} className="block py-1 px-2 rounded hover:bg-[#EBF4F0] text-[#68736F] hover:text-[#0B6B4F]">
                        {locale === 'ar' ? 'تعارض المصالح' : 'Conflict of Interest'}
                      </Link>
                      <Link to={getLocalizedPath('/policies/whistleblowing-policy')} onClick={handleLinkClick} className="block py-1 px-2 rounded hover:bg-[#EBF4F0] text-[#68736F] hover:text-[#0B6B4F]">
                        {locale === 'ar' ? 'الابلاغ عن المخالفات' : 'Whistleblowing'}
                      </Link>
                      <Link to={getLocalizedPath('/policies/document-retention')} onClick={handleLinkClick} className="block py-1 px-2 rounded hover:bg-[#EBF4F0] text-[#68736F] hover:text-[#0B6B4F]">
                        {locale === 'ar' ? 'الاحتفاظ بالوثائق' : 'Document Retention'}
                      </Link>
                      <Link to={getLocalizedPath('/policies/gifts-donations')} onClick={handleLinkClick} className="block py-1 px-2 rounded hover:bg-[#EBF4F0] text-[#68736F] hover:text-[#0B6B4F]">
                        {locale === 'ar' ? 'قبول الهبات' : 'Acceptance of Gifts & Donations'}
                      </Link>
                      <Link to={getLocalizedPath('/policies/member-relations')} onClick={handleLinkClick} className="block py-1 px-2 rounded hover:bg-[#EBF4F0] text-[#68736F] hover:text-[#0B6B4F]">
                        {locale === 'ar' ? 'تنظيم العلاقة مع اعضاء الجمعية العمومية وتقديم الخدمات' : 'General Assembly Member Relations'}
                      </Link>
                      <Link to={getLocalizedPath('/policies/data-privacy')} onClick={handleLinkClick} className="block py-1 px-2 rounded hover:bg-[#EBF4F0] text-[#68736F] hover:text-[#0B6B4F]">
                        {locale === 'ar' ? 'خصوصية البيانات' : 'Data Privacy'}
                      </Link>

                      {/* غسل الأموال ومكافحة تمويل الإرهاب (Deep Nested) */}
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => toggle('aml-mobile')}
                          className="w-full flex items-center justify-between py-1 px-2 rounded font-semibold text-[#17211E] hover:text-[#0B6B4F]"
                        >
                          <span className="truncate">{locale === 'ar' ? 'غسل الأموال ومكافحة تمويل الإرهاب' : 'AML & Counter-Terrorism'}</span>
                          <ChevronDown className={`w-3 h-3 transition-transform ${expanded['aml-mobile'] ? 'rotate-180 text-[#0B6B4F]' : ''}`} />
                        </button>
                        {expanded['aml-mobile'] && (
                          <div className="ps-4 space-y-1 border-s border-gray-300 ms-2 mt-1">
                            <Link to={getLocalizedPath('/policies/aml-manual')} onClick={handleLinkClick} className="block py-1 text-gray-600 hover:text-[#0B6B4F]">
                              {locale === 'ar' ? 'الدليل والمؤشرات والاجراءات' : 'AML Manual & Indicators'}
                            </Link>
                            <Link to={getLocalizedPath('/policies/aml-prevention')} onClick={handleLinkClick} className="block py-1 text-gray-600 hover:text-[#0B6B4F]">
                              {locale === 'ar' ? 'سياسية الوقاية' : 'Prevention Policy'}
                            </Link>
                            <Link to={getLocalizedPath('/policies/aml-suspicion')} onClick={handleLinkClick} className="block py-1 text-gray-600 hover:text-[#0B6B4F]">
                              {locale === 'ar' ? 'سياسة الاشتباة' : 'Suspicious Activity Policy'}
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* القوائم المالية (Nested) */}
                <div className="rounded-lg bg-gray-50/70 p-1">
                  <button
                    type="button"
                    onClick={() => toggle('financials')}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-semibold text-[#17211E] hover:text-[#0B6B4F] cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <FileCheck className="w-3.5 h-3.5 text-[#C9A45C]" />
                      {locale === 'ar' ? 'القوائم المالية' : 'Financial Statements'}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
                        expanded['financials'] ? 'rotate-180 text-[#0B6B4F]' : ''
                      }`}
                    />
                  </button>

                  {expanded['financials'] && (
                    <div className="ps-5 pe-2 py-1 space-y-1 text-xs border-s-2 border-[#0B6B4F]/30 ms-3 mt-1">
                      {availableFinancialYears.map((yr) => (
                        <Link
                          key={yr}
                          to={getLocalizedPath('/financial-statements')}
                          onClick={handleLinkClick}
                          className="block py-1 px-2 rounded hover:bg-[#EBF4F0] text-[#68736F] hover:text-[#0B6B4F]"
                        >
                          {locale === 'ar' ? `القوائم المالية لعام ${yr}` : `Financial Statements ${yr}`}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* اللوائح والأنظمة و الشهادات (Nested) */}
                <div className="rounded-lg bg-gray-50/70 p-1">
                  <button
                    type="button"
                    onClick={() => toggle('regulations')}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-semibold text-[#17211E] hover:text-[#0B6B4F] cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-[#0B6B4F]" />
                      {locale === 'ar' ? 'اللوائح والأنظمة و الشهادات' : 'Regulations & Certificates'}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
                        expanded['regulations'] ? 'rotate-180 text-[#0B6B4F]' : ''
                      }`}
                    />
                  </button>

                  {expanded['regulations'] && (
                    <div className="ps-5 pe-2 py-1 space-y-1 text-xs border-s-2 border-[#0B6B4F]/30 ms-3 mt-1">
                      <Link to={getLocalizedPath('/regulations/basic-bylaws')} onClick={handleLinkClick} className="block py-1 px-2 rounded hover:bg-[#EBF4F0] text-[#68736F] hover:text-[#0B6B4F]">
                        {locale === 'ar' ? 'اللائحة الاساسية' : 'Basic Bylaws'}
                      </Link>
                      <Link to={getLocalizedPath('/regulations/bylaws-approval')} onClick={handleLinkClick} className="block py-1 px-2 rounded hover:bg-[#EBF4F0] text-[#68736F] hover:text-[#0B6B4F]">
                        {locale === 'ar' ? 'محضر اعتماد اللائحة الاساسية' : 'Bylaws Approval Minutes'}
                      </Link>
                      <Link to={getLocalizedPath('/regulations/registration-certificate')} onClick={handleLinkClick} className="block py-1 px-2 rounded hover:bg-[#EBF4F0] text-[#68736F] hover:text-[#0B6B4F]">
                        {locale === 'ar' ? 'شهادة تسجيل الجمعية' : 'Cooperative Registration Certificate'}
                      </Link>
                      <Link to={getLocalizedPath('/regulations/work-regulations')} onClick={handleLinkClick} className="block py-1 px-2 rounded hover:bg-[#EBF4F0] text-[#68736F] hover:text-[#0B6B4F]">
                        {locale === 'ar' ? 'لائحة تنظيم العمل' : 'Work Organization Regulations'}
                      </Link>
                      <Link to={getLocalizedPath('/regulations/aml-law')} onClick={handleLinkClick} className="block py-1 px-2 rounded hover:bg-[#EBF4F0] text-[#68736F] hover:text-[#0B6B4F]">
                        {locale === 'ar' ? 'نظام مكافحة غسل الاموال ولائحته التنفيذية' : 'AML Law & Executive Regulations'}
                      </Link>
                      <Link to={getLocalizedPath('/regulations/counter-terrorism-law')} onClick={handleLinkClick} className="block py-1 px-2 rounded hover:bg-[#EBF4F0] text-[#68736F] hover:text-[#0B6B4F]">
                        {locale === 'ar' ? 'نظام مكافحة جرائم الارهاب وتمويله' : 'Combating Terrorism Financing Law'}
                      </Link>

                      {/* الملفات المالية المتداخلة */}
                      <div className="rounded-lg bg-white/80 p-1 mt-1 border border-gray-100">
                        <button
                          type="button"
                          onClick={() => toggle('fin-files-nested-mobile')}
                          className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-semibold text-[#17211E] hover:text-[#0B6B4F] cursor-pointer"
                        >
                          <span className="flex items-center gap-1.5">
                            <DollarSign className="w-3 h-3 text-[#C9A45C]" />
                            {locale === 'ar' ? 'الملفات المالية' : 'Financial Files'}
                          </span>
                          <ChevronDown
                            className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${
                              expanded['fin-files-nested-mobile'] ? 'rotate-180 text-[#0B6B4F]' : ''
                            }`}
                          />
                        </button>

                        {expanded['fin-files-nested-mobile'] && (
                          <div className="ps-4 pe-1 py-1 space-y-1 text-[11px] border-s border-[#0B6B4F]/20 ms-2 mt-1">
                            <Link to={getLocalizedPath('/regulations/board-remuneration')} onClick={handleLinkClick} className="block py-1 px-1.5 rounded hover:bg-[#EBF4F0] text-[#68736F] hover:text-[#0B6B4F]">
                              {locale === 'ar' ? 'سياسة المكافئات والامتيازات لأعضاء مجلس الإدارة' : 'Board Remuneration Policy'}
                            </Link>
                            <Link to={getLocalizedPath('/regulations/financial-regulations')} onClick={handleLinkClick} className="block py-1 px-1.5 rounded hover:bg-[#EBF4F0] text-[#68736F] hover:text-[#0B6B4F]">
                              {locale === 'ar' ? 'اللائحة المالية' : 'Financial Regulations'}
                            </Link>
                            <Link to={getLocalizedPath('/regulations/disbursement-policy')} onClick={handleLinkClick} className="block py-1 px-1.5 rounded hover:bg-[#EBF4F0] text-[#68736F] hover:text-[#0B6B4F]">
                              {locale === 'ar' ? 'سياسة الصرف للبرامج والأنشطة' : 'Disbursement Policy'}
                            </Link>
                            <Link to={getLocalizedPath('/regulations/procurement-bylaws')} onClick={handleLinkClick} className="block py-1 px-1.5 rounded hover:bg-[#EBF4F0] text-[#68736F] hover:text-[#0B6B4F]">
                              {locale === 'ar' ? 'لائحة المشتريات' : 'Procurement Bylaws'}
                            </Link>
                            <Link to={getLocalizedPath('/regulations/receipts-procedures')} onClick={handleLinkClick} className="block py-1 px-1.5 rounded hover:bg-[#EBF4F0] text-[#68736F] hover:text-[#0B6B4F]">
                              {locale === 'ar' ? 'إجراءات التعامل مع المقبوضات' : 'Receipts Handling Procedures'}
                            </Link>
                            <Link to={getLocalizedPath('/regulations/financial-manual')} onClick={handleLinkClick} className="block py-1 px-1.5 rounded hover:bg-[#EBF4F0] text-[#68736F] hover:text-[#0B6B4F]">
                              {locale === 'ar' ? 'دليل الإجرائات المالي' : 'Financial Procedures Guide'}
                            </Link>
                            <Link to={getLocalizedPath('/regulations/investment-policy')} onClick={handleLinkClick} className="block py-1 px-1.5 rounded hover:bg-[#EBF4F0] text-[#68736F] hover:text-[#0B6B4F]">
                              {locale === 'ar' ? 'سياسة الإستثمار' : 'Investment Policy'}
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* الورش المقامة */}
                <div className="rounded-lg bg-gray-50/70 p-1">
                  <button
                    type="button"
                    onClick={() => toggle('workshops')}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-semibold text-[#17211E] hover:text-[#0B6B4F] cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
                      {locale === 'ar' ? 'الورش المقامة' : 'Conducted Workshops'}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
                        expanded['workshops'] ? 'rotate-180 text-[#0B6B4F]' : ''
                      }`}
                    />
                  </button>

                  {expanded['workshops'] && (
                    <div className="ps-5 pe-2 py-1 space-y-1 text-xs border-s-2 border-[#0B6B4F]/30 ms-3 mt-1">
                      <Link to={getLocalizedPath('/workshops/governance-intro')} onClick={handleLinkClick} className="block py-1 px-2 rounded hover:bg-[#EBF4F0] text-[#68736F] hover:text-[#0B6B4F]">
                        {locale === 'ar' ? 'ورشة التعريف بالحوكمة' : 'Governance Orientation Workshop'}
                      </Link>
                      <Link to={getLocalizedPath('/workshops/conflict-whistleblowing')} onClick={handleLinkClick} className="block py-1 px-2 rounded hover:bg-[#EBF4F0] text-[#68736F] hover:text-[#0B6B4F]">
                        {locale === 'ar' ? 'ورشة التعريف بسياسة تعارض المصالح وسياسة الابلاغ عن المخالفات' : 'Conflict & Whistleblowing Workshop'}
                      </Link>
                      <Link to={getLocalizedPath('/workshops/aml-counter-terrorism')} onClick={handleLinkClick} className="block py-1 px-2 rounded hover:bg-[#EBF4F0] text-[#68736F] hover:text-[#0B6B4F]">
                        {locale === 'ar' ? 'ورشة غسل الاموال ومكافحة جرائم تمويل الارهاب' : 'AML & Counter-Terrorism Workshop'}
                      </Link>
                    </div>
                  )}
                </div>

                {/* الورش المقامة بالشركات المجتمعية */}
                <div className="rounded-lg bg-gray-50/70 p-1">
                  <button
                    type="button"
                    onClick={() => toggle('community-workshops')}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-semibold text-[#17211E] hover:text-[#0B6B4F] cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-[#0B6B4F]" />
                      {locale === 'ar' ? 'الورش المقامة بالشركات المجتمعية' : 'Community Partnerships Workshops'}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${
                        expanded['community-workshops'] ? 'rotate-180 text-[#0B6B4F]' : ''
                      }`}
                    />
                  </button>

                  {expanded['community-workshops'] && (
                    <div className="ps-5 pe-2 py-1 space-y-1 text-xs border-s-2 border-[#0B6B4F]/30 ms-3 mt-1">
                      <Link to={getLocalizedPath('/workshops/community-conflict-whistleblowing')} onClick={handleLinkClick} className="block py-1 px-2 rounded hover:bg-[#EBF4F0] text-[#68736F] hover:text-[#0B6B4F]">
                        {locale === 'ar' ? 'ورشة التعريف بسياسة التعارض وسياسة الإبلاغ عن المخالفات' : 'Conflict & Whistleblowing Workshop'}
                      </Link>
                      <Link to={getLocalizedPath('/workshops/community-aml-counter-terrorism')} onClick={handleLinkClick} className="block py-1 px-2 rounded hover:bg-[#EBF4F0] text-[#68736F] hover:text-[#0B6B4F]">
                        {locale === 'ar' ? 'ورشة غسل الاموال ومكافحة جرائم تمويل الارهاب' : 'AML & Counter-Terrorism Workshop'}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 5. الجمعية في صور (Society in Photos) */}
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

          {/* 6. الشكاوى (Complaints Accordion) */}
          <div className="rounded-xl border border-gray-100 overflow-hidden bg-[#FAFBFA]">
            <button
              type="button"
              onClick={() => toggle('complaints')}
              className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-[#17211E] hover:bg-[#EBF4F0] cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>{locale === 'ar' ? 'الشكاوى' : 'Complaints & Surveys'}</span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  expanded['complaints'] ? 'rotate-180 text-[#0B6B4F]' : ''
                }`}
              />
            </button>

            {expanded['complaints'] && (
              <div className="p-2 pt-0 space-y-1 border-t border-gray-100 bg-white">
                <Link
                  to={getLocalizedPath('whistleblowing')}
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] hover:bg-gray-50"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>{locale === 'ar' ? 'الإبلاغ عن المخالفات' : 'Whistleblowing'}</span>
                </Link>
                <Link
                  to={getLocalizedPath('/surveys?type=supporters')}
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] hover:bg-gray-50"
                >
                  <MessageSquareQuote className="w-3.5 h-3.5 text-[#0B6B4F]" />
                  <span>{locale === 'ar' ? 'قياس رضا الجهات الداعمة' : 'Supporter Satisfaction'}</span>
                </Link>
                <Link
                  to={getLocalizedPath('/surveys?type=assembly')}
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] hover:bg-gray-50"
                >
                  <MessageSquareQuote className="w-3.5 h-3.5 text-[#0B6B4F]" />
                  <span>{locale === 'ar' ? 'قياس رضا اعضاء الجمعية العمومية' : 'Assembly Satisfaction'}</span>
                </Link>
                <Link
                  to={getLocalizedPath('/surveys?type=customers')}
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] hover:bg-gray-50"
                >
                  <MessageSquareQuote className="w-3.5 h-3.5 text-[#0B6B4F]" />
                  <span>{locale === 'ar' ? 'قياس رضا العملاء' : 'Customer Satisfaction'}</span>
                </Link>
                <Link
                  to={getLocalizedPath('/surveys?type=staff')}
                  onClick={handleLinkClick}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] hover:bg-gray-50"
                >
                  <MessageSquareQuote className="w-3.5 h-3.5 text-[#0B6B4F]" />
                  <span>{locale === 'ar' ? 'قياس رضا العاملين' : 'Staff Satisfaction'}</span>
                </Link>
              </div>
            )}
          </div>

          {/* 7. التغذية الراجعة (Feedback) */}
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

          {/* 8. قنوات التواصل (Contact Channels) */}
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

          {/* 9. المدير التنفيذي (Executive Director) */}
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
                href="https://instagram.com/shamel_coo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-[#E1306C] hover:bg-gray-50 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://x.com/shamel_coo"
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
