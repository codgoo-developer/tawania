import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { useI18n } from '../../i18n';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

export const Breadcrumbs: React.FC<{ items: BreadcrumbItem[] }> = ({ items }) => {
  const { dir, t, getLocalizedPath } = useI18n();
  const Arrow = dir === 'rtl' ? ChevronLeft : ChevronRight;

  return (
    <nav
      id="breadcrumbs-nav"
      aria-label="Breadcrumb"
      className="flex items-center flex-wrap gap-1.5 text-xs text-[#68736F] py-2"
    >
      <Link
        to={getLocalizedPath('/')}
        className="flex items-center gap-1 hover:text-[#0B6B4F] transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>{t.nav.home}</span>
      </Link>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <Arrow className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            {isLast || !item.url ? (
              <span className="font-medium text-[#12332B] truncate max-w-[240px]">
                {item.label}
              </span>
            ) : (
              <Link
                to={getLocalizedPath(item.url)}
                className="hover:text-[#0B6B4F] transition-colors truncate max-w-[180px]"
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
