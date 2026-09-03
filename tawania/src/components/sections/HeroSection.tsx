import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useI18n } from '../../i18n';
import { Button } from '../ui/Button';

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
    titleAr: 'تأبى الرياحُ إذا اجتمعن تكسّرا..',
    titleEn: 'United, The Winds Cannot Break Us..',
    highlightAr: 'وإذا افترقنَ تكسّرت آحادا...',
    highlightEn: 'Apart, They Break One By One...',
    subtitleAr: 'رسالتنا: تحقيق التنمية المستدامة والتمكين الاقتصادي والاجتماعي والثقافي من خلال تعزيز العمل التعاوني، بما يسهم في تحقيق أهداف رؤية المملكة 2030.',
    subtitleEn: 'Our Mission: Achieving sustainable development and economic, social, and cultural empowerment through advancing cooperative work, contributing to Saudi Vision 2030.',
    ctaTextAr: 'اكتشف مشاريعنا',
    ctaTextEn: 'Discover Our Projects',
    ctaLink: '/projects',
    badgeAr: 'تعاونية الشامل متعددة الأغراض',
    badgeEn: 'AlShamel Multipurpose Cooperative',
  },
  {
    id: 'sustainability',
    bgImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=2000&q=80',
    titleAr: 'نَصْنَعُ أَثَراً يَنْمُو',
    titleEn: 'Creating Impact that Grows',
    highlightAr: 'مَعَ الْمُجْتَمَعِ',
    highlightEn: 'With the Community',
    subtitleAr: 'نعمل على بناء مستقبل مستدام من خلال مشاريع تنموية واستثمارية تعزز الاقتصاد المحلي وتخدم أعضاءنا ومجتمعنا بجدة.',
    subtitleEn: 'Building a sustainable future through developmental and investment enterprises serving our members and community in Jeddah.',
    ctaTextAr: 'استكشف كافة المشاريع',
    ctaTextEn: 'Explore All Projects',
    ctaLink: '/projects',
    badgeAr: 'الاستدامة الزراعية والبيئية والمجتمعية',
    badgeEn: 'Agricultural & Environmental Sustainability',
  },
  {
    id: 'investments',
    bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=80',
    titleAr: 'مَشَارِيعُ نَوْعِيَّةٌ وَفُرَصٌ',
    titleEn: 'Pioneering Enterprises & High-Value',
    highlightAr: 'اسْتِثْمَارِيَّةٌ وَاعِدَةٌ',
    highlightEn: 'Investment Opportunities',
    subtitleAr: 'مشاريعنا تمتد عبر قطاعات التسويق، الأسواق الاستهلاكية، التوزيع، التعبئة والتغليف، والأعلاف.',
    subtitleEn: 'Our enterprises span marketing, consumer markets, distribution, packaging, and animal feed.',
    ctaTextAr: 'استكشف مشاريعنا',
    ctaTextEn: 'Explore Projects',
    ctaLink: '/projects',
    badgeAr: 'مشاريع نوعية متخصصة',
    badgeEn: 'High-Impact Specialized Enterprises',
  },
  {
    id: 'governance',
    bgImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80',
    titleAr: 'حَوْكَمَةٌ شَامِلَةٌ وَشَفَافِيَّةٌ',
    titleEn: 'Comprehensive Governance & Robust',
    highlightAr: 'مَالِيَّةٌ وَإِدَارِيَّةٌ',
    highlightEn: 'Financial Transparency',
    subtitleAr: 'تقارير مالية مدققة سنوياً ومحاضر اجتماعات جمعية عمومية معتمدة وسياسات امتثال تتوافق مع أعلى المعايير الرقابية.',
    subtitleEn: 'Audited financial statements, ratified general assembly minutes, and compliance charters aligned with highest national standards.',
    ctaTextAr: 'القوائم المالية والشفافية',
    ctaTextEn: 'Financial Statements & Governance',
    ctaLink: '/financial-statements',
    badgeAr: 'شفافية مالية ورقابة معتمدة',
    badgeEn: 'Audited Transparency & Compliance',
  },
];

import { useGovernanceData } from '../../context/GovernanceDataContext';

