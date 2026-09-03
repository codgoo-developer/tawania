import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Coins,
  ShieldCheck,
  CheckCircle2,
  FileText,
  HelpCircle,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { useI18n } from '../i18n';
import {
  membersOverview,
  memberRightsData,
  memberObligationsData,
  subscriptionStepsData
} from '../data/members';
import { PageHero } from '../components/layout/PageHero';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ShareholderInquiryForm } from '../components/forms/ShareholderInquiryForm';

export const MembersPage: React.FC = () => {
  const { locale, t, dir, getLocalized, getLocalizedPath } = useI18n();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-16 pb-20">
      <PageHero
        badge={t.membersPage.badge}
        title={t.membersPage.title}
        subtitle={t.membersPage.subtitle}
        breadcrumbs={[
          { label: t.nav.governance, url: '/governance' },
          { label: t.nav.members }
        ]}
      />

      {/* Overview Metric Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#12332B]/10 shadow-xs text-center space-y-1">
            <span className="text-xs text-[#68736F] font-bold">
              {locale === 'ar' ? 'رأس المال المكتتب' : 'Paid Equity'}
            </span>
            <div className="text-2xl font-black text-[#0B6B4F] font-mono">
              {membersOverview.paidCapitalSAR} <span className="text-xs font-normal">{t.common.sar}</span>
            </div>
            <span className="text-[10px] text-gray-500 block">
              {locale === 'ar' ? 'مدفوع بالكامل' : 'Fully Paid'}
            </span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#12332B]/10 shadow-xs text-center space-y-1">
            <span className="text-xs text-[#68736F] font-bold">
              {locale === 'ar' ? 'إجمالي الأسهم' : 'Total Issued Shares'}
            </span>
            <div className="text-2xl font-black text-[#12332B] font-mono">
              {membersOverview.totalSharesCount}
            </div>
            <span className="text-[10px] text-gray-500 block">
              {membersOverview.parValuePerShare}
            </span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#12332B]/10 shadow-xs text-center space-y-1">
            <span className="text-xs text-[#68736F] font-bold">
              {locale === 'ar' ? 'الحد الأدنى للاكتتاب' : 'Minimum Subscription'}
            </span>
            <div className="text-2xl font-black text-[#C9A45C] font-mono">
              {locale === 'ar' ? '50 سهم' : '50 Shares'}
            </div>
            <span className="text-[10px] text-gray-500 block">
              {locale === 'ar' ? '5,500 ريال شامل رسوم العضوية' : 'SAR 5,500 with membership fee'}
            </span>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#12332B]/10 shadow-xs text-center space-y-1">
            <span className="text-xs text-[#68736F] font-bold">
              {locale === 'ar' ? 'أعضاء الجمعية العمومية' : 'Shareholder Count'}
            </span>
            <div className="text-2xl font-black text-[#0B6B4F] font-mono">
              {locale === 'ar' ? '200 عضو' : '200 Members'}
            </div>
            <span className="text-[10px] text-gray-500 block">
              {locale === 'ar' ? 'صوت واحد لكل عضو' : 'One vote per member'}
            </span>
          </div>
        </div>
      </section>

      {/* Quick Action Navigation Dual Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: نموذج تسجيل عضو جديد */}
          <div className="bg-gradient-to-br from-[#095B42] to-[#064230] text-white rounded-3xl p-8 shadow-md relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-3 relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-bold text-[#E5C170]">
                {locale === 'ar' ? 'اكتتاب وانضمام' : 'Join as Shareholder'}
              </span>
              <h3 className="text-2xl font-black tracking-tight text-white">
                {locale === 'ar' ? 'نموذج تسجيل عضو جديد' : 'New Member Registration Form'}
              </h3>
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                {locale === 'ar'
                  ? 'نموذج الراغبين بالمساهمة لدى تعاونية الشامل بجدة وحساب قيمة الأسهم ورسوم العضوية مع التحويل المباشر.'
                  : 'Official subscription form for new members to purchase shares and complete cooperative membership.'}
              </p>
            </div>
            <div className="pt-6 relative z-10">
              <Link
                to={getLocalizedPath('/members/register')}
                className="inline-flex items-center gap-2 bg-[#E5C170] hover:bg-[#d4ae58] text-[#12332B] font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-transform hover:scale-105 shadow-sm"
              >
                <span>{locale === 'ar' ? 'تعبئة نموذج المساهمة الآن' : 'Fill Registration Form'}</span>
                <Arrow className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card 2: بيانات الاعضاء */}
          <div className="bg-white rounded-3xl p-8 border-2 border-[#095B42]/20 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-[#EBF4F0] text-xs font-bold text-[#095B42]">
                {locale === 'ar' ? 'السجل الرسمي' : 'Official Roster'}
              </span>
              <h3 className="text-2xl font-black tracking-tight text-[#12332B]">
                {locale === 'ar' ? 'بيانات الأعضاء' : 'Members Directory'}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {locale === 'ar'
                  ? 'استعراض وثيقة وسجل أعضاء الجمعية العمومية المعتمدين لتعاونية الشامل والبحث برقم العضوية أو الاسم.'
                  : 'Browse the official certified roster of General Assembly members of AlShamel Cooperative.'}
              </p>
            </div>
            <div className="pt-6">
              <Link
                to={getLocalizedPath('/members/directory')}
                className="inline-flex items-center gap-2 bg-gradient-to-br from-[#095B42] to-[#064230] hover:brightness-110 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full transition-transform hover:scale-105 shadow-sm"
              >
                <span>{locale === 'ar' ? 'عرض سجل وبيانات الأعضاء' : 'View Members Directory'}</span>
                <Arrow className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription 4-Steps Process */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#F7F8F6] p-8 sm:p-12 rounded-3xl border border-[#12332B]/10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="primary" className="mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>{locale === 'ar' ? 'خطوات ميسرة' : 'Simple Steps'}</span>
          </Badge>
          <h2 className="text-2xl font-bold text-[#12332B]">
            {locale === 'ar' ? 'آلية الاكتتاب والانضمام لعضوية الجمعية' : 'Equity Subscription & Enrollment Process'}
          </h2>
          <p className="text-xs text-[#68736F] mt-1">
            {locale === 'ar' ? 'وفقاً لأحكام اللائحة الأساسية المعتمدة من المركز الوطني' : 'In compliance with statutory cooperative bylaws'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subscriptionStepsData.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-[#12332B]/10 shadow-2xs space-y-3 relative"
            >
              <span className="text-2xl font-black text-[#C9A45C] font-mono block">
                {step.stepNumber}
              </span>
              <h3 className="text-sm font-bold text-[#12332B]">
                {getLocalized(step.title)}
              </h3>
              <p className="text-xs text-[#68736F] leading-relaxed">
                {getLocalized(step.desc)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Rights vs. Obligations Dual Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Rights */}
          <div className="bg-white rounded-2xl p-8 border border-[#12332B]/10 shadow-xs space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#12332B]">
                  {t.membersPage.rightsTitle}
                </h3>
                <span className="text-xs text-[#68736F]">
                  {locale === 'ar' ? 'حقوق مكفولة بموجب النظام التعاوني' : 'Guaranteed under cooperative law'}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {memberRightsData.map((r, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#F7F8F6] border border-[#12332B]/5 space-y-1">
                  <h4 className="text-xs font-bold text-[#12332B]">
                    {getLocalized(r.title)}
                  </h4>
                  <p className="text-xs text-[#68736F] leading-relaxed">
                    {getLocalized(r.desc)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Obligations */}
          <div className="bg-white rounded-2xl p-8 border border-[#12332B]/10 shadow-xs space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EBF4F0] text-[#0B6B4F] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#12332B]">
                  {t.membersPage.obligationsTitle}
                </h3>
                <span className="text-xs text-[#68736F]">
                  {locale === 'ar' ? 'التزامات المساهم لدعم استدامة الجمعية' : 'Shareholder commitments'}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {memberObligationsData.map((o, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#F7F8F6] border border-[#12332B]/5 space-y-1">
                  <h4 className="text-xs font-bold text-[#12332B]">
                    {getLocalized(o.title)}
                  </h4>
                  <p className="text-xs text-[#68736F] leading-relaxed">
                    {getLocalized(o.desc)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shareholder Inquiry Portal Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ShareholderInquiryForm />
      </section>
    </div>
  );
};
