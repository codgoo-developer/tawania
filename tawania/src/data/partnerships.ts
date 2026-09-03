import { PartnershipItem } from '../types';

export const partnershipsData: PartnershipItem[] = [
  {
    id: 'makkah-chamber',
    partnerName: {
      ar: 'الغرفة التجارية الصناعية بمكة المكرمة',
      en: 'Makkah Chamber of Commerce & Industry'
    },
    type: {
      ar: 'شراكة تنموية واستثمارية',
      en: 'Developmental & Investment Alliance'
    },
    typeKey: 'government',
    year: '2023',
    description: {
      ar: 'مذكرة تعاون لتمكين المنشآت التعاونية ورواد الأعمال وتسهيل المشاركة في المعارض الاقتصادية والملتقيات التجارية الإقليمية.',
      en: 'MOU to empower cooperative ventures and local entrepreneurs, facilitating participation in regional commercial trade fairs.'
    },
    scope: [
      { ar: 'تسويق منتجات الجمعيات التعاونية في المحافل والمعارض', en: 'Promoting cooperative products in trade expos' },
      { ar: 'تنظيم ورش عمل تدريبية لرواد الأعمال والمستثمرين بجدة', en: 'Organizing workshops for local entrepreneurs in Jeddah' }
    ],
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80',
    status: { ar: 'سارية ومفعلة', en: 'Active & Operating' }
  },
  {
    id: 'jumum-charity',
    partnerName: {
      ar: 'جمعية البر الخيرية بمحافظة جدة',
      en: 'Al-Birr Charitable Society in Jeddah'
    },
    type: {
      ar: 'شراكة مجتمعية وتكافلية',
      en: 'Community & Social Solidarity Partnership'
    },
    typeKey: 'nonprofit',
    year: '2022',
    description: {
      ar: 'اتفاقية تعاون لتوفير السلال الغذائية المدعومة وبطاقات التموين للأسر المستفيدة عبر استهلاكية الشامل ومستودعات التبريد.',
      en: 'Cooperation agreement providing subsidized food baskets and smart grocery vouchers for families in need via AlShamel Consumer stores.'
    },
    scope: [
      { ar: 'تأمين أكثر من 1,500 سلة غذائية رمضانية وموسمية سنوياً', en: 'Supplying over 1,500 seasonal food hampers annually' },
      { ar: 'خصومات خاصة على السلع الأساسية والمستلزمات المنزلية', en: 'Dedicated subsidies on grocery essentials and kitchen supplies' }
    ],
    logo: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=400&q=80',
    status: { ar: 'سارية ومفعلة', en: 'Active & Operating' }
  },
  {
    id: 'gasco-cooperation',
    partnerName: {
      ar: 'شركة الغاز والتصنيع الأهلية (غازكو)',
      en: 'National Gas & Industrialization Co. (GASCO)'
    },
    type: {
      ar: 'شراكة لوجستية وتشغيلية',
      en: 'Logistical & Operational Partnership'
    },
    typeKey: 'private',
    year: '2021',
    description: {
      ar: 'عقد توزيع استراتيجي معتمد لتأمين أسطوانات غاز البترول المسال بأعلى معايير السلامة والأمان لكافة أحياء محافظة جدة.',
      en: 'Accredited strategic distribution agreement securing LPG supply under highest safety guidelines across Jeddah.'
    },
    scope: [
      { ar: 'توفير أسطوانات الغاز الحديثة المصنوعة من الألياف الزجاجية', en: 'Deploying modern lightweight composite gas cylinders' },
      { ar: 'الاستجابة السريعة لطلبات التوصيل للمنازل والمنشآت على مدار اليوم', en: 'Rapid on-demand home and commercial cylinder delivery' }
    ],
    logo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
    status: { ar: 'سارية ومفعلة', en: 'Active & Operating' }
  },
  {
    id: 'coop-council',
    partnerName: {
      ar: 'مجلس الجمعيات التعاونية بالمملكة',
      en: 'Council of Cooperative Societies (CCS)'
    },
    type: {
      ar: 'شراكة قطاعية وتنسيقية',
      en: 'Sectoral & Institutional Alliance'
    },
    typeKey: 'government',
    year: '2022',
    description: {
      ar: 'مذكرة تفاهم لتطبيق أفضل ممارسات الحوكمة التعاونية وتدريب القيادات التنفيذية وتبادل الخبرات الاستثمارية الناجحة.',
      en: 'MOU to implement premier cooperative governance best practices, executive training, and cross-society knowledge exchange.'
    },
    scope: [
      { ar: 'تطبيق الأنظمة المحاسبية الموحدة للقطاع التعاوني', en: 'Standardized accounting systems across cooperative ecosystem' },
      { ar: 'المشاركة في اللجان التنسيقية لتطوير تشريعات العمل التعاوني', en: 'Participating in national policy development committees' }
    ],
    logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=400&q=80',
    status: { ar: 'سارية ومفعلة', en: 'Active & Operating' }
  }
];
