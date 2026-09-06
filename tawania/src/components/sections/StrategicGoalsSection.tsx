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

        {/* Clean Cards with Title and Description */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {goalsList.map((goal, idx) => {
            const title = locale === 'ar' ? goal.titleAr : goal.titleEn;
            const desc = locale === 'ar' ? goal.descriptionAr : goal.descriptionEn;

            return (
              <div
                key={goal.id || idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#12332B]/5 shadow-xs hover:shadow-lg hover:border-[#095B42]/30 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group min-h-[220px]"
              >
                {/* Number (1 - 7) in soft emerald font */}
                <div className="text-3xl sm:text-4xl font-black text-[#5EA88F] font-sans tracking-tight mb-3 group-hover:scale-105 transition-transform">
                  {goal.number || (idx + 1)}
                </div>

                {/* Title & Description */}
                <div className="flex flex-col gap-2 flex-grow justify-start w-full">
                  <h3 className="text-base sm:text-lg font-bold text-[#12332B] group-hover:text-[#095B42] transition-colors leading-snug">
                    {title}
                  </h3>
                  {desc && (
                    <p className="text-xs sm:text-sm text-[#525E59] leading-relaxed mt-1 font-normal border-t border-gray-100 pt-2">
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
