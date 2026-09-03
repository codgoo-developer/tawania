import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { AboutSection } from '../components/sections/AboutSection';
import { ProjectsShowcaseSection } from '../components/sections/ProjectsShowcaseSection';
import { StrategicGoalsSection } from '../components/sections/StrategicGoalsSection';
import { BoardPreviewSection } from '../components/sections/BoardPreviewSection';
import { TrustStatsSection } from '../components/sections/TrustStatsSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0">
      {/* 1. Hero Welcome & Intro */}
      <HeroSection />

      {/* 2. Vision & Mission (رؤيتنا ورسالتنا) */}
      <AboutSection />

      {/* 3. Projects (تعرف على مشاريعنا) */}
      <ProjectsShowcaseSection />

      {/* 4. Strategic Objectives (الأهداف الإستراتيجية) */}
      <StrategicGoalsSection />

      {/* 5. Board of Directors (أعضاء مجلس الإدارة) */}
      <BoardPreviewSection />

      {/* 6. Numbers & Key Stats (200 أعضاء, 31951 سهم, 3195100 ريال, 5 أعضاء مجلس الإدارة) */}
      <TrustStatsSection />

      {/* 7. Words of Pride & What They Said (كلمات نفخر بها / قالوا عنا) */}
      <TestimonialsSection />
    </div>
  );
};

