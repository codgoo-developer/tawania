import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Calendar,
  Users,
  MapPin,
  FileText,
  Download,
  CheckCircle2,
  Building,
  Award,
  Layers,
  ArrowRight,
  ArrowLeft,
  Eye
} from 'lucide-react';
import { useI18n } from '../i18n';
import { useGovernanceData } from '../context/GovernanceDataContext';
import { PageHero } from '../components/layout/PageHero';

const workshopImagesMap: Record<string, string> = {
  'governance-intro': 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
  'conflict-whistleblowing': 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
  'aml-counter-terrorism': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  'community-conflict-whistleblowing': 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=1200&q=80',
  'community-aml-counter-terrorism': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80'
};

export const WorkshopsPage: React.FC = () => {
  const { locale, getLocalizedPath } = useI18n();
  const { workshops } = useGovernanceData();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'internal' | 'community'>('all');

  const filteredWorkshops = workshops.filter((w) => {
    if (selectedFilter === 'all') return true;
    return w.type === selectedFilter;
  });

  return (
    <div className="space-y-16 pb-20">
      <PageHero
        badge={locale === 'ar' ? 'التطوير وبناء القدرات' : 'Development & Capacity Building'}
        title={locale === 'ar' ? 'الورش المقامة والشركات المجتمعية' : 'Conducted Workshops & Community Partnerships'}
        subtitle={
          locale === 'ar'
            ? 'سجل الورش التدريبية وحلقات العمل التوعوية التي أقامتها تعاونية الشامل لترسيخ الحوكمة وبناء الشراكات'
            : 'Roster of training workshops, compliance forums, and community development initiatives.'
        }
        breadcrumbs={[
          { label: locale === 'ar' ? 'الحوكمة' : 'Governance', url: '/governance' },
          { label: locale === 'ar' ? 'الورش المقامة' : 'Workshops' }
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Buttons */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <button
            type="button"
            onClick={() => setSelectedFilter('all')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${selectedFilter === 'all'
                ? 'bg-[#0B6B4F] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-[#EBF4F0] hover:text-[#0B6B4F] border border-gray-200'
              }`}
          >
            {locale === 'ar' ? 'كافة الورش (الكل)' : 'All Workshops'}
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('internal')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${selectedFilter === 'internal'
                ? 'bg-[#0B6B4F] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-[#EBF4F0] hover:text-[#0B6B4F] border border-gray-200'
              }`}
          >
            {locale === 'ar' ? 'ورش الحوكمة والامتثال' : 'Governance Workshops'}
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter('community')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${selectedFilter === 'community'
                ? 'bg-[#0B6B4F] text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-[#EBF4F0] hover:text-[#0B6B4F] border border-gray-200'
              }`}
          >
            {locale === 'ar' ? 'الورش المقامة بالشركات المجتمعية' : 'Community Partnerships'}
          </button>
        </div>

        {/* Workshops Cards */}
        <div className="space-y-10">
          {filteredWorkshops.map((w) => (
            <div
              key={w.id}
              className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
            >
              {/* Image side */}
              <div className="lg:col-span-4 relative h-64 lg:h-auto overflow-hidden bg-gray-100">
                <img
                  src={w.image || workshopImagesMap[w.id] || 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80'}
                  alt={locale === 'ar' ? w.titleAr : w.titleEn}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 start-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0B6B4F]/90 text-white backdrop-blur-md">
                    {w.type === 'internal'
                      ? locale === 'ar' ? 'ورشة حوكمة' : 'Governance'
                      : locale === 'ar' ? 'شراكة مجتمعية' : 'Community Partnership'}
                  </span>
                </div>
              </div>

              {/* Content side */}
              <div className="lg:col-span-8 p-6 sm:p-8 space-y-5 flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-black text-[#12332B] leading-snug">
                    {locale === 'ar' ? w.titleAr : w.titleEn}
                  </h3>

                  {/* Metadata Chips */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-[#0B6B4F]" />
                      {locale === 'ar' ? w.dateAr : w.dateEn}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#C9A45C]" />
                      {locale === 'ar' ? w.locationAr : w.locationEn}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <Users className="w-3.5 h-3.5 text-[#0B6B4F]" />
                      {locale === 'ar' ? `${w.attendeesCount || 0} مستفيد` : `${w.attendeesCount || 0} Attendees`}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#68736F] leading-relaxed pt-2">
                    {locale === 'ar' ? w.descAr : w.descEn}
                  </p>
                </div>

                {/* Key Outcomes */}
                <div className="bg-[#F7F8F6] rounded-2xl p-4 space-y-2 border border-gray-100">
                  <span className="text-xs font-bold text-[#0B6B4F] uppercase tracking-wider block">
                    {locale === 'ar' ? 'أبرز الأهداف والمخرجات:' : 'Key Objectives & Outcomes:'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {((locale === 'ar' ? w.objectivesAr : w.objectivesEn) || []).map((outcome, oIdx) => (
                      <div key={oIdx} className="flex items-center gap-2 text-xs text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0B6B4F] shrink-0" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end">
                  <Link
                    to={getLocalizedPath(`/workshops/${w.id}`)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B6B4F] hover:bg-[#095B42] text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <Eye className="w-4 h-4" />
                    <span>{locale === 'ar' ? 'عرض تفاصيل الورشة والتقرير الكامل' : 'View Full Report & Details'}</span>
                    {locale === 'ar' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
