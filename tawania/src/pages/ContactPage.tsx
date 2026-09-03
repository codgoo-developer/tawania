import { useToast } from '../context/ToastContext';
import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Instagram,
  Twitter
} from 'lucide-react';
import { useI18n } from '../i18n';
import { useGovernanceData } from '../context/GovernanceDataContext';
import { PageHero } from '../components/layout/PageHero';
import { ContactForm } from '../components/forms/ContactForm';
import { Button } from '../components/ui/Button';

export const ContactPage: React.FC = () => {
  const toast = useToast();
  const { locale, t } = useI18n();
  const { contactSettings } = useGovernanceData();

  const phoneNum = contactSettings?.phone || '0504284861';
  const whatsappNum = contactSettings?.whatsappPhone || phoneNum;
  const cleanWhatsapp = whatsappNum.startsWith('0') ? `966${whatsappNum.slice(1)}` : whatsappNum;

  return (
    <div className="space-y-16 pb-20">
      <PageHero
        badge={t.contactPage.badge}
        title={t.contactPage.title}
        subtitle={t.contactPage.subtitle}
        breadcrumbs={[{ label: t.nav.contactUs }]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details & Map Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-start">
            <div className="bg-white rounded-3xl p-8 border border-[#12332B]/10 shadow-xs space-y-6">
              <h2 className="text-xl font-bold text-[#12332B]">
                {locale === 'ar' ? (contactSettings?.hqTitleAr || 'المقر الرئيسي للإدارة') : (contactSettings?.hqTitleEn || 'Headquarters & Main Office')}
              </h2>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#EBF4F0] text-[#0B6B4F] flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#12332B] block mb-0.5">
                      {locale === 'ar' ? 'العنوان والمقر' : 'Address & Location'}
                    </span>
                    <p className="text-[#68736F] leading-relaxed">
                      {locale === 'ar' ? (contactSettings?.addressAr || 'جدة، المملكة العربية السعودية') : (contactSettings?.addressEn || 'Jeddah, Kingdom of Saudi Arabia')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#EBF4F0] text-[#0B6B4F] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#12332B] block mb-0.5">
                      {locale === 'ar' ? 'الهاتف المباشر' : 'Direct Phone'}
                    </span>
                    <a
                      href={`tel:${phoneNum}`}
                      className="text-[#0B6B4F] font-bold hover:underline font-mono text-sm"
                    >
                      {phoneNum}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#EBF4F0] text-[#0B6B4F] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#12332B] block mb-0.5">
                      {locale === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                    </span>
                    <a
                      href={`mailto:${contactSettings?.email || 'info@shamil.org.sa'}`}
                      className="text-[#0B6B4F] font-bold hover:underline font-mono text-xs sm:text-sm"
                    >
                      {contactSettings?.email || 'info@shamil.org.sa'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#EBF4F0] text-[#0B6B4F] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-[#12332B] block mb-0.5">
                      {locale === 'ar' ? 'ساعات العمل الرسمية' : 'Working Hours'}
                    </span>
                    <p className="text-[#68736F] leading-relaxed">
                      {locale === 'ar' ? (contactSettings?.workingHoursAr || 'الأحد - الخميس: 8:00 صباحاً - 4:00 مساءً') : (contactSettings?.workingHoursEn || 'Sunday - Thursday: 8:00 AM - 4:00 PM')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp & Social Actions */}
              <div className="pt-2 space-y-3">
                <Button
                  href={`https://wa.me/${cleanWhatsapp}`}
                  external
                  variant="primary"
                  size="md"
                  className="w-full bg-gradient-to-br from-[#25D366] to-[#128C4A] hover:brightness-110 font-bold"
                  leftIcon={<MessageSquare className="w-4 h-4" />}
                >
                  {locale === 'ar' ? 'واتساب' : 'WhatsApp'}
                </Button>

                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <a
                    href={contactSettings?.instagramUrl || 'https://instagram.com/shamel_coo'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#F7F8F6] border border-[#12332B]/10 hover:border-[#0B6B4F] hover:bg-[#EBF4F0] text-xs font-semibold text-[#12332B] transition-colors"
                  >
                    <Instagram className="w-4 h-4 text-[#E1306C]" />
                    <span>{contactSettings?.instagramHandle || '@shamel_coo'}</span>
                  </a>
                  <a
                    href={contactSettings?.twitterUrl || 'https://x.com/shamel_coo'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-[#F7F8F6] border border-[#12332B]/10 hover:border-[#0B6B4F] hover:bg-[#EBF4F0] text-xs font-semibold text-[#12332B] transition-colors"
                  >
                    <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                    <span>{contactSettings?.twitterHandle || '@shamel_coo'}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Map Preview Card */}
            <div className="bg-white rounded-3xl overflow-hidden border border-[#12332B]/10 shadow-xs">
              <div className="p-4 bg-[#F7F8F6] border-b border-[#12332B]/5 flex items-center justify-between text-xs font-bold text-[#12332B]">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#0B6B4F]" />
                  <span>{locale === 'ar' ? 'موقع الجمعية على الخريطة' : 'Map Coordinates'}</span>
                </span>
                <a
                  href={contactSettings?.mapsUrl || 'https://maps.google.com/?q=Jeddah,Makkah,Saudi+Arabia'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0B6B4F] hover:underline text-[11px]"
                >
                  {locale === 'ar' ? 'فتح في خرائط Google' : 'Google Maps'} →
                </a>
              </div>
              <div className="h-48 bg-gradient-to-br from-[#12332B] to-[#0B211C] relative overflow-hidden flex items-center justify-center text-center p-4">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80"
                  alt="Jeddah Satellite"
                  className="absolute inset-0 w-full h-full object-cover opacity-50"
                  referrerPolicy="no-referrer"
                />
                <div className="relative z-10 text-white space-y-1">
                  <MapPin className="w-8 h-8 text-[#C9A45C] mx-auto animate-bounce" />
                  <p className="text-xs font-bold">{locale === 'ar' ? (contactSettings?.regionAr || 'محافظة جدة - منطقة مكة المكرمة') : (contactSettings?.regionEn || 'Jeddah, Makkah Region')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
};
