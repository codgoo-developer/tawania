export interface BoardIntroData {
  cycleBadgeAr: string;
  cycleBadgeEn?: string;
  titleAr: string;
  titleEn?: string;
  descAr: string;
  descEn?: string;
  startDate: string;
  endDate: string;
  durationYears: number;
  membersCount: number;
}

export const initialBoardIntroData: BoardIntroData = {
  cycleBadgeAr: 'الدورة الانتخابية الثانية',
  cycleBadgeEn: 'Second Electoral Term',
  titleAr: 'أعضاء مجلس الإدارة',
  titleEn: 'Board of Directors',
  descAr: 'تدار الجمعية من قبل مجلس إدارة عدد أعضائه لا يقل عن خمسة أعضاء تنتخبهم الجمعية العمومية. ومدة عضوية مجلس الإدارة الحالي (الثاني) المنتخب أربع سنوات. ويبلغ عدد أعضائه في دورته الحالية خمسة أعضاء لإدارة الجمعية في خلال الفترة من 1443/6/22 هـ حتى 1447/6/22 هـ.',
  descEn: 'The cooperative is managed by a Board of Directors of no fewer than five members elected by the General Assembly. The current term is four years from 1443/6/22 AH to 1447/6/22 AH.',
  startDate: '1443/6/22 هـ',
  endDate: '1447/6/22 هـ',
  durationYears: 4,
  membersCount: 5
};

export interface ProjectsHeaderData {
  badgeAr?: string;
  badgeEn?: string;
  titleAr?: string;
  titleEn?: string;
  descAr?: string;
  descEn?: string;
}

import { apiService } from '../services/apiService';
import { generalAssemblyMembersList, GeneralAssemblyMember } from '../data/generalAssemblyMembers';
import React, { createContext, useContext, useState, useEffect } from 'react';


export interface GalleryItemModel {
  id: string;
  titleAr: string;
  titleEn?: string;
  category: 'projects' | 'events' | 'partnerships' | 'activities' | string;
  categoryNameAr?: string;
  categoryNameEn?: string;
  imageUrl: string;
  date: string;
  locationAr?: string;
  locationEn?: string;
  captionAr?: string;
  captionEn?: string;
}

export interface BoardMemberItem {
  id: string;
  nameAr: string;
  nameEn?: string;
  roleAr: string;
  roleEn?: string;
  badgeAr?: string;
  badgeEn?: string;
  email?: string;
  phone?: string;
  bioAr?: string;
  bioEn?: string;
  initialsAr?: string;
  image?: string;
  order: number;
  isChairman?: boolean;
}

export interface ExecutiveDirectorItem {
  id: string;
  nameAr: string;
  nameEn?: string;
  roleAr: string;
  roleEn?: string;
  badgeAr?: string;
  badgeEn?: string;
  phone: string;
  email: string;
  descriptionAr: string;
  descriptionEn?: string;
  bioAr?: string;
  bioEn?: string;
  initialsAr?: string;
  image?: string;
}

export interface SiteContactSettings {
  hqTitleAr: string;
  hqTitleEn?: string;
  addressAr: string;
  addressEn?: string;
  regionAr: string;
  regionEn?: string;
  phone: string;
  whatsappPhone: string;
  email: string;
  workingHoursAr: string;
  workingHoursEn?: string;
  instagramHandle: string;
  instagramUrl: string;
  twitterHandle: string;
  twitterUrl: string;
  mapsUrl: string;
  logoLightUrl: string;
  logoDarkUrl: string;
  footerCalloutTitleAr?: string;
  footerCalloutTitleEn?: string;
  footerCalloutSubAr?: string;
  footerCalloutSubEn?: string;
  footerAboutTextAr?: string;
  footerAboutTextEn?: string;
}

export interface HeroSlideItem {
  id: string;
  bgImage: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  highlightAr: string;
  highlightEn: string;
  ctaTextAr: string;
  ctaTextEn: string;
  ctaLink: string;
  badgeAr: string;
  badgeEn: string;
}

export interface HomeAboutData {
  badgeAr: string;
  badgeEn: string;
  titleModelAr: string;
  titleModelEn: string;
  titleHighlightAr: string;
  titleHighlightEn: string;
  descriptionAr: string;
  descriptionEn: string;
  visionTitleAr: string;
  visionTitleEn: string;
  visionDescAr: string;
  visionDescEn: string;
  missionTitleAr: string;
  missionTitleEn: string;
  missionDescAr: string;
  missionDescEn: string;
  sloganAr: string;
  sloganEn: string;
  imageUrl: string;
}

export interface HomeStatItem {
  id: string;
  valueAr: string;
  valueEn: string;
  labelAr: string;
  labelEn: string;
}

export interface StrategicGoalItem {
  id: number;
  number: number;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  iconName?: string;
}

export interface TestimonialItemModel {
  id: string;
  nameAr: string;
  nameEn: string;
  roleAr: string;
  roleEn: string;
  organizationAr: string;
  organizationEn: string;
  quoteAr: string;
  quoteEn: string;
  rating: number;
  projectRelatedAr: string;
  projectRelatedEn: string;
  avatar: string;
  date: string;
}

export const initialHomeHeroSlides: HeroSlideItem[] = [
  {
    id: 'welcome-slide',
    bgImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2000&q=80',
    titleAr: 'تأبى الرياحُ إذا اجتمعن تكسّرا..',
    titleEn: 'United, The Winds Cannot Break Us..',
    highlightAr: 'وإذا افترقنَ تكسّرت آحادا...',
    highlightEn: 'Apart, They Break One By One...',
    subtitleAr: 'رسالتنا: تحقيق التنمية المستدامة والتمكين الاقتصادي والاجتماعي والثقافي من خلال تعزيز العمل التعاوني، بما يسهم في تحقيق أهداف رؤية المملكة 2030.',
    subtitleEn: 'Our Mission: Achieving sustainable development and economic, social, and cultural empowerment through advancing cooperative work, contributing to Saudi Vision 2030.',
    ctaTextAr: 'اكتشف مشاريعنا',
    ctaTextEn: 'Discover Our Projects',
    ctaLink: '/projects',
    badgeAr: 'تعاونية الشامل متعددة الأغراض',
    badgeEn: 'AlShamel Multipurpose Cooperative',
  },
  {
    id: 'sustainability',
    bgImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=2000&q=80',
    titleAr: 'نَصْنَعُ أَثَراً يَنْمُو',
    titleEn: 'Creating Impact that Grows',
    highlightAr: 'مَعَ الْمُجْتَمَعِ',
    highlightEn: 'With the Community',
    subtitleAr: 'نعمل على بناء مستقبل مستدام من خلال مشاريع تنموية واستثمارية تعزز الاقتصاد المحلي وتخدم أعضاءنا ومجتمعنا بجدة.',
    subtitleEn: 'Building a sustainable future through developmental and investment enterprises serving our members and community in Jeddah.',
    ctaTextAr: 'استكشف كافة المشاريع',
    ctaTextEn: 'Explore All Projects',
    ctaLink: '/projects',
    badgeAr: 'الاستدامة الزراعية والبيئية والمجتمعية',
    badgeEn: 'Agricultural & Environmental Sustainability',
  },
  {
    id: 'investments',
    bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80',
    titleAr: 'مَشَارِيعُ نَوْعِيَّةٌ وَفُرَصٌ',
    titleEn: 'Pioneering Enterprises & High-Value',
    highlightAr: 'اسْتِثْمَارِيَّةٌ وَاعِدَةٌ',
    highlightEn: 'Investment Opportunities',
    subtitleAr: 'مشاريعنا تمتد عبر قطاعات التسويق، الأسواق الاستهلاكية، التوزيع، التعبئة والتغليف، والأعلاف.',
    subtitleEn: 'Our enterprises span marketing, consumer markets, distribution, packaging, and animal feed.',
    ctaTextAr: 'استكشف مشاريعنا',
    ctaTextEn: 'Explore Projects',
    ctaLink: '/projects',
    badgeAr: 'مشاريع نوعية متخصصة',
    badgeEn: 'High-Impact Specialized Enterprises',
  },
  {
    id: 'governance',
    bgImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80',
    titleAr: 'حَوْكَمَةٌ شَامِلَةٌ وَشَفَافِيَّةٌ',
    titleEn: 'Comprehensive Governance & Robust',
    highlightAr: 'مَالِيَّةٌ وَإِدَارِيَّةٌ',
    highlightEn: 'Financial Transparency',
    subtitleAr: 'تقارير مالية مدققة سنوياً ومحاضر اجتماعات جمعية عمومية معتمدة وسياسات امتثال تتوافق مع أعلى المعايير الرقابية.',
    subtitleEn: 'Audited financial statements, ratified general assembly minutes, and compliance charters aligned with highest national standards.',
    ctaTextAr: 'القوائم المالية والشفافية',
    ctaTextEn: 'Financial Statements & Governance',
    ctaLink: '/financial-statements',
    badgeAr: 'شفافية مالية ورقابة معتمدة',
    badgeEn: 'Audited Transparency & Compliance',
  }
];

export const initialHomeAboutData: HomeAboutData = {
  badgeAr: 'من نحن',
  badgeEn: 'About Us',
  titleModelAr: 'نموذج رائد في',
  titleModelEn: 'A Pioneering Model in',
  titleHighlightAr: 'العمل التعاوني',
  titleHighlightEn: 'Cooperative Enterprise',
  descriptionAr: 'نحن كيان اقتصادي واجتماعي يهدف إلى تحقيق التنمية المستدامة من خلال مشاريع نوعية تلبي احتياجات المجتمع وتخلق فرصاً استثمارية واعدة لأعضائنا.',
  descriptionEn: 'We are a socio-economic entity striving to achieve sustainable development through high-impact enterprises fulfilling community needs and creating promising investment opportunities for our members.',
  visionTitleAr: 'رؤيتنا',
  visionTitleEn: 'Our Vision',
  visionDescAr: 'تقديم حلول تعاونية رائدة تعزز التنمية المستدامة، وتلبي احتياجات أعضائنا والمجتمع.',
  visionDescEn: 'To deliver leading cooperative solutions that advance sustainable development and meet the needs of our members and community.',
  missionTitleAr: 'رسالتنا',
  missionTitleEn: 'Our Mission',
  missionDescAr: 'تحقيق التنمية المستدامة والتمكين الاقتصادي والاجتماعي والثقافي من خلال تعزيز العمل التعاوني، بما يسهم في تحقيق أهداف رؤية المملكة 2030.',
  missionDescEn: 'Achieving sustainable development and economic, social, and cultural empowerment through advancing cooperative work, contributing to Saudi Vision 2030 goals.',
  sloganAr: 'جذور راسخة، رؤية طموحة.',
  sloganEn: 'Deep Roots, Ambitious Vision.',
  imageUrl: '/about.jpg'
};

export const initialHomeStatsData: HomeStatItem[] = [
  {
    id: 'stat-1',
    valueAr: '12',
    valueEn: '12',
    labelAr: 'أعضاء الجمعية العمومية',
    labelEn: 'General Assembly Members'
  },
  {
    id: 'stat-2',
    valueAr: '17,120 سهم',
    valueEn: '17,120 Shares',
    labelAr: 'عدد الأسهم',
    labelEn: 'Total Subscribed Shares'
  },
  {
    id: 'stat-3',
    valueAr: '1,720,000 ريال',
    valueEn: '1,720,000 SAR',
    labelAr: 'رأس المال',
    labelEn: 'Capital'
  },
  {
    id: 'stat-4',
    valueAr: '5',
    valueEn: '5',
    labelAr: 'أعضاء مجلس الإدارة',
    labelEn: 'Board of Directors'
  }
];

export const initialStrategicGoalItems: StrategicGoalItem[] = [
  { id: 1, number: 1, titleAr: 'تعزيز الاستدامة المالية وتنمية الموارد', titleEn: 'Strengthening Financial Sustainability', descriptionAr: 'رفع كفاءة تنمية الموارد والتحول نحو تنوع المصادر الاستثمارية والتمويلية.', descriptionEn: 'Raising resource development efficiency and diversifying investment sources.' },
  { id: 2, number: 2, titleAr: 'إدارة المخاطر الاستثمارية وحماية الأصول', titleEn: 'Risk Management & Asset Protection', descriptionAr: 'بناء نظام لإدارة المخاطر وتوقعها للمحافظة على رأس المال ورأس المال العامل.', descriptionEn: 'Building a risk management system to preserve capital.' },
  { id: 3, number: 3, titleAr: 'العمليات والإنتاجية: تطوير المشاريع القائمة وزيادة كفاءتها', titleEn: 'Operations & Productivity', descriptionAr: 'رفع العائد التنموي والمالي من المشاريع القائمة وتحديث نماذج تشغيلها.', descriptionEn: 'Increasing returns from existing enterprises.' },
  { id: 4, number: 4, titleAr: 'الأتمتة والتميز المؤسسي (الحوكمة)', titleEn: 'Automation & Institutional Governance', descriptionAr: 'تطبيق معايير الحوكمة الشاملة وأتمتة العمليات لضمان الشفافية وسرعة الإنجاز.', descriptionEn: 'Applying governance standards and digital automation.' },
  { id: 5, number: 5, titleAr: 'التطوير والتخطيط الاستراتيجي المستمر', titleEn: 'Continuous Strategic Planning', descriptionAr: 'التحديث الدوري للخطط الاستراتيجية وربطها بمؤشرات قياس أداء (KPIs) واضحة.', descriptionEn: 'Updating strategic plans linked to clear KPIs.' },
  { id: 6, number: 6, titleAr: 'التسويق والهوية', titleEn: 'Marketing & Brand Identity', descriptionAr: 'ترسيخ الصورة الذهنية وترويج الخدمات، وبناء هوية مؤسسية قوية من خلال تفعيل التسويق والاعلام.', descriptionEn: 'Building a strong brand identity and active media outreach.' },
  { id: 7, number: 7, titleAr: 'الرأس مال البشري: تمكين وتنمية رأس المال البشري', titleEn: 'Human Capital Empowerment', descriptionAr: 'استقطاب الكفاءات وتطوير بيئة العمل لرفع معدلات الاستبقاء والإنتاجية.', descriptionEn: 'Attracting top talent and enhancing workplace environment.' }
];

export const initialTestimonialItems: TestimonialItemModel[] = [
  {
    id: 't-1',
    nameAr: 'أ. فهد بن سعيد الحربي',
    nameEn: 'Mr. Fahad bin Saeed Al-Harbi',
    roleAr: 'مواطن - عميل دائم',
    roleEn: 'Regular Customer',
    organizationAr: 'محافظة جدة',
    organizationEn: 'Jeddah Resident',
    quoteAr: 'استهلاكية الشامل توفر لنا كافة مستلزمات الأسرة الغذائية والاستهلاكية بأسعار منافسة جداً وعروض حقيقية أسبوعية.',
    quoteEn: 'AlShamel Consumer Hypermarket fulfills all our family groceries at very competitive prices.',
    rating: 5,
    projectRelatedAr: 'استهلاكية الشامل',
    projectRelatedEn: 'AlShamel Consumer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    date: '2024-10-12'
  },
  {
    id: 't-2',
    nameAr: 'م. تركي المعبدي',
    nameEn: 'Eng. Turki Al-Mabadi',
    roleAr: 'مالك مطاعم ومطابخ',
    roleEn: 'Restaurant Owner',
    organizationAr: 'مطاعم الضيافة - جدة',
    organizationEn: 'Al-Diyafa Restaurants',
    quoteAr: 'خدمة غاز الشامل مثال يحتذى به في الالتزام وسرعة التوصيل والأمان العالي.',
    quoteEn: 'AlShamel Gas service is an exemplary benchmark in reliability, speed, and safety.',
    rating: 5,
    projectRelatedAr: 'غاز الشامل',
    projectRelatedEn: 'AlShamel Gas',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    date: '2024-09-28'
  },
  {
    id: 't-3',
    nameAr: 'أ. سالم بن عطية البركاتي',
    nameEn: 'Mr. Salem bin Attiah Al-Barakati',
    roleAr: 'مزارع ومستثمر زراعي',
    roleEn: 'Agricultural Grower',
    organizationAr: 'مزارع وادي جدة',
    organizationEn: 'Wadi Jeddah Farms',
    quoteAr: 'ثلاجة الشامل والتعبئة والتغليف ساهمتا بشكل مباشر في حماية محاصيلنا من التلف وتجهيزها بأعلى معايير الجودة.',
    quoteEn: 'AlShamel Cold Storage and Packaging protected our produce from spoilage with highest quality.',
    rating: 5,
    projectRelatedAr: 'ثلاجة الشامل والتعبئة',
    projectRelatedEn: 'AlShamel Cold Storage',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    date: '2024-08-14'
  },
  {
    id: 't-4',
    nameAr: 'د. خالد بن منصور العتيبي',
    nameEn: 'Dr. Khaled bin Mansour Al-Otaibi',
    roleAr: 'مساهم وعضو الجمعية العمومية',
    roleEn: 'Shareholder',
    organizationAr: 'الجمعية العمومية',
    organizationEn: 'General Assembly',
    quoteAr: 'الحوكمة والشفافية المالية في الجمعية واضحة وملموسة في كل تقرير مالي ومحضر اجتماع.',
    quoteEn: 'Governance and financial transparency at AlShamel are evident in every audited report.',
    rating: 5,
    projectRelatedAr: 'الحوكمة وشؤون المساهمين',
    projectRelatedEn: 'Governance & Shareholders',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    date: '2024-07-05'
  }
];

