import React, { useState } from 'react';
import { Search, CheckCircle2, Sparkles, Building2 } from 'lucide-react';
import { useI18n } from '../i18n';
import { useGovernanceData } from '../context/GovernanceDataContext';
import { PageHero } from '../components/layout/PageHero';

export const ProjectsPage: React.FC = () => {
  const { locale, t, dir } = useI18n();
  const { projects, projectsHeader } = useGovernanceData();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = (projects || []).filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      (p.subDescription && p.subDescription.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-12 pb-24 bg-[#FBFDFB] min-h-screen">
      <PageHero
        badge={locale === 'ar' ? 'مشاريعنا' : 'Our Projects'}
        title={locale === 'ar' ? 'مشاريع الجمعية' : 'Cooperative Projects'}
        subtitle={
          locale === 'ar'
            ? (projectsHeader?.descAr || 'تعاونية الرضا أسست مشاريع متعددة عبر مختلف المجالات منذ تأسيسها بما في ذلك التسويق والأسواق الاستهلاكية والتوزيع ومصنع التعبئة والتغليف والأعلاف وتنمية الثروة الحيوانية والزراعية.')
            : (projectsHeader?.descEn || 'Al-Reda Cooperative has established diverse impactful projects across various sectors since inception, including marketing, consumer markets, distribution, packaging facilities, and feed & agricultural development.')
        }
        breadcrumbs={[{ label: locale === 'ar' ? 'المشاريع' : 'Projects' }]}
        action={
          <div className="w-full sm:w-80 lg:w-96">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={locale === 'ar' ? 'البحث في مشاريع الجمعية...' : 'Search cooperative projects...'}
                className="w-full ps-10 pe-9 py-2.5 text-xs sm:text-sm rounded-2xl bg-white text-[#17211E] shadow-2xs outline-none focus:border-[#0B4F26] focus:ring-2 focus:ring-[#0B4F26]/10 transition-all text-start"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute end-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 flex items-center justify-center text-[10px] cursor-pointer transition-colors"
                  aria-label="Clear Search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        }
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Projects Cards Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-3xl border border-[#0B4F26]/15 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#0B4F26]/40 transition-all duration-300 flex flex-col justify-between group text-start relative"
              >
                {/* Top Accent Line */}
                <div className="h-1.5 w-full bg-gradient-to-r from-[#2563EB] via-[#10B981] to-[#0F172A]" />

                {/* Project Image / Branded Default Fallback Banner */}
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

                  {/* Fallback Graphic (shows when no image or image failed to load) */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 pointer-events-none z-0">
                    <div className="w-14 h-14 rounded-2xl bg-white/80 shadow-xs border border-[#2563EB]/20 flex items-center justify-center text-[#2563EB] mb-1">
                      <Building2 className="w-7 h-7 text-[#2563EB]" />
                    </div>
                    <span className="text-[11px] font-bold text-[#0F172A] tracking-wide text-center line-clamp-1 px-4">
                      {project.name}
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none z-2" />
                </div>

                {/* Card Content Area */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-start space-y-3">
                  {/* Project Name (Required) */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight leading-snug text-start group-hover:text-[#2563EB] transition-colors">
                      {project.name}
                    </h3>
                  </div>

                  {/* Description (Optional) */}
                  {project.description && (
                    <p className="text-xs sm:text-sm font-normal text-slate-600 leading-relaxed text-start">
                      {project.description}
                    </p>
                  )}

                  {/* Sub Description / Dates (Optional) - styled callout box */}
                  {project.subDescription && (
                    <div className="p-2.5 sm:p-3 rounded-xl bg-[#F8FAFC] border border-[#2563EB]/15 text-start">
                      <p className="text-xs font-medium text-[#0F172A] leading-relaxed whitespace-pre-line text-start">
                        {project.subDescription}
                      </p>
                    </div>
                  )}

                  {/* Features List (Optional) */}
                  {project.features && project.features.length > 0 && (
                    <div className="pt-2.5 border-t border-slate-100 space-y-1.5">
                      <span className="text-[11px] font-bold text-[#0F172A] uppercase tracking-wider block text-start">
                        {locale === 'ar' ? 'أبرز مميزات المشروع:' : 'Key Highlights:'}
                      </span>
                      <div className="space-y-1.5">
                        {project.features.map((feat, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 text-xs font-medium text-slate-700 text-start bg-slate-50 p-2 rounded-lg border border-slate-100 group-hover:border-[#2563EB]/20 transition-colors"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                            <span className="leading-snug text-start flex-1">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer Society Banner (Fixed at the bottom of each card) */}
                <div className="p-3 sm:p-4 bg-gradient-to-b from-[#F8FAFC] to-[#F1F5F9] border-t border-[#2563EB]/10 text-start">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Building2 className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                    <p className="text-xs font-bold text-[#0F172A] tracking-tight leading-tight text-start">
                      {project.societyNameAr || 'الجمعية التعاونية متعددة اغراض رضا بمحافظة الجموم'}
                    </p>
                  </div>
                  <p className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase dir-ltr text-start ps-5">
                    {project.societyNameEn || 'THE MULTI-PURPOSE COOPERATIVE SOCIETY, REDA, IN JAMOUM GOVERNORATE'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-[#68736F] bg-white rounded-3xl max-w-lg mx-auto shadow-xs">
            <p className="text-base font-semibold">{t.common.noResults}</p>
            <p className="text-xs text-gray-400 mt-1">
              {locale === 'ar' ? 'لا توجد مشاريع مطابقة للبحث.' : 'No projects matched your search.'}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
