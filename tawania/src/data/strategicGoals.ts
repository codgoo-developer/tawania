import { StrategicGoal } from '../types';

export const strategicGoalsData: StrategicGoal[] = [
  {
    id: 1,
    number: 1,
    title: {
      ar: 'تعزيز الاستدامة المالية وتنمية الموارد',
      en: 'Strengthening Financial Sustainability and Resource Development'
    },
    description: {
      ar: 'رفع كفاءة تنمية الموارد والتحول نحو تنوع المصادر الاستثمارية والتمويلية.',
      en: 'Raising the efficiency of resource development and diversifying investment and financing sources.'
    },
    iconName: 'TrendingUp',
    pillars: [
      { ar: 'توسيع المحفظة الاستثمارية في المشاريع ذات العائد المرتفع', en: 'Expanding the investment portfolio into high-yield enterprises' },
      { ar: 'إدارة السيولة النقدية وفق أعلى معايير الحصافة المالية', en: 'Prudent treasury management and liquidity optimization' },
      { ar: 'استقطاب أعضاء جدد وزيادة قاعدة رأس المال المكتتب', en: 'Attracting new members and expanding paid-in equity' }
    ],
    kpis: [
      { ar: 'نمو الإيرادات التشغيلية السنوية بنسبة 15% فما فوق', en: 'Annual operating revenue growth rate of 15%+' },
      { ar: 'زيادة العائد على حقوق الأعضاء (ROE)', en: 'Enhancing Return on Equity (ROE)' }
    ],
    timeHorizon: {
      ar: 'هدف استراتيجي مستمر',
      en: 'Ongoing Strategic Horizon'
    }
  },
  {
    id: 2,
    number: 2,
    title: {
      ar: 'إدارة المخاطر الاستثمارية وحماية الأصول',
      en: 'Investment Risk Management and Asset Protection'
    },
    description: {
      ar: 'بناء نظام لإدارة المخاطر وتوقعها للمحافظة على رأس المال ورأس المال العامل.',
      en: 'Building a system to manage and anticipate risks in order to preserve capital and working capital.'
    },
    iconName: 'AlertTriangle',
    pillars: [
      { ar: 'إعداد سجل مخاطر مؤسسي ومراجعته وتحديثه دورياً مع مجلس الإدارة', en: 'Maintaining a live corporate risk register reviewed periodically by the board' },
      { ar: 'تطبيق سياسات تأمينية شاملة على كافة المرافق والمنشآت', en: 'Comprehensive insurance coverage over all facilities and assets' },
      { ar: 'بناء مخصصات واحتياطيات مالية كافية لمواجهة التقلبات الاقتصادية', en: 'Building healthy financial reserves against market fluctuations' }
    ],
    kpis: [
      { ar: 'صفر خسائر ناتجة عن مخاطر غير متوقعة أو غير مؤمنة', en: 'Zero losses from unmitigated or uninsured enterprise risks' },
      { ar: 'تغطية تأمينية شاملة لكافة الأصول الثابتة والمنقولة', en: 'Comprehensive insurance coverage across all fixed and movable assets' }
    ],
    timeHorizon: {
      ar: 'هدف استراتيجي مستمر',
      en: 'Ongoing Strategic Horizon'
    }
  },
  {
    id: 3,
    number: 3,
    title: {
      ar: 'العمليات والإنتاجية: تطوير المشاريع القائمة وزيادة كفاءتها',
      en: 'Operations & Productivity: Developing Existing Enterprises'
    },
    description: {
      ar: 'رفع العائد التنموي والمالي من المشاريع القائمة وتحديث نماذج تشغيلها.',
      en: 'Raising the developmental and financial return from existing enterprises and modernizing their operating models.'
    },
    iconName: 'Building2',
    pillars: [
      { ar: 'إعادة هندسة العمليات التشغيلية وخفض الهدر التشغيلي', en: 'Operational re-engineering and waste minimization' },
      { ar: 'تحديث المعدات والآلات واستخدام التقنيات الحديثة الموفرة للطاقة', en: 'Modernizing machinery and deploying energy-efficient systems' },
      { ar: 'توسيع النطاق الجغرافي لخدمات التوصيل والتوزيع', en: 'Expanding the geographic reach of distribution services' }
    ],
    kpis: [
      { ar: 'رفع الطاقة الاستيعابية والتشغيلية بنسبة 25%', en: 'Boosting operating capacity by 25%' },
      { ar: 'خفض التكاليف التشغيلية غير المباشرة بنسبة 10%', en: 'Reducing indirect operational costs by 10%' }
    ],
    timeHorizon: {
      ar: 'هدف استراتيجي مستمر',
      en: 'Ongoing Strategic Horizon'
    }
  },
  {
    id: 4,
    number: 4,
    title: {
      ar: 'الأتمتة والتميز المؤسسي (الحوكمة)',
      en: 'Automation and Institutional Excellence (Governance)'
    },
    description: {
      ar: 'تطبيق معايير الحوكمة الشاملة وأتمتة العمليات لضمان الشفافية وسرعة الإنجاز.',
      en: 'Applying comprehensive governance standards and automating operations to ensure transparency and speed of execution.'
    },
    iconName: 'ShieldCheck',
    pillars: [
      { ar: 'تحديث اللوائح والسياسات الداخلية ومصفوفة الصلاحيات بشكل دوري', en: 'Regularly updating bylaws, delegation matrices, and internal compliance codes' },
      { ar: 'أتمتة منظومة العمل المحاسبي والمخزني وإدارة شؤون الأعضاء', en: 'Full automation of accounting, inventory, and member management systems' },
      { ar: 'تفعيل أعمال لجان الرقابة الداخلية والمراجعة المحاسبية المستقلة', en: 'Empowering internal audit and independent external review committees' }
    ],
    kpis: [
      { ar: 'الحصول على درجة امتثال تفوق 95% في معيار الحوكمة الوطني', en: 'Achieving 95%+ score in National Governance Index' },
      { ar: 'إتمام التحول الرقمي لكافة العمليات الأساسية', en: 'Completing digital transformation for all core operations' }
    ],
    timeHorizon: {
      ar: 'هدف استراتيجي مستمر',
      en: 'Ongoing Strategic Horizon'
    }
  },
  {
    id: 5,
    number: 5,
    title: {
      ar: 'التطوير والتخطيط الاستراتيجي المستمر',
      en: 'Continuous Development and Strategic Planning'
    },
    description: {
      ar: 'التحديث الدوري للخطط الاستراتيجية وربطها بمؤشرات قياس أداء (KPIs) واضحة.',
      en: 'Periodically updating strategic plans and linking them to clear key performance indicators (KPIs).'
    },
    iconName: 'Compass',
    pillars: [
      { ar: 'عقد خلوات استراتيجية دورية لمجلس الإدارة والإدارة التنفيذية', en: 'Periodic strategic retreats for board members and executive management' },
      { ar: 'مقارنة الأداء بالمؤشرات التعاونية الوطنية والإقليمية الرائدة', en: 'Benchmarking performance against leading regional cooperative standards' },
      { ar: 'ربط الموازنات السنوية بالأولويات الاستراتيجية ومؤشرات الأداء (KPIs)', en: 'Aligning annual budgeting with strategic KPI deliverables' }
    ],
    kpis: [
      { ar: 'إنجاز 90% فما فوق من المبادرات الاستراتيجية المجدولة', en: '90%+ execution rate on scheduled strategic initiatives' },
      { ar: 'إصدار تقرير الأداء الاستراتيجي السنوي المعتمد', en: 'Annual verified strategic progress review report' }
    ],
    timeHorizon: {
      ar: 'هدف استراتيجي مستمر',
      en: 'Ongoing Strategic Horizon'
    }
  },
  {
    id: 6,
    number: 6,
    title: {
      ar: 'التسويق والهوية',
      en: 'Marketing and Corporate Identity'
    },
    description: {
      ar: 'ترسيخ الصورة الذهنية وترويج الخدمات، وبناء هوية مؤسسية قوية من خلال تفعيل التسويق، الإعلان، والتواصل الإعلامي الفعال.',
      en: 'Solidifying brand image and promoting services, building a strong corporate identity through effective marketing, advertising, and media communication.'
    },
    iconName: 'Megaphone',
    pillars: [
      { ar: 'تطوير الحضور الرقمي والإعلامي من خلال منصات عصرية وتفاعلية', en: 'Upgrading digital and media presence across modern interactive platforms' },
      { ar: 'إطلاق حملات تسويقية رقمية وميدانية موجهة للمستهلكين والشركات', en: 'Launching targeted consumer and business marketing campaigns' },
      { ar: 'إبراز المنجزات وقصص النجاح والأثر المجتمعي للمشاريع التعاونية', en: 'Showcasing key milestones, success stories, and community impact' }
    ],
    kpis: [
      { ar: 'زيادة الوعي بالعلامة التجارية للتعاونية بنسبة 40%', en: '40% increase in brand recognition' },
      { ar: 'نمو قاعدة العملاء والمشترين سنوياً', en: 'Annual growth of the customer base' }
    ],
    timeHorizon: {
      ar: 'هدف استراتيجي مستمر',
      en: 'Ongoing Strategic Horizon'
    }
  },
  {
    id: 7,
    number: 7,
    title: {
      ar: 'الرأس مال البشري: تمكين وتنمية رأس المال البشري',
      en: 'Human Capital: Empowerment and Development'
    },
    description: {
      ar: 'استقطاب الكفاءات وتطوير بيئة العمل لرفع معدلات الاستبقاء والإنتاجية.',
      en: 'Attracting talent and developing the work environment to raise retention and productivity rates.'
    },
    iconName: 'Users',
    pillars: [
      { ar: 'تنفيذ برامج تدريبية وتأهيلية دورية لجميع موظفي المشاريع', en: 'Conducting periodic professional development across all project teams' },
      { ar: 'تطبيق سلم رواتب وحوافز تنافسي مرتبط بالأداء المتميز', en: 'Implementing performance-linked compensation and reward systems' },
      { ar: 'رفع نسبة التوطين في الوظائف القيادية والإشرافية', en: 'Raising Saudization rates in managerial and supervisory roles' }
    ],
    kpis: [
      { ar: 'معدل رضا وظيفي مرتفع لدى الموظفين', en: 'High employee satisfaction index' },
      { ar: 'إنجاز ساعات تدريبية لكل موظف سنوياً', en: 'Annual training hours completed per employee' }
    ],
    timeHorizon: {
      ar: 'هدف استراتيجي مستمر',
      en: 'Ongoing Strategic Horizon'
    }
  }
];
