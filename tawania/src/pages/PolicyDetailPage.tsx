import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useI18n } from '../i18n';
import { useGovernanceData } from '../context/GovernanceDataContext';
import { PageHero } from '../components/layout/PageHero';
import { PdfDocumentViewer } from '../components/common/PdfDocumentViewer';

export const PolicyDetailPage: React.FC = () => {
  const { policyId } = useParams<{ policyId?: string }>();
  const { locale, getLocalizedPath } = useI18n();
  const isAr = locale === 'ar';
  const { policies } = useGovernanceData();

  const policy = policies.find(
    (p) =>
      String(p.id).toLowerCase() === String(policyId).toLowerCase() ||
      String((p as any).slug_id || '').toLowerCase() === String(policyId).toLowerCase() ||
      String((p as any).slugId || '').toLowerCase() === String(policyId).toLowerCase() ||
      String(p.code || '').toLowerCase() === String(policyId).toLowerCase()
  ) || policies[0];

  if (!policy) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {isAr ? 'الوثيقة غير متوفرة' : 'Document Not Found'}
        </h2>
        <Link
          to={getLocalizedPath('/')}
          className="text-[#0B6B4F] font-bold text-sm hover:underline"
        >
          {isAr ? 'العودة للرئيسية' : 'Back to Home'}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <PageHero
        badge={isAr ? 'معاينة ملف PDF' : 'PDF Document Review'}
        title={isAr ? policy.titleAr : policy.titleEn}
        subtitle={isAr ? policy.descAr : policy.descEn}
        breadcrumbs={[
          { label: isAr ? 'الحوكمة' : 'Governance' },
          { label: isAr ? 'السياسات' : 'Policies' },
          { label: isAr ? policy.titleAr : policy.titleEn }
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Pure PDF Viewer Component */}
        <PdfDocumentViewer
          title={isAr ? policy.titleAr : policy.titleEn}
          codeOrNum={policy.code}
          fileUrl={policy.fileUrl || (policy as any).pdfUrl || (policy as any).file_url}
          fileName={policy.fileName || `${policy.code}.pdf`}
        />

        {/* Back Link */}
        <div className="pt-6 flex items-center justify-between">
          <Link
            to={getLocalizedPath('/')}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0B6B4F] hover:underline"
          >
            {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{isAr ? 'العودة إلى الصفحة الرئيسية' : 'Back to Home'}</span>
          </Link>
        </div>
      </section>
    </div>
  );
};
