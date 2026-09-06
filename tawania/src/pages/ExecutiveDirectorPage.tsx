import React from 'react';
import {
  Phone,
  Mail,
  MessageSquare,
  CheckCircle2
} from 'lucide-react';
import { useI18n } from '../i18n';
import { useGovernanceData } from '../context/GovernanceDataContext';
import { PageHero } from '../components/layout/PageHero';

export const ExecutiveDirectorPage: React.FC = () => {
  const { locale } = useI18n();
  const { executiveDirector } = useGovernanceData();

  if (!executiveDirector) {
    return (
      <div className="py-24 text-center">
        <p className="text-gray-500 font-medium">
          {locale === 'ar' ? 'بيانات المدير التنفيذي غير متوفرة حالياً' : 'Executive Director details not available'}
        </p>
      </div>
    );
  }

  const displayName = locale === 'ar' ? executiveDirector.nameAr : (executiveDirector.nameEn || executiveDirector.nameAr);
  const displayRole = locale === 'ar' ? executiveDirector.roleAr : (executiveDirector.roleEn || executiveDirector.roleAr);
  const displayDesc = locale === 'ar'
    ? (executiveDirector.descriptionAr || executiveDirector.bioAr || 'يتولى إدارة وتسيير الأعمال التنفيذية اليومية لجمعية الشامل ومتابعة الأهداف التشغيلية والمبادرات التنموية.')
    : (executiveDirector.descriptionEn || executiveDirector.bioEn || executiveDirector.descriptionAr || 'Manages daily executive operations of AlShamel Cooperative.');

  const autoInitials = executiveDirector.initialsAr || (
    displayName
      ? displayName
          .trim()
          .split(/\s+/)
          .slice(0, 2)
          .map((w: string) => w[0])
          .join(' ')
      : 'م ت'
  );

  return (
    <div className="space-y-10 pb-24 bg-[#F7F8F6]">
      {/* Hero Header */}
      <PageHero
        badge={locale === 'ar' ? 'الهيكل القيادي والتنفيذي' : 'Executive Leadership'}
        title={locale === 'ar' ? 'المدير التنفيذي' : 'Executive Director'}
        subtitle={locale === 'ar' ? 'بيانات وقنوات التواصل الرسمية مع الإدارة التنفيذية لجمعية الشامل' : 'Official profile and direct communication channels with the Executive Director'}
        breadcrumbs={[
          { label: locale === 'ar' ? 'عن الجمعية' : 'About' },
          { label: locale === 'ar' ? 'المدير التنفيذي' : 'Executive Director' }
        ]}
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Executive Director Profile Card - Exactly matches Dashboard Layout */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 sm:p-8 text-center space-y-6 relative overflow-hidden ">
          {/* Top Accent Ribbon */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#0B6B4F] via-[#84CC16] to-[#0B6B4F]" />

          {/* Luxury Avatar / Photo */}
          <div className="relative inline-block mx-auto mt-2">
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[#095B42] via-[#0B6B4F] to-[#042B1F] text-amber-200 font-bold font-serif text-3xl flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
              {executiveDirector.image ? (
                <img src={executiveDirector.image} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                <span className="font-serif tracking-wider select-none">{autoInitials}</span>
              )}
            </div>
   
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-gray-900 leading-snug">{displayName}</h3>
            <p className="text-xs font-bold text-[#095B42] bg-[#EBF4F0] px-4 py-1 rounded-full inline-block border border-[#095B42]/15">
              {displayRole}
            </p>
            {executiveDirector.email && (
              <p className="text-xs text-gray-500 font-mono dir-ltr mt-1 block">{executiveDirector.email}</p>
            )}
            {/* Description & Key Tasks value placed under name */}
            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium bg-[#F8FAF8] p-4 rounded-2xl border border-gray-200/60 mt-3 text-start">
              {displayDesc}
            </p>
          </div>

          {/* Contact Channels & Direct Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs pt-1">
            {executiveDirector.phone && (
              <a
                href={`tel:${executiveDirector.phone}`}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-[#095B42] font-bold transition-all border border-gray-200/60 shadow-2xs"
                dir="ltr"
              >
                <Phone className="w-4 h-4 text-[#095B42]" />
                <span className="font-mono text-xs">{executiveDirector.phone}</span>
              </a>
            )}

            {executiveDirector.phone && (
              <a
                href={`https://wa.me/${executiveDirector.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold transition-all shadow-2xs"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>{locale === 'ar' ? 'محادثة واتساب' : 'WhatsApp Chat'}</span>
              </a>
            )}

            {executiveDirector.email && (
              <a
                href={`mailto:${executiveDirector.email}`}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white hover:bg-gray-50 text-gray-700 hover:text-[#095B42] font-bold transition-all border border-gray-200/60 shadow-2xs"
              >
                <Mail className="w-4 h-4 text-[#095B42]" />
                <span>{locale === 'ar' ? 'البريد الإلكتروني' : 'Send Email'}</span>
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
