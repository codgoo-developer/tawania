import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Users, ShieldCheck, ArrowLeft, ArrowRight, MessageSquare } from 'lucide-react';
import { useI18n } from '../../i18n';
import { Button } from '../ui/Button';

export const CTASection: React.FC = () => {
  const { locale, t, dir, getLocalizedPath } = useI18n();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section id="cta-section" className="py-20 sm:py-28 bg-gradient-to-br from-[#12332B] to-[#0B211C] text-white relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute inset-0 bg-geo-dark opacity-40 pointer-events-none" />
      <div className="absolute top-0 end-0 w-96 h-96 bg-[#0B6B4F]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#C9A45C] bg-white/10 px-4 py-1.5 rounded-full border border-white/10 inline-block">
            {locale === 'ar' ? 'معاً نبني تنمية مستدامة بجدة' : 'Building Sustainable Cooperation Together'}
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-snug">
            {locale === 'ar'
              ? 'انضم إلى مساهمي الجمعية التعاونية بجدة واستفد من عوائد المشاريع'
              : 'Join AlShamel Cooperative Shareholders & Benefit from Sustainable Enterprise Growth'}
          </h2>

          <p className="text-base sm:text-lg text-[#CBD5CE] leading-relaxed max-w-2xl mx-auto">
            {locale === 'ar'
              ? 'اكتتب في أسهم الجمعية، ساهم في تنمية المحافظة، واستفد من الأرباح السنوية وعوائد المعاملات مع مشاريعنا العشرة.'
              : 'Subscribe to society equity, empower regional development, and earn annual dividends and patronage returns across our ten enterprises.'}
          </p>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <Button
              href={getLocalizedPath('/members/register')}
              variant="accent"
              size="lg"
              rightIcon={<Arrow className="w-4 h-4" />}
            >
              {locale === 'ar' ? 'دليل الانضمام والاكتتاب' : 'Shareholder Subscription Guide'}
            </Button>

            <Button
              href={getLocalizedPath('/contact')}
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 hover:text-white"
              leftIcon={<Phone className="w-4 h-4 text-[#C9A45C]" />}
            >
              {t.common.contactUs}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
