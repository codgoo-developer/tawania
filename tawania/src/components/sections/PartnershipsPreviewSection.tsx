import React from 'react';
import { Link } from 'react-router-dom';
import { Handshake, ArrowLeft, ArrowRight, Building, CheckCircle } from 'lucide-react';
import { useI18n } from '../../i18n';
import { partnershipsData } from '../../data/partnerships';
import { Badge } from '../ui/Badge';

export const PartnershipsPreviewSection: React.FC = () => {
  const { locale, t, dir, getLocalized, getLocalizedPath } = useI18n();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section id="partnerships-preview-section" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl text-start">
            <Badge variant="primary" className="mb-3">
              <Handshake className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>{t.partnershipsSection.badge}</span>
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#12332B] tracking-tight">
              {t.partnershipsSection.title}
            </h2>
            <p className="text-base sm:text-lg text-[#68736F] mt-2">
              {t.partnershipsSection.subtitle}
            </p>
          </div>

          <Link
            to={getLocalizedPath('/partnerships')}
            className="text-xs sm:text-sm font-bold text-[#0B6B4F] hover:text-[#095740] flex items-center gap-1.5 shrink-0 self-start md:self-end group"
          >
            <span>{t.partnershipsSection.viewAllPartnerships}</span>
            <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </div>

        {/* Partnerships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {partnershipsData.map((partner) => (
            <div
              key={partner.id}
              className="bg-[#F7F8F6] rounded-2xl p-6 hover:border-[#0B6B4F]/40 hover:bg-[#EBF4F0]/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white text-[#0B6B4F] flex items-center justify-center shadow-xs">
                    <Building className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {getLocalized(partner.status)}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#12332B] mb-2 leading-snug">
                  {getLocalized(partner.partnerName)}
                </h3>

                <p className="text-xs text-[#68736F] leading-relaxed">
                  {getLocalized(partner.description)}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#12332B]/10 text-[11px] font-medium text-[#0B6B4F] flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{getLocalized(partner.type)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
