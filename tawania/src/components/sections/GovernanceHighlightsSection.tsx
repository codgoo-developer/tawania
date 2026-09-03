import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  FileCheck,
  FileText,
  Calendar,
  Users,
  Download,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Lock
} from 'lucide-react';
import { useI18n } from '../../i18n';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const GovernanceHighlightsSection: React.FC = () => {
  const { locale, t, dir, getLocalizedPath } = useI18n();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const pillars = [
    {
      icon: <FileCheck className="w-6 h-6 text-[#0B6B4F]" />,
      title: locale === 'ar' ? 'القوائم والتقارير المالية المدققة' : 'Audited Financial Reports',
      desc: locale === 'ar' ? 'إفصاح مالي منتظم يغطي الأعوام من 2019 وحتى 2024 بمصادقة مراجع حسابات خارجي مرخص.' : 'Continuous disclosures from 2019 through 2024 validated by certified independent auditors.',
      link: '/reports',
      count: '2019-2024'
    },
    {
      icon: <FileText className="w-6 h-6 text-[#C9A45C]" />,
      title: locale === 'ar' ? 'اللوائح والسياسات المعتمدة' : 'Accredited Policies & Bylaws',
      desc: locale === 'ar' ? 'اللائحة الأساسية، سياسة تعارض المصالح، ومصفوفة الصلاحيات المالية والإدارية المحدثة.' : 'Foundational bylaws, conflict of interest rules, and executive delegation matrices.',
      link: '/documents',
      count: '15+ ' + (locale === 'ar' ? 'وثيقة' : 'Docs')
    },
    {
      icon: <Calendar className="w-6 h-6 text-[#0B6B4F]" />,
      title: locale === 'ar' ? 'محاضر اجتماعات المجلس والجمعية' : 'Meeting Minutes & Records',
      desc: locale === 'ar' ? 'سجلات موثقة لكافة دورات اجتماعات مجلس الإدارة وانعقاد الجمعيات العمومية العادية وغير العادية.' : 'Documented records of ordinary/extraordinary general assemblies and board deliberations.',
      link: '/meetings/general-assembly',
      count: '100% ' + (locale === 'ar' ? 'توثيق' : 'Documented')
    },
    {
      icon: <Users className="w-6 h-6 text-[#C9A45C]" />,
      title: locale === 'ar' ? 'شؤون المساهمين وحفظ الحقوق' : 'Shareholder Rights & Equity',
      desc: locale === 'ar' ? 'سجل مساهمين منظم، توزيع دوري للأرباح وعائد المعاملات، والتصويت الديمقراطي للجمعية العمومية.' : 'Equitable dividend distribution, transparent shareholder roster, and democratic voting.',
      link: '/members',
      count: '200+ ' + (locale === 'ar' ? 'مساهم' : 'Members')
    }
  ];

  return (
    <section id="governance-highlights-section" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-14">
          <div className="lg:col-span-8 text-start space-y-3">
            <Badge variant="primary">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>{t.governanceSection.badge}</span>
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#12332B] tracking-tight">
              {t.governanceSection.title}
            </h2>
            <p className="text-base sm:text-lg text-[#68736F] max-w-2xl leading-relaxed">
              {t.governanceSection.subtitle}
            </p>
          </div>

          <div className="lg:col-span-4 flex lg:justify-end">
            <Button
              href={getLocalizedPath('/governance')}
              variant="primary"
              size="md"
              rightIcon={<Arrow className="w-4 h-4" />}
            >
              {locale === 'ar' ? 'بوابة الحوكمة والامتثال' : 'Governance & Compliance Portal'}
            </Button>
          </div>
        </div>

        {/* 4 Governance Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <Link
              key={idx}
              to={getLocalizedPath(pillar.link)}
              className="bg-[#F7F8F6] rounded-2xl p-6 border border-[#12332B]/10 hover:bg-[#EBF4F0]/50 hover:border-[#0B6B4F]/40 transition-all duration-300 flex flex-col justify-between group shadow-2xs"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-white shadow-xs group-hover:scale-105 transition-transform">
                    {pillar.icon}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-white border border-[#12332B]/10 text-[#0B6B4F]">
                    {pillar.count}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#12332B] mb-2 group-hover:text-[#0B6B4F] transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-xs text-[#68736F] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#12332B]/10 flex items-center justify-between text-xs font-bold text-[#0B6B4F]">
                <span>{locale === 'ar' ? 'تصفح الوثائق والسجلات' : 'Browse Disclosures'}</span>
                <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
