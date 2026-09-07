import React, { useState, useRef, useEffect } from 'react';
import {
  Download,
  Printer,
  Maximize2,
  Minimize2,
  FileText,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useI18n } from '../../i18n';
import { downloadDocumentFile, getDocumentPdfUrl } from '../../context/GovernanceDataContext';

interface PdfDocumentViewerProps {
  title: string;
  codeOrNum: string;
  fileUrl?: string;
  fileName?: string;
}

export const PdfDocumentViewer: React.FC<PdfDocumentViewerProps> = ({
  title,
  codeOrNum,
  fileUrl,
  fileName
}) => {
  const { locale } = useI18n();
  const isAr = locale === 'ar';
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [resolvedUrl, setResolvedUrl] = useState<string>('');
  const [blobUrl, setBlobUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const displayFileName = fileName || `${(title || 'Document').replace(/[^\w\s\u0600-\u06FF-]/gi, '')}.pdf`;

  // Compute resolved PDF URL & create Object/Blob URL for native high-fidelity rendering
  useEffect(() => {
    setError(null);
    setLoading(true);

    let rawUrl = '';
    if (fileUrl && fileUrl.trim()) {
      if (fileUrl.startsWith('data:application/pdf') || fileUrl.startsWith('blob:') || fileUrl.startsWith('http')) {
        rawUrl = fileUrl;
      } else if (fileUrl.startsWith('/files/') || fileUrl.startsWith('/uploads/') || fileUrl.startsWith('/')) {
        rawUrl = fileUrl;
      } else {
        rawUrl = `/${fileUrl.replace(/^\/+/, '')}`;
      }
    } else {
      rawUrl = getDocumentPdfUrl(title, codeOrNum);
    }

    setResolvedUrl(rawUrl);

    let isMounted = true;
    let createdUrl = '';

    const prepareViewer = async () => {
      try {
        if (rawUrl.startsWith('blob:')) {
          if (isMounted) {
            setBlobUrl(rawUrl);
            setLoading(false);
          }
          return;
        }

        if (rawUrl.startsWith('data:application/pdf')) {
          const parts = rawUrl.split(',');
          const byteCharacters = atob(parts[1]);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'application/pdf' });
          createdUrl = URL.createObjectURL(blob);
          if (isMounted) {
            setBlobUrl(createdUrl);
            setLoading(false);
          }
          return;
        }

        // For regular paths (/uploads/..., /files/..., http://...)
        // Use direct URL for maximum native browser fidelity and proper tab title
        if (isMounted) {
          setBlobUrl(rawUrl);
          setLoading(false);
        }
      } catch (err: any) {
        console.error('PDF Document Viewer Preparation Error:', err);
        if (isMounted) {
          setError(err.message || 'Failed to load document');
          setLoading(false);
        }
      }
    };

    prepareViewer();

    return () => {
      isMounted = false;
      if (createdUrl && createdUrl.startsWith('blob:')) {
        URL.revokeObjectURL(createdUrl);
      }
    };
  }, [fileUrl, title, codeOrNum]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleDownload = () => {
    downloadDocumentFile(title, codeOrNum, resolvedUrl || blobUrl, displayFileName);
  };

  const handlePrint = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.focus();
        iframeRef.current.contentWindow.print();
        return;
      } catch (e) {
        // Fallback
      }
    }
    const targetUrl = (resolvedUrl && !resolvedUrl.startsWith('data:')) ? resolvedUrl : blobUrl;
    const printWin = window.open(targetUrl, '_blank');
    if (printWin) {
      printWin.focus();
    }
  };

  const handleOpenNewTab = () => {
    const targetUrl = (resolvedUrl && !resolvedUrl.startsWith('data:')) ? resolvedUrl : blobUrl;
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const iframeSrc = blobUrl ? `${blobUrl}#view=FitH&toolbar=1` : '';

  return (
    <div
      ref={containerRef}
      className={`w-full flex flex-col bg-gradient-to-b from-[#08351B] to-[#042419] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-emerald-800/40 transition-all ${
        isFullscreen
          ? 'fixed inset-0 z-50 rounded-none h-screen min-h-screen'
          : 'h-[85vh] sm:h-[90vh] min-h-[650px] sm:min-h-[850px]'
      }`}
      dir="rtl"
    >
      {/* Top Controls Toolbar with Brand Gradient */}
      <div className="bg-gradient-to-r from-[#063325] via-[#0B4F26] to-[#042419] text-white px-3 sm:px-6 py-3.5 flex items-center justify-between border-b border-emerald-500/20 shrink-0 gap-3 z-20 flex-wrap shadow-md">
        {/* Left: Document Identity Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-[#84CC16]/20 border border-[#84CC16]/40 flex items-center justify-center text-[#84CC16] shrink-0 shadow-inner">
            <FileText className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xs sm:text-sm font-bold text-white truncate max-w-[200px] sm:max-w-md">
                {title}
              </h3>
              {codeOrNum && (
                <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded-md bg-[#84CC16] text-[#042419] shadow-2xs shrink-0">
                  {codeOrNum}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-[10px] text-emerald-100/80 mt-0.5">
              <span className="flex items-center gap-1 text-[#84CC16] font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                {isAr ? 'وثيقة رسمية معتمدة بدقة أصلية عالية' : 'High-Definition Verified Document'}
              </span>
              <span>•</span>
              <span className="truncate max-w-[180px] text-white/75">{displayFileName}</span>
            </div>
          </div>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 ms-auto">
          {/* Open in full page / new tab */}
          <button
            type="button"
            onClick={handleOpenNewTab}
            title={isAr ? 'فتح في علامة تبويب جديدة' : 'Open in New Tab'}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold shadow-xs hover:-translate-y-0.5"
          >
            <ExternalLink className="w-4 h-4 text-[#84CC16]" />
            <span className="hidden md:inline">{isAr ? 'فتح بصفحة كاملة' : 'Open Tab'}</span>
          </button>

          {/* Print */}
          <button
            type="button"
            onClick={handlePrint}
            title={isAr ? 'طباعة الوثيقة' : 'Print Document'}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer shadow-xs hover:-translate-y-0.5"
          >
            <Printer className="w-4 h-4 text-white" />
          </button>

          {/* Download */}
          <button
            type="button"
            onClick={handleDownload}
            title={isAr ? 'تحميل ملف PDF' : 'Download PDF'}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#84CC16] via-[#A3E635] to-[#65A30D] hover:brightness-110 text-[#042419] transition-all cursor-pointer font-black flex items-center gap-1.5 text-xs shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4 text-[#042419]" />
            <span className="hidden sm:inline">{isAr ? 'تحميل PDF' : 'Download'}</span>
          </button>

          {/* Fullscreen */}
          <button
            type="button"
            onClick={toggleFullscreen}
            title={isFullscreen ? (isAr ? 'تصغير' : 'Exit Fullscreen') : (isAr ? 'ملء الشاشة' : 'Fullscreen')}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all cursor-pointer shadow-xs hover:-translate-y-0.5"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4 text-[#84CC16]" /> : <Maximize2 className="w-4 h-4 text-[#84CC16]" />}
          </button>
        </div>
      </div>

      {/* High-Definition Native PDF Viewer Body */}
      <div className="flex-1 min-h-0 w-full bg-[#051f15] relative">
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300 bg-[#051f15] z-10">
            <div className="w-10 h-10 rounded-full border-3 border-[#84CC16] border-t-transparent animate-spin mb-3" />
            <p className="text-sm font-bold text-white">
              {isAr ? 'جاري تجهيز الوثيقة بدقتها الأصلية...' : 'Preparing high-definition document...'}
            </p>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-[#1e232a] z-10 max-w-md mx-auto">
            <AlertCircle className="w-12 h-12 text-amber-400 mb-3" />
            <h3 className="text-base font-bold text-white mb-2">
              {isAr ? 'تعذر تحميل الوثيقة' : 'Document Unavailable'}
            </h3>
            <p className="text-xs text-gray-300 mb-5">
              {isAr
                ? 'يمكنك فتح الوثيقة في علامة تبويب جديدة أو تنزيلها مباشرة.'
                : 'You can open the document in a new tab or download the file directly.'}
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleOpenNewTab}
                className="px-4 py-2 rounded-xl bg-[#0B4F26] text-white font-bold text-xs shadow hover:bg-[#0B4F26] flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                {isAr ? 'فتح في نافذة جديدة' : 'Open in New Tab'}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="px-4 py-2 rounded-xl bg-gray-700 text-white font-bold text-xs hover:bg-gray-600 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                {isAr ? 'تحميل الملف' : 'Download File'}
              </button>
            </div>
          </div>
        )}

        {/* Native Chromium / PDFium High-Fidelity Viewer */}
        {iframeSrc && (
          <iframe
            ref={iframeRef}
            src={iframeSrc}
            title={`${title} - ${codeOrNum}`}
            className="w-full h-full border-0 bg-white"
            onLoad={() => setLoading(false)}
          />
        )}
      </div>
    </div>
  );
};
