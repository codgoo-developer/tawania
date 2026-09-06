import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu } from 'lucide-react';
import { useI18n } from '../../i18n';
import { useAuth } from '../../context/AuthContext';
import { AlShamelLogo } from '../common/AlShamelLogo';
import { MegaMenu } from '../navigation/MegaMenu';
import { NavActionsDropdown } from '../navigation/NavActionsDropdown';
import { GlobalSearchModal } from '../navigation/GlobalSearchModal';
import { MobileDrawer } from '../navigation/MobileDrawer';
import { AnnouncementBar } from './AnnouncementBar';

export const Header: React.FC = () => {
  const { locale, t, getLocalizedPath } = useI18n();
  const { isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Announcement Bar Above Navbar */}
      <AnnouncementBar />

      {/* Sticky Header with fixed height */}
      <header
        id="main-header"
        className={`sticky top-0 z-40 w-full h-[90px] flex items-center transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#12332B]/10'
            : 'bg-white/95 backdrop-blur-xs border-b border-[#12332B]/5'
        }`}
      >
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between gap-2 xl:gap-4">
            {/* Logo Section */}
            <Link
              to={getLocalizedPath('/')}
              className="flex items-center gap-2 group shrink-0 focus-visible:outline-2 focus-visible:outline-[#0B6B4F] rounded-lg"
              aria-label={t.common.siteName}
            >
              <AlShamelLogo size="md" textColor="#0A4D38" />
            </Link>

            {/* Desktop Center Navigation (Mega Menu) */}
            <MegaMenu />

            {/* Desktop & Mobile Actions */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              {/* Search Icon Trigger */}
              <button
                type="button"
                id="search-trigger-btn"
                onClick={() => setIsSearchOpen(true)}
                className="h-8 w-8 text-xs font-medium text-[#17211E] bg-[#F7F8F6] hover:bg-[#EBF4F0] border border-[#12332B]/10 rounded-full transition-all flex items-center justify-center cursor-pointer shadow-2xs group"
                aria-label={t.common.search}
              >
                <Search className="w-3.5 h-3.5 text-[#0B6B4F] group-hover:scale-110 transition-transform" />
              </button>

              {/* Combined Language & Admin Dropdown */}
              <NavActionsDropdown />

              {/* Mobile Drawer Trigger */}
              <button
                type="button"
                id="mobile-drawer-toggle"
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden h-8 w-8 flex items-center justify-center text-[#12332B] hover:bg-[#EBF4F0] rounded-full transition-colors cursor-pointer border border-transparent hover:border-[#12332B]/10"
                aria-label={t.nav.openMenu}
              >
                <Menu className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />
    </>
  );
};
