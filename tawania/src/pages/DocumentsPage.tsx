import React, { useState } from 'react';
import {
  FileText,
  Download,
  Search,
  CheckCircle2,
  Calendar,
  ShieldCheck,
  Building,
  Tag,
  Eye,
  X
} from 'lucide-react';
import { useI18n } from '../i18n';
import { documentsData } from '../data/documents';
import { PageHero } from '../components/layout/PageHero';
import { Button } from '../components/ui/Button';
import { PdfDocumentViewer } from '../components/common/PdfDocumentViewer';
import { downloadDocumentFile } from '../context/GovernanceDataContext';

export const DocumentsPage: React.FC = () => {
  const { locale, t, getLocalized } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDocForView, setSelectedDocForView] = useState<any | null>(null);

  const categories = [
    { key: 'all', label: t.documentsPage.filterAll },
    { key: 'bylaws', label: t.documentsPage.filterBylaws },
    { key: 'policies', label: t.documentsPage.filterPolicies },
    { key: 'matrices', label: t.documentsPage.filterMatrices },
    { key: 'forms', label: t.documentsPage.filterForms },
  ];

  const filteredDocs = documentsData.filter((doc) => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch =
      getLocalized(doc.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
      getLocalized(doc.description).toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.documentNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (doc: any) => {
    downloadDocumentFile(
      getLocalized(doc.title),
      doc.documentNumber,
      undefined,
      `AlShamel-${doc.documentNumber}.pdf`
    );
  };

  const getDocumentViewerPages = (doc: any) => {
    return [
      {
        pageNumber: 1,
        headerTitle: getLocalized(doc.title),
        subTitle: 'المملكة العربية السعودية - جمعية الشامل التعاونية متعددة الأغراض بعقلة الصقور (ترخيص 234)',
        tableTitle: `الوثيقة التنظيمية المعتمدة - ${doc.documentNumber}`,
        tableHeaders: ['م', 'البيان والمادة', 'التفاصيل والضوابط المعتمدة'],
        tableRows: [
          ['1', 'التصنيف والنوع', `${getLocalized(doc.categoryName)} - ${doc.documentNumber}`],
          ['2', 'تاريخ الإصدار والاعتماد', `${doc.issueDate || '1445هـ'} - معتمدة وسارية`],
          ['3', 'الجهة المعتمدة والمشرفة', 'وزارة الموارد البشرية والمركز الوطني لتنمية القطاع غير الربحي'],
          ['4', 'نطاق التطبيق', 'كافة فروع ومشاريع وإدارات جمعية الشامل التعاونية']
        ],
        paragraphs: [
          getLocalized(doc.description),
          'تحدد هذه الوثيقة الضوابط والإجراءات المنظمة للعمل التعاوني وتطبيق معايير الشفافية والحوكمة المؤسسية.'
        ],
        showSealAndSignatures: true
      },
      {
        pageNumber: 2,
        headerTitle: 'كشف المصادقة والاعتماد النظامي',
        subTitle: getLocalized(doc.title),
        tableTitle: 'كشف التوقيعات والاعتماد الرسمي',
        tableHeaders: ['م', 'الاسم', 'الصفة', 'المصادقة'],
        tableRows: [
          ['1', 'علي إبراهيم السليمي', 'رئيس مجلس الإدارة', '✓ معتمد وموقّع'],
          ['2', 'خالد يوسف الحربي', 'نائب رئيس المجلس', '✓ معتمد وموقّع'],
          ['3', 'سلطان فايز الحربي', 'المدير التنفيذي', '✓ معتمد وموقّع']
        ],
        notes: [
          'تم توثيق هذه الوثيقة الرسمية طبقاً للمعايير القياسية للوائح ونماذج الجمعيات التعاونية.'
        ],
        showSealAndSignatures: true
      }
    ];
  };

  return (
    <div className="space-y-12 pb-20">
      <PageHero
        badge={t.documentsPage.badge}
        title={t.documentsPage.title}
        subtitle={t.documentsPage.subtitle}
        breadcrumbs={[
          { label: t.nav.governance, url: '/governance' },
          { label: t.nav.documents }
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Tabs & Search */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#12332B]/10 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.key
                    ? 'bg-[#0B6B4F] text-white shadow-xs'
                    : 'bg-[#F7F8F6] text-[#68736F] hover:bg-[#EBF4F0] hover:text-[#0B6B4F] border border-[#12332B]/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#68736F] absolute start-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={locale === 'ar' ? 'بحث في اللوائح والنماذج...' : 'Search bylaws and forms...'}
              className="w-full ps-9 pe-4 py-2 text-xs rounded-xl border border-[#12332B]/15 bg-[#F7F8F6] text-[#17211E] outline-none focus:border-[#0B6B4F] focus:bg-white"
            />
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#12332B]/10 shadow-xs hover:border-[#0B6B4F]/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-3 text-start">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-[#EBF4F0] text-[#0B6B4F] flex items-center justify-center font-bold">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono text-[#0B6B4F] bg-[#EBF4F0] px-2.5 py-0.5 rounded-md font-bold">
                    {doc.documentNumber}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#0B6B4F] block">
                    {getLocalized(doc.categoryName)}
                  </span>
                  <h3 className="text-base font-bold text-[#12332B] leading-snug">
                    {getLocalized(doc.title)}
                  </h3>
                </div>

                <p className="text-xs text-[#68736F] leading-relaxed">
                  {getLocalized(doc.description)}
                </p>

                <div className="flex items-center gap-3 text-[11px] text-[#68736F] pt-2">
                  <span>{doc.issueDate}</span>
                  <span>•</span>
                  <span className="font-mono">{doc.fileSize}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#12332B]/5 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedDocForView(doc)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0B6B4F] hover:bg-[#095B42] text-white text-xs font-bold transition-all cursor-pointer shadow-2xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{locale === 'ar' ? 'معاينة (PDF)' : 'View PDF'}</span>
                </button>

                <Button
                  onClick={() => handleDownload(doc)}
                  variant="secondary"
                  size="sm"
                  leftIcon={<Download className="w-3.5 h-3.5" />}
                >
                  {t.documentsPage.download}
                </Button>
              </div>
            </div>
          ))}

          {filteredDocs.length === 0 && (
            <div className="col-span-full py-16 text-center text-[#68736F] bg-white rounded-3xl border border-[#12332B]/10">
              <p className="text-sm">{t.common.noResults}</p>
            </div>
          )}
        </div>
      </section>

      {/* PDF Document Preview Modal using PdfDocumentViewer */}
      {selectedDocForView && (
        <div
          className="fixed inset-0 z-50 bg-[#12332B]/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedDocForView(null)}
        >
          <div
            className="bg-[#323639] w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-gray-700 flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-3.5 bg-[#222] text-white border-b border-gray-700 text-xs">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#C9A45C]" />
                <span className="font-bold">{getLocalized(selectedDocForView.title)}</span>
                <span className="text-gray-400 font-mono">({selectedDocForView.documentNumber})</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDocForView(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="إغلاق"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Embedded PdfDocumentViewer */}
            <div className="flex-1 overflow-y-auto">
              <PdfDocumentViewer
                title={getLocalized(selectedDocForView.title)}
                codeOrNum={selectedDocForView.documentNumber}
                fileName={`AlShamel-${selectedDocForView.documentNumber}.pdf`}
                pages={getDocumentViewerPages(selectedDocForView)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
