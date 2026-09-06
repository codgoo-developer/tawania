import React, { useState, useRef, useEffect } from 'react';
import {
  Download,
  Printer,
  Maximize2,
  Minimize2,
  FileText,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building,
  Eye,
  FileCheck
} from 'lucide-react';
import { useI18n } from '../../i18n';
import { downloadDocumentFile, getDocumentPdfUrl } from '../../context/GovernanceDataContext';

interface PdfDocumentViewerProps {
  title: string;
  codeOrNum: string;
  fileUrl?: string;
  fileName?: string;
  articles?: { title: string; content: string[] }[];
  date?: string;
  approvedBy?: string;
}

export const PdfDocumentViewer: React.FC<PdfDocumentViewerProps> = ({
  title,
  codeOrNum,
  fileUrl,
  fileName,
  articles,
  date,
  approvedBy
}) => {
  const { locale } = useI18n();
  const isAr = locale === 'ar';
  const containerRef = useRef<HTMLDivElement>(null);

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [blobUrl, setBlobUrl] = useState<string>('');
  const [activeMode, setActiveMode] = useState<'pdf' | 'reader'>('pdf');

  // Convert data URI or relative path into safe Blob URL
  useEffect(() => {
    let activeUrl = fileUrl || '';
    if (!activeUrl) {
      activeUrl = getDocumentPdfUrl(title, codeOrNum);
    }

    if (activeUrl.startsWith('data:application/pdf')) {
      try {
        const parts = activeUrl.split(',');
        const mime = parts[0].match(/:(.*?);/)?.[1] || 'application/pdf';
        const byteCharacters = atob(parts[1]);
        const byteNumbers = new Uint8Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const blob = new Blob([byteNumbers], { type: mime });
        const objectUrl = URL.createObjectURL(blob);
        setBlobUrl(objectUrl);

        return () => {
          URL.revokeObjectURL(objectUrl);
        };
      } catch (e) {
        setBlobUrl(activeUrl);
      }
    } else if (activeUrl.startsWith('/files/') || activeUrl.startsWith('/uploads/')) {
      const cleanPath = activeUrl
        .split('/')
        .map((part) => (part ? encodeURIComponent(decodeURIComponent(part)) : ''))
        .join('/');
      setBlobUrl(cleanPath);
    } else {
      setBlobUrl(activeUrl);
    }
  }, [fileUrl, title, codeOrNum]);

  // Actions
  const handleDownload = () => {
    downloadDocumentFile(title, codeOrNum, fileUrl, fileName);
  };

  const handlePrint = () => {
    if (activeMode === 'reader') {
      window.print();
      return;
    }
    const printWindow = window.open(blobUrl || fileUrl, '_blank');
    if (printWindow) {
      printWindow.focus();
    }
  };

  const handleOpenNewTab = () => {
    window.open(blobUrl || fileUrl, '_blank');
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      id="pdf-document-viewer"
      className={`w-full flex flex-col bg-[#1A1F26] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-gray-700/80 transition-all ${
        isFullscreen ? 'fixed inset-0 z-[9999] h-screen w-screen rounded-none' : 'h-[85vh] sm:h-[90vh] min-h-[650px] sm:min-h-[850px]'
      }`}
      dir="rtl"
    >
      {/* Top Professional Document Bar */}
      <div className="bg-[#12161C] text-white px-3 sm:px-6 py-3 flex items-center justify-between border-b border-gray-800 shrink-0 gap-3 z-10 flex-wrap">
        {/* Left: Document Identity */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[#0B6B4F]/25 border border-[#0B6B4F]/50 flex items-center justify-center text-[#C9A45C] shrink-0 shadow-inner">
            <FileText className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-bold text-xs sm:text-sm text-white truncate max-w-[200px] sm:max-w-md">
                {title}
              </h2>
              <span className="px-2 py-0.5 rounded-md bg-[#0B6B4F]/20 text-[#4ECCA3] border border-[#0B6B4F]/40 text-[10px] sm:text-xs font-mono font-bold shrink-0">
                {codeOrNum}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-0.5">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3 h-3" />
                {isAr ? 'وثيقة رسمية معتمدة' : 'Official Verified Document'}
              </span>
              <span>•</span>
              <span>{isAr ? 'جمعية الشامل التعاونية' : 'AlShamel Cooperative'}</span>
            </div>
          </div>
        </div>

        {/* Center: Mode Switcher */}
        <div className="flex items-center p-1 bg-gray-900/90 border border-gray-700 rounded-xl shadow-inner">
          <button
            type="button"
            onClick={() => setActiveMode('pdf')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'pdf'
                ? 'bg-[#0B6B4F] text-white shadow-xs'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>{isAr ? 'عارض PDF' : 'PDF Viewer'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('reader')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'reader'
                ? 'bg-[#0B6B4F] text-white shadow-xs'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isAr ? 'العرض المنسق' : 'Reading View'}</span>
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            type="button"
            onClick={handleOpenNewTab}
            title={isAr ? 'فتح في نافذة كاملة' : 'Open Full Tab'}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-gray-200 hover:text-white border border-gray-700 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium"
          >
            <ExternalLink className="w-4 h-4 text-[#C9A45C]" />
            <span className="hidden md:inline">{isAr ? 'فتح بصفحة كاملة' : 'Open Tab'}</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            title={isAr ? 'طباعة' : 'Print'}
            className="p-2 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-gray-200 hover:text-white border border-gray-700 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleDownload}
            title={isAr ? 'تحميل ملف PDF' : 'Download PDF'}
            className="px-3 sm:px-4 py-2 rounded-xl bg-[#0B6B4F] hover:bg-[#095B42] text-white transition-all cursor-pointer font-bold flex items-center gap-1.5 text-xs shadow-md hover:shadow-emerald-900/30"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">{isAr ? 'تحميل PDF' : 'Download'}</span>
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            title={isFullscreen ? (isAr ? 'تصغير' : 'Exit Fullscreen') : (isAr ? 'ملء الشاشة' : 'Fullscreen')}
            className="p-2 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-gray-200 hover:text-white border border-gray-700 transition-colors cursor-pointer"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Viewing Area */}
      <div className="flex-1 min-h-0 w-full bg-[#1e232a] relative overflow-auto">
        {activeMode === 'pdf' ? (
          /* Native Interactive PDF Embed (High-performance, GPU accelerated) */
          <div className="w-full h-full bg-white relative">
            <iframe
              src={`${blobUrl || fileUrl}#toolbar=1&navpanes=0&view=FitH`}
              title={title}
              className="w-full h-full border-0 block bg-white"
            />
          </div>
        ) : (
          /* Structured Official Reading Mode (Luxury Printable Document) */
          <div className="w-full h-full overflow-y-auto p-4 sm:p-8 bg-[#2A303C] flex justify-center">
            <div className="w-full max-w-3xl bg-white text-gray-900 rounded-2xl p-6 sm:p-12 shadow-2xl space-y-8 my-auto border border-gray-300">
              {/* Official Document Header */}
              <div className="flex items-center justify-between border-b-2 border-[#0B6B4F] pb-6">
                <div className="space-y-1 text-start">
                  <h3 className="text-xl font-black text-[#0B6B4F]">جمعية الشامل التعاونية</h3>
                  <p className="text-xs text-gray-600 font-semibold">المملكة العربية السعودية • ترخيص رقم 234</p>
                  <p className="text-[11px] font-mono text-gray-500">رمز الوثيقة: {codeOrNum}</p>
                </div>
                <div className="text-center">
                  <img src="/logo.png" alt="Logo" className="h-16 w-auto object-contain mx-auto" />
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 inline-block mt-1">
                    وثيقة معتمدة رسمياً
                  </span>
                </div>
              </div>

              {/* Title and Metadata Box */}
              <div className="bg-[#F8FAF8] p-5 rounded-2xl border border-gray-200/80 space-y-3">
                <h2 className="text-xl font-black text-[#12332B] text-center leading-snug">
                  {title}
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-600 font-medium pt-2 border-t border-gray-200">
                  {date && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#0B6B4F]" />
                      <span>تاريخ الاعتماد: {date}</span>
                    </span>
                  )}
                  {approvedBy && (
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#0B6B4F]" />
                      <span>جهة الاعتماد: {approvedBy}</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Document Articles / Content Sections */}
              {articles && articles.length > 0 ? (
                <div className="space-y-6 text-start">
                  {articles.map((art, idx) => (
                    <div key={idx} className="space-y-2">
                      <h4 className="font-bold text-sm text-[#0B6B4F] flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-[#0B6B4F] text-xs flex items-center justify-center font-bold">
                          {idx + 1}
                        </span>
                        <span>{art.title}</span>
                      </h4>
                      <div className="space-y-1.5 ps-8 text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                        {art.content.map((p, pIdx) => (
                          <p key={pIdx}>{p}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed text-start">
                  <p>
                    تعتبر هذه الوثيقة لائحة ونظاماً تنظيمياً معتمداً من قبل مجلس إدارة الجمعية العمومية لتعاونية الشامل، وتخضع لأحكام وإشراف المركز الوطني لتنمية القطاع غير الربحي.
                  </p>
                  <p>
                    تسري كافة الأحكام الواردة في هذه الوثيقة من تاريخ اعتمادها وتعتبر ملزمة لجميع الإدارات والأطراف ذات العلاقة.
                  </p>
                </div>
              )}

              {/* Official Seal and Signature Stamp */}
              <div className="pt-8 border-t-2 border-gray-200 flex flex-wrap items-center justify-between gap-6">
                <div className="text-start space-y-1">
                  <p className="text-xs font-bold text-gray-800">اعتماد مجلس الإدارة</p>
                  <p className="text-[11px] text-gray-500">جمعية الشامل التعاونية</p>
                </div>
                <div className="p-3 border-2 border-dashed border-[#0B6B4F]/40 rounded-2xl bg-[#EBF4F0]/40 text-center px-6">
                  <ShieldCheck className="w-6 h-6 text-[#0B6B4F] mx-auto mb-1" />
                  <span className="text-[10px] font-black text-[#0B6B4F] block tracking-wider">ختم التوثيق الرسمي</span>
                  <span className="text-[9px] font-mono text-gray-500">{codeOrNum}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
