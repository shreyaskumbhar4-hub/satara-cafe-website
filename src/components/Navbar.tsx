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

  // 7 Standalone pages navigation
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
    <header className="sticky top-0 z-40 bg-[#FBF6EE]/95 backdrop-blur-md border-b border-[#E7DBCA] text-[#241810] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        
        {/* Brand Zone */}
        <button
          onClick={() => handleLinkClick('home')}
          className="flex items-baseline gap-2.5 text-[#241810] hover:text-[#D37432] transition-colors text-left group shrink-0"
        >
          <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#241810] group-hover:text-[#D37432]">
            Satara Cafe
          </span>
          <span className="font-marathi-brand text-sm sm:text-base text-[#D37432] font-semibold">
            सातारा कॅफे
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-xs uppercase tracking-wider font-semibold text-[#5F4B3C]">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`py-1 relative transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#D37432] font-bold'
                    : 'hover:text-[#241810]'
                }`}
              >
                <span>{lang === 'en' ? link.labelEn : link.labelMr}</span>
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#D37432] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions Zone */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleLang}
            type="button"
            className="px-3 py-1.5 text-[11px] font-semibold text-[#5F4B3C] hover:text-[#241810] bg-[#F3E9D7] hover:bg-[#EBE0CC] border border-[#DECEB7] rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            title="Switch Language"
          >
            {lang === 'en' ? 'मराठी' : 'English'}
          </button>

          <button
            onClick={() => handleLinkClick('order-slip')}
            type="button"
            className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-full transition-all whitespace-nowrap shrink-0 shadow-xs cursor-pointer ${
              activePage === 'order-slip'
                ? 'bg-[#241810] text-[#FBF6EE]'
                : 'bg-[#D37432] hover:bg-[#B2581A] text-white hover:shadow-sm'
            }`}
          >
            <span>{lang === 'en' ? 'Order Slip' : 'पावती'}</span>
            <span className="w-5 h-5 rounded-full bg-white text-[#D37432] text-[11px] font-bold flex items-center justify-center tabular-nums shadow-xs">
              {cartCount}
            </span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="lg:hidden p-2 text-[#5F4B3C] hover:text-[#241810] rounded-xl border border-[#DECEB7] bg-[#F3E9D7] cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className="text-xs font-bold">{mobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>

      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFDF9] border-b border-[#E7DBCA] px-4 py-4 space-y-2 animate-fade-in shadow-lg">
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#8D7663] pb-1 border-b border-[#F3E9D7]">
            {lang === 'en' ? 'Explore Satara Cafe' : 'सातारा कॅफे विभाग'}
          </div>
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full text-left py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-[#D37432] text-white'
                    : 'text-[#5F4B3C] hover:bg-[#F3E9D7]'
                }`}
              >
                <span>{lang === 'en' ? link.labelEn : link.labelMr}</span>
                {link.id === 'order-slip' && cartCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-white text-[#D37432] text-[10px] font-bold tabular-nums">
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