export const initialSiteContactSettings: SiteContactSettings = {
  hqTitleAr: 'المقر الرئيسي للإدارة',
  hqTitleEn: 'Headquarters & Main Office',
  addressAr: 'جدة، المملكة العربية السعودية',
  addressEn: 'Jeddah, Kingdom of Saudi Arabia',
  regionAr: 'محافظة جدة - منطقة مكة المكرمة',
  regionEn: 'Jeddah Governorate, Makkah Region',
  phone: '0504284861',
  whatsappPhone: '0504284861',
  email: 'info@shamil.org.sa',
  workingHoursAr: 'الأحد - الخميس: 8:00 صباحاً - 4:00 مساءً',
  workingHoursEn: 'Sunday - Thursday: 8:00 AM - 4:00 PM',
  instagramHandle: '@shamel_coo',
  instagramUrl: 'https://instagram.com/shamel_coo',
  twitterHandle: '@shamel_coo',
  twitterUrl: 'https://x.com/shamel_coo',
  mapsUrl: 'https://maps.google.com/?q=Jeddah,Makkah,Saudi+Arabia',
  logoLightUrl: '/logo.png',
  logoDarkUrl: '/logo.png',
  footerCalloutTitleAr: 'نبني أثراً يستمر',
  footerCalloutTitleEn: 'Building Lasting Impact',
  footerCalloutSubAr: 'جمعية تعاونية مرخصة تهدف إلى تعزيز الاستدامة وتنمية المجتمع والاقتصاد المحلي بجدة.',
  footerCalloutSubEn: 'A regulated cooperative society dedicated to fostering sustainability, community empowerment, and local economic resilience in Jeddah.',
  footerAboutTextAr: 'تعاونية الشامل متعددة الأغراض - صرح تعاوني واستثماري رائد بجدة، يخضع لإشراف المركز الوطني لتنمية القطاع غير الربحي.',
  footerAboutTextEn: 'AlShamel Multipurpose Cooperative - A pioneering cooperative in Jeddah under National Center supervision.'
};

export const initialExecutiveDirector: ExecutiveDirectorItem = {
  id: 'exec-dir-1',
  nameAr: 'أ. محمد ذواب مفرح الحربي',
  nameEn: 'Mr. Mohammed Dhawab Mufreh Al-Harbi',
  roleAr: 'المدير التنفيذي',
  roleEn: 'Executive Director',
  badgeAr: 'المدير التنفيذي',
  badgeEn: 'Executive Director',
  phone: '+966531389196',
  email: 'mohamad89196@gmail.com',
  descriptionAr: 'يتولى إدارة وتسيير الأعمال التنفيذية اليومية لجمعية الشامل ومتابعة الأهداف التشغيلية والمبادرات التنموية.',
  descriptionEn: 'Manages daily executive operations of AlShamel Cooperative.',
  initialsAr: 'م . ح'
};

export const initialGalleryItems: GalleryItemModel[] = [
  {
    id: 'g-1',
    titleAr: 'اجتماع الجمعية العمومية السنوي بحضور المساهمين وممثلي المركز الوطني',
    titleEn: 'Annual General Assembly meeting with shareholders and NCNP delegates',
    category: 'events',
    categoryNameAr: 'الفعاليات والجمعيات',
    categoryNameEn: 'Events & Assemblies',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
    date: '2024-06-25',
    locationAr: 'قاعة الاجتماعات الرئيسية - جدة',
    locationEn: 'Main Auditorium - Jeddah',
    captionAr: 'جانب من تصويت المساهمين على البنود المالية والقوائم الختامية للجمعية.',
    captionEn: 'Shareholders voting on closing accounts and financial agenda items.'
  },
  {
    id: 'g-2',
    titleAr: 'مرافق ثلاجة الشامل وغرف التبريد والتحكم بدرجات الحرارة',
    titleEn: 'AlShamel Cold Storage chambers and climate-control infrastructure',
    category: 'projects',
    categoryNameAr: 'مشاريع الجمعية',
    categoryNameEn: 'Society Projects',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
    date: '2024-04-18',
    locationAr: 'مجمع ثلاجة الشامل - جدة',
    locationEn: 'AlShamel Cold Storage Complex - Jeddah',
    captionAr: 'غرف التخزين المبرد والمجمد المجهزة بأحدث أجهزة التبريد المركزية.',
    captionEn: 'Chilled and frozen storage facilities with automated climate regulation.'
  },
  {
    id: 'g-3',
    titleAr: 'توقيع اتفاقية التعاون المشترك مع الغرفة التجارية الصناعية بمكة المكرمة',
    titleEn: 'Signing joint partnership MOU with Makkah Chamber of Commerce',
    category: 'partnerships',
    categoryNameAr: 'الشراكات والاتفاقيات',
    categoryNameEn: 'Partnerships & MOUs',
    imageUrl: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=1000&q=80',
    date: '2023-11-12',
    locationAr: 'مقر الغرفة التجارية بمكة المكرمة',
    locationEn: 'Makkah Chamber Headquarters',
    captionAr: 'مراسم التوقيع لتعزيز التعاون التنموي والاستثماري في قطاعات التجزئة وسلاسل الإمداد.',
    captionEn: 'Official signing ceremony promoting cooperative commercial synergy.'
  },
  {
    id: 'g-4',
    titleAr: 'استهلاكية الشامل - المجمع التجاري والهايبرماركت التعاوني بجدة',
    titleEn: 'AlShamel Consumer Store - Cooperative Hypermarket in Jeddah',
    category: 'projects',
    categoryNameAr: 'مشاريع الجمعية',
    categoryNameEn: 'Society Projects',
    imageUrl: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=1000&q=80',
    date: '2024-05-10',
    locationAr: 'طريق جدة العام - مكة المكرمة',
    locationEn: 'Jeddah Main Road - Makkah',
    captionAr: 'أقسام المواد الغذائية والمنتجات الطازجة داخل استهلاكية الشامل.',
    captionEn: 'Fresh food, bakery, and consumer aisles inside AlShamel Consumer hypermarket.'
  },
  {
    id: 'g-5',
    titleAr: 'أسطول سيارات غاز الشامل الميدانية لتوصيل الأسطوانات للمنازل',
    titleEn: 'AlShamel Gas delivery vehicle fleet serving residential areas',
    category: 'projects',
    categoryNameAr: 'مشاريع الجمعية',
    categoryNameEn: 'Society Projects',
    imageUrl: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=1000&q=80',
    date: '2023-08-20',
    locationAr: 'مركز توزيع الغاز - جدة',
    locationEn: 'Gas Distribution Hub - Jeddah',
    captionAr: 'جاهزية أسطول التوصيل بأعلى معايير السلامة والأمان المعتمدة.',
    captionEn: 'Delivery fleet operational readiness adhering to strict civil defense standards.'
  },
  {
    id: 'g-6',
    titleAr: 'أعمال الإنشاء والتشطيب الميداني لمشروع إعمار الشامل للمقاولات',
    titleEn: 'Construction and fit-out operations by AlShamel Emaar Contracting',
    category: 'projects',
    categoryNameAr: 'مشاريع الجمعية',
    categoryNameEn: 'Society Projects',
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1000&q=80',
    date: '2024-02-15',
    locationAr: 'مواقع المشاريع الإنشائية - محافظة جدة',
    locationEn: 'Construction Sites - Jeddah',
    captionAr: 'تنفيذ مباني ومرافق تجارية وفق كود البناء السعودي الحديث.',
    captionEn: 'Executing commercial and structural buildings per Saudi Building Code.'
  },
  {
    id: 'g-7',
    titleAr: 'ورشة عمل تدريبية للقيادات التعاونية والموظفين حول معايير الحوكمة',
    titleEn: 'Governance & Institutional Compliance Workshop for cooperative leaders',
    category: 'activities',
    categoryNameAr: 'الأنشطة والتدريب',
    categoryNameEn: 'Activities & Training',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80',
    date: '2023-12-04',
    locationAr: 'قاعة التدريب والتطوير - الجمعية',
    locationEn: 'Training & Development Hall - AlShamel',
    captionAr: 'جانب من حضور القيادات التنفيذية لبرنامج أتمتة اللوائح ومصفوفة الصلاحيات.',
    captionEn: 'Executive team during the digital governance and compliance workshop.'
  },
  {
    id: 'g-8',
    titleAr: 'خطوط الفرز والتعبئة الآلية للتمور بمشروع الشامل للتعبئة والتغليف',
    titleEn: 'Automated date sorting and packaging lines at AlShamel Packaging',
    category: 'projects',
    categoryNameAr: 'مشاريع الجمعية',
    categoryNameEn: 'Society Projects',
    imageUrl: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1000&q=80',
    date: '2024-01-22',
    locationAr: 'المصنع الآلي للتعبئة - جدة',
    locationEn: 'Automated Packaging Facility - Jeddah',
    captionAr: 'عمليات الفرز والتغليف الحراري لمنتجات التمور السعودية الفاخرة.',
    captionEn: 'Sorting, vacuum packaging, and sealing of premium Saudi dates.'
  }
];

export const initialBoardMembers: BoardMemberItem[] = [
  {
    id: 'bm-1',
    nameAr: 'أ / علي إبراهيم السليمي',
    nameEn: 'Mr. Ali Ibrahim Al-Sulami',
    roleAr: 'رئيس مجلس الإدارة',
    roleEn: 'Chairman of the Board',
    badgeAr: 'رئيس المجلس',
    badgeEn: 'Chairman',
    email: 'info@shamil.org.sa',
    bioAr: 'يرأس مجلس إدارة تعاونية الشامل متعددة الأغراض ويقود مسيرة التعاونية نحو تحقيق أهدافها الاستراتيجية.',
    bioEn: 'Leads the Board of Directors of AlShamel Multipurpose Cooperative toward achieving its strategic goals.',
    initialsAr: 'ع . ا',
    order: 1,
    isChairman: true
  },
  {
    id: 'bm-2',
    nameAr: 'أ / خالد يوسف الحربي',
    nameEn: 'Mr. Khaled Youssef Al-Harbi',
    roleAr: 'نائب رئيس مجلس الإدارة',
    roleEn: 'Vice Chairman of the Board',
    badgeAr: 'نائب رئيس مجلس الإدارة',
    badgeEn: 'Vice Chairman',
    email: 'info@shamil.org.sa',
    bioAr: 'يشغل منصب نائب رئيس مجلس الإدارة، ويسهم في الإشراف على مسيرة التعاونية ومشاريعها.',
    bioEn: 'Serves as Vice Chairman of the Board, contributing to the oversight of the cooperative and its enterprises.',
    initialsAr: 'خ . ا',
    order: 2
  },
  {
    id: 'bm-3',
    nameAr: 'أ / محمد سعود الحربي',
    nameEn: 'Mr. Mohammed Saud Al-Harbi',
    roleAr: 'المشرف المالي',
    roleEn: 'Financial Supervisor',
    badgeAr: 'المشرف المالي',
    badgeEn: 'Financial Supervisor',
    email: 'info@shamil.org.sa',
    bioAr: 'يتولى الإشراف المالي على أعمال التعاونية ومتابعة الأداء المالي لمشاريعها.',
    bioEn: 'Oversees the financial operations of the cooperative and tracks financial performance of projects.',
    initialsAr: 'م . ا',
    order: 3
  },
  {
    id: 'bm-4',
    nameAr: 'أ / صلاح إبراهيم السليمي',
    nameEn: 'Mr. Salah Ibrahim Al-Sulami',
    roleAr: 'عضو مجلس الإدارة',
    roleEn: 'Board Member',
    badgeAr: 'عضو مجلس الإدارة',
    badgeEn: 'Board Member',
    email: 'info@shamil.org.sa',
    bioAr: 'عضو مجلس إدارة تعاونية الشامل متعددة الأغراض بعقلة الصقور.',
    bioEn: 'Board Member of AlShamel Multipurpose Cooperative in Uglat Asugour.',
    initialsAr: 'ص . ا',
    order: 4
  },
  {
    id: 'bm-5',
    nameAr: 'أ / عبدالله سعود محمد',
    nameEn: 'Mr. Abdullah Saud Mohammed',
    roleAr: 'عضو مجلس الإدارة',
    roleEn: 'Board Member',
    badgeAr: 'عضو مجلس الإدارة',
    badgeEn: 'Board Member',
    email: 'info@shamil.org.sa',
    bioAr: 'عضو مجلس إدارة تعاونية الشامل متعددة الأغراض.',
    bioEn: 'Board Member of AlShamel Multipurpose Cooperative.',
    initialsAr: 'ع . م',
    order: 5
  }
];

export interface ProjectItem {
  id: string;
  name: string; // Required
  image?: string; // Optional image URL or base64
  description?: string;
  subDescription?: string;
  features?: string[];
  societyNameAr?: string;
  societyNameEn?: string;
}

export interface PolicyItem {
  id: string;
  category: 'general' | 'aml';
  titleAr: string;
  titleEn: string;
  code: string;
  version: string;
  approvedDate: string;
  approvedByAr: string;
  approvedByEn: string;
  descAr: string;
  descEn: string;
  fileSize?: string;
  fileUrl?: string;
  fileName?: string;
  articlesAr?: { title: string; content: string[] }[];
  articlesEn?: { title: string; content: string[] }[];
}

export interface RegulationItem {
  id: string;
  sec: 'foundation' | 'financial' | 'laws';
  titleAr: string;
  titleEn: string;
  type: string;
  num: string;
  descAr: string;
  descEn?: string;
  fileSize: string;
  fileUrl?: string;
  fileName?: string;
  articlesAr?: { title: string; content: string[] }[];
}

