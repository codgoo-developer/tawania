import { useToast } from '../context/ToastContext';
import React, { useState } from 'react';
import {
  UserPlus,
  X,
  CheckCircle2,
  AlertCircle,
  Calculator,
  Send,
  Printer,
  Copy,
  Check,
  Building,
  ShieldCheck,
  FileText,
  Phone,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { useI18n } from '../i18n';
import { PageHero } from '../components/layout/PageHero';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useGovernanceData } from '../context/GovernanceDataContext';

export const MemberRegistrationPage: React.FC = () => {
  const { contactSettings } = useGovernanceData();
  const phoneNum = contactSettings?.phone || '0504284861';
  const rawWa = contactSettings?.whatsappPhone || phoneNum;
  const cleanWa = rawWa.replace(/[^0-9]/g, '');
  const formattedWa = cleanWa.startsWith('0') ? `966${cleanWa.slice(1)}` : (cleanWa.startsWith('966') ? cleanWa : `966${cleanWa}`);
  const toast = useToast();
  const { locale, dir } = useI18n();
  const { addSubmission } = useGovernanceData();

  // User Google Account Simulation State
  const [userEmail, setUserEmail] = useState<string>(() => {
    try {
      return localStorage.getItem('google_form_simulated_email') || 'as6864886@gmail.com';
    } catch {
      return 'as6864886@gmail.com';
    }
  });
  const [isSwitchAccountOpen, setIsSwitchAccountOpen] = useState<boolean>(false);
  const [newEmailInput, setNewEmailInput] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');

  const handleSwitchAccount = (e: React.FormEvent) => {
    e.preventDefault();
    const email = newEmailInput.trim().toLowerCase();
    if (!email || !/^[^s@]+@[^s@]+.[^s@]+$/.test(email)) {
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


  // Form State
  const [fullName, setFullName] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [idSource, setIdSource] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phone, setPhone] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [residenceAddress, setResidenceAddress] = useState('');
  const [qualification, setQualification] = useState('');
  const [occupation, setOccupation] = useState('');
  const [sharesCount, setSharesCount] = useState<number>(50);
  const [expectedProfitResponse, setExpectedProfitResponse] = useState(
    'تحدد الأرباح سنوياً وفق نتائج أعمال الجمعية وعائد المعاملات وتعتمد من الجمعية العمومية'
  );
  const [pledgePurchasing, setPledgePurchasing] = useState(false);
  const [viewedBylaws, setViewedBylaws] = useState(false);

  // Status State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Calculation Math
  const sharePrice = 100;
  const sharesValue = sharesCount * sharePrice;
  const membershipFee = Math.round(sharesValue * 0.1); // 10% non-refundable
  const totalAmount = sharesValue + membershipFee;

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) errs.fullName = 'الاسم الرباعي مطلوب';
    if (!nationalId.trim() || nationalId.length < 10 || nationalId.length > 14) errs.nationalId = 'رقم الهوية الوطنية مطلوب (من 10 إلى 14 رقماً)';
    if (!idSource.trim()) errs.idSource = 'مصدر الهوية الوطنية مطلوب';
    if (!birthDate.trim()) errs.birthDate = 'تاريخ الميلاد مطلوب';
    if (!phone.trim() || !/^(05|5|9665)\d{8}$/.test(phone.replace(/[\s-]/g, ''))) errs.phone = 'يرجى إدخال رقم جوال صحيح (مثال: 0501234567)';
    if (!emergencyPhone.trim() || !/^(05|5|9665)\d{8}$/.test(emergencyPhone.replace(/[\s-]/g, ''))) errs.emergencyPhone = 'يرجى إدخال رقم جوال طوارئ صحيح (مثال: 0551234567)';
    if (!residenceAddress.trim()) errs.residenceAddress = 'عنوان السكن مطلوب';
    if (!qualification.trim()) errs.qualification = 'المؤهل مطلوب';
    if (!occupation.trim()) errs.occupation = 'المهنة مطلوبة';
    if (sharesCount < 50) errs.sharesCount = 'أقل مساهمة هي 50 سهماً';
    if (!expectedProfitResponse.trim()) errs.expectedProfitResponse = 'يرجى الإجابة عن نسبة الأرباح المتوقعة';
    if (!pledgePurchasing) errs.pledgePurchasing = 'يجب الموافقة على التعهد بالتعامل والشراء من التعاونية';
    if (!viewedBylaws) errs.viewedBylaws = 'يجب تأكيد الاطلاع على اللوائح والأنظمة';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      const firstErr = document.querySelector('[data-error="true"]');
      if (firstErr) {
        firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const code = `SHM-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceCode(code);

    toast.success('تم تسجيل طلب العضوية بنجاح', 'تم رفع طلب الانضمام والاكتتاب بانتظار المراجعة والاعتماد');
    addSubmission({
      module: 'membership',
      senderName: fullName,
      senderContact: `${phone} • الهوية: ${nationalId}`,
      title: `طلب انضمام وعضوية - ${sharesCount} سهم (${totalAmount.toLocaleString()} ر.س) [${code}]`,
      details: `• رقم الهوية ومصدرها: ${nationalId} (${idSource})\n• تاريخ الميلاد: ${birthDate}\n• المهنة والمؤهل: ${occupation} - ${qualification}\n• العنوان السكني: ${residenceAddress}\n• رقم هاتف الطوارئ: ${emergencyPhone}\n• عدد الأسهم المطلوبة: ${sharesCount} سهم (القيمة: ${sharesValue.toLocaleString()} ر.س + رسوم الانضمام: ${membershipFee.toLocaleString()} ر.س = الإجمالي: ${totalAmount.toLocaleString()} ر.س)\n• الإجابة عن الأرباح المتوقعة: ${expectedProfitResponse}`
    });

    setIsSubmitted(true);
  };

  const getWhatsAppMessage = () => {
    return encodeURIComponent(
      `*طلب تسجيل عضو ومساهم جديد في تعاونية الشامل*\n` +
      `------------------------------------\n` +
      `• رقم الطلب: ${referenceCode || 'جديد'}\n` +
      `• الاسم الرباعي: ${fullName}\n` +
      `• رقم الهوية: ${nationalId}\n` +
      `• مصدر الهوية: ${idSource}\n` +
      `• تاريخ الميلاد: ${birthDate}\n` +
      `• رقم الجوال: ${phone}\n` +
      `• رقم الطوارئ: ${emergencyPhone}\n` +
      `• عنوان السكن: ${residenceAddress}\n` +
      `• المؤهل: ${qualification}\n` +
      `• المهنة: ${occupation}\n` +
      `• عدد الأسهم: ${sharesCount} سهم (بقيمة ${sharesValue.toLocaleString()} ريال)\n` +
      `• رسوم العضوية 10%: ${membershipFee.toLocaleString()} ريال (غير مستردة)\n` +
      `• إجمالي المبلغ المطلوب تحويله: ${totalAmount.toLocaleString()} ريال\n` +
      `• نسبة الأرباح المتوقعة: ${expectedProfitResponse}\n` +
      `• التعهد بالشراء والتعامل: نعم (تم الاطلاع والتعهد)\n` +
      `• الاطلاع على اللوائح: نعم (تم الاطلاع على الأنظمة)\n` +
      `------------------------------------\n` +
      `مرفق صورة إيصال التحويل البنكي للمراجعة والاعتماد.`
    );
  };

  const copyToClipboard = () => {
    const text = 
      `طلب تسجيل عضو جديد - تعاونية الشامل\n` +
      `رقم الطلب: ${referenceCode}\n` +
      `الاسم: ${fullName}\n` +
      `الهوية: ${nationalId}\n` +
      `الجوال: ${phone}\n` +
      `الأسهم: ${sharesCount} سهم\n` +
      `المبلغ الإجمالي: ${totalAmount} ريال`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-12 pb-24 bg-[#F7F8F6]">
      {/* Page Hero */}
      <PageHero
        badge={locale === 'ar' ? 'العضوية والاكتتاب' : 'Membership & Subscription'}
        title={locale === 'ar' ? 'نموذج تسجيل عضو جديد' : 'New Member Registration Form'}
        subtitle={locale === 'ar' ? 'نموذج الراغبين بالمساهمة لدى تعاونية الشامل بجدة' : 'Registration form for prospective shareholders of AlShamel Cooperative'}
        breadcrumbs={[
          { label: locale === 'ar' ? 'الأعضاء' : 'Members' },
          { label: locale === 'ar' ? 'نموذج التسجيل' : 'Registration Form' }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Instruction Banner from user prompt */}
        <div className="bg-gradient-to-br from-[#095B42] to-[#064230] text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden mb-6 border border-[#0B6B4F]">
          <div className="relative z-10 space-y-3 text-center sm:text-start">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#E5C170]">
              {locale === 'ar'
                ? 'نموذج الراغبين بالمساهمة لدى تعاونية الشامل'
                : 'AlShamel Cooperative Shareholder Registration Form'}
            </h1>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed font-medium">
              {locale === 'ar'
                ? `للمساهمة لدى تعاونية الشامل لابد من تعبئة هذا النموذج وتحويل مبلغ المساهمة وارسال الايصال على الواتس التالي ${phoneNum}`
                : `To subscribe to AlShamel Cooperative, please fill out this form, transfer the equity amount, and send the deposit slip to WhatsApp: ${phoneNum}.`}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${formattedWa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-br from-[#25D366] to-[#128C4A] hover:brightness-110 text-white text-xs font-bold px-4 py-2 rounded-full transition-all shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{locale === 'ar' ? `واتساب الإدارة والمساهمات: ${phoneNum}` : `Management WhatsApp: ${phoneNum}`}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Google Form Header Simulation Strip */}
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
                أدخل البريد الإلكتروني الذي ترغب بربطه بنموذج الاستجابة والمساهمة لدى الجمعية التعاونية:
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

        {/* Success Modal / State */}
        {isSubmitted ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-[#095B42]/20 shadow-lg text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-20 h-20 rounded-full bg-[#EBF4F0] text-[#095B42] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#095B42] uppercase tracking-wider">
                تم تسجيل طلب المساهمة بنجاح
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#12332B]">
                شكراً لك، {fullName}
              </h2>
              <p className="text-sm text-[#68736F] max-w-lg mx-auto">
                تم حفظ بيانات طلبك بنجاح. يرجى إتمام تحويل مبلغ المساهمة وإرسال صورة الإيصال عبر الواتساب لإصدار شهادة الأسهم.
              </p>
            </div>

            {/* Reference & Breakdown Box */}
            <div className="bg-[#F8FAF8] rounded-2xl p-6 border border-[#12332B]/10 max-w-lg mx-auto text-start space-y-3 text-sm">
              <div className="flex justify-between items-center pb-3 border-b border-[#12332B]/10">
                <span className="text-xs text-gray-500 font-bold">رقم الطلب المرجعي:</span>
                <span className="font-mono font-black text-[#095B42] text-base">{referenceCode}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">عدد الأسهم المطلوبة:</span>
                <span className="font-bold text-[#12332B]">{sharesCount} سهم</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">قيمة الأسهم (100 ريال/سهم):</span>
                <span className="font-bold text-[#12332B]">{sharesValue.toLocaleString()} ريال</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">رسوم العضوية 10% (غير مستردة):</span>
                <span className="font-bold text-[#C9A45C]">{membershipFee.toLocaleString()} ريال</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-[#12332B]/10 text-base font-black text-[#095B42]">
                <span>إجمالي المبلغ المطلوب تحويله:</span>
                <span className="font-mono text-lg">{totalAmount.toLocaleString()} ريال</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <a
                href={`https://wa.me/${formattedWa}?text=${getWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-br from-[#25D366] to-[#128C4A] hover:brightness-110 text-white font-bold text-sm px-6 py-3.5 rounded-full shadow-md transition-transform hover:scale-105"
              >
                <Send className="w-4 h-4" />
                <span>{locale === 'ar' ? `إرسال الطلب والإيصال عبر الواتساب (${phoneNum})` : `Submit Form & Receipt via WhatsApp (${phoneNum})`}</span>
              </a>

              <button
                type="button"
                onClick={copyToClipboard}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#12332B] font-bold text-sm px-6 py-3.5 rounded-full border border-[#12332B]/15 shadow-xs transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-[#095B42]" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'تم نسخ البيانات' : 'نسخ ملخص الطلب'}</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-[#12332B] font-bold text-sm px-5 py-3.5 rounded-full border border-[#12332B]/15 shadow-xs transition-colors"
              >
                <Printer className="w-4 h-4 text-[#095B42]" />
                <span>طباعة النموذج</span>
              </button>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFullName('');
                  setNationalId('');
                }}
                className="text-xs text-gray-500 hover:text-[#095B42] underline"
              >
                تقديم طلب مساهمة جديد
              </button>
            </div>
          </div>
        ) : (
          /* Actual Interactive Form with Exact Google Form Layout & Question Requirements */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Field 1: الاسم الرباعي */}
            <div
              data-error={!!errors.fullName}
              className={`bg-white rounded-2xl p-6 border transition-all ${
                errors.fullName ? 'border-red-400 ring-2 ring-red-100' : 'border-[#12332B]/10 shadow-2xs'
              }`}
            >
              <label className="block text-sm sm:text-base font-bold text-[#12332B] mb-2">
                الاسم الرباعي <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="إجابتك (مثال: عبدالله بن مساعد بن محمد البركاتي)"
                className="w-full text-sm sm:text-base google-form-input py-2.5 text-[#12332B] font-medium"
              />
              {errors.fullName && (
                <span className="text-xs text-red-500 font-semibold mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
                </span>
              )}
            </div>

            {/* Field 2: رقم الهوية */}
            <div
              data-error={!!errors.nationalId}
              className={`bg-white rounded-2xl p-6 border transition-all ${
                errors.nationalId ? 'border-red-400 ring-2 ring-red-100' : 'border-[#12332B]/10 shadow-2xs'
              }`}
            >
              <label className="block text-sm sm:text-base font-bold text-[#12332B] mb-2">
                رقم الهوية الوطنية <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                maxLength={10}
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value.replace(/\D/g, ''))}
                placeholder="إجابتك (10 أرقام تبدأ بـ 1)"
                className="w-full text-sm sm:text-base google-form-input py-2.5 text-[#12332B] font-medium font-mono"
              />
              {errors.nationalId && (
                <span className="text-xs text-red-500 font-semibold mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.nationalId}
                </span>
              )}
            </div>

            {/* Field 3: مصدر الهوية الوطنية */}
            <div
              data-error={!!errors.idSource}
              className={`bg-white rounded-2xl p-6 border transition-all ${
                errors.idSource ? 'border-red-400 ring-2 ring-red-100' : 'border-[#12332B]/10 shadow-2xs'
              }`}
            >
              <label className="block text-sm sm:text-base font-bold text-[#12332B] mb-2">
                مصدر الهوية الوطنية <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={idSource}
                onChange={(e) => setIdSource(e.target.value)}
                placeholder="إجابتك (مثال: أحوال محافظة جدة / أحوال مكة المكرمة / أحوال جدة)"
                className="w-full text-sm sm:text-base google-form-input py-2.5 text-[#12332B] font-medium"
              />
              {errors.idSource && (
                <span className="text-xs text-red-500 font-semibold mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.idSource}
                </span>
              )}
            </div>

            {/* Field 4: تاريخ الميلاد */}
            <div
              data-error={!!errors.birthDate}
              className={`bg-white rounded-2xl p-6 border transition-all ${
                errors.birthDate ? 'border-red-400 ring-2 ring-red-100' : 'border-[#12332B]/10 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm sm:text-base font-bold text-[#12332B]">
                  تاريخ الميلاد <span className="text-red-500">*</span>
                </label>
                <span className="text-[11px] text-[#095B42] font-bold">هجري أو ميلادي</span>
              </div>
              <span className="text-xs text-gray-500 block mb-3">
                اختر التاريخ من التقويم أو أدخله بالصيغة آلياً (يوم / شهر / سنة)
              </span>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={birthDate}
                    maxLength={14}
                    onChange={(e) => {
                      const inputVal = e.target.value;
                      // Handle backspace when user deletes
                      if (inputVal.length < birthDate.length) {
                        setBirthDate(inputVal);
                        return;
                      }
                      // Extract digits and any suffix like هـ or م
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
                      setBirthDate(formatted + suffix);
                    }}
                    placeholder="DD / MM / YYYY (أدخل الأرقام وستظهر الفواصل آلياً)"
                    className="w-full text-sm sm:text-base google-form-input py-2.5 text-[#12332B] font-medium font-mono tracking-wider"
                  />
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <input
                    type="date"
                    onChange={(e) => {
                      if (e.target.value) {
                        const [y, m, d] = e.target.value.split('-');
                        setBirthDate(`${d}/${m}/${y} م`);
                      }
                    }}
                    className="px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-[#095B42] bg-gray-50 hover:bg-[#EBF4F0] focus:border-[#095B42] outline-none cursor-pointer transition-colors"
                    title="اختر من التقويم"
                  />
                </div>
              </div>

              {errors.birthDate && (
                <span className="text-xs text-red-500 font-semibold mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.birthDate}
                </span>
              )}
            </div>

            {/* Field 5: رقم الجوال */}
            <div
              data-error={!!errors.phone}
              className={`bg-white rounded-2xl p-6 border transition-all ${
                errors.phone ? 'border-red-400 ring-2 ring-red-100' : 'border-[#12332B]/10 shadow-2xs'
              }`}
            >
              <label className="block text-sm sm:text-base font-bold text-[#12332B] mb-2">
                رقم الجوال <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="إجابتك (مثال: 0504284861)"
                className="w-full text-sm sm:text-base google-form-input py-2.5 text-[#12332B] font-medium font-mono"
              />
              {errors.phone && (
                <span className="text-xs text-red-500 font-semibold mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                </span>
              )}
            </div>

            {/* Field 6: رقم قريب للطوارى */}
            <div
              data-error={!!errors.emergencyPhone}
              className={`bg-white rounded-2xl p-6 border transition-all ${
                errors.emergencyPhone ? 'border-red-400 ring-2 ring-red-100' : 'border-[#12332B]/10 shadow-2xs'
              }`}
            >
              <label className="block text-sm sm:text-base font-bold text-[#12332B] mb-2">
                رقم قريب للطوارى <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                placeholder="إجابتك (رقم جوال أحد الأقارب للطوارئ)"
                className="w-full text-sm sm:text-base google-form-input py-2.5 text-[#12332B] font-medium font-mono"
              />
              {errors.emergencyPhone && (
                <span className="text-xs text-red-500 font-semibold mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.emergencyPhone}
                </span>
              )}
            </div>

            {/* Field 7: عنوان السكن */}
            <div
              data-error={!!errors.residenceAddress}
              className={`bg-white rounded-2xl p-6 border transition-all ${
                errors.residenceAddress ? 'border-red-400 ring-2 ring-red-100' : 'border-[#12332B]/10 shadow-2xs'
              }`}
            >
              <label className="block text-sm sm:text-base font-bold text-[#12332B] mb-2">
                عنوان السكن <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={residenceAddress}
                onChange={(e) => setResidenceAddress(e.target.value)}
                placeholder="إجابتك (المدينة / المحافظة / الحي / الشارع)"
                className="w-full text-sm sm:text-base google-form-input py-2.5 text-[#12332B] font-medium"
              />
              {errors.residenceAddress && (
                <span className="text-xs text-red-500 font-semibold mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.residenceAddress}
                </span>
              )}
            </div>

            {/* Field 8: المؤهل */}
            <div
              data-error={!!errors.qualification}
              className={`bg-white rounded-2xl p-6 border transition-all ${
                errors.qualification ? 'border-red-400 ring-2 ring-red-100' : 'border-[#12332B]/10 shadow-2xs'
              }`}
            >
              <label className="block text-sm sm:text-base font-bold text-[#12332B] mb-2">
                المؤهل <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {['ثانوي فما دون', 'دبلوم متوسط', 'بكالوريوس', 'ماجستير', 'دكتوراه', 'أخرى'].map((q) => (
                  <label
                    key={q}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                      qualification === q
                        ? 'border-[#095B42] bg-[#EBF4F0] text-[#095B42]'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="qualification"
                      checked={qualification === q}
                      onChange={() => setQualification(q)}
                      className="accent-[#095B42]"
                    />
                    <span>{q}</span>
                  </label>
                ))}
              </div>
              {errors.qualification && (
                <span className="text-xs text-red-500 font-semibold mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.qualification}
                </span>
              )}
            </div>

            {/* Field 9: المهنة */}
            <div
              data-error={!!errors.occupation}
              className={`bg-white rounded-2xl p-6 border transition-all ${
                errors.occupation ? 'border-red-400 ring-2 ring-red-100' : 'border-[#12332B]/10 shadow-2xs'
              }`}
            >
              <label className="block text-sm sm:text-base font-bold text-[#12332B] mb-2">
                المهنة <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                placeholder="إجابتك (مثال: موظف حكومي / قطاع خاص / أعمال حرة / متقاعد / طالب)"
                className="w-full text-sm sm:text-base google-form-input py-2.5 text-[#12332B] font-medium"
              />
              {errors.occupation && (
                <span className="text-xs text-red-500 font-semibold mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.occupation}
                </span>
              )}
            </div>

            {/* Field 10: كم عدد الاسهم المطلوبة ؟ وقيمتها ؟ WITH EXACT USER TEXT */}
            <div
              data-error={!!errors.sharesCount}
              className={`bg-white rounded-2xl p-6 sm:p-8 border transition-all ${
                errors.sharesCount ? 'border-red-400 ring-2 ring-red-100' : 'border-[#12332B]/10 shadow-2xs'
              }`}
            >
              <label className="block text-sm sm:text-base font-bold text-[#12332B] mb-3">
                كم عدد الاسهم المطلوبة ؟ وقيمتها ؟ <span className="text-red-500">*</span>
              </label>

              {/* Exact user text note */}
              <div className="bg-[#FAF7EE] border border-[#E5C170]/40 rounded-2xl p-5 mb-6 text-xs sm:text-sm text-[#4A4535] leading-relaxed space-y-3">
                <div className="space-y-1 font-bold text-[#12332B]">
                  <p>قيمة السهم 100 ريال</p>
                  <p>أقل مساهمة 50سهم بمبلغ 5000خمسة ألاف ريال</p>
                  <p className="text-[#A36D00]">
                    بالإضافة إلى مبلغ 10٪ من قيمه الاسهم وهو رسوم العضوية بقيمة (500)ريال <span className="underline font-black">*غير مستردة*</span>
                  </p>
                  <p className="text-[#095B42] text-sm sm:text-base pt-1 font-black">
                    ليصبح مبلغ أقل مساهمة هو / (5500) ريال
                  </p>
                </div>

                <p className="text-xs text-[#68604F] pt-2 border-t border-[#E5C170]/30 leading-relaxed font-medium">
                  <strong>ملاحظة مهمة:</strong> الهدف هو التفاعل مع التعاونية، والشراء منها، والتسويق لها، لأنها ملك للمساهمين فيها فقط، وتعود الأرباح على الجميع. وكلما زاد عدد المساهمين والشراء من التعاونية، زادت الأرباح لكل مساهم.
                </p>
              </div>

              {/* Interactive Share Slider / Input */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-full sm:w-48">
                    <label className="text-xs font-bold text-gray-500 block mb-1">حدد عدد الأسهم:</label>
                    <input
                      type="number"
                      min={50}
                      step={10}
                      value={sharesCount}
                      onChange={(e) => setSharesCount(Math.max(50, parseInt(e.target.value) || 50))}
                      className="w-full p-2.5 rounded-xl border border-gray-300 font-mono font-bold text-lg text-center text-[#095B42] focus:border-[#095B42] outline-none"
                    />
                  </div>

                  {/* Preset Buttons */}
                  <div className="flex flex-wrap gap-2 w-full">
                    {[50, 100, 200, 500, 1000].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setSharesCount(count)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                          sharesCount === count
                            ? 'bg-gradient-to-br from-[#095B42] to-[#064230] text-white'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {count} سهم
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculation Receipt Card */}
                <div className="bg-[#EBF4F0]/60 rounded-xl p-4 border border-[#095B42]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
                  <div>
                    <span className="text-gray-600 block">قيمة الأسهم: <strong>{sharesValue.toLocaleString()} ريال</strong></span>
                    <span className="text-[#A36D00] block">رسوم العضوية 10%: <strong>{membershipFee.toLocaleString()} ريال (غير مستردة)</strong></span>
                  </div>
                  <div className="text-center sm:text-end">
                    <span className="text-xs text-gray-500 block">المبلغ الإجمالي المستحق:</span>
                    <span className="text-xl font-black text-[#095B42] font-mono">{totalAmount.toLocaleString()} ريال</span>
                  </div>
                </div>
              </div>

              {errors.sharesCount && (
                <span className="text-xs text-red-500 font-semibold mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.sharesCount}
                </span>
              )}
            </div>

            {/* Field 11: كم نسبة الأرباح المتوقعة ؟ */}
            <div
              data-error={!!errors.expectedProfitResponse}
              className={`bg-white rounded-2xl p-6 border transition-all ${
                errors.expectedProfitResponse ? 'border-red-400 ring-2 ring-red-100' : 'border-[#12332B]/10 shadow-2xs'
              }`}
            >
              <label className="block text-sm sm:text-base font-bold text-[#12332B] mb-2">
                كم نسبة الأرباح المتوقعة ؟ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={expectedProfitResponse}
                onChange={(e) => setExpectedProfitResponse(e.target.value)}
                placeholder="إجابتك"
                className="w-full text-sm sm:text-base google-form-input py-2.5 text-[#12332B] font-medium"
              />
              <span className="text-[11px] text-gray-500 mt-2 block">
                توزع الأرباح سنوياً وفق نتائج القوائم المالية المعتمدة وعائد المعاملات وتصويت الجمعية العمومية.
              </span>
              {errors.expectedProfitResponse && (
                <span className="text-xs text-red-500 font-semibold mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.expectedProfitResponse}
                </span>
              )}
            </div>

            {/* Field 12: التعهد بالشراء والتعامل */}
            <div
              data-error={!!errors.pledgePurchasing}
              className={`bg-white rounded-2xl p-6 border transition-all ${
                errors.pledgePurchasing ? 'border-red-400 ring-2 ring-red-100' : 'border-[#12332B]/10 shadow-2xs'
              }`}
            >
              <label className="block text-sm sm:text-base font-bold text-[#12332B] mb-4 leading-relaxed">
                اتعهد بالتعامل والشراء من التعاونية وذلك لانجاح التعاونية وتحقيق الفائدة من المساهمة. <span className="text-red-500">*</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-xl border border-[#095B42]/30 bg-[#EBF4F0]/40 hover:bg-[#EBF4F0] cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={pledgePurchasing}
                  onChange={(e) => setPledgePurchasing(e.target.checked)}
                  className="w-5 h-5 accent-[#095B42] rounded"
                />
                <span className="text-xs sm:text-sm font-bold text-[#12332B]">
                  تم الاطلاع واتعهد على ذلك
                </span>
              </label>
              {errors.pledgePurchasing && (
                <span className="text-xs text-red-500 font-semibold mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.pledgePurchasing}
                </span>
              )}
            </div>

            {/* Field 13: الاطلاع على اللوائح والأنظمة */}
            <div
              data-error={!!errors.viewedBylaws}
              className={`bg-white rounded-2xl p-6 border transition-all ${
                errors.viewedBylaws ? 'border-red-400 ring-2 ring-red-100' : 'border-[#12332B]/10 shadow-2xs'
              }`}
            >
              <label className="block text-sm sm:text-base font-bold text-[#12332B] mb-4 leading-relaxed">
                هل تم الاطلاع على اللوائح والانظمة الخاصة بالجمعيات التعاونية <span className="text-red-500">*</span>
              </label>
              <label className="flex items-center gap-3 p-3 rounded-xl border border-[#095B42]/30 bg-[#EBF4F0]/40 hover:bg-[#EBF4F0] cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={viewedBylaws}
                  onChange={(e) => setViewedBylaws(e.target.checked)}
                  className="w-5 h-5 accent-[#095B42] rounded"
                />
                <span className="text-xs sm:text-sm font-bold text-[#12332B]">
                  نعم لقد اطلعت على اللوائح والانمظة الخاصة بالجمعيات التعاونية
                </span>
              </label>
              {errors.viewedBylaws && (
                <span className="text-xs text-red-500 font-semibold mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> {errors.viewedBylaws}
                </span>
              )}
            </div>

            {/* Form Footer Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 text-base font-bold text-white rounded-2xl bg-gradient-to-br from-[#095B42] to-[#064230] hover:brightness-110 shadow-lg hover:shadow-xl active:scale-[0.99] transition-all cursor-pointer"
              >
                <span>إرسال طلب المساهمة والتسجيل</span>
                <Send className="w-5 h-5 shrink-0" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setFullName('');
                  setNationalId('');
                  setIdSource('');
                  setBirthDate('');
                  setPhone('');
                  setEmergencyPhone('');
                  setResidenceAddress('');
                  setQualification('');
                  setOccupation('');
                  setSharesCount(50);
                  setPledgePurchasing(false);
                  setViewedBylaws(false);
                }}
                className="text-xs font-semibold text-gray-500 hover:text-red-600 transition-colors"
              >
                محو السجل وإعادة التعيين
              </button>
            </div>

   
          </form>
        )}
      </div>
    </div>
  );
};
