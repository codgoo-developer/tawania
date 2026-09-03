import React from 'react';
import { Eye, Target } from 'lucide-react';
import { useI18n } from '../../i18n';
import { useGovernanceData } from '../../context/GovernanceDataContext';

export const AboutSection: React.FC = () => {
  const { locale } = useI18n();
  const { homeAboutData } = useGovernanceData();

  return (
    <section id="about-overview-section" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text & Cards Column (7 Cols in RTL: right side) */}
          <div className="lg:col-span-7 space-y-6 text-start">
            {/* Minimal Badge */}
            <div className="flex items-center gap-2 text-sm font-bold text-[#68736F] tracking-wider uppercase">
              <span className="w-8 h-0.5 bg-gradient-to-br from-[#0B6B4F] to-[#095B42]" />
              <span>{locale === 'ar' ? (homeAboutData?.badgeAr || 'من نحن') : (homeAboutData?.badgeEn || 'About Us')}</span>
            </div>

            {/* Headline with dual-color typography */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#12332B] tracking-tight leading-[1.15]">
              {locale === 'ar' ? (
                <>
                  {homeAboutData?.titleModelAr || 'نموذج رائد في'}
                  <br />
                  <span className="text-[#8B9894] font-bold">{homeAboutData?.titleHighlightAr || 'العمل التعاوني'}</span>
                </>
              ) : (
                <>
                  {homeAboutData?.titleModelEn || 'A Pioneering Model in'}
                  <br />
                  <span className="text-[#8B9894] font-bold">{homeAboutData?.titleHighlightEn || 'Cooperative Enterprise'}</span>
                </>
              )}
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#525E59] leading-relaxed max-w-2xl font-normal">
              {locale === 'ar'
                ? (homeAboutData?.descriptionAr || 'نحن كيان اقتصادي واجتماعي يهدف إلى تحقيق التنمية المستدامة من خلال مشاريع نوعية تلبي احتياجات المجتمع وتخلق فرصاً استثمارية واعدة لأعضائنا.')
                : (homeAboutData?.descriptionEn || 'We are a socio-economic entity striving to achieve sustainable development through high-impact enterprises fulfilling community needs and creating promising investment opportunities for our members.')}
            </p>

            {/* Two Side-by-Side Cards (Vision & Mission) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {/* Card 1: Vision */}
              <div className="p-6 rounded-2xl bg-[#EBF4F0]/70 border border-[#12332B]/5 flex flex-col justify-between space-y-4">
                <div className="w-12 h-12 rounded-full bg-white text-[#0B6B4F] shadow-xs flex items-center justify-center">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#12332B] mb-1.5">
                    {locale === 'ar' ? (homeAboutData?.visionTitleAr || 'رؤيتنا') : (homeAboutData?.visionTitleEn || 'Our Vision')}
                  </h3>
                  <p className="text-sm text-[#68736F] leading-relaxed">
                    {locale === 'ar'
                      ? (homeAboutData?.visionDescAr || 'تقديم حلول تعاونية رائدة تعزز التنمية المستدامة، وتلبي احتياجات أعضائنا والمجتمع.')
                      : (homeAboutData?.visionDescEn || 'To deliver leading cooperative solutions that advance sustainable development and meet the needs of our members and community.')}
                  </p>
                </div>
              </div>

              {/* Card 2: Mission */}
              <div className="p-6 rounded-2xl bg-[#EBF4F0]/70 border border-[#12332B]/5 flex flex-col justify-between space-y-4">
                <div className="w-12 h-12 rounded-full bg-white text-[#0B6B4F] shadow-xs flex items-center justify-center">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#12332B] mb-1.5">
                    {locale === 'ar' ? (homeAboutData?.missionTitleAr || 'رسالتنا') : (homeAboutData?.missionTitleEn || 'Our Mission')}
                  </h3>
                  <p className="text-sm text-[#68736F] leading-relaxed">
                    {locale === 'ar'
                      ? (homeAboutData?.missionDescAr || 'تحقيق التنمية المستدامة والتمكين الاقتصادي والاجتماعي والثقافي من خلال تعزيز العمل التعاوني، بما يسهم في تحقيق أهداف رؤية المملكة 2030.')
                      : (homeAboutData?.missionDescEn || 'Achieving sustainable development and economic, social, and cultural empowerment through advancing cooperative work, contributing to Saudi Vision 2030 goals.')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Portrait Image Column (5 Cols in RTL: left side) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-4/5 max-w-md mx-auto bg-gradient-to-br from-[#12332B] to-[#0B211C]">
              <img
                src={homeAboutData?.imageUrl || '/about.jpg'}
                alt={locale === 'ar' ? 'تعاونية الشامل - جذور راسخة ورؤية طموحة' : 'AlShamel Cooperative - Deep Roots & Ambitious Vision'}
                className="w-full h-full object-cover object-center"
              />
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Bottom Corner Caption matching screen.png */}
              <div className="absolute bottom-6 start-6 end-6 text-white text-start">
                <h3 className="text-lg sm:text-xl font-bold leading-tight">
                  {locale === 'ar' ? (homeAboutData?.sloganAr || 'جذور راسخة، رؤية طموحة.') : (homeAboutData?.sloganEn || 'Deep Roots, Ambitious Vision.')}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
