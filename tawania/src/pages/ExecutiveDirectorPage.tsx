import React from 'react';
import {
  UserCog,
  Phone,
  Mail,
  MessageCircle,
  Briefcase,
  CheckCircle2,
  FileText,
  Sparkles
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
    ? (executiveDirector.descriptionAr || 'يتولى إدارة وتسيير الأعمال التنفيذية اليومية لجمعية الشامل ومتابعة الأهداف التشغيلية والمبادرات التنموية.')
    : (executiveDirector.descriptionEn || executiveDirector.descriptionAr || 'Manages daily executive operations of AlShamel Cooperative.');
  const initials = executiveDirector.initialsAr || displayName.slice(0, 5) || 'م . ت';

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

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Executive Director Profile Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#12332B]/10 shadow-lg relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">

            {/* Side 1: Luxury Layered Avatar */}
            <div className="shrink-0 flex flex-col items-center">
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1.5 bg-gradient-to-br from-[#C9A45C] via-[#0B6B4F] to-[#0A4D38] shadow-lg">
                <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-[#0B6B4F] to-[#063325] border-3 border-white flex items-center justify-center shadow-inner">
                  {executiveDirector.image ? (
                    <img src={executiveDirector.image} alt={displayName} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl sm:text-4xl font-black text-amber-200 font-serif tracking-wider select-none">
                      {initials}
                    </span>
                  )}
                </div>
                <div className="absolute -bottom-1 end-1 w-9 h-9 rounded-full bg-amber-100 text-amber-900 border-2 border-white flex items-center justify-center shadow-sm">
                  <Briefcase className="w-4 h-4 text-[#0B6B4F]" />
                </div>
              </div>

              <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>{locale === 'ar' ? 'تعيين رسمي معتمد' : 'Officially Appointed'}</span>
              </div>
            </div>

            {/* Side 2: Details & Direct Contacts */}
            <div className="flex-1 space-y-4 text-center md:text-start">

              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="text-xs font-black px-3.5 py-1 rounded-full bg-[#0B6B4F] text-white shadow-2xs inline-block">
                  {displayRole}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100/70 text-amber-900 border border-amber-200 inline-block">
                  {locale === 'ar' ? 'الهيكل القيادي • الإدارة التنفيذية' : 'Executive Leadership'}
                </span>
              </div>

              {/* Name */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#12332B] tracking-tight">
                  {displayName}
                </h2>
              </div>

              {/* Direct Communication Channels */}
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                {executiveDirector.phone && (
                  <a
                    href={`tel:${executiveDirector.phone}`}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#EBF4F0] hover:bg-[#0B6B4F] text-[#08523C] hover:text-white font-bold text-xs sm:text-sm transition-all shadow-2xs group"
                    dir="ltr"
                  >
                    <Phone className="w-4 h-4 text-[#C9A45C] group-hover:text-white transition-colors" />
                    <span>{executiveDirector.phone}</span>
                  </a>
                )}

                {executiveDirector.phone && (
                  <a
                    href={`https://wa.me/${executiveDirector.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#1EBE5D] hover:brightness-105 text-white font-bold text-xs sm:text-sm shadow-xs transition-all"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>{locale === 'ar' ? 'محادثة واتساب مباشرة' : 'Direct WhatsApp'}</span>
                  </a>
                )}

                {executiveDirector.email && (
                  <a
                    href={`mailto:${executiveDirector.email}`}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-gray-200 hover:border-[#0B6B4F] text-gray-700 hover:text-[#0B6B4F] font-bold text-xs sm:text-sm transition-all shadow-2xs"
                  >
                    <Mail className="w-4 h-4 text-[#0B6B4F]" />
                    <span>{executiveDirector.email}</span>
                  </a>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* الوصف والمهام الرئيسية (Description & Key Tasks) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#12332B]/10 shadow-sm space-y-4 text-start">
          <div className="flex items-center gap-2.5 border-b border-gray-100 pb-3">
            <div className="w-9 h-9 rounded-xl bg-[#EBF4F0] text-[#0B6B4F] flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-black text-[#12332B]">
              {locale === 'ar' ? 'الوصف والمهام الرئيسية' : 'Description & Key Tasks'}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-[#38423E] leading-relaxed font-medium whitespace-pre-line bg-[#F8FAF8] p-5 rounded-2xl border border-gray-100">
            {displayDesc}
          </p>
        </div>

      </section>
    </div>
  );
};
