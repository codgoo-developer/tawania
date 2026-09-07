import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
  MessageSquareQuote,
  Instagram
} from 'lucide-react';
import { useI18n } from '../../i18n';
import { useGovernanceData } from '../../context/GovernanceDataContext';
import { AlShamelLogo } from '../common/AlShamelLogo';
import { XIcon } from '../common/XIcon';

export const Footer: React.FC = () => {
  const { locale, t, getLocalizedPath } = useI18n();
  const { contactSettings } = useGovernanceData();
  const rawWa = contactSettings?.whatsappPhone || contactSettings?.phone || '966504284861';
  const cleanWa = rawWa.replace(/[^0-9]/g, '');
  const formattedWa = cleanWa.startsWith('0') ? `966${cleanWa.slice(1)}` : (cleanWa.startsWith('966') ? cleanWa : `966${cleanWa}`);

  const phoneNum = contactSettings?.phone || '0504284861';
  const emailAddr = contactSettings?.email || 'info@shamil.org.sa';
  const addressText = locale === 'ar' ? (contactSettings?.addressAr || 'جدة، المملكة العربية السعودية') : (contactSettings?.addressEn || 'Jeddah, Saudi Arabia');

  const fullTitle = locale === 'ar'
    ? (contactSettings?.footerCalloutTitleAr || 'نبني أثراً يستمر')
    : (contactSettings?.footerCalloutTitleEn || 'Building Lasting Impact');

  // Split title so the last word is in golden yellow
  const titleWords = fullTitle.trim().split(' ');
  const mainTitlePart = titleWords.length > 1 ? titleWords.slice(0, -1).join(' ') : '';
  const endWord = titleWords.length > 1 ? titleWords[titleWords.length - 1] : fullTitle;

  return (
    <footer
      id="main-footer"
      className="relative bg-gradient-to-b from-[#08351B] to-[#062914] text-white pt-20 pb-12 overflow-hidden border-t border-emerald-900/40"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Top Big Callout Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-14 border-b border-white/15">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold text-white">
              <ShieldCheck className="w-3.5 h-3.5 text-[#84CC16]" />
              <span>{locale === 'ar' ? 'صرح تعاوني مرخص وموثوق' : 'Regulated & Trusted Cooperative'}</span>
            </div>

            {/* Title: White with ending word in yellow */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {mainTitlePart ? (
                <>
                  <span className="text-white">{mainTitlePart} </span>
                  <span className="text-[#84CC16] drop-shadow-sm">{endWord}</span>
                </>
              ) : (
                <span className="text-white">{endWord}</span>
              )}
            </h2>

            <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
              {locale === 'ar'
                ? (contactSettings?.footerCalloutSubAr || 'جمعية تعاونية مرخصة تهدف إلى تعزيز الاستدامة وتنمية المجتمع والاقتصاد المحلي بجدة.')
                : (contactSettings?.footerCalloutSubEn || 'A regulated cooperative society dedicated to fostering sustainability, community empowerment, and local economic resilience in Jeddah.')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${formattedWa}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-white text-[#0B4F26] hover:bg-amber-50 text-xs sm:text-sm font-black transition-all duration-300 flex items-center gap-2.5 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <Phone className="w-4 h-4 text-[#0B4F26]" />
              <span>{locale === 'ar' ? 'تواصل عبر واتساب' : 'WhatsApp Us'}</span>
            </a>
            <Link
              to={getLocalizedPath('/feedback')}
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2.5 border border-white/20 backdrop-blur-md hover:-translate-y-0.5"
            >
              <MessageSquareQuote className="w-4 h-4 text-[#84CC16]" />
              <span>{locale === 'ar' ? 'الشكاوى والاستطلاعات' : 'Complaints & Surveys'}</span>
            </Link>
          </div>
        </div>

        {/* 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-14 border-b border-white/15">
          <div className="space-y-5">
            <AlShamelLogo
              size="md"
              src={contactSettings?.logoLightUrl || '/logoLight.png'}
              useLight
            />

            <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-normal">
              {locale === 'ar'
                ? (contactSettings?.footerAboutTextAr || 'تعاونية الشامل متعددة الأغراض - صرح تعاوني واستثماري رائد بجدة، يخضع لإشراف المركز الوطني لتنمية القطاع غير الربحي.')
                : (contactSettings?.footerAboutTextEn || t.footer.desc)}
            </p>

            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={contactSettings?.instagramUrl || "https://instagram.com/shamel_coo"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#84CC16] hover:text-[#0B4F26] text-white flex items-center justify-center transition-all duration-300 border border-white/15"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={contactSettings?.twitterUrl || "https://x.com/shamel_coo"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#84CC16] hover:text-[#0B4F26] text-white flex items-center justify-center transition-all duration-300 border border-white/15"
              >
                <XIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-[#84CC16]" />
              <span>{t.footer.quickLinks}</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/90">
              <li>
                <Link to={getLocalizedPath('/board')} className="text-white hover:text-[#84CC16] hover:translate-x-1 rtl:hover:-translate-x-1 inline-block transition-all duration-200">
                  {t.nav.board}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/executive-director')} className="text-white hover:text-[#84CC16] hover:translate-x-1 rtl:hover:-translate-x-1 inline-block transition-all duration-200">
                  {locale === 'ar' ? 'المدير التنفيذي' : 'Executive Director'}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/projects')} className="text-white hover:text-[#84CC16] hover:translate-x-1 rtl:hover:-translate-x-1 inline-block transition-all duration-200">
                  {t.nav.allProjects}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/members/directory')} className="text-white hover:text-[#84CC16] hover:translate-x-1 rtl:hover:-translate-x-1 inline-block transition-all duration-200">
                  {locale === 'ar' ? 'دليل الاعضاء' : 'Members Directory'}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/members/register')} className="text-white hover:text-[#84CC16] hover:translate-x-1 rtl:hover:-translate-x-1 inline-block transition-all duration-200">
                  {locale === 'ar' ? 'تسجيل عضو جديد' : 'New Member Registration'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Governance & Reports */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-[#84CC16]" />
              <span>{locale === 'ar' ? 'الحوكمة والشفافية' : 'Governance & Reports'}</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-white/90">
              <li>
                <Link to={getLocalizedPath('/financial-statements')} className="text-white hover:text-[#84CC16] hover:translate-x-1 rtl:hover:-translate-x-1 inline-block transition-all duration-200">
                  {locale === 'ar' ? 'القوائم المالية المدققة' : 'Audited Financial Statements'}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/ethics')} className="text-white hover:text-[#84CC16] hover:translate-x-1 rtl:hover:-translate-x-1 inline-block transition-all duration-200">
                  {locale === 'ar' ? 'الميثاق الأخلاقي' : 'Ethical Charter'}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/meetings/general-assembly')} className="text-white hover:text-[#84CC16] hover:translate-x-1 rtl:hover:-translate-x-1 inline-block transition-all duration-200">
                  {locale === 'ar' ? 'محاضر الجمعية العمومية' : 'Assembly Meeting Minutes'}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/meetings/board')} className="text-white hover:text-[#84CC16] hover:translate-x-1 rtl:hover:-translate-x-1 inline-block transition-all duration-200">
                  {locale === 'ar' ? 'محاضر مجلس الإدارة' : 'Board Meeting Minutes'}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/whistleblowing')} className="text-white hover:text-[#84CC16] hover:translate-x-1 rtl:hover:-translate-x-1 inline-block transition-all duration-200">
                  {locale === 'ar' ? 'الإبلاغ عن المخالفات' : 'Whistleblowing Portal'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact info */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              <span className="w-1.5 h-3.5 rounded-full bg-[#84CC16]" />
              <span>{locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}</span>
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-white/95">
              <a
                href={`tel:${phoneNum}`}
                className="flex items-center gap-2.5 text-white hover:text-[#84CC16] transition-colors font-mono"
              >
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                  <Phone className="w-3.5 h-3.5 text-[#84CC16]" />
                </div>
                <span>{phoneNum}</span>
              </a>
              <div className="flex items-center gap-2.5 text-white">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-[#84CC16]" />
                </div>
                <span>{addressText}</span>
              </div>
              <a
                href={`mailto:${emailAddr}`}
                className="flex items-center gap-2.5 text-white hover:text-[#84CC16] transition-colors font-mono"
              >
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                  <Mail className="w-3.5 h-3.5 text-[#84CC16]" />
                </div>
                <span>{emailAddr}</span>
              </a>
              <a
                href={`https://wa.me/${formattedWa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-[#84CC16] hover:text-amber-200 transition-colors pt-2 font-bold"
              >
                <span>{locale === 'ar' ? 'للتواصل مع المبيعات' : 'Sales Inquiries'}</span>
                <span className="rtl:rotate-180">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar (End of Footer) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/80">
          <p className="text-center sm:text-start font-medium text-white">
            {locale === 'ar' ? (
              <>
                <span>© 2026 </span>
                <span className="text-[#84CC16] font-bold">تعاونية الشامل</span>
                <span> | جميع الحقوق محفوظة</span>
              </>
            ) : (
              <>
                <span>© 2026 </span>
                <span className="text-[#84CC16] font-bold">AlShamel Cooperative</span>
                <span> | All Rights Reserved</span>
              </>
            )}
          </p>

          <div className="flex items-center gap-6">
            <Link to={getLocalizedPath('/policies/data-privacy')} className="text-white/80 hover:text-[#84CC16] transition-colors">
              {locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </Link>
            <Link to={getLocalizedPath('/ethics')} className="text-white/80 hover:text-[#84CC16] transition-colors">
              {locale === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
