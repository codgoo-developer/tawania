import { BoardMember } from '../types';

export const boardGovernanceOverview = {
  text: {
    ar: "تدار الجمعية من قبل مجلس إدارة عدد أعضائه لا يقل عن خمسة أعضاء تنتخبهم الجمعية العمومية.\nومدة عضوية مجلس الإدارة الحالي ( الثانى) المنتخب أربع سنوات.\nويبلغ عدد أعضائه في دورته الحالية خمسة أعضاء لإدارة الجمعية\nفى خلال الفترة من 1443/6/22 هـ حــتــى 1447/6/22 هـ.",
    en: "The Cooperative is managed by a Board of Directors of no fewer than five members elected by the General Assembly.\nThe term of membership for the current (second) elected Board of Directors is four years.\nIt consists of five members in its current term to manage the society\nduring the period from 22/06/1443 AH to 22/06/1447 AH."
  },
  termPeriod: {
    ar: 'من 1443/6/22 هـ حــتــى 1447/6/22 هـ',
    en: 'From 22/06/1443 AH to 22/06/1447 AH'
  },
  totalMembers: 5,
  termDuration: '4 سنوات'
};

function avatarFor(name: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0B6B4F&color=fff&size=400&font-size=0.36&bold=true`;
}

export const boardMembersData: BoardMember[] = [
  {
    id: 'ali-ibrahim-al-sulami',
    name: {
      ar: 'أ / علي إبراهيم السليمي',
      en: 'Mr. Ali Ibrahim Al-Sulami'
    },
    role: {
      ar: 'رئيس مجلس الإدارة',
      en: 'Chairman of the Board'
    },
    titleBadge: {
      ar: 'رئيس مجلس الإدارة',
      en: 'Chairman'
    },
    order: 1,
    phone: '',
    email: '',
    adminEmail: 'info@shamil.org.sa',
    image: avatarFor('Ali Al-Sulami'),
    term: {
      ar: 'الدورة الانتخابية الحالية',
      en: 'Current Electoral Term'
    },
    bio: {
      ar: 'يرأس مجلس إدارة تعاونية الشامل متعددة الأغراض ويقود مسيرة التعاونية نحو تحقيق أهدافها الاستراتيجية.',
      en: 'Chairs the Board of Directors of AlShamel Multipurpose Cooperative, leading the cooperative toward its strategic objectives.'
    },
    committee: {
      ar: 'رئيس مجلس الإدارة',
      en: 'Chairman of the Board'
    },
    qualifications: []
  },
  {
    id: 'khalid-yousef-al-harbi',
    name: {
      ar: 'أ / خالد يوسف الحربي',
      en: 'Mr. Khalid Yousef Al-Harbi'
    },
    role: {
      ar: 'نائب رئيس مجلس الإدارة',
      en: 'Vice Chairman of the Board'
    },
    titleBadge: {
      ar: 'نائب رئيس مجلس الإدارة',
      en: 'Vice Chairman'
    },
    order: 2,
    phone: '',
    email: '',
    adminEmail: 'info@shamil.org.sa',
    image: avatarFor('Khalid Al-Harbi'),
    term: {
      ar: 'الدورة الانتخابية الحالية',
      en: 'Current Electoral Term'
    },
    bio: {
      ar: 'يشغل منصب نائب رئيس مجلس الإدارة، ويسهم في الإشراف على مسيرة التعاونية ومشاريعها.',
      en: 'Serves as Vice Chairman of the Board, contributing to the oversight of the cooperative and its enterprises.'
    },
    committee: {
      ar: 'نائب رئيس مجلس الإدارة',
      en: 'Vice Chairman of the Board'
    },
    qualifications: []
  },
  {
    id: 'mohammed-saud-al-harbi',
    name: {
      ar: 'أ / محمد سعود الحربي',
      en: 'Mr. Mohammed Saud Al-Harbi'
    },
    role: {
      ar: 'المشرف المالي',
      en: 'Financial Supervisor'
    },
    titleBadge: {
      ar: 'المشرف المالي',
      en: 'Financial Supervisor'
    },
    order: 3,
    phone: '',
    email: '',
    adminEmail: 'info@shamil.org.sa',
    image: avatarFor('Mohammed Al-Harbi'),
    term: {
      ar: 'الدورة الانتخابية الحالية',
      en: 'Current Electoral Term'
    },
    bio: {
      ar: 'يتولى الإشراف المالي على أعمال التعاونية ومتابعة الأداء المالي لمشاريعها.',
      en: 'Oversees the cooperative\'s financial matters and the financial performance of its enterprises.'
    },
    committee: {
      ar: 'المشرف المالي',
      en: 'Financial Supervisor'
    },
    qualifications: []
  },
  {
    id: 'salah-ibrahim-al-sulami',
    name: {
      ar: 'أ / صلاح إبراهيم السليمي',
      en: 'Mr. Salah Ibrahim Al-Sulami'
    },
    role: {
      ar: 'عضو مجلس الإدارة',
      en: 'Board Member'
    },
    titleBadge: {
      ar: 'عضو مجلس الإدارة',
      en: 'Board Member'
    },
    order: 4,
    phone: '',
    email: '',
    adminEmail: 'info@shamil.org.sa',
    image: avatarFor('Salah Al-Sulami'),
    term: {
      ar: 'الدورة الانتخابية الحالية',
      en: 'Current Electoral Term'
    },
    bio: {
      ar: 'عضو مجلس إدارة تعاونية الشامل متعددة الأغراض بعقلة الصقور.',
      en: 'Board Member of AlShamel Multipurpose Cooperative in Uglat Asugour.'
    },
    committee: {
      ar: 'عضو مجلس الإدارة',
      en: 'Board Member'
    },
    qualifications: []
  },
  {
    id: 'abdullah-saud-al-harbi',
    name: {
      ar: 'أ / عبدالله سعود محمد',
      en: 'Mr. Abdullah Saud Mohammed'
    },
    role: {
      ar: 'عضو مجلس الإدارة',
      en: 'Board Member'
    },
    titleBadge: {
      ar: 'عضو مجلس الإدارة',
      en: 'Board Member'
    },
    order: 5,
    phone: '',
    email: '',
    adminEmail: 'info@shamil.org.sa',
    image: avatarFor('Abdullah Al-Harbi'),
    term: {
      ar: 'الدورة الانتخابية الحالية',
      en: 'Current Electoral Term'
    },
    bio: {
      ar: 'عضو مجلس إدارة تعاونية الشامل متعددة الأغراض.',
      en: 'Board Member of AlShamel Multipurpose Cooperative.'
    },
    committee: {
      ar: 'عضو مجلس الإدارة',
      en: 'Board Member'
    },
    qualifications: []
  }
];

export const executiveDirector = {
  id: 'mohammed-dhawab-al-harbi',
  name: {
    ar: 'أ. محمد ذواب مفرح الحربي',
    en: 'Mr. Mohammed Dhawab Mufreh Al-Harbi'
  },
  role: {
    ar: 'المدير التنفيذي',
    en: 'Executive Director'
  },
  phone: '+966531389196',
  email: 'mohamad89196@gmail.com',
  image: avatarFor('Mohammed Al-Harbi Executive'),
  bio: {
    ar: 'يتولى المدير التنفيذي إدارة العمليات اليومية لتعاونية الشامل متعددة الأغراض والإشراف على تنفيذ خطط المجلس الاستراتيجية.',
    en: 'The Executive Director manages the day-to-day operations of AlShamel Multipurpose Cooperative and oversees execution of the Board\'s strategic plans.'
  }
};

export const boardCommitteesData = [
  {
    id: 'audit-risk',
    name: {
      ar: 'لجنة المراجعة وإدارة المخاطر',
      en: 'Audit & Risk Management Committee'
    },
    description: {
      ar: 'تتولى التحقق من سلامة ونزاهة التقارير المالية، مراقبة أنظمة الرقابة الداخلية، وضمان الامتثال لمتطلبات المركز الوطني والأنظمة التعاونية. يتشكل أعضاء اللجنة من بين أعضاء مجلس الإدارة.',
      en: 'Oversees the integrity of financial reporting, evaluates internal controls, and ensures compliance with NCNP regulatory mandates. Committee members are drawn from among the Board of Directors.'
    },
    members: []
  },
  {
    id: 'exec-invest',
    name: {
      ar: 'اللجنة التنفيذية والاستثمارية',
      en: 'Executive & Investment Committee'
    },
    description: {
      ar: 'دراسة الفرص الاستثمارية والمشاريع الجديدة، متابعة كفاءة التشغيل للمشاريع القائمة، وتقديم التوصيات للمجلس. يتشكل أعضاء اللجنة من بين أعضاء مجلس الإدارة.',
      en: 'Evaluates new investment feasibility, monitors operational performance across enterprise units, and advises the board. Committee members are drawn from among the Board of Directors.'
    },
    members: []
  },
  {
    id: 'nom-rewards',
    name: {
      ar: 'لجنة الترشيحات والمكافآت والحوكمة',
      en: 'Nominations, Remuneration & Governance Committee'
    },
    description: {
      ar: 'مراجعة معايير العضوية في المجلس، تطوير سياسات الحوكمة والإفصاح، وتحديث اللوائح المؤسسية بما يواكب أفضل الممارسات. يتشكل أعضاء اللجنة من بين أعضاء مجلس الإدارة.',
      en: 'Reviews board membership qualifications, establishes remuneration policies, and continuously advances institutional governance. Committee members are drawn from among the Board of Directors.'
    },
    members: []
  }
];
