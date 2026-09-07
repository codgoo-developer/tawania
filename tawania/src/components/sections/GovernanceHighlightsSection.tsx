import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Shield, DollarSign, Users, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { useI18n } from '../../i18n';
import { useGovernanceData } from '../../context/GovernanceDataContext';

export const GovernanceHighlightsSection: React.FC = () => {
  const { locale, dir, getLocalizedPath } = useI18n();
  const { policies, financials, ethics, meetings } = useGovernanceData();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const pillars = [
    {
      id: 'regulations',
      title: locale === 'ar' ? 'اللوائح والسياسات' : 'Regulations & Policies',
      desc: locale === 'ar'
        ? 'منظومة متكاملة من اللوائح والسياسات المعتمدة لتنظيم أعمال الجمعية.'
        : 'Approved regulations and policies governing institutional operations.',
      count: `${(policies || []).length} ${locale === 'ar' ? 'لائحة وسياسة' : 'Policies'}`,
      link: '/governance',
      icon: <FileText className="w-5 h-5 text-white" />,
      gradient: 'from-[#0B4F26] to-[#10B981]',
      borderHover: 'hover:border-[#10B981]/50',
      accentText: 'text-[#0B4F26]'
    },
    {
      id: 'financials',
      title: locale === 'ar' ? 'القوائم المالية' : 'Financial Statements',
      desc: locale === 'ar'
        ? 'تقارير مالية مدققة وإفصاحات دورية تعكس المتانة المالية.'
        : 'Audited financial statements and disclosures ensuring fiscal integrity.',
      count: `${(financials || []).length} ${locale === 'ar' ? 'قوائم مدققة' : 'Statements'}`,
      link: '/financial-statements',
      icon: <DollarSign className="w-5 h-5 text-white" />,
      gradient: 'from-[#2563EB] to-[#0B4F26]',
      borderHover: 'hover:border-[#2563EB]/50',
      accentText: 'text-[#2563EB]'
    },
    {
      id: 'ethics',
      title: locale === 'ar' ? 'الميثاق الأخلاقي' : 'Ethics & Conduct',
      desc: locale === 'ar'
        ? 'قواعد السلوك المهني والالتزام بالنزاهة والمسؤولية المجتمعية.'
        : 'Code of conduct ensuring transparency and community accountability.',
      count: `${(ethics || []).length > 0 ? (ethics || []).length : 1} ${locale === 'ar' ? 'ميثاق معتمد' : 'Charter'}`,
      link: '/ethics',
      icon: <Shield className="w-5 h-5 text-white" />,
      gradient: 'from-[#F97316] to-[#FACC15]',
      borderHover: 'hover:border-[#F97316]/50',
      accentText: 'text-[#F97316]'
    },
    {
      id: 'assembly',
      title: locale === 'ar' ? 'الجمعية العمومية' : 'General Assembly',
      desc: locale === 'ar'
        ? 'محاضر اجتماعات وقرارات الجمعية العمومية والمجلس.'
        : 'Minutes and resolutions of the general assembly meetings.',
      count: `${(meetings || []).length} ${locale === 'ar' ? 'اجتماع موثق' : 'Meetings'}`,
      link: '/meetings',
      icon: <Users className="w-5 h-5 text-white" />,
      gradient: 'from-[#84CC16] to-[#EAB308]',
      borderHover: 'hover:border-[#84CC16]/50',
      accentText: 'text-[#65A30D]'
    },
  ];

  return (
    <section id="governance-highlights-section" className="py-20 sm:py-28 bg-[#F8FAFC] relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#E8F7F0] text-[#0B4F26] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
            <span>{locale === 'ar' ? 'الحوكمة والشفافية' : 'Governance & Disclosure'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B4F26] tracking-tight mb-4">
            {locale === 'ar' ? 'ركائز الحوكمة والامتثال المؤسسي' : 'Pillars of Governance Excellence'}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#0B4F26] via-[#F97316] to-[#2563EB] mx-auto mb-5 rounded-full" />
          <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-medium">
            {locale === 'ar'
              ? 'نلتزم بأعلى معايير الحوكمة والشفافية لتعزيز ثقة الأعضاء وأصحاب المصلحة وفق الأنظمة واللوائح المعتمدة.'
              : 'Committed to highest governance standards ensuring stakeholder trust and regulatory compliance.'}
          </p>
        </div>

        {/* Pillars Grid (4 Cards with 4 Distinct Gradients) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => (
            <Link
              key={pillar.id}
              to={getLocalizedPath(pillar.link)}
              className={`p-6 rounded-2xl bg-white border border-[#0B4F26]/8 shadow-xs hover:shadow-xl ${pillar.borderHover} hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group text-start relative overflow-hidden`}
            >
              {/* Top Accent Gradient Strip */}
              <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${pillar.gradient}`} />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${pillar.gradient} shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    {pillar.icon}
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-50 border border-slate-100 ${pillar.accentText}`}>
                    {pillar.count}
                  </span>
                </div>

                <h3 className={`text-base font-bold text-[#0B4F26] mb-2 group-hover:${pillar.accentText} transition-colors`}>
                  {pillar.title}
                </h3>

                <p className="text-xs text-[#64748B] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className={`mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold ${pillar.accentText}`}>
                <span>{locale === 'ar' ? 'تصفح الوثائق والسجلات' : 'Browse Disclosures'}</span>
                <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
