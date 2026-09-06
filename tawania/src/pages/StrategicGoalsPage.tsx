import React from 'react';
import { Target, TrendingUp, Award, ShieldCheck, Layers, Sparkles, ShoppingBag, Leaf, Users, CheckCircle2 } from 'lucide-react';
import { useI18n } from '../i18n';
import { strategicGoalsData } from '../data/strategicGoals';
import { PageHero } from '../components/layout/PageHero';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const StrategicGoalsPage: React.FC = () => {
  const { locale, t, getLocalized, getLocalizedPath } = useI18n();

  const getGoalIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-[#0B6B4F]" />;
      case 'Award': return <Award className="w-6 h-6 text-[#C9A45C]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#0B6B4F]" />;
      case 'Layers': return <Layers className="w-6 h-6 text-[#C9A45C]" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#0B6B4F]" />;
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6 text-[#C9A45C]" />;
      case 'Leaf': return <Leaf className="w-6 h-6 text-[#0B6B4F]" />;
      default: return <Users className="w-6 h-6 text-[#C9A45C]" />;
    }
  };

  return (
    <div className="space-y-16 pb-20">
      <PageHero
        badge={t.strategicGoalsPage.badge}
        title={t.strategicGoalsPage.title}
        subtitle={t.strategicGoalsPage.subtitle}
        breadcrumbs={[
          { label: t.nav.aboutUs, url: '/about' },
          { label: t.nav.strategicGoals }
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {strategicGoalsData.map((goal) => (
            <div
              key={goal.id}
              className="bg-white rounded-2xl p-8 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#EBF4F0] flex items-center justify-center">
                    {getGoalIcon(goal.iconName)}
                  </div>
                  <span className="text-sm font-black text-[#12332B] bg-[#C9A45C]/20 px-3 py-1 rounded-lg font-mono">
                    {locale === 'ar' ? `الهدف #${goal.number}` : `Goal #${goal.number}`}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#12332B] mb-3 leading-snug">
                  {getLocalized(goal.title)}
                </h3>

                <p className="text-sm text-[#68736F] leading-relaxed mb-6">
                  {getLocalized(goal.description)}
                </p>
              </div>

              {/* Focus Pillars */}
              <div className="pt-4 border-t border-[#12332B]/5 space-y-2">
                <span className="text-xs font-semibold text-[#0B6B4F] block">
                  {locale === 'ar' ? 'مؤشرات التنفيذ والأثر' : 'Execution & Impact Indicators'}
                </span>
                <div className="flex flex-wrap gap-2">
                  <span className="text-[11px] px-2.5 py-1 rounded-md bg-[#F7F8F6] text-[#17211E] border border-gray-100 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#0B6B4F]" />
                    <span>{locale === 'ar' ? 'متوافق مع رؤية 2030' : 'Vision 2030 Aligned'}</span>
                  </span>
                  <span className="text-[11px] px-2.5 py-1 rounded-md bg-[#F7F8F6] text-[#17211E] border border-gray-100 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#0B6B4F]" />
                    <span>{locale === 'ar' ? 'مستدام اقتصادياً' : 'Economically Sustainable'}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
