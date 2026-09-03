import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Briefcase,
  Calendar,
  CheckCircle2,
  Phone,
  Mail,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Layers,
  Award,
  BarChart3,
  ExternalLink
} from 'lucide-react';
import { useI18n } from '../i18n';
import { projectsData } from '../data/projects';
import { PageHero } from '../components/layout/PageHero';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { locale, t, dir, getLocalized, getLocalizedPath } = useI18n();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to={getLocalizedPath('/projects')} replace />;
  }

  const relatedProjects = projectsData
    .filter((p) => p.slug !== project.slug && (project.relatedSlugs?.includes(p.slug) || p.categoryKey === project.categoryKey))
    .slice(0, 3);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero with Breadcrumbs */}
      <PageHero
        badge={getLocalized(project.category)}
        title={getLocalized(project.name)}
        subtitle={getLocalized(project.shortDescription)}
        breadcrumbs={[
          { label: t.nav.allProjects, url: '/projects' },
          { label: getLocalized(project.name) }
        ]}
      />

      {/* Main Content Body */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Column (8 cols) */}
          <div className="lg:col-span-8 space-y-10 text-start">
            {/* Main Featured Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-[#12332B]/10 h-72 sm:h-96">
              <img
                src={project.heroImage || project.thumbnailImage}
                alt={getLocalized(project.name)}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 start-4">
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-gradient-to-br from-[#0B6B4F] to-[#095B42] text-white shadow-sm">
                  {getLocalized(project.category)}
                </span>
              </div>
            </div>

            {/* Description Paragraph */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-[#12332B]">
                {locale === 'ar' ? 'نبذة تفصيلية عن المشروع' : 'Project Overview'}
              </h2>
              <p className="text-sm sm:text-base text-[#68736F] leading-relaxed">
                {getLocalized(project.fullDescription)}
              </p>
            </div>

            {/* Key Services & Capabilities */}
            {project.services && project.services.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#12332B]">
                  {locale === 'ar' ? 'أبرز خدمات المشروع' : 'Key Services & Solutions'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.services.map((service, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-white border border-[#12332B]/10 shadow-2xs space-y-1.5"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#0B6B4F] shrink-0" />
                        <h4 className="text-sm font-bold text-[#17211E]">{getLocalized(service.title)}</h4>
                      </div>
                      <p className="text-xs text-[#68736F] leading-relaxed ps-6">
                        {getLocalized(service.description)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Objectives */}
            {project.objectives && project.objectives.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#12332B]">
                  {locale === 'ar' ? 'أهداف المشروع الاستراتيجية' : 'Strategic Objectives'}
                </h3>
                <div className="space-y-3">
                  {project.objectives.map((obj, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#F7F8F6] border border-[#12332B]/10 flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#0B6B4F] to-[#095B42] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#12332B]">{getLocalized(obj.title)}</h4>
                        {obj.description && (
                          <p className="text-xs text-[#68736F] mt-1">{getLocalized(obj.description)}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Impact Highlights */}
            {project.impact && project.impact.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#12332B]">
                  {locale === 'ar' ? 'الأثر التنموي والمجتمعي' : 'Developmental & Community Impact'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.impact.map((imp, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/60 flex items-start gap-2.5 text-xs text-emerald-950 font-medium"
                    >
                      <Award className="w-4 h-4 text-[#0B6B4F] shrink-0 mt-0.5" />
                      <span>{getLocalized(imp)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery Images if available */}
            {project.galleryImages && project.galleryImages.length > 1 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#12332B]">
                  {locale === 'ar' ? 'معرض صور المشروع' : 'Project Gallery'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.galleryImages.map((imgUrl, imgIdx) => (
                    <div key={imgIdx} className="rounded-2xl overflow-hidden h-36 border border-[#12332B]/10">
                      <img
                        src={imgUrl}
                        alt={`${getLocalized(project.name)} ${imgIdx + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Column (4 cols) - Sticky Fixed */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-[110px] self-start z-10">
            {/* Quick Stats Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#12332B]/10 shadow-sm space-y-6">
              <h3 className="text-base font-bold text-[#12332B] pb-3 border-b border-[#12332B]/5">
                {locale === 'ar' ? 'بطاقة المشروع ومؤشراته' : 'Project Quick Facts'}
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#68736F]">{locale === 'ar' ? 'سنة التأسيس' : 'Year Established'}</span>
                  <span className="font-bold text-[#12332B] font-mono">{project.yearEstablished}</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#68736F]">{locale === 'ar' ? 'حالة المشروع' : 'Operational Status'}</span>
                  <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    {locale === 'ar' ? 'قائم ويعمل بكفاءة' : 'Active & Operating'}
                  </span>
                </div>

                {project.stats && project.stats.map((st, sIdx) => (
                  <div key={sIdx} className="flex items-center justify-between text-xs pt-2 border-t border-[#12332B]/5">
                    <span className="text-[#68736F]">{getLocalized(st.label)}</span>
                    <span className="font-bold text-[#0B6B4F]">{st.value}</span>
                  </div>
                ))}
              </div>

              {/* Inquiries CTA */}
              <div className="pt-4 border-t border-[#12332B]/5 space-y-3">
                <Button
                  href={getLocalizedPath('/contact')}
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                >
                  {locale === 'ar' ? 'طلب توريد أو تعامل تجاري' : 'Business Inquiry'}
                </Button>
                <Button
                  href={getLocalizedPath('/members/register')}
                  variant="outline"
                  size="md"
                  className="w-full justify-center"
                >
                  {locale === 'ar' ? 'المساهمة في الجمعية' : 'Join as Shareholder'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#12332B]/10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-bold text-[#12332B]">
              {locale === 'ar' ? 'مشاريع واستثمارات أخرى للجمعية' : 'Other Society Projects'}
            </h3>
            <p className="text-xs text-[#68736F] mt-1">
              {locale === 'ar' ? 'استكشف محفظتنا التنموية المتكاملة بمحافظة جدة' : 'Explore our diverse investment portfolio in Jeddah'}
            </p>
          </div>
          <Link
            to={getLocalizedPath('/projects')}
            className="text-xs sm:text-sm font-bold text-[#0B6B4F] hover:underline"
          >
            {t.common.viewAll} ({projectsData.length}) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProjects.map((rel) => (
            <Link
              key={rel.slug}
              to={getLocalizedPath(`/projects/${rel.slug}`)}
              className="bg-white rounded-2xl border border-[#12332B]/10 overflow-hidden shadow-xs hover:shadow-md hover:border-[#0B6B4F]/30 transition-all duration-300 group flex flex-col"
            >
              <div className="h-40 bg-gradient-to-br from-[#12332B] to-[#0B211C] overflow-hidden">
                <img
                  src={rel.thumbnailImage}
                  alt={getLocalized(rel.name)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <span className="text-[10px] font-bold text-[#0B6B4F] mb-1 block">
                  {getLocalized(rel.category)}
                </span>
                <h4 className="text-sm font-bold text-[#12332B] group-hover:text-[#0B6B4F] transition-colors line-clamp-1">
                  {getLocalized(rel.name)}
                </h4>
                <p className="text-xs text-[#68736F] mt-1 line-clamp-2">
                  {getLocalized(rel.shortDescription)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
