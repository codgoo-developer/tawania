import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useI18n } from '../i18n';
import { useGovernanceData } from '../context/GovernanceDataContext';
import { PageHero } from '../components/layout/PageHero';
import { PdfDocumentViewer } from '../components/common/PdfDocumentViewer';

export const WorkshopDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const { locale, getLocalizedPath } = useI18n();
  const { workshops } = useGovernanceData();

  const workshop = workshops.find(
    (w) =>
      String(w.id).toLowerCase() === String(slug).toLowerCase() ||
      String((w as any).slug_id || '').toLowerCase() === String(slug).toLowerCase() ||
      String((w as any).slugId || '').toLowerCase() === String(slug).toLowerCase()
  ) || workshops[0];

  if (!workshop) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {locale === 'ar' ? 'الورشة غير متوفرة' : 'Workshop Not Found'}
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

  // Specific attendance rosters customized for each distinct workshop
  const getWorkshopAttendanceRows = (workshopId: string) => {
    switch (workshopId) {
      case 'governance-intro':
        return [
          ['1', 'علي إبراهيم السليمي', '✓ حاضر ومصادق (رئيس المجلس)'],
          ['2', 'خالد يوسف الحربي', '✓ حاضر (نائب الرئيس)'],
          ['3', 'محمد سعود الحربي', '✓ حاضر (المشرف المالي)'],
          ['4', 'صلاح إبراهيم السليمي', '✓ حاضر (عضو المجلس)'],
          ['5', 'عبد الله سعود محمد', '✓ حاضر (عضو المجلس)'],
          ['6', 'سلطان فايز الحربي', '✓ حاضر (المدير التنفيذي)'],
          ['7', 'فهد حمود الحربي', '✓ حاضر (رئيس لجنة الحوكمة)'],
          ['8', 'إبراهيم بن عبدالله القاسم', '✓ حاضر (عضو لجنة المراجعة)'],
          ['9', 'سعود بن محمد التميمي', '✓ حاضر (مسؤول الامتثال)'],
          ['10', 'عمر بن صالح الحربي', '✓ حاضر (مدير الشؤون القانونية)'],
          ['11', 'يوسف بن خالد العلي', '✓ حاضر (مدير العمليات)'],
          ['12', 'أحمد بن ناصر السليمي', '✓ حاضر (أمين السر)']
        ];
      case 'conflict-whistleblowing':
        return [
          ['1', 'سلطان فايز الحربي', '✓ حاضر (الإدارة التنفيذية)'],
          ['2', 'ماجد علي الحربي', '✓ حاضر (الموارد البشرية)'],
          ['3', 'عبدالمحسن صالح الرشيدي', '✓ حاضر (إدارة المشاريع)'],
          ['4', 'هاني محمد شاهين', '✓ حاضر (قسم تقنية المعلومات)'],
          ['5', 'فؤاد أمين البيضاوي', '✓ حاضر (المشتريات والعقود)'],
          ['6', 'منى عبدالقادر المحمدي', '✓ حاضرة (خدمة المستفيدين)'],
          ['7', 'مرام سالم الحربي', '✓ حاضرة (التواصل المؤسسي)'],
          ['8', 'تركي فيصل الشمري', '✓ حاضر (قسم المحاسبة)'],
          ['9', 'عبدالعزيز بدر العتيبي', '✓ حاضر (مشرف الميدان)'],
          ['10', 'سارة خالد الدوسري', '✓ حاضرة (إدارة الجودة)']
        ];
      case 'aml-counter-terrorism':
        return [
          ['1', 'محمد سعود الحربي', '✓ حاضر (المشرف المالي)'],
          ['2', 'فيصل بوسعيد عمر', '✓ حاضر (رئيس المحاسبين)'],
          ['3', 'أحمد طويالع الفارسي', '✓ حاضر (أخصائي الرقابة والتدقيق)'],
          ['4', 'شعيب علي مرشد', '✓ حاضر (مسؤول الخزينة والمقبوضات)'],
          ['5', 'محمد كمال الخطيب', '✓ حاضر (أخصائي المشتريات)'],
          ['6', 'وهيب زيد العوفي', '✓ حاضر (مسؤول التعاقدات)'],
          ['7', 'عاشر محمد المحمدي', '✓ حاضر (مدقق داخلي)'],
          ['8', 'محمد عباس بله', '✓ حاضر (أمين المستودعات)'],
          ['9', 'خالد فهد المطيري', '✓ حاضر (مشرف التدقيق المالي)'],
          ['10', 'وليد إبراهيم السليمي', '✓ حاضر (مسؤول التحصيل البنكي)']
        ];
      case 'community-conflict-whistleblowing':
        return [
          ['1', 'عبدالله مساعد البركاتي', '✓ حاضر (شركة آفاق القصيم)'],
          ['2', 'أحمد حامد البركاتي', '✓ حاضر (مؤسسة النماء التعاونية)'],
          ['3', 'تركي فيصل البركاتي', '✓ حاضر (جمعية التنمية الأهلية)'],
          ['4', 'وهيب زيد البركاتي', '✓ حاضر (شركة الرواد الزراعية)'],
          ['5', 'عبدالفتاح أحمد البركاتي', '✓ حاضر (مجموعة الشركاء للتوريد)'],
          ['6', 'محمد كمال أحمد الخطيب', '✓ حاضر (مستشار التنمية المجتمعية)'],
          ['7', 'شعيب علي قائد مرشد', '✓ حاضر (شركة الخدمات اللوجستية)'],
          ['8', 'ماجد علي حامد البركاتي', '✓ حاضر (منسق الشراكات المحلية)'],
          ['9', 'منى عبدالقادر عبدالله البركاتي', '✓ حاضرة (ممثلة قطاع ريادة الأعمال)'],
          ['10', 'مرام سالم البركاتي', '✓ حاضرة (ممثلة الجمعيات التخصصية)']
        ];
      case 'community-aml-counter-terrorism':
      default:
        return [
          ['1', 'سعود بن عبدالعزيز الشمري', '✓ حاضر (شركة الإسناد للتجارة)'],
          ['2', 'بدر بن ناصر الحربي', '✓ حاضر (مؤسسة التقنية الخضراء)'],
          ['3', 'سليمان عبدالله العتيبي', '✓ حاضر (شركة نجد للمقاولات)'],
          ['4', 'فواز بن محمد الرشيدي', '✓ حاضر (مؤسسة الوسام للخدمات)'],
          ['5', 'طارق بن إبراهيم القحطاني', '✓ حاضر (مستثمر مساهم)'],
          ['6', 'عادل بن صالح المطيري', '✓ حاضر (مورد معتمد)'],
          ['7', 'نايف بن فهد العوفي', '✓ حاضر (شركة الوفاق للنقل)'],
          ['8', 'حنان بنت خالد السبيعي', '✓ حاضرة (ممثلة الأعمال المجتمعية)'],
          ['9', 'ياسر بن حمود الحربي', '✓ حاضر (شريك تجاري)'],
          ['10', 'فهد بن منصور السليمي', '✓ حاضر (مستشار التمويل التعاوني)']
        ];
    }
  };

  // Realistic workshop PDF report pages (tailored specifically per workshop)
  const workshopPages = [
    {
      pageNumber: 1,
      headerTitle: locale === 'ar' ? workshop.titleAr : workshop.titleEn,
      subTitle: `تقرير الورشة التدريبية - ${locale === 'ar' ? workshop.locationAr : workshop.locationEn}`,
      tableTitle: `بيانات ومخرجات ${locale === 'ar' ? workshop.titleAr : workshop.titleEn}`,
      tableHeaders: ['م', 'البيان', 'التفاصيل والنتائج المعتمدة'],
      tableRows: [
        ['1', 'مسمى الفعالية والورشة', locale === 'ar' ? workshop.titleAr : workshop.titleEn],
        ['2', 'التاريخ والمقر', `${locale === 'ar' ? workshop.dateAr : workshop.dateEn} - ${locale === 'ar' ? workshop.locationAr : workshop.locationEn}`],
        ['3', 'المدرب / مقدم الورشة', locale === 'ar' ? (workshop.trainerAr || 'أ. فهد بن حمود الحربي') : (workshop.trainerEn || 'Mr. Fahad Al-Harbi')],
        ['4', 'الفئة المستهدفة', locale === 'ar' ? workshop.targetAudienceAr : workshop.targetAudienceEn],
        ['5', 'عدد الساعات التدريبية', `${workshop.hoursCount || 4} ساعات تدريبية معتمدة`],
        ['6', 'عدد المشاركين والمستفيدين', `${workshop.attendeesCount || 30} مشاركاً ومستفيداً`],
        ['7', 'نوع الورشة والتصنيف', workshop.type === 'internal' ? 'ورشة مقامة داخلية (حوكمة وامتثال)' : 'ورشة مقامة بالشركات المجتمعية']
      ],
      paragraphs: [
        locale === 'ar' ? workshop.descAr : workshop.descEn,
        'تهدف هذه الورشة إلى تمكين المستفيدين ومنسوبي التعاونية والشركاء من المعايير الرقابية وأفضل ممارسات الحوكمة المؤسسية وتوثيق إجراءات العمل.'
      ],
      showSealAndSignatures: true
    },
    {
      pageNumber: 2,
      headerTitle: 'كشف حضور المشاركين المعتمد',
      subTitle: locale === 'ar' ? workshop.titleAr : workshop.titleEn,
      tableTitle: `سجل حضور ومصادقة المتدربين - ${locale === 'ar' ? workshop.locationAr : workshop.locationEn}`,
      tableHeaders: ['م', 'الاسم الرباعي والجهة', 'حالة الحضور والمصادقة'],
      tableRows: getWorkshopAttendanceRows(workshop.id),
      notes: [
        'تم توثيق حضور المتدربين واعتماد الشهادات التدريبية رسمياً من إدارة جمعية الشامل التعاونية.',
        'البيانات الموضحة أعلاه موثقة وفق سجلات الحضور الرسمية للورشة.'
      ],
      showSealAndSignatures: true
    }
  ];

  return (
    <div className="space-y-6 pb-20">
      <PageHero
        badge={locale === 'ar' ? 'معاينة ملف PDF' : 'PDF Document Review'}
        title={locale === 'ar' ? workshop.titleAr : workshop.titleEn}
        subtitle={locale === 'ar' ? workshop.descAr : workshop.descEn}
        breadcrumbs={[
          { label: locale === 'ar' ? 'الحوكمة' : 'Governance' },
          { label: locale === 'ar' ? 'الورش المقامة' : 'Workshops' },
          { label: locale === 'ar' ? workshop.titleAr : workshop.titleEn }
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* PDF Document Viewer Component */}
        <PdfDocumentViewer
          title={locale === 'ar' ? workshop.titleAr : workshop.titleEn}
          codeOrNum={`WKP-${workshop.id.toUpperCase()}`}
          fileUrl={(workshop as any).fileUrl}
          fileName={`AlShamel-Workshop-${workshop.id}.pdf`}
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
