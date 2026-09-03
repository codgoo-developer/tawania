import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  Printer,
  Download,
  Filter,
  UserCheck,
  Building,
  Phone,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Sparkles,
  Layers,
  LayoutGrid,
  Table as TableIcon
} from 'lucide-react';
import { useI18n } from '../i18n';
import { useGovernanceData } from '../context/GovernanceDataContext';
import { generalAssemblyMembersList } from '../data/generalAssemblyMembers';
import { AlShamelLogo } from '../components/common/AlShamelLogo';
import { PageHero } from '../components/layout/PageHero';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const MembersDirectoryPage: React.FC = () => {
  const { contactSettings } = useGovernanceData();
  const { locale, getLocalizedPath } = useI18n();
  const { generalAssemblyMembers } = useGovernanceData();

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'poster' | 'table'>('poster');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 21; // Exactly 21 rows per sheet like the official document in download (1).png!

  // Filtered members list
  const activeMembersList = generalAssemblyMembers && generalAssemblyMembers.length > 0 ? generalAssemblyMembers : generalAssemblyMembersList;
  const filteredMembers = useMemo(() => {
    if (!searchQuery.trim()) return activeMembersList;
    const q = searchQuery.toLowerCase().trim();
    return activeMembersList.filter(
      (m) =>
        (m.name || '').toLowerCase().includes(q) ||
        (m.nameEn || '').toLowerCase().includes(q) ||
        (m.city || '').toLowerCase().includes(q) ||
        String(m.id) === q
    );
  }, [searchQuery, activeMembersList]);

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);
  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredMembers.slice(start, start + itemsPerPage);
  }, [filteredMembers, currentPage]);

  const getVisiblePages = (current: number, total: number) => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    if (current <= 4) {
      return [1, 2, 3, 4, 5, '...', total];
    }
    if (current >= total - 3) {
      return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
    }
    return [1, '...', current - 1, current, current + 1, '...', total];
  };

  return (
    <div className="space-y-12 pb-24 bg-[#F7F8F6]">
      {/* Page Hero */}
      <PageHero
        badge={locale === 'ar' ? 'سجل العضوية والجمعية العمومية' : 'General Assembly Register'}
        title={locale === 'ar' ? 'بيانات الأعضاء' : 'Members Directory'}
        subtitle={locale === 'ar' ? 'سجل أعضاء الجمعية العمومية لتعاونية الرضا بمحافظة الجموم' : 'Official roster of Al-Reda Cooperative General Assembly shareholders'}
        breadcrumbs={[
          { label: locale === 'ar' ? 'الأعضاء' : 'Members' },
          { label: locale === 'ar' ? 'بيانات الاعضاء' : 'Members Data' }
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-white p-4 rounded-2xl border border-[#12332B]/10 shadow-2xs">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute start-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={locale === 'ar' ? 'ابحث باسم العضو، الاسم بالإنجليزي، أو رقم السهم...' : 'Search by member name or ID...'}
              className="w-full ps-9 pe-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-medium text-[#17211E] outline-none focus:border-[#0B6B4F] focus:bg-white transition-all"
            />
          </div>

          {/* View Mode Switcher & Quick Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center p-1 bg-gray-100 rounded-xl border border-gray-200">
              <button
                type="button"
                onClick={() => setViewMode('poster')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'poster'
                    ? 'bg-[#095B42] text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>{locale === 'ar' ? 'عرض الملصق' : 'Poster'}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-[#095B42] text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>{locale === 'ar' ? 'عرض الجدول' : 'Table'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-gray-50 border border-gray-200 text-xs font-bold text-gray-700 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#095B42]" />
              <span className="hidden sm:inline">{locale === 'ar' ? 'طباعة السجل' : 'Print'}</span>
            </button>

            <Link
              to={getLocalizedPath('/members/register')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-br from-[#095B42] to-[#064230] hover:brightness-110 text-xs font-bold text-white shadow-xs transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span>{locale === 'ar' ? 'تسجيل عضو جديد' : 'New Member'}</span>
            </Link>
          </div>
        </div>

        {viewMode === 'poster' ? (
          /* POSTER / CERTIFICATE REGISTER VIEW */
          <div className="bg-[#FAF9F5] rounded-3xl p-6 sm:p-10 border border-[#12332B]/10 shadow-lg mb-8 relative overflow-hidden">
            {/* Poster Header */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
              <div className="text-[#529E43] select-none">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
                </svg>
              </div>

              {/* Official Central Logo */}
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full border border-gray-300 p-1 flex items-center justify-center bg-white shadow-xs mb-2">
                  <AlShamelLogo size="md" textColor="#0B6B4F" showText={false} />
                </div>
                <div className="text-center">
                  <span className="text-[11px] font-black tracking-widest text-[#12332B] uppercase block">
                    تعاونية الرضا
                  </span>
                  <span className="text-[9px] text-[#C9A45C] font-bold">
                    AL-REDA COOPERATIVE • تأسست عام 1440
                  </span>
                </div>
              </div>

              <div className="text-[#529E43] select-none">
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
                </svg>
              </div>
            </div>

            {/* Document Title matching download (1).png */}
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#12332B] tracking-tight">
                أعضاء الجمعية العمومية
              </h2>
              <div className="text-xs text-gray-500 mt-1 font-semibold">
                إجمالي أعضاء الجمعية العمومية: {generalAssemblyMembers.length} عضو • عدد الأسهم: 31,951 سهم
              </div>
            </div>

            {/* Table styled EXACTLY as download (1).png */}
            <div className="max-w-2xl mx-auto border-2 border-[#388E3C] rounded-lg overflow-hidden shadow-xs mb-10">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="bg-[#4CAF50] text-white font-bold text-sm sm:text-base border-b-2 border-[#388E3C]">
                    <th className="py-2.5 px-4 font-black tracking-wider">
                      الاســــــــــــــــــــــــــم
                    </th>
                    <th className="py-2.5 px-4 w-16 border-s-2 border-[#388E3C] font-black">
                      م
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#388E3C]/30 text-xs sm:text-sm font-bold">
                  {paginatedMembers.map((member, index) => {
                    const isEven = index % 2 === 0;
                    return (
                      <tr
                        key={member.id}
                        className={`transition-colors hover:brightness-95 ${
                          isEven ? 'bg-[#FFE082]/40 text-[#12332B]' : 'bg-white text-[#12332B]'
                        }`}
                      >
                        <td className="py-2 px-4 text-center font-medium">
                          {member.name}
                        </td>
                        <td className="py-2 px-4 border-s-2 border-[#388E3C]/30 font-bold font-mono text-[#095B42] bg-[#4CAF50]/15">
                          {member.id}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Bottom Footer Ribbon matching download (1).png */}
            <div className="bg-[#00796B] text-white rounded-2xl px-4 py-3 sm:py-3.5 flex flex-wrap items-center justify-around gap-3 text-xs font-semibold shadow-xs">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#E5C170]" />
                <span className="font-mono dir-ltr">{contactSettings?.phone || "0504284861"}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>🐦</span>
                <span>alredame</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>📷</span>
                <span>al.rda</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>👻</span>
                <span>al-rda</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#E5C170]">
                <span>🌐</span>
                <span className="font-mono">alrdashop.com</span>
              </div>
            </div>
          </div>
        ) : (
          /* TABLE VIEW: Comprehensive Sortable & Filterable Table */
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#12332B]/10 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#12332B]">
                قائمة أعضاء الجمعية العمومية ({filteredMembers.length} عضو)
              </h3>
              <span className="text-xs text-gray-500 font-medium">
                الصفحة {currentPage} من {totalPages || 1}
              </span>
            </div>

            <div className="overflow-x-auto border border-gray-200/80 rounded-2xl">
              <table className="w-full min-w-[650px] text-start text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-[#F7F8F6] border-b border-gray-200 text-gray-700 font-bold">
                    <th className="py-3 px-4 text-center w-16 whitespace-nowrap">#</th>
                    <th className="py-3 px-4 text-start">الاسم الرباعي</th>
                    <th className="py-3 px-4 text-center whitespace-nowrap">المدينة</th>
                    <th className="py-3 px-4 text-center whitespace-nowrap">سنة الانضمام</th>
                    <th className="py-3 px-4 text-center whitespace-nowrap">عدد الأسهم</th>
                    <th className="py-3 px-4 text-center whitespace-nowrap">حالة العضوية</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  {paginatedMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-4 text-center font-bold text-[#095B42] font-mono whitespace-nowrap">
                        {member.id}
                      </td>
                      <td className="py-3 px-4 font-bold text-[#12332B]">
                        {member.name}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-600 whitespace-nowrap">
                        {member.city || 'جدة'}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-600 font-mono whitespace-nowrap">
                        {member.joinYear || '1440'} هـ
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-[#095B42] whitespace-nowrap">
                        {member.sharesCount || 100} سهم
                      </td>
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-full bg-[#EBF4F0] text-[#095B42] text-[11px] font-bold inline-flex items-center gap-1 whitespace-nowrap">
                          <CheckCircleIcon className="w-3 h-3" /> عضو مساهم نشط
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-8 w-full">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-2 rounded-xl bg-white border border-gray-200 text-[#12332B] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors shrink-0"
              aria-label="Previous Page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="flex flex-wrap items-center justify-center gap-1">
              {getVisiblePages(currentPage, totalPages).map((p, idx) =>
                typeof p === 'number' ? (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setCurrentPage(p)}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-xs font-bold transition-all ${
                      currentPage === p
                        ? 'bg-gradient-to-br from-[#095B42] to-[#064230] text-white shadow-xs'
                        : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {p}
                  </button>
                ) : (
                  <span
                    key={`dots-${idx}`}
                    className="w-6 sm:w-7 h-8 flex items-center justify-center text-gray-400 font-bold text-xs select-none"
                  >
                    ...
                  </span>
                )
              )}
            </div>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-2 rounded-xl bg-white border border-gray-200 text-[#12332B] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors shrink-0"
              aria-label="Next Page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}
