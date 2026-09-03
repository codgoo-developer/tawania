import React from 'react';
import { useI18n } from '../../i18n';
import { useGovernanceData } from '../../context/GovernanceDataContext';

export const TrustStatsSection: React.FC = () => {
  const { locale } = useI18n();
  const { homeStatsData } = useGovernanceData();

  const stats = (homeStatsData && homeStatsData.length > 0) ? homeStatsData.map(s => ({
    value: locale === 'ar' ? s.valueAr : s.valueEn,
    label: locale === 'ar' ? s.labelAr : s.labelEn
  })) : [
    {
      value: '12',
      label: locale === 'ar' ? 'أعضاء الجمعية العمومية' : 'General Assembly Members',
    },
    {
      value: locale === 'ar' ? '17,120 سهم' : '17,120 Shares',
      label: locale === 'ar' ? 'عدد الأسهم' : 'Total Subscribed Shares',
    },
    {
      value: locale === 'ar' ? '1,720,000 ريال' : '1,720,000 SAR',
      label: locale === 'ar' ? 'رأس المال' : 'Capital',
    },
    {
      value: '5',
      label: locale === 'ar' ? 'أعضاء مجلس الإدارة' : 'Board of Directors',
    },
  ];

  return (
    <section id="trust-stats-bar" className="bg-gradient-to-br from-[#095B42] to-[#064230] text-white py-7 sm:py-10 border-y border-[#0E7A5A]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`
                text-center flex flex-col items-center justify-center
                px-4 py-4 sm:py-5
                ${index < stats.length - 1
                  ? 'border-e border-white/20'
                  : ''}
                ${index >= 2 ? 'border-t border-white/20 md:border-t-0' : ''}
              `}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight font-sans mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-white/80 font-medium tracking-wide leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
