import React from 'react';
import { CAFE_INFO } from '../data/cafeData';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
}

export const Hero: React.FC<HeroProps> = ({ lang }) => {
  return (
    <section id="atmosphere" className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden border-b border-[#e8dfd1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Top quiet line: location & local coordinates (Clean text, no pill badges) */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#735e52] mb-6">
          <span className="font-semibold text-[#9c3418]">Sadar Bazar, Satara</span>
          <span aria-hidden="true" className="text-[#c4b59f]">/</span>
          <span>Near Sainik Bank & Police Staff Quarters</span>
          <span aria-hidden="true" className="text-[#c4b59f]">/</span>
          <span>Open 7:30 AM – 10:30 PM Daily</span>
          <span aria-hidden="true" className="text-[#c4b59f]">/</span>
          <span className="font-medium text-[#241a15]">3.9 ★ (212 Google reviews)</span>
        </div>

        {/* Asymmetrical Editorial Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Big Editorial Typography & Honest Local Friend Copy */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-block text-[11px] uppercase tracking-widest font-bold text-[#9c3418]">
              {lang === 'en' ? 'A Local Satara Gathering' : 'साताराकरांचा हक्काचा कट्टा'}
            </div>

            <h1 className="font-editorial text-4xl sm:text-6xl text-[#241a15] font-bold leading-[1.08] tracking-tight text-balance">
              {lang === 'en' ? (
                <>
                  Crisp banana leaf dosas, hot wada pav, and <span className="italic font-normal text-[#9c3418]">unhurried conversations.</span>
                </>
              ) : (
                <>
                  केळीच्या पानावरील कुरकुरीत डोसा, अस्सल वडापाव आणि <span className="text-[#9c3418]">निवांत गप्पा.</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-[#524137] leading-relaxed max-w-xl">
              {lang === 'en' ? (
                <>
                  Tucked away in Sadar Bazar near Sainik Bank, we keep things simple: we roast our dosas crisp on fresh banana leaves, grind fresh coconut chutney twice a day, and fry our batata wadas hot with fiery garlic-peanut thecha. Pull up a wooden chair, order a cutting chai or a thick cold coffee, and stay as long as you like.
                </>
              ) : (
                <>
                  सदर बझारमध्ये सैनिक बँकेजवळ आमचा हा साधासुधा कट्टा. केळीच्या पानावर भाजलेला गरम डोसा, ताज्या नारळाची भरपूर चटणी आणि झणझणीत गावरान लसूण ठेचा लावलेला अस्सल वडापाव. या, बसा, वाफाळलेला कडक चहा प्या आणि मस्त गप्पा मारा!
                </>
              )}
            </p>

            {/* Direct Human Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#menu"
                className="px-6 py-3.5 text-xs uppercase tracking-wider font-bold bg-[#9c3418] hover:bg-[#802810] text-[#fcf8f2] rounded transition-colors shadow-sm"
              >
                {lang === 'en' ? 'Read the Menu' : 'मेनू कार्ड पहा'}
              </a>

              <a
                href={`https://wa.me/${CAFE_INFO.phoneRaw}?text=${encodeURIComponent(
                  'Hello Satara Cafe, I would like to order takeaway from Sadar Bazar.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 text-xs uppercase tracking-wider font-bold border border-[#241a15] hover:bg-[#241a15] text-[#241a15] hover:text-[#fcf8f2] rounded transition-colors"
              >
                {lang === 'en' ? 'WhatsApp Order' : 'व्हॉट्सअ‍ॅपवर ऑर्डर'}
              </a>

              <a
                href={`tel:${CAFE_INFO.phone}`}
                className="text-xs font-semibold text-[#735e52] hover:text-[#9c3418] transition-colors tabular-nums ml-1"
              >
                {CAFE_INFO.phone}
              </a>
            </div>

            {/* Handwritten style chalk note from the kitchen */}
            <div className="p-4 rounded-lg bg-[#f4ecdf] border-l-2 border-[#9c3418] text-xs text-[#524137] leading-relaxed max-w-lg mt-4">
              <span className="font-bold text-[#241a15] block mb-0.5">
                {lang === 'en' ? 'A small note from our counter:' : 'कट्ट्यावरील एक छोटीशी नोंद:'}
              </span>
              {lang === 'en' ? (
                <>
                  "Chutney and hot sambar are served generously. If you need an extra bowl or want your sandwich grilled extra crisp, just tell us—it is always on the house."
                </>
              ) : (
                <>
                  "खोबऱ्याची चटणी आणि गरमागरम सांबार मनसोक्त दिले जाते. अजून वाटी हवी असल्यास हक्काने सांगा, ते मोफतच आहे."
                </>
              )}
            </div>

          </div>

          {/* Right Column: Layered Tactile Photography (No stock photos, textured food & ambience) */}
          <div className="lg:col-span-5 relative">
            
            {/* Primary Main Image: Crispy Masala Dosa on Banana Leaf */}
            <div className="relative rounded-lg overflow-hidden border border-[#dcd1be] shadow-lg bg-[#e8dfd1] aspect-4/3 z-10">
              <img
                src="/src/assets/images/hero_masala_dosa_breakfast_1791645028775.jpg"
                alt="Satara Cafe Crispy Masala Dosa on Banana Leaf with Chutney and Sambar"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-3 text-[11px] text-[#fcf8f2] bg-[#241a15]/80 px-2 py-0.5 rounded backdrop-blur-xs">
                {lang === 'en' ? 'Masala Dosa on banana leaf · ₹85' : 'केळीच्या पानावरील मसाला डोसा · ₹८५'}
              </div>
            </div>

            {/* Overlapping Secondary Image: Real Wada Pav & Cutting Chai */}
            <div className="hidden sm:block absolute -bottom-10 -left-10 w-44 sm:w-52 rounded-lg overflow-hidden border-2 border-[#fcf8f2] shadow-xl z-20 aspect-square">
              <img
                src="/src/assets/images/satara_wada_pav_chai_1791645048207.jpg"
                alt="Hot Satara Batata Wada Pav with Thecha and Cutting Chai"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 left-1.5 text-[10px] text-[#fcf8f2] bg-[#9c3418]/90 px-1.5 py-0.5 rounded">
                {lang === 'en' ? 'Wada Pav & Chai' : 'वडापाव व चहा'}
              </div>
            </div>

            {/* Overlapping Stamp: Local Town Verification */}
            <div className="hidden md:flex flex-col items-center justify-center absolute -top-4 -right-4 w-24 h-24 rounded-full bg-[#f4ecdf] border border-[#dcd1be] shadow text-center p-2 z-20 rotate-6">
              <span className="font-editorial text-sm font-bold text-[#9c3418]">₹1–200</span>
              <span className="text-[9px] uppercase tracking-wider text-[#524137]">Sadar Bazar</span>
              <span className="text-[8px] text-[#735e52]">Satara</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
