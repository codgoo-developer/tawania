import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Download,
  FileCheck,
  Award,
  DollarSign,
  ShieldCheck,
  Search,
  ExternalLink,
  Eye
} from 'lucide-react';
import { useI18n } from '../i18n';
import { useGovernanceData, downloadDocumentFile } from '../context/GovernanceDataContext';
import { PageHero } from '../components/layout/PageHero';

export const RegulationsPage: React.FC = () => {
  const { locale, getLocalizedPath } = useI18n();
  const { regulations } = useGovernanceData();
  const [selectedSection, setSelectedSection] = useState<'all' | 'foundation' | 'financial' | 'laws'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const documents = regulations;

  const filtered = documents.filter((doc) => {
    const matchSec = selectedSection === 'all' || doc.sec === selectedSection;
    const matchQuery =
      doc.titleAr.includes(searchQuery) ||
      doc.descAr.includes(searchQuery) ||
      doc.num.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSec && matchQuery;
  });

  const handleDownload = (doc: any) => {
    downloadDocumentFile(
      locale === 'ar' ? doc.titleAr : (doc.titleEn || doc.titleAr),
      doc.num,
      doc.fileUrl || doc.pdfUrl || doc.file_url,
      doc.fileName || `${doc.num}.pdf`
    );
  };

  return (
    <div className="space-y-16 pb-20">
      <PageHero
        badge={locale === 'ar' ? 'الشفافية والأنظمة' : 'Transparency & Regulations'}
        title={locale === 'ar' ? 'اللوائح والأنظمة والشهادات' : 'Regulations, Bylaws & Certificates'}
        subtitle={
          locale === 'ar'
            ? 'السجل الرسمي للائحة الأساسية، التراخيص، اللوائح المالية، والأنظمة التشريعية المعتمدة لتعاونية الشامل'
            : 'Official repository of bylaws, registration certificates, financial codes, and legislative acts.'
        }
        breadcrumbs={[
          { label: locale === 'ar' ? 'الحوكمة' : 'Governance', url: '/governance' },
          { label: locale === 'ar' ? 'اللوائح والأنظمة' : 'Regulations' }
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Controls */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xs mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedSection('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedSection === 'all'
                ? 'bg-[#0B6B4F] text-white shadow-xs'
                : 'bg-[#F7F8F6] text-gray-700 hover:bg-[#EBF4F0]'
                }`}
            >
              {locale === 'ar' ? 'كافة الوثائق (الكل)' : 'All Documents'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedSection('foundation')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedSection === 'foundation'
                ? 'bg-[#0B6B4F] text-white shadow-xs'
                : 'bg-[#F7F8F6] text-gray-700 hover:bg-[#EBF4F0]'
                }`}
            >
              {locale === 'ar' ? 'اللائحة الأساسية والشهادات' : 'Bylaws & Certificates'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedSection('financial')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedSection === 'financial'
                ? 'bg-[#0B6B4F] text-white shadow-xs'
                : 'bg-[#F7F8F6] text-gray-700 hover:bg-[#EBF4F0]'
                }`}
            >
              {locale === 'ar' ? 'الملفات واللوائح المالية' : 'Financial Files'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedSection('laws')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedSection === 'laws'
                ? 'bg-[#0B6B4F] text-white shadow-xs'
                : 'bg-[#F7F8F6] text-gray-700 hover:bg-[#EBF4F0]'
                }`}
            >
              {locale === 'ar' ? 'الأنظمة والتشريعات' : 'Statutory Laws'}
            </button>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute start-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={locale === 'ar' ? 'بحث في اللوائح والملفات...' : 'Search files...'}
              className="w-full ps-9 pe-4 py-2 text-xs rounded-xl border border-gray-200 focus:border-[#0B6B4F] outline-none"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold font-mono px-2.5 py-1 rounded-lg bg-[#EBF4F0] text-[#0B6B4F]">
                    {doc.num}
                  </span>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    {doc.type}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#12332B] group-hover:text-[#0B6B4F] transition-colors leading-snug">
                  {locale === 'ar' ? doc.titleAr : doc.titleEn}
                </h3>

                <p className="text-xs text-[#68736F] leading-relaxed">
                  {doc.descAr}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                <Link
                  to={getLocalizedPath(`/regulations/${doc.id}`)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#EBF4F0] hover:bg-[#0B6B4F] text-[#0B6B4F] hover:text-white text-xs font-bold transition-all"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{locale === 'ar' ? 'عرض الوثيقة' : 'View'}</span>
                </Link>

                <button
                  type="button"
                  onClick={() => handleDownload(doc)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 hover:border-[#0B6B4F] text-gray-700 hover:text-[#0B6B4F] text-xs font-bold transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
