import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, Building2 } from 'lucide-react';
import { useI18n } from '../../i18n';
import { useGovernanceData } from '../../context/GovernanceDataContext';

export const ProjectsShowcaseSection: React.FC = () => {
  const { locale, dir, getLocalizedPath } = useI18n();
  const isAr = locale === 'ar';
  const { projects, projectsHeader } = useGovernanceData();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const displayProjects = (projects || []).slice(0, 3);

  const badge = isAr
    ? (projectsHeader?.badgeAr || 'مشاريع واستثمارات الجمعية')
    : (projectsHeader?.badgeEn || 'Cooperative Enterprises');

  const title = isAr
    ? (projectsHeader?.titleAr || 'مشاريعنا التنموية')
    : (projectsHeader?.titleEn || 'Our Development Projects');

  const description = isAr
    ? (projectsHeader?.descAr || 'تعاونية الشامل أسست مشاريع متعددة عبر مختلف المجالات منذ تأسيسها بما في ذلك التسويق والأسواق الاستهلاكية والتوزيع ومصنع التعبئة والتغليف والأعلاف وتنمية الثروة الحيوانية والزراعية.')
    : (projectsHeader?.descEn || 'AlShamel Cooperative has established diverse impactful projects across various sectors since inception, including marketing, consumer markets, distribution, packaging facilities, and feed & agricultural development.');

  return (
    <section id="projects-overview-section" className="py-20 sm:py-28 bg-[#FBFDFB] relative border-t border-[#0F172A]/5">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header with dynamic description */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#EBF5F1] text-[#0B4F26] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#10B981]" />
            <span>{badge}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A] tracking-tight mb-4">
            {title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-[#0B4F26] to-[#10B981] mx-auto mb-5 rounded-full" />
          <p className="text-sm sm:text-base text-[#4A5550] leading-relaxed font-medium">
            {description}
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mb-14">
          {displayProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl border border-[#0B4F26]/15 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#0B4F26]/40 transition-all duration-300 flex flex-col justify-between group text-start relative"
            >
              <div className="h-1.5 w-full bg-gradient-to-r from-[#0B4F26] via-[#10B981] to-[#0B4F26]" />

              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gradient-to-br from-[#E8F7F0] via-[#D8EFE7] to-[#C9E7DC] flex items-center justify-center">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 z-1"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : null}

                {/* Fallback Graphic */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 pointer-events-none z-0">
                  <div className="w-14 h-14 rounded-2xl bg-white/80 shadow-xs border border-[#0B4F26]/20 flex items-center justify-center text-[#0B4F26] mb-1">
                    <Building2 className="w-7 h-7 text-[#0B4F26]" />
                  </div>
                  <span className="text-[11px] font-bold text-[#0B4F26] tracking-wide text-center line-clamp-1 px-4">
                    {project.name}
                  </span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none z-2" />

                <div className="absolute bottom-3 start-4 end-4 z-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 text-[#0B4F26] backdrop-blur-xs shadow-xs border border-[#0B4F26]/10">
                    <Sparkles className="w-3 h-3 text-[#10B981]" />
                    <span>{isAr ? 'مشروع معتمد' : 'Verified Project'}</span>
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-start space-y-4">
                <h3 className="text-2xl sm:text-3xl font-black text-[#10B981] tracking-tight leading-snug text-start group-hover:text-[#0B4F26] transition-colors">
                  {project.name}
                </h3>

                {project.description && (
                  <p className="text-xs sm:text-sm font-medium text-[#0F172A] leading-relaxed text-start">
                    {project.description}
                  </p>
                )}

                {project.subDescription && (
                  <div className="p-3.5 rounded-2xl bg-[#F4FAF7] border border-[#0B4F26]/15 text-start">
                    <p className="text-xs font-semibold text-[#0F172A] leading-relaxed whitespace-pre-line text-start">
                      {project.subDescription}
                    </p>
                  </div>
                )}

                {project.features && project.features.length > 0 && (
                  <div className="pt-3 border-t border-[#0B4F26]/10 space-y-2">
                    {project.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs font-semibold text-[#0F172A] text-start bg-gray-50/70 p-2 rounded-xl border border-gray-100"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                        <span className="leading-snug text-start flex-1">{feat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-5 bg-gradient-to-b from-[#F2F8F5] to-[#E8F4EF] border-t border-[#0B4F26]/15 text-start">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="w-3.5 h-3.5 text-[#0B4F26] shrink-0" />
                  <p className="text-xs font-bold text-[#0F172A] tracking-tight leading-tight text-start">
                    {project.societyNameAr || 'الجمعية التعاونية متعددة اغراض رضا بمحافظة الجموم'}
                  </p>
                </div>
                <p className="text-[10px] font-bold text-[#0B4F26]/80 tracking-wider uppercase dir-ltr text-start ps-5">
                  {project.societyNameEn || 'THE MULTI-PURPOSE COOPERATIVE SOCIETY, REDA, IN JAMOUM GOVERNORATE'}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button to All Projects */}
        <div className="text-center">
          <Link
            to={getLocalizedPath('/projects')}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#0B4F26] to-[#10B981] text-white font-bold text-sm sm:text-base shadow-md hover:brightness-110 hover:shadow-xl transition-all duration-200 group"
          >
            <span>{isAr ? 'عرض كافة مشاريع الجمعية' : 'View All Cooperative Projects'}</span>
            <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
};
