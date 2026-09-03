import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useI18n } from '../i18n';
import { useGovernanceData } from '../context/GovernanceDataContext';
import { PageHero } from '../components/layout/PageHero';
import { PdfDocumentViewer } from '../components/common/PdfDocumentViewer';

export const EthicsCharterPage: React.FC = () => {
  const { locale, getLocalizedPath } = useI18n();
  const { ethics } = useGovernanceData();

  const titleAr = 'الميثاق الأخلاقي ومدونة السلوك المهني';
  const titleEn = 'Ethical Charter & Code of Conduct';
  const code = 'ETH-SHM-01';
  const ethicsDoc = ethics.find((e) => e.fileUrl) || ethics[0];

  return (
    <div className="space-y-6 pb-20">
      <PageHero
        badge={locale === 'ar' ? 'معاينة ملف PDF' : 'PDF Document Review'}
        title={locale === 'ar' ? (ethicsDoc?.titleAr || titleAr) : (ethicsDoc?.titleEn || titleEn)}
        subtitle={
          locale === 'ar'
            ? (ethicsDoc?.descAr || 'المبادئ الأخلاقية والقواعد السلوكية الحاكمة لجميع معاملات الجمعية مع الشركاء والمستفيدين والجهات الرقابية، ومعايير النزاهة والشفافية وتجنب تعارض المصالح والامتثال للأنظمة.')
            : (ethicsDoc?.descEn || 'The binding ethical framework and code of conduct for Board directors, executives, and personnel.')
        }
        breadcrumbs={[
          { label: locale === 'ar' ? 'الحوكمة' : 'Governance' },
          { label: locale === 'ar' ? 'الميثاق الأخلاقي' : 'Ethical Charter' }
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* PDF Document Viewer Component */}
        <PdfDocumentViewer
          title={locale === 'ar' ? ethicsDoc?.titleAr || titleAr : ethicsDoc?.titleEn || titleEn}
          codeOrNum={code}
          fileUrl={ethicsDoc?.fileUrl}
          fileName={ethicsDoc?.fileName || 'AlShamel-Ethical-Charter.pdf'}
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
