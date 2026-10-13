import React, { useState } from 'react';
import { ActivePage, Language } from '../types';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  activePage,
  onNavigate,
  cartCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: ActivePage; labelEn: string; labelMr: string }[] = [
    { id: 'home', labelEn: 'Katta', labelMr: 'कट्टा' },
    { id: 'menu', labelEn: 'Menu & Combos', labelMr: 'मेनू कार्ड' },
    { id: 'order-slip', labelEn: 'Order Slip', labelMr: 'पावती' },
    { id: 'story-craft', labelEn: 'Kitchen Craft', labelMr: 'किचन व मसाले' },
    { id: 'reviews', labelEn: 'Cafe Chits', labelMr: 'अभिप्राय' },
    { id: 'table-booking', labelEn: 'Table Booking', labelMr: 'टेबल आरक्षण' },
    { id: 'location', labelEn: 'Sadar Bazar Map', labelMr: 'पत्ता' },
  ];

  const handleLinkClick = (page: ActivePage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fcf8f2]/95 backdrop-blur-md border-b border-[#e8dfd1] text-[#241a15] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        
        {/* Brand Zone */}
        <button
          onClick={() => handleLinkClick('home')}
          className="flex items-baseline gap-2.5 text-[#241a15] hover:text-[#9c3418] transition-colors text-left group shrink-0"
        >
          <span className="font-editorial text-2xl font-bold tracking-tight text-[#241a15] group-hover:text-[#9c3418]">
            Satara Cafe
          </span>
          <span className="font-marathi-brand text-sm sm:text-base text-[#9c3418] font-normal">
            सातारा कॅफे
          </span>
        </button>

        {/* Desktop 7-Page Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-5 text-xs uppercase tracking-wider font-semibold text-[#5c4a40]">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`py-1 relative transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#9c3418] font-bold'
                    : 'hover:text-[#241a15]'
                }`}
              >
                <span>{lang === 'en' ? link.labelEn : link.labelMr}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#9c3418] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions Zone: Language Switcher + Order Slip Quick Tab + Mobile Toggle */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onToggleLang}
            type="button"
            className="px-2.5 py-1 text-[11px] font-semibold text-[#5c4a40] hover:text-[#241a15] border border-[#dcd1be] rounded transition-colors whitespace-nowrap shrink-0"
            title="Switch Language"
          >
            {lang === 'en' ? 'मराठी' : 'English'}
          </button>

          <button
            onClick={() => handleLinkClick('order-slip')}
            type="button"
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap shrink-0 shadow-xs ${
              activePage === 'order-slip'
                ? 'bg-[#241a15] text-[#fcf8f2]'
                : 'bg-[#9c3418] hover:bg-[#802810] text-[#fcf8f2]'
            }`}
          >
            <span>{lang === 'en' ? 'Slip' : 'पावती'}</span>
            <span className="w-5 h-5 rounded-full bg-[#fcf8f2] text-[#9c3418] text-[11px] font-bold flex items-center justify-center tabular-nums">
              {cartCount}
            </span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="lg:hidden p-2 text-[#5c4a40] hover:text-[#241a15] rounded border border-[#dcd1be]"
            aria-label="Toggle menu"
          >
            <span className="text-xs font-bold">{mobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>

      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fffdfa] border-b border-[#e8dfd1] px-4 py-4 space-y-2 animate-fade-in shadow-lg">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#8c786a] pb-1 border-b border-[#f4ecdf]">
            {lang === 'en' ? 'Explore Satara Cafe' : 'सातारा कॅफे विभाग'}
          </div>
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full text-left py-2 px-3 rounded text-xs font-semibold flex items-center justify-between ${
                  isActive
                    ? 'bg-[#9c3418] text-[#fcf8f2]'
                    : 'text-[#5c4a40] hover:bg-[#f4ecdf]'
                }`}
              >
                <span>{lang === 'en' ? link.labelEn : link.labelMr}</span>
                {link.id === 'order-slip' && cartCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#fffdfa] text-[#9c3418] text-[10px] font-bold tabular-nums">
                    {cartCount} items
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
