import React, { useState } from 'react';
import { Star, Send, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import { useI18n } from '../../i18n';
import { Button } from '../ui/Button';
import { useGovernanceData } from '../../context/GovernanceDataContext';

export const FeedbackForm: React.FC = () => {
  const { locale, t } = useI18n();
  const { addSubmission } = useGovernanceData();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [projectKey, setProjectKey] = useState('reeda-consumer');
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const getRatingLabel = (score: number) => {
    if (locale === 'ar') {
      switch (score) {
        case 5: return 'ممتاز جداً (5/5)';
        case 4: return 'جيد جداً (4/5)';
        case 3: return 'جيد (3/5)';
        case 2: return 'مقبول (2/5)';
        default: return 'يحتاج تحسين (1/5)';
      }
    } else {
      switch (score) {
        case 5: return 'Excellent (5/5)';
        case 4: return 'Very Good (4/5)';
        case 3: return 'Good (3/5)';
        case 2: return 'Fair (2/5)';
        default: return 'Needs Improvement (1/5)';
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    await addSubmission({
      module: 'feedback',
      senderName: name.trim() || (locale === 'ar' ? 'مستفيد / عميل' : 'Beneficiary'),
      senderContact: locale === 'ar' ? 'نموذج التغذية الراجعة' : 'Feedback Form',
      title: `تقييم مشروع (${projectKey}) - ${rating}/5 نجوم`,
      details: `المشروع المستهدف: ${projectKey}\nالتقييم: ${rating}/5\nالملاحظات والمقترح: ${feedback.trim()}`
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setName('');
      setFeedback('');
    }, 600);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 ">
      <div className="flex items-center gap-2 text-[#0B6B4F] mb-1 text-xs font-bold">
        <Sparkles className="w-4 h-4 text-[#C9A45C]" />
        <span>{locale === 'ar' ? 'شاركنا انطباعك' : 'Share Your Experience'}</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-black text-[#12332B] mb-2">
        {t.feedbackPage.formTitle}
      </h3>
      <p className="text-xs sm:text-sm text-[#68736F] mb-6 leading-relaxed">
        {locale === 'ar'
          ? 'آراؤكم وتقييماتكم المباشرة تسهم في تطوير وتجويد خدمات ومشاريع الجمعية التعاونية.'
          : 'Your direct feedback drives the continuous improvement of all cooperative projects.'}
      </p>

      {isSuccess ? (
        <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#0B6B4F] flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-8 h-8 text-[#0B6B4F]" />
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-emerald-950">
              {locale === 'ar' ? 'شكراً لتقييمك ومشاركتنا رأيك!' : 'Thank you for your review!'}
            </h4>
            <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
              {locale === 'ar'
                ? 'تم تسجيل تقييمك بنجاح في نظام الجودة وسوف يؤخذ بعين الاعتبار في خطط التطوير المستمر.'
                : 'Your feedback has been successfully submitted and reviewed by quality management.'}
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsSuccess(false)}
            className="mt-2"
          >
            {locale === 'ar' ? 'إضافة تقييم جديد' : 'Submit Another Review'}
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Project Selection */}
          <div>
            <label htmlFor="feedback-project" className="block text-xs font-bold text-[#17211E] mb-1.5 text-start">
              {t.feedbackPage.selectProject}
            </label>
            <select
              id="feedback-project"
              value={projectKey}
              onChange={(e) => setProjectKey(e.target.value)}
              className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#12332B]/15 bg-[#FBFBFA] text-[#17211E] outline-none focus:border-[#0B6B4F] focus:bg-white transition-all font-medium"
            >
              <option value="reeda-consumer">{t.feedbackPage.consumerStore}</option>
              <option value="reeda-gas">{t.feedbackPage.gasService}</option>
              <option value="reeda-cold">{t.feedbackPage.reedaCold}</option>
              <option value="reeda-emaar">{locale === 'ar' ? 'إعمار الشامل للمقاولات' : 'AlShamel Emaar Contracting'}</option>
              <option value="reeda-other">{t.feedbackPage.otherProjects}</option>
            </select>
          </div>

          {/* Rating Stars with dynamic text badge */}
          <div>
            <label className="block text-xs font-bold text-[#17211E] mb-1.5 text-start">
              {t.feedbackPage.ratingLabel}
            </label>
            <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-xl bg-[#FBFBFA] border border-[#12332B]/10">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-amber-400 hover:scale-115 transition-transform cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${star <= (hoverRating || rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300'
                        }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs font-bold text-[#0B6B4F] bg-emerald-100/70 px-2.5 py-0.5 rounded-full ms-auto">
                {getRatingLabel(hoverRating || rating)}
              </span>
            </div>
          </div>

          {/* Name Optional */}
          <div>
            <label htmlFor="feedback-name" className="block text-xs font-bold text-[#17211E] mb-1.5 text-start">
              {locale === 'ar' ? 'اسم المستفيد (اختياري)' : 'Your Name (Optional)'}
            </label>
            <input
              id="feedback-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={locale === 'ar' ? 'مثال: فهد الحربي' : 'e.g. Fahad'}
              className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#12332B]/15 bg-[#FBFBFA] text-[#17211E] outline-none focus:border-[#0B6B4F] focus:bg-white transition-all font-medium"
            />
          </div>

          {/* Comment / Review */}
          <div>
            <label htmlFor="feedback-text" className="block text-xs font-bold text-[#17211E] mb-1.5 text-start">
              {locale === 'ar' ? 'ملاحظاتك وتجربتك بالتفصيل' : 'Your Review & Comments'} <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="feedback-text"
              required
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder={locale === 'ar' ? 'اكتب تجربتك، ملاحظاتك على جودة الخدمة، أو مقترحات التطوير...' : 'Write your experience and suggestions...'}
              className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-[#12332B]/15 bg-[#FBFBFA] text-[#17211E] outline-none focus:border-[#0B6B4F] focus:bg-white transition-all resize-none font-medium leading-relaxed"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
            rightIcon={<Send className="w-4 h-4" />}
            className="w-full py-3"
          >
            {locale === 'ar' ? 'إرسال التقييم للمراجعة' : 'Submit Review'}
          </Button>
        </form>
      )}
    </div>
  );
};
