import { ReportItem } from '../types';

export const reportsData: ReportItem[] = [
  {
    id: 'annual-report-2024',
    title: {
      ar: 'التقرير السنوي الشامل والقوائم المالية لعام 2024م',
      en: 'Annual Comprehensive Report & Financial Statements 2024'
    },
    year: '2024',
    type: 'annual',
    typeName: { ar: 'التقرير السنوي', en: 'Annual Report' },
    publishDate: '2025-01-20',
    description: {
      ar: 'يستعرض التقرير السنوي لعام 2024م أبرز المنجزات التشغيلية، ومؤشرات النمو المالي لمشاريع الجمعية العشرة، والقوائم المالية المدققة وتقرير مجلس الإدارة.',
      en: 'Summarizes key operational achievements, financial performance across the 10 enterprises, audited balance sheets, and board report.'
    },
    fileType: 'PDF',
    fileSize: '5.6 MB',
    highlights: [
      { ar: 'نمو الإيرادات الإجمالية بنسبة 18.4% مقارنة بالعام السابق', en: '18.4% total revenue growth compared to previous year' },
      { ar: 'توزيع أرباح الأسهم وعائد المعاملات على المساهمين', en: 'Distribution of dividends and patronage returns to shareholders' },
      { ar: 'إطلاق وتحديث خطوط الإنتاج في ثلاجة وإعمار الشامل', en: 'Launch and expansion of cold storage and contracting operations' }
    ],
    downloadUrl: '#'
  },
  {
    id: 'financial-audit-2024',
    title: {
      ar: 'تقرير مراجع الحسابات الخارجي المستقل لعام 2024م',
      en: 'Independent External Auditor Report 2024'
    },
    year: '2024',
    type: 'audit',
    typeName: { ar: 'تقرير المراجع المستقل', en: 'External Audit' },
    publishDate: '2025-01-10',
    description: {
      ar: 'الرأي المهني لمكتب المحاسبة والتدقيق المعتمد حول سلامة وعدالة القوائم المالية للجمعية.',
      en: 'Independent certified public accountant audit opinion confirming fair representation of financial accounts.'
    },
    fileType: 'PDF',
    fileSize: '2.4 MB',
    highlights: [
      { ar: 'رأي غير متحفظ (نظيف) يؤكد دقة وعدالة القوائم المالية', en: 'Unqualified (clean) audit opinion confirming accuracy' },
      { ar: 'مطابقة تامة لمعايير المحاسبة الدولية المعتمدة في المملكة (SOCPA/IFRS)', en: 'Full compliance with SOCPA/IFRS standards in Saudi Arabia' }
    ],
    downloadUrl: '#'
  },
  {
    id: 'annual-report-2023',
    title: {
      ar: 'التقرير السنوي الشامل لعام 2023م',
      en: 'Annual Comprehensive Report 2023'
    },
    year: '2023',
    type: 'annual',
    typeName: { ar: 'التقرير السنوي', en: 'Annual Report' },
    publishDate: '2024-02-15',
    description: {
      ar: 'تقرير متكامل يوثق إنجازات التحول الرقمي ومشاريع التجزئة وسلاسل الإمداد ومؤشرات الأثر المجتمعي.',
      en: 'Comprehensive documentation of digital transformation milestones, retail growth, and community welfare impact.'
    },
    fileType: 'PDF',
    fileSize: '4.8 MB',
    highlights: [
      { ar: 'تدشين منصة المتاجر الإلكترونية للجمعية', en: 'Inauguration of AlShamel E-Commerce platform' },
      { ar: 'تجاوز حجم المبيعات حاجز 14 مليون ريال بمشاريع التجزئة والغاز', en: 'Surpassed 14M SAR in retail and gas distribution sales' }
    ],
    downloadUrl: '#'
  },
  {
    id: 'annual-report-2022',
    title: {
      ar: 'التقرير السنوي والقوائم المالية لعام 2022م',
      en: 'Annual Report & Financial Statements 2022'
    },
    year: '2022',
    type: 'annual',
    typeName: { ar: 'التقرير السنوي', en: 'Annual Report' },
    publishDate: '2023-02-28',
    description: {
      ar: 'توثيق أداء الدورة الجديدة لمجلس الإدارة وإعادة هيكلة القطاعات الاستثمارية وإطلاق خطة الحوكمة.',
      en: 'Documenting board performance, investment portfolio restructuring, and governance framework activation.'
    },
    fileType: 'PDF',
    fileSize: '4.2 MB',
    highlights: [
      { ar: 'انتخاب مجلس الإدارة الحالي للدورة (2022 - 2026)', en: 'Election of the board for term (2022 - 2026)' },
      { ar: 'اعتماد الخطة الاستراتيجية السبعية للأعوام القادمة', en: 'Ratification of the seven strategic roadmap goals' }
    ],
    downloadUrl: '#'
  },
  {
    id: 'annual-report-2021',
    title: {
      ar: 'التقرير السنوي لعام 2021م',
      en: 'Annual Report 2021'
    },
    year: '2021',
    type: 'annual',
    typeName: { ar: 'التقرير السنوي', en: 'Annual Report' },
    publishDate: '2022-03-10',
    description: {
      ar: 'ملخص الأداء المالي والتشغيلي واستمرارية سلاسل الإمداد ومواجهة تحديات السوق بكفاءة.',
      en: 'Summary of operational performance, cold-chain resilience, and business continuity.'
    },
    fileType: 'PDF',
    fileSize: '3.9 MB',
    highlights: [
      { ar: 'توسيع طاقة ثلاجة الشامل التخزينية بنسبة 30%', en: '30% expansion in cold storage capacity' },
      { ar: 'تأسيس مشروع الشامل للاتصالات وتقنية المعلومات', en: 'Establishment of Telecom & IT business unit' }
    ],
    downloadUrl: '#'
  },
  {
    id: 'annual-report-2020',
    title: {
      ar: 'التقرير المالي والإداري لعام 2020م',
      en: 'Financial & Administrative Report 2020'
    },
    year: '2020',
    type: 'annual',
    typeName: { ar: 'التقرير السنوي', en: 'Annual Report' },
    publishDate: '2021-03-15',
    description: {
      ar: 'استعراض مبادرات الجمعية في تأمين السلع الأساسية والغاز للمواطنين خلال فترات الجائحة.',
      en: 'Review of emergency food supply and LPG distribution initiatives during the pandemic period.'
    },
    fileType: 'PDF',
    fileSize: '3.5 MB',
    highlights: [
      { ar: 'تأمين الغاز والسلع الاستهلاكية لمحافظة جدة على مدار الساعة', en: '24/7 continuous essential goods supply for Jeddah' },
      { ar: 'تأسيس مشروع الشامل الأمنية لخدمة المنشآت', en: 'Foundation of AlShamel Security Services' }
    ],
    downloadUrl: '#'
  },
  {
    id: 'annual-report-2019',
    title: {
      ar: 'التقرير السنوي والقوائم المالية لعام 2019م',
      en: 'Annual Report & Financial Statements 2019'
    },
    year: '2019',
    type: 'annual',
    typeName: { ar: 'التقرير السنوي', en: 'Annual Report' },
    publishDate: '2020-03-20',
    description: {
      ar: 'أرشيف القوائم المالية والإنجازات التشغيلية لعام 2019م المعتمدة من الجمعية العمومية.',
      en: 'Archived audited statements and operational milestones for 2019 approved by the General Assembly.'
    },
    fileType: 'PDF',
    fileSize: '3.2 MB',
    highlights: [
      { ar: 'تطوير خطوط التعبئة والتغليف للتمور', en: 'Modernization of dates packaging lines' },
      { ar: 'تسجيل نمو في رأس المال المكتتب وأعداد المساهمين', en: 'Recorded growth in paid capital and member count' }
    ],
    downloadUrl: '#'
  }
];
