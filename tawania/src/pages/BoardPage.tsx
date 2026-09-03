import React from 'react';
import { Users, Crown, Award, DollarSign, Mail } from 'lucide-react';
import { useI18n } from '../i18n';
import { PageHero } from '../components/layout/PageHero';
import { Badge } from '../components/ui/Badge';
import { useGovernanceData, initialBoardMembers, BoardMemberItem } from '../context/GovernanceDataContext';

export const BoardPage: React.FC = () => {
  const { locale, t } = useI18n();
  const { boardMembers } = useGovernanceData();

  // Fallback to initialBoardMembers if boardMembers is empty or undefined
  const activeMembers: BoardMemberItem[] =
    (boardMembers && boardMembers.length > 0 ? boardMembers : initialBoardMembers)
      .filter((m) => !((m.roleAr || (m as any).role_ar || '').includes('المدير التنفيذي')) && String(m.id) !== 'bm-6' && !(m as any).isCeo);

  // Sort board members by order
  const sortedMembers = [...activeMembers].sort((a, b) => a.order - b.order);

  const getRoleIcon = (roleAr: string = '', badgeAr: string = '', isChairman?: boolean) => {
    const r = roleAr || '';
    const b = badgeAr || '';
    if (isChairman || b.includes('رئيس المجلس') || r.includes('رئيس مجلس')) {
      return <Crown className="w-3.5 h-3.5 text-amber-500" />;
    }
    if (badgeAr.includes('نائب') || roleAr.includes('نائب')) {
      return <Award className="w-3.5 h-3.5 text-[#0B6B4F]" />;
    }
    if (badgeAr.includes('مالي') || roleAr.includes('مالي')) {
      return <DollarSign className="w-3.5 h-3.5 text-[#C9A45C]" />;
    }
    return <Users className="w-3.5 h-3.5 text-[#0B6B4F]" />;
  };

  return (
    <div className="space-y-16 pb-20">
      <PageHero
        badge={t.boardPage.badge}
        title={locale === 'ar' ? 'مجلس الإدارة' : 'Board of Directors'}
        subtitle={
          locale === 'ar'
            ? 'القيادة التنفيذية والحوكمة المؤسسية لجمعية الشامل التعاونية'
            : 'Executive Leadership and Institutional Governance of AlShamel Cooperative'
        }
        breadcrumbs={[
          { label: t.nav.aboutUs, url: '/about' },
          { label: t.nav.board }
        ]}
      />

      {/* Governance Overview Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#12332B]/10 shadow-xs text-center max-w-4xl mx-auto space-y-4">
          <Badge variant="primary" className="mb-1">
            <Users className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>{locale === 'ar' ? 'الدورة الانتخابية الثانية' : 'Second Electoral Term'}</span>
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-black text-[#12332B] tracking-tight">
            {locale === 'ar' ? 'أعضاء مجلس الإدارة' : 'Board of Directors'}
          </h2>
          <p className="text-sm sm:text-base text-[#4A5550] leading-relaxed font-medium">
            {locale === 'ar'
              ? 'تدار الجمعية من قبل مجلس إدارة عدد أعضائه لا يقل عن خمسة أعضاء تنتخبهم الجمعية العمومية. ومدة عضوية مجلس الإدارة الحالي (الثاني) المنتخب أربع سنوات. ويبلغ عدد أعضائه في دورته الحالية خمسة أعضاء لإدارة الجمعية في خلال الفترة من 1443/6/22 هـ حتى 1447/6/22 هـ.'
              : 'The cooperative is managed by a Board of Directors elected by the General Assembly. The term of the current 2nd Board is 4 years, comprising 5 members for the period from 22/06/1443 AH to 22/06/1447 AH.'}
          </p>
        </div>
      </section>

      {/* Board Members Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
   

        {/* User Provided Exact Cards Grid */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
          {sortedMembers.map((member) => {
            const isChairman =
              member.isChairman ||
              (member.badgeAr && member.badgeAr.includes('رئيس المجلس')) ||
              member.order === 1;

            return (
              <div
                key={member.id}
                className={`relative rounded-3xl p-6 transition-all duration-300 flex flex-col items-center text-center group ${
                  isChairman
                    ? 'bg-gradient-to-b from-[#F3F8F5] via-white to-white border-2 border-[#0B6B4F]/40 shadow-md hover:shadow-xl hover:-translate-y-1.5'
                    : 'bg-white border border-[#12332B]/10 shadow-2xs hover:shadow-lg hover:border-[#0B6B4F]/30 hover:-translate-y-1'
                }`}
              >
                {/* Chairman Top Banner Badge */}
                {isChairman && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#0B6B4F] to-[#073F2E] text-white text-[11px] font-black tracking-wide shadow-md flex items-center gap-1.5 whitespace-nowrap border border-amber-300/40">
                    <Crown className="w-3.5 h-3.5 text-amber-300" />
                    <span>{locale === 'ar' ? 'رئيس المجلس' : 'Chairman'}</span>
                  </div>
                )}

                {/* Avatar / Initials Box */}
                <div className="relative mt-2 mb-4">
                  <div
                    className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 transition-transform duration-300 group-hover:scale-105 shadow-md ${
                      isChairman
                        ? 'bg-gradient-to-br from-[#C9A45C] via-[#0B6B4F] to-[#0A4D38]'
                        : 'bg-gradient-to-br from-[#0B6B4F]/30 via-gray-200 to-gray-100'
                    }`}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-[#0B6B4F] to-[#063325] border-2 border-white flex items-center justify-center shadow-inner">
                      {member.image ? (
                        <img src={member.image} alt={member.nameAr} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xl sm:text-2xl font-black text-amber-200 tracking-wider select-none font-serif">
                          {member.initialsAr || member.nameAr.slice(0, 5)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    className={`absolute -bottom-1 end-0.5 w-7 h-7 rounded-full flex items-center justify-center border-2 border-white shadow-xs ${
                      isChairman ? 'bg-amber-100 text-amber-800' : 'bg-emerald-50 text-[#0B6B4F]'
                    }`}
                  >
                    {getRoleIcon(member.roleAr, member.badgeAr || '', member.isChairman)}
                  </div>
                </div>

                {/* Role Badge */}
                <span
                  className={`text-[11px] font-bold px-3 py-1 rounded-full mb-2.5 ${
                    isChairman
                      ? 'bg-gradient-to-r from-amber-50 to-emerald-50 text-emerald-950 border border-amber-300/60 shadow-xs'
                      : member.roleAr.includes('مالي')
                      ? 'bg-amber-50 text-amber-900 border border-amber-200/80'
                      : 'bg-[#EBF4F0] text-[#0B6B4F] border border-[#0B6B4F]/20'
                  }`}
                >
                  {locale === 'ar' ? member.roleAr : member.roleEn || member.roleAr}
                </span>

                {/* Name */}
                <h3 className="text-base font-bold text-[#12332B] leading-snug mb-3 group-hover:text-[#095B42] transition-colors">
                  {locale === 'ar' ? member.nameAr : member.nameEn || member.nameAr}
                </h3>

                {/* Bio / Description */}
                {member.bioAr && (
                  <p className="text-xs text-[#525E59] leading-relaxed mb-4 line-clamp-3">
                    {locale === 'ar' ? member.bioAr : member.bioEn || member.bioAr}
                  </p>
                )}

                {/* Email Action */}
                <div className="mt-auto w-full pt-3 border-t border-[#12332B]/5 space-y-1.5 text-xs text-[#525E59]">
                  <a
                    href={`mailto:${member.email || 'info@shamil.org.sa'}`}
                    className="flex items-center justify-center gap-1.5 p-2 rounded-xl bg-gray-50 hover:bg-[#EBF4F0] text-[#0B6B4F] hover:text-[#073F2E] font-medium text-xs border border-gray-100 transition-colors truncate"
                    title={member.email || 'info@shamil.org.sa'}
                  >
                    <Mail className="w-3.5 h-3.5 text-[#C9A45C] shrink-0" />
                    <span className="truncate">{member.email || 'info@shamil.org.sa'}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
