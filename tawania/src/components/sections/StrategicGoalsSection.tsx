import React from 'react';
import { useI18n } from '../../i18n';
import { useGovernanceData } from '../../context/GovernanceDataContext';
import { strategicGoalsData } from '../../data/strategicGoals';

const PALETTE_GRADIENTS = [
  {
    name: 'growth',
    bgGrad: 'from-[#0B4F26] to-[#10B981]',
    textColor: 'text-[#0B4F26]',
    numColor: 'bg-gradient-to-r from-[#0B4F26] to-[#10B981]',
    borderColor: 'hover:border-[#10B981]/50',
    tag: 'النمو والاستدامة'
  },
  {
    name: 'energy',
    bgGrad: 'from-[#8B0000] to-[#EF4444]',
    textColor: 'text-[#8B0000]',
    numColor: 'bg-gradient-to-r from-[#8B0000] to-[#EF4444]',
    borderColor: 'hover:border-[#EF4444]/50',
    tag: 'الطاقة والشغف'
  },
  {
    name: 'progress',
    bgGrad: 'from-[#F97316] to-[#FACC15]',
    textColor: 'text-[#F97316]',
    numColor: 'bg-gradient-to-r from-[#F97316] to-[#FACC15]',
    borderColor: 'hover:border-[#F97316]/50',
    tag: 'التوافق والتقدم'
  },
  {
    name: 'future',
    bgGrad: 'from-[#84CC16] to-[#EAB308]',
    textColor: 'text-[#65A30D]',
    numColor: 'bg-gradient-to-r from-[#84CC16] to-[#EAB308]',
    borderColor: 'hover:border-[#84CC16]/50',
    tag: 'المستقبل والتجدد'
  },
  {
    name: 'trust',
    bgGrad: 'from-[#2563EB] to-[#0F172A]',
    textColor: 'text-[#2563EB]',
    numColor: 'bg-gradient-to-r from-[#2563EB] to-[#0F172A]',
    borderColor: 'hover:border-[#2563EB]/50',
    tag: 'الثقة والاتزان'
  }
];

export const StrategicGoalsSection: React.FC = () => {
  const { locale } = useI18n();
  const { strategicGoals } = useGovernanceData();

  const goalsList = strategicGoals && strategicGoals.length > 0 ? strategicGoals : strategicGoalsData.map(g => ({
    id: g.id,
    number: g.number,
    titleAr: g.title.ar,
    titleEn: g.title.en,
    descriptionAr: g.description.ar,
    descriptionEn: g.description.en
  }));

  return (
    <section id="strategic-goals-section" className="py-20 sm:py-28 bg-[#F8FAFC] relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header with 5-Color Gradient Bar */}
        <div className="flex items-center justify-end rtl:justify-start gap-3 mb-12 text-start">
          <div className="h-1.5 w-14 rounded-full bg-gradient-to-r from-[#0B4F26] via-[#F97316] to-[#2563EB]" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F172A] tracking-tight">
            {locale === 'ar' ? 'الأهداف الاستراتيجية' : 'Strategic Objectives'}
          </h2>
        </div>

        {/* Clean Cards with 5 Brand Color Gradients */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {goalsList.map((goal, idx) => {
            const title = locale === 'ar' ? goal.titleAr : goal.titleEn;
            const desc = locale === 'ar' ? goal.descriptionAr : goal.descriptionEn;
            const palette = PALETTE_GRADIENTS[idx % PALETTE_GRADIENTS.length];

            return (
              <div
                key={goal.id || idx}
                className={`bg-white rounded-2xl p-6 sm:p-7 border border-[#0F172A]/8 shadow-xs hover:shadow-xl ${palette.borderColor} hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group min-h-[230px] relative overflow-hidden`}
              >
                {/* Top Accent Gradient Line */}
                <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${palette.bgGrad}`} />

                {/* Number Badge with Gradient Background */}
                <div className={`w-12 h-12 rounded-xl text-white font-black font-sans text-xl flex items-center justify-center mb-4 shadow-xs group-hover:scale-110 transition-transform ${palette.numColor}`}>
                  {goal.number || (idx + 1)}
                </div>

                {/* Title & Description */}
                <div className="flex flex-col gap-2 flex-grow justify-start w-full">
                  <h3 className={`text-base sm:text-lg font-bold text-[#0F172A] group-hover:${palette.textColor} transition-colors leading-snug`}>
                    {title}
                  </h3>
                  {desc && (
                    <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mt-1 font-normal border-t border-gray-100 pt-2.5">
                      {desc}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
