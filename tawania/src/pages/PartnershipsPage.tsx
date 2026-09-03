import React from 'react';
import {
  Handshake,
  Building,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';
import { useI18n } from '../i18n';
import { partnershipsData } from '../data/partnerships';
import { PageHero } from '../components/layout/PageHero';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const PartnershipsPage: React.FC = () => {
  const { locale, t, dir, getLocalized, getLocalizedPath } = useI18n();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-16 pb-20">
      <PageHero
        badge={t.partnershipsPage.badge}
        title={t.partnershipsPage.title}
        subtitle={t.partnershipsPage.subtitle}
        breadcrumbs={[
          { label: t.nav.mediaDropdown, url: '/media' },
          { label: t.nav.partnerships }
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partnershipsData.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-3xl p-8 border border-[#12332B]/10 shadow-xs hover:shadow-md hover:border-[#0B6B4F]/30 transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#EBF4F0] text-[#0B6B4F] flex items-center justify-center font-bold">
                    <Building className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {getLocalized(partner.status)}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-bold text-[#C9A45C] block mb-1">
                    {getLocalized(partner.type)}
                  </span>
                  <h3 className="text-lg font-bold text-[#12332B]">
                    {getLocalized(partner.partnerName)}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#68736F] leading-relaxed">
                  {getLocalized(partner.description)}
                </p>

                {/* Scope list */}
                {partner.scope && partner.scope.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-[#12332B]/5">
                    {partner.scope.map((sc, scIdx) => (
                      <div key={scIdx} className="flex items-start gap-2 text-xs text-[#17211E]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0B6B4F] shrink-0 mt-0.5" />
                        <span>{getLocalized(sc)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#12332B]/5 flex items-center justify-between text-xs text-[#68736F]">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#0B6B4F]" />
                  <span>{locale === 'ar' ? 'سنة التوقيع:' : 'Year:'} {partner.year}</span>
                </div>

                <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{locale === 'ar' ? 'سارية ومفعلة' : 'Active'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call for Partnership */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#12332B] to-[#0B211C] text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-geo-dark opacity-30 pointer-events-none" />
          <div className="relative max-w-2xl mx-auto space-y-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {locale === 'ar' ? 'هل تمثل جهة حكومية أو قطاع خاص وترغب في الشراكة؟' : 'Represent a Government or Corporate Entity Seeking Collaboration?'}
            </h3>
            <p className="text-xs sm:text-sm text-[#CBD5CE] leading-relaxed">
              {locale === 'ar'
                ? 'ترحب الجمعية التعاونية بجدة بجميع المبادرات والشراكات الاستراتيجية التي تخدم المجتمع المحلي وتنمي الاستثمار التعاوني.'
                : 'AlShamel warmly welcomes strategic partnerships and community development initiatives in Jeddah.'}
            </p>
            <div className="pt-2">
              <Button
                href={getLocalizedPath('/contact')}
                variant="accent"
                size="md"
              >
                {locale === 'ar' ? 'تقديم طلب شراكة استراتيجية' : 'Submit Partnership Request'}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
