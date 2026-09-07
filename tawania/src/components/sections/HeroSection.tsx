import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Sparkles, Compass } from 'lucide-react';
import { useI18n } from '../../i18n';

interface HeroSlide {
  id: string;
  bgImage: string;
  titleAr: string;
  titleEn: string;
  subtitleAr: string;
  subtitleEn: string;
  highlightAr: string;
  highlightEn: string;
  ctaTextAr: string;
  ctaTextEn: string;
  ctaLink: string;
  badgeAr: string;
  badgeEn: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'welcome-slide',
    bgImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2000&q=80',
    titleAr: 'تأبى الرِّماحُ إذا اجتمعن تكسّراً..',
    titleEn: 'United, The Winds Cannot Break Us..',
    highlightAr: 'وإذا افترقنَ تكسّرت آحادا',
    highlightEn: 'Apart, They Break One By One',
    subtitleAr: 'رسالتنا: تحقيق التنمية المستدامة والتمكين الاقتصادي والاجتماعي من خلال تعزيز العمل التعاوني وفق رؤية 2030.',
    subtitleEn: 'Our Mission: Achieving sustainable development and economic empowerment through cooperative excellence under Vision 2030.',
    ctaTextAr: 'اكتشف مشاريعنا',
    ctaTextEn: 'Discover Our Projects',
    ctaLink: '/projects',
    badgeAr: 'الجمعية التعاونية متعددة الأغراض',
    badgeEn: 'Multi-Purpose Cooperative Society'
  },
  {
    id: 'sustainability-slide',
    bgImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2000&q=80',
    titleAr: 'مشاريع تنموية رائدة..',
    titleEn: 'Pioneering Development Projects..',
    highlightAr: 'تصنع أثراً مجتمعياً واقتصادياً مستداماً',
    highlightEn: 'Creating Sustainable Socio-Economic Impact',
    subtitleAr: 'استثمارات وشراكات استراتيجية تدعم القطاعات الحيوية وتسهم في بناء مستقبل واعد.',
    subtitleEn: 'Strategic investments and partnerships driving vital sectors for a prosperous future.',
    ctaTextAr: 'استعرض المبادرات',
    ctaTextEn: 'Explore Initiatives',
    ctaLink: '/governance',
    badgeAr: 'الاستدامة والتمكين الاقتصادي',
    badgeEn: 'Sustainability & Economic Empowerment'
  },
  {
    id: 'governance-slide',
    bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80',
    titleAr: 'حوكمة مؤسسية رصينة..',
    titleEn: 'Institutional Governance Excellence..',
    highlightAr: 'بأعلى معايير الشفافية والمسؤولية',
    highlightEn: 'With Highest Standards of Transparency',
    subtitleAr: 'نلتزم بالشفافية الكاملة والإفصاح المؤسسي لتعزيز الثقة وتحقيق التميز القيادي.',
    subtitleEn: 'Committed to complete transparency and ethical governance for leadership excellence.',
    ctaTextAr: 'لوائح وسياسات الحوكمة',
    ctaTextEn: 'Governance & Regulations',
    ctaLink: '/governance',
    badgeAr: 'الامتثال والشفافية المؤسسية',
    badgeEn: 'Compliance & Institutional Transparency'
  }
];

