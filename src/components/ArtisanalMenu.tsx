import React, { useState } from 'react';
import { MENU_ITEMS } from '../data/cafeData';
import { CategoryId, Language, MenuItem } from '../types';

interface ArtisanalMenuProps {
  lang: Language;
  onAddItem: (item: MenuItem) => void;
}

export const ArtisanalMenu: React.FC<ArtisanalMenuProps> = ({
  lang,
  onAddItem,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const categories: { id: CategoryId; nameEn: string; nameMr: string; count: number }[] = [
    { id: 'all', nameEn: 'Complete Menu', nameMr: 'संपूर्ण मेनू', count: MENU_ITEMS.length },
    { id: 'south-indian', nameEn: 'South Indian & Dosas', nameMr: 'डोसा व साऊथ इंडियन', count: 5 },
    { id: 'satara-katta', nameEn: 'Satara Katta & Thalipeeth', nameMr: 'वडापाव व थालीपीठ', count: 4 },
    { id: 'sandwiches', nameEn: 'Grilled Sandwiches', nameMr: 'सँडविच कट्टा', count: 3 },
    { id: 'pav-bhaji', nameEn: 'Tawa Pav Bhaji', nameMr: 'पावभाजी', count: 2 },
    { id: 'fast-food', nameEn: 'Pasta & Fast Food', nameMr: 'पास्ता व फ्राईज', count: 3 },
    { id: 'beverages', nameEn: 'Chai & Filter Coffee', nameMr: 'चहा व कॉफी', count: 3 },
  ];

  const handleAdd = (item: MenuItem) => {
    onAddItem(item);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  const filteredItems = selectedCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="menu" className="py-16 md:py-24 bg-[#fcf8f2] text-[#241a15] border-b border-[#e8dfd1]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Editorial Menu Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-[11px] uppercase tracking-widest font-bold text-[#9c3418] mb-2">
            {lang === 'en' ? 'Freshly Made In Sadar Bazar' : 'सदर बझार, सातारा'}
          </div>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#241a15] tracking-tight">
            {lang === 'en' ? 'The Cafe Menu' : 'आमचे मेनू कार्ड'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#5c4a40] leading-relaxed">
            {lang === 'en'
              ? 'Everything is prepared hot to order. Coconut chutney and sambar are ground fresh daily and served without hesitation.'
              : 'प्रत्येक पदार्थ ताज्या साहित्यातून आणि ऑर्डरनुसार गरमागरम तयार केला जातो. नारळाची चटणी आणि सांबार मोकळ्या हाताने दिले जाते.'}
          </p>
        </div>

        {/* Category Segmented Tabs (Clean Typography, no candy badges) */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap mb-12 border-b border-[#e8dfd1] pb-4">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#241a15] text-[#fcf8f2]'
                    : 'text-[#5c4a40] hover:text-[#241a15] hover:bg-[#f4ecdf]'
                }`}
              >
                <span>{lang === 'en' ? cat.nameEn : cat.nameMr}</span>
                <span className={`ml-1 text-[10px] font-mono ${isSelected ? 'text-[#e8dfd1]' : 'text-[#8c786a]'}`}>
                  ({cat.count})
                </span>
              </button>
            );
          })}
        </div>

        {/* Featured Editorial Photo Row (Shows real food texture, crumbs & steam) */}
        {selectedCategory === 'all' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
            <div className="group rounded-lg overflow-hidden bg-[#f4ecdf] border border-[#e8dfd1] p-3 text-left">
              <div className="aspect-4/3 rounded overflow-hidden mb-2.5">
                <img
                  src="/src/assets/images/veg_cheese_grilled_sandwich_1791645066007.jpg"
                  alt="Veg Cheese Grilled Sandwich Vag CHIS"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-xs text-[#241a15]">Veg Cheese Sandwich</span>
                <span className="text-xs font-mono font-bold text-[#9c3418]">₹110</span>
              </div>
              <p className="text-[11px] text-[#735e52] mt-0.5 line-clamp-1">
                {lang === 'en' ? 'Triple layer grilled with molten Amul cheese' : '३-लेयर ग्रिल्ड सँडविच'}
              </p>
            </div>

            <div className="group rounded-lg overflow-hidden bg-[#f4ecdf] border border-[#e8dfd1] p-3 text-left">
              <div className="aspect-4/3 rounded overflow-hidden mb-2.5">
                <img
                  src="/src/assets/images/maharashtrian_thalipeeth_1791645078927.jpg"
                  alt="Traditional Maharashtrian Thalipeeth with White Loni"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-xs text-[#241a15]">Bhajani Thalipeeth</span>
                <span className="text-xs font-mono font-bold text-[#9c3418]">₹85</span>
              </div>
              <p className="text-[11px] text-[#735e52] mt-0.5 line-clamp-1">
                {lang === 'en' ? 'Roasted multigrain with white loni butter' : 'भाजणीचे थालीपीठ आणि पांढरे लोणी'}
              </p>
            </div>

            <div className="group rounded-lg overflow-hidden bg-[#f4ecdf] border border-[#e8dfd1] p-3 text-left">
              <div className="aspect-4/3 rounded overflow-hidden mb-2.5">
                <img
                  src="/src/assets/images/satara_wada_pav_chai_1791645048207.jpg"
                  alt="Satara Batata Wada Pav with Cutting Chai"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-bold text-xs text-[#241a15]">Wada Pav & Chai</span>
                <span className="text-xs font-mono font-bold text-[#9c3418]">₹25 / ₹18</span>
              </div>
              <p className="text-[11px] text-[#735e52] mt-0.5 line-clamp-1">
                {lang === 'en' ? 'Garlic peanut thecha, fried green chili' : 'गावरान लसूण ठेचा आणि चहा'}
              </p>
            </div>
          </div>
        )}

        {/* Menu Items: Printed Cafe Menu Card Style (2-Column Editorial List) */}
        <div className="bg-[#fffdfa] border border-[#e8dfd1] rounded-xl p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {filteredItems.map((item) => {
              const isAdded = addedItemIds[item.id];
              return (
                <div 
                  key={item.id} 
                  className="pb-4 border-b border-[#f4ecdf] flex flex-col justify-between group"
                >
                  <div>
                    {/* Dish Name & Tabular Price */}
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-bold text-sm sm:text-base text-[#241a15] group-hover:text-[#9c3418] transition-colors">
                        {lang === 'en' ? item.nameEn : item.nameMr}
                      </h3>
                      <div className="flex items-baseline gap-2 shrink-0">
                        <span className="font-mono text-sm sm:text-base font-bold text-[#241a15] tabular-nums">
                          ₹{item.price}
                        </span>
                      </div>
                    </div>

                    {/* Dish Subtitle / Marathi equivalent */}
                    <div className="text-[11px] text-[#8c786a] font-marathi-brand mt-0.5">
                      {lang === 'en' ? item.nameMr : item.nameEn}
                    </div>

                    {/* Authentic Warm Description */}
                    <p className="mt-1.5 text-xs text-[#5c4a40] leading-relaxed">
                      {lang === 'en' ? item.descriptionEn : item.descriptionMr}
                    </p>
                  </div>

                  {/* Add to slip action */}
                  <div className="mt-3 flex items-center justify-between text-xs pt-1">
                    <span className="text-[11px] text-[#735e52]">
                      {item.spicyLevel === 3 ? 'Spicy thecha' : item.popular ? 'Customer favorite' : 'Freshly made'}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleAdd(item)}
                      className={`px-3 py-1 rounded text-[11px] font-bold uppercase tracking-wider transition-colors ${
                        isAdded
                          ? 'bg-[#2e6930] text-[#fcf8f2]'
                          : 'bg-[#f4ecdf] hover:bg-[#9c3418] text-[#524137] hover:text-[#fcf8f2]'
                      }`}
                    >
                      {isAdded ? (lang === 'en' ? 'Added!' : 'जोडले!') : (lang === 'en' ? '+ Add' : '+ जोडा')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Kitchen note at bottom of menu */}
          <div className="mt-10 pt-6 border-t border-[#e8dfd1] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#735e52]">
            <div>
              <strong>Pure Vegetarian</strong> · Jain preparation available on request.
            </div>
            <div>
              Takeaway packing available for all items (₹5 container pack).
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
