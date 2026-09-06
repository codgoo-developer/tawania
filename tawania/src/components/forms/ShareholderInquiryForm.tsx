import React, { useState } from 'react';
import { Send, CheckCircle2, User, CreditCard, Mail, Phone, HelpCircle } from 'lucide-react';
import { useI18n } from '../../i18n';
import { Button } from '../ui/Button';

export const ShareholderInquiryForm: React.FC = () => {
  const { locale, t } = useI18n();
  const [formData, setFormData] = useState({
    nationalId: '',
    shareholderNumber: '',
    fullName: '',
    phone: '',
    inquiryType: 'dividends',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 ">
      <h3 className="text-xl font-bold text-[#12332B] mb-2">
        {t.membersPage.inquiryFormTitle}
      </h3>
      <p className="text-xs text-[#68736F] mb-6">
        {locale === 'ar'
          ? 'نموذج مخصص للمساهمين للاستفسار عن الأرباح، شهادات الأسهم، وتحديث الحسابات البنكية (IBAN).'
          : 'Dedicated portal for shareholders to inquire regarding dividends, certificates, and IBAN updates.'}
      </p>

      {isSuccess ? (
        <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h4 className="text-base font-bold text-emerald-900">
            {locale === 'ar' ? 'تم استلام طلب الاستفسار بنجاح' : 'Inquiry Submitted Successfully'}
          </h4>
          <p className="text-xs text-emerald-700">
            {locale === 'ar'
              ? 'سيقوم قسم شؤون المساهمين بمراجعة السجلات والتواصل معكم خلال 24 ساعة عمل.'
              : 'The Shareholder Relations Department will verify records and contact you within 24 working hours.'}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsSuccess(false)}
            className="mt-2"
          >
            {locale === 'ar' ? 'تقديم استفسار آخر' : 'Submit Another Request'}
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="sh-name" className="block text-xs font-semibold text-[#17211E] mb-1.5">
                {locale === 'ar' ? 'اسم المساهم الثلاثي' : 'Full Name'} <span className="text-rose-500">*</span>
              </label>
              <input
                id="sh-name"
                required
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder={locale === 'ar' ? 'الاسم كما هو مدون بالهوية الوطنية' : 'Name per National ID'}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#12332B]/15 bg-white text-[#17211E] outline-none focus:border-[#0B6B4F]"
              />
            </div>

            <div>
              <label htmlFor="sh-national-id" className="block text-xs font-semibold text-[#17211E] mb-1.5">
                {locale === 'ar' ? 'رقم الهوية الوطنية / الإقامة' : 'National ID / Iqama'} <span className="text-rose-500">*</span>
              </label>
              <input
                id="sh-national-id"
                required
                type="text"
                maxLength={10}
                dir="ltr"
                value={formData.nationalId}
                onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                placeholder="10XXXXXXXX"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#12332B]/15 bg-white text-[#17211E] outline-none focus:border-[#0B6B4F]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="sh-phone" className="block text-xs font-semibold text-[#17211E] mb-1.5">
                {locale === 'ar' ? 'رقم الجوال المسجل' : 'Registered Phone'} <span className="text-rose-500">*</span>
              </label>
              <input
                id="sh-phone"
                required
                type="tel"
                dir="ltr"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="05XXXXXXXX"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#12332B]/15 bg-white text-[#17211E] outline-none focus:border-[#0B6B4F]"
              />
            </div>

            <div>
              <label htmlFor="sh-type" className="block text-xs font-semibold text-[#17211E] mb-1.5">
                {locale === 'ar' ? 'نوع الاستفسار / الطلب' : 'Inquiry Category'}
              </label>
              <select
                id="sh-type"
                value={formData.inquiryType}
                onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#12332B]/15 bg-white text-[#17211E] outline-none focus:border-[#0B6B4F]"
              >
                <option value="dividends">{locale === 'ar' ? 'استفسار عن صرف الأرباح' : 'Dividend Payout Status'}</option>
                <option value="certificate">{locale === 'ar' ? 'طلب شهادة مساهمة رسمية' : 'Share Certificate Request'}</option>
                <option value="iban">{locale === 'ar' ? 'تحديث رقم الآيبان البنكي (IBAN)' : 'IBAN Account Update'}</option>
                <option value="subscription">{locale === 'ar' ? 'طلب زيادة الاكتتاب في الأسهم' : 'Additional Equity Subscription'}</option>
                <option value="other">{locale === 'ar' ? 'استفسار عام آخر' : 'General Shareholder Inquiry'}</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="sh-notes" className="block text-xs font-semibold text-[#17211E] mb-1.5">
              {locale === 'ar' ? 'تفاصيل الاستفسار أو الملاحظات' : 'Inquiry Details'}
            </label>
            <textarea
              id="sh-notes"
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder={locale === 'ar' ? 'اكتب تفاصيل طلبك مع ذكر رقم العضوية إن وجد...' : 'Provide details including member number if available...'}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#12332B]/15 bg-white text-[#17211E] outline-none focus:border-[#0B6B4F] resize-none"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            rightIcon={<Send className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            {locale === 'ar' ? 'إرسال الاستفسار' : 'Submit Inquiry'}
          </Button>
        </form>
      )}
    </div>
  );
};