export const getDocumentPdfUrl = (
  title: string,
  codeOrNum: string,
  fileUrl?: string
): string => {
  if (fileUrl && (fileUrl.startsWith('data:application/pdf') || fileUrl.startsWith('blob:') || fileUrl.startsWith('http') || fileUrl.startsWith('/'))) {
    return encodeURI(fileUrl);
  }

  const safeTitle = (title || 'Official Governance Document').replace(/[^\w\s-]/gi, ' ');
  const safeCode = (codeOrNum || 'SHM-GOV').replace(/[^\w\s-]/gi, ' ');

  const streamContent = `BT /F1 16 Tf 50 780 Td (AlShamel Multipurpose Cooperative - Kingdom of Saudi Arabia) Tj /F1 12 Tf 0 -35 Td (Official Governance Document: ${safeTitle}) Tj 0 -25 Td (Reference Code: ${safeCode}) Tj 0 -25 Td (Status: Approved and Ratified by Board of Directors) Tj 0 -25 Td (Official License: No. 234 - Ministry of Human Resources) Tj ET`;
  const streamLength = streamContent.length;

  const pdfParts = [
    '%PDF-1.4\n',
    '1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n',
    '2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n',
    '3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n',
    '4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n',
    `5 0 obj\n<< /Length ${streamLength} >>\nstream\n${streamContent}\nendstream\nendobj\n`
  ];

  let offset = 0;
  const offsets = [0];
  for (let i = 0; i < pdfParts.length; i++) {
    offsets.push(offset);
    offset += pdfParts[i].length;
  }

  const xrefOffset = offset;
  const pad = (n: number) => n.toString().padStart(10, '0');

  let xref = `xref\n0 6\n0000000000 65535 f \n`;
  for (let i = 1; i <= 5; i++) {
    xref += `${pad(offsets[i])} 00000 n \n`;
  }
  xref += `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  const fullPdf = pdfParts.join('') + xref;

  try {
    const blob = new Blob([fullPdf], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
  } catch (e) {
    return `data:application/pdf;base64,${btoa(fullPdf)}`;
  }
};

export const downloadDocumentFile = (
  title: string,
  codeOrNum: string,
  fileUrl?: string,
  fileName?: string
) => {
  try {
    const finalFileName = fileName || `AlShamel-${(codeOrNum || 'Document').replace(/[^a-zA-Z0-9-_]/g, '_')}.pdf`;

    if (fileUrl && fileUrl.startsWith('data:application/pdf')) {
      const parts = fileUrl.split(',');
      const mime = parts[0].match(/:(.*?);/)?.[1] || 'application/pdf';
      const byteCharacters = atob(parts[1]);
      const byteNumbers = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const blob = new Blob([byteNumbers], { type: mime });
      const objUrl = URL.createObjectURL(blob);
      const element = document.createElement('a');
      element.href = objUrl;
      element.download = finalFileName;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setTimeout(() => URL.revokeObjectURL(objUrl), 3000);
      return;
    }

    const url = getDocumentPdfUrl(title, codeOrNum, fileUrl);
    const element = document.createElement('a');
    element.href = url;
    element.download = finalFileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  } catch (err) {
    console.error('Error downloading document:', err);
  }
};

export interface FinancialItem {
  id: string;
  slug_id?: string;
  slugId?: string;
  year: string;
  titleAr: string;
  titleEn: string;
  quarter?: string;
  status: string;
  auditFirmAr: string;
  auditFirmEn: string;
  fileSize: string;
  downloadUrl?: string;
  fileUrl?: string;
  revenue?: string;
  expenses?: string;
  netSurplus?: string;
  surplus?: string;
}

export interface WorkshopItem {
  id: string;
  slug_id?: string;
  slugId?: string;
  type: 'internal' | 'community' | string;
  titleAr: string;
  titleEn?: string;
  dateAr?: string;
  dateEn?: string;
  date?: string;
  locationAr?: string;
  locationEn?: string;
  attendeesCount?: number;
  hoursCount?: number;
  targetAudienceAr?: string;
  targetAudienceEn?: string;
  trainerAr?: string;
  trainerEn?: string;
  descAr?: string;
  descEn?: string;
  descriptionAr?: string;
  objectivesAr?: string[];
  objectivesEn?: string[];
  fileSize?: string;
  fileUrl?: string;
  pdfUrl?: string;
  image?: string;
}

export interface MeetingItem {
  id: string;
  type: 'board' | 'general_assembly';
  titleAr: string;
  titleEn: string;
  meetingNumber: string;
  dateAr: string;
  dateEn: string;
  locationAr: string;
  locationEn: string;
  attendeesCount: number;
  decisionsCount: number;
  descAr: string;
  descEn: string;
  fileSize?: string;
  fileUrl?: string;
}

export interface EthicsItem {
  id: string;
  num: number;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  pointsAr?: string[];
  pointsEn?: string[];
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
}


export interface NotificationItem {
  id: string;
  code?: string;
  module: string;
  category: 'whistleblowing' | 'membership' | 'survey' | 'contact_message' | 'feedback' | 'general';
  title: string;
  titleAr?: string;
  titleEn?: string;
  message: string;
  senderName: string;
  senderContact?: string;
  targetTab: string;
  icon?: string;
  badgeColor?: string;
  status: string;
  isRead: boolean;
  timeAgo?: string;
  createdAt: string;
  rawCreatedAt?: string;
}

export interface SubmissionItem {
  id: string;
  module: 'whistleblowing' | 'survey' | 'membership' | 'feedback' | 'contact_message';
  surveyCategory?: 'supporters' | 'assembly' | 'customers' | 'staff';
  senderName: string;
  senderContact: string;
  title: string;
  details: string;
  createdAt: string;
  status: 'pending' | 'in_progress' | 'reviewed' | 'resolved';
}

// Initial default seed datasets
const initialPolicies: PolicyItem[] = [
  {
    id: 'conflict-of-interest',
    category: 'general',
    titleAr: 'سياسة تعارض المصالح والسلوك المهني',
    titleEn: 'Conflict of Interest & Conduct Policy',
    code: 'POL-SHM-01',
    version: 'الإصدار 2.0 (معتمد)',
    approvedDate: '2024/02/15م',
    approvedByAr: 'مجلس إدارة جمعية الشامل التعاونية بعقلة الصقور (ترخيص 234)',
    approvedByEn: 'Board of Directors - AlShamel Multipurpose Cooperative (License #234)',
    descAr: 'تحدد معايير تفادي تعارض المصالح لأعضاء المجلس والإدارة، وإجراءات الإفصاح والتنحي عن التصويت في المعاملات ذات العلاقة.',
    descEn: 'Governs criteria for avoiding conflicts of interest and recusal from related-party deliberations.',
    fileSize: '1.2 MB',
    articlesAr: [
      {
        title: 'المادة الأولى: الهدف ونطاق التطبيق',
        content: [
          'تهدف هذه السياسة إلى تعزيز مبادئ الشفافية والنزاهة والعدالة في كافة معاملات الجمعية.',
          'تسري أحكام هذه السياسة على كافة أعضاء مجلس الإدارة، واللجان المنبثقة، والمدير التنفيذي، وكافة الموظفين.'
        ]
      },
      {
        title: 'المادة الثانية: واجب الإفصاح والشفافية',
        content: [
          'يلتزم كل عضو أو موظف بتقديم إفصاح سنوي خطي، وإفصاح فوري عند نشوء أي تعارض محتمل.',
          'يُحظر على العضو المشاركة في المناقشة أو التصويت على أي عقد أو قرار له فيه مصلحة مباشرة أو غير مباشرة.'
        ]
      }
    ],
    articlesEn: [
      {
        title: 'Article 1: Objectives & Scope',
        content: [
          'Promote transparency, integrity, and fairness across all institutional transactions.',
          'Applies to all Board members, committees, executive management, and staff.'
        ]
      },
      {
        title: 'Article 2: Mandatory Disclosure',
        content: [
          'Annual and ad-hoc disclosure of any potential conflicts.',
          'Strict recusal from discussions or votes on related-party contracts.'
        ]
      }
    ]
  },
  {
    id: 'whistleblowing-policy',
    category: 'general',
    titleAr: 'سياسة الإبلاغ عن المخالفات وحماية المبلغين',
    titleEn: 'Whistleblowing & Whistleblower Protection Policy',
    code: 'POL-SHM-02',
    version: 'الإصدار 1.2 (معتمد)',
    approvedDate: '2024/01/10م',
    approvedByAr: 'مجلس الإدارة',
    approvedByEn: 'Board of Directors',
    descAr: 'توضح القنوات الآمنة والسرية للإبلاغ عن أي تجاوزات مالية أو إدارية وضمان الحماية الكاملة للمبلغين من أي إجراء انتقامي.',
    descEn: 'Establishes secure, confidential reporting channels for financial or administrative violations with total whistleblower protection.',
    fileSize: '950 KB',
    articlesAr: [
      {
        title: 'المادة الأولى: القنوات والسرية',
        content: [
          'توفير قنوات مشفرة ومباشرة للجنة المراجعة الداخلية.',
          'حماية سرية هوية المبلغ التامة وعدم الكشف عنها لأي طرف ثالث.'
        ]
      }
    ],
    articlesEn: [
      {
        title: 'Article 1: Channels & Confidentiality',
        content: [
          'Encrypted reporting directly to the Internal Audit Committee.',
          'Full legal and administrative protection against retaliation.'
        ]
      }
    ]
  },
  {
    id: 'document-retention',
    category: 'general',
    titleAr: 'سياسة تنظيم حفظ الوثائق وإتلافها',
    titleEn: 'Document Retention & Destruction Policy',
    code: 'POL-SHM-03',
    version: 'الإصدار 1.0 (معتمد)',
    approvedDate: '2023/11/20م',
    approvedByAr: 'مجلس الإدارة',
    approvedByEn: 'Board of Directors',
    descAr: 'تحدد المدد النظامية للأرشفة الورقية والإلكترونية لمحاضر الاجتماعات والقوائم المالية والعقود وطرق التخلص الآمن منها.',
    descEn: 'Defines statutory periods for archiving paper and digital records, meeting minutes, and financial statements.',
    fileSize: '820 KB'
  },
  {
    id: 'gifts-donations',
    category: 'general',
    titleAr: 'سياسة قبول الهبات والتبرعات والمنح',
    titleEn: 'Acceptance of Gifts & Donations Policy',
    code: 'POL-SHM-04',
    version: 'الإصدار 1.1 (معتمد)',
    approvedDate: '2023/12/05م',
    approvedByAr: 'مجلس الإدارة',
    approvedByEn: 'Board of Directors',
    descAr: 'تنظم ضوابط وشروط قبول المساعدات والهبات العينية والمالية والتأكد من مطابقتها لأغراض الجمعية والأنظمة الوطنية.',
    descEn: 'Governs terms for receiving grants, donations, and non-monetary gifts in compliance with national regulations.',
    fileSize: '1.1 MB'
  },
  {
    id: 'member-relations',
    category: 'general',
    titleAr: 'سياسة تنظيم العلاقة مع أعضاء الجمعية العمومية وتقديم الخدمات',
    titleEn: 'General Assembly Member Relations & Services Policy',
    code: 'POL-SHM-05',
    version: 'الإصدار 2.0 (معتمد)',
    approvedDate: '2024/02/01م',
    approvedByAr: 'مجلس الإدارة',
    approvedByEn: 'Board of Directors',
    descAr: 'تحدد حقوق والتزامات الأعضاء، ومعايير توزيع العوائد التعاونية، وآليات التواصل والاستفادة من مشاريع وخدمات الجمعية.',
    descEn: 'Outlines member rights, cooperative surplus dividends, and access criteria for cooperative programs.',
    fileSize: '1.4 MB'
  },
  {
    id: 'data-privacy',
    category: 'general',
    titleAr: 'سياسة خصوصية البيانات وحماية المعلومات',
    titleEn: 'Data Privacy & Information Protection Policy',
    code: 'POL-SHM-06',
    version: 'الإصدار 1.0 (معتمد)',
    approvedDate: '2024/03/01م',
    approvedByAr: 'مجلس الإدارة',
    approvedByEn: 'Board of Directors',
    descAr: 'متوافقة مع نظام حماية البيانات الشخصية بالمملكة، وتضمن أمان وسرية بيانات المساهمين والشركاء والمستفيدين.',
    descEn: 'Fully aligned with the Saudi Personal Data Protection Law (PDPL), protecting member and partner info.',
    fileSize: '1.0 MB'
  },
  {
    id: 'aml-manual',
    category: 'aml',
    fileUrl: '/files/سياسة مؤشرات الاشتباه بعمليات غسل الأموال وجرائم تمويل الإرهاب.pdf',
    titleAr: 'دليل ومؤشرات وإجراءات مكافحة غسل الأموال',
    titleEn: 'AML Compliance Manual, Indicators & Procedures',
    code: 'POL-AML-01',
    version: 'الإصدار 2.1 (معتمد)',
    approvedDate: '2024/01/20م',
    approvedByAr: 'مجلس الإدارة',
    approvedByEn: 'Board of Directors',
    descAr: 'الدليل التشغيلي الشامل لتطبيق متطلبات العناية الواجبة وتحديد مؤشرات الاشتباه والإبلاغ وفق الأنظمة السعودية.',
    descEn: 'Comprehensive operating manual for due diligence, suspicious transaction red flags, and FIU reporting.',
    fileSize: '2.5 MB'
  },
  {
    id: 'aml-prevention',
    category: 'aml',
    fileUrl: '/files/تقييم المخاطر المتأصلة والكامنة.pdf',
    titleAr: 'سياسة الوقاية من عمليات غسل الأموال وتمويل الإرهاب',
    titleEn: 'AML & Counter-Terrorism Financing Prevention Policy',
    code: 'POL-AML-02',
    version: 'الإصدار 2.0 (معتمد)',
    approvedDate: '2023/10/15م',
    approvedByAr: 'مجلس الإدارة',
    approvedByEn: 'Board of Directors',
    descAr: 'الضوابط والتدابير الوقائية الاستباقية للتحقق من مصادر الأموال والتعاملات المالية مع الشركاء والموردين.',
    descEn: 'Proactive preventative measures and source of funds verification for financial partners and suppliers.',
    fileSize: '1.3 MB'
  },
  {
    id: 'aml-suspicion',
    category: 'aml',
    fileUrl: '/files/سياسة مؤشرات الاشتباه بعمليات غسل الأموال وجرائم تمويل الإرهاب.pdf',
    titleAr: 'سياسة التعامل مع العمليات المشبوهة والإبلاغ عنها',
    titleEn: 'Suspicious Activities Handling & Reporting Policy',
    code: 'POL-AML-03',
    version: 'الإصدار 1.5 (معتمد)',
    approvedDate: '2023/12/12م',
    approvedByAr: 'مجلس الإدارة',
    approvedByEn: 'Board of Directors',
    descAr: 'إجراءات رصد وتحليل العمليات المالية غير الاعتيادية وخطوات الرفع الفوري للإدارة العامة للتحريات المالية.',
    descEn: 'Protocols for detecting, analyzing unusual transactions, and prompt mandatory reporting to authorities.',
    fileSize: '1.1 MB'
  }
];

const initialRegulations: RegulationItem[] = [
  {
    id: 'basic-bylaws',
    sec: 'foundation',
    fileUrl: '/files/اللائحة المالية.pdf',
    titleAr: 'اللائحة الأساسية لتعاونية الشامل متعددة الأغراض',
    titleEn: 'Basic Bylaws of AlShamel Multipurpose Cooperative',
    type: 'وثيقة تأسيسية',
    num: 'REG-001',
    descAr: 'الوثيقة التأسيسية المعتمدة من وزارة الموارد البشرية والمركز الوطني لتنمية القطاع غير الربحي، المنظمة لأغراض وأسهم وحوكمة الجمعية.',
    descEn: 'Foundational statutory bylaws ratified by official authorities defining the cooperative objectives, capital shares, and governance framework.',
    fileSize: '3.8 MB'
  },
  {
    id: 'bylaws-approval',
    sec: 'foundation',
    fileUrl: '/files/سياسة آلية الرقابة على المنظمة.pdf',
    titleAr: 'محضر اعتماد اللائحة الأساسية واللائحة التنفيذية',
    titleEn: 'Bylaws Accreditation & Ratification Minutes',
    type: 'محضر رسمي',
    num: 'REG-002',
    descAr: 'محضر اجتماع الجمعية التأسيسية المتضمن المصادقة والإقرار النهائي لبنود اللائحة الأساسية وانتخاب المجلس الأول.',
    descEn: 'Official constituent assembly ratification minutes approving bylaws and formal board elections.',
    fileSize: '2.1 MB'
  },
  {
    id: 'registration-certificate',
    sec: 'foundation',
    fileUrl: '/files/سياسة التعامل مع الشركاء المنفذين والأطراف الثالثة.pdf',
    titleAr: 'شهادة تسجيل الجمعية وترخيص المركز الوطني',
    titleEn: 'Cooperative Official Registration Certificate & License',
    type: 'شهادة وترخيص',
    num: 'REG-003',
    descAr: 'شهادة التسجيل والترخيص الرسمي رقم (234) الصادرة لجمعية الشامل التعاونية متعددة الأغراض بعقلة الصقور بمنطقة القصيم.',
    descEn: 'Official registration certificate license #234 for AlShamel Cooperative.',
    fileSize: '1.4 MB'
  },
  {
    id: 'board-remuneration',
    sec: 'financial',
    fileUrl: '/files/سياسة مصفوفة الصلاحيات بين مجلس الإدارة والإدارة التنفيذية.pdf',
    titleAr: 'سياسة المكافآت والامتيازات لأعضاء مجلس الإدارة واللجان',
    titleEn: 'Board & Committees Remuneration & Benefits Policy',
    type: 'لائحة مالية',
    num: 'REG-FIN-01',
    descAr: 'تحدد الضوابط المنظمة لبدلات حضور الجلسات والمكافآت السنوية ونفقات الانتداب وفق المعايير واللوائح المعتمدة.',
    descEn: 'Governs session allowances, annual remunerations, and travel stipends for board members.',
    fileSize: '1.2 MB'
  },
  {
    id: 'financial-regulations',
    sec: 'financial',
    fileUrl: '/files/اللائحة المالية.pdf',
    titleAr: 'اللائحة المالية المعتمدة للجمعية',
    titleEn: 'Approved Financial Regulations of the Cooperative',
    type: 'لائحة مالية',
    num: 'REG-FIN-02',
    descAr: 'الدستور المالي المنظم للحسابات البنكية، والموازنات التقديرية، والرقابة الداخلية، والدورات المستندية.',
    descEn: 'The core financial manual governing banking operations, annual budgeting, and internal accounting controls.',
    fileSize: '2.9 MB'
  },
  {
    id: 'disbursement-policy',
    sec: 'financial',
    fileUrl: '/files/سياسة الصرف للبرامج والأنشطة والمصروفات الإدارية والعمومية.pdf',
    titleAr: 'سياسة وضوابط الصرف للبرامج والمشاريع والمصروفات التشغيلية',
    titleEn: 'Program & Operational Disbursement Policy',
    type: 'لائحة مالية',
    num: 'REG-FIN-03',
    descAr: 'مصفوفة الصلاحيات المالية وجداول تفويض التوقيع والشيكات وضوابط الاعتماد المالي حسب السقوف المحددة.',
    descEn: 'Matrix of financial authorities, signature mandates, payment vouchers, and expense thresholds.',
    fileSize: '1.6 MB'
  },
  {
    id: 'procurement-bylaws',
    sec: 'financial',
    fileUrl: '/files/لائحة المشتريات.pdf',
    titleAr: 'لائحة المشتريات والمنافسات والتعاقدات',
    titleEn: 'Procurement, Tendering & Contracts Bylaws',
    type: 'لائحة مشتريات',
    num: 'REG-FIN-04',
    descAr: 'آليات طرح المنافسات واستدراج عروض الأسعار، ولجان فحص العروض، وإرساء العقود وضمان الشفافية.',
    descEn: 'Tendering procedures, price quotation comparisons, bid examination committees, and procurement integrity.',
    fileSize: '2.0 MB'
  },
  {
    id: 'receipts-procedures',
    sec: 'financial',
    fileUrl: '/files/إجراءات التعامل مع المقبوضات.pdf',
    titleAr: 'إجراءات التعامل مع المقبوضات والإيرادات والتحصيل',
    titleEn: 'Revenue Collection & Receipts Handling Procedures',
    type: 'دليل إجرائي',
    num: 'REG-FIN-05',
    descAr: 'تنظيم قنوات التحصيل الإلكتروني، وإيصالات القبض، والإيداعات اليومية، ومطابقة الحسابات الختامية.',
    descEn: 'Digital payment gateways, electronic receipts, daily banking deposits, and reconciliations.',
    fileSize: '1.3 MB'
  },
  {
    id: 'financial-manual',
    sec: 'financial',
    fileUrl: '/files/دليل السياسات والإجراءات المالية والمحاسبية.pdf',
    titleAr: 'دليل الإجراءات المالية والمحاسبية الموحد',
    titleEn: 'Unified Financial & Accounting Procedures Guide',
    type: 'دليل إجرائي',
    num: 'REG-FIN-06',
    descAr: 'الدليل العملي التفصيلي للدورة المحاسبية ونماذج القيود اليومية وبرامج التوثيق المحاسبي المعتمدة.',
    descEn: 'Step-by-step practical handbook for accounting cycles, ledger entries, and audit compliance.',
    fileSize: '3.4 MB'
  },
  {
    id: 'investment-policy',
    sec: 'financial',
    fileUrl: '/files/سياسة الاستثمار.pdf',
    titleAr: 'سياسة استثمار أموال الجمعية وإدارة الأصول',
    titleEn: 'Cooperative Investment & Asset Management Policy',
    type: 'سياسة استثمار',
    num: 'REG-FIN-07',
    descAr: 'معايير توظيف الفوائض المالية وتوزيع المخاطر الاستثمارية بما يضمن تنمية الموارد وحفظ رأس مال المساهمين.',
    descEn: 'Investment risk parameters, asset management guidelines, and capital preservation standards.',
    fileSize: '1.8 MB'
  },
  {
    id: 'work-regulations',
    sec: 'laws',
    titleAr: 'لائحة تنظيم العمل الداخلي للمنسوبين',
    titleEn: 'Internal Labor & Workplace Organization Regulations',
    type: 'نظام داخلي',
    num: 'REG-LAW-01',
    descAr: 'المعتمدة من وزارة الموارد البشرية لتنظيم ساعات العمل، والإجازات، والحوافز، والواجبات الوظيفية.',
    descEn: 'Ministry-accredited internal workplace regulations covering duties, attendance, and leave.',
    fileSize: '2.4 MB'
  },
  {
    id: 'aml-law',
    sec: 'laws',
    fileUrl: '/files/تقييم المخاطر المتأصلة والكامنة.pdf',
    titleAr: 'نظام مكافحة غسل الأموال ولائحته التنفيذية بالمملكة',
    titleEn: 'Saudi Anti-Money Laundering Law & Executive Regulations',
    type: 'نظام وطني',
    num: 'REG-LAW-02',
    descAr: 'النص الرسمي للنظام الصادر بالمرسوم الملكي ولائحته التنفيذية الملزمة لجميع الكيانات والجمعيات.',
    descEn: 'Official statutory text of Saudi Anti-Money Laundering Law and executive bylaws.',
    fileSize: '4.1 MB'
  },
  {
    id: 'counter-terrorism-law',
    sec: 'laws',
    fileUrl: '/files/سياسة مؤشرات الاشتباه بعمليات غسل الأموال وجرائم تمويل الإرهاب.pdf',
    titleAr: 'نظام مكافحة جرائم الإرهاب وتمويله ولائحته التنفيذية',
    titleEn: 'Combating Terrorism Crimes & Financing Law',
    type: 'نظام وطني',
    num: 'REG-LAW-03',
    descAr: 'النظام الوطني الصادر بالمرسوم الملكي والمعايير الوقائية والإلزامية للقطاع غير الربحي والتعاوني.',
    descEn: 'National statutory regulations for combating terrorism financing applicable to non-profit entities.',
    fileSize: '3.7 MB'
  }
];

const initialFinancials: FinancialItem[] = [
  {
    id: 'fin-2023',
    year: '2023',
    titleAr: 'القوائم المالية المدققة للعام المالي 2023م',
    titleEn: 'Audited Financial Statements for FY 2023',
    status: 'معتمد',
    auditFirmAr: 'مكتب المحاسب القانوني المعتمد',
    auditFirmEn: 'Certified Chartered Accountants',
    fileSize: '4.2 MB',
    revenue: '4,850,000 ر.س',
    expenses: '3,720,000 ر.س',
    netSurplus: '1,130,000 ر.س'
  },
  {
    id: 'fin-2022',
    year: '2022',
    titleAr: 'القوائم المالية المدققة للعام المالي 2022م',
    titleEn: 'Audited Financial Statements for FY 2022',
    status: 'معتمد',
    auditFirmAr: 'مكتب المحاسب القانوني المعتمد',
    auditFirmEn: 'Certified Chartered Accountants',
    fileSize: '3.9 MB',
    revenue: '3,920,000 ر.س',
    expenses: '3,100,000 ر.س',
    netSurplus: '820,000 ر.س'
  },
  {
    id: 'fin-2021',
    year: '2021',
    titleAr: 'القوائم المالية المدققة للعام المالي 2021م',
    titleEn: 'Audited Financial Statements for FY 2021',
    status: 'معتمد',
    auditFirmAr: 'مكتب المحاسب القانوني المعتمد',
    auditFirmEn: 'Certified Chartered Accountants',
    fileSize: '3.5 MB',
    revenue: '2,840,000 ر.س',
    expenses: '2,290,000 ر.س',
    netSurplus: '550,000 ر.س'
  },
  {
    id: 'fin-2020',
    year: '2020',
    titleAr: 'القوائم المالية المدققة للعام المالي 2020م',
    titleEn: 'Audited Financial Statements for FY 2020',
    status: 'معتمد',
    auditFirmAr: 'مكتب المحاسب القانوني المعتمد',
    auditFirmEn: 'Certified Chartered Accountants',
    fileSize: '3.1 MB',
    revenue: '1,950,000 ر.س',
    expenses: '1,680,000 ر.س',
    netSurplus: '270,000 ر.س'
  },
  {
    id: 'fin-2019',
    year: '2019',
    titleAr: 'القوائم المالية التأسيسية للعام المالي 2019م',
    titleEn: 'Inaugural Financial Statements for FY 2019',
    status: 'معتمد',
    auditFirmAr: 'مكتب المحاسب القانوني المعتمد',
    auditFirmEn: 'Certified Chartered Accountants',
    fileSize: '2.8 MB',
    revenue: '1,200,000 ر.س',
    expenses: '1,050,000 ر.س',
    netSurplus: '150,000 ر.س'
  }
];

const initialWorkshops: WorkshopItem[] = [
  {
    id: 'governance-intro',
    type: 'internal',
    titleAr: 'ورشة التعريف بالحوكمة ومعايير الامتثال المؤسسي',
    titleEn: 'Governance & Institutional Compliance Orientation Workshop',
    dateAr: 'مارس 2024م',
    dateEn: 'March 2024',
    locationAr: 'قاعة الاجتماعات الرئيسية - مقر الجمعية',
    locationEn: 'Main Conference Hall - Cooperative HQ',
    attendeesCount: 28,
    hoursCount: 4,
    targetAudienceAr: 'أعضاء مجلس الإدارة، اللجان المنبثقة، والإدارة التنفيذية',
    targetAudienceEn: 'Board Members, Governance Committee & Executive Team',
    trainerAr: 'مستشار الحوكمة والامتثال التعاوني',
    trainerEn: 'Cooperative Governance Senior Consultant',
    descAr: 'ورشة عمل تخصصية استهدفت التعريف بمعايير الحوكمة الشاملة، ومسؤوليات أعضاء المجلس ولجانه وفق أدلة المركز الوطني لتنمية القطاع غير الربحي.',
    descEn: 'Specialized workshop focusing on comprehensive governance standards, fiduciary duties, and compliance with national guidelines.',
    objectivesAr: [
      'التعريف بمفهوم الحوكمة التعاونية وأهميتها في استدامة الجمعية.',
      'توضيح أدوار وصلاحيات مجلس الإدارة واللجان المنبثقة والإدارة التنفيذية.',
      'استعراض معايير الامتثال والشفافية والسلامة المالية وتطبيقها العملي.'
    ],
    objectivesEn: [
      'Introduce cooperative governance principles and long-term sustainability.',
      'Clarify board and committee fiduciary mandates.',
      'Review compliance, disclosure, and financial soundness standards.'
    ],
    fileSize: '4.5 MB'
  },
  {
    id: 'conflict-whistleblowing',
    type: 'internal',
    titleAr: 'ورشة التعريف بسياسة تعارض المصالح وسياسة الإبلاغ عن المخالفات',
    titleEn: 'Conflict of Interest & Whistleblowing Policies Workshop',
    dateAr: 'أبريل 2024م',
    dateEn: 'April 2024',
    locationAr: 'قاعة التدريب والتطوير - مقر الجمعية',
    locationEn: 'Training & Development Suite - Cooperative HQ',
    attendeesCount: 32,
    hoursCount: 3,
    targetAudienceAr: 'كافة منسوبي الجمعية، موظفي الإدارة، ورؤساء الأقسام',
    targetAudienceEn: 'All staff, operations team, and department heads',
    trainerAr: 'مسؤول الامتثال والمراجعة الداخلية',
    trainerEn: 'Head of Compliance & Internal Audit',
    descAr: 'شرح مفصل لآليات الإفصاح عن تعارض المصالح، وإجراءات حماية المبلغين، وسرية قنوات الإبلاغ عن التجاوزات.',
    descEn: 'Detailed orientation on conflict of interest declarations, whistleblower protections, and reporting channels.',
    objectivesAr: [
      'ترسيخ ثقافة النزاهة والشفافية وتجنب تضارب المصالح.',
      'شرح نموذج الإفصاح السنوي والطارئ وكيفية تعبئته وتحديثه.',
      'التعريف بقنوات الإبلاغ الآمنة وضمانات عدم التعرض لأي إجراءات انتقامية.'
    ],
    objectivesEn: [
      'Foster institutional integrity and conflict prevention.',
      'Walkthrough mandatory conflict disclosure templates.',
      'Detail secure whistleblower channels and protection guarantees.'
    ],
    fileSize: '3.8 MB'
  },
  {
    id: 'aml-counter-terrorism',
    type: 'internal',
    titleAr: 'ورشة مكافحة غسل الأموال وجرائم تمويل الإرهاب',
    titleEn: 'AML & Counter-Terrorism Financing Awareness Workshop',
    dateAr: 'يونيو 2024م',
    dateEn: 'June 2024',
    locationAr: 'مركز المؤتمرات - عقلة الصقور',
    locationEn: 'Conference Center - Uqlat As Suqur',
    attendeesCount: 45,
    hoursCount: 5,
    targetAudienceAr: 'أعضاء المجلس، موظفو المالية، المشتريات، ومديرو المشاريع',
    targetAudienceEn: 'Board, Finance officers, Procurement, and Project managers',
    trainerAr: 'خبير معتمد في مكافحة الجرائم المالية',
    trainerEn: 'Certified Financial Crime & AML Expert',
    descAr: 'برنامج تدريبي معتمد حول مؤشرات الاشتباه، وتطبيق العناية الواجبة المشددة، وآليات الرقابة المالية والتحقق من مصادر الأموال.',
    descEn: 'Certified training covering suspicious transaction indicators, enhanced due diligence, and financial verification.',
    objectivesAr: [
      'التعرف على مؤشرات العمليات المالية المشبوهة وطرق التعامل معها.',
      'تطبيق متطلبات العناية الواجبة (KYC) على الشركاء والموردين والمستفيدين.',
      'استيعاب المسؤوليات القانونية وآليات الإبلاغ الفوري للجهات المختصة.'
    ],
    objectivesEn: [
      'Identify suspicious financial indicators and mitigation steps.',
      'Implement Know-Your-Customer (KYC) requirements.',
      'Understand legal reporting duties to official oversight bodies.'
    ],
    fileSize: '5.2 MB'
  },
  {
    id: 'community-conflict-whistleblowing',
    type: 'community',
    titleAr: 'ورشة التعريف بالنزاهة والشفافية للشركات المجتمعية',
    titleEn: 'Community Partnerships Workshop on Transparency & Whistleblowing',
    dateAr: 'يوليو 2024م',
    dateEn: 'July 2024',
    locationAr: 'المركز الحضاري - عقلة الصقور',
    locationEn: 'Civic Cultural Hall - Uqlat As Suqur',
    attendeesCount: 60,
    hoursCount: 4,
    targetAudienceAr: 'الشركاء المحليون، ممثلو المجتمع المحلي، والجمعيات الشقيقة',
    targetAudienceEn: 'Community partners, local stakeholders, sister cooperatives',
    trainerAr: 'فريق الحوكمة والتواصل المؤسسي',
    trainerEn: 'Governance & Institutional Relations Team',
    descAr: 'ورشة عمل تفاعلية مع الشركاء المجتمعيين لتعزيز الثقة المتبادلة وإبراز معايير الشفافية وسياسات التبليغ الآمن.',
    descEn: 'Interactive session with community stakeholders fostering mutual trust and transparent governance.',
    objectivesAr: [
      'بناء شراكات مستدامة قائمة على الشفافية والمساءلة.',
      'تعريف المجتمع المحلي بحقوق المساهمين والمستفيدين.',
      'تفعيل المشاركة المجتمعية في الرقابة وتقديم الملاحظات البناءة.'
    ],
    objectivesEn: [
      'Build sustainable partnerships founded on transparency.',
      'Educate stakeholders on cooperative rights and services.',
      'Enable constructive feedback and community monitoring.'
    ],
    fileSize: '3.2 MB'
  },
  {
    id: 'community-aml-counter-terrorism',
    type: 'community',
    titleAr: 'ورشة التوعية المجتمعية بمخاطر الجرائم المالية والامتثال',
    titleEn: 'Community Awareness Workshop on AML & Financial Integrity',
    dateAr: 'أغسطس 2024م',
    dateEn: 'August 2024',
    locationAr: 'القاعة الكبرى - عقلة الصقور',
    locationEn: 'Grand Hall - Uqlat As Suqur',
    attendeesCount: 75,
    hoursCount: 4,
    targetAudienceAr: 'رواد الأعمال، المساهمون، وأفراد المجتمع المحلي',
    targetAudienceEn: 'Entrepreneurs, shareholders, and general community',
    trainerAr: 'مستشار قانوني ومالي',
    trainerEn: 'Legal & Financial Advisor',
    descAr: 'تثقيف أفراد المجتمع وممثلي الكيانات التجارية بالأنظمة الوطنية لحماية التعاملات المالية والوقاية من الاحتيال المالي.',
    descEn: 'Community education on national financial safety regulations, fraud prevention, and sound transactions.',
    objectivesAr: [
      'رفع الوعي المجتمعي بمخاطر غسل الأموال وطرق استغلال الكيانات غير الربحية.',
      'حماية التعاملات المالية والتأكد من موثوقية مصادر التمويل.',
      'تعزيز مكانة الجمعية ككيان نموذجي يطبق أعلى معايير الحوكمة الوطنية.'
    ],
    objectivesEn: [
      'Raise awareness regarding financial crime risks.',
      'Safeguard transactions and verify funding credibility.',
      'Reinforce the cooperative exemplary standing in compliance.'
    ],
    fileSize: '4.1 MB'
  }
];

const initialMeetings: MeetingItem[] = [
  {
    id: 'ga-2024-01',
    type: 'general_assembly',
    titleAr: 'محضر اجتماع الجمعية العمومية العادية لعام 2024م',
    titleEn: 'Ordinary General Assembly Meeting Minutes 2024',
    meetingNumber: 'GA-2024/01',
    dateAr: 'أبريل 2024م',
    dateEn: 'April 2024',
    locationAr: 'المقر الرئيسي للجمعية - عقلة الصقور',
    locationEn: 'Main Headquarters - Uqlat As Suqur',
    attendeesCount: 142,
    decisionsCount: 6,
    descAr: 'تضمن مناقشة التقرير السنوي، واعتماد القوائم المالية المدققة لعام 2023، وإبراء ذمة مجلس الإدارة، واعتماد خطة الاستثمار السنوية.',
    descEn: 'Discussed annual performance report, approved 2023 audited financials, discharged board members, and approved investment plan.',
    fileSize: '2.8 MB'
  },
  {
    id: 'ga-2023-01',
    type: 'general_assembly',
    titleAr: 'محضر اجتماع الجمعية العمومية العادية لعام 2023م',
    titleEn: 'Ordinary General Assembly Meeting Minutes 2023',
    meetingNumber: 'GA-2023/01',
    dateAr: 'مايو 2023م',
    dateEn: 'May 2023',
    locationAr: 'المقر الرئيسي للجمعية',
    locationEn: 'Main Headquarters',
    attendeesCount: 138,
    decisionsCount: 5,
    descAr: 'المصادقة على نتائج أعمال السنة المالية 2022، وتجديد تعيين المراجع القانوني وتحديد أتعابه.',
    descEn: 'Ratified 2022 financial year outcomes and reappointed the independent auditor.',
    fileSize: '2.4 MB'
  },
  {
    id: 'ga-2022-01',
    type: 'general_assembly',
    titleAr: 'محضر اجتماع الجمعية العمومية غير العادية والانتخابية لعام 2022م',
    titleEn: 'Minutes of the Extraordinary & Electoral General Assembly 2022',
    meetingNumber: 'GA-2022/01',
    dateAr: 'مارس 2022م',
    dateEn: 'March 2022',
    locationAr: 'المقر الرئيسي للجمعية',
    locationEn: 'Main Headquarters',
    attendeesCount: 165,
    decisionsCount: 4,
    descAr: 'إجراء انتخابات اختيار أعضاء مجلس الإدارة للدورة الجديدة (2022 - 2026)، وتعديل بعض بنود اللائحة الأساسية بما يتوافق مع الأنظمة.',
    descEn: 'Conducted board elections for the term (2022-2026) and updated governing bylaws.',
    fileSize: '3.1 MB'
  },
  {
    id: 'ga-2021-01',
    type: 'general_assembly',
    titleAr: 'محضر اجتماع الجمعية العمومية العادية لعام 2021م',
    titleEn: 'Ordinary General Assembly Meeting Minutes 2021',
    meetingNumber: 'GA-2021/01',
    dateAr: 'مايو 2021م',
    dateEn: 'May 2021',
    locationAr: 'المقر الرئيسي للجمعية',
    locationEn: 'Main Headquarters',
    attendeesCount: 125,
    decisionsCount: 3,
    descAr: 'استعراض الحسابات الختامية لعام 2020م، وتقرير مراجع الحسابات، واعتماد الميزانية العمومية ومخصصات الاحتياطي.',
    descEn: 'Reviewed 2020 closing accounts, independent auditor report, and statutory reserves.',
    fileSize: '2.0 MB'
  },
  {
    id: 'ga-2020-01',
    type: 'general_assembly',
    titleAr: 'محضر اجتماع الجمعية العمومية لعام 2020م (عن بُعد)',
    titleEn: 'Virtual General Assembly Meeting Minutes 2020',
    meetingNumber: 'GA-2020/01',
    dateAr: 'أغسطس 2020م',
    dateEn: 'August 2020',
    locationAr: 'المنصة الإلكترونية المعتمدة (عن بُعد)',
    locationEn: 'Approved Virtual Platform',
    attendeesCount: 118,
    decisionsCount: 3,
    descAr: 'انعقاد الجمعية العمومية عبر الوسائل الإلكترونية المعتمدة، واعتماد القوائم المالية وإقرار خطة استمرار التوزيع والخدمات.',
    descEn: 'Virtual assembly meeting approving financial statements and business continuity emergency plans.',
    fileSize: '1.9 MB'
  },
  {
    id: 'ga-2019-01',
    type: 'general_assembly',
    titleAr: 'محضر اجتماع الجمعية العمومية العادية لعام 2019م',
    titleEn: 'Ordinary General Assembly Meeting Minutes 2019',
    meetingNumber: 'GA-2019/01',
    dateAr: 'أبريل 2019م',
    dateEn: 'April 2019',
    locationAr: 'المقر الرئيسي للجمعية',
    locationEn: 'Main Headquarters',
    attendeesCount: 130,
    decisionsCount: 4,
    descAr: 'عرض إنجازات المشاريع الاستثمارية، واعتماد الحساب الختامي لعام 2018م، والموافقة على توسعة أنشطة المقاولات والتعبئة والتغليف.',
    descEn: 'Presented investment project outcomes, approved 2018 final accounts, and expanded contracting activities.',
    fileSize: '2.1 MB'
  },
  {
    id: 'bm-2025-09',
    type: 'board',
    titleAr: 'محضر الاجتماع رقم (09) لشهر سبتمبر لعام 2025م',
    titleEn: 'Minutes of the 9th Board Meeting - Sept 2025',
    meetingNumber: 'BM-2025/09',
    dateAr: 'سبتمبر 2025م',
    dateEn: 'September 2025',
    locationAr: 'قاعة المجلس - المقر الرئيسي',
    locationEn: 'Board Room - Headquarters',
    attendeesCount: 5,
    decisionsCount: 3,
    descAr: 'تصميم وتطبيق برنامج ولاء العملاء ونقاط المساهمين، ومتابعة تنفيذ الخطة التشغيلية لعام 2025م.',
    descEn: 'Approved customer loyalty & shareholder reward points program, monitored 2025 roadmap execution.',
    fileSize: '1.2 MB'
  },
  {
    id: 'bm-2024-03',
    type: 'board',
    titleAr: 'محضر اجتماع مجلس الإدارة رقم (03/2024)',
    titleEn: 'Board of Directors Meeting Minutes #03/2024',
    meetingNumber: 'BM-2024/03',
    dateAr: 'يوليو 2024م',
    dateEn: 'July 2024',
    locationAr: 'قاعة المجلس - المقر الرئيسي',
    locationEn: 'Board Room - Headquarters',
    attendeesCount: 7,
    decisionsCount: 4,
    descAr: 'مناقشة سير العمل في مشاريع الجمعية الزراعية والاستثمارية، واعتماد تحديثات دليل الحوكمة وسياسات الامتثال.',
    descEn: 'Reviewed agricultural and investment project milestones, approved governance manual updates.',
    fileSize: '1.5 MB'
  },
  {
    id: 'bm-2024-02',
    type: 'board',
    titleAr: 'محضر اجتماع مجلس الإدارة رقم (02/2024)',
    titleEn: 'Board of Directors Meeting Minutes #02/2024',
    meetingNumber: 'BM-2024/02',
    dateAr: 'مايو 2024م',
    dateEn: 'May 2024',
    locationAr: 'قاعة المجلس - المقر الرئيسي',
    locationEn: 'Board Room - Headquarters',
    attendeesCount: 7,
    decisionsCount: 5,
    descAr: 'متابعة تنفيذ قرارات الجمعية العمومية وتكليف اللجان بمراجعة مؤشرات الأداء الربع سنوية.',
    descEn: 'Followed up on general assembly resolutions and assigned committee reviews.',
    fileSize: '1.4 MB'
  },
  {
    id: 'bm-2023-01',
    type: 'board',
    titleAr: 'محضر اجتماع مجلس الإدارة الثالث لعام 2023م',
    titleEn: 'Board of Directors Meeting Minutes #03/2023',
    meetingNumber: 'BM-2023/03',
    dateAr: 'سبتمبر 2023م',
    dateEn: 'September 2023',
    locationAr: 'قاعة المجلس - المقر الرئيسي',
    locationEn: 'Board Room - Headquarters',
    attendeesCount: 5,
    decisionsCount: 4,
    descAr: 'تقييم نتائج التحول الرقمي وتطبيق النظام المحاسبي السحابي الموحد، وتخصيص ميزانية لتدريب الكوادر الوطنية.',
    descEn: 'Assessed digital transformation milestones and cloud ERP rollout across business units.',
    fileSize: '1.5 MB'
  },
  {
    id: 'bm-2022-01',
    type: 'board',
    titleAr: 'محضر الاجتماع الأول لمجلس الإدارة للدورة (2022 - 2026)',
    titleEn: 'Minutes of the 1st Board Meeting for Term (2022 - 2026)',
    meetingNumber: 'BM-2022/01',
    dateAr: 'أبريل 2022م',
    dateEn: 'April 2022',
    locationAr: 'قاعة المجلس - المقر الرئيسي',
    locationEn: 'Board Room - Headquarters',
    attendeesCount: 5,
    decisionsCount: 5,
    descAr: 'انتخاب رئيس مجلس الإدارة ونائبه والمشرف المالي، وتشكيل اللجان المنبثقة وتحديد اختصاصاتها ومسؤولياتها.',
    descEn: 'Elected Chairman, Vice-Chairman, Treasurer, and formed specialized board sub-committees.',
    fileSize: '2.1 MB'
  },
  {
    id: 'bm-2021-01',
    type: 'board',
    titleAr: 'محضر اجتماع مجلس الإدارة الختامي لعام 2021م',
    titleEn: 'Minutes of the Year-End Board Meeting 2021',
    meetingNumber: 'BM-2021/04',
    dateAr: 'ديسمبر 2021م',
    dateEn: 'December 2021',
    locationAr: 'قاعة المجلس - المقر الرئيسي',
    locationEn: 'Board Room - Headquarters',
    attendeesCount: 5,
    decisionsCount: 3,
    descAr: 'مناقشة نتائج إغلاق الحسابات السنوية، واعتماد القوائم المالية الأولية وتجهيز ملفات انتخابات المجلس القادمة.',
    descEn: 'Approved year-end financial statements and prepared elections framework.',
    fileSize: '1.4 MB'
  },
  {
    id: 'bm-2020-01',
    type: 'board',
    titleAr: 'محضر اجتماع مجلس الإدارة الطارئ لعام 2020م',
    titleEn: 'Minutes of Extraordinary Board Meeting 2020',
    meetingNumber: 'BM-2020/02',
    dateAr: 'يونيو 2020م',
    dateEn: 'June 2020',
    locationAr: 'قاعة المجلس - المقر الرئيسي',
    locationEn: 'Board Room - Headquarters',
    attendeesCount: 5,
    decisionsCount: 3,
    descAr: 'إدارة خطة استمرارية الأعمال وتأمين الاحتياجات التموينية وإطلاق خطة الخدمات الإنسانية والتموين.',
    descEn: 'Business continuity plan execution and emergency food/LPG logistics management.',
    fileSize: '1.3 MB'
  },
  {
    id: 'bm-2019-01',
    type: 'board',
    titleAr: 'محضر اجتماع مجلس الإدارة الدوري لعام 2019م',
    titleEn: 'Minutes of Regular Board Meeting 2019',
    meetingNumber: 'BM-2019/03',
    dateAr: 'أكتوبر 2019م',
    dateEn: 'October 2019',
    locationAr: 'قاعة المجلس - المقر الرئيسي',
    locationEn: 'Board Room - Headquarters',
    attendeesCount: 5,
    decisionsCount: 3,
    descAr: 'متابعة تطوير مشروع الشامل للتعبئة والتغليف، والموافقة على شراء خطوط التعبئة والتغليف الأوتوماتيكية الجديدة.',
    descEn: 'Monitored food packaging facility upgrades and approved new automated production lines.',
    fileSize: '1.5 MB'
  }
];

const initialEthics: EthicsItem[] = [
  {
    id: 'eth-1',
    num: 1,
    titleAr: 'وثيقة الميثاق الأخلاقي وقواعد السلوك المهني والمؤسسي',
    titleEn: 'Ethical Charter & Institutional Code of Conduct',
    descAr: 'المبادئ الأخلاقية والقواعد السلوكية الحاكمة لجميع معاملات الجمعية مع الشركاء والمستفيدين والجهات الرقابية، ومعايير النزاهة والشفافية وتجنب تعارض المصالح والامتثال للأنظمة.',
    descEn: 'The binding ethical framework and code of conduct governing relationships with partners, regulators, and beneficiaries.',
    fileName: 'Ethical-Charter-and-Code-of-Conduct.pdf',
    fileSize: '2.4 MB'
  }
];

const initialSubmissions: SubmissionItem[] = [
  {
    id: 'sub-contact-201',
    module: 'contact_message',
    senderName: 'عبدالله بن أحمد الغامدي',
    senderContact: 'الهاتف: 0504123456 • البريد: a.ghamdi@example.com',
    title: 'استفسار عن خدمات ومشاريع الجمعية بمحافظة جدة',
    details: 'السلام عليكم ورحمة الله وبركاته، أود الاستفسار عن كيفية الاستفادة من خدمات المنتجات الزراعية والتمور المتوفرة لدى منافذ الجمعية، وهل تتوفر خدمات توريد بالجملة للمزارعين؟ شاكر ومقدر جهودكم.',
    createdAt: '2024-09-02 11:45',
    status: 'pending'
  },
  {
    id: 'sub-contact-202',
    module: 'contact_message',
    senderName: 'د. مريم العتيبي',
    senderContact: 'الهاتف: 0558901234 • البريد: m.otaibi@domain.sa',
    title: 'طلب شراكة وتنسيق زيارة وفد مؤسسي لمقر الجمعية',
    details: 'نود التنسيق لزيارة ميدانية لمقر إدارة الجمعية بجدة لبحث فرص الشراكة التعاونية في مجال الحوكمة والأتمتة الرقمية وسلاسل الإمداد.',
    createdAt: '2024-09-01 16:10',
    status: 'in_progress'
  },
  {
    id: 'sub-105',
    module: 'survey',
    surveyCategory: 'supporters',
    senderName: 'جهة داعمة: مركز التنمية الاجتماعية بمحافظة الجموم (مدير إدارة الشراكات)',
    senderContact: 'طريقة التواصل: الجوال',
    title: 'استبيان قياس رضا الجهات الداعمة [SURV-928410] - الرضا العام: 5/5',
    details: '• الجهات المحددة: مركز التنمية الاجتماعية بمحافظة الجموم\n• المنصب الوظيفي: مدير إدارة الشراكات والتمكين\n• طريقة التعرّف على الجمعية: الحملات الدعائية\n• طريقة التواصل المفضلة: الجوال\n\n• نتائج التقييم المفصلة (من 5):\n- درجة التواصل: 5/5\n- أسلوب التواصل: 5/5\n- الإجابة على الاستفسارات: 5/5\n- وصول التقارير بشكل دوري: 5/5\n- تحقيق تطلعاتكم: 5/5\n- صرف الدعم في مكانه الصحيح: 5/5\n- الرضا العام عن الجمعية: 5/5',
    createdAt: '2024-09-01 09:30',
    status: 'pending'
  },
  {
    id: 'sub-106',
    module: 'whistleblowing',
    senderName: 'مُبلّغ سري (محمي)',
    senderContact: 'الهاتف: 0504284861 • البريد: reporter@shamil.org.sa',
    title: 'بلاغ عن مخالفة [WB-[#749201]: مخالفات مالية وتجاوز اللوائح',
    details: '• معلومات مقدم البلاغ: أحمد الزهراني | وظيفة: مشرف | إدارة: التشغيل | هاتف: 0504284861 | بريد: reporter@shamil.org.sa | ص.ب: 21541\n\n• معلومات مرتكب المخالفة: سعد خالد | وظيفة: مسؤول مشتريات | إدارة: الإدارة المالية | هاتف: 0551234567\n\n• معلومات الشهود: فهد الحربي | وظيفة: محاسب | إدارة: المالية | هاتف: 0501112233\n\n• تفاصيل المخالفة:\n- نوع المخالفة: مخالفات مالية أو هدر أصول\n- التاريخ: 1445/08/15 هـ\n- المكان: مقر إدارة المشتريات - جدة\n- أدلة ومستندات: وجود فواتير توريد غير مبررة رقم 4821 و 4822\n- المشتركون الآخرون: لا يوجد\n- تفاصيل أخرى: تم رصد الملاحظة أثناء مراجعة جرد الربع الثالث\n- النتائج المتوقعة: مراجعة الفواتير وإجراء تدقيق مالي مستقل\n\n• الإقرار: تم الإقرار والتعهد بصحة البيانات الواردة.',
    createdAt: '2024-09-02 10:15',
    status: 'pending'
  },
  {
    id: 'sub-101',
    module: 'whistleblowing',
    senderName: 'فاعل خير (سري ومحمي)',
    senderContact: 'secure-report@anonymous.sa',
    title: 'ملاحظة على إجراءات توريد مستلزمات زراعية',
    details: 'أرجو مراجعة عروض الأسعار المقدمة في منافسة توريد البذور والأسمدة الأخيرة للتأكد من مطابقتها التامة لكراسة الشروط والمعايير الفنية واللوائح المعتمدة.',
    createdAt: '2024-08-28 14:30',
    status: 'in_progress'
  },
  {
    id: 'sub-102',
    module: 'whistleblowing',
    senderName: 'موظف مهتم بالامتثال (سري)',
    senderContact: 'compliance-whistle@secure.sa',
    title: 'استفسار عن آلية تطبيق سياسة الإفصاح عن تعارض المصالح في عقود الصيانة',
    details: 'نود التأكد من اكتمال توقيع نماذج الإفصاح السنوية لجميع أعضاء اللجان والمشاركين في البت في عروض عقود الصيانة والتشغيل.',
    createdAt: '2024-08-26 10:15',
    status: 'resolved'
  },
  {
    id: 'sub-103',
    module: 'survey',
    surveyCategory: 'assembly',
    senderName: 'عضو الجمعية العمومية: أ. خالد بن فهد المطيري',
    senderContact: 'البريد: as6864886@gmail.com',
    title: 'استبيان قياس رضا أعضاء الجمعية العمومية [SURV-382910]',
    details: '• اسم عضو الجمعية العمومية: أ. خالد بن فهد المطيري\n• البريد المرتبط: as6864886@gmail.com\n\n• التقييمات المفصلة (من 5):\n- وضوح أهداف الجمعية: 5/5\n- درجة التواصل: 5/5 (راضي)\n- أسلوب التواصل: 5/5\n- الإجابة على الطلبات والاستفسارات: 5/5 (راضي)\n- إطلاع الأعضاء على الإنجازات دورياً: 5/5 (راضي)\n- وصول التقارير بشكل دوري: 5/5 (راضي)\n- الرضا العام عن الجمعية: 5/5 (راضي)',
    createdAt: '2024-08-25 11:15',
    status: 'reviewed'
  },
  {
    id: 'sub-104',
    module: 'survey',
    surveyCategory: 'supporters',
    senderName: 'ممثلة جهة مانحة وشريكة',
    senderContact: 'partners@social-fund.sa',
    title: 'استبيان رضا الجهات الداعمة والشريكة - تقييم (5/5)',
    details: 'إشادة بالتزام جمعية الشامل بمعايير الحوكمة وتقديم التقارير الدورية الدقيقة للمشاريع الممولة وسرعة تنفيذ المبادرات المجتمعية المشتركة.',
    createdAt: '2024-08-18 16:20',
    status: 'resolved'
  },
  {
    id: 'sub-107',
    module: 'survey',
    surveyCategory: 'customers',
    senderName: 'عميل تعاونية الرضا: سارة عبدالكريم',
    senderContact: 'البريد: customer@alrida.sa',
    title: 'استبيان قياس رضا عملاء تعاونية الرضا [SURV-882103]',
    details: '• البريد المرتبط: customer@alrida.sa\n\n• التقييمات المفصلة (من 5 - راضي جداً):\n- الاستفادة من الخدمات: 5/5\n- حرص الموظفين على تقديم المساعدة: 5/5\n- تلبية الاحتياجات عبر الخدمات: 5/5\n- سرعة تلبية الطلب: 5/5\n- سرعة تواصل الموظفين: 5/5\n- جودة الخدمات: 5/5\n- الرضا العام عن تعاونية الرضا: 5/5',
    createdAt: '2024-08-29 15:40',
    status: 'pending'
  },
  {
    id: 'sub-108',
    module: 'survey',
    surveyCategory: 'staff',
    senderName: 'موظف: إدارة التشغيل والمشاريع',
    senderContact: 'إدارة التشغيل • البريد: employee@shamil.org.sa',
    title: 'استبيان قياس رضا العاملين [SURV-549102] - إدارة التشغيل والمشاريع',
    details: '• اسم الإدارة/المؤسسة: إدارة التشغيل والمشاريع\n• البريد المرتبط: employee@shamil.org.sa\n• تقييم المعنويات: مرتفعة\n• مدة الاستمرار المتوقعة: من سنتان الى خمس سنوات\n• ملخص تقييم الرضا الوظيفي:\n- الراتب الحافز والتقييم: 4/5 (أوافق)\n- البيئة، الشفافية، والأمان الوظيفي: 5/5 (أوافق بشدة)\n- التدريب والمزايا والخدمات: 4/5\n- ملاحظات إضافية: بيئة عمل محفزة ويسودها روح الفريق الواحد.',
    createdAt: '2024-09-01 11:20',
    status: 'pending'
  },
  {
    id: 'sub-105',
    module: 'membership',
    senderName: 'عبدالرحمن بن خالد الحربي',
    senderContact: '0555123456 • الهوية: 1048291048',
    title: 'طلب انضمام للجمعية العمومية - 50 سهم (5,500 ر.س)',
    details: 'مزارع ومستثمر زراعي في عقلة الصقور يرغب في المساهمة بـ 50 سهماً والاستفادة من خدمات الجمعية وخصومات التوريد والتسويق الزراعي.',
    createdAt: '2024-08-20 09:40',
    status: 'pending'
  },
  {
    id: 'sub-106',
    module: 'membership',
    senderName: 'م. فهد بن عبدالعزيز المطيري',
    senderContact: '0509876543 • الهوية: 1083920194',
    title: 'طلب اكتتاب ومساهمة جديدة - 100 سهم (11,000 ر.س)',
    details: 'مهندس زراعي مهتم بالاستثمار في مشاريع الجمعية البيئية ومصنع الأسمدة العضوية ومنافذ البيع التابعة.',
    createdAt: '2024-08-15 10:05',
    status: 'in_progress'
  },
  {
    id: 'sub-107-mem',
    module: 'membership',
    senderName: 'أ. سلمان بن عبدالله الدوسري',
    senderContact: '0512345678 • الهوية: 1092837465',
    title: 'طلب انضمام وعضوية مساهم - 30 سهم (3,300 ر.س)',
    details: 'رجل أعمال ومستثمر يرغب في الانضمام للجمعية العمومية والمساهمة في دعم المشاريع الاستثمارية والخدمية بجدة.',
    createdAt: '2024-09-02 08:30',
    status: 'pending'
  }
];

export const initialProjects: ProjectItem[] = [
  {
    id: 'proj-1',
    name: 'ثلاجة الرضا',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    description: 'بدأنا بتجهيز أول مشروع وهو ثلاجة الرضا وانطلقنا لتجهيز محل العرض',
    subDescription: 'من 1440/10/15 هـ إلى 1440/12/25 هـ\nوكان الافتتاح في 1441/1/1 هـ',
    features: [
      'يتميز مشروع الثلاجة بتنوع شركات المياه',
      'وخدمة التوصيل السريع'
    ],
    societyNameAr: 'الجمعية التعاونية متعددة اغراض رضا بمحافظة الجموم',
    societyNameEn: 'THE MULTI-PURPOSE COOPERATIVE SOCIETY, REDA, IN JAMOUM GOVERNORATE'
  },
  {
    id: 'proj-2',
    name: 'إعمار الرضا',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=800&q=80',
    description: 'مشروع للتطوير العمراني والمقاولات والصيانة لخدمة المجتمع المحلي بمحافظة الجموم.',
    subDescription: 'تم الانطلاق والتشغيل لتقديم خدمات التشييد والمقاولات والحلول الهندسية.',
    features: [
      'جودة عالية في التنفيذ والتشييد',
      'إشراف هندسي كوادر متخصصة',
      'خدمات الصيانة والتشغيل المستمر'
    ],
    societyNameAr: 'الجمعية التعاونية متعددة اغراض رضا بمحافظة الجموم',
    societyNameEn: 'THE MULTI-PURPOSE COOPERATIVE SOCIETY, REDA, IN JAMOUM GOVERNORATE'
  },
  {
    id: 'proj-3',
    name: 'الرضا للتعبئة والتغليف',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    description: 'مصنع متكامل مجهز لخطوط التعبئة والتغليف للمنتجات الغذائية والزراعية.',
    subDescription: 'حاصل على معايير الجودة وسلامة الغذاء والامتثال البيئي.',
    features: [
      'خطوط إنتاج وتعبئة أوتوماتيكية',
      'حفظ المنتجات وفق أعلى المعايير الصحية',
      'خدمات التغليف التجاري المخصص'
    ],
    societyNameAr: 'الجمعية التعاونية متعددة اغراض رضا بمحافظة الجموم',
    societyNameEn: 'THE MULTI-PURPOSE COOPERATIVE SOCIETY, REDA, IN JAMOUM GOVERNORATE'
  }
];

// Storage Keys
const STORAGE_PROJECTS = 'rda_governance_projects_v1';
const STORAGE_MEMBERS = 'rda_governance_members_v1';
const STORAGE_POLICIES = 'tawania_gov_policies';
const STORAGE_REGULATIONS = 'tawania_gov_regulations';
const STORAGE_FINANCIALS = 'tawania_gov_financials';
const STORAGE_WORKSHOPS = 'tawania_gov_workshops';
const STORAGE_MEETINGS = 'tawania_gov_meetings';
const STORAGE_ETHICS = 'tawania_gov_ethics';
const STORAGE_SUBMISSIONS = 'tawania_gov_submissions_v4';

interface GovernanceContextType {
  boardIntro: BoardIntroData;
  updateBoardIntro: (updated: BoardIntroData) => Promise<boolean>;
  projectsHeader: ProjectsHeaderData;
  updateProjectsHeader: (data: ProjectsHeaderData) => Promise<boolean>;
  projects: ProjectItem[];
  generalAssemblyMembers: GeneralAssemblyMember[];
  boardMembers: BoardMemberItem[];
  executiveDirector: ExecutiveDirectorItem;
  updateExecutiveDirector: (fields: Partial<ExecutiveDirectorItem> | ExecutiveDirectorItem) => Promise<void>;
  galleryItems: GalleryItemModel[];
  addGalleryItem: (item: Omit<GalleryItemModel, 'id'>) => void;
  updateGalleryItem: (id: string | number, item: Partial<GalleryItemModel>) => Promise<void>;
  deleteGalleryItem: (id: string | number) => Promise<void>;

  addBoardMember: (member: Omit<BoardMemberItem, 'id'> | any) => Promise<void>;
  updateBoardMember: (id: string | number, member: Partial<BoardMemberItem> | any) => Promise<void>;
  deleteBoardMember: (id: string | number) => Promise<void>;

  addMember: (item: Omit<GeneralAssemblyMember, 'id'> | GeneralAssemblyMember) => Promise<void>;
  updateMember: (item: GeneralAssemblyMember) => Promise<void>;
  deleteMember: (id: number | string) => Promise<void>;

  addProject: (item: ProjectItem) => void;
  updateProject: (item: ProjectItem) => void;
  deleteProject: (id: string) => void;
  policies: PolicyItem[];
  regulations: RegulationItem[];
  financials: FinancialItem[];
  workshops: WorkshopItem[];
  meetings: MeetingItem[];
  ethics: EthicsItem[];
  submissions: SubmissionItem[];
  notifications: NotificationItem[];
  unreadNotificationsCount: number;
  markNotificationAsRead: (id: string | number) => Promise<void>;
  markAllNotificationsAsRead: () => Promise<void>;
  deleteNotification: (id: string | number) => Promise<void>;
  refreshNotifications: () => Promise<void>;


  // Policies CRUD
  addPolicy: (policy: PolicyItem | any) => Promise<void>;
  updatePolicy: (policy: PolicyItem | any) => Promise<void>;
  deletePolicy: (id: string | number) => Promise<void>;

  // Regulations CRUD
  addRegulation: (item: RegulationItem | any) => Promise<void>;
  updateRegulation: (item: RegulationItem | any) => Promise<void>;
  deleteRegulation: (id: string | number) => Promise<void>;

  // Financials CRUD
  addFinancial: (item: FinancialItem | any) => Promise<void>;
  updateFinancial: (item: FinancialItem | any) => Promise<void>;
  deleteFinancial: (id: string | number) => Promise<void>;

  // Workshops CRUD
  addWorkshop: (item: WorkshopItem | any) => Promise<void>;
  updateWorkshop: (item: WorkshopItem | any) => Promise<void>;
  deleteWorkshop: (id: string | number) => Promise<void>;

  // Meetings CRUD
  addMeeting: (item: MeetingItem | any) => Promise<void>;
  updateMeeting: (item: MeetingItem | any) => Promise<void>;
  deleteMeeting: (id: string | number) => Promise<void>;

  // Ethics CRUD
  addEthics: (item: EthicsItem | any) => Promise<void>;
  updateEthics: (item: EthicsItem | any) => Promise<void>;
  deleteEthics: (id: string | number) => Promise<void>;

  // Submissions
  addSubmission: (item: Omit<SubmissionItem, 'id' | 'createdAt' | 'status'>) => void;
  updateSubmissionStatus: (id: string, status: SubmissionItem['status']) => void;
  deleteSubmission: (id: string | number) => Promise<void>;

  // Site Contact Settings & Logos
  contactSettings: SiteContactSettings;
  updateContactSettings: (settings: Partial<SiteContactSettings> | SiteContactSettings) => Promise<void>;
  feedbackCards: any[];
  updateFeedbackCards: (cards: any[]) => Promise<void>;
  addFeedbackCard?: (card: any) => Promise<void>;
  updateFeedbackCard?: (card: any) => Promise<void>;
  deleteFeedbackCard?: (id: string | number) => Promise<void>;

  // Home Page Dynamic Content
  homeHeroSlides: HeroSlideItem[];
  updateHomeHeroSlides: (slides: HeroSlideItem[]) => void;
  addHomeHeroSlide: (slide: HeroSlideItem) => void;
  deleteHomeHeroSlide: (id: string) => void;

  homeAboutData: HomeAboutData;
  updateHomeAboutData: (data: Partial<HomeAboutData> | HomeAboutData) => Promise<void>;

  homeStatsData: HomeStatItem[];
  updateHomeStatsData: (stats: HomeStatItem[]) => void;

  strategicGoals: StrategicGoalItem[];
  addStrategicGoal: (goal: StrategicGoalItem) => void;
  updateStrategicGoal: (goal: StrategicGoalItem) => void;
  deleteStrategicGoal: (id: number) => void;

  testimonials: TestimonialItemModel[];
  addTestimonial: (item: TestimonialItemModel) => void;
  updateTestimonial: (item: TestimonialItemModel) => void;
  deleteTestimonial: (id: string) => void;

  // Reset all to default
  resetToDefaults: () => void;
}

export const initialProjectsList: ProjectItem[] = [
  {
    id: 'p-1',
    name: 'ثلاجة الشامل',
    description: 'منشأة تبريد وتخزين لوجستية متطورة لدعم سلاسل الإمداد الغذائي والمنتجات الزراعية.',
    subDescription: 'سعة تخزينية 2,500 طن بـ 8 غرف تبريد وتجميد مركزية.',
    features: ['تأمين سلاسل الإمداد', 'تقليل الفاقد الزراعي', 'تحقيق الاستدامة الاستثمارية'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    societyNameAr: 'جمعية الشامل التعاونية',
    societyNameEn: 'AlShamel Multipurpose Cooperative'
  },
  {
    id: 'p-2',
    name: 'إعمار الشامل للمقاولات',
    description: 'ذراع المقاولات والتطوير العمراني للجمعية لتنفيذ المشاريع الإنشائية والبنية التحتية.',
    subDescription: 'تنفيذ مباني ومرافق وفق كود البناء السعودي الحديث.',
    features: ['إنشاءات عامة', 'تطوير عقاري', 'إدارة مشاريع بنية تحتية'],
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
    societyNameAr: 'جمعية الشامل التعاونية',
    societyNameEn: 'AlShamel Multipurpose Cooperative'
  },
  {
    id: 'p-3',
    name: 'استهلاكية الشامل',
    description: 'المجمع التجاري والهايبرماركت التعاوني لتوفير المواد الغذائية والمنتجات الاستهلاكية لجميع المواطنين والأعضاء.',
    subDescription: 'تأمين المواد الغذائية بأسعار تعاونية تنافسية مع برنامج نقاط المساهمين.',
    features: ['أسعار تعاونية', 'تنوع المنتجات الطازجة', 'برنامج ولاء المساهمين'],
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80',
    societyNameAr: 'جمعية الشامل التعاونية',
    societyNameEn: 'AlShamel Multipurpose Cooperative'
  },
  {
    id: 'p-4',
    name: 'غاز الشامل',
    description: 'مشروع توزيع وحفظ أسطوانات الغاز وتأمين احتياجات المنازل والمنشآت التجارية.',
    subDescription: 'أسطول توصيل ميداني مجهز بأعلى معايير السلامة والأمان المعتمدة.',
    features: ['توصيل سريع للمنازل', 'التزام بمعايير السلامة', 'تغطية شاملة لمناطق الخدمة'],
    image: 'https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=800&q=80',
    societyNameAr: 'جمعية الشامل التعاونية',
    societyNameEn: 'AlShamel Multipurpose Cooperative'
  },
  {
    id: 'p-5',
    name: 'تعبئة وتغليف الشامل',
    description: 'مصنع أتمتة خطوط التعبئة والتغليف للمنتجات الحبوب والمواد الغذائية الجافة.',
    subDescription: 'خطوط إنتاج وتغليف أوتوماتيكية عالية السرعة تضمن السلامة الغذائية.',
    features: ['أتمتة بالكامل', 'معايير جودة سلامة الأغذية', 'تعبئة مخصصة للموردين'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    societyNameAr: 'جمعية الشامل التعاونية',
    societyNameEn: 'AlShamel Multipurpose Cooperative'
  },
  {
    id: 'p-6',
    name: 'إعاشة وخدمات الشامل',
    description: 'مشروع الإعاشة المركزية وتقديم الوجبات والتموين الغذائي للقطاعات والمواسم.',
    subDescription: 'إعداد وتجهيز الوجبات وفق أعلى المعايير الصحية.',
    features: ['إعاشة موظفين وشركات', 'خدمة المواسم والمناسبات', 'مطابخ إعاشة حديثة'],
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    societyNameAr: 'جمعية الشامل التعاونية',
    societyNameEn: 'AlShamel Multipurpose Cooperative'
  }
];

const GovernanceDataContext = createContext<GovernanceContextType | undefined>(undefined);

export const GovernanceDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projectsHeader, setProjectsHeader] = useState<ProjectsHeaderData>({
    badgeAr: 'مشاريع واستثمارات الجمعية',
    badgeEn: 'Cooperative Enterprises',
    titleAr: 'مشاريعنا التنموية',
    titleEn: 'Our Development Projects',
    descAr: 'تعاونية الشامل أسست مشاريع متعددة عبر مختلف المجالات منذ تأسيسها بما في ذلك التسويق والأسواق الاستهلاكية والتوزيع ومصنع التعبئة والتغليف والأعلاف وتنمية الثروة الحيوانية والزراعية.',
    descEn: 'AlShamel Cooperative has established diverse impactful projects across various sectors since inception, including marketing, consumer markets, distribution, packaging facilities, and feed & agricultural development.'
  });

  const [boardIntro, setBoardIntro] = useState<BoardIntroData>(initialBoardIntroData);

  const updateBoardIntro = async (updated: BoardIntroData): Promise<boolean> => {
    try {
      setBoardIntro(updated);
      await apiService.updateHomeSection('board_intro', updated);
      await refreshHomeContent();
      return true;
    } catch (e) {
      console.error('Error updating board intro:', e);
      return false;
    }
  };

  const STORAGE_GALLERY = 'rda_governance_gallery_items_v1';
  const STORAGE_CONTACT_SETTINGS = 'tawania_site_contact_settings_v1';

  const [contactSettings, setContactSettings] = useState<SiteContactSettings>(initialSiteContactSettings);
  const [feedbackCards, setFeedbackCards] = useState<any[]>([
  {
    "id": "stakeholder-drive",
    "titleAr": "التغذيه الراجعة لاصحاب العلاقه",
    "titleEn": "Stakeholder Feedback Document",
    "descriptionAr": "تصفح المستند الموثق الخاص بالتغذية الراجعة واستجابات أصحاب العلاقة والشركاء.",
    "descriptionEn": "Browse verified document for stakeholder feedback and official partner responses.",
    "url": "https://drive.google.com/file/d/1GZtIwKitQNrezCYUaogUX8NS2LSL78ah/view?usp=sharing",
    "platform": "drive",
    "platformName": "Google Drive",
    "badgeAr": "Google Drive PDF",
    "badgeEn": "Verified Document",
    "accentColor": "emerald"
  },
  {
    "id": "consumer-maps",
    "titleAr": "تقييمات استهلاكية تعاونية الرضا",
    "titleEn": "Consumer Hypermarket Google Reviews",
    "descriptionAr": "اطّلع على تقييمات وآراء العملاء المباشرة لأسواق ومنافذ البيع على خرائط جوجل.",
    "descriptionEn": "View verified live customer ratings and reviews for consumer markets on Google Maps.",
    "url": "https://maps.app.goo.gl/k7U4w9STDQVS1TPe7",
    "platform": "maps",
    "platformName": "Google Maps",
    "badgeAr": "Google Maps",
    "badgeEn": "Google Maps Reviews",
    "accentColor": "amber"
  },
  {
    "id": "gas-maps",
    "titleAr": "تقييمات غـــاز الــرضــا",
    "titleEn": "Al-Reeda Gas Station Google Reviews",
    "descriptionAr": "تصفح تقييمات وتعليقات العملاء والمستفيدين لمحطة وخدمة غاز الرضا على الخريطة.",
    "descriptionEn": "Explore ratings and customer feedback for Al-Reeda gas services on Google Maps.",
    "url": "https://www.google.com/maps/place/%D8%BA%D8%A7%D8%B2+%D8%A7%D9%84%D8%B1%D8%B6%D8%A7%E2%80%AD/@21.5165623,39.6158877,15z/data=!4m8!3m7!1s0x15c221ebbb6af7a7:0x95b19c95aba8422e!8m2!3d21.5165623!4d39.6158877!9m1!1b1!16s%2Fg%2F11rzbf_l0k",
    "platform": "maps",
    "platformName": "Google Maps",
    "badgeAr": "Google Maps",
    "badgeEn": "Google Maps Location",
    "accentColor": "blue"
  }
]);

  const updateFeedbackCards = async (newCards: any[]) => {
    setFeedbackCards(newCards);
    try {
      await apiService.syncFeedbackCards(newCards);
      await apiService.updateHomeSection('feedback_cards', newCards);
      await refreshFeedbackCards();
    } catch (err) {
      console.error('Error updating feedback cards:', err);
    }
  };
  const addFeedbackCard = async (card: any) => {
    try {
      await apiService.addFeedbackCard(card);
      await refreshFeedbackCards();
    } catch (err) {
      console.error('Error adding feedback card:', err);
    }
  };
  const updateFeedbackCard = async (card: any) => {
    const cleanId = card.slug_id || card.slugId || card.id;
    try {
      await apiService.updateFeedbackCard(cleanId, card);
      await refreshFeedbackCards();
    } catch (err) {
      console.error('Error updating feedback card:', err);
    }
    setFeedbackCards((prev) =>
      prev.map((c) => (c.id === card.id || c.slug_id === cleanId ? { ...c, ...card } : c))
    );
  };
  const deleteFeedbackCard = async (id: string | number) => {
    try {
      await apiService.deleteFeedbackCard(id);
      await refreshFeedbackCards();
    } catch (err) {
      console.error('Error deleting feedback card:', err);
    }
    setFeedbackCards((prev) => prev.filter((c) => String(c.id) !== String(id) && c.slug_id !== String(id)));
  };

  

  // Auto-refetch helpers to re-sync GET endpoints immediately after any POST / PUT / DELETE mutation
  const refreshWorkshops = async () => {
    try {
      const res = await apiService.getWorkshops();
      if (res && res.data && res.data.length > 0) {
        setWorkshops(res.data);
      }
    } catch (err) {
      console.error('Error fetching workshops:', err);
    }
  };

  const refreshRegulations = async () => {
    try {
      const res = await apiService.getRegulations();
      if (res && res.data && res.data.length > 0) {
        setRegulations(res.data);
      }
    } catch (err) {
      console.error('Error fetching regulations:', err);
    }
  };

  const refreshFinancials = async () => {
    try {
      const res = await apiService.getFinancials();
      if (res && res.data && res.data.length > 0) {
        setFinancials(res.data);
      }
    } catch (err) {
      console.error('Error fetching financials:', err);
    }
  };

  const refreshFeedbackCards = async () => {
    try {
      const res = await apiService.getFeedbackCards();
      if (res && res.data && res.data.length > 0) {
        setFeedbackCards(res.data);
      }
    } catch (err) {
      console.error('Error fetching feedback cards:', err);
    }
  };

  const refreshPolicies = async () => {
    try {
      const res = await apiService.getPolicies();
      if (res && res.data && res.data.length > 0) {
        setPolicies(res.data);
      }
    } catch (err) {
      console.error('Error fetching policies:', err);
    }
  };

  const refreshEthics = async () => {
    try {
      const res = await apiService.getEthics();
      if (res && res.data && res.data.length > 0) {
        setEthics(res.data);
      }
    } catch (err) {
      console.error('Error fetching ethics:', err);
    }
  };

  const refreshMeetings = async () => {
    try {
      const res = await apiService.getMeetings();
      if (res && res.data && res.data.length > 0) {
        setMeetings(res.data);
      }
    } catch (err) {
      console.error('Error fetching meetings:', err);
    }
  };

  const refreshMembers = async () => {
    try {
      const res = await apiService.getMembers();
      if (res && res.success && Array.isArray(res.data)) {
        setGeneralAssemblyMembers(res.data);
      }
    } catch {}
  };

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const refreshNotifications = async () => {
    try {
      const res = await apiService.getNotifications();
      if (res && res.success && Array.isArray(res.data)) {
        setNotifications(res.data);
      }
    } catch (e) {
      console.warn('Error fetching notifications from API:', e);
    }
  };

  const refreshSubmissions = async () => {
    try {
      const res = await apiService.getSubmissions();
      if (res && res.success && Array.isArray(res.data)) {
        setSubmissions(res.data);
      }
    } catch {}
  };

  const refreshBoardMembers = async () => {
    try {
      const res = await apiService.getBoardMembers();
      if (res && res.success && Array.isArray(res.data)) {
        setBoardMembers(res.data);
      }
    } catch {}
  };

  const refreshProjects = async () => {
    try {
      const res = await apiService.getProjects();
      if (res && res.success && Array.isArray(res.data)) {
        setProjects(res.data);
      }
    } catch {}
  };

  
  const refreshHomeContent = async () => {
    try {
      const res = await apiService.getHomeContent();
      if (res && res.success && res.data) {
        if (res.data.hero) setHomeHeroSlides(res.data.hero);
        if (res.data.about) setHomeAboutData(res.data.about);
        if (res.data.stats) setHomeStatsData(res.data.stats);
        if (res.data.goals) setStrategicGoals(res.data.goals);
        if (res.data.testimonials) setTestimonials(res.data.testimonials);
        if (res.data.contact_settings) setContactSettings(res.data.contact_settings);
        if (res.data.projects_header) setProjectsHeader(res.data.projects_header);
        if (res.data.board_intro) setBoardIntro(res.data.board_intro);
      }
    } catch (err) {
      console.error('Error refreshing home content:', err);
    }
  };

  // Master Initial Load Effect: Run all API fetches in parallel for blazing-fast hydration
  useEffect(() => {
    Promise.all([
      refreshHomeContent(),
      refreshMembers(),
      refreshSubmissions(),
      refreshNotifications(),
      refreshBoardMembers(),
      refreshProjects(),
      refreshGallery(),
      refreshExecutiveDirector(),
        refreshMeetings(),
        refreshEthics(),
        refreshPolicies(),
        refreshFeedbackCards(),
        refreshFinancials(),
        refreshRegulations(),
        refreshWorkshops(),
    ]).catch(err => console.warn('Hydration note:', err));
  }, []);

  const refreshGallery = async () => {
    try {
      const res = await apiService.getGallery();
      if (res && res.success && Array.isArray(res.data)) {
        setGalleryItems(res.data);
      }
    } catch {}
  };

  const updateContactSettings = async (fields: Partial<SiteContactSettings> | SiteContactSettings) => {
    const updated = { ...contactSettings, ...fields };
    setContactSettings(updated);
    try {
      await apiService.updateHomeSection('contact_settings', updated);
      await refreshHomeContent();
    } catch (err) {
      console.error('Error updating site contact settings:', err);
    }
  };

  const [galleryItems, setGalleryItems] = useState<GalleryItemModel[]>(initialGalleryItems);

  

  const addGalleryItem = async (itemData: Omit<GalleryItemModel, 'id'>) => {
    await apiService.addGalleryItem(itemData);
    await refreshGallery();
    const newItem: GalleryItemModel = {
      ...itemData,
      id: 'g-' + Date.now()
    };
    setGalleryItems((prev) => [newItem, ...prev]);
  };

  const updateGalleryItem = async (id: string | number, updatedFields: Partial<GalleryItemModel>) => {
    const cleanId = String(id).replace(/[^0-9]/g, '') || String(id);
    try {
      await apiService.updateGalleryItem(cleanId, updatedFields);
      await refreshGallery();
    } catch (err) {
      console.error('Error updating gallery item:', err);
    }
  };

  const deleteGalleryItem = async (id: string | number) => {
    const cleanId = String(id).replace(/[^0-9]/g, '') || String(id);
    try {
      await apiService.deleteGalleryItem(cleanId);
      await refreshGallery();
    } catch (err) {
      console.error('Error deleting gallery item:', err);
    }
    setGalleryItems((prev) => prev.filter((g) => String(g.id) !== String(id)));
  };

  const STORAGE_BOARD = 'rda_governance_board_members_v1';
  const [boardMembers, setBoardMembers] = useState<BoardMemberItem[]>(initialBoardMembers);

  

  const addBoardMember = async (memberData: Omit<BoardMemberItem, 'id'> | any) => {
    try {
      await apiService.addBoardMember(memberData);
      await refreshBoardMembers();
    } catch (err) {
      console.error('Error adding board member:', err);
    }
  };

  const updateBoardMember = async (id: string | number, updatedFields: Partial<BoardMemberItem> | any) => {
    const cleanId = String(id).replace(/[^0-9]/g, '') || id;
    try {
      await apiService.updateBoardMember(cleanId, updatedFields);
      await refreshBoardMembers();
    } catch (err) {
      console.error('Error updating board member:', err);
    }
  };

  const deleteBoardMember = async (id: string | number) => {
    const cleanId = String(id).replace(/[^0-9]/g, '') || id;
    try {
      await apiService.deleteBoardMember(cleanId);
      await refreshBoardMembers();
    } catch (err) {
      console.error('Error deleting board member:', err);
    }
    setBoardMembers((prev) => prev.filter((m) => String(m.id) !== String(id)));
  };

  const STORAGE_EXECUTIVE = 'rda_governance_executive_director_v1';
  const [executiveDirector, setExecutiveDirector] = useState<ExecutiveDirectorItem>(initialExecutiveDirector);

  

  const refreshExecutiveDirector = async () => {
    try {
      const res = await apiService.getExecutiveDirector();
      if (res && res.success && res.data) {
        setExecutiveDirector(res.data);
      }
    } catch (err) {
      console.error('Error refreshing executive director:', err);
    }
  };

  const updateExecutiveDirector = async (updatedFields: Partial<ExecutiveDirectorItem> | ExecutiveDirectorItem) => {
    const updated = { ...executiveDirector, ...updatedFields };
    setExecutiveDirector(updated);
    try {
      await apiService.updateExecutiveDirector(updated);
      const res = await apiService.getExecutiveDirector();
      if (res && res.success && res.data) {
        setExecutiveDirector(res.data);
      }
    } catch (err) {
      console.error('Error updating executive director:', err);
    }
  };

  const [generalAssemblyMembers, setGeneralAssemblyMembers] = useState<GeneralAssemblyMember[]>(generalAssemblyMembersList);

  

  const addMember = async (item: Omit<GeneralAssemblyMember, 'id'> | GeneralAssemblyMember) => {
    await apiService.addMember(item);
    await refreshMembers();
    setGeneralAssemblyMembers(prev => {
      const nextId = prev.length > 0 ? Math.max(...prev.map(m => m.id)) + 1 : 1;
      const newMember: GeneralAssemblyMember = {
        id: 'id' in item && item.id ? item.id : nextId,
        name: item.name,
        nameEn: item.nameEn || item.name,
        sharesCount: item.sharesCount || 100,
        joinYear: item.joinYear || '1440',
        city: item.city || 'الجموم'
      };
      return [newMember, ...prev];
    });
  };

  const updateMember = async (item: GeneralAssemblyMember) => {
    await apiService.updateMember(item.id, item);
    await refreshMembers();
    setGeneralAssemblyMembers(prev => prev.map(m => m.id === item.id ? item : m));
  };

  const deleteMember = async (id: number) => {
    await apiService.deleteMember(id);
    await refreshMembers();
    setGeneralAssemblyMembers(prev => prev.filter(m => m.id !== id));
  };

  const [projects, setProjects] = useState<ProjectItem[]>(initialProjectsList);

  

  const addProject = async (item: ProjectItem) => {
    await apiService.addProject(item);
    await refreshProjects();
    setProjects(prev => [item, ...prev]);
  };
  const updateProject = async (item: ProjectItem) => {
    await apiService.updateProject(item.id, item);
    await refreshProjects();
    setProjects(prev => prev.map(p => p.id === item.id ? item : p));
  };
  const deleteProject = async (id: string) => {
    await apiService.deleteProject(id);
    await refreshProjects();
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const [policies, setPolicies] = useState<PolicyItem[]>(initialPolicies);

  const [regulations, setRegulations] = useState<RegulationItem[]>(initialRegulations);

  const [financials, setFinancials] = useState<FinancialItem[]>(initialFinancials);

  const [workshops, setWorkshops] = useState<WorkshopItem[]>(initialWorkshops);

  const [meetings, setMeetings] = useState<MeetingItem[]>(initialMeetings);

  const [ethics, setEthics] = useState<EthicsItem[]>(initialEthics);

  const [submissions, setSubmissions] = useState<SubmissionItem[]>(initialSubmissions);

  


  const markNotificationAsRead = async (id: string | number) => {
    try {
      await apiService.markNotificationAsRead(id);
      setNotifications(prev => prev.map(n => String(n.id) === String(id) ? { ...n, isRead: true, status: 'reviewed' } : n));
      setSubmissions(prev => prev.map(s => String(s.id) === String(id) && s.status === 'pending' ? { ...s, status: 'reviewed' } : s));
      await refreshNotifications();
    } catch (err) {
      setNotifications(prev => prev.map(n => String(n.id) === String(id) ? { ...n, isRead: true, status: 'reviewed' } : n));
    }
  };

  const markAllNotificationsAsRead = async () => {
    try {
      await apiService.markAllNotificationsAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true, status: 'reviewed' })));
      setSubmissions(prev => prev.map(s => s.status === 'pending' ? { ...s, status: 'reviewed' } : s));
      await refreshNotifications();
    } catch (err) {
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true, status: 'reviewed' })));
    }
  };

  const deleteNotification = async (id: string | number) => {
    try {
      await apiService.deleteNotification(id);
      setNotifications(prev => prev.filter(n => String(n.id) !== String(id)));
      setSubmissions(prev => prev.filter(s => String(s.id) !== String(id)));
    } catch (err) {
      setNotifications(prev => prev.filter(n => String(n.id) !== String(id)));
    }
  };


  // Synchronize to localStorage
  

  

  

  

  

  

  

  // Policies actions
  const addPolicy = async (policy: PolicyItem | any) => {
    try {
      await apiService.addPolicy(policy);
      await refreshPolicies();
    } catch (err) {
      console.error('Error adding policy:', err);
    }
  };
  const updatePolicy = async (policy: PolicyItem | any) => {
    const cleanId = (policy as any).slug_id || (policy as any).slugId || policy.id;
    try {
      await apiService.updatePolicy(cleanId, policy);
      await refreshPolicies();
    } catch (err) {
      console.error('Error updating policy:', err);
    }
    setPolicies((prev) =>
      prev.map((p) => ((p.id === policy.id || (p as any).slug_id === cleanId) ? { ...p, ...policy } : p))
    );
  };
  const deletePolicy = async (id: string | number) => {
    try {
      await apiService.deletePolicy(id);
      await refreshPolicies();
    } catch (err) {
      console.error('Error deleting policy:', err);
    }
    setPolicies((prev) => prev.filter((p) => String(p.id) !== String(id) && (p as any).slug_id !== String(id)));
  };

  // Regulations actions
  const addRegulation = async (item: RegulationItem | any) => {
    try {
      await apiService.addRegulation(item);
      await refreshRegulations();
    } catch (err) {
      console.error('Error adding regulation:', err);
    }
  };
  const updateRegulation = async (item: RegulationItem | any) => {
    const cleanId = item.slug_id || item.slugId || item.id || item.num;
    try {
      await apiService.updateRegulation(cleanId, item);
      await refreshRegulations();
    } catch (err) {
      console.error('Error updating regulation:', err);
    }
    setRegulations((prev) =>
      prev.map((r) =>
        String(r.id) === String(item.id) ||
        String((r as any).slug_id) === String(cleanId) ||
        String((r as any).slugId) === String(cleanId) ||
        String(r.num) === String(cleanId) ||
        String(r.titleAr) === String(item.titleAr)
          ? { ...r, ...item, fileUrl: item.fileUrl || item.pdfUrl || item.file_url, pdfUrl: item.pdfUrl || item.fileUrl || item.file_url }
          : r
      )
    );
  };
  const deleteRegulation = async (id: string | number) => {
    try {
      await apiService.deleteRegulation(id);
      await refreshRegulations();
    } catch (err) {
      console.error('Error deleting regulation:', err);
    }
    setRegulations((prev) => prev.filter((r) => String(r.id) !== String(id) && (r as any).slug_id !== String(id) && r.num !== String(id)));
  };

  // Financials actions
  const addFinancial = async (item: FinancialItem | any) => {
    try {
      await apiService.addFinancial(item);
      await refreshFinancials();
    } catch (err) {
      console.error('Error adding financial item:', err);
    }
  };
  const updateFinancial = async (item: FinancialItem | any) => {
    const cleanId = item.slug_id || item.slugId || item.id || `fin-${item.year}`;
    try {
      await apiService.updateFinancial(cleanId, item);
      await refreshFinancials();
    } catch (err) {
      console.error('Error updating financial item:', err);
    }
    setFinancials((prev) =>
      prev.map((f) => (f.id === item.id || (f as any).slug_id === cleanId ? { ...f, ...item } : f))
    );
  };
  const deleteFinancial = async (id: string | number) => {
    try {
      await apiService.deleteFinancial(id);
      await refreshFinancials();
    } catch (err) {
      console.error('Error deleting financial item:', err);
    }
    setFinancials((prev) => prev.filter((f) => String(f.id) !== String(id) && (f as any).slug_id !== String(id)));
  };

  // Workshops actions
  const addWorkshop = async (item: WorkshopItem | any) => {
    try {
      await apiService.addWorkshop(item);
      await refreshWorkshops();
    } catch (err) {
      console.error('Error adding workshop:', err);
    }
  };
  const updateWorkshop = async (item: WorkshopItem | any) => {
    const cleanId = item.slug_id || item.slugId || item.id;
    try {
      await apiService.updateWorkshop(cleanId, item);
      await refreshWorkshops();
    } catch (err) {
      console.error('Error updating workshop:', err);
    }
    setWorkshops((prev) =>
      prev.map((w) => (w.id === item.id || (w as any).slug_id === cleanId ? { ...w, ...item } : w))
    );
  };
  const deleteWorkshop = async (id: string | number) => {
    try {
      await apiService.deleteWorkshop(id);
      await refreshWorkshops();
    } catch (err) {
      console.error('Error deleting workshop:', err);
    }
    setWorkshops((prev) => prev.filter((w) => String(w.id) !== String(id) && (w as any).slug_id !== String(id)));
  };

  // Meetings actions
  const addMeeting = async (item: MeetingItem | any) => {
    try {
      await apiService.addMeeting(item);
      await refreshMeetings();
    } catch (err) {
      console.error('Error adding meeting:', err);
    }
  };
  const updateMeeting = async (item: MeetingItem | any) => {
    const cleanId = item.slug_id || item.slugId || item.id;
    try {
      await apiService.updateMeeting(cleanId, item);
      await refreshMeetings();
    } catch (err) {
      console.error('Error updating meeting:', err);
    }
    setMeetings((prev) =>
      prev.map((m) => ((m.id === item.id || (m as any).slug_id === cleanId) ? { ...m, ...item } : m))
    );
  };
  const deleteMeeting = async (id: string | number) => {
    try {
      await apiService.deleteMeeting(id);
      await refreshMeetings();
    } catch (err) {
      console.error('Error deleting meeting:', err);
    }
    setMeetings(prev => prev.filter(m => String(m.id) !== String(id) && (m as any).slug_id !== String(id)));
  };

  // Ethics actions
  const addEthics = async (item: EthicsItem | any) => {
    try {
      await apiService.addEthics(item);
      await refreshEthics();
    } catch (err) {
      console.error('Error adding ethics item:', err);
    }
  };
  const updateEthics = async (item: EthicsItem | any) => {
    const cleanId = item.slug_id || item.slugId || item.id;
    try {
      await apiService.updateEthics(cleanId, item);
      await refreshEthics();
    } catch (err) {
      console.error('Error updating ethics item:', err);
    }
    setEthics((prev) =>
      prev.map((e) => ((e.id === item.id || (e as any).slug_id === cleanId) ? { ...e, ...item } : e))
    );
  };
  const deleteEthics = async (id: string | number) => {
    try {
      await apiService.deleteEthics(id);
      await refreshEthics();
    } catch (err) {
      console.error('Error deleting ethics item:', err);
    }
    setEthics((prev) => prev.filter((e) => String(e.id) !== String(id) && (e as any).slug_id !== String(id)));
  };

    // Submissions
  const addSubmission = async (item: Omit<SubmissionItem, 'id' | 'createdAt' | 'status'>) => {
    let newId = `sub-${Date.now()}`;
    try {
      const res = await apiService.addSubmission(item);
      if (res && res.data && (res.data.id || res.data._id)) {
        newId = String(res.data.id || res.data._id);
      }
    } catch (e) {
      console.warn('Backend API submission request warning:', e);
    }

    const newItem: SubmissionItem = {
      ...item,
      id: newId,
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: 'pending'
    };

    setSubmissions(prev => [newItem, ...(Array.isArray(prev) ? prev : [])]);

    // Immediately push to notifications state for instant notification badge and dropdown entry
    const notifInfo: Record<string, { category: NotificationItem['category'], titleAr: string, titleEn: string, icon: string, badgeColor: string }> = {
      whistleblowing: { category: 'whistleblowing', titleAr: 'بلاغ أو شكوى حوكمة جديدة', titleEn: 'New Whistleblowing Report', icon: 'alert-triangle', badgeColor: 'amber' },
      membership: { category: 'membership', titleAr: 'طلب انضمام للجمعية العمومية', titleEn: 'New Membership Application', icon: 'user-plus', badgeColor: 'emerald' },
      survey: { category: 'survey', titleAr: 'استبيان قياس رضا جديد', titleEn: 'New Survey Response', icon: 'smile', badgeColor: 'purple' },
      contact_message: { category: 'contact_message', titleAr: 'رسالة تواصل واردة جديدة', titleEn: 'New Contact Message', icon: 'mail', badgeColor: 'blue' },
      feedback: { category: 'feedback', titleAr: 'ملاحظة ومقترح وارد جديد', titleEn: 'New Feedback Submission', icon: 'message-square', badgeColor: 'indigo' },
    };
    const info = notifInfo[item.module] || { category: 'general', titleAr: 'إشعار جديد', titleEn: 'New Notification', icon: 'bell', badgeColor: 'gray' };

    const newNotifItem: NotificationItem = {
      id: newId,
      code: 'MSG-' + Math.floor(100000 + Math.random() * 900000),
      module: item.module,
      category: info.category,
      title: item.title || info.titleAr,
      titleAr: info.titleAr,
      titleEn: info.titleEn,
      message: item.details || (item.senderName ? 'وارد من: ' + item.senderName : ''),
      senderName: item.senderName || 'زائر',
      senderContact: item.senderContact || '',
      targetTab: 'submissions',
      icon: info.icon,
      badgeColor: info.badgeColor,
      status: 'pending',
      isRead: false,
      timeAgo: 'الآن',
      createdAt: newItem.createdAt,
    };

    setNotifications(prev => [newNotifItem, ...(Array.isArray(prev) ? prev : [])]);

    // Refresh from backend to sync persistent IDs
    try {
      await refreshSubmissions();
      await refreshNotifications();
    } catch {}
  };
  const updateSubmissionStatus = async (id: string, status: SubmissionItem['status']) => {
    await apiService.updateSubmissionStatus(id, status);
    await refreshSubmissions();
    setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status } : s));
  };
  const deleteSubmission = async (id: string | number) => {
    const cleanId = String(id).replace(/[^0-9]/g, '') || id;
    try {
      await apiService.deleteSubmission(cleanId);
      await refreshSubmissions();
    } catch (err) {
      console.error('Error deleting submission:', err);
    }
    setSubmissions((prev) => prev.filter((s) => String(s.id) !== String(id)));
  };

  // Dynamic Home Page Data States
  const STORAGE_HOME_HERO = 'shamel_home_hero_slides_v1';
  const STORAGE_HOME_ABOUT = 'shamel_home_about_v1';
  const STORAGE_HOME_STATS = 'shamel_home_stats_v1';
  const STORAGE_STRATEGIC_GOALS = 'shamel_strategic_goals_v1';
  const STORAGE_TESTIMONIALS = 'shamel_testimonials_v1';

  const [homeHeroSlides, setHomeHeroSlides] = useState<HeroSlideItem[]>(initialHomeHeroSlides);

  

  const updateHomeHeroSlides = async (slides: HeroSlideItem[]) => {
    setHomeHeroSlides(slides);
    try {
      await apiService.updateHomeSection('hero', slides);
      await refreshHomeContent();
    } catch (err) {
      console.error('Error updating home hero slides:', err);
    }
  };
  const addHomeHeroSlide = (slide: HeroSlideItem) => setHomeHeroSlides(prev => [...prev, slide]);
  const deleteHomeHeroSlide = (id: string) => setHomeHeroSlides(prev => prev.filter(s => s.id !== id));

  const [homeAboutData, setHomeAboutData] = useState<HomeAboutData>(initialHomeAboutData);

  

  const updateHomeAboutData = async (fields: Partial<HomeAboutData> | HomeAboutData) => {
    const updated = { ...homeAboutData, ...fields };
    setHomeAboutData(updated);
    try {
      await apiService.updateHomeSection('about', updated);
      await refreshHomeContent();
    } catch (err) {
      console.error('Error updating home about section:', err);
    }
  };

  const [homeStatsData, setHomeStatsData] = useState<HomeStatItem[]>(initialHomeStatsData);

  

  const updateHomeStatsData = async (stats: HomeStatItem[]) => {
    setHomeStatsData(stats);
    try {
      await apiService.updateHomeSection('stats', stats);
      await refreshHomeContent();
    } catch (err) {
      console.error('Error updating home stats:', err);
    }
  };

  const [strategicGoals, setStrategicGoals] = useState<StrategicGoalItem[]>(initialStrategicGoalItems);

  const addStrategicGoal = async (goal: StrategicGoalItem) => {
    const updated = [...strategicGoals, goal];
    setStrategicGoals(updated);
    try {
      await apiService.updateHomeSection('goals', updated);
      await refreshHomeContent();
    } catch (err) {
      console.error('Error adding strategic goal:', err);
    }
  };

  const updateStrategicGoal = async (goal: StrategicGoalItem) => {
    const updated = strategicGoals.map(g => g.id === goal.id ? goal : g);
    setStrategicGoals(updated);
    try {
      await apiService.updateHomeSection('goals', updated);
      await refreshHomeContent();
    } catch (err) {
      console.error('Error updating strategic goal:', err);
    }
  };

  const deleteStrategicGoal = async (id: number) => {
    const updated = strategicGoals.filter(g => g.id !== id);
    setStrategicGoals(updated);
    try {
      await apiService.updateHomeSection('goals', updated);
      await refreshHomeContent();
    } catch (err) {
      console.error('Error deleting strategic goal:', err);
    }
  };

  const [testimonials, setTestimonials] = useState<TestimonialItemModel[]>(initialTestimonialItems);

  

  const addTestimonial = (item: TestimonialItemModel) => setTestimonials(prev => [item, ...prev]);
  const updateTestimonial = (item: TestimonialItemModel) => setTestimonials(prev => prev.map(t => t.id === item.id ? item : t));
  const deleteTestimonial = (id: string) => setTestimonials(prev => prev.filter(t => t.id !== id));

  // Reset to Defaults
  const resetToDefaults = () => {
    setProjects(initialProjectsList);
    setGeneralAssemblyMembers(generalAssemblyMembersList);
    setPolicies(initialPolicies);
    setRegulations(initialRegulations);
    setFinancials(initialFinancials);
    setWorkshops(initialWorkshops);
    setMeetings(initialMeetings);
    setEthics(initialEthics);
    setSubmissions(initialSubmissions);
    setHomeHeroSlides(initialHomeHeroSlides);
    setHomeAboutData(initialHomeAboutData);
    setHomeStatsData(initialHomeStatsData);
    setStrategicGoals(initialStrategicGoalItems);
    setTestimonials(initialTestimonialItems);
  };

    const updateProjectsHeader = async (updated: ProjectsHeaderData): Promise<boolean> => {
    try {
      setProjectsHeader(updated);
      await apiService.updateHomeSection('projects_header', updated);
      await refreshHomeContent();
      return true;
    } catch (e) {
      console.error('Error updating projects header:', e);
      return false;
    }
  };

  return (
    <GovernanceDataContext.Provider
      value={{
        projectsHeader,
        updateProjectsHeader,
        boardIntro,
        updateBoardIntro,
        projects,
        addProject,
        updateProject,
        deleteProject,
        generalAssemblyMembers,
        boardMembers,
        executiveDirector,
        updateExecutiveDirector,
        addBoardMember,
        updateBoardMember,
        deleteBoardMember,
        galleryItems,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        addMember,
        updateMember,
        deleteMember,
        policies,
        regulations,
        financials,
        workshops,
        meetings,
        ethics,
        submissions,
        addPolicy,
        updatePolicy,
        deletePolicy,
        addRegulation,
        updateRegulation,
        deleteRegulation,
        addFinancial,
        updateFinancial,
        deleteFinancial,
        addWorkshop,
        updateWorkshop,
        deleteWorkshop,
        addMeeting,
        updateMeeting,
        deleteMeeting,
        addEthics,
        updateEthics,
        deleteEthics,
        addSubmission,
        updateSubmissionStatus,
        deleteSubmission,
        contactSettings,
        updateContactSettings,
        feedbackCards,
        updateFeedbackCards,
        addFeedbackCard,
        updateFeedbackCard,
        deleteFeedbackCard,
        homeHeroSlides,
        updateHomeHeroSlides,
        addHomeHeroSlide,
        deleteHomeHeroSlide,
        homeAboutData,
        updateHomeAboutData,
        homeStatsData,
        updateHomeStatsData,
        strategicGoals,
        addStrategicGoal,
        updateStrategicGoal,
        deleteStrategicGoal,
        testimonials,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        resetToDefaults
      }}
    >
      {children}
    </GovernanceDataContext.Provider>
  );
};

export const useGovernanceData = (): GovernanceContextType => {
  const context = useContext(GovernanceDataContext);
  if (!context) {
    throw new Error('useGovernanceData must be used within a GovernanceDataProvider');
  }
  return context;
};
