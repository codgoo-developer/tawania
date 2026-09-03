import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  FileCheck,
  FileText,
  Calendar,
  Users,
  Award,
  Lock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useI18n } from '../i18n';
import { PageHero } from '../components/layout/PageHero';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const GovernancePage: React.FC = () => {
  const { locale, t, dir, getLocalizedPath } = useI18n();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const governanceModules = [
    {
      title: locale === 'ar' ? 'التقارير المالية السنوية' : 'Annual Financial Reports',
      desc: locale === 'ar' ? 'القوائم المالية المدققة وميزانيات الجمعية لجميع الأعوام من 2019 وحتى 2024.' : 'Audited financial statements and balance sheets for all fiscal years from 2019 to 2024.',
      link: '/reports',
      icon: <FileCheck className="w-6 h-6 text-[#0B6B4F]" />,
      badge: '2019 - 2024'
    },
    {
      title: locale === 'ar' ? 'اللوائح والسياسات المعتمدة' : 'Accredited Regulations & Policies',
      desc: locale === 'ar' ? 'اللائحة الأساسية، سياسة تعارض المصالح، مصفوفة الصلاحيات، ولائحة المشتريات.' : 'Core bylaws, conflict of interest policy, procurement guides, and delegation rules.',
      link: '/documents',
      icon: <FileText className="w-6 h-6 text-[#C9A45C]" />,
      badge: locale === 'ar' ? '15+ وثيقة' : '15+ Docs'
    },
    {
      title: locale === 'ar' ? 'محاضر الجمعيات العمومية' : 'General Assembly Minutes',
      desc: locale === 'ar' ? 'سجلات انعقاد الجمعيات العمومية العادية وغير العادية وقرارات المساهمين.' : 'Minutes of ordinary and extraordinary general assemblies with member voting records.',
      link: '/meetings/general-assembly',
      icon: <Users className="w-6 h-6 text-[#0B6B4F]" />,
      badge: locale === 'ar' ? 'قرارات موثقة' : 'Documented'
    },
    {
      title: locale === 'ar' ? 'محاضر مجلس الإدارة' : 'Board Meeting Minutes',
      desc: locale === 'ar' ? 'توثيق اجتماعات مجلس الإدارة الدورية ومتابعة تنفيذ القرارات التشغيلية.' : 'Periodic board of directors meeting records and operational oversight memos.',
      link: '/meetings/board',
      icon: <Calendar className="w-6 h-6 text-[#C9A45C]" />,
      badge: locale === 'ar' ? 'اجتماعات دورية' : 'Regular'
    },
    {
      title: locale === 'ar' ? 'شؤون المساهمين والاكتتاب' : 'Shareholder Affairs & Equity',
      desc: locale === 'ar' ? 'شروط الاكتتاب، حقوق وواجبات المساهم، وآلية توزيع الأرباح وعائد المعاملات.' : 'Shareholder equity guidelines, dividend policy, voting rights, and enrollment criteria.',
      link: '/members',
      icon: <Users className="w-6 h-6 text-[#0B6B4F]" />,
      badge: '200+ ' + (locale === 'ar' ? 'مساهم' : 'Members')
    },
    {
      title: locale === 'ar' ? 'لجان الرقابة والتدقيق' : 'Audit & Oversight Committees',
      desc: locale === 'ar' ? 'لجنة المراجعة والمخاطر ولجنة الاستثمار والترشيحات المنبثقة عن المجلس.' : 'Internal audit & risk committee ensuring total statutory and fiduciary compliance.',
      link: '/board',
      icon: <ShieldCheck className="w-6 h-6 text-[#C9A45C]" />,
      badge: locale === 'ar' ? '3 لجان متخصصة' : '3 Committees'
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      <PageHero
        badge={t.governancePage.badge}
        title={t.governancePage.title}
        subtitle={t.governancePage.subtitle}
        breadcrumbs={[{ label: t.nav.governance }]}
      />

      {/* Regulatory Context Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#12332B] to-[#0B211C] text-white rounded-3xl p-8 sm:p-10 border border-[#0B6B4F]/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-geo-dark opacity-40 pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4 text-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#C9A45C] text-xs font-bold border border-white/10">
              <ShieldCheck className="w-4 h-4" />
              <span>{locale === 'ar' ? 'الالتزام والشفافية المؤسسية' : 'Institutional Compliance & Transparency'}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {locale === 'ar'
                ? 'خاضعة لإشراف المركز الوطني لتنمية القطاع غير الربحي'
                : 'Regulated under the National Center for Non-Profit Sector (NCNP)'}
            </h2>
            <p className="text-xs sm:text-sm text-[#CBD5CE] leading-relaxed">
              {locale === 'ar'
                ? 'تلتزم الجمعية التعاونية متعددة الأغراض بجدة بأعلى معايير الحوكمة المالية والإدارية المعمول بها في المملكة العربية السعودية، وتوفر لجميع مساهميها والجهات الرقابية إمكانية الوصول الشفاف لكافة القوائم واللوائح والمحاضر المعتمدة.'
                : 'Jeddah Multipurpose Cooperative Society strictly adheres to premier governance frameworks in Saudi Arabia, providing transparent access to all audited disclosures, bylaws, and committee resolutions.'}
            </p>
          </div>
        </div>
      </section>

      {/* Governance Sections Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {governanceModules.map((item, idx) => (
            <Link
              key={idx}
              to={getLocalizedPath(item.link)}
              className="bg-white rounded-2xl p-6 border border-[#12332B]/10 hover:border-[#0B6B4F]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between group shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F7F8F6] text-[#0B6B4F] flex items-center justify-center group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#EBF4F0] text-[#0B6B4F]">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#12332B] mb-2 group-hover:text-[#0B6B4F] transition-colors leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-[#68736F] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#12332B]/5 flex items-center justify-between text-xs font-bold text-[#0B6B4F]">
                <span>{locale === 'ar' ? 'عرض القسم' : 'View Section'}</span>
                <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
