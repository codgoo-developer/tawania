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
  Instagram,
  Twitter
} from 'lucide-react';
import { useI18n } from '../../i18n';
import { useGovernanceData } from '../../context/GovernanceDataContext';
import { AlShamelLogo } from '../common/AlShamelLogo';

export const Footer: React.FC = () => {
  const { locale, t, getLocalizedPath } = useI18n();
  const { contactSettings } = useGovernanceData();
  const rawWa = contactSettings?.whatsappPhone || contactSettings?.phone || '966504284861';
  const cleanWa = rawWa.replace(/[^0-9]/g, '');
  const formattedWa = cleanWa.startsWith('0') ? `966${cleanWa.slice(1)}` : (cleanWa.startsWith('966') ? cleanWa : `966${cleanWa}`);

  const phoneNum = contactSettings?.phone || '0504284861';
  const emailAddr = contactSettings?.email || 'info@shamil.org.sa';
  const addressText = locale === 'ar' ? (contactSettings?.addressAr || 'جدة، المملكة العربية السعودية') : (contactSettings?.addressEn || 'Jeddah, Saudi Arabia');

  return (
    <footer id="main-footer" className="bg-[#05241C] text-white pt-20 pb-10 border-t border-[#095B42]/30 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top Big Callout matching screen.png */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-14 border-b border-white/10">
          <div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {locale === 'ar' ? (contactSettings?.footerCalloutTitleAr || 'نبني أثراً يستمر') : (contactSettings?.footerCalloutTitleEn || 'Building Lasting Impact')}
            </h2>
            <p className="text-sm sm:text-base text-white/75 mt-2.5 max-w-lg">
              {locale === 'ar'
                ? (contactSettings?.footerCalloutSubAr || 'جمعية تعاونية مرخصة تهدف إلى تعزيز الاستدامة وتنمية المجتمع والاقتصاد المحلي بجدة.')
                : (contactSettings?.footerCalloutSubEn || 'A regulated cooperative society dedicated to fostering sustainability, community empowerment, and local economic resilience in Jeddah.')}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${formattedWa}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-gradient-to-br from-[#095B42] to-[#064230] hover:brightness-110 text-white text-xs sm:text-sm font-bold transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#E5C170]" />
              <span>{locale === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
            </a>
            <Link
              to={getLocalizedPath('/feedback')}
              className="px-4 md:px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold transition-colors flex items-center gap-2 border border-white/10"
            >
              <MessageSquareQuote className="w-4 h-4 text-[#E5C170]" />
              <span>{locale === 'ar' ? 'الشكاوى والاستطلاعات' : 'Complaints & Surveys'}</span>
            </Link>
          </div>
        </div>

        {/* 4-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-b border-white/10">
          {/* Col 1: About AlShamel */}
          <div className="space-y-4">
            <AlShamelLogo size="sm" textColor="#FFFFFF" />

            <p className="text-xs text-white/70 leading-relaxed">
              {locale === 'ar'
                ? (contactSettings?.footerAboutTextAr || 'تعاونية الشامل متعددة الأغراض - صرح تعاوني واستثماري رائد بجدة، يخضع لإشراف المركز الوطني لتنمية القطاع غير الربحي.')
                : (contactSettings?.footerAboutTextEn || t.footer.desc)}
            </p>

            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://instagram.com/shamel_coo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a
                href="https://x.com/shamel_coo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4 text-white" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <Link to={getLocalizedPath('/board')} className="hover:text-white hover:underline transition-colors">
                  {t.nav.board}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/executive-director')} className="hover:text-white hover:underline transition-colors">
                  {locale === 'ar' ? 'المدير التنفيذي' : 'Executive Director'}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/projects')} className="hover:text-white hover:underline transition-colors">
                  {t.nav.allProjects}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/members/directory')} className="hover:text-white hover:underline transition-colors">
                  {locale === 'ar' ? 'دليل الاعضاء' : 'Members Directory'}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/members/register')} className="hover:text-white hover:underline transition-colors">
                  {locale === 'ar' ? 'تسجيل عضو جديد' : 'New Member Registration'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Governance & Reports */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {locale === 'ar' ? 'الحوكمة والشفافية' : 'Governance & Reports'}
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <Link to={getLocalizedPath('/financial-statements')} className="hover:text-white hover:underline transition-colors">
                  {locale === 'ar' ? 'القوائم المالية المدققة' : 'Audited Financial Statements'}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/ethics')} className="hover:text-white hover:underline transition-colors">
                  {locale === 'ar' ? 'الميثاق الأخلاقي' : 'Ethical Charter'}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/meetings/general-assembly')} className="hover:text-white hover:underline transition-colors">
                  {locale === 'ar' ? 'محاضر الجمعية العمومية' : 'Assembly Meeting Minutes'}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/meetings/board')} className="hover:text-white hover:underline transition-colors">
                  {locale === 'ar' ? 'محاضر مجلس الإدارة' : 'Board Meeting Minutes'}
                </Link>
              </li>
              <li>
                <Link to={getLocalizedPath('/whistleblowing')} className="hover:text-white hover:underline transition-colors">
                  {locale === 'ar' ? 'الإبلاغ عن المخالفات' : 'Whistleblowing Portal'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact info matching exact user spec */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {locale === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </h4>
            <div className="space-y-2 text-xs text-white/70">
              <a
                href={`tel:${phoneNum}`}
                className="flex items-center gap-2 hover:text-white transition-colors font-mono"
              >
                <Phone className="w-3.5 h-3.5 text-[#E5C170] shrink-0" />
                <span>{phoneNum}</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#E5C170] shrink-0" />
                <span>{addressText}</span>
              </div>
              <a
                href={`mailto:${emailAddr}`}
                className="flex items-center gap-2 hover:text-white transition-colors font-mono"
              >
                <Mail className="w-3.5 h-3.5 text-[#E5C170] shrink-0" />
                <span>{emailAddr}</span>
              </a>
              <a
                href={`https://wa.me/${formattedWa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#E5C170] hover:underline pt-1 font-semibold"
              >
                <span>{locale === 'ar' ? 'للتواصل مع المبيعات' : 'Sales Inquiries'}</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar matching exact user prompt */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p className="text-center sm:text-start font-medium">
            {locale === 'ar'
              ? '© 2026 تعاونية الشامل | جميع الحقوق محفوظة'
              : '© 2026 AlShamel Cooperative | All Rights Reserved'}
          </p>

          <div className="flex items-center gap-6">
            <Link to={getLocalizedPath('/policies/data-privacy')} className="hover:text-white transition-colors">
              {locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </Link>
            <Link to={getLocalizedPath('/ethics')} className="hover:text-white transition-colors">
              {locale === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
