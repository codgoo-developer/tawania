import React from 'react';
import { Link } from 'react-router-dom';
import {
  Newspaper,
  Image,
  Handshake,
  MessageSquareQuote,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Eye
} from 'lucide-react';
import { useI18n } from '../i18n';
import { newsData } from '../data/news';
import { galleryData } from '../data/gallery';
import { PageHero } from '../components/layout/PageHero';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const MediaHubPage: React.FC = () => {
  const { locale, t, dir, getLocalized, getLocalizedPath } = useI18n();
  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-16 pb-20">
      <PageHero
        badge={t.mediaPage.badge}
        title={t.mediaPage.title}
        subtitle={t.mediaPage.subtitle}
        breadcrumbs={[{ label: t.nav.mediaDropdown }]}
      />

      {/* Featured Main Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {newsData.length > 0 && (
          <div className="bg-white rounded-3xl border border-[#12332B]/10 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-7 relative h-72 lg:h-auto min-h-[320px]">
              <img
                src={newsData[0].image}
                alt={getLocalized(newsData[0].title)}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 start-4">
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-gradient-to-br from-[#0B6B4F] to-[#095B42] text-white">
                  {locale === 'ar' ? 'خبر رئيسي' : 'Featured Story'}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-[#68736F]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{newsData[0].date}</span>
                  </span>
                  <span>•</span>
                  <span>{getLocalized(newsData[0].category)}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-[#12332B] leading-tight">
                  {getLocalized(newsData[0].title)}
                </h2>

                <p className="text-xs sm:text-sm text-[#68736F] leading-relaxed">
                  {getLocalized(newsData[0].excerpt)}
                </p>
              </div>

              <div>
                <Button
                  href={getLocalizedPath(`/news/${newsData[0].slug}`)}
                  variant="primary"
                  size="md"
                  rightIcon={<Arrow className="w-4 h-4" />}
                >
                  {t.common.readMore}
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Media Center 4-Section Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            to={getLocalizedPath('/news')}
            className="bg-white rounded-2xl p-6 border border-[#12332B]/10 hover:border-[#0B6B4F]/40 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#EBF4F0] text-[#0B6B4F] flex items-center justify-center mb-4">
                <Newspaper className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#12332B] group-hover:text-[#0B6B4F] mb-2">
                {t.nav.news}
              </h3>
              <p className="text-xs text-[#68736F] leading-relaxed">
                {locale === 'ar' ? 'أخبار، فعاليات، وبيانات الجمعية الصحفية.' : 'Press releases, event announcements and coverage.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#12332B]/5 flex items-center justify-between text-xs font-bold text-[#0B6B4F]">
              <span>{locale === 'ar' ? 'تصفح الأخبار' : 'Browse News'}</span>
              <Arrow className="w-4 h-4" />
            </div>
          </Link>

          <Link
            to={getLocalizedPath('/gallery')}
            className="bg-white rounded-2xl p-6 border border-[#12332B]/10 hover:border-[#0B6B4F]/40 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#EBF4F0] text-[#0B6B4F] flex items-center justify-center mb-4">
                <Image className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#12332B] group-hover:text-[#0B6B4F] mb-2">
                {t.nav.gallery}
              </h3>
              <p className="text-xs text-[#68736F] leading-relaxed">
                {locale === 'ar' ? 'ألبوم صور عالي الدقة للمشاريع والجمعيات.' : 'High-resolution photo gallery of projects and events.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#12332B]/5 flex items-center justify-between text-xs font-bold text-[#0B6B4F]">
              <span>{locale === 'ar' ? 'معرض الصور' : 'Photo Gallery'}</span>
              <Arrow className="w-4 h-4" />
            </div>
          </Link>

          <Link
            to={getLocalizedPath('/partnerships')}
            className="bg-white rounded-2xl p-6 border border-[#12332B]/10 hover:border-[#0B6B4F]/40 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#EBF4F0] text-[#0B6B4F] flex items-center justify-center mb-4">
                <Handshake className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#12332B] group-hover:text-[#0B6B4F] mb-2">
                {t.nav.partnerships}
              </h3>
              <p className="text-xs text-[#68736F] leading-relaxed">
                {locale === 'ar' ? 'مذكرات التعاون المشترك والتحالفات الاستراتيجية.' : 'Strategic MOUs, chamber alliances, and partnerships.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#12332B]/5 flex items-center justify-between text-xs font-bold text-[#0B6B4F]">
              <span>{locale === 'ar' ? 'شركاء النجاح' : 'Partners'}</span>
              <Arrow className="w-4 h-4" />
            </div>
          </Link>

          <Link
            to={getLocalizedPath('/feedback')}
            className="bg-white rounded-2xl p-6 border border-[#12332B]/10 hover:border-[#0B6B4F]/40 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#EBF4F0] text-[#0B6B4F] flex items-center justify-center mb-4">
                <MessageSquareQuote className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#12332B] group-hover:text-[#0B6B4F] mb-2">
                {t.nav.feedback}
              </h3>
              <p className="text-xs text-[#68736F] leading-relaxed">
                {locale === 'ar' ? 'استطلاعات الرأي وتقييم المستفيدين والمساهمين.' : 'Surveys, reviews, and satisfaction ratings.'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#12332B]/5 flex items-center justify-between text-xs font-bold text-[#0B6B4F]">
              <span>{locale === 'ar' ? 'استطلاع الرأي' : 'Feedback'}</span>
              <Arrow className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};
