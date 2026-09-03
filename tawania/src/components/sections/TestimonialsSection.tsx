import React, { useState, useEffect, useRef } from 'react';
import { Quote, Star, CheckCircle2, MessageSquareQuote } from 'lucide-react';
import { useI18n } from '../../i18n';
import { useGovernanceData } from '../../context/GovernanceDataContext';
import { testimonialsData } from '../../data/testimonials';

export const TestimonialsSection: React.FC = () => {
  const { locale, dir, getLocalized } = useI18n();
  const { testimonials } = useGovernanceData();
  const scrollRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const rawTestimonials = (testimonials && testimonials.length > 0)
    ? testimonials.map(t => ({
        id: t.id,
        name: { ar: t.nameAr, en: t.nameEn },
        role: { ar: t.roleAr, en: t.roleEn },
        organization: { ar: t.organizationAr, en: t.organizationEn },
        quote: { ar: t.quoteAr, en: t.quoteEn },
        rating: t.rating || 5,
        projectRelated: { ar: t.projectRelatedAr, en: t.projectRelatedEn },
        avatar: t.avatar,
        date: t.date
      }))
    : testimonialsData;

  // Triple the items to create a truly seamless, endless loop
  const loopItems = [...rawTestimonials, ...rawTestimonials, ...rawTestimonials];

  // Smooth continuous auto-scroll animation loop
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationId: number;
    const speed = 0.85; // smooth gliding speed

    const step = () => {
      if (!isHoveredRef.current && !isDraggingRef.current && el) {
        // Scroll forward based on text direction
        if (dir === 'rtl') {
          el.scrollLeft -= speed;
          // Wrap around for RTL
          if (Math.abs(el.scrollLeft) >= el.scrollWidth / 3) {
            el.scrollLeft = 0;
          }
        } else {
          el.scrollLeft += speed;
          // Wrap around for LTR
          if (el.scrollLeft >= el.scrollWidth / 3) {
            el.scrollLeft = 0;
          }
        }
      }
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, [dir]);

  // Mouse Drag / Swipe Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    e.preventDefault();
    const el = scrollRef.current;
    if (!el) return;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const getArabicInitials = (nameAr: string) => {
    const clean = nameAr.replace(/^(أ\s*\/\s*|أ\.\s*|م\.\s*|د\.\s*)/g, '').trim();
    const parts = clean.split(/\s+/);
    if (parts.length >= 2) {
      return `${parts[0][0]} . ${parts[parts.length - 1][0]}`;
    }
    return parts[0] ? parts[0].slice(0, 2) : 'ش';
  };

  return (
    <section
      id="testimonials-section"
      className="py-20 sm:py-28 bg-gradient-to-b from-white via-[#F9FAF8] to-white relative overflow-hidden"
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
        handleMouseUpOrLeave();
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header Centered */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0B6B4F]/10 text-[#0B6B4F] text-xs font-bold mb-3">
            <MessageSquareQuote className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>{locale === 'ar' ? 'كلمات نفخر بها' : 'Words of Pride'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#12332B] tracking-tight">
            {locale === 'ar' ? 'قالوا عنا' : 'What They Said About Us'}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-br from-[#095B42] to-[#064230] mx-auto my-3 rounded-full" />
          <p className="text-xs sm:text-sm text-[#68736F] leading-relaxed">
            {locale === 'ar'
              ? 'شهادات وآراء موثقة من مساهمي الجمعية وعملائها وشركاء النجاح التنموي'
              : 'Verified reviews and testimonials from our valued shareholders, clients, and community partners'}
          </p>
        </div>

        {/* Continuous Auto-Scrolling & Mouse-Draggable Track */}
        <div className="relative py-4">
          {/* Subtle Side Fade Gradients (Left & Right) */}
          <div className="absolute top-0 bottom-0 -left-[1px] md:left-0 w-12 sm:w-32 md:w-44 bg-gradient-to-r from-[#F9FAF8] via-[#F9FAF8]/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 -right-[1px] md:right-0 w-12 sm:w-32 md:w-44 bg-gradient-to-l from-[#F9FAF8] via-[#F9FAF8]/80 to-transparent z-20 pointer-events-none" />

          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            className="flex gap-6 overflow-x-auto select-none py-4 cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {loopItems.map((item, idx) => {
              const initials = getArabicInitials(item.name.ar);
              return (
                <div
                  key={`${item.id}-${idx}`}
                  className="w-[320px] sm:w-[380px] shrink-0 transition-all duration-300"
                >
                  <div className="h-full bg-white rounded-3xl p-7 border border-[#12332B]/10 shadow-sm hover:shadow-xl hover:border-[#0B6B4F]/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group">
                    {/* Decorative Background Large Quote */}
                    <div className="absolute top-3 end-4 text-[#0B6B4F]/5 group-hover:text-[#0B6B4F]/10 transition-colors pointer-events-none select-none">
                      <Quote className="w-20 h-20" />
                    </div>

                    {/* Top Row: Rating & Service Tag */}
                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center justify-between gap-2">
                        {/* Rating Stars */}
                        <div className="flex items-center gap-1 bg-amber-50/80 px-2.5 py-1 rounded-full border border-amber-200/60">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                          <span className="text-[11px] font-bold text-amber-900 ms-1 font-mono">
                            {item.rating}.0
                          </span>
                        </div>

                        {/* Project / Sector Badge */}
                        {item.projectRelated && (
                          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#EBF4F0] text-[#0B6B4F] border border-[#0B6B4F]/15 truncate max-w-[150px]">
                            {getLocalized(item.projectRelated)}
                          </span>
                        )}
                      </div>

                      {/* Quote Text */}
                      <p className="text-xs sm:text-sm text-[#2D3A35] leading-relaxed italic font-medium pt-1">
                        "{getLocalized(item.quote)}"
                      </p>
                    </div>

                    {/* Bottom Row: User Avatar and Info */}
                    <div className="relative z-10 pt-5 mt-6 border-t border-[#12332B]/5 flex items-center gap-3.5">
                      <div className="relative w-12 h-12 rounded-full p-0.5 bg-gradient-to-br from-[#C9A45C] to-[#0B6B4F] shrink-0 shadow-xs">
                        <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-[#0B6B4F] to-[#063325] flex items-center justify-center text-amber-200 font-bold text-xs font-serif border border-white">
                          {initials}
                        </div>
                      </div>

                      <div className="min-w-0 text-start">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-[#12332B] truncate group-hover:text-[#0B6B4F] transition-colors">
                            {getLocalized(item.name)}
                          </h4>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0B6B4F] shrink-0" />
                        </div>
                        <p className="text-[11px] text-[#68736F] truncate">
                          {getLocalized(item.role)} • {getLocalized(item.organization)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
