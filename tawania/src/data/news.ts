import { NewsItem } from '../types';

export const newsData: NewsItem[] = [
  {
    slug: 'rda-general-assembly-2024-success',
    title: {
      ar: 'انعقاد الجمعية العمومية العادية لتعاونية الشامل واعتماد توزيع الأرباح على المساهمين',
      en: 'AlShamel Convenes Annual General Assembly and Approves Dividend Distribution'
    },
    excerpt: {
      ar: 'عقدت الجمعية التعاونية متعددة الأغراض بجدة اجتماع جمعيتها العمومية العادية بحضور ممثلي المركز الوطني لتنمية القطاع غير الربحي واكتمال النصاب القانوني.',
      en: 'Jeddah Multipurpose Cooperative Society convened its Ordinary General Assembly in the presence of NCNP representatives, approving closing accounts and dividends.'
    },
    content: [
      {
        ar: 'عقدت الجمعية التعاونية متعددة الأغراض بمحافظة جدة اجتماع جمعيتها العمومية العادية لعام 2024م، برئاسة رئيس مجلس الإدارة د. عبدالله بن مساعد البركاتي، وبحضور أعضاء مجلس الإدارة والمساهمين ومندوبي المركز الوطني لتنمية القطاع غير الربحي.',
        en: 'The Multipurpose Cooperative Society in Jeddah held its Ordinary General Assembly meeting for 2024, presided over by Board Chairman Dr. Abdullah bin Mosaed Al-Barakati, with full attendance of directors and regulatory delegates.'
      },
      {
        ar: 'واستعرض الاجتماع التقرير السنوي لأنشطة الجمعية ومشاريعها العشرة المنفذة خلال العام المالي المنصرم، حيث أظهرت المؤشرات المالية نمواً متصاعداً في الإيرادات التشغيلية وتعزيز الأصول الرأسمالية للجمعية.',
        en: 'The assembly reviewed the annual performance report across the ten operating business units, demonstrating solid upward growth in operating revenues and asset expansion.'
      },
      {
        ar: 'وصادقت الجمعية العمومية بالإجماع على القوائم المالية المدققة وتقرير مراجع الحسابات الخارجي المستقل، ووافقت على مقترح مجلس الإدارة لتوزيع أرباح الأسهم وعائد المعاملات، موجهة الشكر لإدارة الجمعية على جهودها المخلصة في خدمة المحافظة.',
        en: 'The General Assembly unanimously ratified audited financial statements and approved the board dividend recommendation, commending the leadership for exemplary community service.'
      }
    ],
    date: '2024-06-26',
    category: { ar: 'أخبار الجمعية والفعاليات', en: 'Society News & Events' },
    categoryKey: 'events',
    author: { ar: 'المركز الإعلامي', en: 'Media Center' },
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    readTime: { ar: '3 دقائق', en: '3 min read' },
    featured: true,
    tags: [
      { ar: 'الجمعية العمومية', en: 'General Assembly' },
      { ar: 'توزيع الأرباح', en: 'Dividends' },
      { ar: 'الحوكمة', en: 'Governance' }
    ]
  },
  {
    slug: 'cold-storage-expansion-contract',
    title: {
      ar: 'ثلاجة الشامل تدشن توسعة جديدة لغرف التبريد بسعة تخزينية إضافية للمنتجات الزراعية',
      en: 'AlShamel Cold Storage Launches New Temperature-Controlled Expansion for Local Harvests'
    },
    excerpt: {
      ar: 'دشنت الجمعية التعاونية بجدة المرحلة التوسعية الجديدة لمشروع ثلاجة الشامل لرفع الطاقة الاستيعابية إلى 2500 طن ودعم سلاسل الإمداد لمزارعي وادي جدة.',
      en: 'AlShamel inaugurated a cutting-edge cold storage expansion raising holding capacity to 2,500 tons to support regional food security.'
    },
    content: [
      {
        ar: 'في إطار سعيها المستمر لتطوير مشاريع الأمن الغذائي وسلاسل الإمداد اللوجستي، أعلنت إدارة الجمعية عن اكتمال أعمال التوسعة التشغيلية لمشروع ثلاجة الشامل بمحافظة جدة، بإضافة غرف تبريد وتجميد ذكية تعتمد أحدث أنظمة العزل الحراري الموفر للطاقة.',
        en: 'Continuing its drive to bolster food security infrastructure, AlShamel announced the completion of the operational expansion at AlShamel Cold Storage with high-efficiency energy-saving chambers.'
      },
      {
        ar: 'وأوضح المشرف على المشروع أن التوسعة ستتيح استقبال محاصيل الخضروات والفواكه والتمور للمزارعين المحليين بأسعار تفضيلية، مما يمنع التلف الزراعي ويحافظ على استقرار الأسعار في الأسواق الإقليمية.',
        en: 'Project directors emphasized that the expansion facilitates receiving local fruit, date, and vegetable harvests at preferential rates, preventing seasonal spoilages.'
      }
    ],
    date: '2024-04-18',
    category: { ar: 'مشاريع واستثمارات', en: 'Projects & Investments' },
    categoryKey: 'projects',
    author: { ar: 'إدارة الإعلام والاتصال', en: 'Communication Dept.' },
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    readTime: { ar: '4 دقائق', en: '4 min read' },
    featured: false,
    tags: [
      { ar: 'ثلاجة الشامل', en: 'AlShamel Cold Storage' },
      { ar: 'الأمن الغذائي', en: 'Food Security' },
      { ar: 'القطاع الزراعي', en: 'Agriculture' }
    ]
  },
  {
    slug: 'mou-with-makkah-chamber',
    title: {
      ar: 'توقيع مذكرة تعاون استراتيجي بين تعاونية الشامل والغرفة التجارية الصناعية بمكة المكرمة',
      en: 'Strategic MOU Signed Between AlShamel and Makkah Chamber of Commerce'
    },
    excerpt: {
      ar: 'وقعت الجمعية مذكرة تعاون مع غرفة مكة لتعزيز تسويق المنتجات التعاونية ودعم رواد الأعمال والمشاريع الصغيرة والمتوسطة بالمحافظة.',
      en: 'A milestone cooperation agreement was signed to foster cooperative enterprise marketing and empower SME entrepreneurs in Makkah province.'
    },
    content: [
      {
        ar: 'وقعت الجمعية التعاونية متعددة الأغراض بجدة وغرفة مكة المكرمة مذكرة تعاون استراتيجي مشتركة تهدف إلى فتح آفاق جديدة لتسويق المنتجات التعاونية ودعم الحراك الاقتصادي بالمحافظة.',
        en: 'Jeddah Multipurpose Cooperative Society and Makkah Chamber ratified a strategic partnership to expand cooperative marketing opportunities and spur regional economic vitality.'
      },
      {
        ar: 'وتشمل المذكرة تنظيم معارض تسويقية دورية وتقديم استشارات تدريبية لرواد الأعمال، إضافة إلى التعاون في دراسات الجدوى والفرص الاستثمارية الواعدة في قطاعات التجزئة وسلاسل الإمداد.',
        en: 'The framework encompasses joint trade exhibitions, entrepreneur mentorship, and market feasibility research across retail and supply chain sectors.'
      }
    ],
    date: '2023-11-12',
    category: { ar: 'اتفاقيات وشراكات', en: 'Agreements & Partnerships' },
    categoryKey: 'agreements',
    author: { ar: 'المركز الإعلامي', en: 'Media Center' },
    image: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=1200&q=80',
    readTime: { ar: '3 دقائق', en: '3 min read' },
    featured: false,
    tags: [
      { ar: 'غرفة مكة', en: 'Makkah Chamber' },
      { ar: 'شراكات مجتمعية', en: 'Partnerships' },
      { ar: 'رواد الأعمال', en: 'Entrepreneurs' }
    ]
  },
  {
    slug: 'gas-smart-delivery-upgrade',
    title: {
      ar: 'مشروع غاز الشامل يطلق خدمة التوصيل الذكي وتتبع الطلبات المباشر عبر الهواتف الذكية',
      en: 'AlShamel Gas Upgrades Smart Home Delivery and Live Cylinder Tracking'
    },
    excerpt: {
      ar: 'أطلقت إدارة مشروع غاز الشامل منظومة رقمية متكاملة لجدولة وتوصيل أسطوانات الغاز للمنازل والمنشآت التجارية مع الدفع الإلكتروني المباشر.',
      en: 'AlShamel Gas launched a turnkey digital platform enabling automated LPG cylinder scheduling, live fleet tracking, and cashless instant payments.'
    },
    content: [
      {
        ar: 'في إطار حرص الجمعية على مواكبة التحول الرقمي وتسهيل حياة المواطنين والمقيمين بمحافظة جدة، أعلن مشروع غاز الشامل عن تفعيل نظام التوصيل الذكي لأسطوانات الغاز.',
        en: 'Fostering digital convenience for Jeddah residents, AlShamel Gas activated its smart home delivery routing and ordering application.'
      },
      {
        ar: 'ويتيح النظام الجديد للمستفيدين طلب استبدال أسطوانات الغاز، واختيار الأسطوانات المصنوعة من الألياف الزجاجية الخفيفة، وتتبع سيارة التوصيل لحظة بلحظة حتى وصولها إلى الموقع بكل يسر وسهولة.',
        en: 'The application empowers patrons to order composite gas cylinders, track service trucks in real time, and settle invoices with secure digital payment cards.'
      }
    ],
    date: '2023-08-20',
    category: { ar: 'أخبار الجمعية والفعاليات', en: 'Society News & Events' },
    categoryKey: 'events',
    author: { ar: 'إدارة الإعلام والاتصال', en: 'Communication Dept.' },
    image: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=1200&q=80',
    readTime: { ar: '2 دقيقة', en: '2 min read' },
    featured: false,
    tags: [
      { ar: 'غاز الشامل', en: 'AlShamel Gas' },
      { ar: 'التحول الرقمي', en: 'Digital Transformation' },
      { ar: 'خدمة العملاء', en: 'Customer Service' }
    ]
  }
];

export const getNewsBySlug = (slug: string): NewsItem | undefined => {
  return newsData.find(n => n.slug === slug);
};
