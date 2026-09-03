import { GalleryItem } from '../types';

export const galleryData: GalleryItem[] = [
  {
    id: 'g-1',
    title: {
      ar: 'اجتماع الجمعية العمومية السنوي بحضور المساهمين وممثلي المركز الوطني',
      en: 'Annual General Assembly meeting with shareholders and NCNP delegates'
    },
    category: 'events',
    categoryName: { ar: 'الفعاليات والجمعيات', en: 'Events & Assemblies' },
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
    date: '2024-06-25',
    location: { ar: 'قاعة الاجتماعات الرئيسية - جدة', en: 'Main Auditorium - Jeddah' },
    caption: {
      ar: 'جانب من تصويت المساهمين على البنود المالية والقوائم الختامية للجمعية.',
      en: 'Shareholders voting on closing accounts and financial agenda items.'
    }
  },
  {
    id: 'g-2',
    title: {
      ar: 'مرافق ثلاجة الشامل وغرف التبريد والتحكم بدرجات الحرارة',
      en: 'AlShamel Cold Storage chambers and climate-control infrastructure'
    },
    category: 'projects',
    categoryName: { ar: 'مشاريع الجمعية', en: 'Society Projects' },
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    date: '2024-04-18',
    location: { ar: 'مجمع ثلاجة الشامل - جدة', en: 'AlShamel Cold Storage Complex - Jeddah' },
    caption: {
      ar: 'غرف التخزين المبرد والمجمد المجهزة بأحدث أجهزة التبريد المركزية.',
      en: 'Chilled and frozen storage facilities with automated climate regulation.'
    }
  },
  {
    id: 'g-3',
    title: {
      ar: 'توقيع اتفاقية التعاون المشترك مع الغرفة التجارية الصناعية بمكة المكرمة',
      en: 'Signing joint partnership MOU with Makkah Chamber of Commerce'
    },
    category: 'partnerships',
    categoryName: { ar: 'الشراكات والاتفاقيات', en: 'Partnerships & MOUs' },
    imageUrl: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=1000&q=80',
    date: '2023-11-12',
    location: { ar: 'مقر الغرفة التجارية بمكة المكرمة', en: 'Makkah Chamber Headquarters' },
    caption: {
      ar: 'مراسم التوقيع لتعزيز التعاون التنموي والاستثماري في قطاعات التجزئة وسلاسل الإمداد.',
      en: 'Official signing ceremony promoting cooperative commercial synergy.'
    }
  },
  {
    id: 'g-4',
    title: {
      ar: 'استهلاكية الشامل - المجمع التجاري والهايبرماركت التعاوني بجدة',
      en: 'AlShamel Consumer Store - Cooperative Hypermarket in Jeddah'
    },
    category: 'projects',
    categoryName: { ar: 'مشاريع الجمعية', en: 'Society Projects' },
    imageUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1000&q=80',
    date: '2024-05-10',
    location: { ar: 'طريق جدة العام - مكة المكرمة', en: 'Jeddah Main Road - Makkah' },
    caption: {
      ar: 'أقسام المواد الغذائية والمنتجات الطازجة داخل استهلاكية الشامل.',
      en: 'Fresh food, bakery, and consumer aisles inside AlShamel Consumer hypermarket.'
    }
  },
  {
    id: 'g-5',
    title: {
      ar: 'أسطول سيارات غاز الشامل الميدانية لتوصيل الأسطوانات للمنازل',
      en: 'AlShamel Gas delivery vehicle fleet serving residential areas'
    },
    category: 'projects',
    categoryName: { ar: 'مشاريع الجمعية', en: 'Society Projects' },
    imageUrl: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=1000&q=80',
    date: '2023-08-20',
    location: { ar: 'مركز توزيع الغاز - جدة', en: 'Gas Distribution Hub - Jeddah' },
    caption: {
      ar: 'جاهزية أسطول التوصيل بأعلى معايير السلامة والأمان المعتمدة.',
      en: 'Delivery fleet operational readiness adhering to strict civil defense standards.'
    }
  },
  {
    id: 'g-6',
    title: {
      ar: 'أعمال الإنشاء والتشطيب الميداني لمشروع إعمار الشامل للمقاولات',
      en: 'Construction and fit-out operations by AlShamel Emaar Contracting'
    },
    category: 'projects',
    categoryName: { ar: 'مشاريع الجمعية', en: 'Society Projects' },
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1000&q=80',
    date: '2024-02-15',
    location: { ar: 'مواقع المشاريع الإنشائية - محافظة جدة', en: 'Construction Sites - Jeddah' },
    caption: {
      ar: 'تنفيذ مباني ومرافق تجارية وفق كود البناء السعودي الحديث.',
      en: 'Executing commercial and structural buildings per Saudi Building Code.'
    }
  },
  {
    id: 'g-7',
    title: {
      ar: 'ورشة عمل تدريبية للقيادات التعاونية والموظفين حول معايير الحوكمة',
      en: 'Governance & Institutional Compliance Workshop for cooperative leaders'
    },
    category: 'activities',
    categoryName: { ar: 'الأنشطة والتدريب', en: 'Activities & Training' },
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80',
    date: '2023-12-04',
    location: { ar: 'قاعة التدريب والتطوير - الجمعية', en: 'Training & Development Hall - AlShamel' },
    caption: {
      ar: 'جانب من حضور القيادات التنفيذية لبرنامج أتمتة اللوائح ومصفوفة الصلاحيات.',
      en: 'Executive team during the digital governance and compliance workshop.'
    }
  },
  {
    id: 'g-8',
    title: {
      ar: 'خطوط الفرز والتعبئة الآلية للتمور بمشروع الشامل للتعبئة والتغليف',
      en: 'Automated date sorting and packaging lines at AlShamel Packaging'
    },
    category: 'projects',
    categoryName: { ar: 'مشاريع الجمعية', en: 'Society Projects' },
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1000&q=80',
    date: '2024-01-22',
    location: { ar: 'المصنع الآلي للتعبئة - جدة', en: 'Automated Packaging Facility - Jeddah' },
    caption: {
      ar: 'عمليات الفرز والتغليف الحراري لمنتجات التمور السعودية الفاخرة.',
      en: 'Sorting, vacuum packaging, and sealing of premium Saudi dates.'
    }
  }
];
