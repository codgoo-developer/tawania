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
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#12332B]/10 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-[#12332B] flex items-center gap-2">
                <Globe className="w-6 h-6 text-[#0B6B4F]" />
                {locale === 'ar' ? 'منصات التغذية الراجعة والتقييمات المعتمدة' : 'Official Feedback & Review Platforms'}
              </h2>
              <p className="text-xs sm:text-sm text-[#68736F] mt-1">
                {locale === 'ar'
                  ? 'روابط الوصول المباشر والوثائق الخاصة بآراء وملاحظات أصحاب العلاقة والعملاء'
                  : 'Direct access links & documents for stakeholder and customer reviews'}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="px-3.5 py-1.5 rounded-full bg-[#0B6B4F]/10 text-[#0B6B4F] font-bold text-xs">
                {filteredCards.length} {locale === 'ar' ? 'منصات معتمدة' : 'Platforms'}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-gray-100">
            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={'px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ' + (
                  activeFilter === 'all'
                    ? 'bg-[#0B6B4F] text-white shadow-2xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                )}
              >
                {locale === 'ar' ? 'جميع المنصات' : 'All Platforms'}
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('drive')}
                className={'px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ' + (
                  activeFilter === 'drive'
                    ? 'bg-emerald-700 text-white shadow-2xs'
                    : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
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
                    ? 'bg-amber-600 text-white shadow-2xs'
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                )}
              >
                <MapPin className="w-3.5 h-3.5" />
                Google Maps
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={locale === 'ar' ? 'بحث في المنصات...' : 'Search platforms...'}
                className="w-full ps-9 pe-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#095B42] focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredCards.map((item: any) => {
            const IconComponent = getCardIcon(item);
            const isCopied = copiedId === item.id;
            const title = locale === 'ar' ? (item.titleAr || '') : (item.titleEn || item.titleAr || '');
            const desc = locale === 'ar' ? (item.descriptionAr || item.descAr || '') : (item.descriptionEn || item.descEn || item.descriptionAr || '');
            const badge = locale === 'ar' ? (item.badgeAr || '') : (item.badgeEn || item.badgeAr || '');
            const accent = (item.accentColor as 'emerald' | 'amber' | 'blue') || (item.platform === 'drive' ? 'emerald' : item.category === 'gas' ? 'blue' : 'amber');

            const styleMap = {
              emerald: {
                border: 'hover:border-emerald-500',
                badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200/60',
                iconBg: 'bg-emerald-500/10 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white',
                btnBg: 'bg-emerald-700 hover:bg-emerald-800 text-white',
                accentText: 'text-emerald-700'
              },
              amber: {
                border: 'hover:border-amber-500',
                badgeBg: 'bg-amber-50 text-amber-800 border-amber-200/60',
                iconBg: 'bg-amber-500/10 text-amber-700 group-hover:bg-amber-600 group-hover:text-white',
                btnBg: 'bg-amber-600 hover:bg-amber-700 text-white',
                accentText: 'text-amber-700'
              },
              blue: {
                border: 'hover:border-blue-500',
                badgeBg: 'bg-blue-50 text-blue-800 border-blue-200/60',
                iconBg: 'bg-blue-500/10 text-blue-700 group-hover:bg-blue-600 group-hover:text-white',
                btnBg: 'bg-blue-600 hover:bg-blue-700 text-white',
                accentText: 'text-blue-700'
              }
            }[accent] || {
              border: 'hover:border-emerald-500',
              badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200/60',
              iconBg: 'bg-emerald-500/10 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white',
              btnBg: 'bg-emerald-700 hover:bg-emerald-800 text-white',
              accentText: 'text-emerald-700'
            };

            return (
              <div
                key={item.id}
                className={'group bg-white rounded-2xl p-6 border border-[#12332B]/10 shadow-xs ' + styleMap.border + ' transition-all duration-300 flex flex-col justify-between space-y-6 hover:shadow-lg hover:-translate-y-1 relative'}
              >
                <div className="space-y-4">
                  {/* Top Header */}
                  <div className="flex items-center justify-between gap-2">
                    <div className={'w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 ' + styleMap.iconBg}>
                      <IconComponent className="w-6 h-6" />
                    </div>

                    <span className={'px-3 py-1 rounded-full font-bold text-[11px] border ' + styleMap.badgeBg}>
                      {badge}
                    </span>
                  </div>

                  {/* Title & Platform Tag */}
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 mb-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#0B6B4F]" />
                      <span>{item.platformName}</span>
                    </div>
                    <h3 className="font-black text-base text-[#12332B] group-hover:text-[#0B6B4F] transition-colors leading-snug">
                      {title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#68736F] leading-relaxed">
                    {desc}
                  </p>
                </div>

                {/* Actions Footer */}
                <div className="pt-4 border-t border-gray-100 space-y-3">
                  {/* Main Open Link Button */}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={'w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-2xs ' + styleMap.btnBg}
                  >
                    <span>{item.platform === 'drive' ? (locale === 'ar' ? 'فتح المستند' : 'Open Document') : (locale === 'ar' ? 'تصفح التقييمات' : 'View Reviews')}</span>
                    <ExternalLink className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  </a>

                  {/* Secondary Quick Action Buttons */}
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => handleCopyLink(item.id, item.url)}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold flex items-center justify-center gap-1.5 transition-colors text-[11px] cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">{locale === 'ar' ? 'تم النسخ' : 'Copied'}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-gray-500" />
                          <span>{locale === 'ar' ? 'نسخ الرابط' : 'Copy Link'}</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleShare(title, item.url)}
                      className="py-1.5 px-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold flex items-center justify-center gap-1.5 transition-colors text-[11px] cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5 text-gray-500" />
                      <span>{locale === 'ar' ? 'مشاركة' : 'Share'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCards.length === 0 && (
          <div className="p-12 rounded-2xl bg-white border border-gray-200 text-center space-y-3">
            <Sparkles className="w-8 h-8 text-gray-300 mx-auto" />
            <p className="text-sm font-bold text-gray-600">
              {locale === 'ar' ? 'لم يتم العثور على منصات تطابق البحث' : 'No matching platforms found'}
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
