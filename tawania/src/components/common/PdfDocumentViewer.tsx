import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Download,
  Printer,
  Maximize2,
  Minimize2,
  FileText,
  ExternalLink,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Loader2,
  AlertCircle
} from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import { useI18n } from '../../i18n';
import { downloadDocumentFile, getDocumentPdfUrl } from '../../context/GovernanceDataContext';

// Configure PDF.js worker & standard fonts
const PDFJS_VERSION = pdfjsLib.version || '3.11.174';
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.js`;

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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activePdfUrl, setActivePdfUrl] = useState<string>('');
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [pageNum, setPageNum] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.15);
  const [rotation, setRotation] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Compute resolved PDF URL
  useEffect(() => {
    setError(null);
    setLoading(true);

    if (fileUrl) {
      if (fileUrl.startsWith('data:application/pdf') || fileUrl.startsWith('blob:') || fileUrl.startsWith('http')) {
        setActivePdfUrl(fileUrl);
      } else if (fileUrl.startsWith('/files/') || fileUrl.startsWith('/uploads/')) {
        const cleanPath = fileUrl
          .split('/')
          .map((part) => (part ? encodeURIComponent(decodeURIComponent(part)) : ''))
          .join('/');
        setActivePdfUrl(cleanPath);
      } else {
        setActivePdfUrl(fileUrl);
      }
    } else {
      const generated = getDocumentPdfUrl(title, codeOrNum);
      setActivePdfUrl(generated);
    }
  }, [fileUrl, title, codeOrNum]);

  // Load PDF Document safely by fetching ArrayBuffer and configuring CMaps & Standard Fonts
  useEffect(() => {
    if (!activePdfUrl) return;

    let isMounted = true;
    setLoading(true);
    setError(null);

    const loadPdfData = async () => {
      try {
        let pdfData: Uint8Array;

        if (activePdfUrl.startsWith('data:application/pdf')) {
          const parts = activePdfUrl.split(',');
          const byteCharacters = atob(parts[1]);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          pdfData = new Uint8Array(byteNumbers);
        } else {
          // Standard HTTP / relative fetch
          const response = await fetch(activePdfUrl);
          if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
          }
          const arrayBuffer = await response.arrayBuffer();
          pdfData = new Uint8Array(arrayBuffer);
        }

        if (!isMounted) return;

        const loadingTask = pdfjsLib.getDocument({
          data: pdfData,
          cMapUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/cmaps/`,
          cMapPacked: true,
          standardFontDataUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/standard_fonts/`,
          enableXfa: true,
          disableFontFace: false,
          isEvalSupported: false,
        });

        const doc = await loadingTask.promise;
        if (isMounted) {
          setPdfDoc(doc);
          setNumPages(doc.numPages);
          setPageNum(1);
          setLoading(false);
        }
      } catch (err: any) {
        console.error('Error loading PDF with PDF.js:', err);
        if (isMounted) {
          setError(err?.message || 'Failed to load PDF');
          setLoading(false);
        }
      }
    };

    loadPdfData();

    return () => {
      isMounted = false;
    };
  }, [activePdfUrl]);

  // Render current page onto Canvas with crisp font scaling
  const renderPage = useCallback(
    async (pageNumber: number) => {
      if (!pdfDoc || !canvasRef.current) return;

      try {
        const page = await pdfDoc.getPage(pageNumber);
        const viewport = page.getViewport({ scale, rotation });
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d', { alpha: false });

        if (!context) return;

        // High-DPI screen scaling for ultra crisp text and fonts
        const outputScale = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined;

        // Fill background white
        context.fillStyle = '#FFFFFF';
        context.fillRect(0, 0, canvas.width, canvas.height);

        const renderContext = {
          canvasContext: context,
          transform: transform,
          viewport: viewport,
          background: 'rgba(255,255,255,1)',
        };

        await page.render(renderContext).promise;
      } catch (err: any) {
        if (err?.name !== 'RenderingCancelledException') {
          console.error('Page render error:', err);
        }
      }
    },
    [pdfDoc, scale, rotation]
  );

  useEffect(() => {
    if (pdfDoc) {
      renderPage(pageNum);
    }
  }, [pdfDoc, pageNum, renderPage]);

  // Controls
  const prevPage = () => setPageNum((prev) => Math.max(prev - 1, 1));
  const nextPage = () => setPageNum((prev) => Math.min(prev + 1, numPages));
  const zoomIn = () => setScale((prev) => Math.min(prev + 0.15, 2.5));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.15, 0.6));
  const rotateRight = () => setRotation((prev) => (prev + 90) % 360);

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
    downloadDocumentFile(title, codeOrNum, activePdfUrl, fileName);
  };

  const handlePrint = () => {
    if (canvasRef.current) {
      try {
        const dataUrl = canvasRef.current.toDataURL('image/png');
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(`
            <!DOCTYPE html>
            <html dir="${isAr ? 'rtl' : 'ltr'}">
              <head>
                <title>${title} - ${codeOrNum}</title>
                <style>
                  @page { size: auto; margin: 10mm; }
                  body { margin: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: sans-serif; }
                  img { max-width: 100%; height: auto; display: block; }
                  .header { margin-bottom: 12px; font-size: 14px; font-weight: bold; color: #12332B; text-align: center; }
                </style>
              </head>
              <body>
                <div class="header">${title} | ${codeOrNum}</div>
                <img src="${dataUrl}" onload="window.print();window.close();" />
              </body>
            </html>
          `);
          printWindow.document.close();
        }
      } catch (err) {
        window.open(activePdfUrl, '_blank')?.print();
      }
    } else {
      window.open(activePdfUrl, '_blank');
    }
  };

  const handleOpenNewTab = () => {
    window.open(activePdfUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      ref={containerRef}
      className={`w-full flex flex-col bg-[#12161C] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-gray-700/80 transition-all ${
        isFullscreen
          ? 'fixed inset-0 z-50 rounded-none h-screen min-h-screen'
          : 'h-[85vh] sm:h-[90vh] min-h-[650px] sm:min-h-[850px]'
      }`}
      dir="rtl"
    >
      {/* Top Controls Toolbar (Sticky, sleek header) */}
      <div className="bg-[#12161C] text-white px-3 sm:px-6 py-3 flex items-center justify-between border-b border-gray-800 shrink-0 gap-3 z-20 flex-wrap">
        {/* Left: Document Identity info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[#0B6B4F]/25 border border-[#0B6B4F]/50 flex items-center justify-center text-[#C9A45C] shrink-0 shadow-inner">
            <FileText className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xs sm:text-sm font-bold text-white truncate max-w-[200px] sm:max-w-md">
                {title}
              </h3>
              {codeOrNum && (
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#0B6B4F]/40 text-emerald-300 border border-[#0B6B4F]/60 shrink-0">
                  {codeOrNum}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-0.5">
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <ShieldCheck className="w-3 h-3" />
                {isAr ? 'وثيقة رسمية معتمدة' : 'Official Verified Document'}
              </span>
              <span>•</span>
              <span>{isAr ? 'جمعية الشامل التعاونية' : 'AlShamel Cooperative'}</span>
            </div>
          </div>
        </div>

        {/* Center: Pagination & Zoom Navigation */}
        {pdfDoc && (
          <div className="flex items-center gap-1 bg-gray-900/90 border border-gray-700/80 rounded-xl px-2 py-1 shadow-inner">
            {/* Page navigation */}
            <button
              type="button"
              onClick={prevPage}
              disabled={pageNum <= 1}
              title={isAr ? 'الصفحة السابقة' : 'Previous Page'}
              className="p-1.5 rounded-lg hover:bg-gray-800 disabled:opacity-30 disabled:hover:bg-transparent text-gray-200 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono px-2 text-gray-300 font-bold">
              {pageNum} / {numPages}
            </span>
            <button
              type="button"
              onClick={nextPage}
              disabled={pageNum >= numPages}
              title={isAr ? 'الصفحة التالية' : 'Next Page'}
              className="p-1.5 rounded-lg hover:bg-gray-800 disabled:opacity-30 disabled:hover:bg-transparent text-gray-200 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="h-4 w-[1px] bg-gray-700 mx-1" />

            {/* Zoom Controls */}
            <button
              type="button"
              onClick={zoomOut}
              title={isAr ? 'تصغير' : 'Zoom Out'}
              className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-200 transition-colors cursor-pointer"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono text-gray-300 px-1 font-bold">
              {Math.round(scale * 100)}%
            </span>
            <button
              type="button"
              onClick={zoomIn}
              title={isAr ? 'تكبير' : 'Zoom In'}
              className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-200 transition-colors cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            <div className="h-4 w-[1px] bg-gray-700 mx-1" />

            {/* Rotate */}
            <button
              type="button"
              onClick={rotateRight}
              title={isAr ? 'تدوير' : 'Rotate'}
              className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-200 transition-colors cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Open in new tab */}
          <button
            type="button"
            onClick={handleOpenNewTab}
            title={isAr ? 'فتح في علامة تبويب جديدة' : 'Open in New Tab'}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-gray-200 hover:text-white border border-gray-700 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-medium"
          >
            <ExternalLink className="w-4 h-4 text-[#C9A45C]" />
            <span className="hidden md:inline">{isAr ? 'فتح بصفحة كاملة' : 'Open Tab'}</span>
          </button>

          {/* Print */}
          <button
            type="button"
            onClick={handlePrint}
            title={isAr ? 'طباعة' : 'Print'}
            className="p-2 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-gray-200 hover:text-white border border-gray-700 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Download */}
          <button
            type="button"
            onClick={handleDownload}
            title={isAr ? 'تحميل ملف PDF' : 'Download PDF'}
            className="px-3 sm:px-4 py-2 rounded-xl bg-[#0B6B4F] hover:bg-[#095B42] text-white transition-all cursor-pointer font-bold flex items-center gap-1.5 text-xs shadow-md hover:shadow-emerald-900/30"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">{isAr ? 'تحميل PDF' : 'Download'}</span>
          </button>

          {/* Fullscreen */}
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

      {/* Canvas PDF Viewer Body - Positioned with proper top padding so nothing is ever cut off */}
      <div className="flex-1 min-h-0 w-full bg-[#1e232a] relative overflow-auto p-4 sm:p-8 flex flex-col items-center">
        {loading && (
          <div className="flex flex-col items-center justify-center text-gray-300 py-20 m-auto">
            <Loader2 className="w-10 h-10 text-[#C9A45C] animate-spin mb-3" />
            <p className="text-sm font-bold text-white">
              {isAr ? 'جاري قراءة ومعالجة وثيقة الـ PDF بدقة عالية...' : 'Rendering high-definition PDF document...'}
            </p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-800/90 rounded-2xl border border-red-500/30 max-w-md mx-auto m-auto">
            <AlertCircle className="w-12 h-12 text-amber-400 mb-3" />
            <h3 className="text-base font-bold text-white mb-2">
              {isAr ? 'تعذر عرض الوثيقة عبر العارض التفاعلي' : 'Interactive Viewer Unavailable'}
            </h3>
            <p className="text-xs text-gray-300 mb-5">
              {isAr
                ? 'يمكنك فتح الوثيقة في علامة تبويب جديدة أو تنزيلها مباشرة بجودتها الأصلية.'
                : 'You can open the document in a new tab or download the original file directly.'}
            </p>
            <div className="flex items-center gap-3">
              <a
                href={activePdfUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-[#0B6B4F] text-white font-bold text-xs shadow hover:bg-[#095B42] flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                {isAr ? 'فتح في نافذة جديدة' : 'Open in New Tab'}
              </a>
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

        {!loading && !error && (
          <div className="shadow-2xl rounded-lg overflow-hidden border border-gray-700/60 bg-white transition-transform duration-150 my-auto shrink-0">
            <canvas ref={canvasRef} className="block mx-auto max-w-full" />
          </div>
        )}
      </div>
    </div>
  );
};
