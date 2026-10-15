import React from 'react';
import { CAFE_INFO } from '../data/cafeData';
import { ActivePage, Language } from '../types';

interface FooterProps {
  lang: Language;
  onNavigate: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  return (
    <footer className="bg-[#241810] text-[#DCD1BE] border-t-4 border-[#758A6F] text-xs pt-12 pb-14 relative overflow-hidden">
      
      {/* Decorative Tree Silhouette Row (Inspired by Bottom Silhouette in Reference Image) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-8 flex justify-between items-end opacity-20 text-[#FFFDF9] select-none pointer-events-none">
        <svg width="64" height="48" viewBox="0 0 64 48" fill="currentColor">
          <path d="M32 44V24M32 24C30 18 20 16 12 18C16 14 26 14 32 20M32 24C34 18 44 16 52 18C48 14 38 14 32 20M32 20C28 12 18 8 10 10C16 6 26 8 32 16M32 20C36 12 46 8 54 10C48 6 38 8 32 16M32 16C32 8 32 0 32 0C32 0 32 8 32 16Z" stroke="currentColor" strokeWidth="2"/>
        </svg>
        <svg width="48" height="36" viewBox="0 0 64 48" fill="currentColor">
          <path d="M32 44V24M32 24C30 18 20 16 12 18C16 14 26 14 32 20M32 24C34 18 44 16 52 18C48 14 38 14 32 20Z" stroke="currentColor" strokeWidth="2"/>
        </svg>
        <svg width="72" height="52" viewBox="0 0 64 48" fill="currentColor">
          <path d="M32 44V24M32 24C30 18 20 16 12 18C16 14 26 14 32 20M32 24C34 18 44 16 52 18C48 14 38 14 32 20M32 20C28 12 18 8 10 10C16 6 26 8 32 16M32 20C36 12 46 8 54 10C48 6 38 8 32 16M32 16C32 8 32 0 32 0C32 0 32 8 32 16Z" stroke="currentColor" strokeWidth="2"/>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10 pb-10 border-b border-[#3D2B1E]">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-baseline gap-2.5 text-left group"
            >
              <span className="font-editorial text-2xl sm:text-3xl font-bold text-[#FBF6EE] group-hover:text-[#D37432] transition-colors tracking-tight">
                Satara Cafe
              </span>
              <span className="font-marathi-brand text-[#D37432] text-base font-semibold">
                सातारा कॅफे
              </span>
            </button>
            <p className="text-[#A39082] max-w-sm leading-relaxed text-xs sm:text-sm">
              {lang === 'en'
                ? 'A warm neighborhood katta in Sadar Bazar. Hot banana leaf dosas, spicy wada pav, multigrain thalipeeth, and fresh filter coffee. Open daily 7:30 AM to 10:30 PM.'
                : 'सदर बझारमधील आपला हक्काचा कट्टा. गरमागरम डोसा, वडापाव, भाजणीचे थालीपीठ आणि सुगंधी कॉफी. रोज सकाळी ७:३० ते रात्री १०:३० सुरू.'}
            </p>
          </div>

          {/* Quick Page Links */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#FDE8D7]">
              Pages & Sections
            </div>
            <div className="flex flex-col space-y-1.5 text-xs text-[#A39082]">
              <button
                onClick={() => onNavigate('home')}
                className="hover:text-white text-left transition-colors"
              >
                1. Katta Atmosphere (Home)
              </button>
              <button
                onClick={() => onNavigate('menu')}
                className="hover:text-white text-left transition-colors"
              >
                2. Artisanal Menu & Combos
              </button>
              <button
                onClick={() => onNavigate('order-slip')}
                className="hover:text-white text-left transition-colors"
              >
                3. Table Order Slip
              </button>
              <button
                onClick={() => onNavigate('story-craft')}
                className="hover:text-white text-left transition-colors"
              >
                4. Kitchen Craft & Spices
              </button>
              <button
                onClick={() => onNavigate('reviews')}
                className="hover:text-white text-left transition-colors"
              >
                5. Pinned Cafe Chits
              </button>
              <button
                onClick={() => onNavigate('table-booking')}
                className="hover:text-white text-left transition-colors"
              >
                6. Table Booking & Rides
              </button>
              <button
                onClick={() => onNavigate('location')}
                className="hover:text-white text-left transition-colors"
              >
                7. Sadar Bazar Map & Guide
              </button>
            </div>
          </div>

          {/* Contact & Hours */}
          <div className="md:col-span-4 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#FDE8D7]">
              {lang === 'en' ? 'Counter & Hours' : 'संपर्क व वेळ'}
            </div>
            <a
              href={`tel:${CAFE_INFO.phone}`}
              className="font-bold text-[#FBF6EE] hover:text-[#D37432] text-sm tabular-nums block"
            >
              {CAFE_INFO.phone}
            </a>
            <p className="text-[#A39082]">
              {CAFE_INFO.address}
            </p>
            <p className="text-[11px] text-[#7E6A5B]">
              {CAFE_INFO.landmark} · Plus Code: {CAFE_INFO.plusCode}
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('location')}
                className="text-[#D37432] hover:underline text-[11px] font-bold"
              >
                {lang === 'en' ? 'View Landmark Directions →' : 'पत्ता व मार्गदर्शक पहा →'}
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#7E6A5B]">
          <div>
            © {new Date().getFullYear()} Satara Cafe (सातारा कॅफे). Proudly serving Sadar Bazar, Satara.
          </div>
          <div className="text-[11px] text-[#A39082] flex items-center gap-2">
            <span>Pure Vegetarian</span>
            <span>•</span>
            <span>Dine-in & Takeaway</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
