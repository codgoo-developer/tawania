import { useToast } from '../context/ToastContext';
import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Send,
  AlertCircle,
  CheckCircle2,
  X,
  FileText,
  UserCheck,
  User,
  Building2,
  Phone,
  Mail,
  Calendar,
  MapPin,
  HelpCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { useI18n } from '../i18n';
import { useGovernanceData } from '../context/GovernanceDataContext';
import { PageHero } from '../components/layout/PageHero';

export const WhistleblowingPage: React.FC = () => {
  const toast = useToast();
  const { locale } = useI18n();
  const { addSubmission } = useGovernanceData();

  // Step state
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);

  // User Account Simulation State
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

  // STEP 1 FIELDS: Reporter, Offender, Witnesses
  // Reporter
  const [reporterName, setReporterName] = useState('');
  const [reporterRole, setReporterRole] = useState('');
  const [reporterDept, setReporterDept] = useState('');
  const [reporterPhone, setReporterPhone] = useState('');
  const [reporterEmail, setReporterEmail] = useState('');
  const [reporterPoBox, setReporterPoBox] = useState('');

  // Offender
  const [offenderName, setOffenderName] = useState('');
  const [offenderRole, setOffenderRole] = useState('');
  const [offenderDept, setOffenderDept] = useState('');
  const [offenderPhone, setOffenderPhone] = useState('');

  // Witnesses
  const [witnessName, setWitnessName] = useState('');
  const [witnessRole, setWitnessRole] = useState('');
  const [witnessDept, setWitnessDept] = useState('');
  const [witnessPhone, setWitnessPhone] = useState('');

  // STEP 2 FIELDS: Violation Details & Declaration
  const [violationType, setViolationType] = useState('');
  const [violationDate, setViolationDate] = useState('');
  const [violationLocation, setViolationLocation] = useState('');
  const [violationEvidences, setViolationEvidences] = useState('');
  const [accomplices, setAccomplices] = useState('');
  const [otherDetails, setOtherDetails] = useState('');
  const [expectedOutcomes, setExpectedOutcomes] = useState('');
  const [declarationAgreed, setDeclarationAgreed] = useState(false);

  // Status & Validation
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
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
    } catch {}
    setIsSwitchAccountOpen(false);
    setNewEmailInput('');
    setEmailError('');
  };

  // Validate Step 1
  const validateStep1 = () => {
    const errs: { [key: string]: string } = {};
    if (!reporterPhone.trim()) errs.reporterPhone = 'رقم الهاتف مطلوب لمقدم البلاغ';
    if (!reporterEmail.trim()) errs.reporterEmail = 'البريد الالكتروني مطلوب لمقدم البلاغ';
    
    if (!offenderName.trim()) errs.offenderName = 'اسم مرتكب المخالفة مطلوب';
    if (!offenderRole.trim()) errs.offenderRole = 'الدور الوظيفي لمرتكب المخالفة مطلوب';
    if (!offenderDept.trim()) errs.offenderDept = 'إدارة مرتكب المخالفة مطلوبة';
    if (!offenderPhone.trim()) errs.offenderPhone = 'رقم هاتف مرتكب المخالفة مطلوب';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Validate Step 2
  const validateStep2 = () => {
    const errs: { [key: string]: string } = {};
    if (!violationType.trim()) errs.violationType = 'طبيعة ونوع المخالفة مطلوب';
    if (!violationDate.trim()) errs.violationDate = 'تاريخ ارتكاب المخالفة وتاريخ العلم بها مطلوب';
    if (!violationLocation.trim()) errs.violationLocation = 'مكان حدوث المخالفة مطلوب';
    if (!violationEvidences.trim()) errs.violationEvidences = 'بيانات أو مستندات تثبيت ارتكاب المخالفة مطلوبة';
    if (!accomplices.trim()) errs.accomplices = 'أسماء الأشخاص الآخرين المشتركين مطلوبة';
    if (!expectedOutcomes.trim()) errs.expectedOutcomes = 'النتائج المتوقعة من البلاغ مطلوبة';
    if (!declarationAgreed) errs.declarationAgreed = 'يجب الإقرار بصحة البيانات وموافقتك للبدء في إجراءات البلاغ';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 200, behavior: 'smooth' });
    } else {
      const firstErr = document.querySelector('[data-error="true"]');
      if (firstErr) {
        firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) {
      const firstErr = document.querySelector('[data-error="true"]');
      if (firstErr) {
        firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const code = `WB-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceCode(code);

    const submissionData = {
      module: 'whistleblowing' as const,
      senderName: reporterName.trim() || 'مُبلّغ بهوية مجهولة',
      senderContact: `الهاتف: ${reporterPhone} • البريد: ${reporterEmail}`,
      title: `بلاغ عن مخالفة [${code}]: ${violationType}`,
      details: `• معلومات مقدم البلاغ: ${reporterName || 'مجهول'} | وظيفة: ${reporterRole || '-'} | إدارة: ${reporterDept || '-'} | هاتف: ${reporterPhone} | بريد: ${reporterEmail} | ص.ب: ${reporterPoBox || '-'}\n\n• معلومات مرتكب المخالفة: ${offenderName} | وظيفة: ${offenderRole} | إدارة: ${offenderDept} | هاتف: ${offenderPhone}\n\n• معلومات الشهود: ${witnessName || 'لا يوجد'} | وظيفة: ${witnessRole || '-'} | إدارة: ${witnessDept || '-'} | هاتف: ${witnessPhone || '-'}\n\n• تفاصيل المخالفة:\n- نوع المخالفة: ${violationType}\n- التاريخ: ${violationDate}\n- المكان: ${violationLocation}\n- أدلة ومستندات: ${violationEvidences}\n- المشتركون الآخرون: ${accomplices}\n- تفاصيل أخرى: ${otherDetails || '-'}\n- النتائج المتوقعة: ${expectedOutcomes}\n\n• الإقرار: تم الإقرار والتعهد بصحة البيانات الواردة.`,
      jsonData: {
        referenceCode: code,
        reporter: {
          name: reporterName,
          role: reporterRole,
          dept: reporterDept,
          phone: reporterPhone,
          email: reporterEmail,
          poBox: reporterPoBox
        },
        offender: {
          name: offenderName,
          role: offenderRole,
          dept: offenderDept,
          phone: offenderPhone
        },
        witness: {
          name: witnessName,
          role: witnessRole,
          dept: witnessDept,
          phone: witnessPhone
        },
        violation: {
          type: violationType,
          date: violationDate,
          location: violationLocation,
          evidences: violationEvidences,
          accomplices: accomplices,
          otherDetails: otherDetails,
          expectedOutcomes: expectedOutcomes,
          declarationAgreed: declarationAgreed
        }
      },
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      status: 'pending' as const
    };

    // Save to context and MySQL API endpoint
    try {
      await addSubmission(submissionData);
      toast.success(
        'تم إرسال البلاغ بنجاح',
        `تم تسجيل وحفظ البلاغ السري برقم تتبع [${code}] بنجاح في قاعدة البيانات`
      );
    } catch (err) {
      console.error('Error submitting whistleblowing form:', err);
    }

    setIsSubmitted(true);
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 pb-20 bg-[#F7F8F6] min-h-screen">
      <PageHero
        badge="النزاهة والحوكمة"
        title="نموذج الإبلاغ عن مخالفة"
        subtitle="قناة اتصال آمنة وسرية ومستقلة للإبلاغ عن أي مخالفات مالية أو إدارية في تعاونية الشامل"
        breadcrumbs={[
          { label: 'الحوكمة' },
          { label: 'الشكاوى' },
          { label: 'الإبلاغ عن المخالفات' }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Google Form Simulation Header Banner */}
        <div className="bg-gradient-to-br from-[#095B42] to-[#064230] text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden mb-6 border border-[#0B6B4F]">
          <div className="relative z-10 space-y-3 text-center sm:text-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-amber-300 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>سرية تامة ومحمية بموجب اللوائح</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              نموذج إبلاغ عن مخالفة
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
              تضمن الجمعية السرية التامة لهوية المُبلّغ وحمايته الكاملة. يرجى استكمال البيانات بدقة.
            </p>
          </div>
        </div>

        {/* Google Form Account Bar Strip */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#12332B]/10 shadow-2xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#525E59]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#095B42]/10 flex items-center justify-center text-[#095B42] font-bold text-xs uppercase">
              {userEmail ? userEmail.slice(0, 2) : 'AS'}
            </div>
            <div>
              <span className="font-semibold text-[#12332B]">{userEmail}</span>
              <button
                type="button"
                onClick={() => {
                  setNewEmailInput(userEmail);
                  setEmailError('');
                  setIsSwitchAccountOpen(true);
                }}
                className="text-[#095B42] hover:underline hover:text-[#064230] font-bold cursor-pointer ms-2.5 transition-colors inline-block"
              >
                تبديل الحساب
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-600 font-medium text-[11px]">
              غير مشترك
            </span>
            <span className="text-red-500 font-bold text-xs">
              * تشير إلى أنّ السؤال مطلوب
            </span>
          </div>
        </div>

        {/* Step Indicator */}
        {!isSubmitted && (
          <div className="flex items-center justify-between bg-white rounded-2xl p-4 border border-gray-200/80 mb-6 shadow-2xs">
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  currentStep === 1 ? 'bg-[#095B42] text-white' : 'bg-emerald-100 text-[#095B42]'
                }`}
              >
                1
              </div>
              <span className={`text-xs font-bold ${currentStep === 1 ? 'text-[#095B42]' : 'text-gray-500'}`}>
                البيانات الأساسية والأطراف
              </span>
            </div>

            <div className="h-0.5 w-12 bg-gray-200" />

            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                  currentStep === 2 ? 'bg-[#095B42] text-white' : 'bg-gray-100 text-gray-400'
                }`}
              >
                2
              </div>
              <span className={`text-xs font-bold ${currentStep === 2 ? 'text-[#095B42]' : 'text-gray-400'}`}>
                تفاصيل المخالفة والإقرار
              </span>
            </div>
          </div>
        )}

        {/* Switch Account Modal */}
        {isSwitchAccountOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 space-y-5 border border-gray-100 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 text-xs font-bold">
                    G
                  </div>
                  <h3 className="font-bold text-base text-gray-900">
                    تبديل حساب Google
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSwitchAccountOpen(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed">
                أدخل البريد الإلكتروني الذي ترغب بربطه بنموذج الإبلاغ عن مخالفة:
              </p>

              <form onSubmit={handleSwitchAccount} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    البريد الإلكتروني (Google Account)
                  </label>
                  <input
                    type="email"
                    required
                    value={newEmailInput}
                    onChange={(e) => {
                      setNewEmailInput(e.target.value);
                      setEmailError('');
                    }}
                    placeholder="example@gmail.com"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-gray-300 focus:border-[#095B42] focus:ring-2 focus:ring-[#095B42]/10 outline-none dir-ltr"
                    autoFocus
                  />
                  {emailError && (
                    <p className="text-red-500 text-[11px] font-semibold mt-1">
                      {emailError}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsSwitchAccountOpen(false)}
                    className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-[#095B42] to-[#064230] hover:brightness-110 rounded-xl shadow-xs cursor-pointer"
                  >
                    تأكيد التبديل
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Success State */}
        {isSubmitted ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-[#095B42]/20 shadow-lg text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-[#EBF4F0] text-[#095B42] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#095B42] uppercase tracking-wider">
                تم حفظ وإرسال البلاغ بنجاح
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#12332B]">
                شكراً لمشاركتك وتعاونك
              </h2>
              <p className="text-sm text-[#68736F] max-w-lg mx-auto leading-relaxed">
                تم تسجيل بلاغك في النظام وتوجيهه مباشرة للجنة المراجعة والنزاهة تحت رقم مرجعي سري.
              </p>
            </div>

            {/* Reference Box */}
            <div className="bg-[#F8FAF8] rounded-2xl p-6 border border-[#12332B]/10 max-w-lg mx-auto text-start space-y-3 text-sm">
              <div className="flex justify-between items-center pb-3 border-b border-[#12332B]/10">
                <span className="text-xs text-gray-500 font-bold">الرقم المرجعي للبلاغ:</span>
                <span className="font-mono font-black text-[#095B42] text-lg">{referenceCode}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600">نوع المخالفة:</span>
                <span className="font-bold text-[#12332B]">{violationType}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-600">المرتكب المسجل:</span>
                <span className="font-bold text-[#12332B]">{offenderName}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(1);
                setReporterName('');
                setReporterPhone('');
                setReporterEmail('');
                setOffenderName('');
                setOffenderPhone('');
                setViolationEvidences('');
                setExpectedOutcomes('');
              }}
              className="px-6 py-3 rounded-full bg-[#095B42] text-white font-bold text-xs hover:bg-[#064230] transition-colors cursor-pointer"
            >
              تقديم بلاغ جديد
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* STEP 1: REPORTER, OFFENDER, WITNESSES */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* SECTION 1: معلومات مقدم البلاغ */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#12332B]/10 shadow-2xs space-y-5">
                  <div className="border-b border-gray-100 pb-4">
                    <h2 className="text-lg font-black text-[#12332B] flex items-center gap-2">
                      <User className="w-5 h-5 text-[#095B42]" />
                      <span>معلومات مقدم البلاغ</span>
                    </h2>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      (يمكن عدم تعبئة هذا الجزء إذا لم يرغب مقدم البلاغ بكشف هويته ولكن يجب عليه تدوين بيانات مثل الهاتف / البريد الالكتروني)
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#12332B] mb-2">
                        الاسم
                      </label>
                      <input
                        type="text"
                        value={reporterName}
                        onChange={(e) => setReporterName(e.target.value)}
                        placeholder="اختياري (مثال: محمد العمري)"
                        className="w-full text-xs sm:text-sm google-form-input py-2 text-[#12332B] font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#12332B] mb-2">
                        الدور الوظيفي
                      </label>
                      <input
                        type="text"
                        value={reporterRole}
                        onChange={(e) => setReporterRole(e.target.value)}
                        placeholder="اختياري (مثال: موظف / مساهم)"
                        className="w-full text-xs sm:text-sm google-form-input py-2 text-[#12332B] font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#12332B] mb-2">
                        الإدارة
                      </label>
                      <input
                        type="text"
                        value={reporterDept}
                        onChange={(e) => setReporterDept(e.target.value)}
                        placeholder="اختياري (مثال: المبيعات)"
                        className="w-full text-xs sm:text-sm google-form-input py-2 text-[#12332B] font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#12332B] mb-2">
                        معلومات صندوق البريد
                      </label>
                      <input
                        type="text"
                        value={reporterPoBox}
                        onChange={(e) => setReporterPoBox(e.target.value)}
                        placeholder="اختياري"
                        className="w-full text-xs sm:text-sm google-form-input py-2 text-[#12332B] font-medium"
                      />
                    </div>
                    <div data-error={!!errors.reporterPhone}>
                      <label className="block text-xs font-bold text-[#12332B] mb-2">
                        رقم الهاتف <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={reporterPhone}
                        onChange={(e) => setReporterPhone(e.target.value)}
                        placeholder="05xxxxxxxx"
                        className="w-full text-xs sm:text-sm google-form-input py-2 text-[#12332B] font-mono font-bold"
                      />
                      {errors.reporterPhone && (
                        <span className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.reporterPhone}
                        </span>
                      )}
                    </div>
                    <div data-error={!!errors.reporterEmail}>
                      <label className="block text-xs font-bold text-[#12332B] mb-2">
                        البريد الالكتروني <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        value={reporterEmail}
                        onChange={(e) => setReporterEmail(e.target.value)}
                        placeholder="example@gmail.com"
                        className="w-full text-xs sm:text-sm google-form-input py-2 text-[#12332B] font-mono dir-ltr"
                      />
                      {errors.reporterEmail && (
                        <span className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.reporterEmail}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* SECTION 2: معلومات مرتكب المخالفة */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#12332B]/10 shadow-2xs space-y-5">
                  <div className="border-b border-gray-100 pb-4">
                    <h2 className="text-lg font-black text-[#12332B] flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <span>معلومات مرتكب المخالفة</span>
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div data-error={!!errors.offenderName}>
                      <label className="block text-xs font-bold text-[#12332B] mb-2">
                        الاسم <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={offenderName}
                        onChange={(e) => setOffenderName(e.target.value)}
                        placeholder="اسم الشخص المشتبه به"
                        className="w-full text-xs sm:text-sm google-form-input py-2 text-[#12332B] font-medium"
                      />
                      {errors.offenderName && (
                        <span className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.offenderName}
                        </span>
                      )}
                    </div>

                    <div data-error={!!errors.offenderRole}>
                      <label className="block text-xs font-bold text-[#12332B] mb-2">
                        الدور الوظيفي <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={offenderRole}
                        onChange={(e) => setOffenderRole(e.target.value)}
                        placeholder="مثال: مدير مشتريات / محاسب"
                        className="w-full text-xs sm:text-sm google-form-input py-2 text-[#12332B] font-medium"
                      />
                      {errors.offenderRole && (
                        <span className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.offenderRole}
                        </span>
                      )}
                    </div>

                    <div data-error={!!errors.offenderDept}>
                      <label className="block text-xs font-bold text-[#12332B] mb-2">
                        الإدارة <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={offenderDept}
                        onChange={(e) => setOffenderDept(e.target.value)}
                        placeholder="مثال: الإدارة المالية"
                        className="w-full text-xs sm:text-sm google-form-input py-2 text-[#12332B] font-medium"
                      />
                      {errors.offenderDept && (
                        <span className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.offenderDept}
                        </span>
                      )}
                    </div>

                    <div data-error={!!errors.offenderPhone}>
                      <label className="block text-xs font-bold text-[#12332B] mb-2">
                        رقم الهاتف <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={offenderPhone}
                        onChange={(e) => setOffenderPhone(e.target.value)}
                        placeholder="05xxxxxxxx"
                        className="w-full text-xs sm:text-sm google-form-input py-2 text-[#12332B] font-mono font-bold"
                      />
                      {errors.offenderPhone && (
                        <span className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> {errors.offenderPhone}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* SECTION 3: معلومات الشهود إن وجدوا */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#12332B]/10 shadow-2xs space-y-5">
                  <div className="border-b border-gray-100 pb-4">
                    <h2 className="text-lg font-black text-[#12332B] flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-[#095B42]" />
                      <span>معلومات الشهود إن وجدوا</span>
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">اختياري</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-[#12332B] mb-2">
                        الاسم
                      </label>
                      <input
                        type="text"
                        value={witnessName}
                        onChange={(e) => setWitnessName(e.target.value)}
                        placeholder="اسم الشاهد إن وجد"
                        className="w-full text-xs sm:text-sm google-form-input py-2 text-[#12332B] font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#12332B] mb-2">
                        الدور الوظيفي
                      </label>
                      <input
                        type="text"
                        value={witnessRole}
                        onChange={(e) => setWitnessRole(e.target.value)}
                        placeholder="الوظيفة"
                        className="w-full text-xs sm:text-sm google-form-input py-2 text-[#12332B] font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#12332B] mb-2">
                        الإدارة
                      </label>
                      <input
                        type="text"
                        value={witnessDept}
                        onChange={(e) => setWitnessDept(e.target.value)}
                        placeholder="الإدارة"
                        className="w-full text-xs sm:text-sm google-form-input py-2 text-[#12332B] font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#12332B] mb-2">
                        رقم الهاتف
                      </label>
                      <input
                        type="tel"
                        value={witnessPhone}
                        onChange={(e) => setWitnessPhone(e.target.value)}
                        placeholder="05xxxxxxxx"
                        className="w-full text-xs sm:text-sm google-form-input py-2 text-[#12332B] font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 1 Next Button */}
                <div className="flex items-center justify-end pt-4">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-2 bg-[#095B42] hover:bg-[#064230] text-white font-bold text-sm px-8 py-3.5 rounded-2xl shadow-md transition-all cursor-pointer"
                  >
                    <span>التالي</span>
                    <ArrowLeft className="w-4 h-4 dir-rtl:rotate-180" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: VIOLATION DETAILS & DECLARATION */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#12332B]/10 shadow-2xs space-y-5">
                  <div className="border-b border-gray-100 pb-4">
                    <h2 className="text-lg font-black text-[#12332B] flex items-center gap-2">
                      <FileText className="w-5 h-5 text-[#095B42]" />
                      <span>تفاصيل المخالفة</span>
                    </h2>
                  </div>

                  {/* 1. طبيعة ونوع المخالفة */}
                  <div data-error={!!errors.violationType}>
                    <label className="block text-xs font-bold text-[#12332B] mb-2">
                      طبيعة و نوع المخالفة <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={violationType}
                      onChange={(e) => setViolationType(e.target.value)}
                      placeholder="إجابتك (مثال: مخالفات مالية / تعارض مصالح / رشوة / فساد إداري)"
                      className="w-full text-xs sm:text-sm google-form-input py-2 text-[#12332B] font-medium"
                    />
                    {errors.violationType && (
                      <span className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.violationType}
                      </span>
                    )}
                  </div>

                  {/* 2. تاريخ ارتكاب المخالفة وتاريخ العلم بها (مع التقسيم التلقائي والتقويم) */}
                  <div data-error={!!errors.violationDate}>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-[#12332B]">
                        تاريخ ارتكاب المخالفة و تاريخ العلم بها <span className="text-red-500">*</span>
                      </label>
                      <span className="text-[11px] text-[#095B42] font-bold">هجري أو ميلادي</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={violationDate}
                          maxLength={14}
                          onChange={(e) => {
                            const inputVal = e.target.value;
                            if (inputVal.length < violationDate.length) {
                              setViolationDate(inputVal);
                              return;
                            }
                            const cleanDigits = inputVal.replace(/[^0-9]/g, '').slice(0, 8);
                            const suffix = inputVal.includes('هـ') ? ' هـ' : inputVal.includes('م') ? ' م' : '';
                            
                            let formatted = '';
                            if (cleanDigits.length > 0) {
                              formatted = cleanDigits.slice(0, 2);
                              if (cleanDigits.length >= 2) {
                                formatted += '/';
                                if (cleanDigits.length > 2) {
                                  formatted += cleanDigits.slice(2, 4);
                                  if (cleanDigits.length >= 4) {
                                    formatted += '/';
                                    if (cleanDigits.length > 4) {
                                      formatted += cleanDigits.slice(4, 8);
                                    }
                                  }
                                }
                              }
                            }
                            setViolationDate(formatted + suffix);
                          }}
                          placeholder="DD / MM / YYYY (أدخل الأرقام وتظهر الفواصل آلياً)"
                          className="w-full text-xs sm:text-sm google-form-input py-2 text-[#12332B] font-mono font-medium tracking-wider"
                        />
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <input
                          type="date"
                          onChange={(e) => {
                            if (e.target.value) {
                              const [y, m, d] = e.target.value.split('-');
                              setViolationDate(`${d}/${m}/${y} م`);
                            }
                          }}
                          className="px-3 py-1.5 rounded-xl border border-gray-300 text-xs font-bold text-[#095B42] bg-gray-50 hover:bg-[#EBF4F0] focus:border-[#095B42] outline-none cursor-pointer transition-colors"
                          title="اختر من التقويم"
                        />
                      </div>
                    </div>

                    {errors.violationDate && (
                      <span className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.violationDate}
                      </span>
                    )}
                  </div>

                  {/* 3. مكان حدوث المخالفة */}
                  <div data-error={!!errors.violationLocation}>
                    <label className="block text-xs font-bold text-[#12332B] mb-2">
                      مكان حدوث المخالفة <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={violationLocation}
                      onChange={(e) => setViolationLocation(e.target.value)}
                      placeholder="مثال: الإدارة المالية / الفرع الرئيسي / مجمع الثلاجة"
                      className="w-full text-xs sm:text-sm google-form-input py-2 text-[#12332B] font-medium"
                    />
                    {errors.violationLocation && (
                      <span className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.violationLocation}
                      </span>
                    )}
                  </div>

                  {/* 4. بيانات أو مستندات تثبيت ارتكاب المخالفة */}
                  <div data-error={!!errors.violationEvidences}>
                    <label className="block text-xs font-bold text-[#12332B] mb-2">
                      بيانات او مستندات تثبيت ارتكاب المخالفة <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      value={violationEvidences}
                      onChange={(e) => setViolationEvidences(e.target.value)}
                      placeholder="اذكر الفواتير، البريد الإلكتروني، العقود أو الفيديوهات الدالة"
                      className="w-full text-xs sm:text-sm border border-gray-300 rounded-xl p-3 focus:border-[#095B42] outline-none font-medium resize-none"
                    />
                    {errors.violationEvidences && (
                      <span className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.violationEvidences}
                      </span>
                    )}
                  </div>

                  {/* 5. أسماء أشخاص آخرين اشتركوا في ارتكاب المخالفة */}
                  <div data-error={!!errors.accomplices}>
                    <label className="block text-xs font-bold text-[#12332B] mb-2">
                      أسماء أشخاص آخرين اشتركوا في ارتكاب المخالفة <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={accomplices}
                      onChange={(e) => setAccomplices(e.target.value)}
                      placeholder="اذكر الأسماء أو اكتب لا يوجد"
                      className="w-full text-xs sm:text-sm google-form-input py-2 text-[#12332B] font-medium"
                    />
                    {errors.accomplices && (
                      <span className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.accomplices}
                      </span>
                    )}
                  </div>

                  {/* 6. معلومات أو تفاصيل أخرى */}
                  <div>
                    <label className="block text-xs font-bold text-[#12332B] mb-2">
                      معلومات أو تفاصيل أخرى
                    </label>
                    <textarea
                      rows={2}
                      value={otherDetails}
                      onChange={(e) => setOtherDetails(e.target.value)}
                      placeholder="أي تفاصيل إضافية تود إضافتها"
                      className="w-full text-xs sm:text-sm border border-gray-300 rounded-xl p-3 focus:border-[#095B42] outline-none font-medium resize-none"
                    />
                  </div>

                  {/* 7. ما هي النتائج المتوقعة من هذا البلاغ */}
                  <div data-error={!!errors.expectedOutcomes}>
                    <label className="block text-xs font-bold text-[#12332B] mb-2">
                      ماهي النتائج المتوقعة من هذا البلاغ <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      value={expectedOutcomes}
                      onChange={(e) => setExpectedOutcomes(e.target.value)}
                      placeholder="مثال: إيقاف الهدر المالي، إجراء تحقيق مستقل، تطبيق العقوبات"
                      className="w-full text-xs sm:text-sm border border-gray-300 rounded-xl p-3 focus:border-[#095B42] outline-none font-medium resize-none"
                    />
                    {errors.expectedOutcomes && (
                      <span className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.expectedOutcomes}
                      </span>
                    )}
                  </div>

                  {/* SECTION DECLARATION: الإقرار */}
                  <div
                    data-error={!!errors.declarationAgreed}
                    className="p-5 rounded-2xl bg-[#EBF4F0] border border-[#095B42]/30 space-y-3"
                  >
                    <h3 className="font-bold text-sm text-[#095B42]">اقرار</h3>
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={declarationAgreed}
                        onChange={(e) => setDeclarationAgreed(e.target.checked)}
                        className="w-4 h-4 text-[#095B42] rounded border-gray-300 focus:ring-0 cursor-pointer"
                      />
                      <span className="text-xs sm:text-sm font-bold text-[#12332B]">
                        اقر بصحة البيانات الواردة في هذا النموذج (موافق) <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.declarationAgreed && (
                      <span className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.declarationAgreed}
                      </span>
                    )}
                  </div>
                </div>

                {/* Step 2 Actions */}
                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gray-200 text-gray-700 font-bold text-xs hover:bg-gray-300 transition-colors cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4 dir-rtl:rotate-180" />
                    <span>السابق</span>
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-3 px-10 py-4 text-base font-bold text-white rounded-2xl bg-gradient-to-br from-[#095B42] to-[#064230] hover:brightness-110 shadow-lg cursor-pointer transition-all"
                  >
                    <span>إرسال البلاغ</span>
                    <Send className="w-5 h-5 shrink-0" />
                  </button>
                </div>
              </div>
            )}

   
          </form>
        )}
      </div>
    </div>
  );
};
