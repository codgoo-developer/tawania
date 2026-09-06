import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, ArrowRight, Search, ShieldAlert } from 'lucide-react';
import { useI18n } from '../i18n';
import { Button } from '../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  const { locale, t, dir, getLocalizedPath } = useI18n();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl shadow-xs">
        <div className="w-16 h-16 rounded-2xl bg-[#EBF4F0] text-[#0B6B4F] flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-black text-[#12332B] font-mono">404</h1>
          <h2 className="text-xl font-bold text-[#12332B]">
            {locale === 'ar' ? 'الصفحة غير موجودة' : 'Page Not Found'}
          </h2>
          <p className="text-xs text-[#68736F] leading-relaxed">
            {locale === 'ar'
              ? 'عذراً، الصفحة التي تحاول الوصول إليها قد تم نقلها أو أنها غير متوفرة.'
              : 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'}
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            href={getLocalizedPath('/')}
            variant="primary"
            size="md"
            className="w-full sm:w-auto"
            leftIcon={<Home className="w-4 h-4" />}
          >
            {t.nav.home}
          </Button>

          <Button
            href={getLocalizedPath('/search')}
            variant="outline"
            size="md"
            className="w-full sm:w-auto"
            leftIcon={<Search className="w-4 h-4" />}
          >
            {t.search.title}
          </Button>
        </div>
      </div>
    </div>
  );
};
