import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Calendar, ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { useI18n } from '../../i18n';
import { newsData } from '../../data/news';
import { Badge } from '../ui/Badge';

export const LatestNewsSection: React.FC = () => {
  const { locale, t, dir, getLocalized, getLocalizedPath } = useI18n();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <section id="latest-news-section" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="max-w-2xl text-start">
            <Badge variant="primary" className="mb-3">
              <Newspaper className="w-3.5 h-3.5 text-[#C9A45C]" />
              <span>{t.newsSection.badge}</span>
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#12332B] tracking-tight">
              {t.newsSection.title}
            </h2>
            <p className="text-base sm:text-lg text-[#68736F] mt-2">
              {t.newsSection.subtitle}
            </p>
          </div>

          <Link
            to={getLocalizedPath('/news')}
            className="text-xs sm:text-sm font-bold text-[#0B6B4F] hover:text-[#095740] flex items-center gap-1.5 shrink-0 self-start md:self-end group"
          >
            <span>{t.newsSection.viewAllNews}</span>
            <Arrow className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        </div>

        {/* 3 News Articles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsData.slice(0, 3).map((item) => (
            <article
              key={item.slug}
              className="bg-white rounded-2xl border border-[#12332B]/10 overflow-hidden shadow-xs hover:shadow-md hover:border-[#0B6B4F]/30 transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-48 bg-gradient-to-br from-[#12332B] to-[#0B211C] overflow-hidden">
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

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
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

                  <h3 className="text-sm font-bold text-[#12332B] group-hover:text-[#0B6B4F] transition-colors leading-snug line-clamp-2">
                    {getLocalized(item.title)}
                  </h3>

                  <p className="text-xs text-[#68736F] mt-2 line-clamp-2 leading-relaxed">
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
        </div>
      </div>
    </section>
  );
};
