import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useI18n } from '../i18n';
import { useGovernanceData } from '../context/GovernanceDataContext';
import { PageHero } from '../components/layout/PageHero';
import { PdfDocumentViewer } from '../components/common/PdfDocumentViewer';

export const RegulationDetailPage: React.FC = () => {
  const { docId } = useParams<{ docId?: string }>();
  const { locale, getLocalizedPath } = useI18n();
  const { regulations } = useGovernanceData();

  const doc = regulations.find(
    (r) =>
      String(r.id).toLowerCase() === String(docId).toLowerCase() ||
      String((r as any).slug_id || '').toLowerCase() === String(docId).toLowerCase() ||
      String((r as any).slugId || '').toLowerCase() === String(docId).toLowerCase() ||
      String(r.num || '').toLowerCase() === String(docId).toLowerCase()
  ) || regulations[0];

  if (!doc) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {locale === 'ar' ? 'اللائحة غير متوفرة' : 'Document Not Found'}
        </h2>
        <Link
          to={getLocalizedPath('/')}
          className="text-[#0B6B4F] font-bold text-sm hover:underline"
        >
          {locale === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <PageHero
        badge={locale === 'ar' ? 'معاينة ملف PDF' : 'PDF Document Review'}
        title={locale === 'ar' ? doc.titleAr : doc.titleEn || doc.titleAr}
        subtitle={doc.descAr}
        breadcrumbs={[
          { label: locale === 'ar' ? 'الحوكمة' : 'Governance' },
          { label: locale === 'ar' ? 'اللوائح والأنظمة' : 'Regulations' },
          { label: locale === 'ar' ? doc.titleAr : doc.titleEn || doc.titleAr }
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* PDF Viewer Library Component */}
        <PdfDocumentViewer
          title={locale === 'ar' ? doc.titleAr : doc.titleEn || doc.titleAr}
          codeOrNum={doc.num}
          fileUrl={doc.fileUrl || (doc as any).pdfUrl || (doc as any).file_url}
          fileName={doc.fileName || `${doc.num}.pdf`}
        />

        {/* Back Link */}
        <div className="pt-6 flex items-center justify-between">
          <Link
            to={getLocalizedPath('/')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0B6B4F] hover:underline"
          >
            {locale === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{locale === 'ar' ? 'العودة إلى الصفحة الرئيسية' : 'Back to Home'}</span>
          </Link>
        </div>
      </section>
    </div>
  );
};
