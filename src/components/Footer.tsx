import React from 'react';
import { CAFE_INFO } from '../data/cafeData';
import { ActivePage, Language } from '../types';

interface FooterProps {
  lang: Language;
  onNavigate: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  return (
    <footer className="bg-[#1c1410] text-[#a8988b] border-t border-[#2e221b] text-xs py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10 pb-10 border-b border-[#2e221b]">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-baseline gap-2.5 text-left"
            >
              <span className="font-editorial text-2xl font-bold text-[#fcf8f2] tracking-tight">
                Satara Cafe
              </span>
              <span className="font-marathi-brand text-[#c88937] text-base">
                सातारा कॅफे
              </span>
            </button>
            <p className="text-[#8c7a6e] max-w-sm leading-relaxed text-xs sm:text-sm">
              {lang === 'en'
                ? 'A warm neighborhood katta in Sadar Bazar. Hot banana leaf dosas, spicy wada pav, multigrain thalipeeth, and fresh filter coffee. Open daily 7:30 AM to 10:30 PM.'
                : 'सदर बझारमधील आपला हक्काचा कट्टा. गरमागरम डोसा, वडापाव, भाजणीचे थालीपीठ आणि सुगंधी कॉफी. रोज सकाळी ७:३० ते रात्री १०:३० सुरू.'}
            </p>
          </div>

          {/* Quick Page Links */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#dcd1be]">
              Pages & Sections
            </div>
            <div className="flex flex-col space-y-1.5 text-xs text-[#a39082]">
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
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#dcd1be]">
              {lang === 'en' ? 'Counter & Hours' : 'संपर्क व वेळ'}
            </div>
            <a
              href={`tel:${CAFE_INFO.phone}`}
              className="font-bold text-[#fcf8f2] hover:text-[#c88937] text-sm tabular-nums block"
            >
              {CAFE_INFO.phone}
            </a>
            <p className="text-[#8c7a6e]">
              {CAFE_INFO.address}
            </p>
            <p className="text-[11px] text-[#705f54]">
              {CAFE_INFO.landmark} · Plus Code: {CAFE_INFO.plusCode}
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('location')}
                className="text-[#c88937] hover:underline text-[11px]"
              >
                {lang === 'en' ? 'View Landmark Directions →' : 'पत्ता व मार्गदर्शक पहा →'}
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#705f54]">
          <div>
            © {new Date().getFullYear()} Satara Cafe (सातारा कॅफे). Proudly serving Sadar Bazar, Satara.
          </div>
          <div className="text-[11px] text-[#8c7a6e]">
            Pure Vegetarian · Dine-in · Roadside Takeaway
          </div>
        </div>

      </div>
    </footer>
  );
};
