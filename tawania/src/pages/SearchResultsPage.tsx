import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ArrowLeft, ArrowRight, FileText, Briefcase, Newspaper, FileCheck, ShieldCheck } from 'lucide-react';
import { useI18n } from '../i18n';
import { performGlobalSearch } from '../lib/search';
import { SearchResultItem } from '../types';
import { PageHero } from '../components/layout/PageHero';
import { Badge } from '../components/ui/Badge';

export const SearchResultsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const { locale, t, dir } = useI18n();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      setResults(performGlobalSearch(initialQuery, locale));
    }
  }, [initialQuery, locale]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearchParams({ q: query });
    setResults(performGlobalSearch(query, locale));
  };

  const getResultIcon = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'project': return <Briefcase className="w-5 h-5 text-[#0B6B4F]" />;
      case 'report': return <FileCheck className="w-5 h-5 text-[#C9A45C]" />;
      case 'document': return <FileText className="w-5 h-5 text-[#0B6B4F]" />;
      case 'news': return <Newspaper className="w-5 h-5 text-[#0B6B4F]" />;
      default: return <ShieldCheck className="w-5 h-5 text-[#C9A45C]" />;
    }
  };

  return (
    <div className="space-y-12 pb-20">
      <PageHero
        badge={locale === 'ar' ? 'البحث الشامل' : 'Global Search'}
        title={locale === 'ar' ? 'نتائج البحث' : 'Search Results'}
        subtitle={
          initialQuery
            ? (locale === 'ar' ? `نتائج البحث عن: "${initialQuery}"` : `Results for: "${initialQuery}"`)
            : (locale === 'ar' ? 'ابحث في كافة مشاريع، لوائح، تقارير وأخبار الجمعية' : 'Search across all society projects, bylaws, reports and news')
        }
        breadcrumbs={[{ label: locale === 'ar' ? 'البحث' : 'Search' }]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Input Box */}
        <form onSubmit={handleSearch} className="relative mb-8">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.search.placeholder}
            className="w-full ps-12 pe-28 py-3.5 text-sm rounded-2xl border-2 border-[#12332B]/15 bg-white text-[#17211E] outline-none focus:border-[#0B6B4F] shadow-xs"
          />
          <Search className="w-5 h-5 text-[#68736F] absolute start-4 top-1/2 -translate-y-1/2" />
          <button
            type="submit"
            className="absolute end-2 top-1/2 -translate-y-1/2 px-5 py-2 bg-gradient-to-br from-[#0B6B4F] to-[#095B42] text-white rounded-xl text-xs font-bold hover:brightness-110 transition-all cursor-pointer"
          >
            {t.search.searchButton}
          </button>
        </form>

        {/* Results List */}
        <div className="space-y-4">
          <div className="text-xs font-bold text-[#68736F] flex items-center justify-between pb-2 border-b border-[#12332B]/5">
            <span>
              {locale === 'ar' ? `تم العثور على (${results.length}) نتيجة` : `Found (${results.length}) results`}
            </span>
          </div>

          {results.map((res) => (
            <Link
              key={res.id}
              to={res.url}
              className="block bg-white p-5 rounded-2xl hover:border-[#0B6B4F]/40 hover:shadow-xs transition-all duration-200 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#EBF4F0] flex items-center justify-center shrink-0 mt-0.5">
                  {getResultIcon(res.type)}
                </div>

                <div className="flex-1 min-w-0 space-y-1 text-start">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F7F8F6] text-[#0B6B4F]">
                      {res.typeName}
                    </span>
                    {res.category && (
                      <span className="text-[10px] text-[#68736F]">
                        • {res.category}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-[#12332B] group-hover:text-[#0B6B4F] transition-colors">
                    {res.title}
                  </h3>

                  <p className="text-xs text-[#68736F] line-clamp-2 leading-relaxed">
                    {res.excerpt}
                  </p>
                </div>

                <Arrow className="w-4 h-4 text-[#68736F] group-hover:text-[#0B6B4F] shrink-0 self-center transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </div>
            </Link>
          ))}

          {results.length === 0 && initialQuery && (
            <div className="py-16 text-center text-[#68736F] bg-white rounded-2xl space-y-2">
              <Search className="w-8 h-8 mx-auto text-gray-300" />
              <p className="text-sm font-semibold">{t.search.noResults}</p>
              <p className="text-xs text-gray-400">
                {locale === 'ar' ? 'جرب البحث بكلمات أخرى مثل "غاز"، "ثلاجة"، "تقرير 2024"، أو "اكتتاب"' : 'Try searching for "Gas", "Cold Storage", "2024 Report", or "Subscription"'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
