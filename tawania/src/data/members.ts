import { MemberCategory } from '../types';

export const membersOverview = {
  generalAssemblyCount: '200+',
  totalSharesCount: '31,951',
  paidCapitalSAR: '3,195,100',
  parValuePerShare: '100 ريال سعودي',
  minimumShares: '10 أسهم',
  maximumSharesPercentage: '10% من إجمالي رأس المال',
  votingRule: {
    ar: 'لكل عضو صوت واحد في الجمعية العمومية مهما بلغ عدد أسهمه (وفقاً للمبادئ التعاونية الأصيلة)',
    en: 'Each member has one vote in the General Assembly regardless of share volume (True cooperative principle)'
  }
};

export const memberRightsData = [
  {
    title: { ar: 'حضور اجتماعات الجمعية العمومية', en: 'Attending General Assembly Meetings' },
    desc: { ar: 'المشاركة الفاعلة في مناقشة جدول الأعمال، الاستماع لتقارير مجلس الإدارة والمراجع الخارجي، والتصويت على القرارات.', en: 'Active participation in agenda deliberations, reviewing board & audit disclosures, and voting on resolutions.' }
  },
  {
    title: { ar: 'الترشح والانتخاب لعضوية مجلس الإدارة', en: 'Candidacy & Board Elections' },
    desc: { ar: 'حق الترشح لعضوية مجلس الإدارة ولجان الرقابة وفق الشروط والضوابط المنصوص عليها في اللائحة التنفيذية.', en: 'Right to run for board membership and audit committees per statutory requirements.' }
  },
  {
    title: { ar: 'الحصول على الأرباح وعائد المعاملات', en: 'Receiving Dividends & Patronage Refunds' },
    desc: { ar: 'الاستفادة من الأرباح السنوية الموزعة على الأسهم بالإضافة إلى عائد المعاملات مع مشاريع الجمعية.', en: 'Earning annual capital dividends and patronage refunds based on transactions with society enterprises.' }
  },
  {
    title: { ar: 'الاطلاع على القوائم المالية والتقارير', en: 'Access to Financial Statements' },
    desc: { ar: 'الحق في الاطلاع على الحسابات الختامية والتقارير الدورية وقرارات الإدارة.', en: 'Right to inspect annual closing accounts, periodical updates, and administrative resolutions.' }
  }
];

export const memberObligationsData = [
  {
    title: { ar: 'الالتزام باللائحة الأساسية وقرارات الجمعية', en: 'Adherence to Bylaws & Resolutions' },
    desc: { ar: 'التقيد بكافة الأنظمة واللوائح والقرارات الصادرة بصورة نظامية عن الجمعية العمومية ومجلس الإدارة.', en: 'Complying with all bylaws, governance manuals, and legally adopted resolutions.' }
  },
  {
    title: { ar: 'سداد قيمة الأسهم المكتتب بها', en: 'Timely Equity Fulfillment' },
    desc: { ar: 'دفع قيمة الأسهم التي تم الاكتتاب فيها في المواعيد المقررة ووفق الإجراءات البنكية المعتمدة.', en: 'Paying subscribed share values on time through authorized banking channels.' }
  },
  {
    title: { ar: 'التعامل مع مشاريع وخدمات الجمعية', en: 'Patronizing Cooperative Enterprises' },
    desc: { ar: 'دعم مسيرة الجمعية من خلال الاستفادة من مشاريعها التجارية والاستهلاكية والخدمية كأولوية.', en: 'Supporting the society by actively engaging with its commercial and retail ventures.' }
  },
  {
    title: { ar: 'تحديث البيانات الشخصية والبنكية', en: 'Updating Contact & Bank Data' },
    desc: { ar: 'إشعار أمانة الجمعية بأي تغيير في وسائل التواصل أو الحساب البنكي (IBAN) لاستلام الأرباح.', en: 'Notifying the society secretariat of any changes in contact details or IBAN accounts.' }
  }
];

export const subscriptionStepsData = [
  {
    stepNumber: '01',
    title: { ar: 'تعبئة استمارة الاكتتاب', en: 'Complete Application Form' },
    desc: { ar: 'تحميل وتعبئة استمارة طلب الانضمام الرسمية وإرفاق صورة الهوية الوطنية سارية المفعول.', en: 'Download and fill out the official membership form attaching a valid Saudi National ID.' }
  },
  {
    stepNumber: '02',
    title: { ar: 'مراجعة الطلب من لجنة العضوية', en: 'Membership Review Committee' },
    desc: { ar: 'تقوم اللجنة بمراجعة استيفاء الشروط النظامية المنصوص عليها في اللائحة الأساسية.', en: 'The committee verifies fulfillment of statutory criteria stipulated in society bylaws.' }
  },
  {
    stepNumber: '03',
    title: { ar: 'إيداع قيمة الأسهم المكتتب بها', en: 'Deposit Subscribed Equity' },
    desc: { ar: 'تحويل قيمة الأسهم في الحساب البنكي المعتمد للجمعية وإرسال إيصال السداد.', en: 'Transfer share value to the official AlShamel bank account and submit deposit slip.' }
  },
  {
    stepNumber: '04',
    title: { ar: 'إصدار شهادة الأسهم والعضوية', en: 'Issue Share Certificate' },
    desc: { ar: 'إصدار شهادة المساهمة الرسمية وقيد العضو في سجلات الجمعية والمركز الوطني.', en: 'Issuing accredited share certificate and registering member in official rosters.' }
  }
];
