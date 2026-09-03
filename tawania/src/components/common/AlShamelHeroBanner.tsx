import React from 'react';
import { AlShamelLogo } from './AlShamelLogo';

interface AlShamelHeroBannerProps {
  className?: string;
  isCompact?: boolean;
}

export const AlShamelHeroBanner: React.FC<AlShamelHeroBannerProps> = ({
  className = '',
  isCompact = false,
}) => {
  return (
    <div
      className={`relative w-full max-w-4xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden bg-white/95 backdrop-blur-md shadow-2xl border border-white/80 transition-all duration-300 ${className}`}
      style={{
        boxShadow: '0 20px 40px -15px rgba(10, 77, 56, 0.25), 0 0 0 1px rgba(10, 77, 56, 0.08)',
      }}
    >
      {/* Background Layer: Islamic Geometric Arabesque Pattern & Soft Gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg
          className="w-full h-full object-cover"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 300"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="islamic-grid"
              x="0"
              y="0"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M30 0 L60 30 L30 60 L0 30 Z"
                fill="none"
                stroke="#0E7A5A"
                strokeWidth="0.75"
                strokeOpacity="0.3"
              />
              <path
                d="M0 0 L60 60 M60 0 L0 60"
                stroke="#0284C7"
                strokeWidth="0.5"
                strokeOpacity="0.2"
              />
              <circle
                cx="30"
                cy="30"
                r="12"
                fill="none"
                stroke="#65A30D"
                strokeWidth="0.5"
                strokeOpacity="0.25"
              />
              <polygon
                points="30,18 38,24 38,36 30,42 22,36 22,24"
                fill="none"
                stroke="#0E7A5A"
                strokeWidth="0.5"
                strokeOpacity="0.3"
              />
            </pattern>
            <linearGradient id="bannerBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F0FDF4" />
              <stop offset="50%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#F0F9FF" />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#bannerBgGrad)" />
          <rect width="100%" height="100%" fill="url(#islamic-grid)" />
        </svg>
      </div>

      {/* Dynamic Left Green Brush Art Texture (matching hero.jpg) */}
      <div className="absolute top-0 start-0 w-1/3 sm:w-2/5 h-full pointer-events-none overflow-hidden z-0">
        <svg
          viewBox="0 0 300 300"
          className="w-full h-full object-cover -translate-x-4 -translate-y-4 rtl:translate-x-4 opacity-90"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0 L240 0 C220 40, 260 80, 200 120 C160 150, 180 200, 120 240 C60 270, 40 300, 0 300 Z"
            fill="#84CC16"
            fillOpacity="0.85"
          />
          <path
            d="M0 0 L180 0 C160 30, 200 70, 150 100 C110 130, 130 180, 80 210 C40 230, 20 260, 0 260 Z"
            fill="#65A30D"
            fillOpacity="0.9"
          />
          {/* Splatter dots & brush bristles */}
          <circle cx="210" cy="45" r="4" fill="#84CC16" />
          <circle cx="170" cy="110" r="6" fill="#65A30D" />
          <circle cx="230" cy="90" r="3" fill="#84CC16" />
          <circle cx="130" cy="180" r="5" fill="#84CC16" />
          <circle cx="90" cy="230" r="4" fill="#65A30D" />
          <circle cx="50" cy="270" r="3" fill="#84CC16" />
        </svg>
      </div>

      {/* Inner Rounded Fine Border Line (matching hero.jpg framing) */}
      <div className="absolute inset-2 sm:inset-3 rounded-xl sm:rounded-2xl border border-[#0E7A5A]/25 pointer-events-none z-10" />

      {/* Main Content Area */}
      <div className="relative z-10 p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
        {/* Left Side (in RTL: right side): AlShamel Cooperative Logo */}
        <div className="flex items-center justify-center shrink-0">
          <AlShamelLogo size={isCompact ? 'md' : 'lg'} variant="full" textColor="#12332B" />
        </div>

        {/* Center Vertical Divider (on desktop) */}
        <div className="hidden md:block w-px h-28 bg-gradient-to-b from-transparent via-[#0E7A5A]/30 to-transparent" />

        {/* Right Side (in RTL: left side): Calligraphy Welcome Message */}
        <div className="flex flex-col items-center md:items-start text-center md:text-start space-y-1">
          {/* Calligraphic "مرحباً بكم" in Royal Cyan-Blue */}
          <div className="relative">
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-normal leading-tight"
              style={{
                fontFamily: `'Tajawal', 'IBM Plex Sans Arabic', sans-serif`,
                color: '#0284C7',
                textShadow: '0 2px 10px rgba(2, 132, 199, 0.15)',
              }}
            >
              مَرْحَبـاً بِـكُـمْ
            </h2>
          </div>

          {/* "في تعاونية الشامل" in Emerald Green */}
          <div
            className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight"
            style={{ color: '#65A30D' }}
          >
            فِي تَعَاوُنِيَّةِ الرِّضَا
          </div>

          {/* English Subtitle */}
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-[#525E59] uppercase pt-1">
            Welcome to Al Reda Cooperative
          </p>
        </div>
      </div>
    </div>
  );
};