export const HeroSection: React.FC = () => {
  const { locale, dir, getLocalizedPath } = useI18n();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const PrevArrow = dir === 'rtl' ? ChevronRight : ChevronLeft;
  const NextArrow = dir === 'rtl' ? ChevronLeft : ChevronRight;

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Auto-scroll images every 6.5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const scrollToContent = () => {
    const target = document.getElementById('about-overview-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentSlide = HERO_SLIDES[currentSlideIndex] || HERO_SLIDES[0];

  return (
    <section
      id="hero-section"
      className="relative w-full h-[calc(100vh-112px)] min-h-[500px] flex flex-col justify-between overflow-hidden bg-[#073519] select-none"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* 1. Background Slides Layer */}
      {HERO_SLIDES.map((slide, index) => {
        const isActive = index === currentSlideIndex;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none ${
              isActive ? 'opacity-100 z-0' : 'opacity-0 -z-10'
            }`}
          >
            <div className="w-full h-full relative">
              <img
                src={slide.bgImage}
                alt={locale === 'ar' ? slide.titleAr : slide.titleEn}
                className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000 ease-out"
                referrerPolicy="no-referrer"
              />
              {/* Deep Luxury Cinematic Gradient Overlay from Official Palette (#073519 & #0B4F26) */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#073519] via-[#073519]/70 to-[#0B4F26]/40" />
              <div className="absolute inset-0 bg-black/35" />
              
              {/* Subtle Geometric Pattern Overlay */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#10B981 1.5px, transparent 1.5px), radial-gradient(#FACC15 1px, transparent 1px)`,
                  backgroundSize: '48px 48px',
                  backgroundPosition: '0 0, 24px 24px',
                }}
              />
            </div>
          </div>
        );
      })}

      {/* 2. Main Center Slide Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 flex-1 flex flex-col justify-center items-center text-center py-8">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-white/10 text-[#FACC15] border border-white/20 backdrop-blur-md shadow-md mb-5 animate-in fade-in duration-500">
          <Sparkles className="w-3.5 h-3.5 text-[#FACC15]" />
          <span>{locale === 'ar' ? currentSlide.badgeAr : currentSlide.badgeEn}</span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.2] mb-6 drop-shadow-xl font-sans max-w-4xl">
          {locale === 'ar' ? (
            <>
              {currentSlide.titleAr} <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-[#10B981] via-[#34D399] to-[#FACC15] bg-clip-text text-transparent">
                {currentSlide.highlightAr}
              </span>
            </>
          ) : (
            <>
              {currentSlide.titleEn} <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-[#10B981] via-[#34D399] to-[#FACC15] bg-clip-text text-transparent">
                {currentSlide.highlightEn}
              </span>
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-2xl leading-relaxed mb-8 font-medium drop-shadow-md">
          {locale === 'ar' ? currentSlide.subtitleAr : currentSlide.subtitleEn}
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
          {/* Primary CTA (Growth Gradient) */}
          <Link
            to={getLocalizedPath(currentSlide.ctaLink || '/projects')}
            className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#0B4F26] to-[#10B981] hover:brightness-110 text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-[0_4px_25px_rgba(16,185,129,0.35)] border border-[#10B981]/50 transition-all transform hover:scale-105 cursor-pointer group"
          >
            <span>{locale === 'ar' ? currentSlide.ctaTextAr : currentSlide.ctaTextEn}</span>
            <Arrow className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>

          {/* Secondary CTA (Glassmorphic) */}
          <Link
            to={getLocalizedPath('/governance')}
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/60 text-sm sm:text-base font-bold px-7 py-3.5 rounded-full backdrop-blur-md transition-all cursor-pointer hover:scale-105"
          >
            <Compass className="w-4 h-4 text-[#FACC15]" />
            <span>{locale === 'ar' ? 'لوائح الحوكمة' : 'Governance'}</span>
          </Link>
        </div>
      </div>

      {/* 3. Left / Right Floating Navigation Arrows */}
      <div className="absolute inset-y-0 start-4 sm:start-8 z-20 flex items-center pointer-events-none">
        <button
          type="button"
          onClick={prevSlide}
          className="p-3 sm:p-3.5 rounded-full bg-black/40 hover:bg-[#0B4F26] text-white/90 hover:text-white border border-white/20 hover:border-[#10B981] backdrop-blur-md transition-all pointer-events-auto cursor-pointer group hover:scale-110 shadow-lg"
          aria-label={locale === 'ar' ? 'الشريحة السابقة' : 'Previous Slide'}
        >
          <PrevArrow className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5" />
        </button>
      </div>

      <div className="absolute inset-y-0 end-4 sm:end-8 z-20 flex items-center pointer-events-none">
        <button
          type="button"
          onClick={nextSlide}
          className="p-3 sm:p-3.5 rounded-full bg-black/40 hover:bg-[#0B4F26] text-white/90 hover:text-white border border-white/20 hover:border-[#10B981] backdrop-blur-md transition-all pointer-events-auto cursor-pointer group hover:scale-110 shadow-lg"
          aria-label={locale === 'ar' ? 'الشريحة التالية' : 'Next Slide'}
        >
          <NextArrow className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
        </button>
      </div>

      {/* 4. Centered Scroll Down Anchor Button */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center pointer-events-auto">
        <button
          type="button"
          onClick={scrollToContent}
          className="w-11 h-11 rounded-full bg-black/40 hover:bg-[#0B4F26] backdrop-blur-md text-white border border-white/20 hover:border-[#10B981] flex items-center justify-center transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-110 active:scale-95"
          aria-label={locale === 'ar' ? 'التمرير للأسفل' : 'Scroll down'}
        >
          <ChevronDown className="w-5 h-5 text-[#10B981] stroke-[2.5] group-hover:translate-y-0.5 transition-transform duration-300" />
        </button>
      </div>

      {/* 5. Slide Pagination Indicators */}
      <div className="absolute bottom-6 end-6 sm:end-10 z-20 flex items-center gap-2">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentSlideIndex(idx)}
            className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentSlideIndex
                ? 'w-9 bg-gradient-to-r from-[#0B4F26] to-[#10B981] border border-white/30 shadow-md'
                : 'w-2.5 bg-white/35 hover:bg-white/70'
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
