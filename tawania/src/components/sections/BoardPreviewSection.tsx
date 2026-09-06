import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Award,
  Crown,
  Shield,
  FileCheck,
  ExternalLink,
  Phone,
  Mail,
  DollarSign
} from 'lucide-react';
import { useI18n } from '../../i18n';
import { useGovernanceData } from '../../context/GovernanceDataContext';
import { boardGovernanceOverview } from '../../data/board';

export const BoardPreviewSection: React.FC = () => {
  const { locale, getLocalized, getLocalizedPath } = useI18n();
  const isAr = locale === 'ar';
  const { boardMembers, executiveDirector, boardIntro } = useGovernanceData();

  // Sort board members strictly by order (Chairman first, Vice Chairman, etc.)
  const sortedMembers = [...boardMembers].sort((a, b) => (a.order || 99) - (b.order || 99));

  const getRoleIcon = (roleAr: string = '', badgeAr: string = '', isChairman: boolean = false) => {
    const r = roleAr || '';
    const b = badgeAr || '';
    if (isChairman || b.includes('رئيس المجلس') || r.includes('رئيس مجلس')) {
      return <Crown className="w-3.5 h-3.5 text-amber-500" />;
    }
    if (b.includes('نائب') || r.includes('نائب')) {
      return <Award className="w-3.5 h-3.5 text-[#0B6B4F]" />;
    }
    if (b.includes('مالي') || r.includes('مالي')) {
      return <DollarSign className="w-3.5 h-3.5 text-[#C9A45C]" />;
    }
    return <Users className="w-3.5 h-3.5 text-[#0B6B4F]" />;
  };

  const getRoleStyle = (order: number = 99, roleAr: string = '') => {
    if (order === 1 || roleAr.includes('رئيس مجلس')) {
      return 'bg-gradient-to-r from-amber-50 to-emerald-50 text-emerald-950 border border-amber-300/60 shadow-xs';
    }
    if (order === 2 || roleAr.includes('نائب')) {
      return 'bg-[#EBF4F0] text-[#0B6B4F] border border-[#0B6B4F]/20';
    }
    if (order === 3 || roleAr.includes('مالي')) {
      return 'bg-amber-50 text-amber-900 border border-amber-200/80';
    }
    return 'bg-[#F7F8F6] text-[#4A5550] border border-gray-200';
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white via-[#F7F8F6] to-white relative overflow-hidden">
      {/* Decorative background subtle glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0B6B4F]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#C9A45C]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B6B4F]/10 border border-[#0B6B4F]/20 text-[#0B6B4F] text-xs sm:text-sm font-bold mb-3 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#0B6B4F] animate-pulse" />
            <span>{isAr ? (boardIntro?.cycleBadgeAr || 'الدورة الانتخابية الثانية') : (boardIntro?.cycleBadgeEn || 'Second Electoral Term')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#12332B] tracking-tight mb-3">
            {isAr ? (boardIntro?.titleAr || 'أعضاء مجلس الإدارة') : (boardIntro?.titleEn || 'Board of Directors')}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-br from-[#095B42] to-[#064230] mx-auto rounded-full mb-6" />
        </div>

        {/* Governance Intro Paragraph */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <p className="text-sm sm:text-base text-[#4A5550] leading-relaxed whitespace-pre-line font-medium">
            {isAr ? (boardIntro?.descAr || 'تدار الجمعية من قبل مجلس إدارة عدد أعضائه لا يقل عن خمسة أعضاء تنتخبهم الجمعية العمومية. ومدة عضوية مجلس الإدارة الحالي (الثاني) المنتخب أربع سنوات. ويبلغ عدد أعضائه في دورته الحالية خمسة أعضاء لإدارة الجمعية في خلال الفترة من 1443/6/22 هـ حتى 1447/6/22 هـ.') : (boardIntro?.descEn || 'The cooperative is managed by a Board of Directors elected by the General Assembly.')}
          </p>
        </div>

        {/* Board Member Cards Grid */}
        <div className="pt-6 flex flex-wrap justify-center gap-6 sm:gap-6 items-stretch max-w-6xl mx-auto">
          {sortedMembers.map((member) => {
            const isChairman =
              member.isChairman ||
              member.order === 1 ||
              (member.badgeAr && member.badgeAr.includes('رئيس المجلس'));

            return (
              <div
                key={member.id}
                className={`w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-16px)] max-w-[340px] relative rounded-3xl p-6 transition-all duration-300 flex flex-col items-center text-center group ${isChairman
                  ? 'bg-gradient-to-b from-[#F3F8F5] via-white to-white border-2 border-[#0B6B4F]/40 shadow-md hover:shadow-xl hover:-translate-y-1.5'
                  : 'bg-white shadow-2xs hover:shadow-lg hover:border-[#0B6B4F]/30 hover:-translate-y-1'
                  }`}
              >
                {/* Top Accent Ribbon for Chairman */}
                {isChairman && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#0B6B4F] to-[#073F2E] text-white text-[11px] font-black tracking-wide shadow-md flex items-center gap-1.5 whitespace-nowrap border border-amber-300/40">
                    <Crown className="w-3.5 h-3.5 text-amber-300" />
                    <span>{isAr ? 'رئيس المجلس' : 'Chairman'}</span>
                  </div>
                )}

                {/* Avatar Frame (Image or Initials) */}
                <div className="relative mt-2 mb-4">
                  <div
                    className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 transition-transform duration-300 group-hover:scale-105 shadow-md ${isChairman
                      ? 'bg-gradient-to-br from-[#C9A45C] via-[#0B6B4F] to-[#0A4D38]'
                      : 'bg-gradient-to-br from-[#0B6B4F]/30 via-gray-200 to-gray-100'
                      }`}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-[#0B6B4F] to-[#063325] border-2 border-white flex items-center justify-center shadow-inner">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={isAr ? member.nameAr : (member.nameEn || member.nameAr)}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to initials if image URL fails to load
                            (e.currentTarget as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <span className="text-xl sm:text-2xl font-black text-amber-200 tracking-wider select-none font-serif">
                          {member.initialsAr || member.nameAr?.slice(0, 5) || 'ش . ع'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Icon badge anchored on avatar */}
                  <div
                    className={`absolute -bottom-1 end-0.5 w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-xs ${isChairman ? 'bg-amber-100 text-amber-800' : 'bg-emerald-50 text-[#0B6B4F]'
                      }`}
                  >
                    {getRoleIcon(member.roleAr, member.badgeAr || '', isChairman)}
                  </div>
                </div>

                {/* Role Badge */}
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full mb-2.5 ${getRoleStyle(member.order, member.roleAr)}`}>
                  {isAr ? member.roleAr : (member.roleEn || member.roleAr)}
                </span>

                {/* Name */}
                <h3 className="text-base font-bold text-[#12332B] leading-snug mb-3 group-hover:text-[#095B42] transition-colors">
                  {isAr ? member.nameAr : (member.nameEn || member.nameAr)}
                </h3>

                {/* Contact Info (Phone & Email) */}
                <div className="mt-auto w-full pt-3 border-t border-[#12332B]/5 space-y-1.5 text-xs text-[#525E59]">
                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      className="flex items-center justify-center gap-1.5 p-1.5 rounded-xl bg-[#F7F8F6] hover:bg-[#EBF4F0] font-bold text-[#0B6B4F] transition-colors dir-ltr"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#C9A45C]" />
                      <span>{isAr ? `جوال : ${member.phone}` : `Mob: ${member.phone}`}</span>
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-gray-50 hover:bg-[#EBF4F0] text-[#0B6B4F] hover:text-[#073F2E] font-medium text-xs border border-gray-100 transition-colors truncate"
                      title={member.email}
                    >
                      <Mail className="w-3.5 h-3.5 text-[#C9A45C] shrink-0" />
                      <span className="truncate">{member.email}</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Executive Director Distinct Callout */}
        <div className="mt-14 bg-gradient-to-br from-[#063325] via-[#094734] to-[#0A4D38] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-500/20">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-start">
            <div className="relative w-18 h-18 sm:w-22 sm:h-22 rounded-full p-1 bg-gradient-to-br from-[#C9A45C] via-[#E2C37E] to-[#0B6B4F] shrink-0 shadow-lg">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0B6B4F] to-[#042419] overflow-hidden flex items-center justify-center border-2 border-white/80 shadow-inner">
                {executiveDirector?.image ? (
                  <img
                    src={executiveDirector.image}
                    alt={isAr ? executiveDirector.nameAr : (executiveDirector.nameEn || executiveDirector.nameAr)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-black text-amber-200 font-serif">
                    {executiveDirector?.initialsAr || 'م . ح'}
                  </span>
                )}
              </div>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 bg-white/10 px-2.5 py-0.5 rounded-full inline-block mb-1">
                {isAr ? 'الإدارة التنفيذية' : 'Executive Management'}
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white">
                {isAr ? executiveDirector?.nameAr : (executiveDirector?.nameEn || executiveDirector?.nameAr)} — {isAr ? executiveDirector?.roleAr : (executiveDirector?.roleEn || executiveDirector?.roleAr)}
              </h4>
              <p className="text-xs text-white/80 max-w-xl leading-relaxed mt-1">
                {isAr ? executiveDirector?.descriptionAr : (executiveDirector?.descriptionEn || executiveDirector?.descriptionAr)}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto justify-center">
            <Link
              to={getLocalizedPath('/executive-director')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white text-[#0B6B4F] hover:bg-emerald-50 text-xs sm:text-sm font-bold shadow-md transition-colors cursor-pointer"
            >
              <span>{isAr ? 'بيانات المدير التنفيذي' : 'Executive Director Profile'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
