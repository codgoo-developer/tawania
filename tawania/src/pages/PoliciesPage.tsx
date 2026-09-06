import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Download,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Search,
  BookOpen,
  Calendar,
  Eye
} from 'lucide-react';
import { useI18n } from '../i18n';
import { useGovernanceData, downloadDocumentFile } from '../context/GovernanceDataContext';
import { PageHero } from '../components/layout/PageHero';

export const PoliciesPage: React.FC = () => {
  const { locale, getLocalizedPath } = useI18n();
  const { policies } = useGovernanceData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSub, setSelectedSub] = useState<'all' | 'general' | 'aml'>('all');

  const filtered = policies.filter((p) => {
    const matchCat = selectedSub === 'all' || p.category === selectedSub;
    const matchSearch =
      locale === 'ar'
        ? p.titleAr.includes(searchQuery) || p.descAr.includes(searchQuery)
        : p.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) || p.descEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleDownload = (policy: any) => {
    downloadDocumentFile(
      locale === 'ar' ? policy.titleAr : policy.titleEn,
      policy.code,
      policy.fileUrl,
      policy.fileName || `${policy.code}.pdf`
    );
  };

  return (
    <div className="space-y-16 pb-20">
      <PageHero
        badge={locale === 'ar' ? 'الحوكمة المؤسسية' : 'Corporate Governance'}
        title={locale === 'ar' ? 'السياسات المعتمدة' : 'Approved Policies Manuals'}
        subtitle={
          locale === 'ar'
            ? 'منظومة السياسات والضوابط الرقابية المعتمدة لضمان الامتثال، حماية البيانات، ومكافحة غسل الأموال'
            : 'Board-approved policy suite governing compliance, data privacy, and AML procedures.'
        }
        breadcrumbs={[
          { label: locale === 'ar' ? 'الحوكمة' : 'Governance', url: '/governance' },
          { label: locale === 'ar' ? 'السياسات' : 'Policies' }
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Controls */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xs mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedSub('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedSub === 'all'
                ? 'bg-[#0B6B4F] text-white shadow-xs'
                : 'bg-[#F7F8F6] text-gray-700 hover:bg-[#EBF4F0]'
                }`}
            >
              {locale === 'ar' ? 'كافة السياسات (الكل)' : 'All Policies'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedSub('general')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedSub === 'general'
                ? 'bg-[#0B6B4F] text-white shadow-xs'
                : 'bg-[#F7F8F6] text-gray-700 hover:bg-[#EBF4F0]'
                }`}
            >
              {locale === 'ar' ? 'السياسات الداخلية العامة' : 'General Policies'}
            </button>
            <button
              type="button"
              onClick={() => setSelectedSub('aml')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedSub === 'aml'
                ? 'bg-[#0B6B4F] text-white shadow-xs'
                : 'bg-[#F7F8F6] text-gray-700 hover:bg-[#EBF4F0]'
                }`}
            >
              {locale === 'ar' ? 'مكافحة غسل الأموال وتمويل الإرهاب' : 'AML & Counter-Terrorism'}
            </button>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute start-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={locale === 'ar' ? 'بحث في السياسات...' : 'Search policies...'}
              className="w-full ps-9 pe-4 py-2 text-xs rounded-xlfocus:border-[#0B6B4F] outline-none"
            />
          </div>
        </div>

        {/* Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((policy) => (
            <div
              key={policy.id}
              className="bg-white rounded-3xl p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold font-mono px-2.5 py-1 rounded-lg bg-[#EBF4F0] text-[#0B6B4F]">
                    {policy.code}
                  </span>
                  <span className="text-[11px] text-gray-500 font-medium">
                    {policy.version}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#12332B] group-hover:text-[#0B6B4F] transition-colors leading-snug">
                  {locale === 'ar' ? policy.titleAr : policy.titleEn}
                </h3>

                <p className="text-xs text-[#68736F] leading-relaxed">
                  {locale === 'ar' ? policy.descAr : policy.descEn}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                <Link
                  to={getLocalizedPath(`/policies/${policy.id}`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EBF4F0] hover:bg-[#0B6B4F] text-[#0B6B4F] hover:text-white text-xs font-bold transition-all"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{locale === 'ar' ? 'عرض السياسة' : 'View Policy'}</span>
                </Link>

                <button
                  type="button"
                  onClick={() => handleDownload(policy)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xlhover:border-[#0B6B4F] text-gray-700 hover:text-[#0B6B4F] text-xs font-bold transition-all cursor-pointer"
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
