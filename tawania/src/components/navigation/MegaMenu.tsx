import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../../i18n';

export const MegaMenu: React.FC = () => {
  const { locale, getLocalizedPath } = useI18n();
  const location = useLocation();

  const isCurrent = (path: string) => {
    // Normalise current path (strip any /ar or /en prefix and trailing slashes)
    const current = location.pathname.replace(/^\/(ar|en)/, '').replace(/\/+$/, '') || '/';
    const target = path.replace(/^\/(ar|en)/, '').replace(/\/+$/, '') || '/';

    if (target === '/') {
      return current === '/';
    }
    return current === target || current.startsWith(`${target}/`);
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
    return govPaths.some((p) => isCurrent(p));
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
      <Link
        to={getLocalizedPath('/members/directory')}
        className={`px-2 py-1.5 xl:px-2.5 xl:py-2 rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 ${
          isCurrent('/members/directory') || isCurrent('/members')
            ? 'text-[#0B6B4F] bg-[#EBF4F0]/80 font-bold shadow-xs'
            : 'text-[#17211E] hover:text-[#0B6B4F] hover:bg-[#F7F8F6]'
        }`}
      >
        {locale === 'ar' ? 'الأعضاء' : 'Members'}
      </Link>

      {/* 3. مجلس الإدارة (Board of Directors) */}
      <Link
        to={getLocalizedPath('/board')}
        className={`px-2 py-1.5 xl:px-2.5 xl:py-2 rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 ${
          isCurrent('/board')
            ? 'text-[#0B6B4F] bg-[#EBF4F0]/80 font-bold shadow-xs'
            : 'text-[#17211E] hover:text-[#0B6B4F] hover:bg-[#F7F8F6]'
        }`}
      >
        {locale === 'ar' ? 'مجلس الإدارة' : 'Board of Directors'}
      </Link>

      {/* 4. مشاريعنا (Our Projects) */}
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

      {/* 5. الحوكمة (Governance) */}
      <Link
        to={getLocalizedPath('/governance')}
        className={`px-2 py-1.5 xl:px-2.5 xl:py-2 rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 ${
          isGovernanceActive()
            ? 'text-[#0B6B4F] bg-[#EBF4F0]/80 font-bold shadow-xs'
            : 'text-[#17211E] hover:text-[#0B6B4F] hover:bg-[#F7F8F6]'
        }`}
      >
        {locale === 'ar' ? 'الحوكمة' : 'Governance'}
      </Link>

      {/* 6. الجمعية في صور (Society in Photos) */}
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

      {/* 7. الشكاوى (Complaints) */}
      <Link
        to={getLocalizedPath('/whistleblowing')}
        className={`px-2 py-1.5 xl:px-2.5 xl:py-2 rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 ${
          isCurrent('/whistleblowing')
            ? 'text-[#0B6B4F] bg-[#EBF4F0]/80 font-bold shadow-xs'
            : 'text-[#17211E] hover:text-[#0B6B4F] hover:bg-[#F7F8F6]'
        }`}
      >
        {locale === 'ar' ? 'الشكاوى' : 'Complaints'}
      </Link>

      {/* 8. قياس الرضا (Satisfaction Surveys) */}
      <Link
        to={getLocalizedPath('/surveys')}
        className={`px-2 py-1.5 xl:px-2.5 xl:py-2 rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 ${
          isCurrent('/surveys')
            ? 'text-[#0B6B4F] bg-[#EBF4F0]/80 font-bold shadow-xs'
            : 'text-[#17211E] hover:text-[#0B6B4F] hover:bg-[#F7F8F6]'
        }`}
      >
        {locale === 'ar' ? 'قياس الرضا' : 'Satisfaction Surveys'}
      </Link>

      {/* 9. التغذية الراجعة (Feedback) */}
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

      {/* 10. قنوات التواصل (Contact Channels) */}
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

      {/* 11. المدير التنفيذي (Executive Director) */}
      <Link
        to={getLocalizedPath('/executive-director')}
        className={`px-2 py-1.5 xl:px-2.5 xl:py-2 rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 ${
          isCurrent('/executive-director')
            ? 'text-[#0B6B4F] bg-[#EBF4F0]/80 font-bold shadow-xs'
            : 'text-[#17211E] hover:text-[#0B6B4F] hover:bg-[#F7F8F6]'
        }`}
      >
        {locale === 'ar' ? 'المدير التنفيذي' : 'Executive Director'}
      </Link>
    </nav>
  );
};
