import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useI18n } from '../../i18n';

export const MegaMenu: React.FC = () => {
  const { locale, getLocalizedPath } = useI18n();
  const location = useLocation();
  const isAr = locale === 'ar';

  const isCurrent = (path: string) => {
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

  const navLinks = [
    {
      to: '/',
      labelAr: 'الرئيسية',
      labelEn: 'Home',
      isActive: () => isCurrent('/')
    },
    {
      to: '/members/directory',
      labelAr: 'الأعضاء',
      labelEn: 'Members',
      isActive: () => isCurrent('/members/directory') || isCurrent('/members')
    },
    {
      to: '/board',
      labelAr: 'مجلس الإدارة',
      labelEn: 'Board',
      isActive: () => isCurrent('/board')
    },
    {
      to: '/projects',
      labelAr: 'مشاريعنا',
      labelEn: 'Projects',
      isActive: () => isCurrent('/projects')
    },
    {
      to: '/governance',
      labelAr: 'الحوكمة',
      labelEn: 'Governance',
      isActive: isGovernanceActive
    },
    {
      to: '/gallery',
      labelAr: 'الجمعية في صور',
      labelEn: 'Gallery',
      isActive: () => isCurrent('/gallery')
    },
    {
      to: '/whistleblowing',
      labelAr: 'الشكاوى',
      labelEn: 'Complaints',
      isActive: () => isCurrent('/whistleblowing')
    },
    {
      to: '/surveys',
      labelAr: 'قياس الرضا',
      labelEn: 'Surveys',
      isActive: () => isCurrent('/surveys')
    },
    {
      to: '/feedback',
      labelAr: 'التغذية الراجعة',
      labelEn: 'Feedback',
      isActive: () => isCurrent('/feedback')
    },
    {
      to: '/contact',
      labelAr: 'قنوات التواصل',
      labelEn: 'Contact',
      isActive: () => isCurrent('/contact')
    },
    {
      to: '/executive-director',
      labelAr: 'المدير التنفيذي',
      labelEn: 'Executive Director',
      isActive: () => isCurrent('/executive-director')
    }
  ];

  return (
    <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 text-[11.5px] xl:text-[12.5px] 2xl:text-[13px] font-semibold select-none shrink">
      {navLinks.map((link) => {
        const active = link.isActive();

        return (
          <Link
            key={link.to}
            to={getLocalizedPath(link.to)}
            className={`px-1.5 py-1.5 xl:px-2 xl:py-1.5 rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 ${
              active
                ? 'text-[#0B6B4F] bg-[#EBF4F0]/90 font-bold shadow-2xs'
                : 'text-[#17211E] hover:text-[#0B6B4F] hover:bg-[#F7F8F6]'
            }`}
          >
            {isAr ? link.labelAr : link.labelEn}
          </Link>
        );
      })}
    </nav>
  );
};
