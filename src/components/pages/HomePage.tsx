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
    <div className="animate-fade-in">
      
      {/* SECTION 1: Editorial Atmosphere Hero */}
      <section className="relative pt-8 pb-16 md:pt-14 md:pb-22 border-b border-[#e8dfd1] overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          {/* Top Status & Live Town Coordinates */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#735e52] mb-6 pb-3 border-b border-[#f0e6d8]">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-semibold text-[#9c3418]">Sadar Bazar, Satara</span>
              <span aria-hidden="true" className="text-[#c4b59f]">/</span>
              <span>Near Sainik Bank & Police Staff Quarters</span>
              <span aria-hidden="true" className="text-[#c4b59f]">/</span>
              <span className="text-[#241a15] font-medium">3.9 ★ (212 reviews) · ₹1–200</span>
            </div>

            {/* Audio Ambiance Synthesizer Button */}
            <button
              onClick={handleToggleSound}
              type="button"
              className={`flex items-center gap-2 px-3 py-1 rounded text-[11px] font-semibold border transition-colors ${
                isAudioPlaying
                  ? 'bg-[#9c3418] text-[#fcf8f2] border-[#802810]'
                  : 'bg-[#f4ecdf] text-[#5c4a40] border-[#dcd1be] hover:text-[#241a15]'
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
                <span className="flex gap-0.5 items-end h-3">
                  <span className="w-0.5 h-2 bg-[#fcf8f2] animate-pulse" />
                  <span className="w-0.5 h-3 bg-[#fcf8f2] animate-bounce" />
                  <span className="w-0.5 h-1.5 bg-[#fcf8f2] animate-pulse" />
                </span>
              )}
            </button>
          </div>

          {/* Asymmetrical Editorial Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Expressive Typography */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex items-center gap-3">
                <span className="text-[11px] uppercase tracking-widest font-bold text-[#9c3418]">
                  {lang === 'en' ? 'A Local Gathering in Sadar Bazar' : 'साताराकरांचा हक्काचा कट्टा'}
                </span>
                <span className="text-[11px] text-[#8c786a] font-mono tabular-nums">
                  {currentTimeStr} in Satara
                </span>
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
                    Tucked away in Sadar Bazar near Sainik Bank, we keep things simple: we fold our dosas crisp on fresh banana leaves, grind fresh coconut chutney twice a day, and fry our batata wadas hot with fiery garlic-peanut thecha. Pull up a wooden chair, order a cutting chai or a thick cold coffee, and stay as long as you like.
                  </>
                ) : (
                  <>
                    सदर बझारमध्ये सैनिक बँकेजवळ आमचा हा साधासुधा कट्टा. केळीच्या पानावर भाजलेला गरम डोसा, ताज्या नारळाची भरपूर चटणी आणि झणझणीत गावरान लसूण ठेचा लावलेला अस्सल वडापाव. या, बसा, वाफाळलेला कडक चहा प्या आणि मस्त गप्पा मारा!
                  </>
                )}
              </p>

              {/* Live Town Rush Indicator Card */}
              <div className="p-3.5 rounded-lg bg-[#f4ecdf] border border-[#e2d6c3] flex items-center justify-between gap-4 text-xs">
                <div>
                  <div className="font-bold text-[#241a15] flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2e6930]" />
                    <span>{lang === 'en' ? rushState.labelEn : rushState.labelMr}</span>
                  </div>
                  <div className="text-[11px] text-[#735e52] mt-0.5">
                    {rushState.descEn}
                  </div>
                </div>
                <div className="text-right text-[11px] text-[#8c786a] font-mono shrink-0">
                  Open until 10:30 PM
                </div>
              </div>

              {/* Direct Multi-Page Shortcuts */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  onClick={() => onNavigate('menu')}
                  type="button"
                  className="px-6 py-3.5 text-xs uppercase tracking-wider font-bold bg-[#9c3418] hover:bg-[#802810] text-[#fcf8f2] rounded transition-colors shadow-sm"
                >
                  {lang === 'en' ? 'Open Menu & Combos' : 'मेनू व कॉम्बो पहा'}
                </button>

                <button
                  onClick={() => onNavigate('order-slip')}
                  type="button"
                  className="px-5 py-3.5 text-xs uppercase tracking-wider font-bold border border-[#241a15] hover:bg-[#241a15] text-[#241a15] hover:text-[#fcf8f2] rounded transition-colors"
                >
                  {lang === 'en' ? 'View Table Slip' : 'ऑर्डर पावती'}
                </button>

                <button
                  onClick={() => onNavigate('table-booking')}
                  type="button"
                  className="px-4 py-3.5 text-xs font-semibold text-[#735e52] hover:text-[#9c3418] transition-colors"
                >
                  {lang === 'en' ? 'Reserve Katta Table →' : 'टेबल बुक करा →'}
                </button>
              </div>

            </div>

            {/* Right Column: Layered Tactile Photo Montage */}
            <div className="lg:col-span-5 relative">
              
              {/* Primary Image: Crispy Masala Dosa */}
              <div className="relative rounded-lg overflow-hidden border border-[#dcd1be] shadow-lg bg-[#e8dfd1] aspect-4/3 z-10">
                <img
                  src="/src/assets/images/hero_masala_dosa_breakfast_1791645028775.jpg"
                  alt="Satara Cafe Crispy Masala Dosa on Banana Leaf"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-3 text-[11px] text-[#fcf8f2] bg-[#241a15]/85 px-2 py-0.5 rounded backdrop-blur-xs">
                  {lang === 'en' ? 'Banana Leaf Masala Dosa · ₹85' : 'केळीच्या पानावरील मसाला डोसा · ₹८५'}
                </div>
              </div>

              {/* Overlapping Secondary Image: Real Wada Pav & Cutting Chai */}
              <div className="hidden sm:block absolute -bottom-10 -left-8 w-44 sm:w-48 rounded-lg overflow-hidden border-2 border-[#fcf8f2] shadow-xl z-20 aspect-square">
                <img
                  src="/src/assets/images/satara_wada_pav_chai_1791645048207.jpg"
                  alt="Satara Batata Wada Pav with Thecha and Cutting Chai"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 left-1.5 text-[10px] text-[#fcf8f2] bg-[#9c3418]/90 px-1.5 py-0.5 rounded">
                  {lang === 'en' ? 'Wada Pav & Chai' : 'वडापाव व चहा'}
                </div>
              </div>

              {/* Overlapping Tertiary: Frothy Stainless Steel Filter Coffee */}
              <div className="hidden md:block absolute -top-8 -right-6 w-36 rounded-lg overflow-hidden border-2 border-[#fcf8f2] shadow-lg z-20 aspect-4/3">
                <img
                  src="/src/assets/images/filter_coffee_dabarah_1791895662728.jpg"
                  alt="South Indian Filter Coffee in Stainless Steel Dabarah Tumbler"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 left-1.5 text-[9px] text-[#fcf8f2] bg-[#241a15]/90 px-1 py-0.5 rounded">
                  {lang === 'en' ? 'Filter Coffee · ₹35' : 'फिल्टर कॉफी · ₹३५'}
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 2: Daily Chalkboard Special & Chef's Roast */}
      <section className="py-12 bg-[#f4ecdf] border-b border-[#e8dfd1]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* The Blackboard Frame */}
            <div className="md:col-span-7 bg-[#241a15] border-4 border-[#3d2e25] rounded-xl p-6 sm:p-8 shadow-xl text-[#fcf8f2] relative">
              <div className="flex items-center justify-between pb-3 border-b border-[#3d2e25] mb-4">
                <span className="font-editorial text-sm font-bold text-[#c88937] tracking-wider uppercase">
                  {lang === 'en' ? "Today's Chalkboard Recommendation" : 'आजचा कट्टा स्पेशल'}
                </span>
                <span className="text-[10px] font-mono text-[#a39082]">
                  Fresh from the Tawa
                </span>
              </div>

              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-white mb-2">
                {lang === 'en' ? 'Mysore Masala Dosa + Special Cutting Chai' : 'म्हैसूर मसाला डोसा + स्पेशल आले चहा'}
              </h3>

              <p className="text-xs sm:text-sm text-[#dcd1be] leading-relaxed mb-4">
                {lang === 'en'
                  ? 'Crisp golden roast smeared with red garlic-chili paste, loaded potato bhaji, extra complimentary bowl of fresh coconut chutney, and a steaming glass of ginger tea.'
                  : 'लाल लसूण चटणी लावून भाजलेला कुरकुरीत डोसा, बटाटा भाजी, नारळाची ताजी चटणी आणि वाफाळलेला आल्याचा कटींग चहा.'}
              </p>

              <div className="flex items-baseline justify-between pt-2 border-t border-[#3d2e25]">
                <div className="font-mono text-lg font-bold text-[#c88937] tabular-nums">
                  Combo Special: ₹105 <span className="text-xs text-[#8c786a] line-through ml-1">₹113</span>
                </div>
                <button
                  onClick={() => onNavigate('menu')}
                  type="button"
                  className="px-3.5 py-1.5 bg-[#c88937] hover:bg-[#b07425] text-[#241a15] text-xs font-bold rounded transition-colors"
                >
                  {lang === 'en' ? 'Order in Menu' : 'मेनूमध्ये जोडा'}
                </button>
              </div>
            </div>

            {/* Quick 3-Pillar Highlight */}
            <div className="md:col-span-5 space-y-4 text-xs text-[#524137]">
              <div className="p-4 bg-[#fffdfa] rounded-lg border border-[#e2d6c3] shadow-xs">
                <div className="font-bold text-[#241a15] text-sm mb-1">
                  {lang === 'en' ? '1. Free Complimentary Chutney' : '१. मनसोक्त नारळाची चटणी'}
                </div>
                <p>
                  {lang === 'en'
                    ? 'As local guides Tony & Rushikesh noted: we never hesitate to pour an extra bowl of freshly ground coconut chutney and piping hot sambar.'
                    : 'ग्राहकांच्या आग्रहाखातर ताजी खोबऱ्याची चटणी आणि गरमागरम सांबार हसतमुखाने दिले जाते.'}
                </p>
              </div>

              <div className="p-4 bg-[#fffdfa] rounded-lg border border-[#e2d6c3] shadow-xs">
                <div className="font-bold text-[#241a15] text-sm mb-1">
                  {lang === 'en' ? '2. Direct WhatsApp Takeaway' : '२. थेट व्हॉट्सअ‍ॅप पार्सल'}
                </div>
                <p>
                  {lang === 'en'
                    ? 'Call 075586 81179 or send your table slip on WhatsApp. Ready in 7 minutes for roadside pickup in Sadar Bazar.'
                    : '०७५५८६ ८११७९ वर कॉल करा किंवा व्हॉट्सअ‍ॅपवर पावती पाठवा. ५ ते ७ मिनिटांत पार्सल तयार.'}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: Visual Showcase & Direct Links to Other 6 Pages */}
      <section className="py-16 md:py-20 bg-[#fcf8f2] border-b border-[#e8dfd1]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-[11px] uppercase tracking-widest font-bold text-[#9c3418] mb-1">
                {lang === 'en' ? 'Explore the Cafe' : 'सातारा कॅफे विभाग'}
              </div>
              <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-[#241a15]">
                {lang === 'en' ? 'Step Inside Our Sadar Bazar World' : 'सदर बझारच्या कट्ट्याला भेटा'}
              </h2>
            </div>
            <div className="text-xs text-[#735e52]">
              Select a section below to explore recipes, reviews, or book a table:
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Artisanal Menu */}
            <button
              onClick={() => onNavigate('menu')}
              type="button"
              className="text-left bg-[#fffdfa] border border-[#e8dfd1] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="aspect-16/10 overflow-hidden bg-[#e8dfd1]">
                <img
                  src="/src/assets/images/veg_cheese_grilled_sandwich_1791645066007.jpg"
                  alt="Veg Cheese Grilled Sandwich"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <span className="text-[10px] uppercase font-bold text-[#9c3418] tracking-wider">Page 2</span>
                <h3 className="font-editorial text-lg font-bold text-[#241a15] group-hover:text-[#9c3418] transition-colors mt-0.5">
                  {lang === 'en' ? 'Artisanal Menu & Combos' : 'मेनू कार्ड व कॉम्बो मेकर'}
                </h3>
                <p className="text-xs text-[#5c4a40] mt-1 leading-relaxed">
                  {lang === 'en' 
                    ? 'Over 18 delicacies from crisp dosas to wada pav, grilled sandwiches, pasta, and custom meal builder.'
                    : '१८+ अस्सल चविष्ट पदार्थ, कस्टमायझेशन आणि कट्टा कॉम्बो मेकर.'}
                </p>
                <span className="text-xs font-bold text-[#9c3418] mt-3 inline-block">Explore Menu →</span>
              </div>
            </button>

            {/* Card 2: Kitchen Craft & Spices */}
            <button
              onClick={() => onNavigate('story-craft')}
              type="button"
              className="text-left bg-[#fffdfa] border border-[#e8dfd1] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="aspect-16/10 overflow-hidden bg-[#e8dfd1]">
                <img
                  src="/src/assets/images/maharashtrian_thalipeeth_1791645078927.jpg"
                  alt="Maharashtrian Thalipeeth with White Loni"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <span className="text-[10px] uppercase font-bold text-[#9c3418] tracking-wider">Page 4</span>
                <h3 className="font-editorial text-lg font-bold text-[#241a15] group-hover:text-[#9c3418] transition-colors mt-0.5">
                  {lang === 'en' ? 'Kitchen Craft & Spice Box' : 'किचन संस्कृती व मसाल्यांचा डबा'}
                </h3>
                <p className="text-xs text-[#5c4a40] mt-1 leading-relaxed">
                  {lang === 'en'
                    ? 'Discover the stone-mortar garlic thecha, multi-grain roasting secrets, and our brass spice katoris.'
                    : 'खलबत्त्यातील लसूण ठेचा, बहुधान्य भाजणी आणि आमचा पारंपारिक मसाल्यांचा डबा.'}
                </p>
                <span className="text-xs font-bold text-[#9c3418] mt-3 inline-block">See Kitchen Secrets →</span>
              </div>
            </button>

            {/* Card 3: Pinned Cafe Chits */}
            <button
              onClick={() => onNavigate('reviews')}
              type="button"
              className="text-left bg-[#fffdfa] border border-[#e8dfd1] rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="aspect-16/10 overflow-hidden bg-[#e8dfd1]">
                <img
                  src="/src/assets/images/satara_cafe_ambience_1791645090606.jpg"
                  alt="Satara Cafe Ambience"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <span className="text-[10px] uppercase font-bold text-[#9c3418] tracking-wider">Page 5</span>
                <h3 className="font-editorial text-lg font-bold text-[#241a15] group-hover:text-[#9c3418] transition-colors mt-0.5">
                  {lang === 'en' ? 'Pinned Customer Chits' : 'ग्राहकांचे अभिप्राय फलक'}
                </h3>
                <p className="text-xs text-[#5c4a40] mt-1 leading-relaxed">
                  {lang === 'en'
                    ? '212 verified Google reviews. Read authentic words from Tony, Rushikesh, and pin your own note!'
                    : '२१२ गुगल रिव्ह्यूज, स्थानिक नागरिकांचे मनोगत आणि स्वतःची नोंद जोडण्याची सुविधा.'}
                </p>
                <span className="text-xs font-bold text-[#9c3418] mt-3 inline-block">Read Guest Chits →</span>
              </div>
            </button>

            {/* Card 4: Table Booking */}
            <button
              onClick={() => onNavigate('table-booking')}
              type="button"
              className="text-left bg-[#fffdfa] border border-[#e8dfd1] rounded-xl p-5 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-[#9c3418] tracking-wider">Page 6</span>
                <h3 className="font-editorial text-lg font-bold text-[#241a15] group-hover:text-[#9c3418] transition-colors mt-0.5">
                  {lang === 'en' ? 'Katta Gathering & Table Booking' : 'टेबल आरक्षण व कट्टा गप्पा'}
                </h3>
                <p className="text-xs text-[#5c4a40] mt-1 leading-relaxed">
                  {lang === 'en'
                    ? 'Planning a morning breakfast ride or an evening college get-together? Reserve a corner table in advance.'
                    : 'सकाळच्या सायकलिंग नाश्त्यासाठी किंवा संध्याकाळच्या मित्रांच्या कट्ट्यासाठी टेबल बुक करा.'}
                </p>
              </div>
              <span className="text-xs font-bold text-[#9c3418] mt-4">Book Table Slip →</span>
            </button>

            {/* Card 5: Sadar Bazar Map & Tourist Tips */}
            <button
              onClick={() => onNavigate('location')}
              type="button"
              className="text-left bg-[#fffdfa] border border-[#e8dfd1] rounded-xl p-5 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-[#9c3418] tracking-wider">Page 7</span>
                <h3 className="font-editorial text-lg font-bold text-[#241a15] group-hover:text-[#9c3418] transition-colors mt-0.5">
                  {lang === 'en' ? 'Sadar Bazar Map & Satara Guide' : 'पत्ता, मार्ग व सातारा पर्यटन'}
                </h3>
                <p className="text-xs text-[#5c4a40] mt-1 leading-relaxed">
                  {lang === 'en'
                    ? 'Plus code M2R4+25, distances from Powai Naka / ST stand, and day-trip tips for Ajinkyatara & Kaas.'
                    : 'गुगल प्लस कोड M2R4+25, अजिंक्यतारा व कास पठार माहिती व अंतर.'}
                </p>
              </div>
              <span className="text-xs font-bold text-[#9c3418] mt-4">Get Driving Route →</span>
            </button>

            {/* Card 6: Live Order Slip */}
            <button
              onClick={() => onNavigate('order-slip')}
              type="button"
              className="text-left bg-[#241a15] border border-[#3d2e25] rounded-xl p-5 text-[#fcf8f2] shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-[#c88937] tracking-wider">Page 3</span>
                <h3 className="font-editorial text-lg font-bold text-white group-hover:text-[#c88937] transition-colors mt-0.5">
                  {lang === 'en' ? 'Live Order Slip & WhatsApp' : 'ऑर्डर पावती व व्हॉट्सअ‍ॅप'}
                </h3>
                <p className="text-xs text-[#dcd1be] mt-1 leading-relaxed">
                  {lang === 'en'
                    ? 'Instant order calculator, packaging calculation, and direct 1-click dispatch to 075586 81179.'
                    : 'कच्ची पावती, पार्सल हिशोब आणि एका क्लिकवर व्हॉट्सअ‍ॅपवर ऑर्डर पाठवा.'}
                </p>
              </div>
              <span className="text-xs font-bold text-[#c88937] mt-4">Open Current Slip →</span>
            </button>

          </div>

        </div>
      </section>

    </div>
  );
};