export const HeroSection: React.FC = () => {
  const { locale, dir, getLocalizedPath } = useI18n();
  const { homeHeroSlides } = useGovernanceData();
  const slides = homeHeroSlides && homeHeroSlides.length > 0 ? homeHeroSlides : HERO_SLIDES;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const Arrow = dir === 'rtl' ? ArrowLeft : ArrowRight;
  const PrevArrow = dir === 'rtl' ? ChevronRight : ChevronLeft;
  const NextArrow = dir === 'rtl' ? ChevronLeft : ChevronRight;

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Auto-scroll images every 6 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const scrollToContent = () => {
    const target = document.getElementById('about-overview-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentSlide = slides[currentSlideIndex] || slides[0];

  return (
    <section
      id="hero-section"
      className="relative w-full h-[calc(100vh-72px)] min-h-[580px] max-h-[960px] flex flex-col justify-between overflow-hidden bg-[#05241C] select-none"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* 1. Background Slides Layer (Pure Photography & Cinematic Overlay for All Slides) */}
      {slides.map((slide, index) => {
        const isActive = index === currentSlideIndex;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none ${isActive ? 'opacity-100 z-0' : 'opacity-0 -z-10'
              }`}
          >
            <div className="w-full h-full relative">
              <img
                src={slide.bgImage}
                alt={locale === 'ar' ? slide.titleAr : slide.titleEn}
                className="w-full h-full object-cover object-center scale-105 transition-transform duration-10000 ease-out"
                referrerPolicy="no-referrer"
              />
              {/* Deep Cinematic Gradient Overlays for Readability & Brand Palette */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#05241C] via-[#083024]/30 to-[#0A3D2E]/20" />
              <div className="absolute inset-0 bg-black/40" />
              <div
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(#84CC16 1.5px, transparent 1.5px), radial-gradient(#38BDF8 1.5px, transparent 1.5px)`,
                  backgroundSize: '40px 40px',
                  backgroundPosition: '0 0, 20px 20px',
                }}
              />
            </div>
          </div>
        );
      })}

      {/* 3. Main Center Slide Content (Clean Typography, No p element) */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 flex-1 flex flex-col justify-center items-center text-center py-6">
        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.2] mb-8 drop-shadow-lg font-sans">
          {locale === 'ar' ? (
            <>
              {currentSlide.titleAr} <br className="hidden sm:block" />
              <span className="text-[#A3E635]">{currentSlide.highlightAr}</span>
            </>
          ) : (
            <>
              {currentSlide.titleEn} <br className="hidden sm:block" />
              <span className="text-[#A3E635]">{currentSlide.highlightEn}</span>
            </>
          )}
        </h1>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
  to={getLocalizedPath('/projects')}            className="inline-flex items-center justify-center gap-2.5 bg-[#84CC16] hover:bg-[#65A30D] text-[#05241C] font-black text-sm sm:text-base px-8 py-3.5 rounded-full shadow-2xl border border-[#A3E635]/40 transition-all transform hover:scale-105 cursor-pointer"
          >
            <span>{locale === 'ar' ? 'اكتشف المشاريع' : 'View Projects'}</span>
            <Arrow className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
          </Link>

          {/* <Link
            to={getLocalizedPath('/projects')}
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 text-sm sm:text-base font-bold px-7 py-3.5 rounded-full backdrop-blur-md transition-all cursor-pointer"
          >
            <span>{locale === 'ar' ? 'استعراض المشاريع' : 'View Projects'}</span>
          </Link> */}
        </div>
      </div>

      {/* 4. Left / Right Floating Navigation Arrows (Positioned at Edges) */}
      <div className="absolute inset-y-0 start-5 sm:start-8 z-20 flex items-center pointer-events-none">
        <button
          type="button"
          onClick={prevSlide}
          className="p-3 sm:p-3.5 rounded-full bg-black/40 hover:bg-black/75 text-white/90 hover:text-white border border-white/20 backdrop-blur-md transition-all pointer-events-auto cursor-pointer group hover:scale-110 shadow-lg"
          aria-label={locale === 'ar' ? 'الشريحة السابقة' : 'Previous Slide'}
        >
          <PrevArrow className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:-translate-x-0.5 rtl:group-hover:translate-x-0.5" />
        </button>
      </div>

      <div className="absolute inset-y-0 end-5 sm:end-8 z-20 flex items-center pointer-events-none">
        <button
          type="button"
          onClick={nextSlide}
          className="p-3 sm:p-3.5 rounded-full bg-black/40 hover:bg-black/75 text-white/90 hover:text-white border border-white/20 backdrop-blur-md transition-all pointer-events-auto cursor-pointer group hover:scale-110 shadow-lg"
          aria-label={locale === 'ar' ? 'الشريحة التالية' : 'Next Slide'}
        >
          <NextArrow className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
        </button>
      </div>

      {/* 5. Bottom Controls & Scroll Down Anchor (Balanced Container) */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 pb-5 pt-2 flex items-center justify-between">
        {/* Slide Pagination Dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlideIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${idx === currentSlideIndex
                  ? 'w-9 bg-[#84CC16] shadow-sm'
                  : 'w-2.5 bg-white/35 hover:bg-white/70'
                }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Centered Scroll Down Button to page content */}
        <button
          type="button"
          onClick={scrollToContent}
          className="inline-flex items-center gap-2 px-2 pt-4 pb-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white/90 hover:text-white border border-white/20 transition-all text-xs sm:text-sm font-semibold cursor-pointer group shadow-sm"
        >
          <ChevronDown className="w-6 h-4 text-[#84CC16] animate-bounce" />
        </button>

        {/* Key Quick Stats preview */}
        <div className="hidden sm:flex items-center gap-4 text-xs text-white/85 font-mono">

        </div>
      </div>
    </section>
  );
};
