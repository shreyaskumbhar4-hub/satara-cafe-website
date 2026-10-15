import React, { useState, useEffect } from 'react';
import { CAFE_INFO } from '../../data/cafeData';
import { ActivePage, Language, MenuItem } from '../../types';
import { cafeSound } from '../../utils/cafeAmbienceSound';

interface HomePageProps {
  lang: Language;
  onNavigate: (page: ActivePage) => void;
  onAddItem: (item: MenuItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  lang,
  onNavigate,
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentTimeStr, setCurrentTimeStr] = useState('');
  const [rushState, setRushState] = useState<{ labelEn: string; labelMr: string; descEn: string }>({
    labelEn: 'Open Now',
    labelMr: 'सुरू आहे',
    descEn: 'Fresh dosas & hot chai at the counter',
  });

  useEffect(() => {
    const updateTimeAndRush = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      setCurrentTimeStr(`${formattedHours}:${minutes} ${ampm}`);

      if (hours >= 7 && hours < 11) {
        setRushState({
          labelEn: 'Morning Breakfast Peak',
          labelMr: 'सकाळचा नाश्ता गर्दी',
          descEn: 'Hot banana leaf dosas & filter coffee flowing',
        });
      } else if (hours >= 11 && hours < 16) {
        setRushState({
          labelEn: 'Cozy Afternoon Katta',
          labelMr: 'दुपारचा निवांत कट्टा',
          descEn: 'Roasted thalipeeth with white butter & parathas',
        });
      } else if (hours >= 16 && hours < 21) {
        setRushState({
          labelEn: 'Evening Youth & Snacks Rush',
          labelMr: 'संध्याकाळचा स्नॅक्स कट्टा',
          descEn: 'Triple-layer grilled sandwiches & thick cold coffee',
        });
      } else {
        setRushState({
          labelEn: 'Late Evening Supper',
          labelMr: 'रात्रीची जेवणे',
          descEn: 'Butter pav bhaji & night walk chai',
        });
      }
    };

    updateTimeAndRush();
    const interval = setInterval(updateTimeAndRush, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = () => {
    const status = cafeSound.toggle();
    setIsAudioPlaying(status);
  };

  return (
    <div className="animate-fade-in bg-[#FBF6EE] relative overflow-hidden">
      
      {/* SECTION 1: Asymmetrical Sweeping Arch Hero (Inspired by Reference Image) */}
      <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 border-b border-[#E7DBCA]">
        
        {/* Subtle Decorative Botanical Flourishes in background */}
        <div className="absolute top-12 left-1/3 opacity-25 pointer-events-none select-none text-[#586B52]">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="absolute top-1/2 left-6 opacity-20 pointer-events-none select-none text-[#758A6F]">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"/>
            <path d="M12 6V12L16 14"/>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          
          {/* Top Quiet Coordinates & Audio Mood Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#5F4B3C] mb-8 pb-3 border-b border-[#E7DBCA]">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-bold text-[#D37432]">Sadar Bazar, Satara</span>
              <span aria-hidden="true" className="text-[#C4B59F]">/</span>
              <span>Near Sainik Bank & Police Staff Quarters</span>
              <span aria-hidden="true" className="text-[#C4B59F]">/</span>
              <span className="font-semibold text-[#241810]">3.9 ★ (212 reviews) · ₹1–200</span>
            </div>

            {/* Audio Ambiance Synthesizer Pill */}
            <button
              onClick={handleToggleSound}
              type="button"
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold border transition-all ${
                isAudioPlaying
                  ? 'bg-[#D37432] text-white border-[#B2581A] shadow-xs'
                  : 'bg-[#F3E9D7] text-[#5F4B3C] border-[#DECEB7] hover:bg-[#EBE0CC]'
              }`}
              title="Click to hear gentle cafe background atmosphere"
            >
              <span>{isAudioPlaying ? '🔊' : '🔈'}</span>
              <span>
                {isAudioPlaying
                  ? (lang === 'en' ? 'Cafe Murmur Playing' : 'कट्टा आवाज सुरू')
                  : (lang === 'en' ? 'Listen to Cafe Murmur' : 'कट्ट्याचा आवाज ऐका')}
              </span>
              {isAudioPlaying && (
                <span className="flex gap-0.5 items-end h-3 ml-0.5">
                  <span className="w-0.5 h-2 bg-white animate-pulse" />
                  <span className="w-0.5 h-3 bg-white animate-bounce" />
                  <span className="w-0.5 h-1.5 bg-white animate-pulse" />
                </span>
              )}
            </button>
          </div>

          {/* Asymmetrical Split: Editorial Left & Sweeping Sage Green Arch Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Flowing Title & Terracotta CTAs */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#758A6F] font-bold">
                <span>✦</span>
                <span>{lang === 'en' ? 'Authentic Satara Katta' : 'अस्सल सातारी कट्टा'}</span>
                <span>·</span>
                <span className="font-mono text-[11px] tabular-nums text-[#8D7663]">{currentTimeStr}</span>
              </div>

              <h1 className="font-editorial text-4xl sm:text-6xl text-[#241810] font-bold leading-[1.06] tracking-tight text-balance">
                {lang === 'en' ? (
                  <>
                    Golden Banana Leaf Dosas, Hot Wada Pav & <span className="text-[#D37432] italic font-normal">Unhurried Katta.</span>
                  </>
                ) : (
                  <>
                    केळीच्या पानावरील कुरकुरीत डोसा आणि <span className="text-[#D37432]">अस्सल सातारी कट्टा.</span>
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base text-[#5F4B3C] leading-relaxed max-w-xl">
                {lang === 'en' ? (
                  <>
                    Tucked away in Sadar Bazar near Sainik Bank, we roast our dosas crisp on fresh banana leaves, grind fresh coconut chutney twice a day, and fry hot batata wadas with spicy garlic-peanut thecha. Pull up a wooden chair, order a cutting chai, and stay as long as you like.
                  </>
                ) : (
                  <>
                    सदर बझारमध्ये सैनिक बँकेजवळ आमचा हा हक्काचा कट्टा. केळीच्या पानावर भाजलेला गरम डोसा, ताज्या नारळाची भरपूर चटणी आणि झणझणीत गावरान लसूण ठेचा लावलेला अस्सल वडापाव. या, बसा आणि गप्पा मारा!
                  </>
                )}
              </p>

              {/* Live Town Rush Indicator Card in Soft Sage/Cream */}
              <div className="p-4 rounded-2xl bg-[#E1EADA] border border-[#C5D4C1] flex items-center justify-between gap-4 text-xs">
                <div>
                  <div className="font-bold text-[#241810] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#586B52]" />
                    <span>{lang === 'en' ? rushState.labelEn : rushState.labelMr}</span>
                  </div>
                  <div className="text-[11px] text-[#4A5D44] mt-0.5">
                    {rushState.descEn}
                  </div>
                </div>
                <div className="text-right text-[11px] font-mono text-[#586B52] shrink-0 font-bold">
                  Open till 10:30 PM
                </div>
              </div>

              {/* Direct Terracotta Pill Actions (Mirroring Reference Mockup) */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('menu')}
                  type="button"
                  className="px-7 py-3.5 text-xs uppercase tracking-wider font-bold bg-[#D37432] hover:bg-[#B2581A] text-white rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                >
                  {lang === 'en' ? 'Order Now · The Menu' : 'मेनू व कॉम्बो पहा'}
                </button>

                <button
                  onClick={() => onNavigate('order-slip')}
                  type="button"
                  className="px-6 py-3.5 text-xs uppercase tracking-wider font-bold border-2 border-[#241810] hover:bg-[#241810] text-[#241810] hover:text-[#FBF6EE] rounded-full transition-all"
                >
                  {lang === 'en' ? 'Table Slip' : 'ऑर्डर पावती'}
                </button>

                <button
                  onClick={() => onNavigate('table-booking')}
                  type="button"
                  className="text-xs font-bold text-[#758A6F] hover:text-[#D37432] transition-colors"
                >
                  {lang === 'en' ? 'Reserve Katta Table →' : 'टेबल बुक करा →'}
                </button>
              </div>

            </div>

            {/* Right Column: Sweeping Sage Green Arch & Floating Dish Pods */}
            <div className="lg:col-span-6 relative flex justify-center items-center">
              
              {/* Grand Sweeping Sage Green Curved Arch Backdrop (Exact style of uploaded image) */}
              <div className="w-[320px] sm:w-[420px] h-[360px] sm:h-[460px] bg-[#758A6F] rounded-t-full rounded-bl-[100px] rounded-br-[60px] absolute -right-4 -top-6 shadow-xl z-0 transform rotate-2 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-b from-[#8B9E85]/50 to-transparent" />
              </div>

              {/* Primary Dish: Capsule Oval Container with Steaming Dosa */}
              <div className="relative z-10 w-[290px] sm:w-[380px] h-[330px] sm:h-[420px] rounded-[100px] overflow-hidden border-4 border-[#FFFDF9] shadow-2xl bg-[#241810]">
                <img
                  src="/src/assets/images/hero_masala_dosa_breakfast_1791645028775.jpg"
                  alt="Satara Cafe Crispy Masala Dosa on Banana Leaf with Sambar"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Tag inside the Pod */}
                <div className="absolute bottom-4 left-6 right-6 bg-[#241810]/85 backdrop-blur-xs text-white p-3 rounded-2xl border border-white/20 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#FDE8D7] block">Signature Favorite</span>
                    <strong className="text-sm">Banana Leaf Masala Dosa</strong>
                  </div>
                  <span className="font-mono text-base font-bold text-[#FDE8D7]">₹85</span>
                </div>
              </div>

              {/* Floating Circular Dish Badge 1: Wada Pav & Cutting Chai */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 w-28 sm:w-36 h-28 sm:h-36 rounded-full overflow-hidden border-4 border-[#FFFDF9] shadow-xl z-20 bg-[#FBF6EE]">
                <img
                  src="/src/assets/images/satara_wada_pav_chai_1791645048207.jpg"
                  alt="Batata Wada Pav and Cutting Chai"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Circular Dish Badge 2: Filter Coffee in Stainless Steel Dabarah */}
              <div className="hidden sm:block absolute -top-4 -left-2 w-24 h-24 rounded-full overflow-hidden border-4 border-[#FFFDF9] shadow-lg z-20 bg-[#FBF6EE]">
                <img
                  src="/src/assets/images/filter_coffee_dabarah_1791895662728.jpg"
                  alt="Filter Coffee in Stainless Steel Dabarah Tumbler"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Terracotta Badge Pill */}
              <div className="absolute top-8 right-0 sm:-right-4 z-20 bg-[#D37432] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md -rotate-6">
                ₹1–200 Avg.
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 2: Popular Specialties in Rounded Pod Cards (Mirroring Reference Image Layout) */}
      <section className="py-16 md:py-20 bg-[#FBF6EE] border-b border-[#E7DBCA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* Section Heading with subtle floral curl */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#758A6F] uppercase tracking-widest block mb-1">
              Popular Delicacies
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#241810]">
              {lang === 'en' ? 'Katta Signatures' : 'कट्ट्यावरील खास चव'}
            </h2>
            <div className="flex justify-center my-2 text-[#758A6F]">
              <span>❧ ✦ ☙</span>
            </div>
            <p className="text-xs sm:text-sm text-[#5F4B3C]">
              Prepared fresh to order on iron tawas and cast pots in central Sadar Bazar.
            </p>
          </div>

          {/* Cards Grid: Soft Sage Green & Warm Ivory Rounded Pods (Like Uploaded Image) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Soft Sage Card */}
            <div className="bg-[#DCE6D8] border border-[#C5D4C1] rounded-[28px] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                {/* Floating Plate Pod with Circular Image */}
                <div className="w-36 h-36 mx-auto rounded-full overflow-hidden border-4 border-[#FFFDF9] shadow-md bg-white mb-4 group-hover:scale-105 transition-transform duration-500">
                  <img
                    src="/src/assets/images/veg_cheese_grilled_sandwich_1791645066007.jpg"
                    alt="Veg Cheese Grilled Sandwich"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#586B52] bg-[#FFFDF9] px-2.5 py-0.5 rounded-full">
                    3-Layer Grill
                  </span>
                  <div className="text-xs text-[#D37432] font-bold">★★★★★</div>
                </div>

                <h3 className="font-editorial text-xl font-bold text-[#241810]">
                  Veg Cheese Sandwich
                </h3>
                <p className="text-xs text-[#4A5D44] mt-1 leading-relaxed">
                  Packed with spiced potato, beetroot, tomatoes, and thick melting Amul cheese.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#C5D4C1] flex items-center justify-between">
                <span className="font-mono text-lg font-bold text-[#241810]">₹110</span>
                <button
                  onClick={() => onNavigate('menu')}
                  className="px-4 py-2 bg-[#D37432] hover:bg-[#B2581A] text-white text-xs font-bold rounded-full transition-colors"
                >
                  + Add to Slip
                </button>
              </div>
            </div>

            {/* Card 2: Warm Ivory Card */}
            <div className="bg-[#FFFDF9] border border-[#E7DBCA] rounded-[28px] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-36 h-36 mx-auto rounded-full overflow-hidden border-4 border-[#FBF6EE] shadow-md bg-[#FBF6EE] mb-4 group-hover:scale-105 transition-transform duration-500">
                  <img
                    src="/src/assets/images/maharashtrian_thalipeeth_1791645078927.jpg"
                    alt="Maharashtrian Thalipeeth with Loni"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D37432] bg-[#FDE8D7] px-2.5 py-0.5 rounded-full">
                    Local Heritage
                  </span>
                  <div className="text-xs text-[#D37432] font-bold">★★★★★</div>
                </div>

                <h3 className="font-editorial text-xl font-bold text-[#241810]">
                  Bhajani Thalipeeth
                </h3>
                <p className="text-xs text-[#5F4B3C] mt-1 leading-relaxed">
                  Roasted multi-grain flatbread hand-patted and served with fresh homemade white loni butter.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#E7DBCA] flex items-center justify-between">
                <span className="font-mono text-lg font-bold text-[#241810]">₹85</span>
                <button
                  onClick={() => onNavigate('menu')}
                  className="px-4 py-2 bg-[#D37432] hover:bg-[#B2581A] text-white text-xs font-bold rounded-full transition-colors"
                >
                  + Add to Slip
                </button>
              </div>
            </div>

            {/* Card 3: Soft Sage Card */}
            <div className="bg-[#DCE6D8] border border-[#C5D4C1] rounded-[28px] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
              <div>
                <div className="w-36 h-36 mx-auto rounded-full overflow-hidden border-4 border-[#FFFDF9] shadow-md bg-white mb-4 group-hover:scale-105 transition-transform duration-500">
                  <img
                    src="/src/assets/images/satara_wada_pav_chai_1791645048207.jpg"
                    alt="Satara Batata Wada Pav"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#586B52] bg-[#FFFDF9] px-2.5 py-0.5 rounded-full">
                    Street Katta
                  </span>
                  <div className="text-xs text-[#D37432] font-bold">★★★★★</div>
                </div>

                <h3 className="font-editorial text-xl font-bold text-[#241810]">
                  Satara Wada Pav & Chai
                </h3>
                <p className="text-xs text-[#4A5D44] mt-1 leading-relaxed">
                  Hot batata wada with coarse garlic-peanut thecha and a glass of steaming adrak cutting chai.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#C5D4C1] flex items-center justify-between">
                <span className="font-mono text-lg font-bold text-[#241810]">₹25 / ₹18</span>
                <button
                  onClick={() => onNavigate('menu')}
                  className="px-4 py-2 bg-[#D37432] hover:bg-[#B2581A] text-white text-xs font-bold rounded-full transition-colors"
                >
                  + Add to Slip
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: Blackboard Special & Quick 7-Page Jump Hub */}
      <section className="py-16 bg-[#F3E9D7] border-b border-[#E7DBCA]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* Daily Blackboard Special with Terracotta Accents */}
          <div className="bg-[#241810] border-4 border-[#3D2B1E] rounded-3xl p-6 sm:p-8 text-[#FBF6EE] mb-12 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#3D2B1E] gap-2 mb-4">
              <span className="font-editorial text-sm font-bold text-[#FDE8D7] tracking-wider uppercase">
                {lang === 'en' ? "Today's Chalkboard Recommendation" : 'आजचा कट्टा स्पेशल'}
              </span>
              <span className="text-[11px] font-mono text-[#A39082]">
                Fresh from the Cast Tawa
              </span>
            </div>

            <h3 className="font-editorial text-2xl font-bold text-white mb-2">
              {lang === 'en' ? 'Mysore Masala Dosa + Special Cutting Chai' : 'म्हैसूर मसाला डोसा + स्पेशल आले चहा'}
            </h3>

            <p className="text-xs sm:text-sm text-[#DCD1BE] leading-relaxed mb-4 max-w-2xl">
              {lang === 'en'
                ? 'Crisp golden roast smeared with red garlic-chili paste, loaded potato bhaji, extra complimentary bowl of fresh coconut chutney, and a steaming glass of ginger tea.'
                : 'लाल लसूण चटणी लावून भाजलेला कुरकुरीत डोसा, बटाटा भाजी, नारळाची ताजी चटणी आणि वाफाळलेला आल्याचा कटींग चहा.'}
            </p>

            <div className="flex items-baseline justify-between pt-3 border-t border-[#3D2B1E]">
              <div className="font-mono text-lg font-bold text-[#D37432] tabular-nums">
                Special Combo: ₹105 <span className="text-xs text-[#8C786A] line-through ml-2">₹113</span>
              </div>
              <button
                onClick={() => onNavigate('menu')}
                type="button"
                className="px-5 py-2 bg-[#D37432] hover:bg-[#B2581A] text-white text-xs font-bold rounded-full transition-colors shadow-xs"
              >
                {lang === 'en' ? 'Order in Menu' : 'मेनूमध्ये जोडा'}
              </button>
            </div>
          </div>

          {/* Quick Page Jump Grid with Rounded Pods */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <button
              onClick={() => onNavigate('menu')}
              className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#DECEB7] text-left hover:border-[#D37432] hover:shadow-sm transition-all group"
            >
              <span className="text-[10px] font-bold text-[#758A6F] uppercase">Page 2</span>
              <h4 className="font-editorial text-base font-bold text-[#241810] group-hover:text-[#D37432] mt-0.5">
                Artisanal Menu
              </h4>
              <p className="text-xs text-[#5F4B3C] mt-1 line-clamp-2">
                18+ delicacies with interactive Katta Combo Maker and customizer.
              </p>
            </button>

            <button
              onClick={() => onNavigate('story-craft')}
              className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#DECEB7] text-left hover:border-[#D37432] hover:shadow-sm transition-all group"
            >
              <span className="text-[10px] font-bold text-[#758A6F] uppercase">Page 4</span>
              <h4 className="font-editorial text-base font-bold text-[#241810] group-hover:text-[#D37432] mt-0.5">
                Spice Box & Craft
              </h4>
              <p className="text-xs text-[#5F4B3C] mt-1 line-clamp-2">
                Interactive traditional masala daba and kitchen rituals.
              </p>
            </button>

            <button
              onClick={() => onNavigate('reviews')}
              className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#DECEB7] text-left hover:border-[#D37432] hover:shadow-sm transition-all group"
            >
              <span className="text-[10px] font-bold text-[#758A6F] uppercase">Page 5</span>
              <h4 className="font-editorial text-base font-bold text-[#241810] group-hover:text-[#D37432] mt-0.5">
                Pinned Guest Chits
              </h4>
              <p className="text-xs text-[#5F4B3C] mt-1 line-clamp-2">
                212 Google reviews, verified words, and pin your own note.
              </p>
            </button>

            <button
              onClick={() => onNavigate('table-booking')}
              className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#DECEB7] text-left hover:border-[#D37432] hover:shadow-sm transition-all group"
            >
              <span className="text-[10px] font-bold text-[#758A6F] uppercase">Page 6</span>
              <h4 className="font-editorial text-base font-bold text-[#241810] group-hover:text-[#D37432] mt-0.5">
                Table Booking
              </h4>
              <p className="text-xs text-[#5F4B3C] mt-1 line-clamp-2">
                Reserve space for morning breakfast cycling rides or evening catchups.
              </p>
            </button>

          </div>

        </div>
      </section>

    </div>
  );
};
