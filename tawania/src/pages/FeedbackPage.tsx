import React, { useState } from 'react';
import {
  FileText,
  MapPin,
  ExternalLink,
  Share2,
  Copy,
  Check,
  Search,
  Sparkles,
  Flame,
  Store,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { useI18n } from '../i18n';
import { useGovernanceData } from '../context/GovernanceDataContext';
import { PageHero } from '../components/layout/PageHero';

interface FeedbackCardItem {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  url: string;
  platform: 'drive' | 'maps';
  platformName: string;
  badgeAr: string;
  badgeEn: string;
  category?: 'stakeholders' | 'consumer' | 'gas';
  accentColor?: 'emerald' | 'amber' | 'blue';
}

export const FeedbackPage: React.FC = () => {
  const { locale, t } = useI18n();
  const { feedbackCards } = useGovernanceData();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'drive' | 'maps'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const defaultCards: FeedbackCardItem[] = [
    {
      id: 'stakeholder-drive',
      titleAr: 'التغذيه الراجعة لاصحاب العلاقه',
      titleEn: 'Stakeholder Feedback Document',
      descriptionAr: 'تصفح المستند الموثق الخاص بالتغذية الراجعة واستجابات أصحاب العلاقة والشركاء.',
      descriptionEn: 'Browse verified document for stakeholder feedback and official partner responses.',
      url: 'https://drive.google.com/file/d/1GZtIwKitQNrezCYUaogUX8NS2LSL78ah/view?usp=sharing',
      platform: 'drive',
      platformName: 'Google Drive',
      badgeAr: 'Google Drive PDF',
      badgeEn: 'Verified Document',
      category: 'stakeholders',
      accentColor: 'emerald'
    },
    {
      id: 'consumer-maps',
      titleAr: 'تقييمات استهلاكية تعاونية الرضا',
      titleEn: 'Consumer Hypermarket Google Reviews',
      descriptionAr: 'اطّلع على تقييمات وآراء العملاء المباشرة لأسواق ومنافذ البيع على خرائط جوجل.',
      descriptionEn: 'View verified live customer ratings and reviews for consumer markets on Google Maps.',
      url: 'https://maps.app.goo.gl/k7U4w9STDQVS1TPe7',
      platform: 'maps',
      platformName: 'Google Maps',
      badgeAr: 'Google Maps',
      badgeEn: 'Google Maps Location',
      category: 'consumer',
      accentColor: 'amber'
    },
    {
      id: 'gas-maps',
      titleAr: 'تقييمات محطة وقود تعاونية الرضا',
      titleEn: 'Al-Reda Fuel Station Google Reviews',
      descriptionAr: 'اطّلع على تقييمات وآراء العملاء ومستخدمي محطة وقود وخدمات السيارات على خرائط جوجل.',
      descriptionEn: 'View verified live customer ratings and reviews for fuel station and car services on Google Maps.',
      url: 'https://maps.app.goo.gl/pL1rB2Pq8i2KxH8Q8',
      platform: 'maps',
      platformName: 'Google Maps',
      badgeAr: 'Google Maps',
      badgeEn: 'Google Maps Location',
      category: 'gas',
      accentColor: 'blue'
    }
  ];

  const cards = feedbackCards && feedbackCards.length > 0 ? feedbackCards : defaultCards;

  const getCardIcon = (item: any) => {
    if (typeof item.icon === 'function') return item.icon;
    if (item.category === 'gas' || String(item.id || '').includes('gas')) return Flame;
    if (item.category === 'consumer' || String(item.id || '').includes('consumer')) return Store;
    if (item.platform === 'drive' || String(item.id || '').includes('drive')) return FileText;
    if (item.platform === 'maps' || String(item.id || '').includes('maps')) return MapPin;
    return Globe;
  };

  const handleCopyLink = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShare = async (title: string, url: string) => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err) {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(url);
      setCopiedId('share-' + url);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const filteredCards = cards.filter((item: any) => {
    const matchesFilter = activeFilter === 'all' || item.platform === activeFilter;
    const title = locale === 'ar' ? (item.titleAr || '') : (item.titleEn || item.titleAr || '');
    const desc = locale === 'ar' ? (item.descriptionAr || item.descAr || '') : (item.descriptionEn || item.descEn || item.descriptionAr || '');
    const platformName = item.platformName || '';
    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      platformName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-10 sm:space-y-12 pb-20">
      <PageHero
        badge={t.feedbackPage?.badge || (locale === 'ar' ? 'التغذية الراجعة' : 'Feedback')}
        title={t.feedbackPage?.title || (locale === 'ar' ? 'التغذية الراجعة والتقييمات' : 'Stakeholder Feedback')}
        subtitle={t.feedbackPage?.subtitle || (locale === 'ar' ? 'منصات التغذية الراجعة واستجابات أصحاب العلاقة' : 'Official channels for stakeholder feedback and reviews')}
        breadcrumbs={[{ label: locale === 'ar' ? 'التغذية الراجعة' : 'Feedback' }]}
      />

      {/* Main Managed Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Control Bar: Search + Filter Pills */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xs border border-gray-100 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#0F172A] flex items-center justify-center text-white shadow-xs">
                  <Globe className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#0F172A]">
                  {locale === 'ar' ? 'منصات التغذية الراجعة والتقييمات المعتمدة' : 'Official Feedback & Review Platforms'}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                {locale === 'ar'
                  ? 'روابط الوصول المباشر والوثائق الخاصة بآراء وملاحظات أصحاب العلاقة والعملاء'
                  : 'Direct access links & documents for stakeholder and customer reviews'}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#2563EB]/10 to-[#0F172A]/10 text-[#0F172A] font-bold text-xs border border-[#2563EB]/15">
                {filteredCards.length} {locale === 'ar' ? 'منصات معتمدة' : 'Platforms'}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-gray-100">
            {/* Filter Pills with matching color branding */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={'px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ' + (
                  activeFilter === 'all'
                    ? 'bg-gradient-to-r from-[#2563EB] to-[#0F172A] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                )}
              >
                {locale === 'ar' ? 'جميع المنصات' : 'All Platforms'}
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('drive')}
                className={'px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ' + (
                  activeFilter === 'drive'
                    ? 'bg-gradient-to-r from-[#84CC16] to-[#EAB308] text-white shadow-xs'
                    : 'bg-lime-50 text-lime-800 hover:bg-lime-100 border border-lime-200/50'
                )}
              >
                <FileText className="w-3.5 h-3.5" />
                Google Drive
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('maps')}
                className={'px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ' + (
                  activeFilter === 'maps'
                    ? 'bg-gradient-to-r from-[#F97316] to-[#FACC15] text-white shadow-xs'
                    : 'bg-orange-50 text-orange-800 hover:bg-orange-100 border border-orange-200/50'
                )}
              >
                <MapPin className="w-3.5 h-3.5" />
                Google Maps
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={locale === 'ar' ? 'بحث في المنصات...' : 'Search platforms...'}
                className="w-full ps-9 pe-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* Cards Grid with The 3 Gradients */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCards.map((item: any) => {
            const IconComponent = getCardIcon(item);
            const isCopied = copiedId === item.id;
            const title = locale === 'ar' ? (item.titleAr || '') : (item.titleEn || item.titleAr || '');
            const desc = locale === 'ar' ? (item.descriptionAr || item.descAr || '') : (item.descriptionEn || item.descEn || item.descriptionAr || '');
            const badge = locale === 'ar' ? (item.badgeAr || '') : (item.badgeEn || item.badgeAr || '');
            
            // Determine styling theme
            const isLime = item.platform === 'drive' || item.accentColor === 'lime' || item.accentColor === 'emerald' || item.category === 'stakeholders';
            const isOrange = item.category === 'consumer' || item.accentColor === 'amber' || item.accentColor === 'orange';
            const theme = isLime ? 'lime' : isOrange ? 'orange' : 'blue';

            const styleMap = {
              orange: {
                // 1. البرتقالي الدافئ (#F97316) إلى الأصفر المشرق (#FACC15)
                topBar: 'bg-gradient-to-r from-[#F97316] to-[#FACC15]',
                border: 'hover:border-[#F97316]/40',
                badgeBg: 'bg-orange-50 text-orange-900 border-[#F97316]/25',
                iconBox: 'bg-gradient-to-br from-[#F97316]/10 to-[#FACC15]/20 text-[#EA580C] group-hover:from-[#F97316] group-hover:to-[#FACC15] group-hover:text-white',
                btnBg: 'bg-gradient-to-r from-[#F97316] to-[#FACC15] text-white hover:brightness-105 shadow-xs',
                titleHover: 'group-hover:text-[#F97316]',
                shield: 'text-[#F97316]'
              },
              lime: {
                // 4. المستقبل والتجدد: الأخضر الفاتح (#84CC16) إلى الأصفر الليموني (#EAB308)
                topBar: 'bg-gradient-to-r from-[#84CC16] to-[#EAB308]',
                border: 'hover:border-[#84CC16]/40',
                badgeBg: 'bg-lime-50 text-lime-900 border-[#84CC16]/25',
                iconBox: 'bg-gradient-to-br from-[#84CC16]/10 to-[#EAB308]/20 text-[#65A30D] group-hover:from-[#84CC16] group-hover:to-[#EAB308] group-hover:text-white',
                btnBg: 'bg-gradient-to-r from-[#84CC16] to-[#EAB308] text-white hover:brightness-105 shadow-xs',
                titleHover: 'group-hover:text-[#65A30D]',
                shield: 'text-[#84CC16]'
              },
              blue: {
                // 5. الثقة والاتزان: الأزرق المتوسط (#2563EB) إلى الكحلي الداكن (#0F172A)
                topBar: 'bg-gradient-to-r from-[#2563EB] to-[#0F172A]',
                border: 'hover:border-[#2563EB]/40',
                badgeBg: 'bg-blue-50 text-slate-900 border-[#2563EB]/25',
                iconBox: 'bg-gradient-to-br from-[#2563EB]/10 to-[#0F172A]/20 text-[#2563EB] group-hover:from-[#2563EB] group-hover:to-[#0F172A] group-hover:text-white',
                btnBg: 'bg-gradient-to-r from-[#2563EB] to-[#0F172A] text-white hover:brightness-105 shadow-xs',
                titleHover: 'group-hover:text-[#2563EB]',
                shield: 'text-[#2563EB]'
              }
            }[theme];

            return (
              <div
                key={item.id}
                className={'group bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-xs ' + styleMap.border + ' transition-all duration-300 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 relative'}
              >
                {/* Top Colored Accent Bar */}
                <div className={'h-1.5 w-full ' + styleMap.topBar} />

                <div className="p-5 sm:p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3.5">
                    {/* Top Header */}
                    <div className="flex items-center justify-between gap-2">
                      <div className={'w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-2xs ' + styleMap.iconBox}>
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <span className={'px-3 py-1 rounded-full font-bold text-[11px] border ' + styleMap.badgeBg}>
                        {badge}
                      </span>
                    </div>

                    {/* Title & Platform Tag */}
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 mb-1">
                        <ShieldCheck className={'w-3.5 h-3.5 ' + styleMap.shield} />
                        <span>{item.platformName}</span>
                      </div>
                      <h3 className={'font-black text-base text-[#0F172A] transition-colors leading-snug ' + styleMap.titleHover}>
                        {title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {desc}
                    </p>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-4 border-t border-slate-100 space-y-2.5">
                    {/* Main Open Link Button */}
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={'w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ' + styleMap.btnBg}
                    >
                      <span>{item.platform === 'drive' ? (locale === 'ar' ? 'فتح المستند المعتمد' : 'Open Official Document') : (locale === 'ar' ? 'تصفح التقييمات المعتمدة' : 'View Verified Reviews')}</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-transform" />
                    </a>

                    {/* Secondary Quick Action Buttons */}
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => handleCopyLink(item.id, item.url)}
                        className="flex-1 py-1.5 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold flex items-center justify-center gap-1.5 transition-colors text-[11px] cursor-pointer border border-slate-100"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700 font-bold">{locale === 'ar' ? 'تم النسخ' : 'Copied'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-500" />
                            <span>{locale === 'ar' ? 'نسخ الرابط' : 'Copy Link'}</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleShare(title, item.url)}
                        className="py-1.5 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold flex items-center justify-center gap-1.5 transition-colors text-[11px] cursor-pointer border border-slate-100"
                      >
                        <Share2 className="w-3.5 h-3.5 text-slate-500" />
                        <span>{locale === 'ar' ? 'مشاركة' : 'Share'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCards.length === 0 && (
          <div className="p-12 rounded-3xl bg-white text-center space-y-3 border border-slate-100 shadow-xs">
            <Sparkles className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-600">
              {locale === 'ar' ? 'لم يتم العثور على منصات تطابق البحث' : 'No matching platforms found'}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
