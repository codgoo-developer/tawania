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
  Table as TableIcon,
  CheckCircle,
  FileText,
  Award,
  Send
} from 'lucide-react';
import { useI18n } from '../i18n';
import { useGovernanceData } from '../context/GovernanceDataContext';
import { generalAssemblyMembersList } from '../data/generalAssemblyMembers';
import { PageHero } from '../components/layout/PageHero';
import { Badge } from '../components/ui/Badge';

export const MembersDirectoryPage: React.FC = () => {
  const { contactSettings } = useGovernanceData();
  const { locale, getLocalizedPath } = useI18n();
  const { generalAssemblyMembers } = useGovernanceData();

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'poster' | 'table'>('poster');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

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

  const phoneNum = contactSettings?.phone || '0504284861';
  const emailAddr = contactSettings?.email || 'info@shamil.org.sa';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-10 pb-24 bg-[#F7F8F6] print:bg-white print:p-0 print:m-0 print:space-y-0 print:pb-0">
      {/* Global Print Stylesheet */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 10mm 8mm;
          }
          body {
            background: #ffffff !important;
            color: #000000 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          #top-announcement-bar,
          #main-header,
          #main-footer,
          #floating-whatsapp-container,
          .screen-only {
            display: none !important;
          }
          .print-table {
            width: 100% !important;
            border-collapse: collapse !important;
          }
          .print-table thead {
            display: table-header-group !important;
          }
          .print-table tr {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
        }
      `}</style>

      {/* ─────────────────────────────────────────────────────────────
          SCREEN-ONLY COMPONENTS (Hidden on Print)
          ───────────────────────────────────────────────────────────── */}
      <div className="screen-only">
        {/* Page Hero with Flex Between Action Button */}
        <PageHero
          badge={locale === 'ar' ? 'سجل العضوية والجمعية العمومية' : 'General Assembly Register'}
          title={locale === 'ar' ? 'بيانات الأعضاء' : 'Members Directory'}
          subtitle={locale === 'ar' ? 'سجل أعضاء الجمعية العمومية لتعاونية الرضا بمحافظة الجموم' : 'Official roster of Al-Reda Cooperative General Assembly shareholders'}
          breadcrumbs={[
            { label: locale === 'ar' ? 'الأعضاء' : 'Members' },
            { label: locale === 'ar' ? 'بيانات الاعضاء' : 'Members Data' }
          ]}
          action={
            <Link
              to={getLocalizedPath('/members/register')}
              id="hero-register-member-btn"
              className="inline-flex items-center justify-center gap-2.5 px-4 py-2 rounded-lg  bg-[#0B6B4F] hover:bg-[#08523C] text-white font-bold text-sm sm:text-sm  hover:shadow-md transition-all duration-200 border border-[#0B6B4F]/10 cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-[#84CC16] shrink-0" />
              <span>{locale === 'ar' ? 'تسجيل عضو جديد' : 'New Member Registration'}</span>
            </Link>
          }
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 screen-only">
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl shadow-xs">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-gray-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={locale === 'ar' ? 'ابحث باسم العضو، المدينة، أو رقم السهم...' : 'Search by member name, city or ID...'}
              className="w-full ps-10 pe-4 py-2.5 rounded-xl bg-gray-50text-xs sm:text-sm font-medium text-[#17211E] outline-none focus:border-[#0B6B4F] focus:bg-white transition-all"
            />
          </div>

          {/* View Mode Switcher & Quick Actions */}
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <div className="flex items-center p-1 bg-gray-100 rounded-xl border border-gray-200">
              <button
                type="button"
                onClick={() => setViewMode('poster')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${viewMode === 'poster'
                  ? 'bg-[#0B6B4F] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>{locale === 'ar' ? 'عرض السجل المعتمد' : 'Official Registry'}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${viewMode === 'table'
                  ? 'bg-[#0B6B4F] text-white shadow-xs'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>{locale === 'ar' ? 'عرض الجدول' : 'Table View'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B6B4F] hover:bg-[#08523C] text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{locale === 'ar' ? 'طباعة كامل السجل' : 'Print All Members'}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Display based on View Mode */}
        {viewMode === 'poster' ? (
          /* LUXURY POSTER VIEW */
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
            {/* Poster Header */}
            <div className="text-center max-w-2xl mx-auto space-y-4 mb-8">
              <div className="flex justify-center mb-2">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-20 sm:h-24 w-auto object-contain mx-auto transition-transform hover:scale-105 duration-300"
                />
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-[#12332B] tracking-tight">
                سجل أعضاء الجمعية العمومية
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#84CC16] to-[#0B6B4F] mx-auto rounded-full" />
              <p className="text-xs sm:text-sm text-gray-500 font-medium">
                سجل معتمد وموثق يضم مساهمي الجمعية العمومية لتعاونية الرضا
              </p>
            </div>

            {/* Luxury Roster Table */}
            <div className="max-w-6xl mx-auto border border-[#0B6B4F]/20 rounded-2xl overflow-hidden shadow-md mb-8">
              <table className="w-full text-center border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-[#0B6B4F] via-[#095B42] to-[#0B6B4F] text-white font-bold text-xs sm:text-sm">
                    <th className="py-3 px-4 text-center font-black w-24 border-e border-white/20">
                      رقم العضو
                    </th>
                    <th className="py-3 px-6 text-start font-black">
                      اسم العضو المساهم
                    </th>
                    <th className="py-3 px-4 text-center font-black w-28 border-s border-white/20">
                      حالة القيد
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                  {paginatedMembers.map((member, index) => {
                    const isEven = index % 2 === 0;
                    return (
                      <tr
                        key={member.id}
                        className={`transition-colors hover:bg-[#EBF4F0]/70 ${isEven ? 'bg-[#FAFBFA]' : 'bg-white'
                          }`}
                      >
                        <td className="py-2.5 px-4 font-mono font-bold text-[#0B6B4F] bg-gray-50/50 border-e border-gray-100">
                          {member.id}
                        </td>
                        <td className="py-2.5 px-6 text-start font-bold text-[#17211E]">
                          {member.name}
                        </td>
                        <td className="py-2.5 px-4 text-center border-s border-gray-100">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200/60">
                            <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />
                            مساهم
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Bottom Certificate Footer Ribbon */}
            <div className="bg-[#05241C] text-white rounded-2xl px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold shadow-md">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#84CC16]" />
                <span>سجل معتمد وموثق صادر عن تعاونية الرضا</span>
              </div>
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex items-center gap-1.5 text-white/90">
                  <Phone className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span className="font-mono dir-ltr">{phoneNum}</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/90">
                  <Send className="w-3.5 h-3.5 text-[#C9A45C]" />
                  <span>{emailAddr}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* TABLE VIEW: Comprehensive Sortable & Filterable Table */
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-lg font-bold text-[#12332B]">
                قائمة أعضاء الجمعية العمومية ({filteredMembers.length} عضو)
              </h3>
              <span className="text-xs text-gray-500 font-semibold bg-gray-100 px-3 py-1 rounded-full">
                الصفحة {currentPage} من {totalPages || 1}
              </span>
            </div>

            <div className="overflow-x-auto   rounded-2xl">
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
                    <tr key={member.id} className="hover:bg-[#EBF4F0]/50 transition-colors">
                      <td className="py-3 px-4 text-center font-bold text-[#0B6B4F] font-mono whitespace-nowrap">
                        {member.id}
                      </td>
                      <td className="py-3 px-4 font-bold text-[#12332B]">
                        {member.name}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-600 whitespace-nowrap">
                        {member.city || 'الجموم'}
                      </td>
                      <td className="py-3 px-4 text-center text-gray-600 font-mono whitespace-nowrap">
                        {member.joinYear || '1440'} هـ
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-[#0B6B4F] whitespace-nowrap">
                        {member.sharesCount || 100} سهم
                      </td>
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold inline-flex items-center gap-1 border border-emerald-200/60 whitespace-nowrap">
                          <CheckCircle className="w-3 h-3 text-emerald-600" /> عضو مساهم نشط
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
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-8 flex-wrap">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl bg-whitetext-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs"
              aria-label="Previous Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {getVisiblePages(currentPage, totalPages).map((p, idx) => {
              if (p === '...') {
                return (
                  <span key={`dots-${idx}`} className="px-2 py-1 text-gray-400 font-bold">
                    ...
                  </span>
                );
              }
              const pageNum = p as number;
              const isActive = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all shadow-2xs ${isActive
                    ? 'bg-[#0B6B4F] text-white shadow-xs scale-105'
                    : 'bg-whitetext-gray-700 hover:bg-gray-50'
                    }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl bg-whitetext-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs"
              aria-label="Next Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PRINT-ONLY COMPLETE MEMBER DIRECTORY (Prints ALL Members)
          ───────────────────────────────────────────────────────────── */}
      <div className="hidden print:block w-full bg-white text-black p-4 font-sans dir-rtl">
        {/* Print Header */}
        <div className="flex items-center justify-between border-b-2 border-[#0B6B4F] pb-4 mb-4">
          <div className="text-start space-y-1">
            <h1 className="text-xl font-black text-[#0B6B4F]">
              جمعية الرضا التعاونية
            </h1>
            <p className="text-xs text-gray-700 font-bold">
              سجل أعضاء الجمعية العمومية المعتمد والموثق
            </p>
            <p className="text-[11px] text-gray-500 font-mono">
              تاريخ الطباعة: {new Date().toLocaleDateString('ar-SA')} | إجمالي الأعضاء: {filteredMembers.length} مساهم
            </p>
          </div>
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" className="h-16 w-auto object-contain" />
          </div>
        </div>

        {/* Print Table with ALL Members */}
        <table className="w-full text-center border-collapse text-xs print-table">
          <thead>
            <tr className="bg-[#0B6B4F] text-white font-bold">
              <th className="py-2 px-2 border border-gray-400 w-14 text-center">#</th>
              <th className="py-2 px-4 border border-gray-400 text-start">اسم العضو المساهم</th>
              <th className="py-2 px-3 border border-gray-400 w-28 text-center">المدينة</th>
              <th className="py-2 px-3 border border-gray-400 w-24 text-center">سنة الانضمام</th>
              <th className="py-2 px-3 border border-gray-400 w-24 text-center">عدد الأسهم</th>
              <th className="py-2 px-3 border border-gray-400 w-24 text-center">حالة القيد</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member, idx) => (
              <tr key={member.id} className={idx % 2 === 0 ? 'bg-gray-50/80' : 'bg-white'}>
                <td className="py-1.5 px-2 border border-gray-300 font-mono font-bold text-center">{member.id}</td>
                <td className="py-1.5 px-4 border border-gray-300 text-start font-bold text-gray-900">{member.name}</td>
                <td className="py-1.5 px-3 border border-gray-300 text-center text-gray-700">{member.city || 'الجموم'}</td>
                <td className="py-1.5 px-3 border border-gray-300 text-center font-mono">{member.joinYear || '1440'} هـ</td>
                <td className="py-1.5 px-3 border border-gray-300 text-center font-mono font-bold text-[#0B6B4F]">{member.sharesCount || 100} سهم</td>
                <td className="py-1.5 px-3 border border-gray-300 text-center font-bold text-emerald-800">مساهم نشط</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Print Footer */}
        <div className="mt-6 pt-3 border-t border-gray-300 flex items-center justify-between text-[11px] text-gray-600">
          <div>
            <span className="font-bold">سجل معتمد وموثق صادر عن تعاونية الرضا</span>
          </div>
          <div className="flex items-center gap-4 font-mono">
            <span>الهاتف: {phoneNum}</span>
            <span>البريد: {emailAddr}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
