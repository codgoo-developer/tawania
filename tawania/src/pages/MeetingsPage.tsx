import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Calendar,
  Users,
  CheckCircle2,
  Download,
  FileCheck,
  ShieldCheck,
  Printer,
  Clock,
  Layers
} from 'lucide-react';
import { useI18n } from '../i18n';
import { boardMeetingsData, generalAssemblyMeetingsData } from '../data/meetings';
import { useGovernanceData } from '../context/GovernanceDataContext';
import { PageHero } from '../components/layout/PageHero';
import { PdfDocumentViewer } from '../components/common/PdfDocumentViewer';

export const MeetingsPage: React.FC<{ defaultType?: 'board' | 'general-assembly' }> = ({
  defaultType = 'general-assembly'
}) => {
  const { type } = useParams<{ type?: string }>();
  const activeType = type === 'board' ? 'board' : (type === 'general-assembly' ? 'general-assembly' : defaultType);
  const { locale, getLocalized, getLocalizedPath } = useI18n();
  const { meetings: govMeetings } = useGovernanceData();

  const dynamicMeetings = govMeetings
    .filter((m) => (activeType === 'board' ? m.type === 'board' : m.type === 'general_assembly'))
    .map((m) => {
      const yearMatch = (m.dateAr || m.titleAr || '').match(/(20\d\d)/);
      const year = yearMatch ? yearMatch[1] : '2024';
      return {
        id: m.id,
        type: activeType,
        year,
        meetingNumber: m.meetingNumber,
        date: m.dateAr,
        title: { ar: m.titleAr, en: m.titleEn || m.titleAr },
        descAr: m.descAr,
        descEn: m.descEn || m.descAr,
        agendaSummary: [(m as any).descAr || ''],
        keyDecisions: [(m as any).descAr || ''],
        attendeesCount: m.attendeesCount,
        quorumPercentage: '100%',
        fileSize: m.fileSize || '2.5 MB',
        fileUrl: (m as any).fileUrl,
        downloadUrl: (m as any).fileUrl || ''
      };
    });

  const staticMeetings = activeType === 'board' ? boardMeetingsData : generalAssemblyMeetingsData;

  const normalizeNum = (num?: string) => {
    if (!num) return '';
    const yearMatch = num.match(/(20\d\d)/);
    if (yearMatch) {
      const yr = yearMatch[1];
      const restDigits = num.replace(yr, '').replace(/\D+/g, '');
      const numPadded = restDigits ? restDigits.padStart(2, '0') : '01';
      return `${yr}-${numPadded}`;
    }
    return num.replace(/[\/\-_]/g, '').toLowerCase().trim();
  };

  const rawMeetings = [
    ...dynamicMeetings,
    ...staticMeetings.filter(s => !dynamicMeetings.some(d => normalizeNum(d.meetingNumber) === normalizeNum(s.meetingNumber)))
  ];

  const availableYears = Array.from(new Set(rawMeetings.map((m) => m.year))).sort((a, b) => Number(b) - Number(a));

  const [selectedYear, setSelectedYear] = useState<string>(() => availableYears[0] || '2024');
  const [selectedMeetingId, setSelectedMeetingId] = useState<string | null>(null);

  // Sync selected year if activeType changes
  useEffect(() => {
    if (availableYears.length > 0 && !availableYears.includes(selectedYear)) {
      setSelectedYear(availableYears[0]);
    }
  }, [activeType, availableYears, selectedYear]);

  const meetingsInSelectedYear = rawMeetings.filter((m) => m.year === selectedYear);

  // Pick current meeting
  const currentMeeting = meetingsInSelectedYear.find(m => m.id === selectedMeetingId) || meetingsInSelectedYear[0] || rawMeetings[0];

  return (
    <div className="space-y-8 pb-20">
      <PageHero
        badge={activeType === 'general-assembly' ? (locale === 'ar' ? 'الجمعيات العمومية' : 'General Assembly') : (locale === 'ar' ? 'مجلس الإدارة' : 'Board of Directors')}
        title={
          currentMeeting
            ? getLocalized((currentMeeting as any).title)
            : activeType === 'general-assembly'
              ? (locale === 'ar' ? 'محاضر الجمعية العمومية' : 'General Assembly Minutes')
              : (locale === 'ar' ? 'محاضر اجتماع مجلس الإدارة' : 'Board Meeting Minutes')
        }
        subtitle={
          (currentMeeting as any)?.descAr
            ? (locale === 'ar' ? (currentMeeting as any).descAr : (currentMeeting as any).descEn || (currentMeeting as any).descAr)
            : activeType === 'general-assembly'
              ? (locale === 'ar'
                ? 'قرارات الجمعيات العمومية العادية وغير العادية بحضور الأعضاء وممثلي الجهات الإشرافية موثقة ومتاحة بصيغة PDF لكل عام'
                : 'Resolutions of Ordinary and Extraordinary General Assemblies documented as PDF files for each year.')
              : (locale === 'ar'
                ? 'سجل محاضر وقرارات اجتماعات مجلس إدارة جمعية الشامل التعاونية المعتمدة بصيغة PDF'
                : 'Official Board of Directors meeting minutes and governance resolutions documented as PDF.')
        }
        breadcrumbs={[
          { label: locale === 'ar' ? 'الحوكمة' : 'Governance' },
          {
            label:
              activeType === 'general-assembly'
                ? (locale === 'ar' ? 'محاضر الجمعية العمومية' : 'General Assembly Minutes')
                : (locale === 'ar' ? 'محاضر مجلس الإدارة' : 'Board Meetings')
          }
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Navigation & Year Switchers Panel */}
        <div className="bg-white p-5 rounded-3xl border border-[#12332B]/10 shadow-xs space-y-4">
          {/* Top Row: Main Section Switcher (GA vs Board) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2 bg-[#F7F8F6] p-1.5 rounded-2xl border border-gray-200/80 w-full sm:w-auto">
              <Link
                to={getLocalizedPath('/meetings/general-assembly')}
                className={`flex-1 sm:flex-none py-2.5 px-5 text-xs sm:text-sm font-bold text-center rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${activeType === 'general-assembly'
                  ? 'bg-[#0B6B4F] text-white shadow-xs'
                  : 'text-[#68736F] hover:bg-[#EBF4F0] hover:text-[#0B6B4F]'
                  }`}
              >
                <Users className="w-4 h-4" />
                <span>{locale === 'ar' ? 'محاضر الجمعية العمومية' : 'General Assembly Minutes'}</span>
              </Link>
              <Link
                to={getLocalizedPath('/meetings/board')}
                className={`flex-1 sm:flex-none py-2.5 px-5 text-xs sm:text-sm font-bold text-center rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${activeType === 'board'
                  ? 'bg-[#0B6B4F] text-white shadow-xs'
                  : 'text-[#68736F] hover:bg-[#EBF4F0] hover:text-[#0B6B4F]'
                  }`}
              >
                <Calendar className="w-4 h-4" />
                <span>{locale === 'ar' ? 'محاضر مجلس الإدارة' : 'Board Meeting Minutes'}</span>
              </Link>
            </div>

            <div className="text-xs font-bold text-gray-500 hidden sm:block">
              {locale === 'ar' ? `إجمالي المحاضر: ${rawMeetings.length} محضر` : `Total Meetings: ${rawMeetings.length}`}
            </div>
          </div>

          {/* Bottom Row: Fiscal Year Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <span className="text-xs font-bold text-gray-500 me-2 shrink-0 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#0B6B4F]" />
              <span>{locale === 'ar' ? 'السنة المالية:' : 'Fiscal Year:'}</span>
            </span>
            {availableYears.map((yr) => {
              const yearCount = rawMeetings.filter((m) => m.year === yr).length;
              const isSelected = selectedYear === yr;
              return (
                <button
                  key={yr}
                  type="button"
                  onClick={() => {
                    setSelectedYear(yr);
                    setSelectedMeetingId(null);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${isSelected
                    ? 'bg-[#0B6B4F] text-white shadow-sm ring-2 ring-[#0B6B4F]/20 scale-102'
                    : 'bg-[#F7F8F6] text-gray-700 hover:bg-[#EBF4F0] hover:text-[#0B6B4F] border border-gray-200/80'
                    }`}
                >
                  <span className="font-mono">{locale === 'ar' ? `عام ${yr}م` : yr}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-sans ${isSelected ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    {yearCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* If multiple meetings exist in the selected fiscal year, render sub-meeting selector grid */}
        {meetingsInSelectedYear.length > 1 && (
          <div className="bg-[#F7F8F6] p-4 rounded-3xl border border-gray-200/80 shadow-xs space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between gap-2 text-xs font-bold text-[#0B6B4F]">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>{locale === 'ar' ? `محاضر اجتماعات عام ${selectedYear}م` : `Meetings in ${selectedYear}`}</span>
              </div>
              <span className="text-gray-500 font-normal text-[11px]">
                ({meetingsInSelectedYear.length} {locale === 'ar' ? 'محاضر' : 'meetings'})
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {meetingsInSelectedYear.map((m) => {
                const isSelected = currentMeeting?.id === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedMeetingId(m.id)}
                    className={`p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer flex flex-col justify-between gap-2 text-start ${isSelected
                      ? 'bg-[#0B6B4F] text-white shadow-md ring-2 ring-[#0B6B4F]/30 scale-[1.01]'
                      : 'bg-white text-gray-800 hover:bg-gray-100 hover:text-[#0B6B4F] border border-gray-200/80'
                      }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={`font-mono text-[11px] px-2 py-0.5 rounded-md font-bold ${isSelected ? 'bg-white/20 text-white' : 'bg-[#EBF4F0] text-[#0B6B4F]'}`}>
                        {m.meetingNumber}
                      </span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-white shrink-0" />}
                    </div>
                    <div className="line-clamp-2 text-xs leading-relaxed">{getLocalized(m.title)}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* DIRECT PDF DOCUMENT VIEWER ONLY */}
        {currentMeeting && (
          <PdfDocumentViewer
            key={currentMeeting.id}
            title={getLocalized((currentMeeting as any).title)}
            codeOrNum={(currentMeeting as any).meetingNumber || `GA-${(currentMeeting as any).year}`}
            fileUrl={(currentMeeting as any).fileUrl}
            fileName={`AlShamel-Minutes-${(currentMeeting as any).year}-${(currentMeeting as any).meetingNumber || '01'}.pdf`}
          />
        )}
      </section>
    </div>
  );
};
