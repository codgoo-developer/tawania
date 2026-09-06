import React from 'react';
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs';
import { Badge } from '../ui/Badge';
import { Sparkles } from 'lucide-react';

export const PageHero: React.FC<{
  badge?: string;
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
  children?: React.ReactNode;
  action?: React.ReactNode;
}> = ({ badge, title, subtitle, breadcrumbs, children, action }) => {
  return (
    <div className="relative bg-gradient-to-b from-[#EBF4F0]/80 via-[#F7F8F6] to-[#F7F8F6] border-b border-[#12332B]/10 pt-8 pb-10 overflow-hidden">
      {/* Subtle Geometric Background */}
      <div className="absolute inset-0 bg-geo-pattern opacity-60 pointer-events-none" />
      <div className="absolute top-0 end-0 w-96 h-96 bg-[#0B6B4F]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb row */}
        <div className="mb-4">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* Hero Content with Flex Between Alignment */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-3xl">
            {badge && (
              <div className="mb-3">
                <Badge variant="primary">
                  <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span>{badge}</span>
                </Badge>
              </div>
            )}

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#12332B] tracking-tight leading-tight mb-2">
              {title}
            </h1>

            {subtitle && (
              <p className="text-sm sm:text-base text-[#68736F] leading-relaxed max-w-2xl font-medium">
                {subtitle}
              </p>
            )}

            {children && <div className="mt-4">{children}</div>}
          </div>

          {/* Action Button (e.g. تسجيل عضو جديد) */}
          {action && (
            <div className="shrink-0 flex items-center">
              {action}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
