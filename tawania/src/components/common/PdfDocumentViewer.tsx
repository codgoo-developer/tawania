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

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '3.11.174'}/pdf.worker.min.js`;

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
  const [scale, setScale] = useState<number>(1.2);
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

  // Load PDF Document safely by fetching ArrayBuffer first
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
          // Standard HTTP/relative fetch (handles 200 OK cleanly)
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
          cMapUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '3.11.174'}/cmaps/`,
          cMapPacked: true,
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

  // Render current page onto Canvas
  const renderPage = useCallback(
    async (pageNumber: number) => {
      if (!pdfDoc || !canvasRef.current) return;

      try {
        const page = await pdfDoc.getPage(pageNumber);
        const viewport = page.getViewport({ scale, rotation });
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (!context) return;

        // Support crisp high-DPI displays
        const outputScale = window.devicePixelRatio || 1;
        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

        const renderContext = {
          canvasContext: context,
          transform: transform || undefined,
          viewport: viewport
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

  // Page Controls
  const prevPage = () => {
    if (pageNum > 1) setPageNum((prev) => prev - 1);
  };

  const nextPage = () => {
    if (pageNum < numPages) setPageNum((prev) => prev + 1);
  };

  // Zoom Controls
  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3.0));
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.6));
  const rotateRight = () => setRotation((prev) => (prev + 90) % 360);

  // Actions
  const handleDownload = () => {
    downloadDocumentFile(title, codeOrNum, fileUrl, fileName);
  };

  const handlePrint = () => {
    if (activePdfUrl) {
      const printWindow = window.open(activePdfUrl, '_blank');
      if (printWindow) {
        printWindow.focus();
        printWindow.print();
      }
    } else {
      window.print();
    }
  };

  const handleOpenNewTab = () => {
    if (activePdfUrl) {
      window.open(activePdfUrl, '_blank');
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current?.requestFullscreen) {
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

  return (
    <div
      ref={containerRef}
      className={`w-full flex flex-col bg-[#1A1F26] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-gray-700/80 transition-all ${
        isFullscreen
          ? 'fixed inset-0 z-50 rounded-none h-screen w-screen'
          : 'h-[85vh] sm:h-[90vh] min-h-[650px] sm:min-h-[850px]'
      }`}
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Sleek Top Toolbar Header */}
      <div className="bg-[#12161C] text-white px-3 sm:px-6 py-3 flex items-center justify-between border-b border-gray-800 shrink-0 gap-3 z-10 flex-wrap">
        {/* Left: Document details */}
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

        {/* Center: Pagination & Zoom Navigation */}
        {pdfDoc && (
          <div className="flex items-center gap-1 bg-gray-900/90 border border-gray-700/80 rounded-xl px-2 py-1 shadow-inner">
            {/* Page navigation */}
            <button
              type="button"
              onClick={prevPage}
              disabled={pageNum <= 1}
              title={isAr ? 'الصفحة السابقة' : 'Previous Page'}
              className="p-1.5 rounded-lg hover:bg-gray-800 disabled:opacity-30 disabled:hover:bg-transparent text-gray-200 transition-colors"
            >
              {isAr ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
            <span className="text-xs font-mono px-2 text-gray-300 font-bold">
              {pageNum} / {numPages}
            </span>
            <button
              type="button"
              onClick={nextPage}
              disabled={pageNum >= numPages}
              title={isAr ? 'الصفحة التالية' : 'Next Page'}
              className="p-1.5 rounded-lg hover:bg-gray-800 disabled:opacity-30 disabled:hover:bg-transparent text-gray-200 transition-colors"
            >
              {isAr ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>

            <div className="h-4 w-[1px] bg-gray-700 mx-1" />

            {/* Zoom Controls */}
            <button
              type="button"
              onClick={zoomOut}
              title={isAr ? 'تصغير' : 'Zoom Out'}
              className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-200 transition-colors"
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
              className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-200 transition-colors"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            <div className="h-4 w-[1px] bg-gray-700 mx-1" />

            {/* Rotate */}
            <button
              type="button"
              onClick={rotateRight}
              title={isAr ? 'تدوير' : 'Rotate'}
              className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-200 transition-colors"
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

      {/* Canvas PDF Viewer Body */}
      <div className="flex-1 min-h-0 w-full bg-[#1e232a] relative overflow-auto flex items-center justify-center p-4">
        {loading && (
          <div className="flex flex-col items-center justify-center text-gray-300 py-12">
            <Loader2 className="w-10 h-10 text-[#C9A45C] animate-spin mb-3" />
            <p className="text-sm font-bold text-white">
              {isAr ? 'جاري قراءة ومعالجة وثيقة الـ PDF بدقة عالية...' : 'Rendering high-definition PDF document...'}
            </p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-800/90 rounded-2xl border border-red-500/30 max-w-md mx-auto">
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
          <div className="shadow-2xl rounded-lg overflow-hidden border border-gray-700/60 bg-white transition-transform duration-150">
            <canvas ref={canvasRef} className="block mx-auto max-w-full" />
          </div>
        )}
      </div>
    </div>
  );
};
