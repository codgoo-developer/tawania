import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Phone, Mail, User, MessageSquare } from 'lucide-react';
import { useI18n } from '../../i18n';
import { useGovernanceData } from '../../context/GovernanceDataContext';
import { Button } from '../ui/Button';

export const ContactForm: React.FC<{ initialSubject?: string }> = ({ initialSubject = '' }) => {
  const { locale, t } = useI18n();
  const { addSubmission } = useGovernanceData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: initialSubject,
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = locale === 'ar' ? 'الاسم مطلوب' : 'Name is required';
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = locale === 'ar' ? 'يرجى إدخال بريد إلكتروني صحيح' : 'Valid email is required';
    }
    if (!formData.phone.trim() || formData.phone.length < 9) {
      errs.phone = locale === 'ar' ? 'يرجى إدخال رقم جوال صحيح' : 'Valid phone number is required';
    }
    if (!formData.subject.trim()) {
      errs.subject = locale === 'ar' ? 'موضوع الرسالة مطلوب' : 'Subject is required';
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      errs.message = locale === 'ar' ? 'الرسالة يجب أن لا تقل عن 10 أحرف' : 'Message must be at least 10 characters';
    }
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      addSubmission({
        module: 'contact_message',
        senderName: formData.name.trim(),
        senderContact: `الهاتف: ${formData.phone.trim()} • البريد: ${formData.email.trim()}`,
        title: formData.subject.trim(),
        details: formData.message.trim(),
      });
    } catch (err) {
      console.error('Error submitting contact form to context:', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 600);
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 ">
      <h3 className="text-xl font-bold text-[#12332B] mb-2">
        {t.contactPage.formTitle}
      </h3>
      <p className="text-xs text-[#68736F] mb-6">
        {locale === 'ar'
          ? 'سيقوم فريق التواصل بالرد على رسالتكم في أقرب وقت خلال ساعات العمل الرسمية.'
          : 'Our communications team will respond promptly during official working hours.'}
      </p>

      {isSuccess ? (
        <div className="p-6 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-3 animate-in fade-in duration-300">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h4 className="text-base font-bold text-emerald-900">
            {t.common.success}
          </h4>
          <p className="text-xs text-emerald-700 max-w-sm mx-auto">
            {locale === 'ar'
              ? 'شكراً لتواصلك مع الجمعية التعاونية بجدة. تم استلام رسالتك وسيتم التواصل معك قريباً.'
              : 'Thank you for contacting AlShamel Cooperative. Your message has been received and our team will contact you shortly.'}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsSuccess(false)}
            className="mt-2"
          >
            {locale === 'ar' ? 'إرسال رسالة أخرى' : 'Send Another Message'}
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label htmlFor="contact-name" className="block text-xs font-semibold text-[#17211E] mb-1.5">
                {t.contactPage.namePlaceholder} <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.contactPage.namePlaceholder}
                  className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white text-[#17211E] outline-none transition-colors ${errors.name ? 'border-rose-400 bg-rose-50/20' : 'border-[#12332B]/15 focus:border-[#0B6B4F]'
                    }`}
                />
              </div>
              {errors.name && <span className="text-[11px] text-rose-600 mt-1 block">{errors.name}</span>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="contact-email" className="block text-xs font-semibold text-[#17211E] mb-1.5">
                {t.contactPage.emailPlaceholder} <span className="text-rose-500">*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="example@mail.com"
                className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white text-[#17211E] outline-none transition-colors ${errors.email ? 'border-rose-400 bg-rose-50/20' : 'border-[#12332B]/15 focus:border-[#0B6B4F]'
                  }`}
              />
              {errors.email && <span className="text-[11px] text-rose-600 mt-1 block">{errors.email}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Phone */}
            <div>
              <label htmlFor="contact-phone" className="block text-xs font-semibold text-[#17211E] mb-1.5">
                {t.contactPage.phonePlaceholder} <span className="text-rose-500">*</span>
              </label>
              <input
                id="contact-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="05XXXXXXXX"
                dir="ltr"
                className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white text-[#17211E] outline-none transition-colors ${errors.phone ? 'border-rose-400 bg-rose-50/20' : 'border-[#12332B]/15 focus:border-[#0B6B4F]'
                  }`}
              />
              {errors.phone && <span className="text-[11px] text-rose-600 mt-1 block">{errors.phone}</span>}
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="contact-subject" className="block text-xs font-semibold text-[#17211E] mb-1.5">
                {t.contactPage.subjectPlaceholder} <span className="text-rose-500">*</span>
              </label>
              <input
                id="contact-subject"
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder={t.contactPage.subjectPlaceholder}
                className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white text-[#17211E] outline-none transition-colors ${errors.subject ? 'border-rose-400 bg-rose-50/20' : 'border-[#12332B]/15 focus:border-[#0B6B4F]'
                  }`}
              />
              {errors.subject && <span className="text-[11px] text-rose-600 mt-1 block">{errors.subject}</span>}
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="contact-message" className="block text-xs font-semibold text-[#17211E] mb-1.5">
              {locale === 'ar' ? 'نص الرسالة' : 'Message'} <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="contact-message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder={t.contactPage.messagePlaceholder}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white text-[#17211E] outline-none transition-colors resize-none ${errors.message ? 'border-rose-400 bg-rose-50/20' : 'border-[#12332B]/15 focus:border-[#0B6B4F]'
                }`}
            />
            {errors.message && <span className="text-[11px] text-rose-600 mt-1 block">{errors.message}</span>}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            rightIcon={<Send className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            {t.common.send}
          </Button>
        </form>
      )}
    </div>
  );
};
