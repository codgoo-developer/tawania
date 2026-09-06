import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  User,
  Share2,
  Check,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Tag
} from 'lucide-react';
import { useI18n } from '../i18n';
import { getNewsBySlug, newsData } from '../data/news';
import { PageHero } from '../components/layout/PageHero';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const NewsDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { locale, t, dir, getLocalized, getLocalizedPath } = useI18n();
  const [copied, setCopied] = useState(false);
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  const article = slug ? getNewsBySlug(slug) : undefined;

  if (!article) {
    return <Navigate to={getLocalizedPath('/news')} replace />;
  }

  const relatedNews = newsData.filter((n) => n.slug !== article.slug).slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `${getLocalized(article.title)} - ${window.location.href}`
  )}`;

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    getLocalized(article.title)
  )}&url=${encodeURIComponent(window.location.href)}`;

  return (
    <div className="space-y-16 pb-20">
      <PageHero
        badge={getLocalized(article.category)}
        title={getLocalized(article.title)}
        breadcrumbs={[
          { label: t.nav.mediaDropdown, url: '/media' },
          { label: t.nav.news, url: '/news' },
          { label: getLocalized(article.title) }
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Article Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-b border-[#12332B]/10 text-xs text-[#68736F] mb-8">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#0B6B4F]" />
              <span>{article.date}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#0B6B4F]" />
              <span>{getLocalized(article.author)}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#0B6B4F]" />
              <span>{getLocalized(article.readTime)}</span>
            </span>
          </div>

          {/* Social Share Buttons */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#12332B]">{locale === 'ar' ? 'مشاركة:' : 'Share:'}</span>
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
              title="Share on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </a>
            <a
              href={twitterShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 transition-colors"
              title="Share on X"
            >
              <Share2 className="w-3.5 h-3.5" />
            </a>
            <button
              type="button"
              onClick={handleCopyLink}
              className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
              title="Copy Link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Featured Main Image */}
        <div className="relative rounded-3xl overflow-hidden shadow-lg mb-8 h-72 sm:h-96">
          <img
            src={article.image}
            alt={getLocalized(article.title)}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Excerpt Lead */}
        <p className="text-base sm:text-lg font-semibold text-[#12332B] leading-relaxed mb-8 p-4 rounded-xl bg-[#EBF4F0]/60 border-s-4 border-[#0B6B4F]">
          {getLocalized(article.excerpt)}
        </p>

        {/* Full Content Paragraphs */}
        <div className="space-y-6 text-sm sm:text-base text-[#17211E] leading-loose">
          {article.content.map((p, idx) => (
            <p key={idx}>{getLocalized(p)}</p>
          ))}
        </div>

        {/* Tags */}
        <div className="pt-8 mt-8 border-t border-[#12332B]/10 flex flex-wrap items-center gap-2">
          <Tag className="w-4 h-4 text-[#0B6B4F]" />
          <span className="text-xs font-bold text-[#12332B] me-1">{locale === 'ar' ? 'الوسوم:' : 'Tags:'}</span>
          {article.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs px-3 py-1 bg-[#F7F8F6] text-[#0B6B4F] rounded-full border border-[#12332B]/10"
            >
              #{getLocalized(tag)}
            </span>
          ))}
        </div>
      </section>

      {/* Related News */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-[#12332B]">
            {locale === 'ar' ? 'أخبار أخرى ذات صلة' : 'Related News'}
          </h2>
          <Link
            to={getLocalizedPath('/news')}
            className="text-xs sm:text-sm font-bold text-[#0B6B4F] hover:underline"
          >
            {t.common.viewAll} →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedNews.map((rel) => (
            <Link
              key={rel.slug}
              to={getLocalizedPath(`/news/${rel.slug}`)}
              className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-[#0B6B4F]/30 transition-all duration-300 group flex flex-col"
            >
              <div className="h-44 bg-gradient-to-br from-[#12332B] to-[#0B211C] overflow-hidden">
                <img
                  src={rel.image}
                  alt={getLocalized(rel.title)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <span className="text-[10px] font-bold text-[#0B6B4F] mb-1 block">
                  {getLocalized(rel.category)}
                </span>
                <h4 className="text-sm font-bold text-[#12332B] group-hover:text-[#0B6B4F] transition-colors line-clamp-2">
                  {getLocalized(rel.title)}
                </h4>
                <div className="flex items-center gap-2 text-[11px] text-[#68736F] mt-3 pt-2 border-t border-[#12332B]/5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{rel.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
