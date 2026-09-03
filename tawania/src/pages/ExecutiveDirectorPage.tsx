import React from 'react';
import {
  Phone,
  Mail,
  MessageCircle,
  Briefcase,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useI18n } from '../i18n';
import { useGovernanceData } from '../context/GovernanceDataContext';
import { PageHero } from '../components/layout/PageHero';

export const ExecutiveDirectorPage: React.FC = () => {
  const { locale, t } = useI18n();
  const { executiveDirector } = useGovernanceData();

  const responsibilities = [
    {
      titleAr: 'إدارة وتسيير الأعمال اليومية وتطبيق قرارات مجلس الإدارة.',
      titleEn: 'Day-to-day operations management and board resolution execution.'
    },
    {
      titleAr: 'إعداد وتوثيق خطط التشغيل والفرص الاستثمارية الزراعية.',
      titleEn: 'Preparing and documenting operational plans and investment opportunities.'
    },
    {
      titleAr: 'متابعة أداء الإدارات والمنافذ التسويقية والتشغيلية للجمعية.',
      titleEn: 'Monitoring performance of departments and commercial outlets.'
    },
    {
      titleAr: 'تمثيل الجمعية أمام الجهات الإشرافية والشركاء والمستثمرين.',
      titleEn: 'Representing the cooperative before regulatory bodies, partners, and investors.'
    }
  ];

  const displayName = locale === 'ar' ? executiveDirector.nameAr : (executiveDirector.nameEn || executiveDirector.nameAr);
  const displayRole = locale === 'ar' ? executiveDirector.roleAr : (executiveDirector.roleEn || executiveDirector.roleAr);
  const displayDesc = locale === 'ar' ? executiveDirector.descriptionAr : (executiveDirector.descriptionEn || executiveDirector.descriptionAr);
  
  // Auto-calculate first 2 letters from name
  const cleanedName = executiveDirector.nameAr ? executiveDirector.nameAr.replace(/^(أ\/\s*|أ\.\s*|د\.\s*|م\.\s*)/, '').trim() : '';
  const words = cleanedName.split(/\s+/).filter(Boolean);
  const initials = words.length >= 2
    ? `${words[0][0]} . ${words[1][0]}`
    : cleanedName.slice(0, 2) || 'م . ح';

  return (
    <div className="space-y-12 sm:space-y-16 pb-24">
      <PageHero
        badge={locale === 'ar' ? 'الهيكل القيادي' : 'Leadership Structure'}
        title={locale === 'ar' ? 'المدير التنفيذي' : 'Executive Director'}
        subtitle={locale === 'ar' ? 'الإدارة التنفيذية لتعاونية الشامل متعددة الأغراض' : 'Executive Management of AlShamel Multipurpose Cooperative'}
        breadcrumbs={[
          { label: t.nav.board, url: '/board' },
          { label: locale === 'ar' ? 'المدير التنفيذي' : 'Executive Director' }
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Leadership Profile Card (Horizontal Layout) */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#12332B]/10 shadow-sm relative text-start">
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

              {/* Name & Subtitle */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#12332B] tracking-tight">
                  {displayName}
                </h2>
                <p className="text-xs font-semibold text-gray-500 mt-1">
                  {locale === 'ar' ? 'جمعية الشامل التعاونية متعددة الأغراض (ترخيص رقم 234)' : 'AlShamel Multipurpose Cooperative (License #234)'}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#4A5550] leading-relaxed font-medium bg-[#F8FAF8] p-4 rounded-2xl border border-gray-100">
                {displayDesc}
              </p>

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

        {/* Executive Mandates & Core Responsibilities Grid */}
        <div className="space-y-4 text-start">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#0B6B4F]" />
            <h3 className="text-base sm:text-lg font-black text-[#12332B]">
              {locale === 'ar' ? 'الصلاحيات والمسؤوليات الرئيسية للمدير التنفيذي' : 'Core Powers & Responsibilities of the Executive Director'}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {responsibilities.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-2xs space-y-2 hover:border-[#0B6B4F]/30 hover:shadow-xs transition-all flex items-start gap-3"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#0B6B4F] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0B6B4F]" />
                </div>
                <p className="text-xs sm:text-sm text-[#38423E] leading-relaxed font-semibold">
                  {locale === 'ar' ? item.titleAr : item.titleEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Institutional Trust & Oversight Banner */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-50 via-white to-amber-50/50 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#0B6B4F] text-white flex items-center justify-center shadow-xs shrink-0">
              <ShieldCheck className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#0B6B4F] block">
                {locale === 'ar' ? 'حوكمة وإشراف رسمي معتمد' : 'Accredited Institutional Oversight'}
              </span>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {locale === 'ar' ? 'تخضع الإدارة التنفيذية لمتابعة مجلس الإدارة والمركز الوطني لتنمية القطاع غير الربحي' : 'Executive actions are supervised by the Board and NCNP.'}
              </p>
            </div>
          </div>
          <span className="text-xs font-bold font-mono text-[#0B6B4F] bg-white px-3.5 py-1.5 rounded-full border border-emerald-200 shadow-2xs shrink-0">
            License #234
          </span>
        </div>

      </section>
    </div>
  );
};

