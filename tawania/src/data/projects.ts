import { Project } from '../types';

export const projectsData: Project[] = [
  {
    slug: 'reeda-cold-storage',
    name: {
      ar: 'ثلاجة الشامل',
      en: 'AlShamel Cold Storage & Refrigeration'
    },
    shortDescription: {
      ar: 'منشأة تبريد وتخزين لوجستية متطورة لدعم سلاسل الإمداد الغذائي والمنتجات الزراعية بمحافظة جدة.',
      en: 'Advanced cold chain and logistical storage facility supporting food supply chains and agricultural produce in Jeddah.'
    },
    fullDescription: {
      ar: 'تعد ثلاجة الشامل إحدى الركائز الاستراتيجية للجمعية التعاونية بجدة في قطاع الأمن الغذائي وسلاسل التوريد. تهدف المنشأة إلى حفظ وتخزين المنتجات الزراعية والغذائية واللحوم بأحدث تقنيات التبريد والتجميد والتحكم في الرطوبة والحرارة، مما يسهم في تقليل الفاقد الغذائي للمزارعين المحليين وتوفير مخزون استراتيجي آمن وموثوق لأسواق مكة المكرمة وجدة والمناطق المجاورة.',
      en: 'AlShamel Cold Storage is a strategic cornerstone for the society in food security and supply chain infrastructure. The facility preserves agricultural products, meat, and dry goods with advanced temperature-controlled technology, minimizing post-harvest losses and safeguarding regional food reserves.'
    },
    category: {
      ar: 'الأغذية وسلاسل الإمداد',
      en: 'Food & Cold Chain'
    },
    categoryKey: 'food',
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80'
    ],
    yearEstablished: '2016',
    status: 'active',
    featured: true,
    stats: [
      { label: { ar: 'السعة التخزينية', en: 'Storage Capacity' }, value: '2,500 طن' },
      { label: { ar: 'غرف التبريد والتجميد', en: 'Cooling Chambers' }, value: '8 غرف' },
      { label: { ar: 'معدل الجاهزية التشغيلية', en: 'Operational Readiness' }, value: '99.8%' },
      { label: { ar: 'الشركاء التجاريين', en: 'Commercial Partners' }, value: '45+ شريك' }
    ],
    objectives: [
      {
        title: { ar: 'تأمين سلاسل الإمداد الغذائي', en: 'Securing Food Supply Chains' },
        description: { ar: 'توفير بنية تخزينية مبردة بمعايير عالمية للمزارعين والتجار في منطقة مكة المكرمة.', en: 'Providing world-class refrigerated infrastructure for local farmers and merchants.' }
      },
      {
        title: { ar: 'تقليل الفاقد الزراعي', en: 'Minimizing Agricultural Loss' },
        description: { ar: 'إتاحة خيارات حفظ متقدمة للخضروات والفواكه خلال مواسم ذروة الإنتاج.', en: 'Offering advanced preservation options during seasonal peak harvests.' }
      },
      {
        title: { ar: 'تحقيق الاستدامة الاستثمارية', en: 'Achieving Investment Sustainability' },
        description: { ar: 'توليد عوائد مجزية للجمعية تساهم في نمو رأس المال وتوزيع الأرباح.', en: 'Generating sustainable returns for the cooperative and its members.' }
      }
    ],
    services: [
      {
        title: { ar: 'التخزين المبرد والمجمد', en: 'Chilled & Frozen Storage' },
        description: { ar: 'غرف متعددة درجات الحرارة تبدأ من +15°م حتى -25°م لتناسب كافة السلع الغذائية.', en: 'Multi-temperature rooms ranging from +15°C to -25°C accommodating all perishables.' }
      },
      {
        title: { ar: 'إدارة المخزون اللوجستي', en: 'Inventory & Logistics Management' },
        description: { ar: 'نظام رقمي دقيق لمتابعة السلع والتواريخ ودفعات التوريد بنظام FIFO.', en: 'State-of-the-art digital warehouse management with real-time inventory tracking.' }
      },
      {
        title: { ar: 'خدمات التحميل والتفريغ السريع', en: 'Rapid Cross-Docking & Handling' },
        description: { ar: 'أرصفة مجهزة بالكامل لاستقبال شاحنات النقل الثقيل والمتوسط بكفاءة عالية.', en: 'Fully equipped loading docks accommodating heavy and medium transport fleets.' }
      }
    ],
    impact: [
      { ar: 'حماية إنتاج أكثر من 120 مزارعاً محلياً من التلف خلال المواسم الزراعية.', en: 'Safeguarding produce for over 120 local farmers during peak agricultural seasons.' },
      { ar: 'خلق فرص وظيفية متخصصة في الإدارة اللوجستية والتخزين لأبناء المحافظة.', en: 'Creating specialized logistics and warehousing jobs for local Saudi youth.' },
      { ar: 'تعزيز الأمن الغذائي الإقليمي لخدمة مواسم الحج والعمرة بمكة المكرمة.', en: 'Strengthening regional food resilience during Hajj and Umrah peak seasons in Makkah.' }
    ],
    relatedSlugs: ['reeda-packaging', 'reeda-consumer', 'reeda-livestock']
  },
  {
    slug: 'reeda-emaar',
    name: {
      ar: 'إعمار الشامل',
      en: 'AlShamel Contracting & Development'
    },
    shortDescription: {
      ar: 'ذراع المقاولات والتطوير العمراني للجمعية لتنفيذ المشاريع الإنشائية والبنية التحتية بكفاءة عالية.',
      en: 'The society contracting and urban development arm executing high-grade construction and infrastructure projects.'
    },
    fullDescription: {
      ar: 'يمثل مشروع إعمار الشامل الذراع التنفيذي للجمعية في قطاع المقاولات العامة والإنشاءات والتطوير العقاري. يتولى المشروع تنفيذ وتطوير المباني السكنية والتجارية والمرافق العامة التابعة للجمعية وللغير، مع الالتزام التام بكود البناء السعودي وأعلى مواصفات الجودة الهندسية والسلامة المهنية.',
      en: 'AlShamel Emaar serves as the construction, general contracting, and infrastructure development division. The enterprise undertakes residential, commercial, and institutional projects ensuring compliance with the Saudi Building Code and strict quality metrics.'
    },
    category: {
      ar: 'المقاولات والتشييد',
      en: 'Contracting & Construction'
    },
    categoryKey: 'contracting',
    heroImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1400&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?auto=format&fit=crop&w=800&q=80'
    ],
    yearEstablished: '2018',
    status: 'active',
    featured: true,
    stats: [
      { label: { ar: 'المشاريع المنفذة', en: 'Delivered Projects' }, value: '30+ مشروع' },
      { label: { ar: 'مساحات الإنشاء', en: 'Built-up Area' }, value: '45,000 م²' },
      { label: { ar: 'نسبة الالتزام بالجدول', en: 'On-Time Completion' }, value: '98%' },
      { label: { ar: 'الكوادر الهندسية والفنية', en: 'Technical Team' }, value: '25+ مهندس وفني' }
    ],
    objectives: [
      {
        title: { ar: 'تطوير الأصول العقارية للجمعية', en: 'Developing Society Real Estate Assets' },
        description: { ar: 'إنشاء وصيانة مباني ومستودعات ومرافق مشاريع الجمعية ذاتياً بأعلى كفاءة تكلفة.', en: 'Constructing and maintaining society facilities self-sufficiently at optimal cost.' }
      },
      {
        title: { ar: 'خدمة المجتمع المحلي', en: 'Serving Local Infrastructure' },
        description: { ar: 'تقديم خدمات المقاولات للمواطنين والمؤسسات بجودة موثوقة وأسعار تعاونية تنافسية.', en: 'Offering reliable construction services for local residents and organizations.' }
      }
    ],
    services: [
      {
        title: { ar: 'المقاولات العامة والإنشاءات', en: 'General Contracting' },
        description: { ar: 'تنفيذ المباني الخرسانية والمنشآت المعدنية والمجمعات التجارية المتكاملة.', en: 'Executing structural concrete, steel buildings, and turnkey commercial plazas.' }
      },
      {
        title: { ar: 'التشطيبات والديكورات الحديثة', en: 'Fit-Out & Modern Finishing' },
        description: { ar: 'أعمال التشطيب الداخلي والخارجي وفق التصاميم المعمارية الحديثة.', en: 'High-end interior and exterior finishing conforming to modern architectural aesthetics.' }
      },
      {
        title: { ar: 'الصيانة والترميم الشامل', en: 'Renovation & Facility Maintenance' },
        description: { ar: 'عقود صيانة دورية للمنشآت والمرافق الحيوية لضمان استدامة الأصول.', en: 'Comprehensive facility maintenance contracts ensuring prolonged asset lifespans.' }
      }
    ],
    impact: [
      { ar: 'تطوير البنية التحتية لمرافق الجمعية وتخفيض تكاليف الإنشاء بنسبة 20%.', en: 'Upgraded cooperative facilities while optimizing construction expenditures by 20%.' },
      { ar: 'تنفيذ مشاريع وقفية وتنموية بالتعاون مع الجمعيات الأهلية بالمحافظة.', en: 'Delivered endowment and community facilities in collaboration with local non-profits.' }
    ],
    relatedSlugs: ['reeda-cold-storage', 'reeda-business-consulting', 'reeda-security']
  },
  {
    slug: 'reeda-packaging',
    name: {
      ar: 'الشامل للتعبئة والتغليف',
      en: 'AlShamel Packaging & Filling'
    },
    shortDescription: {
      ar: 'خطوط إنتاج وتعبئة حديثة تقدم حلول التغليف الصحي المتقدم للمنتجات الغذائية والتمور والسلع الاستهلاكية.',
      en: 'Modern automated packaging lines providing hygienic packaging solutions for food, dates, and consumer goods.'
    },
    fullDescription: {
      ar: 'يقدم مشروع الشامل للتعبئة والتغليف حلولاً صناعية متكاملة لتجهيز وفرز وتعبئة وتغليف المواد الغذائية والمحاصيل الزراعية كالتمور والحبوب والخضار المجففة، وفق أعلى معايير سلامة الغذاء (HACCP و ISO). ويوفر المشروع خدماته للقطاعين التجاري والزراعي في المحافظة وخارجها.',
      en: 'AlShamel Packaging provides state-of-the-art packaging, sorting, and sealing solutions for food items, dates, and agricultural harvests adhering strictly to HACCP and ISO food safety standards.'
    },
    category: {
      ar: 'الصناعات الغذائية والتعبئة',
      en: 'Packaging & Bottling'
    },
    categoryKey: 'packaging',
    heroImage: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1400&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=800&q=80'
    ],
    yearEstablished: '2019',
    status: 'active',
    featured: false,
    stats: [
      { label: { ar: 'الطاقة الإنتاجية اليومية', en: 'Daily Capacity' }, value: '15 طن/يوم' },
      { label: { ar: 'خطوط التعبئة الآلية', en: 'Automated Lines' }, value: '4 خطوط' },
      { label: { ar: 'شهادات الجودة والسلامة', en: 'Quality Certifications' }, value: 'ISO 22000 & SFDA' },
      { label: { ar: 'المنتجات المغلفة سنوياً', en: 'Packaged Units / Year' }, value: '1.8M عبوة' }
    ],
    objectives: [
      {
        title: { ar: 'تعظيم القيمة المضافة للمنتج المحلي', en: 'Maximizing Local Product Value' },
        description: { ar: 'تحويل المحاصيل الزراعية الخام إلى منتجات مغلفة فاخرة جاهزة للتسويق والتصدير.', en: 'Transforming raw produce into premium consumer-ready packaged goods.' }
      },
      {
        title: { ar: 'تطبيق أعلى معايير السلامة الصحية', en: 'Ensuring Highest Food Safety' },
        description: { ar: 'ضمان التعبئة في بيئة صحية معقمة خاضعة لإشراف هيئة الغذاء والدواء.', en: 'Hygienic processing monitored under Saudi Food & Drug Authority standards.' }
      }
    ],
    services: [
      {
        title: { ar: 'تعبئة وتغليف التمور والمنتجات الجافة', en: 'Dates & Dry Goods Packaging' },
        description: { ar: 'خطوط فرز وغسيل وتفريغ هواء (فاكيوم) وتغليف حراري بمختلف الأحجام.', en: 'Washing, sorting, vacuum-sealing, and thermoforming in diverse packaging formats.' }
      },
      {
        title: { ar: 'خدمات التعبئة للغير (Private Label)', en: 'Contract Packaging (Private Label)' },
        description: { ar: 'تجهيز وتغليف المنتجات بعلامات تجارية خاصة للشركات والمزارع.', en: 'Customized private-label packaging for regional brands and farms.' }
      }
    ],
    impact: [
      { ar: 'تمكين منتجي التمور بالمنطقة من تسويق محاصيلهم بأسعار عادلة ومنافسة.', en: 'Empowered local date growers to market crops at fair and lucrative value.' },
      { ar: 'توفير حلول تغليف صديقة للبيئة وقابلة لإعادة التدوير بنسبة 70%.', en: 'Integrated 70% eco-friendly and recyclable packaging materials.' }
    ],
    relatedSlugs: ['reeda-cold-storage', 'reeda-consumer', 'reeda-ecommerce']
  },
  {
    slug: 'reeda-ecommerce',
    name: {
      ar: 'المتاجر الإلكترونية للشامل',
      en: 'AlShamel E-Commerce Platforms'
    },
    shortDescription: {
      ar: 'منصات تجارة رقمية متكاملة لبيع وتسويق منتجات الجمعية والشركاء مع خدمات الدفع والتوصيل السريع.',
      en: 'Integrated digital commerce platforms retailing society and partner products with seamless payments and delivery.'
    },
    fullDescription: {
      ar: 'تمثل المتاجر الإلكترونية للشامل ذراع التحول الرقمي والتجارة الإلكترونية في الجمعية. تتيح المنصة للمستهلكين والشركات شراء السلع الاستهلاكية، المنتجات الزراعية، الغاز المنزلي، والذبائح والأعلاف عبر تطبيقات ومنصات ذكية وسلسة توفر خيارات الدفع الإلكتروني المعتمدة والتوصيل المباشر حتى باب المنزل.',
      en: 'AlShamel E-Commerce drives digital transformation across cooperative retail operations. The digital ecosystem allows customers to order consumer goods, gas cylinders, agricultural products, and livestock via modern web and mobile apps with door-to-door delivery.'
    },
    category: {
      ar: 'التجارة الرقمية والتقنية',
      en: 'E-Commerce & Digital'
    },
    categoryKey: 'digital',
    heroImage: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=1400&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1556742049-0a67e5572293?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80'
    ],
    yearEstablished: '2021',
    status: 'expanding',
    featured: true,
    stats: [
      { label: { ar: 'الطلبات المنجزة', en: 'Completed Orders' }, value: '50,000+ طلب' },
      { label: { ar: 'المنتجات المعروضة', en: 'Active SKU Catalog' }, value: '3,200+ منتج' },
      { label: { ar: 'متوسط زمن التوصيل', en: 'Avg. Delivery Time' }, value: '45 دقيقة' },
      { label: { ar: 'معدل تقييم العملاء', en: 'Customer Satisfaction' }, value: '4.8 / 5' }
    ],
    objectives: [
      {
        title: { ar: 'تسهيل وصول الخدمات للمستهلكين', en: 'Enhancing Consumer Convenience' },
        description: { ar: 'توفير تجربة تسوق مريحة وسريعة عبر الهواتف الذكية مع خيارات دفع آمنة.', en: 'Providing a frictionless smartphone shopping journey with secure digital payments.' }
      },
      {
        title: { ar: 'أتمتة المبيعات واللوجستيات', en: 'Automating Sales & Logistics' },
        description: { ar: 'ربط المتاجر الإلكترونية بالمستودعات ونقاط التوزيع وفروع الجمعية آلياً.', en: 'Integrating digital storefronts seamlessly with central warehouses and POS hubs.' }
      }
    ],
    services: [
      {
        title: { ar: 'تطبيق استهلاكية الشامل الرقمي', en: 'AlShamel Consumer App' },
        description: { ar: 'تسوق المواد الغذائية والمستلزمات المنزلية مع خدمة التوصيل السريع للمنازل.', en: 'Groceries and household essentials delivered directly from the superstore.' }
      },
      {
        title: { ar: 'منظومة طلب الغاز الذكي', en: 'Smart Gas Ordering' },
        description: { ar: 'طلب استبدال وتوصيل أسطوانات الغاز بجدولة دقيقة وتتبع مباشر لسيارات الخدمة.', en: 'On-demand LPG gas cylinder replacement with live driver tracking.' }
      },
      {
        title: { ar: 'منصة تسويق المواشي والأضاحي', en: 'Livestock & Sacrifices Portal' },
        description: { ar: 'حجز واختيار الأضاحي والذبائح المذبوحة والمجهزة صحياً مع التوصيل.', en: 'Booking verified sacrifices and livestock with full butchery and delivery service.' }
      }
    ],
    impact: [
      { ar: 'خدمة أكثر من 12,000 أسرة في محافظة جدة والقرى والمراكز التابعة لها.', en: 'Served more than 12,000 households across Jeddah governorate and rural centers.' },
      { ar: 'دعم التحول الرقمي والدفع غير النقدي بنسبة تجاوزت 85% من إجمالي المبيعات.', en: 'Accelerated cashless payments to over 85% of total digital sales volume.' }
    ],
    relatedSlugs: ['reeda-consumer', 'reeda-gas', 'reeda-telecom-it']
  },
  {
    slug: 'reeda-security',
    name: {
      ar: 'الشامل الأمنية',
      en: 'AlShamel Security Solutions & Guarding'
    },
    shortDescription: {
      ar: 'حلول الحراسات الأمنية المدنية الخاصة وأنظمة المراقبة والسلامة للمنشآت الحكومية والتجارية.',
      en: 'Private civil guarding services, electronic surveillance, and asset protection solutions for public and private facilities.'
    },
    fullDescription: {
      ar: 'يقدم قطاع الشامل الأمنية خدمات الحراسات الأمنية المدنية الخاصة المرخصة رسمياً من الهيئة العليا للأمن الصناعي ووزارة الداخلية. يركز المشروع على تأمين المنشآت الحيوية والمجمعات التجارية والمدارس والمشاريع الإنشائية بكوادر وطنية مؤهلة ومجهزة بأحدث وسائل الاتصال والمراقبة الأمنية الذكية.',
      en: 'AlShamel Security delivers certified private security guarding services officially licensed by competent authorities. The enterprise protects industrial facilities, shopping complexes, and educational entities with rigorously trained national security personnel and cutting-edge surveillance systems.'
    },
    category: {
      ar: 'الخدمات الأمنية والسلامة',
      en: 'Security & Guarding'
    },
    categoryKey: 'security',
    heroImage: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1400&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80'
    ],
    yearEstablished: '2020',
    status: 'active',
    featured: false,
    stats: [
      { label: { ar: 'رجال الأمن المدني المؤهلين', en: 'Certified Security Guards' }, value: '80+ فرد أمن' },
      { label: { ar: 'المنشآت المؤمنة', en: 'Guarded Facilities' }, value: '22 منشأة' },
      { label: { ar: 'ساعات الحراسة السنوية', en: 'Guarding Hours / Year' }, value: '700K+ ساعة' },
      { label: { ar: 'نسبة التوطين', en: 'Saudization Rate' }, value: '100%' }
    ],
    objectives: [
      {
        title: { ar: 'حماية وتأمين الأصول والمرافق', en: 'Asset & Facility Protection' },
        description: { ar: 'توفير بيئة عمل آمنة ومحمية للمنشآت والمشاريع التابعة للجمعية والعملاء.', en: 'Ensuring safe, protected operating environments for enterprise assets and clients.' }
      },
      {
        title: { ar: 'تمكين وتوظيف الشباب السعودي', en: 'Empowering Saudi Youth' },
        description: { ar: 'خلق وظائف أمنية مستقرة مع برامج تدريب وتطوير مستمرة.', en: 'Creating stable security careers with accredited training and professional development.' }
      }
    ],
    services: [
      {
        title: { ar: 'الحراسات الأمنية الميدانية', en: 'On-Site Physical Guarding' },
        description: { ar: 'حراسة دورية وثابتة للمباني والمجمعات والمستودعات على مدار 24 ساعة.', en: '24/7 static and roving security patrols for buildings, complexes, and warehouses.' }
      },
      {
        title: { ar: 'أنظمة المراقبة والتحكم في الدخول', en: 'Surveillance & Access Control' },
        description: { ar: 'تركيب وإدارة كاميرات المراقبة الرقمية (CCTV) وبوابات الدخول الذكية.', en: 'Installation and operation of digital CCTV cameras and biometric access barriers.' }
      }
    ],
    impact: [
      { ar: 'توطين كامل بنسبة 100% لكافة الوظائف الأمنية والإشرافية بالمشروع.', en: '100% Saudization across all operational and supervisory security roles.' },
      { ar: 'صفر حوادث أمنية جسيمة في كافة المواقع تحت إشراف المشروع.', en: 'Zero major security incidents across all managed institutional premises.' }
    ],
    relatedSlugs: ['reeda-emaar', 'reeda-telecom-it', 'reeda-business-consulting']
  },
  {
    slug: 'reeda-telecom-it',
    name: {
      ar: 'الشامل للاتصالات وتقنية المعلومات',
      en: 'AlShamel Telecom & IT Solutions'
    },
    shortDescription: {
      ar: 'تطوير البنى التحتية الرقمية، البرمجيات السحابية، وحلول الشبكات والاتصالات للقطاعين التعاوني والتجاري.',
      en: 'Digital infrastructure development, cloud systems, and network communication solutions for cooperative and private sectors.'
    },
    fullDescription: {
      ar: 'تعد وحدة الشامل للاتصالات وتقنية المعلومات المحرك التقني لعمليات الجمعية ومشاريعها. تقدم الوحدة حلول الأنظمة المؤسسية (ERP)، أنظمة نقاط البيع السحابية، البنية التحتية للشبكات والاتصالات، وتطوير المنصات الرقمية وخدمات الدعم الفني والأمن السيبراني وفق معايير الهيئة الوطنية للأمن السيبراني.',
      en: 'AlShamel Telecom & IT is the technology engine driving digital transformation across society departments. The division provides Enterprise Resource Planning (ERP), cloud POS systems, enterprise networking, application engineering, and cybersecurity compliant with NCA guidelines.'
    },
    category: {
      ar: 'تقنية المعلومات والاتصالات',
      en: 'Telecom & IT'
    },
    categoryKey: 'technology',
    heroImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'
    ],
    yearEstablished: '2021',
    status: 'active',
    featured: false,
    stats: [
      { label: { ar: 'الأنظمة المؤتمتة', en: 'Automated Systems' }, value: '14 نظاماً' },
      { label: { ar: 'أجهزة نقاط البيع المربوطة', en: 'Connected POS Terminals' }, value: '65+ جهازاً' },
      { label: { ar: 'نسبة توفر الخوادم السحابية', en: 'Cloud Uptime' }, value: '99.9%' },
      { label: { ar: 'تذاكر الدعم الفني المنجزة', en: 'Resolved Tickets' }, value: '99.2%' }
    ],
    objectives: [
      {
        title: { ar: 'التحول الرقمي الشامل للجمعية', en: 'Comprehensive Society Digitalization' },
        description: { ar: 'أتمتة كافة العمليات المحاسبية والمخزنية والإدارية لرفع كفاءة الإنفاق والرقابة.', en: 'Automating all accounting, inventory, and administrative workflows for maximum cost efficiency.' }
      },
      {
        title: { ar: 'تقديم حلول تقنية للجهات الشريكة', en: 'Providing IT Solutions to Partners' },
        description: { ar: 'تزويد الجمعيات الأهلية والشركات المحلية بحلول تقنية موثوقة وبأسعار تعاونية.', en: 'Equipping partner non-profits and local SMEs with dependable, cost-effective IT infrastructure.' }
      }
    ],
    services: [
      {
        title: { ar: 'أنظمة إدارة الموارد المؤسسية (ERP)', en: 'ERP Systems Implementation' },
        description: { ar: 'ربط الحسابات العامة، المشتريات، المبيعات، وشؤون الموظفين في منصة موحدة.', en: 'Unified financial management, procurement, sales, and HR enterprise integration.' }
      },
      {
        title: { ar: 'تمديد وإعداد شبكات الاتصالات والألياف', en: 'Networking & Fiber Optics' },
        description: { ar: 'تصميم وتركيب الشبكات السلكية واللاسلكية وسنترالات الاتصالات المتقدمة.', en: 'Design and installation of enterprise LAN/WAN, fiber infrastructure, and IP telephony.' }
      }
    ],
    impact: [
      { ar: 'خفض الوقت اللازم لإصدار التقارير المالية والإدارية بنسبة 60%.', en: 'Reduced lead time for quarterly and annual financial reporting by 60%.' },
      { ar: 'حماية بيانات الجمعية والمساهمين وفق أعلى معايير التشفير والنسخ الاحتياطي.', en: 'Shielded shareholder and organizational data with strict encryption and automated backups.' }
    ],
    relatedSlugs: ['reeda-ecommerce', 'reeda-security', 'reeda-business-consulting']
  },
  {
    slug: 'reeda-livestock',
    name: {
      ar: 'الشامل للمواشي والإنتاج الحيواني',
      en: 'AlShamel Livestock & Animal Production'
    },
    shortDescription: {
      ar: 'تربية وتسمين المواشي وتوفير الأعلاف والأضاحي والذبائح الطازجة الخاضعة للإشراف البيطري الكامل.',
      en: 'Livestock breeding, fattening, feed distribution, and veterinary-supervised fresh meat and sacrifice services.'
    },
    fullDescription: {
      ar: 'يقوم مشروع الشامل للمواشي بتنمية الثروة الحيوانية في محافظة جدة عبر حظائر نموذجية لتربية وتسمين الأغنام والإبل والأبقار. يوفر المشروع أعلافاً عالية الجودة وذبائح طازجة ومذبوحة وفق الشريعة الإسلامية في مسالخ معتمدة، مع تقديم خدمات الأضاحي والعقائق للمواطنين والمقيمين وموسم الحج.',
      en: 'AlShamel Livestock develops livestock production in Jeddah through modern breeding and fattening feedlots. The project supplies premium fodder, veterinary-inspected fresh meat slaughtered in certified abattoirs, and turnkey seasonal sacrifice (Udhiyah) services for pilgrims and residents.'
    },
    category: {
      ar: 'الثروة الحيوانية والزراعية',
      en: 'Livestock & Animal Farming'
    },
    categoryKey: 'agriculture',
    heroImage: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1400&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&w=800&q=80'
    ],
    yearEstablished: '2017',
    status: 'active',
    featured: false,
    stats: [
      { label: { ar: 'الطاقة الاستيعابية للقطيع', en: 'Herd Capacity' }, value: '5,000+ رأس' },
      { label: { ar: 'الأضاحي والذبائح السنوية', en: 'Annual Meat Services' }, value: '8,500+ رأس' },
      { label: { ar: 'الأعلاف الموزعة سنوياً', en: 'Feed Distributed' }, value: '1,200 طن' },
      { label: { ar: 'الإشراف البيطري', en: 'Veterinary Oversight' }, value: 'فحص دوري 100%' }
    ],
    objectives: [
      {
        title: { ar: 'تعزيز الأمن الغذائي من اللحوم الحمراء', en: 'Enhancing Red Meat Food Security' },
        description: { ar: 'توفير لحوم محلية طازجة وصحية تلبي احتياجات المستهلكين بالمنطقة بأسعار عادلة.', en: 'Supplying fresh, healthy domestic meat meeting regional consumer demands at fair prices.' }
      },
      {
        title: { ar: 'دعم مربي الماشية بجدة', en: 'Supporting Local Livestock Farmers' },
        description: { ar: 'توفير الأعلاف المركبة والشعير بأسعار مدعومة وتعاونية.', en: 'Distributing formulated animal feed and barley at regulated cooperative rates.' }
      }
    ],
    services: [
      {
        title: { ar: 'توريد وبيع الذبائح والأضاحي', en: 'Fresh Livestock & Sacrifice Services' },
        description: { ar: 'خيارات متعددة (حري، نعيمي، تيوس، حواشي) مع الذبح والتقطيع والتوصيل المبرد.', en: 'Premium breeds (Harri, Nuaimi, veal) with certified slaughter, butchery, and chilled delivery.' }
      },
      {
        title: { ar: 'توزيع الأعلاف والمكملات الغذائية', en: 'Feed & Veterinary Nutritional Supplements' },
        description: { ar: 'مستودعات مركزية لتوفير احتياجات المزارعين ومربي المواشي بالمحافظة.', en: 'Centralized distribution hubs providing animal feed and veterinary nutrition.' }
      }
    ],
    impact: [
      { ar: 'تزويد استهلاكية الشامل والمطاعم المحلية بلحوم محلية طازجة ومضمونة المصدر.', en: 'Directly supplying AlShamel Consumer stores and local eateries with certified fresh meat.' },
      { ar: 'المشاركة الفاعلة في مشاريع الإطعام واللحوم لموسم الحج سنوياً.', en: 'Active participation in seasonal meat provisioning and feeding programs during Hajj.' }
    ],
    relatedSlugs: ['reeda-cold-storage', 'reeda-consumer', 'reeda-packaging']
  },
  {
    slug: 'reeda-gas',
    name: {
      ar: 'غاز الشامل',
      en: 'AlShamel Gas Distribution'
    },
    shortDescription: {
      ar: 'محطة ومستودعات توزيع الغاز البترولي المسال (LPG) وتوصيل الأسطوانات للمنازل والمنشآت التجارية.',
      en: 'LPG gas cylinder distribution center, depot storage, and home/commercial delivery services in Jeddah.'
    },
    fullDescription: {
      ar: 'يعد مشروع غاز الشامل الموزع الرئيسي لغاز البترول المسال (LPG) في محافظة جدة تحت إشراف شركة الغاز والتصنيع الأهلية (غازكو) والدفاع المدني. يمتلك المشروع أسطول سيارات مجهزة لنقل وتوصيل أسطوانات الغاز الحديثة والخفيفة للمنازل والمطاعم والمطابخ والمصانع بكل أمان وسرعة.',
      en: 'AlShamel Gas is the primary LPG distributor in Jeddah governorate, operating in full compliance with GASCO and Civil Defense safety protocols. The enterprise manages an agile fleet delivering standard and composite gas cylinders to households, restaurants, and industrial facilities with top safety standards.'
    },
    category: {
      ar: 'توزيع الطاقة والغاز',
      en: 'Gas & Energy Distribution'
    },
    categoryKey: 'energy',
    heroImage: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=1400&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    ],
    yearEstablished: '2015',
    status: 'active',
    featured: true,
    stats: [
      { label: { ar: 'الأسطوانات الموزعة سنوياً', en: 'Annual Cylinders Distributed' }, value: '180,000+ أسطوانة' },
      { label: { ar: 'أسطول التوصيل الميداني', en: 'Delivery Vehicle Fleet' }, value: '12 شاحنة مجهزة' },
      { label: { ar: 'المنشآت التجارية المخدومة', en: 'Commercial Clients' }, value: '160+ منشأة' },
      { label: { ar: 'معيار الالتزام بالسلامة', en: 'Safety Compliance Rate' }, value: '100%' }
    ],
    objectives: [
      {
        title: { ar: 'تأمين إمدادات الغاز لمحافظة جدة', en: 'Securing Fuel Supplies for Jeddah' },
        description: { ar: 'ضمان توفر أسطوانات الغاز دون أي انقطاع في جميع المواسم والأوقات.', en: 'Ensuring uninterrupted supply of LPG cylinders throughout all seasons and demand spikes.' }
      },
      {
        title: { ar: 'تسهيل التوصيل المنزلي السريع', en: 'Frictionless Home Delivery' },
        description: { ar: 'إتاحة الطلب عبر الاتصال الهاتفي والتطبيقات الإلكترونية مع خيارات الدفع عند الاستلام أو إلكترونياً.', en: 'Enabling on-demand delivery via phone and digital app with multiple payment gateways.' }
      }
    ],
    services: [
      {
        title: { ar: 'توصيل واستبدال أسطوانات الغاز المنزلية', en: 'Residential Cylinder Delivery' },
        description: { ar: 'توصيل وتركيب الأسطوانات الحديدية والفيبرجلاس الخفيفة والآمنة حتى المطبخ.', en: 'Delivery and safe installation of traditional and lightweight composite cylinders.' }
      },
      {
        title: { ar: 'عقود التوريد التجاري والصناعي', en: 'Commercial & Industrial Contracts' },
        description: { ar: 'تزويد المطاعم، المخابز، المجمعات السكنية، والمصانع باحتياجات الغاز بانتظام.', en: 'Supplying commercial kitchens, bakeries, compound communities, and workshops.' }
      }
    ],
    impact: [
      { ar: 'خدمة أكثر من 25,000 مستفيد شهرياً في المحافظة والقرى المحيطة.', en: 'Serving more than 25,000 beneficiaries monthly across the governorate and surrounding villages.' },
      { ar: 'الحفاظ على سجل أمني ناصع بنسبة التزام تام بإرشادات السلامة والوقاية من الحرائق.', en: 'Maintaining a spotless safety record with full adherence to fire prevention protocols.' }
    ],
    relatedSlugs: ['reeda-ecommerce', 'reeda-consumer', 'reeda-security']
  },
  {
    slug: 'reeda-business-consulting',
    name: {
      ar: 'الشامل للأعمال والاستشارات',
      en: 'AlShamel Business & Consulting'
    },
    shortDescription: {
      ar: 'دراسات الجدوى الاقتصادية، استشارات الحوكمة التعاونية، وحلول تطوير الأعمال للمنشآت والمستثمرين.',
      en: 'Economic feasibility studies, cooperative governance advisory, and enterprise development solutions.'
    },
    fullDescription: {
      ar: 'يقدم مركز الشامل للأعمال والاستشارات خدمات استشارية متخصصة في مجالات تأسيس وتطوير الكيانات التعاونية، دراسات الجدوى الاقتصادية، التطوير الإداري والمالي، وتطبيقات الحوكمة والامتثال للقطاعين غير الربحي والتجاري، مستنداً إلى خبرات وتجارب الجمعية الناجحة في إدارة المشاريع المتعددة.',
      en: 'AlShamel Business & Consulting offers expert advisory services covering cooperative entity incubation, market feasibility research, institutional restructuring, and governance compliance tailored for the non-profit and commercial sectors.'
    },
    category: {
      ar: 'الاستشارات وتطوير الأعمال',
      en: 'Business & Advisory'
    },
    categoryKey: 'consulting',
    heroImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80'
    ],
    yearEstablished: '2022',
    status: 'active',
    featured: false,
    stats: [
      { label: { ar: 'دراسات الجدوى المنجزة', en: 'Feasibility Studies Done' }, value: '35+ دراسة' },
      { label: { ar: 'الجمعيات والمؤسسات المستفيدة', en: 'Advised Institutions' }, value: '18 جهة' },
      { label: { ar: 'ورش العمل التخصصية', en: 'Specialized Workshops' }, value: '24 ورشة' },
      { label: { ar: 'ساعات الاستشارات التعاونية', en: 'Advisory Hours' }, value: '1,500+ ساعة' }
    ],
    objectives: [
      {
        title: { ar: 'نقل ونشر أفضل الممارسات التعاونية', en: 'Disseminating Cooperative Best Practices' },
        description: { ar: 'تمكين الجمعيات الناشئة من تطبيق نماذج عمل تشغيلية مستدامة ومربحة.', en: 'Empowering emerging cooperatives to adopt financially viable, sustainable business models.' }
      },
      {
        title: { ar: 'ترسيخ مبادئ الحوكمة الرشيدة', en: 'Instilling Sound Governance Principles' },
        description: { ar: 'مساعدة المنشآت على استيفاء متطلبات المركز الوطني لتنمية القطاع غير الربحي.', en: 'Assisting non-profits in achieving NCNP governance compliance milestones.' }
      }
    ],
    services: [
      {
        title: { ar: 'إعداد دراسات الجدوى الاقتصادية', en: 'Feasibility & Market Studies' },
        description: { ar: 'دراسات تسويقية ومالية وفنية متكاملة للمشاريع الاستثمارية والتعاونية.', en: 'Comprehensive marketing, technical, and financial feasibility studies for investments.' }
      },
      {
        title: { ar: 'تأهيل وتطبيق لوائح الحوكمة', en: 'Governance Framework Design' },
        description: { ar: 'صياغة اللوائح والسياسات الداخلية ومصفوفات الصلاحيات للكيانات والمجالس.', en: 'Drafting bylaws, delegation matrices, and internal compliance codes.' }
      }
    ],
    impact: [
      { ar: 'مساعدة 8 جمعيات تعاونية ناشئة بالمنطقة الغربية على الانطلاق التشغيلي.', en: 'Guided 8 startup cooperatives in the Western Region into operational launch.' },
      { ar: 'تدريب أكثر من 200 قيادي وموظف في قطاع العمل التعاوني بالمملكة.', en: 'Trained over 200 leaders and staff members across the Saudi cooperative ecosystem.' }
    ],
    relatedSlugs: ['reeda-telecom-it', 'reeda-emaar', 'reeda-ecommerce']
  },
  {
    slug: 'reeda-consumer',
    name: {
      ar: 'استهلاكية الشامل',
      en: 'AlShamel Consumer Retail / Hypermarket'
    },
    shortDescription: {
      ar: 'المجمع الاستهلاكي التعاوني الأكبر بجدة لتوفير السلع الغذائية والتموينية والأدوات المنزلية بأسعار منافسة.',
      en: 'The premier cooperative hypermarket in Jeddah providing foodstuffs, groceries, and household goods at competitive prices.'
    },
    fullDescription: {
      ar: 'تعد استهلاكية الشامل أحد أقدم وأهم المشاريع الحيوية للجمعية في خدمة أهالي محافظة جدة والمراكز التابعة لها. يقدم المجمع الاستهلاكي تجربة تسوق شاملة تضم آلاف الأصناف الغذائية والاستهلاكية الطازجة والمجمدة والأدوات المنزلية بأسعار تعاونية مخفضة وعروض أسبوعية مستمرة، مما يحد من غلاء الأسعار ويوفر خيارات تسوق متكاملة لأفراد المجتمع.',
      en: 'AlShamel Consumer Store is one of the society most celebrated enterprises serving residents of Jeddah. The expansive supermarket offers thousands of fresh, dry, and frozen products, fresh produce, meat, and home essentials with ongoing promotional pricing that anchors local market affordability.'
    },
    category: {
      ar: 'التجزئة والسلع الاستهلاكية',
      en: 'Consumer Retail & Hypermarket'
    },
    categoryKey: 'retail',
    heroImage: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1400&q=80',
    thumbnailImage: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=800&q=80'
    ],
    yearEstablished: '2014',
    status: 'active',
    featured: true,
    stats: [
      { label: { ar: 'الأصناف المتوفرة بالمتجر', en: 'Available Products (SKU)' }, value: '8,000+ صنف' },
      { label: { ar: 'المستفيدين والعملاء شهرياً', en: 'Monthly Shoppers' }, value: '35,000+ عميل' },
      { label: { ar: 'مساحة المجمع الاستهلاكي', en: 'Store Floor Area' }, value: '1,800 م²' },
      { label: { ar: 'معدل التوفير للمستهلك', en: 'Avg. Consumer Savings' }, value: '15% - 25%' }
    ],
    objectives: [
      {
        title: { ar: 'توفير السلع الاستهلاكية بأسعار عادلة', en: 'Providing Essentials at Fair Prices' },
        description: { ar: 'مكافحة التضخم وتوفير احتياجات الأسرة اليومية من الغذاء والمستلزمات بجودة عالية.', en: 'Mitigating inflation and supplying household essentials with guaranteed quality.' }
      },
      {
        title: { ar: 'دعم المنتجات الزراعية والوطنية', en: 'Promoting Local Saudi Harvests' },
        description: { ar: 'تخصيص أركان للمزارعين والمنتجين المحليين لعرض خضرواتهم وتمورهم مباشرة للمستهلك.', en: 'Dedicated corners for local growers to sell fresh produce directly to shoppers.' }
      }
    ],
    services: [
      {
        title: { ar: 'التسوق المباشر والخدمات الذاتية', en: 'In-Store Supermarket Shopping' },
        description: { ar: 'أقسام مخصصة للأجبان، اللحوم الطازجة، المخبوزات، الخضار والفواكه، والأدوات المنزلية.', en: 'Comprehensive sections for dairy, fresh butcher, bakery, fresh produce, and housewares.' }
      },
      {
        title: { ar: 'برنامج الولاء والخصومات للمساهمين', en: 'Shareholder Loyalty Discounts' },
        description: { ar: 'مزايا حصرية ونقاط مكافآت لحاملي أسهم الجمعية وعملاء استهلاكية الشامل الدائمين.', en: 'Exclusive reward points and special pricing tiers for registered cooperative shareholders.' }
      }
    ],
    impact: [
      { ar: 'توفير خيارات تسوق اقتصادية استفاد منها أكثر من 400,000 زائر سنوياً.', en: 'Provided affordable shopping options benefiting over 400,000 patrons annually.' },
      { ar: 'توفير السلال الغذائية المدعومة للأسر المستفيدة من الجمعيات الخيرية بجدة.', en: 'Partnered in supplying subsidized food packages for charitable beneficiaries.' }
    ],
    relatedSlugs: ['reeda-ecommerce', 'reeda-cold-storage', 'reeda-gas']
  }
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projectsData.find(p => p.slug === slug);
};
