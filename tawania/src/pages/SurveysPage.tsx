import { useToast } from '../context/ToastContext';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Smile,
  Send,
  AlertCircle,
  CheckCircle2,
  X,
  Star,
  ChevronDown,
  Users,
  Building2,
  Briefcase,
  HeartHandshake
} from 'lucide-react';
import { useI18n } from '../i18n';
import { useGovernanceData } from '../context/GovernanceDataContext';
import { PageHero } from '../components/layout/PageHero';

type SurveyTab = 'supporters' | 'assembly' | 'customers' | 'staff';

export const SurveysPage: React.FC = () => {
  const toast = useToast();
  const { locale } = useI18n();
  const { addSubmission } = useGovernanceData();
  const [searchParams, setSearchParams] = useSearchParams();

  // Tab State
  const tabFromUrl = searchParams.get('type') as SurveyTab;
  const activeTab: SurveyTab = ['supporters', 'assembly', 'customers', 'staff'].includes(tabFromUrl)
    ? tabFromUrl
    : 'supporters';

  const handleTabChange = (tab: SurveyTab) => {
    setSearchParams({ type: tab });
    setIsSubmitted(false);
    setErrors({});
  };

  // Google Account Simulation State
  const [userEmail, setUserEmail] = useState<string>(() => {
    try {
      return localStorage.getItem('google_form_simulated_email') || 'as6864886@gmail.com';
    } catch {
      return 'as6864886@gmail.com';
    }
  });
  const [isSwitchAccountOpen, setIsSwitchAccountOpen] = useState(false);
  const [newEmailInput, setNewEmailInput] = useState('');
  const [emailError, setEmailError] = useState('');

  // Status & Validation
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  // Switch Account Handler
  const handleSwitchAccount = (e: React.FormEvent) => {
    e.preventDefault();
    const email = newEmailInput.trim().toLowerCase();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('يرجى إدخال بريد إلكتروني صحيح');
      return;
    }
    setUserEmail(email);
    try {
      localStorage.setItem('google_form_simulated_email', email);
    } catch { }
    setIsSwitchAccountOpen(false);
    setNewEmailInput('');
    setEmailError('');
  };

  // ==========================================
  // FORM 1: SUPPORTERS SURVEY STATE
  // ==========================================
  const [selectedEntities, setSelectedEntities] = useState<string[]>([
    'مركز التنمية الاجتماعية بمحافظة الجموم'
  ]);
  const [otherEntityText, setOtherEntityText] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [howDiscovered, setHowDiscovered] = useState<string>('الحملات الدعائية');
  const [communicationMethod, setCommunicationMethod] = useState<string>('الجوال');
  const [supporterRatings, setSupporterRatings] = useState<{ [key: string]: number }>({
    degree: 5,
    style: 5,
    response: 5,
    reports: 5,
    expectations: 5,
    usage: 5,
    overall: 5
  });

  const toggleEntityCheckbox = (entity: string) => {
    if (selectedEntities.includes(entity)) {
      if (selectedEntities.length > 1) {
        setSelectedEntities(selectedEntities.filter((e) => e !== entity));
      }
    } else {
      setSelectedEntities([...selectedEntities, entity]);
    }
  };

  const handleSupporterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { [key: string]: string } = {};
    if (selectedEntities.length === 0) errs.selectedEntities = 'يرجى تحديد جهة واحدة على الأقل';
    if (selectedEntities.includes('جهات اخرى') && !otherEntityText.trim()) {
      errs.selectedEntities = 'يرجى كتابة اسم الجهة الأخرى';
    }
    if (!position.trim()) errs.position = 'يرجى إدخال المنصب الوظيفي';
    if (!howDiscovered.trim()) errs.howDiscovered = 'يرجى اختيار كيف تعرفت على الجمعية';
    if (!communicationMethod) errs.communicationMethod = 'يرجى اختيار طريقة التواصل مع الجمعية';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      toast.error('يرجى استكمال الحقول المطلوبة', 'تأكد من تعبئة كافة الحقول الإلزامية المشار إليها باللون الأحمر');
      setTimeout(() => {
        const firstErr = document.querySelector('[data-error="true"]');
        if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return;
    }

    setIsSubmitting(true);
    const code = `SURV-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceCode(code);
    const entitiesFormatted = selectedEntities
      .map((e) => (e === 'جهات اخرى' ? `جهات أخرى (${otherEntityText})` : e))
      .join(' ، ');

    const submissionData = {
      module: 'survey' as const,
      surveyCategory: 'supporters' as const,
      senderName: `جهة داعمة: ${entitiesFormatted} (${position})`,
      senderContact: `طريقة التواصل: ${communicationMethod} • البريد: ${userEmail}`,
      title: `استبيان قياس رضا الجهات الداعمة [${code}] - الرضا العام: ${supporterRatings.overall}/5`,
      details: `• البريد المرتبط: ${userEmail}\n• الجهات المحددة: ${entitiesFormatted}\n• المنصب الوظيفي: ${position}\n• طريقة التعرّف على الجمعية: ${howDiscovered}\n• طريقة التواصل المفضلة: ${communicationMethod}\n\n• نتائج التقييم المفصلة (من 5):\n- درجة التواصل: ${supporterRatings.degree}/5\n- أسلوب التواصل: ${supporterRatings.style}/5\n- الإجابة على الاستفسارات: ${supporterRatings.response}/5\n- وصول التقارير بشكل دوري: ${supporterRatings.reports}/5\n- تحقيق تطلعاتكم: ${supporterRatings.expectations}/5\n- صرف الدعم في مكانه الصحيح: ${supporterRatings.usage}/5\n- الرضا العام عن الجمعية: ${supporterRatings.overall}/5`,
      jsonData: {
        referenceCode: code,
        surveyType: 'supporters',
        entities: entitiesFormatted,
        position,
        howDiscovered,
        communicationMethod,
        ratings: supporterRatings,
        email: userEmail
      },
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: 'pending' as const
    };

    try {
      await addSubmission(submissionData);
      toast.success('تم إرسال استبيان الرضا بنجاح', `تم تسجيل تقييم الجهة الداعمة بنجاح برقم تتبع [${code}]`);
    } catch (err) {
      console.error('Error submitting supporter survey:', err);
    } finally {
      setIsSubmitting(false);
    }
    setIsSubmitted(true);
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  // ==========================================
  // FORM 2: ASSEMBLY MEMBERS SURVEY STATE
  // ==========================================
  const [assemblyMemberName, setAssemblyMemberName] = useState('عضو مساهم بالجمعية العمومية');
  const [assemblyRatings, setAssemblyRatings] = useState<{ [key: number]: number }>({
    1: 5,
    2: 5,
    3: 5,
    4: 5,
    5: 5,
    6: 5,
    7: 5
  });

  const assemblyQuestions = [
    'هل أهداف الجمعية واضحة ومحددة بشكل كاف',
    'ما مدى تقييمك لدرجة التواصل من الجمعية؟',
    'ما مدى تقييمك لأسلوب التواصل من الجمعية؟',
    'ما درجة الاجابة على طلباتكم واستفساراتكم ومقترحاتكم؟',
    'هل تقوم الجمعية باطلاعكم على إنجازاتها بشكل دوري',
    'ما مدى وصول تقارير الجمعية بشكل دوري لكم؟',
    'ما مدى رضاك بشكل عام عن الجمعية'
  ];

  const handleAssemblySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assemblyMemberName.trim()) {
      setErrors({ assemblyMemberName: 'اسم عضو الجمعية العمومية مطلوب' });
      toast.error('يرجى إدخال اسم العضو', 'اسم عضو الجمعية العمومية حقل إلزامي');
      setTimeout(() => {
        const firstErr = document.querySelector('[data-error="true"]');
        if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return;
    }

    setIsSubmitting(true);
    const code = `SURV-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceCode(code);

    const detailsStr = assemblyQuestions
      .map((q, idx) => `• ${q}: ${assemblyRatings[idx + 1] || 5}/5`)
      .join('\n');

    const submissionData = {
      module: 'survey' as const,
      surveyCategory: 'assembly' as const,
      senderName: `عضو الجمعية العمومية: ${assemblyMemberName}`,
      senderContact: `البريد: ${userEmail}`,
      title: `استبيان قياس رضا أعضاء الجمعية العمومية [${code}] - المرسل: ${assemblyMemberName}`,
      details: `• اسم عضو الجمعية العمومية: ${assemblyMemberName}\n• البريد المرتبط: ${userEmail}\n\n• تقييمات الاستبيان (من 5):\n${detailsStr}`,
      jsonData: {
        referenceCode: code,
        surveyType: 'assembly',
        memberName: assemblyMemberName,
        ratings: assemblyRatings,
        email: userEmail
      },
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: 'pending' as const
    };

    try {
      await addSubmission(submissionData);
      toast.success('تم إرسال الاستبيان بنجاح', `تم تسجيل تقييم عضو الجمعية العمومية بنجاح برقم تتبع [${code}]`);
    } catch (err) {
      console.error('Error submitting assembly survey:', err);
    } finally {
      setIsSubmitting(false);
    }
    setIsSubmitted(true);
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  // ==========================================
  // FORM 3: AL-RIDA CUSTOMERS SURVEY STATE
  // ==========================================
  const [customerRatings, setCustomerRatings] = useState<{ [key: number]: number }>({
    1: 5,
    2: 5,
    3: 5,
    4: 5,
    5: 5,
    6: 5,
    7: 5
  });

  const customerQuestions = [
    'مدى الاستفادة من خدمات تعاونية الرضا ؟',
    'مدى رضاك على حرص موظفي تعاونية الرضا على تقديم المساعدة',
    'مدى رضاك عن تلبية احتياجاتك عبر خدمات تعاونية الرضا',
    'مدى تقييمك لسرعة تلبية طلبك',
    'مدى رضاك على سرعة تواصل موظفي تعاونية الرضا معك',
    'مدى رضاك عن جودة خدمات تعاونية الرضا',
    'مدى رضاك بشكل عام عن تعاونية الرضا'
  ];

  const handleCustomerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const code = `SURV-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceCode(code);

    const detailsStr = customerQuestions
      .map((q, idx) => `• ${q}: ${customerRatings[idx + 1] || 5}/5`)
      .join('\n');

    const submissionData = {
      module: 'survey' as const,
      surveyCategory: 'customers' as const,
      senderName: `عميل تعاونية الرضا`,
      senderContact: `البريد: ${userEmail}`,
      title: `استبيان قياس رضا عملاء تعاونية الرضا [${code}] - تقييم عام: ${customerRatings[7] || 5}/5`,
      details: `• البريد المرتبط: ${userEmail}\n\n• نتائج تقييم خدمات تعاونية الرضا (من 5):\n${detailsStr}`,
      jsonData: {
        referenceCode: code,
        surveyType: 'customers',
        ratings: customerRatings,
        email: userEmail
      },
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: 'pending' as const
    };

    try {
      await addSubmission(submissionData);
      toast.success('تم إرسال استبيان الرضا بنجاح', `تم تسجيل تقييم عملاء تعاونية الرضا بنجاح برقم تتبع [${code}]`);
    } catch (err) {
      console.error('Error submitting customer survey:', err);
    } finally {
      setIsSubmitting(false);
    }
    setIsSubmitted(true);
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  // ==========================================
  // FORM 4: STAFF / EMPLOYEES SURVEY STATE
  // ==========================================
  const [departmentName, setDepartmentName] = useState('إدارة الحوكمة والامتثال');
  const [staffRatings, setStaffRatings] = useState<{ [key: number]: number }>(() => {
    const initial: { [key: number]: number } = {};
    for (let i = 1; i <= 37; i++) initial[i] = 5;
    return initial;
  });
  const [moraleState, setMoraleState] = useState<string>('مرتفعة');
  const [plannedDuration, setPlannedDuration] = useState<string>('من سنه الى سنتان');
  const [staffNotes, setStaffNotes] = useState('');

  const staffQuestions = [
    'يعتبر الراتب الأساسي الحالي الذي تتقاضاه مقارنة بزملائك في الجمعية مرضيا لك',
    'يعتبر الراتب الاساسي الحالي الذي تتقاضاه مقارنة بالسوق المحلي مرضيا لك',
    'يمثل الحافز السنوي حافزا معنويا لزيادة انتاجياتك',
    'يعتبر الحافز السنوي الذي تتقاضاه هذا العام عادلا ومرضيا لك',
    'يقوم مديرك المباشر بمناقشة ادائك خلال عملية التقييم ( توضيح نقاط الضعف وامكانية التطوير )',
    'النموذج الحالي المستخدم لتقييم الأداء يعتبر مناسبا لوظيفتك',
    'نتيجة تقييم الأداء الخاصة بك تعكس فعليا حقيقة أدائك بالعمل',
    'لديك ثقة بما يتم أخبارك او وعدك به من قبل الإدارة',
    'لديك الصلاحيات الكافية لاتخاذ القرار في حال تطلب موقعك الوظيفي لذلك .',
    'برأيك اعطاء الصلاحيات يزيد من الانتاجية',
    'تشعر بالامان الوظيفي في الجمعية',
    'لديك المعلومات / البيانات اللازمة للقيام بعملك على اكمل وجه',
    'لديك الثقة بان الجمعية تحافظ على الموظفين المتميزين بالعمل',
    'مديرك المباشر يتعامل معاك بعدالة كافية',
    'مديرك المباشر يتعامل معك بشفافية',
    'مديرك المباشر يقوم بتطوير أدائك ويزيد من خبراتك العملية',
    'افكارك وارائك تؤخذ بعين الاعتبار من قبل مديرك عند اتخاذه للقرارات',
    'مديرك المباشر يعاملك بإحترام',
    'تجد تقديرا من قبل مديريك في حال قيامك بعمل مميز أو إضافي',
    'يتم تزويدك بالتدريب المطلوب لاحتياجاتك الوظيفية',
    'التامين الصحي بالجمعية مناسب',
    'مفهوم العمل كفريق واحد بالجمعية واضح ومطبق',
    'سياسة الدوام المتبعة حاليا بالجمعية واضحة ومناسبة',
    'سياسة الباب المفتوح في الجمعية مطبقة ومفيده',
    'اهداف الجمعية والتي تطمح الادارة العليا الوصول اليها واضحة ومفهومة',
    'المزايا التي تقدمها الجمعية مناسبة مقارنة بشركات السوق المحلي ( تذاكر سفر – اجازات – السلف وغيرها..',
    'نظام البدلات ( السكن والمواصلات) والمطبق حاليا في الجمعية عادل ومناسب',
    'الخدمات التي تقدمها لك ادارة الموارد البشرية والشئون الادارية مرضية لك',
    'يوجد لك وصف وظيفي واضح ومكتوب ومتفق عليه مع مديرالمباشر',
    'تقوم الجمعية بتقديم المساعدة لك في حالة الظروف الشخصية الطارئة',
    'التحفيز غير المادي من قبل مديرك يزيد من إنتاجيتك',
    'مكان العمل الذي تعمل فيه يتميز بانه مريح وامن',
    'تعتقد ان عنصر التحدي موجود في عملك',
    'كمية العمل التي تطلب منك مقارنة بالوقت المتوفر تعتبر معقوله',
    'تستطيع ان تعبر عن رايك بحرية وبدون خوف من مديريك',
    'في حال وجود داعي للتواجد بعد ساعات العمل الرسمية فانك على اتم الاستعداد لذلك',
    'خلال العام الحالي لم افكر بترك العمل في الشركة'
  ];

  const handleStaffSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!departmentName.trim()) {
      setErrors({ departmentName: 'اسم المؤسسة او الإدارة مطلوب' });
      toast.error('يرجى إدخال اسم الإدارة', 'اسم الإدارة أو المؤسسة حقل إلزامي');
      setTimeout(() => {
        const firstErr = document.querySelector('[data-error="true"]');
        if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
      return;
    }

    setIsSubmitting(true);
    const code = `SURV-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceCode(code);

    const ratingsSum = (Object.values(staffRatings) as number[]).reduce((a: number, b: number) => a + b, 0);
    const avgRating = (ratingsSum / 37).toFixed(1);

    const submissionData = {
      module: 'survey' as const,
      surveyCategory: 'staff' as const,
      senderName: `موظف: ${departmentName}`,
      senderContact: `الإدارة: ${departmentName} • البريد: ${userEmail}`,
      title: `استبيان قياس رضا العاملين [${code}] - الإدارة: ${departmentName} (متوسط: ${avgRating}/5)`,
      details: `• اسم المؤسسة او الإدارة: ${departmentName}\n• البريد المرتبط: ${userEmail}\n• وصف المعنويات: ${moraleState}\n• المدة المتوقعة للاستمرار: ${plannedDuration}\n• ملاحظات إضافية: ${staffNotes || 'لا يوجد'}\n\n• متوسط التقييم العام (37 بنداً): ${avgRating}/5\n• أبرز إجابات البنود (من 5 - لا أوافق بشدة إلى أوافق بشدة):\n` +
        staffQuestions.slice(0, 10).map((q, idx) => `- ${q}: ${staffRatings[idx + 1]}/5`).join('\n') +
        `\n... و متبقي ${staffQuestions.length - 10} بنداً تقييمياً تم توثيقها بنجاح.`,
      jsonData: {
        referenceCode: code,
        surveyType: 'staff',
        department: departmentName,
        moraleState,
        plannedDuration,
        staffNotes,
        ratings: staffRatings,
        avgRating,
        email: userEmail
      },
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: 'pending' as const
    };

    try {
      await addSubmission(submissionData);
      toast.success('تم إرسال استبيان الرضا بنجاح', `تم تسجيل تقييم رضا الموظفين بنجاح برقم تتبع [${code}]`);
    } catch (err) {
      console.error('Error submitting staff survey:', err);
    } finally {
      setIsSubmitting(false);
    }
    setIsSubmitted(true);
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  // Reusable Rating Scale Render
  const renderRatingScale = (
    questionText: string,
    currentValue: number,
    setter: (val: number) => void,
    lowLabel: string = 'غير راضي',
    highLabel: string = 'راضي'
  ) => (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4">
      <label className="block text-sm sm:text-base font-bold text-[#12332B]">
        {questionText} <span className="text-red-500">*</span>
      </label>

      <div className="p-4 sm:p-5 bg-[#F8FAF8] rounded-2xl   space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-gray-500 px-1">
          <span className="text-red-600">{lowLabel}</span>
          <span className="text-[#095B42]">{highLabel}</span>
        </div>

        <div className="grid grid-cols-5 gap-2 sm:gap-4 items-center text-center">
          {[1, 2, 3, 4, 5].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => setter(val)}
              className={`p-3 sm:p-4 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${currentValue === val
                ? 'bg-[#095B42] text-white border-[#095B42] shadow-md scale-105'
                : 'bg-white text-gray-700 border-gray-200 hover:border-[#095B42]/50 hover:bg-emerald-50/50'
                }`}
            >
              <span className="font-mono font-black text-base sm:text-lg">{val}</span>
              <Star
                className={`w-3.5 h-3.5 ${currentValue === val ? 'fill-amber-300 text-amber-300' : 'text-gray-300'
                  }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 pb-20 bg-[#F7F8F6] min-h-screen">
      <PageHero
        badge="الاستبيانات وقياس الأداء"
        title="استبيانات قياس الرضا وتقييم الأداء"
        subtitle="قياس وتقييم درجة رضا المستفيدين وشركاء النجاح وأعضاء الجمعية للارتقاء بالخدمات"
        breadcrumbs={[
          { label: 'الاستبيانات' },
          {
            label:
              activeTab === 'supporters'
                ? 'رضا الجهات الداعمة'
                : activeTab === 'assembly'
                  ? 'رضا أعضاء العمومية'
                  : activeTab === 'customers'
                    ? 'رضا العملاء'
                    : 'رضا العاملين'
          }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Navigation Tabs Switcher */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-white p-2 rounded-3xlshadow-sm">
          <button
            type="button"
            onClick={() => handleTabChange('supporters')}
            className={`flex items-center justify-center gap-2 p-3 sm:p-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${activeTab === 'supporters'
              ? 'bg-[#095B42] text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
          >
            <HeartHandshake className="w-4 h-4 shrink-0" />
            <span>رضا الجهات الداعمة</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('assembly')}
            className={`flex items-center justify-center gap-2 p-3 sm:p-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${activeTab === 'assembly'
              ? 'bg-[#095B42] text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
          >
            <Users className="w-4 h-4 shrink-0" />
            <span>أعضاء العمومية</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('customers')}
            className={`flex items-center justify-center gap-2 p-3 sm:p-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${activeTab === 'customers'
              ? 'bg-[#095B42] text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
          >
            <Building2 className="w-4 h-4 shrink-0" />
            <span>عملاء التعاونية</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('staff')}
            className={`flex items-center justify-center gap-2 p-3 sm:p-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${activeTab === 'staff'
              ? 'bg-[#095B42] text-white shadow-md'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
          >
            <Briefcase className="w-4 h-4 shrink-0" />
            <span>رضا العاملين</span>
          </button>
        </div>

        {/* Google Simulated Header Banner */}
        <div className="bg-white rounded-3xl p-6 border-t-8 border-t-[#095B42] space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2 font-bold text-gray-700 dir-ltr">
              <span>{userEmail}</span>
              <button
                type="button"
                onClick={() => setIsSwitchAccountOpen(true)}
                className="text-[#095B42] hover:underline font-semibold cursor-pointer"
              >
                [تبديل الحساب]
              </button>
            </div>
            <span className="text-gray-400 font-medium">غير مشترك</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-gray-900">
            {activeTab === 'supporters' && 'استبيان قياس رضا الجهات الداعمة'}
            {activeTab === 'assembly' && 'استبيان قياس رضا أعضاء الجمعية العمومية'}
            {activeTab === 'customers' && 'استبيان قياس رضا عملاء تعاونية الرضا'}
            {activeTab === 'staff' && 'استبيان قياس رضا العاملين'}
          </h2>

          <p className="text-xs text-red-500 font-semibold">* تشير إلى أنّ السؤال مطلوب</p>
        </div>

        {/* Account Switch Modal */}
        {isSwitchAccountOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-5 border border-gray-200">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-base font-bold text-gray-900">تبديل حساب Google</h3>
                <button
                  type="button"
                  onClick={() => setIsSwitchAccountOpen(false)}
                  className="p-1 rounded-xl text-gray-400 hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSwitchAccount} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-gray-700">
                    أدخل البريد الإلكتروني الذي ترغب بربطه بالاستبيان:
                  </label>
                  <input
                    type="email"
                    value={newEmailInput}
                    onChange={(e) => setNewEmailInput(e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full text-xs google-form-input py-2.5 text-gray-900 font-mediumrounded-xl"
                  />
                  {emailError && (
                    <span className="text-[11px] text-red-500 font-semibold">{emailError}</span>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSwitchAccountOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-gray-600 rounded-xlhover:bg-gray-50"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white rounded-xl bg-[#095B42] hover:bg-[#064230]"
                  >
                    حفظ التبديل
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Success Confirmation View */}
        {isSubmitted ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#095B42]/20 shadow-xl text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-[#095B42] flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div className="space-y-2 max-w-lg mx-auto">
              <h3 className="text-2xl font-black text-gray-900">تم تسجيل إجابتك بنجاح!</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                نشكرك على مشاركتك في الاستبيان. تم توثيق ردودك وحفظها برقم مالي وإداري مرجعي.
              </p>
            </div>

            <div className="bg-[#F8FAF8] p-4 rounded-2xlinline-block font-mono text-sm font-bold text-[#095B42]">
              رقم المرجع: {referenceCode}
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="px-8 py-3 bg-[#095B42] text-white text-xs sm:text-sm font-bold rounded-2xl hover:bg-[#064230] shadow-md transition-all cursor-pointer"
              >
                إرسال رد آخر
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* ==========================================
                TAB 1: SUPPORTERS FORM
               ========================================== */}
            {activeTab === 'supporters' && (
              <form onSubmit={handleSupporterSubmit} className="space-y-6">
                {/* Entities Checkboxes */}
                <div
                  data-error={!!errors.selectedEntities}
                  className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4"
                >
                  <label className="block text-sm sm:text-base font-bold text-[#12332B]">
                    حدد الجهة : <span className="text-red-500">*</span>
                  </label>

                  <div className="space-y-3 pt-1">
                    {[
                      'مركز التنمية الاجتماعية بمحافظة الجموم',
                      'جمعية البر بمحافظة الجموم',
                      'لجنة التنمية الاجتماعية الأهلية بالجموم',
                      'مؤسسة الكريحي الخيرية',
                      'جهات اخرى'
                    ].map((entity) => (
                      <label
                        key={entity}
                        className="flex items-center gap-3 p-3.5 rounded-2xlhover:bg-[#F7F8F6] cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedEntities.includes(entity)}
                          onChange={() => toggleEntityCheckbox(entity)}
                          className="w-5 h-5 text-[#095B42] rounded border-gray-300 focus:ring-0 cursor-pointer"
                        />
                        <span className="text-xs sm:text-sm font-bold text-gray-800">{entity}</span>
                      </label>
                    ))}

                    {selectedEntities.includes('جهات اخرى') && (
                      <div className="pt-2 ps-8">
                        <input
                          type="text"
                          value={otherEntityText}
                          onChange={(e) => setOtherEntityText(e.target.value)}
                          placeholder="اكتب اسم الجهة الأخرى..."
                          className="w-full text-xs google-form-input py-2 text-gray-900 font-medium border-b border-gray-300 focus:border-[#095B42] outline-none"
                        />
                      </div>
                    )}
                  </div>

                  {errors.selectedEntities && (
                    <span className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.selectedEntities}
                    </span>
                  )}
                </div>

                {/* Position */}
                <div
                  data-error={!!errors.position}
                  className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xs space-y-3"
                >
                  <label className="block text-sm sm:text-base font-bold text-[#12332B]">
                    المنصب الوظيفي : <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="مثال: مدير الشراكات / مسؤول المسؤولية المجتمعية"
                    className="w-full text-xs sm:text-sm google-form-input py-2 text-[#12332B] font-medium border-b border-gray-300 focus:border-[#095B42] outline-none"
                  />
                  {errors.position && (
                    <span className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.position}
                    </span>
                  )}
                </div>

                {/* How Discovered */}
                <div
                  data-error={!!errors.howDiscovered}
                  className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xs space-y-3"
                >
                  <label className="block text-sm sm:text-base font-bold text-[#12332B]">
                    كيف تعرفت على الجمعية ؟ <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={howDiscovered}
                      onChange={(e) => setHowDiscovered(e.target.value)}
                      className="w-full text-xs sm:text-sm google-form-input py-2.5 text-[#12332B] font-medium bg-transparent cursor-pointer appearance-none pe-8"
                    >
                      <option value="الحملات الدعائية">الحملات الدعائية</option>
                      <option value="التلفزيون">التلفزيون</option>
                      <option value="الإذاعة">الإذاعة</option>
                      <option value="إعلانات الطرق">إعلانات الطرق</option>
                      <option value="المعارف والأصدقاء">المعارف والأصدقاء</option>
                      <option value="مواقع التواصل الإجتماعي">مواقع التواصل الإجتماعي</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-500 absolute end-2 top-3 pointer-events-none" />
                  </div>
                </div>

                {/* Communication Method */}
                <div
                  data-error={!!errors.communicationMethod}
                  className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4"
                >
                  <label className="block text-sm sm:text-base font-bold text-[#12332B]">
                    ماهي طريقة التواصل مع الجمعية : <span className="text-red-500">*</span>
                  </label>

                  <div className="space-y-3 pt-1">
                    {['الجوال', 'البريد الإلكتروني', 'التواصل المباشر'].map((method) => (
                      <label
                        key={method}
                        className="flex items-center gap-3 p-3.5 rounded-2xlhover:bg-[#F7F8F6] cursor-pointer transition-colors"
                      >
                        <input
                          type="radio"
                          name="commMethodGroup"
                          value={method}
                          checked={communicationMethod === method}
                          onChange={(e) => setCommunicationMethod(e.target.value)}
                          className="w-5 h-5 text-[#095B42] focus:ring-0 cursor-pointer"
                        />
                        <span className="text-xs sm:text-sm font-bold text-gray-800">{method}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* 7 Ratings */}
                {renderRatingScale('مدى تقييمك لدرجة التواصل مع الجمعية ؟', supporterRatings.degree, (v) => setSupporterRatings({ ...supporterRatings, degree: v }), 'غير راضي', 'راضي')}
                {renderRatingScale('مدى تقييمك لأسلوب التواصل :', supporterRatings.style, (v) => setSupporterRatings({ ...supporterRatings, style: v }), 'غير راضي', 'راضي')}
                {renderRatingScale('مدى درجة الإجابة على استفساراتكم وطلباتكم ؟', supporterRatings.response, (v) => setSupporterRatings({ ...supporterRatings, response: v }), 'غير راضي', 'راضي')}
                {renderRatingScale('مدى وصول تقارير الجمعية بشكل دوري لكم  ؟', supporterRatings.reports, (v) => setSupporterRatings({ ...supporterRatings, reports: v }), 'غير راضي', 'راضي')}
                {renderRatingScale('هل حققت الجمعية تطلعاتكم ؟', supporterRatings.expectations, (v) => setSupporterRatings({ ...supporterRatings, expectations: v }), 'غير راضي', 'راضي')}
                {renderRatingScale('هل تقوم الجمعية بصرف الدعم المقدم منكم في مكانه الصحيح ؟', supporterRatings.usage, (v) => setSupporterRatings({ ...supporterRatings, usage: v }), 'غير راضي', 'راضي')}
                {renderRatingScale('مدى رضائك عن التعامل مع الجمعية بشكل عام ؟', supporterRatings.overall, (v) => setSupporterRatings({ ...supporterRatings, overall: v }), 'غير راضي', 'راضي')}

                <div className="flex items-center justify-end pt-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 text-base font-bold text-white rounded-2xl bg-gradient-to-br from-[#095B42] to-[#064230] hover:brightness-110 shadow-lg cursor-pointer"
                  >
                    <span>إرسال الاستبيان</span>
                    <Send className="w-5 h-5 shrink-0" />
                  </button>
                </div>
              </form>
            )}

            {/* ==========================================
                TAB 2: GENERAL ASSEMBLY MEMBERS FORM
               ========================================== */}
            {activeTab === 'assembly' && (
              <form onSubmit={handleAssemblySubmit} className="space-y-6">
                {/* Member Name */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xs space-y-3">
                  <label className="block text-sm sm:text-base font-bold text-[#12332B]">
                    اسم عضو الجمعية العمومية <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={assemblyMemberName}
                    onChange={(e) => setAssemblyMemberName(e.target.value)}
                    placeholder="أدخل الاسم الثلاثي أو الرباعي..."
                    className="w-full text-xs sm:text-sm google-form-input py-2 text-[#12332B] font-medium border-b border-gray-300 focus:border-[#095B42] outline-none"
                  />
                  {errors.assemblyMemberName && (
                    <span className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.assemblyMemberName}
                    </span>
                  )}
                </div>

                {/* 7 Questions */}
                {assemblyQuestions.map((qText, idx) => (
                  <React.Fragment key={idx}>
                    {renderRatingScale(
                      `${qText}`,
                      assemblyRatings[idx + 1] || 5,
                      (v) => setAssemblyRatings({ ...assemblyRatings, [idx + 1]: v }),
                      idx === 1 || idx === 3 || idx === 4 || idx === 5 || idx === 6 ? 'غير راضي' : '1',
                      idx === 1 || idx === 3 || idx === 4 || idx === 5 || idx === 6 ? 'راضي' : '5'
                    )}
                  </React.Fragment>
                ))}

                <div className="flex items-center justify-end pt-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 text-base font-bold text-white rounded-2xl bg-gradient-to-br from-[#095B42] to-[#064230] hover:brightness-110 shadow-lg cursor-pointer"
                  >
                    <span>إرسال الاستبيان</span>
                    <Send className="w-5 h-5 shrink-0" />
                  </button>
                </div>
              </form>
            )}

            {/* ==========================================
                TAB 3: AL-RIDA CUSTOMERS FORM
               ========================================== */}
            {activeTab === 'customers' && (
              <form onSubmit={handleCustomerSubmit} className="space-y-6">
                {customerQuestions.map((qText, idx) => (
                  <React.Fragment key={idx}>
                    {renderRatingScale(
                      `${qText}`,
                      customerRatings[idx + 1] || 5,
                      (v) => setCustomerRatings({ ...customerRatings, [idx + 1]: v }),
                      'غير راضي جدا',
                      'راضي جدا'
                    )}
                  </React.Fragment>
                ))}

                <div className="flex items-center justify-end pt-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 text-base font-bold text-white rounded-2xl bg-gradient-to-br from-[#095B42] to-[#064230] hover:brightness-110 shadow-lg cursor-pointer"
                  >
                    <span>إرسال الاستبيان</span>
                    <Send className="w-5 h-5 shrink-0" />
                  </button>
                </div>
              </form>
            )}

            {/* ==========================================
                TAB 4: STAFF / EMPLOYEES FORM
               ========================================== */}
            {activeTab === 'staff' && (
              <form onSubmit={handleStaffSubmit} className="space-y-6">
                {/* Department Name */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xs space-y-3">
                  <label className="block text-sm sm:text-base font-bold text-[#12332B]">
                    اسم المؤسسة او الإدارة التابع لها الموظف <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={departmentName}
                    onChange={(e) => setDepartmentName(e.target.value)}
                    placeholder="مثال: إدارة التشغيل / الموارد البشرية / المالية..."
                    className="w-full text-xs sm:text-sm google-form-input py-2 text-[#12332B] font-medium border-b border-gray-300 focus:border-[#095B42] outline-none"
                  />
                  {errors.departmentName && (
                    <span className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.departmentName}
                    </span>
                  )}
                </div>

                {/* 37 Scale Rating Questions */}
                {staffQuestions.map((qText, idx) => (
                  <React.Fragment key={idx}>
                    {renderRatingScale(
                      `${idx + 1}. ${qText}`,
                      staffRatings[idx + 1] || 5,
                      (v) => setStaffRatings({ ...staffRatings, [idx + 1]: v }),
                      'لا أوافق بشدة',
                      'أوافق بشدة'
                    )}
                  </React.Fragment>
                ))}

                {/* Morale Status Question */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4">
                  <label className="block text-sm sm:text-base font-bold text-[#12332B]">
                    كيف تصف معنوياتك في العمل في هذا الوقت <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2.5">
                    {['مرتفعة', 'عادية', 'منخفضة'].map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-3 p-3.5 rounded-2xlhover:bg-[#F7F8F6] cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="moraleGroup"
                          value={opt}
                          checked={moraleState === opt}
                          onChange={(e) => setMoraleState(e.target.value)}
                          className="w-5 h-5 text-[#095B42] focus:ring-0 cursor-pointer"
                        />
                        <span className="text-xs sm:text-sm font-bold text-gray-800">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Planned Duration Question */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4">
                  <label className="block text-sm sm:text-base font-bold text-[#12332B]">
                    كم المدة التي تخطط للاستمرار بالعمل بالجمعية ( بنفس ظروف العمل الحالية ) <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2.5">
                    {[
                      'أقل من سنة',
                      'من سنه الى سنتان',
                      'من سنتان الى خمس سنوات',
                      'اكثر من 5 سنوات',
                      'لا أعرف'
                    ].map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-3 p-3.5 rounded-2xlhover:bg-[#F7F8F6] cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="durationGroup"
                          value={opt}
                          checked={plannedDuration === opt}
                          onChange={(e) => setPlannedDuration(e.target.value)}
                          className="w-5 h-5 text-[#095B42] focus:ring-0 cursor-pointer"
                        />
                        <span className="text-xs sm:text-sm font-bold text-gray-800">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xs space-y-3">
                  <label className="block text-sm sm:text-base font-bold text-[#12332B]">
                    أي ملاحظات اخرى
                  </label>
                  <textarea
                    rows={4}
                    value={staffNotes}
                    onChange={(e) => setStaffNotes(e.target.value)}
                    placeholder="اكتب أي مقترحات أو ملاحظات تود مشاركتها مع الإدارة..."
                    className="w-full text-xs sm:text-sm p-3.5rounded-2xl text-gray-900 font-medium outline-none focus:ring-2 focus:ring-[#095B42]"
                  />
                </div>

                <div className="flex items-center justify-end pt-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 text-base font-bold text-white rounded-2xl bg-gradient-to-br from-[#095B42] to-[#064230] hover:brightness-110 shadow-lg cursor-pointer"
                  >
                    <span>إرسال الاستبيان</span>
                    <Send className="w-5 h-5 shrink-0" />
                  </button>
                </div>
              </form>
            )}


          </div>
        )}
      </div>
    </div>
  );
};
