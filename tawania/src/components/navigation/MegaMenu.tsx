import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Users,
  ShieldCheck,
  Building,
  Briefcase,
  FileText,
  FileCheck,
  Calendar,
  Image,
  MessageSquareQuote,
  Phone,
  Sparkles,
  UserCheck,
  UserPlus,
  AlertTriangle,
  Award,
  BookOpen,
  Scale,
  FolderOpen,
  DollarSign,
  UserCog
} from 'lucide-react';
import { useI18n } from '../../i18n';
import { useGovernanceData } from '../../context/GovernanceDataContext';

export const MegaMenu: React.FC = () => {
  const { locale, t, dir, getLocalizedPath } = useI18n();
  const { financials } = useGovernanceData();
  const availableFinancialYears = Array.from(
    new Set([...financials.map((f) => f.year), '2024', '2023', '2022', '2021', '2020', '2019'])
  ).sort((a, b) => Number(b) - Number(a));
  const location = useLocation();

  // Active state trackers
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [activeNestedMenu, setActiveNestedMenu] = useState<string | null>(null);

  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const SubArrow = dir === 'rtl' ? ChevronLeft : ChevronRight;

  const handleMenuEnter = (menuKey: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveMenu(menuKey);
  };

  const handleMenuLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setActiveSubMenu(null);
      setActiveNestedMenu(null);
    }, 150);
  };

  const handleSubEnter = (subKey: string) => {
    setActiveSubMenu(subKey);
    setActiveNestedMenu(null);
  };

  const handleNestedEnter = (nestedKey: string) => {
    setActiveNestedMenu(nestedKey);
  };

  const handleImmediateClose = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setActiveMenu(null);
    setActiveSubMenu(null);
    setActiveNestedMenu(null);
  };

  const isCurrent = (path: string) => {
    if (path === '/' || path === `/${locale}` || path === `/${locale}/`) {
      return location.pathname === `/${locale}` || location.pathname === `/${locale}/` || location.pathname === '/';
    }
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return location.pathname === `/${locale}${cleanPath}` || location.pathname.startsWith(`/${locale}${cleanPath}/`);
  };

  const isGovernanceActive = () => {
    const govPaths = [
      '/governance',
      '/reports',
      '/financial-statements',
      '/documents',
      '/ethics',
      '/policies',
      '/regulations',
      '/workshops',
      '/meetings'
    ];
    return activeMenu === 'governance' || govPaths.some((p) => isCurrent(p));
  };

  const isComplaintsActive = () => {
    const compPaths = ['/policies/whistleblowing-policy', '/surveys', '/complaints'];
    return activeMenu === 'complaints' || compPaths.some((p) => isCurrent(p));
  };

  const isMembersActive = () => {
    const memPaths = ['/members/directory', '/members/register', '/board'];
    return activeMenu === 'members' || memPaths.some((p) => isCurrent(p));
  };

  return (
    <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 text-xs xl:text-[13px] font-semibold select-none">
      {/* 1. الرئيسية (Home) */}
      <Link
        to={getLocalizedPath('/')}
        className={`px-2 py-1.5 xl:px-2.5 xl:py-2 rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 ${
          isCurrent('/')
            ? 'text-[#0B6B4F] bg-[#EBF4F0]/80 font-bold shadow-xs'
            : 'text-[#17211E] hover:text-[#0B6B4F] hover:bg-[#F7F8F6]'
        }`}
      >
        {locale === 'ar' ? 'الرئيسية' : 'Home'}
      </Link>

      {/* 2. الأعضاء (Members) */}
      <div
        className="relative shrink-0"
        onMouseEnter={() => handleMenuEnter('members')}
        onMouseLeave={handleMenuLeave}
      >
        <button
          type="button"
          className={`flex items-center gap-1 px-2 py-1.5 xl:px-2.5 xl:py-2 rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
            isMembersActive()
              ? 'text-[#0B6B4F] bg-[#EBF4F0]/80 font-bold shadow-xs'
              : 'text-[#17211E] hover:text-[#0B6B4F] hover:bg-[#F7F8F6]'
          }`}
          aria-expanded={activeMenu === 'members'}
        >
          <span>{locale === 'ar' ? 'الأعضاء' : 'Members'}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              activeMenu === 'members' ? 'rotate-180 text-[#0B6B4F]' : 'text-gray-400'
            }`}
          />
        </button>

        {activeMenu === 'members' && (
          <div className="absolute top-full start-0 pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="w-64 bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-[#12332B]/10 p-2 space-y-1 whitespace-normal">
              {/* أعضاء الجمعية العمومية */}
              <div
                className="relative"
                onMouseEnter={() => handleSubEnter('ga-members')}
              >
                <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F8F6] text-xs font-semibold text-[#17211E] hover:text-[#0B6B4F] cursor-pointer group transition-colors">
                  <span className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#0B6B4F]" />
                    {locale === 'ar' ? 'أعضاء الجمعية العمومية' : 'General Assembly Members'}
                  </span>
                  <SubArrow className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0B6B4F]" />
                </div>

                {activeSubMenu === 'ga-members' && (
                  <div className="absolute top-0 start-full ps-2 z-50 animate-in fade-in duration-150">
                    <div className="w-60 bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-[#12332B]/10 p-2 space-y-1">
                      <Link
                        to={getLocalizedPath('/members/directory')}
                        onClick={handleImmediateClose}
                        className={`flex items-center gap-2 p-2.5 rounded-xl transition-colors text-xs ${
                          isCurrent('/members/directory')
                            ? 'text-[#0B6B4F] bg-[#EBF4F0] font-bold shadow-xs'
                            : 'text-[#17211E] hover:bg-[#EBF4F0] hover:text-[#0B6B4F] font-semibold'
                        }`}
                      >
                        <Users className="w-3.5 h-3.5 text-[#0B6B4F]" />
                        {locale === 'ar' ? 'بيانات الاعضاء' : 'Members Directory'}
                      </Link>
                      <Link
                        to={getLocalizedPath('/members/register')}
                        onClick={handleImmediateClose}
                        className={`flex items-center gap-2 p-2.5 rounded-xl transition-colors text-xs ${
                          isCurrent('/members/register')
                            ? 'text-[#0B6B4F] bg-[#EBF4F0] font-bold shadow-xs'
                            : 'text-[#17211E] hover:bg-[#EBF4F0] hover:text-[#0B6B4F] font-semibold'
                        }`}
                      >
                        <UserPlus className="w-3.5 h-3.5 text-[#0B6B4F]" />
                        {locale === 'ar' ? 'نموذج تسجيل عضو جديد' : 'New Member Registration'}
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* أعضاء مجلس الإدارة */}
              <Link
                to={getLocalizedPath('/board')}
                onClick={handleImmediateClose}
                onMouseEnter={() => { setActiveSubMenu(null); setActiveNestedMenu(null); }}
                className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-[#F7F8F6] text-xs font-semibold text-[#17211E] hover:text-[#0B6B4F] transition-colors"
              >
                <Award className="w-4 h-4 text-[#C9A45C]" />
                <span>{locale === 'ar' ? 'أعضاء مجلس الإدارة' : 'Board of Directors'}</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* 3. مشاريعنا (Our Projects) */}
      <Link
        to={getLocalizedPath('/projects')}
        className={`px-2 py-1.5 xl:px-2.5 xl:py-2 rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 ${
          isCurrent('/projects')
            ? 'text-[#0B6B4F] bg-[#EBF4F0]/80 font-bold shadow-xs'
            : 'text-[#17211E] hover:text-[#0B6B4F] hover:bg-[#F7F8F6]'
        }`}
      >
        {locale === 'ar' ? 'مشاريعنا' : 'Our Projects'}
      </Link>

      {/* 4. الحوكمة (Governance) - Complete Multi-Level Structure */}
      <div
        className="relative shrink-0"
        onMouseEnter={() => handleMenuEnter('governance')}
        onMouseLeave={handleMenuLeave}
      >
        <button
          type="button"
          className={`flex items-center gap-1 px-2 py-1.5 xl:px-2.5 xl:py-2 rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
            isGovernanceActive()
              ? 'text-[#0B6B4F] bg-[#EBF4F0]/80 font-bold shadow-xs'
              : 'text-[#17211E] hover:text-[#0B6B4F] hover:bg-[#F7F8F6]'
          }`}
          aria-expanded={activeMenu === 'governance'}
        >
          <span>{locale === 'ar' ? 'الحوكمة' : 'Governance'}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              activeMenu === 'governance' ? 'rotate-180 text-[#0B6B4F]' : 'text-gray-400'
            }`}
          />
        </button>

        {activeMenu === 'governance' && (
          <div className="absolute top-full start-0 pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="w-72 bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-[#12332B]/10 p-2 space-y-1 whitespace-normal text-start">
              {/* محاضر اجتماع الجمعية العمومية */}
              <Link
                to={getLocalizedPath('/meetings/general-assembly')}
                onClick={handleImmediateClose}
                onMouseEnter={() => { setActiveSubMenu(null); setActiveNestedMenu(null); }}
                className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-[#F7F8F6] text-xs font-semibold text-[#17211E] hover:text-[#0B6B4F] transition-colors"
              >
                <Calendar className="w-4 h-4 text-[#0B6B4F]" />
                <span>{locale === 'ar' ? 'محاضر اجتماع الجمعية العمومية' : 'General Assembly Minutes'}</span>
              </Link>

              {/* محاضر اجتماع مجلس الادارة */}
              <Link
                to={getLocalizedPath('/meetings/board')}
                onClick={handleImmediateClose}
                onMouseEnter={() => { setActiveSubMenu(null); setActiveNestedMenu(null); }}
                className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-[#F7F8F6] text-xs font-semibold text-[#17211E] hover:text-[#0B6B4F] transition-colors"
              >
                <Calendar className="w-4 h-4 text-[#C9A45C]" />
                <span>{locale === 'ar' ? 'محاضر اجتماع مجلس الادارة' : 'Board Meeting Minutes'}</span>
              </Link>

              {/* الميثاق الاخلاقي */}
              <Link
                to={getLocalizedPath('/ethics')}
                onClick={handleImmediateClose}
                onMouseEnter={() => { setActiveSubMenu(null); setActiveNestedMenu(null); }}
                className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-[#F7F8F6] text-xs font-semibold text-[#17211E] hover:text-[#0B6B4F] transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-[#0B6B4F]" />
                <span>{locale === 'ar' ? 'الميثاق الاخلاقي' : 'Ethical Charter'}</span>
              </Link>

              {/* السياسات (Policies) */}
              <div
                className="relative"
                onMouseEnter={() => handleSubEnter('policies')}
              >
                <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F8F6] text-xs font-semibold text-[#17211E] hover:text-[#0B6B4F] cursor-pointer group transition-colors">
                  <span className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-[#0B6B4F]" />
                    {locale === 'ar' ? 'السياسات' : 'Policies'}
                  </span>
                  <SubArrow className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0B6B4F]" />
                </div>

                {activeSubMenu === 'policies' && (
                  <div className="absolute top-0 start-full ps-2 z-50 animate-in fade-in duration-150">
                    <div className="w-80 bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-[#12332B]/10 p-2 space-y-1 whitespace-normal text-start">
                      <Link
                        to={getLocalizedPath('/policies/conflict-of-interest')}
                        onClick={handleImmediateClose}
                        onMouseEnter={() => setActiveNestedMenu(null)}
                        className="block p-2 rounded-xl hover:bg-[#EBF4F0] text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] whitespace-normal"
                      >
                        {locale === 'ar' ? 'تعارض المصالح' : 'Conflict of Interest'}
                      </Link>
                      <Link
                        to={getLocalizedPath('/policies/whistleblowing-policy')}
                            onClick={handleImmediateClose}
                        onMouseEnter={() => setActiveNestedMenu(null)}
                        className="block p-2 rounded-xl hover:bg-[#EBF4F0] text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] whitespace-normal"
                      >
                        {locale === 'ar' ? 'الابلاغ عن المخالفات' : 'Whistleblowing'}
                      </Link>
                      <Link
                        to={getLocalizedPath('/policies/document-retention')}
                        onClick={handleImmediateClose}
                        onMouseEnter={() => setActiveNestedMenu(null)}
                        className="block p-2 rounded-xl hover:bg-[#EBF4F0] text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] whitespace-normal"
                      >
                        {locale === 'ar' ? 'الاحتفاظ بالوثائق' : 'Document Retention'}
                      </Link>
                      <Link
                        to={getLocalizedPath('/policies/gifts-donations')}
                        onClick={handleImmediateClose}
                        onMouseEnter={() => setActiveNestedMenu(null)}
                        className="block p-2 rounded-xl hover:bg-[#EBF4F0] text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] whitespace-normal"
                      >
                        {locale === 'ar' ? 'قبول الهبات' : 'Acceptance of Gifts & Donations'}
                      </Link>
                      <Link
                        to={getLocalizedPath('/policies/member-relations')}
                        onClick={handleImmediateClose}
                        onMouseEnter={() => setActiveNestedMenu(null)}
                        className="block p-2 rounded-xl hover:bg-[#EBF4F0] text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] leading-snug whitespace-normal"
                      >
                        {locale === 'ar'
                          ? 'تنظيم العلاقة مع اعضاء الجمعية العمومية وتقديم الخدمات'
                          : 'General Assembly Member Relations'}
                      </Link>
                      <Link
                        to={getLocalizedPath('/policies/data-privacy')}
                        onClick={handleImmediateClose}
                        onMouseEnter={() => setActiveNestedMenu(null)}
                        className="block p-2 rounded-xl hover:bg-[#EBF4F0] text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] whitespace-normal"
                      >
                        {locale === 'ar' ? 'خصوصية البيانات' : 'Data Privacy'}
                      </Link>

                      {/* غسل الأموال ومكافحة تمويل الإرهاب */}
                      <div
                        className="relative pt-1 border-t border-gray-100"
                        onMouseEnter={() => handleNestedEnter('aml')}
                      >
                        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#EBF4F0] text-xs font-semibold text-[#17211E] hover:text-[#0B6B4F] cursor-pointer group">
                          <span className="truncate">
                            {locale === 'ar' ? 'غسل الأموال ومكافحة تمويل الإرهاب' : 'AML & Counter-Terrorism'}
                          </span>
                          <SubArrow className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0B6B4F] shrink-0" />
                        </div>

                        {activeNestedMenu === 'aml' && (
                          <div className="absolute bottom-0 start-full ps-2 z-50 animate-in fade-in duration-150">
                            <div className="w-64 bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-[#12332B]/10 p-2 space-y-1 whitespace-normal text-start">
                              <Link
                                to={getLocalizedPath('/policies/aml-manual')}
                                onClick={handleImmediateClose}
                                className="block p-2 rounded-xl hover:bg-[#EBF4F0] text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] whitespace-normal"
                              >
                                {locale === 'ar' ? 'الدليل والمؤشرات والاجراءات' : 'AML Manual & Indicators'}
                              </Link>
                              <Link
                                to={getLocalizedPath('/policies/aml-prevention')}
                                onClick={handleImmediateClose}
                                className="block p-2 rounded-xl hover:bg-[#EBF4F0] text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] whitespace-normal"
                              >
                                {locale === 'ar' ? 'سياسية الوقاية' : 'Prevention Policy'}
                              </Link>
                              <Link
                                to={getLocalizedPath('/policies/aml-suspicion')}
                                onClick={handleImmediateClose}
                                className="block p-2 rounded-xl hover:bg-[#EBF4F0] text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] whitespace-normal"
                              >
                                {locale === 'ar' ? 'سياسة الاشتباة' : 'Suspicious Activity Policy'}
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* القوائم المالية (Financial Statements) */}
              <div
                className="relative"
                onMouseEnter={() => handleSubEnter('financials')}
              >
                <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F8F6] text-xs font-semibold text-[#17211E] hover:text-[#0B6B4F] cursor-pointer group transition-colors">
                  <span className="flex items-center gap-2.5">
                    <FileCheck className="w-4 h-4 text-[#C9A45C]" />
                    {locale === 'ar' ? 'القوائم المالية' : 'Financial Statements'}
                  </span>
                  <SubArrow className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0B6B4F]" />
                </div>

                {activeSubMenu === 'financials' && (
                  <div className="absolute top-0 start-full ps-2 z-50 animate-in fade-in duration-150">
                    <div className="w-64 bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-[#12332B]/10 p-2 space-y-1">
                      {availableFinancialYears.map((yr) => (
                        <Link
                          key={yr}
                          to={getLocalizedPath('/financial-statements')}
                          onClick={handleImmediateClose}
                          className="block p-2.5 rounded-xl hover:bg-[#EBF4F0] text-xs font-medium text-[#17211E] hover:text-[#0B6B4F]"
                        >
                          {locale === 'ar' ? `القوائم المالية لعام ${yr}` : `Financial Statements ${yr}`}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* اللوائح والأنظمة و الشهادات */}
              <div
                className="relative"
                onMouseEnter={() => handleSubEnter('regulations')}
              >
                <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F8F6] text-xs font-semibold text-[#17211E] hover:text-[#0B6B4F] cursor-pointer group transition-colors">
                  <span className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-[#0B6B4F]" />
                    {locale === 'ar' ? 'اللوائح والأنظمة و الشهادات' : 'Regulations & Certificates'}
                  </span>
                  <SubArrow className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0B6B4F]" />
                </div>

                {activeSubMenu === 'regulations' && (
                  <div className="absolute top-0 start-full ps-2 z-50 animate-in fade-in duration-150">
                    <div className="w-80 bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-[#12332B]/10 p-2 space-y-1 whitespace-normal text-start">
                      <Link
                        to={getLocalizedPath('/regulations/basic-bylaws')}
                        onClick={handleImmediateClose}
                        onMouseEnter={() => setActiveNestedMenu(null)}
                        className="block p-2 rounded-xl hover:bg-[#EBF4F0] text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] whitespace-normal"
                      >
                        {locale === 'ar' ? 'اللائحة الاساسية' : 'Basic Bylaws'}
                      </Link>
                      <Link
                        to={getLocalizedPath('/regulations/bylaws-approval')}
                        onClick={handleImmediateClose}
                        onMouseEnter={() => setActiveNestedMenu(null)}
                        className="block p-2 rounded-xl hover:bg-[#EBF4F0] text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] whitespace-normal"
                      >
                        {locale === 'ar' ? 'محضر اعتماد اللائحة الاساسية' : 'Bylaws Approval Minutes'}
                      </Link>
                      <Link
                        to={getLocalizedPath('/regulations/registration-certificate')}
                        onClick={handleImmediateClose}
                        onMouseEnter={() => setActiveNestedMenu(null)}
                        className="block p-2 rounded-xl hover:bg-[#EBF4F0] text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] whitespace-normal"
                      >
                        {locale === 'ar' ? 'شهادة تسجيل الجمعية' : 'Cooperative Registration Certificate'}
                      </Link>
                      <Link
                        to={getLocalizedPath('/regulations/work-regulations')}
                        onClick={handleImmediateClose}
                        onMouseEnter={() => setActiveNestedMenu(null)}
                        className="block p-2 rounded-xl hover:bg-[#EBF4F0] text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] whitespace-normal"
                      >
                        {locale === 'ar' ? 'لائحة تنظيم العمل' : 'Work Organization Regulations'}
                      </Link>
                      <Link
                        to={getLocalizedPath('/regulations/aml-law')}
                        onClick={handleImmediateClose}
                        onMouseEnter={() => setActiveNestedMenu(null)}
                        className="block p-2 rounded-xl hover:bg-[#EBF4F0] text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] whitespace-normal leading-snug"
                      >
                        {locale === 'ar'
                          ? 'نظام مكافحة غسل الاموال ولائحته التنفيذية'
                          : 'AML Law & Executive Regulations'}
                      </Link>
                      <Link
                        to={getLocalizedPath('/regulations/counter-terrorism-law')}
                        onClick={handleImmediateClose}
                        onMouseEnter={() => setActiveNestedMenu(null)}
                        className="block p-2 rounded-xl hover:bg-[#EBF4F0] text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] whitespace-normal leading-snug"
                      >
                        {locale === 'ar'
                          ? 'نظام مكافحة جرائم الارهاب وتمويله'
                          : 'Combating Terrorism Financing Law'}
                      </Link>

                      {/* الملفات المالية كقائمة فرعية متداخلة */}
                      <div
                        className="relative pt-1 border-t border-gray-100"
                        onMouseEnter={() => handleNestedEnter('fin-files')}
                      >
                        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#EBF4F0] text-xs font-semibold text-[#17211E] hover:text-[#0B6B4F] cursor-pointer group">
                          <span className="flex items-center gap-2">
                            <DollarSign className="w-3.5 h-3.5 text-[#C9A45C]" />
                            {locale === 'ar' ? 'الملفات المالية' : 'Financial Files'}
                          </span>
                          <SubArrow className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0B6B4F] shrink-0" />
                        </div>

                        {activeNestedMenu === 'fin-files' && (
                          <div className="absolute bottom-0 start-full ps-2 z-50 animate-in fade-in duration-150">
                            <div className="w-80 bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-[#12332B]/10 p-2 space-y-1 whitespace-normal text-start">
                              <Link
                                to={getLocalizedPath('/regulations/board-remuneration')}
                                onClick={handleImmediateClose}
                                className="block p-2.5 rounded-xl hover:bg-[#EBF4F0] text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] whitespace-normal leading-snug"
                              >
                                {locale === 'ar'
                                  ? 'سياسة المكافئات والامتيازات لأعضاء مجلس الإدارة'
                                  : 'Board Remuneration Policy'}
                              </Link>
                              <Link
                                to={getLocalizedPath('/regulations/financial-regulations')}
                                onClick={handleImmediateClose}
                                className="block p-2.5 rounded-xl hover:bg-[#EBF4F0] text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] whitespace-normal"
                              >
                                {locale === 'ar' ? 'اللائحة المالية' : 'Financial Regulations'}
                              </Link>
                              <Link
                                to={getLocalizedPath('/regulations/disbursement-policy')}
                                onClick={handleImmediateClose}
                                className="block p-2.5 rounded-xl hover:bg-[#EBF4F0] text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] whitespace-normal leading-snug"
                              >
                                {locale === 'ar' ? 'سياسة الصرف للبرامج والأنشطة' : 'Disbursement Policy'}
                              </Link>
                              <Link
                                to={getLocalizedPath('/regulations/procurement-bylaws')}
                                onClick={handleImmediateClose}
                                className="block p-2.5 rounded-xl hover:bg-[#EBF4F0] text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] whitespace-normal"
                              >
                                {locale === 'ar' ? 'لائحة المشتريات' : 'Procurement Bylaws'}
                              </Link>
                              <Link
                                to={getLocalizedPath('/regulations/receipts-procedures')}
                                onClick={handleImmediateClose}
                                className="block p-2.5 rounded-xl hover:bg-[#EBF4F0] text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] whitespace-normal leading-snug"
                              >
                                {locale === 'ar' ? 'إجراءات التعامل مع المقبوضات' : 'Receipts Handling Procedures'}
                              </Link>
                              <Link
                                to={getLocalizedPath('/regulations/financial-manual')}
                                onClick={handleImmediateClose}
                                className="block p-2.5 rounded-xl hover:bg-[#EBF4F0] text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] whitespace-normal leading-snug"
                              >
                                {locale === 'ar' ? 'دليل الإجرائات المالي' : 'Financial Procedures Guide'}
                              </Link>
                              <Link
                                to={getLocalizedPath('/regulations/investment-policy')}
                                onClick={handleImmediateClose}
                                className="block p-2.5 rounded-xl hover:bg-[#EBF4F0] text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] whitespace-normal"
                              >
                                {locale === 'ar' ? 'سياسة الإستثمار' : 'Investment Policy'}
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* الورش المقامة */}
              <div
                className="relative"
                onMouseEnter={() => handleSubEnter('workshops')}
              >
                <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F8F6] text-xs font-semibold text-[#17211E] hover:text-[#0B6B4F] cursor-pointer group transition-colors">
                  <span className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-[#C9A45C]" />
                    {locale === 'ar' ? 'الورش المقامة' : 'Conducted Workshops'}
                  </span>
                  <SubArrow className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0B6B4F]" />
                </div>

                {activeSubMenu === 'workshops' && (
                  <div className="absolute bottom-0 start-full ps-2 z-50 animate-in fade-in duration-150">
                    <div className="w-80 bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-[#12332B]/10 p-2 space-y-1 whitespace-normal text-start">
                      <Link
                        to={getLocalizedPath('/workshops/governance-intro')}
                        onClick={handleImmediateClose}
                        className="block p-2.5 rounded-xl hover:bg-[#EBF4F0] text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] whitespace-normal leading-snug"
                      >
                        {locale === 'ar' ? 'ورشة التعريف بالحوكمة' : 'Governance Orientation Workshop'}
                      </Link>
                      <Link
                        to={getLocalizedPath('/workshops/conflict-whistleblowing')}
                        onClick={handleImmediateClose}
                        className="block p-2.5 rounded-xl hover:bg-[#EBF4F0] text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] whitespace-normal leading-snug"
                      >
                        {locale === 'ar'
                          ? 'ورشة التعريف بسياسة تعارض المصالح وسياسة الابلاغ عن المخالفات'
                          : 'Conflict of Interest & Whistleblowing Workshop'}
                      </Link>
                      <Link
                        to={getLocalizedPath('/workshops/aml-counter-terrorism')}
                        onClick={handleImmediateClose}
                        className="block p-2.5 rounded-xl hover:bg-[#EBF4F0] text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] whitespace-normal leading-snug"
                      >
                        {locale === 'ar'
                          ? 'ورشة غسل الاموال ومكافحة جرائم تمويل الارهاب'
                          : 'AML & Counter-Terrorism Workshop'}
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* الورش المقامة بالشركات المجتمعية */}
              <div
                className="relative"
                onMouseEnter={() => handleSubEnter('community-workshops')}
              >
                <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F7F8F6] text-xs font-semibold text-[#17211E] hover:text-[#0B6B4F] cursor-pointer group transition-colors">
                  <span className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-[#0B6B4F]" />
                    {locale === 'ar'
                      ? 'الورش المقامة بالشركات المجتمعية'
                      : 'Community Partnerships Workshops'}
                  </span>
                  <SubArrow className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0B6B4F]" />
                </div>

                {activeSubMenu === 'community-workshops' && (
                  <div className="absolute bottom-0 start-full ps-2 z-50 animate-in fade-in duration-150">
                    <div className="w-80 bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-[#12332B]/10 p-2 space-y-1 whitespace-normal text-start">
                      <Link
                        to={getLocalizedPath('/workshops/community-conflict-whistleblowing')}
                        onClick={handleImmediateClose}
                        className="block p-2.5 rounded-xl hover:bg-[#EBF4F0] text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] whitespace-normal leading-snug"
                      >
                        {locale === 'ar'
                          ? 'ورشة التعريف بسياسة التعارض وسياسة الإبلاغ عن المخالفات'
                          : 'Conflict & Whistleblowing Workshop'}
                      </Link>
                      <Link
                        to={getLocalizedPath('/workshops/community-aml-counter-terrorism')}
                        onClick={handleImmediateClose}
                        className="block p-2.5 rounded-xl hover:bg-[#EBF4F0] text-xs font-medium text-[#17211E] hover:text-[#0B6B4F] whitespace-normal leading-snug"
                      >
                        {locale === 'ar'
                          ? 'ورشة غسل الاموال ومكافحة جرائم تمويل الارهاب'
                          : 'AML & Counter-Terrorism Workshop'}
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5. الجمعية في صور (Society in Photos) */}
      <Link
        to={getLocalizedPath('/gallery')}
        className={`px-2 py-1.5 xl:px-2.5 xl:py-2 rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 ${
          isCurrent('/gallery')
            ? 'text-[#0B6B4F] bg-[#EBF4F0]/80 font-bold shadow-xs'
            : 'text-[#17211E] hover:text-[#0B6B4F] hover:bg-[#F7F8F6]'
        }`}
      >
        {locale === 'ar' ? 'الجمعية في صور' : 'Society in Photos'}
      </Link>

      {/* 6. الشكاوى (Complaints & Surveys) */}
      <div
        className="relative shrink-0"
        onMouseEnter={() => handleMenuEnter('complaints')}
        onMouseLeave={handleMenuLeave}
      >
        <button
          type="button"
          className={`flex items-center gap-1 px-2 py-1.5 xl:px-2.5 xl:py-2 rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
            isComplaintsActive()
              ? 'text-[#0B6B4F] bg-[#EBF4F0]/80 font-bold shadow-xs'
              : 'text-[#17211E] hover:text-[#0B6B4F] hover:bg-[#F7F8F6]'
          }`}
          aria-expanded={activeMenu === 'complaints'}
        >
          <span>{locale === 'ar' ? 'الشكاوى' : 'Complaints & Surveys'}</span>
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              activeMenu === 'complaints' ? 'rotate-180 text-[#0B6B4F]' : 'text-gray-400'
            }`}
          />
        </button>

        {activeMenu === 'complaints' && (
          <div className="absolute top-full start-0 pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
            <div className="w-68 bg-white/98 backdrop-blur-md rounded-2xl shadow-2xl border border-[#12332B]/10 p-2 space-y-1 whitespace-normal text-start">
              <Link
                to={getLocalizedPath('whistleblowing')}
                            onClick={handleImmediateClose}
                className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-[#F7F8F6] text-xs font-semibold text-[#17211E] hover:text-[#0B6B4F] transition-colors whitespace-normal leading-snug"
              >
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{locale === 'ar' ? 'الإبلاغ عن المخالفات' : 'Whistleblowing'}</span>
              </Link>
              <Link
                to={getLocalizedPath('/surveys?type=supporters')}
                onClick={handleImmediateClose}
                className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-[#F7F8F6] text-xs font-semibold text-[#17211E] hover:text-[#0B6B4F] transition-colors whitespace-normal leading-snug"
              >
                <MessageSquareQuote className="w-4 h-4 text-[#0B6B4F] shrink-0" />
                <span>{locale === 'ar' ? 'قياس رضا الجهات الداعمة' : 'Supporter Satisfaction'}</span>
              </Link>
              <Link
                to={getLocalizedPath('/surveys?type=assembly')}
                onClick={handleImmediateClose}
                className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-[#F7F8F6] text-xs font-semibold text-[#17211E] hover:text-[#0B6B4F] transition-colors whitespace-normal leading-snug"
              >
                <MessageSquareQuote className="w-4 h-4 text-[#0B6B4F] shrink-0" />
                <span>
                  {locale === 'ar' ? 'قياس رضا اعضاء الجمعية العمومية' : 'Assembly Satisfaction'}
                </span>
              </Link>
              <Link
                to={getLocalizedPath('/surveys?type=customers')}
                onClick={handleImmediateClose}
                className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-[#F7F8F6] text-xs font-semibold text-[#17211E] hover:text-[#0B6B4F] transition-colors whitespace-normal leading-snug"
              >
                <MessageSquareQuote className="w-4 h-4 text-[#0B6B4F] shrink-0" />
                <span>{locale === 'ar' ? 'قياس رضا العملاء' : 'Customer Satisfaction'}</span>
              </Link>
              <Link
                to={getLocalizedPath('/surveys?type=staff')}
                onClick={handleImmediateClose}
                className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-[#F7F8F6] text-xs font-semibold text-[#17211E] hover:text-[#0B6B4F] transition-colors whitespace-normal leading-snug"
              >
                <MessageSquareQuote className="w-4 h-4 text-[#0B6B4F] shrink-0" />
                <span>{locale === 'ar' ? 'قياس رضا العاملين' : 'Staff Satisfaction'}</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* 7. التغذية الراجعة (Feedback) */}
      <Link
        to={getLocalizedPath('/feedback')}
        className={`px-2 py-1.5 xl:px-2.5 xl:py-2 rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 ${
          isCurrent('/feedback')
            ? 'text-[#0B6B4F] bg-[#EBF4F0]/80 font-bold shadow-xs'
            : 'text-[#17211E] hover:text-[#0B6B4F] hover:bg-[#F7F8F6]'
        }`}
      >
        {locale === 'ar' ? 'التغذية الراجعة' : 'Feedback'}
      </Link>

      {/* 8. قنوات التواصل (Contact Channels) */}
      <Link
        to={getLocalizedPath('/contact')}
        className={`px-2 py-1.5 xl:px-2.5 xl:py-2 rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 ${
          isCurrent('/contact')
            ? 'text-[#0B6B4F] bg-[#EBF4F0]/80 font-bold shadow-xs'
            : 'text-[#17211E] hover:text-[#0B6B4F] hover:bg-[#F7F8F6]'
        }`}
      >
        {locale === 'ar' ? 'قنوات التواصل' : 'Contact Channels'}
      </Link>

      {/* 9. المدير التنفيذي (Executive Director) */}
      <Link
        to={getLocalizedPath('/executive-director')}
        className={`px-2 py-1.5 xl:px-2.5 xl:py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
          isCurrent('/executive-director')
            ? 'text-[#0B6B4F] bg-[#EBF4F0]/80 font-bold shadow-xs'
            : 'text-[#17211E] hover:text-[#0B6B4F] hover:bg-[#F7F8F6]'
        }`}
      >
        <UserCog className="w-3.5 h-3.5 shrink-0" />
        <span>{locale === 'ar' ? 'المدير التنفيذي' : 'Executive Director'}</span>
      </Link>
    </nav>
  );
};
