import React, { useState } from 'react';
import { SPICES_AND_CRAFT } from '../../data/cafeData';
import { Language } from '../../types';

interface KitchenCraftPageProps {
  lang: Language;
}

export const KitchenCraftPage: React.FC<KitchenCraftPageProps> = ({ lang }) => {
  const [activeSpiceId, setActiveSpiceId] = useState<string>(SPICES_AND_CRAFT[0].id);
  const selectedSpice = SPICES_AND_CRAFT.find((s) => s.id === activeSpiceId) || SPICES_AND_CRAFT[0];

  const galleryImages = [
    {
      src: '/src/assets/images/hero_masala_dosa_breakfast_1791645028775.jpg',
      titleEn: 'Banana Leaf Masala Dosa',
      titleMr: 'केळीच्या पानावरील मसाला डोसा',
      desc: 'Folded crisp on natural banana leaf with twin chutneys and hot drumstick sambar.',
    },
    {
      src: '/src/assets/images/satara_wada_pav_chai_1791645048207.jpg',
      titleEn: 'Batata Wada Pav & Cutting Chai',
      titleMr: 'गरम वडापाव व कटींग चहा',
      desc: 'Yellow potato bhaji, fried green chili, and fiery garlic peanut thecha.',
    },
    {
      src: '/src/assets/images/veg_cheese_grilled_sandwich_1791645066007.jpg',
      titleEn: 'Veg Cheese Grilled Sandwich',
      titleMr: 'व्हेज चीज ग्रिल्ड सँडविच',
      desc: 'Triple layer toasted bread with potato, beetroot, and melted Amul cheese.',
    },
    {
      src: '/src/assets/images/maharashtrian_thalipeeth_1791645078927.jpg',
      titleEn: 'Bhajani Thalipeeth with Loni',
      titleMr: 'भाजणीचे थालीपीठ व लोणी',
      desc: 'Roasted multi-grain flatbread patted by hand, served with homemade white butter.',
    },
    {
      src: '/src/assets/images/filter_coffee_dabarah_1791895662728.jpg',
      titleEn: 'Dabarah Filter Coffee',
      titleMr: 'पारंपारिक डिकॉक्शन फिल्टर कॉफी',
      desc: 'Dark roasted plantation chicory coffee frothed in traditional stainless steel tumbler.',
    },
    {
      src: '/src/assets/images/satara_cafe_ambience_1791645090606.jpg',
      titleEn: 'Sadar Bazar Evening Corner',
      titleMr: 'सदर बझारचा सायंकालीन कट्टा',
      desc: 'Wooden tables, chalkboard specials, and warm neighborhood conversations.',
    },
  ];

  return (
    <div className="py-12 md:py-20 bg-[#FBF6EE] text-[#241810] animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Editorial Heading with botanical flourish */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-[#758A6F] mb-1 block">
            {lang === 'en' ? 'Kitchen Heritage & The Spices' : 'किचन संस्कृती व मसाले'}
          </span>
          <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-[#241810] tracking-tight leading-tight">
            {lang === 'en' ? (
              <>
                Cast iron tawas, fresh coconut grating, and the <span className="italic font-normal text-[#D37432]">scent of mustard seeds.</span>
              </>
            ) : (
              <>
                लोखंडी तवे, ताजा किसलेला नारळ आणि <span className="text-[#D37432]">खमंग मोहरीची फोडणी.</span>
              </>
            )}
          </h1>
          <div className="flex justify-center my-2 text-[#758A6F]">
            <span>❧ ✦ ☙</span>
          </div>
          <p className="mt-3 text-xs sm:text-sm text-[#5F4B3C] leading-relaxed max-w-2xl mx-auto">
            {lang === 'en'
              ? 'We believe great cafe food in Satara does not come from pre-mixed packets or factory shortcuts. It comes from patience: soaking lentils overnight, roasting our multi-grain bhajani on slow fire, and pounding garlic thecha fresh every morning.'
              : 'साताऱ्यातील उत्तम चव ही पॅकेटमधील मसाल्यांतून नव्हे, तर संयमातून येते — रात्रभर भिजवलेली डाळ, मंद आचेवर भाजलेली भाजणी आणि खलबत्त्यात कुटलेला गावरान लसूण ठेचा.'}
          </p>
        </div>

        {/* SECTION 1: Interactive Brass Spice Box (मसाल्यांचा डबा) */}
        <div className="bg-[#241810] border-4 border-[#3D2B1E] text-[#FBF6EE] rounded-[32px] p-6 sm:p-10 mb-16 shadow-2xl relative overflow-hidden">
          
          {/* Subtle background brass glow */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#C88937]/10 blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#3D2B1E] gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#FDE8D7] tracking-widest block">
                Interactive Spice Katoris
              </span>
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-white mt-0.5">
                {lang === 'en' ? 'Our Traditional Masala Daba' : 'आमचा पारंपारिक मसाल्यांचा डबा'}
              </h2>
            </div>
            <div className="text-xs text-[#A39082]">
              Tap any spice below to reveal its secret role in our kitchen:
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-center">
            
            {/* Spice Katori Selector Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SPICES_AND_CRAFT.map((spice) => {
                const isSelected = activeSpiceId === spice.id;
                return (
                  <button
                    key={spice.id}
                    onClick={() => setActiveSpiceId(spice.id)}
                    type="button"
                    className={`p-4 rounded-2xl text-left border transition-all ${
                      isSelected
                        ? 'border-[#C88937] bg-[#36271F] text-white shadow-md scale-102 ring-1 ring-[#C88937]'
                        : 'border-[#3D2B1E] bg-[#1A130F]/60 text-[#A39082] hover:border-[#5A4335] hover:text-white'
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full bg-[#C88937]/20 border border-[#C88937] mb-2 flex items-center justify-center text-[10px] text-[#C88937] font-bold">
                      {isSelected ? '✓' : '•'}
                    </div>
                    <div className="font-bold text-xs leading-snug truncate">
                      {spice.nameEn.split('(')[0]}
                    </div>
                    <div className="text-[10px] font-marathi-brand text-[#FDE8D7] mt-0.5 truncate">
                      {spice.nameEn.includes('(') ? spice.nameEn.split('(')[1].replace(')', '') : ''}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Spice Detailed Flavor Card */}
            <div className="lg:col-span-5 bg-[#1A130F] border border-[#3D2B1E] p-6 rounded-2xl space-y-4 shadow-inner">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#C88937] font-bold">
                  {selectedSpice.origin}
                </span>
                <h3 className="font-editorial text-2xl font-bold text-white mt-1">
                  {selectedSpice.nameEn}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#DCD1BE] leading-relaxed">
                {lang === 'en' ? selectedSpice.roleEn : selectedSpice.roleMr}
              </p>

              <div className="pt-3 border-t border-[#3D2B1E] text-[11px] text-[#8D7663] flex justify-between">
                <span>Hand-inspected daily</span>
                <span className="text-[#FDE8D7] font-semibold">Satara Cafe Kitchen</span>
              </div>
            </div>

          </div>
        </div>

        {/* SECTION 2: 3 Kitchen Rituals */}
        <div className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-widest font-bold text-[#758A6F] mb-1 block">
              The Philosophy
            </span>
            <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-[#241810]">
              Three Daily Rituals at Our Counter
            </h2>
            <div className="flex justify-center my-2 text-[#758A6F]">
              <span>❧ ✦ ☙</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#DCE6D8] border border-[#C5D4C1] p-6 rounded-[28px] space-y-3 shadow-xs">
              <span className="font-editorial text-2xl font-bold text-[#586B52]">01</span>
              <h3 className="font-editorial text-lg font-bold text-[#241810]">
                {lang === 'en' ? 'Natural Banana Leaves' : 'केळीची ताजी पाने'}
              </h3>
              <p className="text-xs text-[#4A5D44] leading-relaxed">
                {lang === 'en'
                  ? 'We cut fresh banana leaves every morning for our dosas. As the hot crisp dosa rests on the warm leaf, the natural leaf wax imparts a delicate, authentic aroma you never get from paper plates.'
                  : 'केळीच्या पानावरील उष्णतेमुळे पदार्थाला मिळणारा नैसर्गिक सुवास आणि चव कागदी प्लेटमध्ये कधीच मिळू शकत नाही.'}
              </p>
            </div>

            <div className="bg-[#FFFDF9] border border-[#DECEB7] p-6 rounded-[28px] space-y-3 shadow-xs">
              <span className="font-editorial text-2xl font-bold text-[#D37432]">02</span>
              <h3 className="font-editorial text-lg font-bold text-[#241810]">
                {lang === 'en' ? 'Twice-Daily Coconut Grating' : 'दोनदा ताजा किसलेला नारळ'}
              </h3>
              <p className="text-xs text-[#5F4B3C] leading-relaxed">
                {lang === 'en'
                  ? 'We never use refrigerated coconut paste. Fresh coconuts are broken and grated once at 7:00 AM for the breakfast rush, and again at 4:30 PM for the evening katta crowd.'
                  : 'सकाळी ७ वाजता आणि पुन्हा संध्याकाळी ४:३० वाजता ताजा नारळ किसून चटणी वाटली जाते.'}
              </p>
            </div>

            <div className="bg-[#DCE6D8] border border-[#C5D4C1] p-6 rounded-[28px] space-y-3 shadow-xs">
              <span className="font-editorial text-2xl font-bold text-[#586B52]">03</span>
              <h3 className="font-editorial text-lg font-bold text-[#241810]">
                {lang === 'en' ? 'Slow Tawa Roasting' : 'मंद आचेवर तव्याची भाजणी'}
              </h3>
              <p className="text-xs text-[#4A5D44] leading-relaxed">
                {lang === 'en'
                  ? 'Our multigrain thalipeeth is hand-patted directly on parchment, roasted with Amul butter until crispy golden on the edges, and topped with authentic homemade white loni butter.'
                  : 'भाजणीचे थालीपीठ हाताने थापून बटरवर खमंग भाजले जाते आणि वर घरचे पांढरे लोणी दिले जाते.'}
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 3: Visual Culinary Gallery Showcase */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-widest font-bold text-[#758A6F] mb-1 block">
              Visual Chronicle
            </span>
            <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-[#241810]">
              Life & Flavors in Sadar Bazar
            </h2>
            <div className="flex justify-center my-2 text-[#758A6F]">
              <span>❧ ✦ ☙</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className="bg-[#FFFDF9] border border-[#DECEB7] rounded-[28px] overflow-hidden shadow-xs hover:shadow-md transition-all group p-4 flex flex-col justify-between"
              >
                <div className="aspect-4/3 overflow-hidden rounded-[20px] bg-[#F3E9D7] mb-3">
                  <img
                    src={img.src}
                    alt={img.titleEn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div>
                  <h3 className="font-editorial text-base font-bold text-[#241810]">
                    {lang === 'en' ? img.titleEn : img.titleMr}
                  </h3>
                  <p className="text-xs text-[#5F4B3C] mt-1 leading-relaxed">
                    {img.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
