import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Calendar,
  MapPin,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Search
} from 'lucide-react';
import { useI18n } from '../i18n';
import { PageHero } from '../components/layout/PageHero';
import { Badge } from '../components/ui/Badge';
import { useGovernanceData, initialGalleryItems, GalleryItemModel } from '../context/GovernanceDataContext';

export const GalleryPage: React.FC = () => {
  const { locale, t, getLocalized } = useI18n();
  const { galleryItems } = useGovernanceData();
  const [activePhoto, setActivePhoto] = useState<GalleryItemModel | null>(null);

  const activeGallery: GalleryItemModel[] =
    galleryItems && galleryItems.length > 0 ? galleryItems : initialGalleryItems;

  return (
    <div className="space-y-12 pb-20">
      <PageHero
        badge={t.galleryPage.badge}
        title={t.galleryPage.title}
        subtitle={t.galleryPage.subtitle}
        breadcrumbs={[{ label: t.nav.gallery }]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {activeGallery.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="bg-white rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
                <img
                  src={photo.imageUrl}
                  alt={locale === 'ar' ? photo.titleAr : photo.titleEn || photo.titleAr}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-xs font-bold flex items-center gap-1.5 bg-[#095B42]/80 backdrop-blur-xs px-3 py-1 rounded-full">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    عرض التفاصيل الصورة
                  </span>
                </div>
              </div>

              {/* Info Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-bold text-sm text-gray-900 leading-snug group-hover:text-[#095B42] transition-colors line-clamp-2">
                    {locale === 'ar' ? photo.titleAr : photo.titleEn || photo.titleAr}
                  </h3>
                  {photo.captionAr && (
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {locale === 'ar' ? photo.captionAr : photo.captionEn || photo.captionAr}
                    </p>
                  )}
                </div>

                {/* Date & Location Footer */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 gap-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#C9A45C]" />
                    <span>{photo.date}</span>
                  </div>
                  {photo.locationAr && (
                    <div className="flex items-center gap-1 truncate max-w-[150px]">
                      <MapPin className="w-3.5 h-3.5 text-[#095B42] shrink-0" />
                      <span className="truncate">
                        {locale === 'ar' ? photo.locationAr : photo.locationEn || photo.locationAr}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Photo Preview Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 border border-gray-100">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 end-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activePhoto.imageUrl}
                alt={locale === 'ar' ? activePhoto.titleAr : activePhoto.titleEn || activePhoto.titleAr}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="p-6 space-y-3 bg-white">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs text-gray-500 font-mono flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#C9A45C]" />
                  {activePhoto.date}
                </span>
              </div>

              <h2 className="font-black text-base sm:text-lg text-gray-900 leading-snug">
                {locale === 'ar' ? activePhoto.titleAr : activePhoto.titleEn || activePhoto.titleAr}
              </h2>

              {activePhoto.captionAr && (
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {locale === 'ar' ? activePhoto.captionAr : activePhoto.captionEn || activePhoto.captionAr}
                </p>
              )}

              {activePhoto.locationAr && (
                <div className="flex items-center gap-1.5 text-xs text-[#095B42] font-semibold pt-2 border-t border-gray-100">
                  <MapPin className="w-4 h-4 text-[#095B42]" />
                  <span>
                    {locale === 'ar' ? activePhoto.locationAr : activePhoto.locationEn || activePhoto.locationAr}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
