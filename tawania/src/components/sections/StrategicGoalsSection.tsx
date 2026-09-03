import React from 'react';
import { useI18n } from '../../i18n';
import { useGovernanceData } from '../../context/GovernanceDataContext';
import { strategicGoalsData } from '../../data/strategicGoals';

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
    <section id="strategic-goals-section" className="py-20 sm:py-28 bg-[#F6F7F2] relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header with Line Badge matching screen.png */}
        <div className="flex items-center justify-end rtl:justify-start gap-3 mb-12 text-start">
          <span className="w-10 h-1 bg-gradient-to-br from-[#0B6B4F] to-[#095B42] rounded-full" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#12332B] tracking-tight">
            {locale === 'ar' ? 'الأهداف الاستراتيجية' : 'Strategic Objectives'}
          </h2>
        </div>

        {/* Clean Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {goalsList.map((goal, idx) => (
            <div
              key={goal.id || idx}
              className="bg-white rounded-2xl p-7 sm:p-8 border border-[#12332B]/5 shadow-xs hover:shadow-md hover:border-[#095B42]/30 transition-all duration-300 flex flex-col justify-center items-center text-center min-h-[170px] group"
            >
              {/* Number (01 - 08) in soft emerald font */}
              <div className="text-3xl sm:text-4xl font-black text-[#5EA88F] font-sans tracking-tight mb-3">
                {goal.number || (idx + 1)}
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-[#12332B] group-hover:text-[#095B42] transition-colors leading-snug">
                {locale === 'ar' ? goal.titleAr : goal.titleEn}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
