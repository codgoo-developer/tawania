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
                className="w-full ps-10 pe-9 py-2.5 text-xs sm:text-sm rounded-2xl bg-white border border-gray-200 text-[#17211E] shadow-2xs outline-none focus:border-[#0B6B4F] focus:ring-2 focus:ring-[#0B6B4F]/10 transition-all text-start"
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
                className="bg-white rounded-3xl border border-[#0B6B4F]/15 overflow-hidden shadow-xs hover:shadow-xl hover:border-[#0B6B4F]/40 transition-all duration-300 flex flex-col justify-between group text-start relative"
              >
                {/* Top Green Accent Line */}
                <div className="h-1.5 w-full bg-gradient-to-r from-[#53A528] via-[#0B6B4F] to-[#53A528]" />

                {/* Optional Project Image */}
                {project.image && (
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-gradient-to-br from-[#EAF6F2] to-[#DDF0EB]">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                    <div className="absolute bottom-3 start-4 end-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/90 text-[#0B6B4F] backdrop-blur-xs shadow-xs">
                        <Sparkles className="w-3 h-3 text-[#53A528]" />
                        <span>{locale === 'ar' ? 'مشروع معتمد' : 'Verified Project'}</span>
                      </span>
                    </div>
                  </div>
                )}

                {/* Card Content Area */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-start space-y-4">
                  {/* Project Name (Required) - prominent text-start */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#53A528] tracking-tight leading-snug text-start group-hover:text-[#41861E] transition-colors">
                      {project.name}
                    </h3>
                  </div>

                  {/* Description (Optional) */}
                  {project.description && (
                    <p className="text-xs sm:text-sm font-medium text-[#2E473F] leading-relaxed text-start">
                      {project.description}
                    </p>
                  )}

                  {/* Sub Description / Dates (Optional) - styled callout box */}
                  {project.subDescription && (
                    <div className="p-3.5 rounded-2xl bg-[#F4FAF7] border border-[#0B6B4F]/15 text-start">
                      <p className="text-xs font-semibold text-[#1F4539] leading-relaxed whitespace-pre-line text-start">
                        {project.subDescription}
                      </p>
                    </div>
                  )}

                  {/* Features List (Optional) */}
                  {project.features && project.features.length > 0 && (
                    <div className="pt-3 border-t border-[#0B6B4F]/10 space-y-2.5">
                      <span className="text-[11px] font-black text-[#0B6B4F] uppercase tracking-wider block text-start">
                        {locale === 'ar' ? 'أبرز مميزات المشروع:' : 'Key Highlights:'}
                      </span>
                      <div className="space-y-2">
                        {project.features.map((feat, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2.5 text-xs font-semibold text-[#1C3A32] text-start bg-gray-50/70 p-2 rounded-xl border border-gray-100 group-hover:border-[#0B6B4F]/15 transition-colors"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#53A528] shrink-0 mt-0.5" />
                            <span className="leading-snug text-start flex-1">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer Society Banner (Fixed at the bottom of each card) */}
                <div className="p-4 sm:p-5 bg-gradient-to-b from-[#F2F8F5] to-[#E8F4EF] border-t border-[#0B6B4F]/15 text-start">
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="w-3.5 h-3.5 text-[#0B6B4F] shrink-0" />
                    <p className="text-xs sm:text-[12px] font-bold text-[#12332B] tracking-tight leading-tight text-start">
                      {project.societyNameAr || 'الجمعية التعاونية متعددة اغراض رضا بمحافظة الجموم'}
                    </p>
                  </div>
                  <p className="text-[10px] font-bold text-[#0B6B4F]/80 tracking-wider uppercase dir-ltr text-start ps-5">
                    {project.societyNameEn || 'THE MULTI-PURPOSE COOPERATIVE SOCIETY, REDA, IN JAMOUM GOVERNORATE'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-[#68736F] bg-white rounded-3xl border border-[#12332B]/10 max-w-lg mx-auto shadow-xs">
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
