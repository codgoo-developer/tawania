import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Newspaper,
  Calendar,
  Clock,
  Search,
  ArrowLeft,
  ArrowRight,
  Filter
} from 'lucide-react';
import { useI18n } from '../i18n';
import { newsData } from '../data/news';
import { PageHero } from '../components/layout/PageHero';
import { Button } from '../components/ui/Button';

export const NewsPage: React.FC = () => {
  const { locale, t, dir, getLocalized, getLocalizedPath } = useI18n();
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const categories = [
    { key: 'all', label: t.newsPage.filterAll },
    { key: 'events', label: t.newsPage.filterEvents },
    { key: 'projects', label: t.newsPage.filterProjects },
    { key: 'agreements', label: t.newsPage.filterAgreements },
  ];

  const filteredNews = newsData.filter((item) => {
    const matchesCat = selectedCat === 'all' || item.categoryKey === selectedCat;
    const matchesSearch =
      getLocalized(item.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
      getLocalized(item.excerpt).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-20">
      <PageHero
        badge={t.newsPage.badge}
        title={t.newsPage.title}
        subtitle={t.newsPage.subtitle}
        breadcrumbs={[
          { label: t.nav.mediaDropdown, url: '/media' },
          { label: t.nav.news }
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filters and Search Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-[#12332B]/10 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCat(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCat === cat.key
                    ? 'bg-gradient-to-br from-[#0B6B4F] to-[#095B42] text-white shadow-xs'
                    : 'bg-[#F7F8F6] text-[#68736F] hover:bg-[#EBF4F0] hover:text-[#0B6B4F] border border-[#12332B]/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#68736F] absolute start-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={locale === 'ar' ? 'بحث في الأخبار...' : 'Search news...'}
              className="w-full ps-9 pe-4 py-2 text-xs rounded-xl border border-[#12332B]/15 bg-[#F7F8F6] text-[#17211E] outline-none focus:border-[#0B6B4F] focus:bg-white"
            />
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item) => (
            <article
              key={item.slug}
              className="bg-white rounded-2xl border border-[#12332B]/10 overflow-hidden shadow-xs hover:shadow-md hover:border-[#0B6B4F]/30 transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-52 bg-gradient-to-br from-[#12332B] to-[#0B211C] overflow-hidden">
                <img
                  src={item.image}
                  alt={getLocalized(item.title)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12332B]/80 via-transparent to-transparent" />
                <div className="absolute top-3 start-3">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-gradient-to-br from-[#0B6B4F] to-[#095B42] text-white">
                    {getLocalized(item.category)}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-[#68736F] mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{getLocalized(item.readTime)}</span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#12332B] group-hover:text-[#0B6B4F] transition-colors leading-snug line-clamp-2">
                    {getLocalized(item.title)}
                  </h3>

                  <p className="text-xs text-[#68736F] mt-2 line-clamp-3 leading-relaxed">
                    {getLocalized(item.excerpt)}
                  </p>
                </div>

                <Link
                  to={getLocalizedPath(`/news/${item.slug}`)}
                  className="pt-3 border-t border-[#12332B]/5 flex items-center justify-between text-xs font-bold text-[#0B6B4F] group-hover:underline"
                >
                  <span>{t.common.readMore}</span>
                  <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </Link>
              </div>
            </article>
          ))}

          {filteredNews.length === 0 && (
            <div className="col-span-full py-16 text-center text-[#68736F] bg-white rounded-2xl border border-[#12332B]/10">
              <p className="text-sm">{t.common.noResults}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
