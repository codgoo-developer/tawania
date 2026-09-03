import React, { useState } from 'react';
import {
  FileCheck,
  Download,
  Calendar,
  Filter,
  CheckCircle2,
  FileText,
  Eye,
  X,
  ShieldCheck,
  Search
} from 'lucide-react';
import { useI18n } from '../i18n';
import { reportsData } from '../data/reports';
import { PageHero } from '../components/layout/PageHero';
import { Button } from '../components/ui/Button';
import { PdfDocumentViewer } from '../components/common/PdfDocumentViewer';
import { downloadDocumentFile } from '../context/GovernanceDataContext';

export const ReportsPage: React.FC = () => {
  const { locale, t, getLocalized } = useI18n();
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedReportForView, setSelectedReportForView] = useState<any | null>(null);

  const years = ['all', '2024', '2023', '2022', '2021', '2020', '2019'];

  const filteredReports = reportsData.filter((r) => {
    const matchesYear = selectedYear === 'all' || r.year === selectedYear;
    const matchesType = selectedType === 'all' || r.type === selectedType;
    const matchesSearch =
      getLocalized(r.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
      getLocalized(r.description).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesYear && matchesType && matchesSearch;
  });

  const handleDownload = (report: any) => {
    downloadDocumentFile(
      getLocalized(report.title),
      `REP-${report.year}-${report.id}`,
      undefined,
      `AlShamel-Report-${report.id}.pdf`
    );
  };

  const getReportViewerPages = (report: any) => {
    return [
      {
        pageNumber: 1,
        headerTitle: getLocalized(report.title),
        subTitle: 'المملكة العربية السعودية - جمعية الشامل التعاونية متعددة الأغراض بعقلة الصقور (ترخيص 234)',
        tableTitle: `ملخص التقرير السنوي والأداء المؤسسي - لعام ${report.year}م`,
        tableHeaders: ['م', 'المؤشر / المحور التشغيلي', 'الإنجاز والقيمة المحققة'],
        tableRows: [
          ['1', 'مسمى ونوع التقرير', `${getLocalized(report.title)} - ${getLocalized(report.typeName)}`],
          ['2', 'السنة المالية والتوثيق', `السنة المالية المنتهية في 31 ديسمبر ${report.year}م`],
          ['3', 'الجهة المعتمدة والمشرفة', 'وزارة الموارد البشرية والمركز الوطني لتنمية القطاع غير الربحي'],
          ['4', 'حالة التدقيق والاعتماد', 'معتمد ومصادق عليه نظامياً ومتاح للعموم'],
          ['5', 'تاريخ النشر الرسمي', report.publishDate || '1445هـ']
        ],
        paragraphs: [
          getLocalized(report.description),
          'يستعرض هذا التقرير مخرجات المبادرات التنموية والمؤشرات المالية والتشغيلية المعتمدة لتعاونية الشامل ومشاريعها العشرة التابعة.'
        ],
        showSealAndSignatures: true
      },
      {
        pageNumber: 2,
        headerTitle: 'كشف المصادقة والاعتماد المؤسسي',
        subTitle: getLocalized(report.title),
        tableTitle: 'كشف التوقيعات والاعتماد الرسمي للتقرير',
        tableHeaders: ['م', 'الاسم', 'الصفة / المسؤولية', 'حالة الاعتماد'],
        tableRows: [
          ['1', 'علي إبراهيم السليمي', 'رئيس مجلس الإدارة', '✓ معتمد وموقّع'],
          ['2', 'خالد يوسف الحربي', 'نائب رئيس المجلس', '✓ معتمد وموقّع'],
          ['3', 'محمد سعود الحربي', 'المشرف المالي', '✓ معتمد وموقّع'],
          ['4', 'سلطان فايز الحربي', 'المدير التنفيذي', '✓ معتمد وموقّع']
        ],
        notes: [
          'تم إيداع التقرير لدى المركز الوطني لتنمية القطاع غير الربحي طبقاً للمادة النظامية رقم 234.',
          'الوثيقة الأصلية محفوظة بسجلات الأمانة العامة للجمعية.'
        ],
        showSealAndSignatures: true
      }
    ];
  };

  return (
    <div className="space-y-12 pb-20">
      <PageHero
        badge={t.reportsPage.badge}
        title={t.reportsPage.title}
        subtitle={t.reportsPage.subtitle}
        breadcrumbs={[
          { label: t.nav.governance, url: '/governance' },
          { label: t.nav.reports }
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters and Search */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#12332B]/10 shadow-xs mb-8 space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Year Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
              <span className="text-xs font-bold text-[#12332B] me-2 shrink-0">
                {t.reportsPage.filterYear}:
              </span>
              {years.map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setSelectedYear(yr)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono whitespace-nowrap transition-all cursor-pointer ${
                    selectedYear === yr
                      ? 'bg-[#0B6B4F] text-white shadow-xs'
                      : 'bg-[#F7F8F6] text-[#68736F] hover:bg-[#EBF4F0] hover:text-[#0B6B4F]'
                  }`}
                >
                  {yr === 'all' ? (locale === 'ar' ? 'كافة الأعوام' : 'All') : yr}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-[#68736F] absolute start-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={locale === 'ar' ? 'بحث في التقارير...' : 'Search reports...'}
                className="w-full ps-9 pe-4 py-2.5 text-xs rounded-xl border border-[#12332B]/15 bg-[#F7F8F6] text-[#17211E] outline-none focus:border-[#0B6B4F] focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Reports Cards */}
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#12332B]/10 hover:border-[#0B6B4F]/30 hover:shadow-md transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              {/* Left Side: Report Meta */}
              <div className="flex items-start gap-4 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-[#EBF4F0] text-[#0B6B4F] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div className="min-w-0 space-y-1.5 text-start">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#0B6B4F] text-white">
                      {report.year}
                    </span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                      {getLocalized(report.typeName)}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {report.fileSize || '2.4 MB PDF'}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-[#12332B] leading-snug">
                    {getLocalized(report.title)}
                  </h3>

                  <p className="text-xs text-[#68736F] leading-relaxed max-w-3xl">
                    {getLocalized(report.description)}
                  </p>

                  <div className="pt-1 flex items-center gap-2 text-xs text-[#0B6B4F]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{locale === 'ar' ? 'تاريخ النشر:' : 'Published:'} {report.publishDate}</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Action Buttons */}
              <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center flex-wrap">
                <button
                  type="button"
                  onClick={() => setSelectedReportForView(report)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B6B4F] hover:bg-[#095B42] text-white text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  <Eye className="w-4 h-4" />
                  <span>{locale === 'ar' ? 'معاينة التقرير (PDF)' : 'View PDF'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDownload(report)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 text-xs font-bold transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{locale === 'ar' ? 'تحميل' : 'Download'}</span>
                </button>
              </div>
            </div>
          ))}

          {filteredReports.length === 0 && (
            <div className="py-16 text-center text-[#68736F] bg-white rounded-3xl border border-[#12332B]/10">
              <p className="text-sm">{t.common.noResults}</p>
            </div>
          )}
        </div>
      </section>

      {/* PDF Document Preview Modal using PdfDocumentViewer */}
      {selectedReportForView && (
        <div
          className="fixed inset-0 z-50 bg-[#12332B]/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedReportForView(null)}
        >
          <div
            className="bg-[#323639] w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-gray-700 flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-3.5 bg-[#222] text-white border-b border-gray-700 text-xs">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#C9A45C]" />
                <span className="font-bold">{getLocalized(selectedReportForView.title)}</span>
                <span className="text-gray-400 font-mono">({selectedReportForView.year})</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReportForView(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="إغلاق"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Embedded PdfDocumentViewer */}
            <div className="flex-1 overflow-y-auto">
              <PdfDocumentViewer
                title={getLocalized(selectedReportForView.title)}
                codeOrNum={`REP-${selectedReportForView.year}`}
                fileName={`AlShamel-Report-${selectedReportForView.id}.pdf`}
                pages={getReportViewerPages(selectedReportForView)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
