import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, ArrowLeft, FileText, Briefcase, Newspaper, FileCheck, Building, Sparkles } from 'lucide-react';
import { useI18n } from '../../i18n';
import { performGlobalSearch } from '../../lib/search';
import { SearchResultItem } from '../../types';

export const GlobalSearchModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { locale, t, dir } = useI18n();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length > 1) {
      const res = performGlobalSearch(query, locale);
      setResults(res);
    } else {
      setResults([]);
    }
  }, [query, locale]);

  const handleSelect = (url: string) => {
    navigate(url);
    onClose();
  };

  const handleFullSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/${locale}/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  if (!isOpen) return null;

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'project': return <Briefcase className="w-4 h-4 text-[#0B6B4F]" />;
      case 'news': return <Newspaper className="w-4 h-4 text-blue-600" />;
      case 'document': return <FileText className="w-4 h-4 text-amber-600" />;
      case 'report': return <FileCheck className="w-4 h-4 text-emerald-600" />;
      default: return <Building className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div
      id="global-search-modal"
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-20 bg-[#12332B]/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <form onSubmit={handleFullSearch} className="p-4 border-b border-[#12332B]/10 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#0B6B4F] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.common.search}
            className="w-full text-base bg-transparent text-[#17211E] placeholder:text-[#68736F] outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="text-[#68736F] hover:text-[#17211E] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-xs px-2.5 py-1 bg-[#F7F8F6] hover:bg-[#EBF4F0] text-[#68736F] rounded-md font-mono"
          >
            ESC
          </button>
        </form>

        {/* Search Results / Suggestions */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-gray-100">
          {query.trim().length === 0 ? (
            <div className="py-8 text-center text-[#68736F]">
              <Sparkles className="w-8 h-8 text-[#C9A45C] mx-auto mb-2 opacity-80" />
              <p className="text-sm font-medium">
                {locale === 'ar' ? 'ابحث عن المشاريع، التقارير المالية، اللوائح، والأخبار' : 'Search for projects, financial reports, bylaws, and news'}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                {['ثلاجة الشامل', 'غاز الشامل', 'استهلاكية الشامل', 'التقرير السنوي', 'الحوكمة'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setQuery(tag)}
                    className="text-xs px-3 py-1 bg-[#F7F8F6] hover:bg-[#EBF4F0] text-[#0B6B4F] rounded-full border border-[#0B6B4F]/15 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-1">
              <div className="text-xs font-semibold text-[#68736F] px-2 py-1 flex items-center justify-between">
                <span>{t.common.searchResults} ({results.length})</span>
                <button
                  type="button"
                  onClick={handleFullSearch}
                  className="text-[#0B6B4F] hover:underline text-xs flex items-center gap-1"
                >
                  <span>{t.common.viewAll}</span>
                  {dir === 'rtl' ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                </button>
              </div>
              {results.slice(0, 6).map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item.url)}
                  className="p-3 rounded-xl hover:bg-[#F7F8F6] cursor-pointer transition-colors flex items-start gap-3 group"
                >
                  <div className="p-2 rounded-lg bg-gray-50 border border-gray-100 group-hover:bg-white group-hover:border-[#0B6B4F]/20 mt-0.5">
                    {getItemIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-medium px-2 py-0.5 bg-gray-100 text-gray-700 rounded-sm">
                        {item.typeName}
                      </span>
                      <h4 className="text-sm font-semibold text-[#17211E] truncate group-hover:text-[#0B6B4F]">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[#68736F] line-clamp-1">{item.excerpt}</p>
                  </div>
                  {dir === 'rtl' ? (
                    <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-[#0B6B4F] transition-transform group-hover:-translate-x-1" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#0B6B4F] transition-transform group-hover:translate-x-1" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-[#68736F]">
              <p className="text-sm">{t.common.noResults}</p>
              <p className="text-xs mt-1 text-gray-400">
                {locale === 'ar' ? 'جرّب البحث بكلمات أخرى أو تصفح الأقسام الرئيسية' : 'Try searching with different keywords or browse main sections'}
              </p>
            </div>
          )}
        </div>

        {/* Search Footer */}
        <div className="p-3 bg-[#F7F8F6] border-t border-[#12332B]/10 text-xs text-[#68736F] flex items-center justify-between">
          <span>{locale === 'ar' ? 'اضغط Enter للبحث الشامل' : 'Press Enter for full search results'}</span>
          <button
            type="button"
            onClick={handleFullSearch}
            className="font-medium text-[#0B6B4F] hover:underline"
          >
            {locale === 'ar' ? 'صفحة النتائج الكاملة ←' : 'Full Results Page →'}
          </button>
        </div>
      </div>
    </div>
  );
};
