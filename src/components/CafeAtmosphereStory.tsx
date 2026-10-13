import React from 'react';
import { Language } from '../types';

interface CafeAtmosphereStoryProps {
  lang: Language;
}

export const CafeAtmosphereStory: React.FC<CafeAtmosphereStoryProps> = ({ lang }) => {
  return (
    <section id="story" className="py-20 md:py-28 bg-[#241a15] text-[#fcf8f2] border-b border-[#3d2e25]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Powerful Editorial Philosophy Anchor */}
        <div className="max-w-3xl mb-14">
          <div className="text-[11px] uppercase tracking-widest font-bold text-[#c88937] mb-3">
            {lang === 'en' ? 'Our Counter Philosophy' : 'कट्ट्याची रीत'}
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl lg:text-5xl font-bold leading-tight text-[#fcf8f2] text-balance">
            {lang === 'en' ? (
              <>
                "We don't count spoons of chutney or rush your table. When the sambar is hot and the dosa is crisp, <span className="italic font-normal text-[#c88937]">the conversation takes care of itself.</span>"
              </>
            ) : (
              <>
                "सांबार वाफाळलेले आणि डोसा कुरकुरीत असेल, तर <span className="text-[#c88937]">गप्पा आपोआप रंगतात.</span>"
              </>
            )}
          </h2>
        </div>

        {/* Editorial Split: Striking Atmosphere Photo + Real Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Striking Ambience Photo */}
          <div className="lg:col-span-7">
            <div className="rounded-lg overflow-hidden border border-[#3d2e25] bg-[#1a130f] shadow-2xl relative aspect-16/10">
              <img
                src="/src/assets/images/satara_cafe_ambience_1791645090606.jpg"
                alt="Inside Satara Cafe in Sadar Bazar with warm pendant lights and wooden tables"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140e0b]/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 text-xs text-[#dcd1be] flex justify-between items-end">
                <span>Sadar Bazar, Satara · The evening corner</span>
                <span className="text-[11px] text-[#c88937]">Since morning 7:30 AM</span>
              </div>
            </div>
          </div>

          {/* Genuine Local Text (Zero AI corporate buzzwords) */}
          <div className="lg:col-span-5 space-y-6 text-[#dcd1be] text-sm sm:text-base leading-relaxed">
            <p>
              {lang === 'en' ? (
                <>
                  Every morning at 7:30 AM starts with the aroma of roasted mustard seeds, curry leaves, and boiling chicory coffee. In a quiet pocket of Sadar Bazar, steps away from Sainik Bank, we set out freshly cut banana leaves for the day’s dosas.
                </>
              ) : (
                <>
                  सकाळी साडेसात वाजता मोहरीची खमंग फोडणी, कढीपत्ता आणि सुगंधी कॉफीच्या वासाने आमच्या कट्ट्याची सुरुवात होते. सैनिक बँकेजवळच्या या शांत गल्लीत केळीची पाने कापून दिवसाच्या नाश्त्याची तयारी सुरू होते.
                </>
              )}
            </p>

            <p>
              {lang === 'en' ? (
                <>
                  By afternoon, the wooden tables fill with locals craving freshly patted multigrain thalipeeth topped with a melting scoop of homemade white butter, or a hot batata wada with red thecha. In the evening, college friends gather over three-layer cheese grilled sandwiches, spicy pasta, and glasses of thick cold coffee.
                </>
              ) : (
                <>
                  दुपारी पांढऱ्या लोण्यासोबत गरमागरम भाजणीचे थालीपीठ आणि वडापाव, तर संध्याकाळी मित्रांचा घोळका चीज सँडविच आणि थिक कोल्ड कॉफीसाठी जमतो.
                </>
              )}
            </p>

            <div className="pt-2 border-t border-[#3d2e25] flex items-center justify-between text-xs text-[#a39082]">
              <span>Pure Vegetarian Kitchen</span>
              <span>Dine-in · Takeaway Parcels</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
