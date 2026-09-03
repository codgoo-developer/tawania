import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Crown, Award, DollarSign, Users, Briefcase, ExternalLink } from 'lucide-react';
import { useI18n } from '../../i18n';
import { boardMembersData, boardGovernanceOverview, executiveDirector } from '../../data/board';

export const BoardPreviewSection: React.FC = () => {
  const { locale, getLocalized, getLocalizedPath } = useI18n();

  const getMemberIcon = (order: number) => {
    switch (order) {
      case 1:
        return <Crown className="w-3.5 h-3.5 text-amber-500" />;
      case 2:
        return <Award className="w-3.5 h-3.5 text-[#0B6B4F]" />;
      case 3:
        return <DollarSign className="w-3.5 h-3.5 text-[#C9A45C]" />;
      default:
        return <Users className="w-3.5 h-3.5 text-[#0B6B4F]" />;
    }
  };

  const getArabicInitials = (nameAr: string) => {
    const clean = nameAr.replace(/^(أ\s*\/\s*|أ\.\s*|م\.\s*|د\.\s*)/g, '').trim();
    const parts = clean.split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]} . ${parts[parts.length - 1][0]}`;
    }
    return parts[0] ? parts[0].slice(0, 2) : 'ش';
  };

  const getRoleStyle = (order: number) => {
    if (order === 1) {
      return 'bg-gradient-to-r from-amber-50 to-emerald-50 text-emerald-950 border border-amber-300/60 shadow-xs';
    }
    if (order === 2) {
      return 'bg-[#EBF4F0] text-[#0B6B4F] border border-[#0B6B4F]/20';
    }
    if (order === 3) {
      return 'bg-amber-50 text-amber-900 border border-amber-200/80';
    }
    return 'bg-[#F7F8F6] text-gray-700 border border-gray-200/70';
  };

  return (
    <section id="board-members-section" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 text-center">
        {/* Section Heading */}
        <div className="inline-block mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B6B4F]/10 text-[#0B6B4F] text-xs font-bold mb-3">
            <Users className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>{locale === 'ar' ? 'القيادة والحوكمة' : 'Leadership & Governance'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#12332B] tracking-tight mb-3">
            {locale === 'ar' ? 'أعضاء مجلس الإدارة' : 'Board of Directors'}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-br from-[#095B42] to-[#064230] mx-auto rounded-full" />
        </div>

        {/* Governance Intro Paragraph matching exact user prompt */}
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <p className="text-sm sm:text-base text-[#4A5550] leading-relaxed whitespace-pre-line font-medium">
            {getLocalized(boardGovernanceOverview.text)}
          </p>
        </div>

        {/* 5 Board Member Cards with exact details */}
        <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-6 items-stretch">
          {boardMembersData.map((member) => {
            const isChairman = member.order === 1;
            const initials = getArabicInitials(member.name.ar);
            return (
              <div
                key={member.id}
                className={`relative rounded-3xl p-6 transition-all duration-300 flex flex-col items-center text-center group ${
                  isChairman
                    ? 'bg-gradient-to-b from-[#F3F8F5] via-white to-white border-2 border-[#0B6B4F]/40 shadow-md hover:shadow-xl hover:-translate-y-1.5'
                    : 'bg-white border border-[#12332B]/10 shadow-2xs hover:shadow-lg hover:border-[#0B6B4F]/30 hover:-translate-y-1'
                }`}
              >
                {/* Top Accent Ribbon for Chairman - Fixed Centering */}
                {isChairman && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#0B6B4F] to-[#073F2E] text-white text-[11px] font-black tracking-wide shadow-md flex items-center gap-1.5 whitespace-nowrap border border-amber-300/40">
                    <Crown className="w-3.5 h-3.5 text-amber-300" />
                    <span>{locale === 'ar' ? 'رئيس المجلس' : 'Chairman'}</span>
                  </div>
                )}

                {/* Avatar Frame with layered rings and Arabic initials */}
                <div className="relative mt-2 mb-4">
                  <div
                    className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 transition-transform duration-300 group-hover:scale-105 ${
                      isChairman
                        ? 'bg-gradient-to-br from-[#C9A45C] via-[#0B6B4F] to-[#0A4D38] shadow-md'
                        : 'bg-gradient-to-br from-[#0B6B4F]/30 via-gray-200 to-gray-100 shadow-xs'
                    }`}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-[#0B6B4F] to-[#063325] border-2 border-white flex items-center justify-center shadow-inner">
                      <span className="text-xl sm:text-2xl font-black text-amber-200 tracking-wider select-none font-serif">
                        {initials}
                      </span>
                    </div>
                  </div>

                  {/* Icon badge anchored on avatar */}
                  <div
                    className={`absolute -bottom-1 end-0.5 w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-xs ${
                      isChairman ? 'bg-amber-100 text-amber-800' : 'bg-emerald-50 text-[#0B6B4F]'
                    }`}
                  >
                    {getMemberIcon(member.order)}
                  </div>
                </div>

                {/* Role Badge */}
                <span className={`text-[11px] font-bold px-3 py-1 rounded-full mb-2.5 ${getRoleStyle(member.order)}`}>
                  {getLocalized(member.role)}
                </span>

                {/* Name */}
                <h3 className="text-base font-bold text-[#12332B] leading-snug mb-3 group-hover:text-[#095B42] transition-colors">
                  {getLocalized(member.name)}
                </h3>

                {/* Contact Info (Phone & Emails) */}
                <div className="mt-auto w-full pt-3 border-t border-[#12332B]/5 space-y-1.5 text-xs text-[#525E59]">
                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      className="flex items-center justify-center gap-1.5 p-1.5 rounded-xl bg-[#F7F8F6] hover:bg-[#EBF4F0] font-bold text-[#0B6B4F] transition-colors dir-ltr"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#C9A45C]" />
                      <span>{locale === 'ar' ? `جوال : ${member.phone}` : `Mob: ${member.phone}`}</span>
                    </a>
                  )}
                  {member.adminEmail && (
                    <a
                      href={`mailto:${member.adminEmail}`}
                      className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-gray-50 hover:bg-[#EBF4F0] text-[#0B6B4F] hover:text-[#073F2E] font-medium text-xs border border-gray-100 transition-colors truncate"
                      title={member.adminEmail}
                    >
                      <Mail className="w-3.5 h-3.5 text-[#C9A45C] shrink-0" />
                      <span className="truncate">{member.adminEmail}</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Executive Director Distinct Callout & Action Buttons */}
        <div className="mt-14 bg-gradient-to-br from-[#063325] via-[#094734] to-[#0A4D38] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-500/20">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-start">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-1 bg-gradient-to-br from-[#C9A45C] to-emerald-400 shrink-0 shadow-md">
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#0B6B4F] to-[#042419] flex items-center justify-center border border-white/20">
                <span className="text-2xl font-black text-amber-200 font-serif">
                  م . ح
                </span>
              </div>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300 bg-white/10 px-2.5 py-0.5 rounded-full inline-block mb-1">
                {locale === 'ar' ? 'الإدارة التنفيذية' : 'Executive Management'}
              </span>
              <h4 className="text-base sm:text-lg font-bold text-white">
                {getLocalized(executiveDirector.name)} — {getLocalized(executiveDirector.role)}
              </h4>
              <p className="text-xs text-white/80 max-w-xl leading-relaxed">
                {getLocalized(executiveDirector.bio)}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto justify-center">
            <Link
              to={getLocalizedPath('/executive-director')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-white text-[#0B6B4F] hover:bg-emerald-50 text-xs sm:text-sm font-bold shadow-md transition-colors cursor-pointer"
            >
              <span>{locale === 'ar' ? 'بيانات المدير التنفيذي' : 'Executive Director Profile'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

    
          </div>
        </div>
      </div>
    </section>
  );
};
