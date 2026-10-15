import React, { useState, useMemo } from 'react';
import { MENU_ITEMS } from '../../data/cafeData';
import { CategoryId, Language, MenuItem, CartCustomization } from '../../types';

interface MenuPageProps {
  lang: Language;
  onAddItem: (item: MenuItem, customization?: CartCustomization, quantity?: number) => void;
  onAddCombo: (comboTitle: string, items: MenuItem[], discountedTotal: number) => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({
  lang,
  onAddItem,
  onAddCombo,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dietaryFilter, setDietaryFilter] = useState<'all' | 'popular' | 'jain' | 'under100' | 'spicy'>('all');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  // Customizer modal state
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [spicePreference, setSpicePreference] = useState<'mild' | 'medium' | 'spicy'>('medium');
  const [extraChutney, setExtraChutney] = useState(true);
  const [extraCheese, setExtraCheese] = useState(false);
  const [packagingType, setPackagingType] = useState<'dine-in' | 'takeaway'>('dine-in');

  // Combo Builder state
  const [comboMain, setComboMain] = useState<MenuItem | null>(MENU_ITEMS.find((i) => i.id === 'masala-dosa') || null);
  const [comboSnack, setComboSnack] = useState<MenuItem | null>(MENU_ITEMS.find((i) => i.id === 'satara-wada-pav') || null);
  const [comboDrink, setComboDrink] = useState<MenuItem | null>(MENU_ITEMS.find((i) => i.id === 'south-indian-filter-coffee') || null);
  const [comboAddedSuccess, setComboAddedSuccess] = useState(false);

  const categories: { id: CategoryId; nameEn: string; nameMr: string; count: number }[] = [
    { id: 'all', nameEn: 'Full Menu', nameMr: 'सर्व मेनू', count: MENU_ITEMS.length },
    { id: 'south-indian', nameEn: 'South Indian & Dosas', nameMr: 'साऊथ इंडियन व डोसा', count: 5 },
    { id: 'satara-katta', nameEn: 'Satara Katta & Thalipeeth', nameMr: 'वडापाव व थालीपीठ', count: 4 },
    { id: 'sandwiches', nameEn: 'Grilled Sandwiches', nameMr: 'सँडविच कट्टा', count: 3 },
    { id: 'pav-bhaji', nameEn: 'Tawa Pav Bhaji', nameMr: 'पावभाजी', count: 2 },
    { id: 'fast-food', nameEn: 'Pasta & Fast Food', nameMr: 'पास्ता व फ्राईज', count: 3 },
    { id: 'beverages', nameEn: 'Chai & Filter Coffee', nameMr: 'चहा व कॉफी', count: 3 },
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      if (dietaryFilter === 'popular' && !item.popular) return false;
      if (dietaryFilter === 'jain' && !item.jainAvailable) return false;
      if (dietaryFilter === 'under100' && item.price >= 100) return false;
      if (dietaryFilter === 'spicy' && (item.spicyLevel || 0) < 3) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const mEn = item.nameEn.toLowerCase().includes(q);
        const mMr = item.nameMr.toLowerCase().includes(q);
        const mDesc = item.descriptionEn.toLowerCase().includes(q);
        if (!mEn && !mMr && !mDesc) return false;
      }
      return true;
    });
  }, [selectedCategory, dietaryFilter, searchQuery]);

  const handleQuickAdd = (item: MenuItem) => {
    onAddItem(item);
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  const handleOpenCustomizer = (item: MenuItem) => {
    setCustomizingItem(item);
    setSpicePreference('medium');
    setExtraChutney(true);
    setExtraCheese(false);
    setPackagingType('dine-in');
  };

  const handleConfirmCustomizer = () => {
    if (!customizingItem) return;
    onAddItem(
      customizingItem,
      {
        spiceLevel: spicePreference,
        extraChutney,
        extraSambar: true,
        extraCheese,
        packaging: packagingType,
      },
      1
    );
    setCustomizingItem(null);
  };

  const rawComboTotal = (comboMain?.price || 0) + (comboSnack?.price || 0) + (comboDrink?.price || 0);
  const comboDiscount = 20;
  const discountedComboTotal = Math.max(0, rawComboTotal - comboDiscount);

  const handleAddComboToSlip = () => {
    if (!comboMain || !comboSnack || !comboDrink) return;
    const title = `${comboMain.nameEn} + ${comboSnack.nameEn} + ${comboDrink.nameEn}`;
    onAddCombo(title, [comboMain, comboSnack, comboDrink], discountedComboTotal);
    setComboAddedSuccess(true);
    setTimeout(() => setComboAddedSuccess(false), 2500);
  };

  return (
    <div className="py-12 md:py-20 bg-[#FBF6EE] text-[#241810] animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Editorial Heading with floral flourish */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-[#758A6F] mb-1 block">
            {lang === 'en' ? 'Freshly Roasted & Ground' : 'सदर बझार, सातारा'}
          </span>
          <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-[#241810] tracking-tight">
            {lang === 'en' ? 'The Artisanal Menu' : 'आमचे मेनू कार्ड'}
          </h1>
          <div className="flex justify-center my-2 text-[#758A6F]">
            <span>❧ ✦ ☙</span>
          </div>
          <p className="text-xs sm:text-sm text-[#5F4B3C] leading-relaxed">
            {lang === 'en'
              ? 'Every dish is prepared fresh on order. Generous bowls of freshly grated coconut chutney and hot sambar are served without hesitation.'
              : 'प्रत्येक पदार्थ ताज्या साहित्यातून आणि ऑर्डरनुसार गरमागरम तयार केला जातो. नारळाची चटणी आणि सांबार मनसोक्त दिले जाते.'}
          </p>
        </div>

        {/* SECTION A: Katta Combo Builder Styled like a Warm Recipe Inlay */}
        <div className="bg-[#DCE6D8] border border-[#C5D4C1] rounded-[28px] p-6 sm:p-8 mb-12 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#C5D4C1] gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#586B52] tracking-widest block">
                Interactive Meal Builder
              </span>
              <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#241810]">
                {lang === 'en' ? 'Build Your Own Satara Katta Combo' : 'आपला खास कट्टा कॉम्बो तयार करा'}
              </h2>
            </div>
            <div className="text-xs font-mono font-bold text-[#241810] bg-[#FFFDF9] px-3.5 py-1.5 rounded-full border border-[#C5D4C1] shadow-xs">
              Bundle Savings: Save ₹{comboDiscount}
            </div>
          </div>

          {/* 3 Step Interactive Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            
            {/* Step 1: Main */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#D37432] text-white text-[11px] font-bold flex items-center justify-center">1</span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#241810]">
                  {lang === 'en' ? 'Select Main Course' : '१. मुख्य पदार्थ'}
                </span>
              </div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {MENU_ITEMS.filter((i) => i.category === 'south-indian' || i.category === 'sandwiches' || i.category === 'satara-katta').slice(0, 5).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setComboMain(item)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs flex justify-between items-center transition-colors ${
                      comboMain?.id === item.id
                        ? 'border-[#D37432] bg-[#FFFDF9] font-bold text-[#D37432] shadow-xs'
                        : 'border-[#C5D4C1] bg-[#E1EADA] text-[#4A5D44] hover:bg-[#FFFDF9]'
                    }`}
                  >
                    <span className="truncate">{lang === 'en' ? item.nameEn : item.nameMr}</span>
                    <span className="font-mono text-[11px] tabular-nums ml-2 font-bold">₹{item.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Snack */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#D37432] text-white text-[11px] font-bold flex items-center justify-center">2</span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#241810]">
                  {lang === 'en' ? 'Select Snack or Side' : '२. स्नॅक / साइड'}
                </span>
              </div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {[
                  MENU_ITEMS.find((i) => i.id === 'satara-wada-pav'),
                  MENU_ITEMS.find((i) => i.id === 'crispy-french-fries'),
                  MENU_ITEMS.find((i) => i.id === 'medu-vada'),
                  MENU_ITEMS.find((i) => i.id === 'veg-cheese-toast'),
                ].filter(Boolean).map((item) => (
                  <button
                    key={item!.id}
                    type="button"
                    onClick={() => setComboSnack(item!)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs flex justify-between items-center transition-colors ${
                      comboSnack?.id === item!.id
                        ? 'border-[#D37432] bg-[#FFFDF9] font-bold text-[#D37432] shadow-xs'
                        : 'border-[#C5D4C1] bg-[#E1EADA] text-[#4A5D44] hover:bg-[#FFFDF9]'
                    }`}
                  >
                    <span className="truncate">{lang === 'en' ? item!.nameEn : item!.nameMr}</span>
                    <span className="font-mono text-[11px] tabular-nums ml-2 font-bold">₹{item!.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Drink */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#D37432] text-white text-[11px] font-bold flex items-center justify-center">3</span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#241810]">
                  {lang === 'en' ? 'Select Beverage' : '३. पेय / कॉफी'}
                </span>
              </div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {MENU_ITEMS.filter((i) => i.category === 'beverages').map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setComboDrink(item)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs flex justify-between items-center transition-colors ${
                      comboDrink?.id === item.id
                        ? 'border-[#D37432] bg-[#FFFDF9] font-bold text-[#D37432] shadow-xs'
                        : 'border-[#C5D4C1] bg-[#E1EADA] text-[#4A5D44] hover:bg-[#FFFDF9]'
                    }`}
                  >
                    <span className="truncate">{lang === 'en' ? item.nameEn : item.nameMr}</span>
                    <span className="font-mono text-[11px] tabular-nums ml-2 font-bold">₹{item.price}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Combo Total & Action */}
          <div className="mt-6 pt-5 border-t border-[#C5D4C1] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#241810]">
              <div>
                <strong>Selected Bundle:</strong> {comboMain?.nameEn} + {comboSnack?.nameEn} + {comboDrink?.nameEn}
              </div>
              <div className="font-mono text-sm mt-0.5">
                <span className="text-[#586B52] line-through mr-2">₹{rawComboTotal}</span>
                <span className="text-base font-bold text-[#D37432]">Deal Total: ₹{discountedComboTotal}</span>
              </div>
            </div>

            <button
              onClick={handleAddComboToSlip}
              type="button"
              className={`w-full sm:w-auto px-7 py-3 rounded-full text-xs uppercase tracking-wider font-bold transition-all shadow-md ${
                comboAddedSuccess
                  ? 'bg-[#586B52] text-white'
                  : 'bg-[#D37432] hover:bg-[#B2581A] text-white'
              }`}
            >
              {comboAddedSuccess
                ? (lang === 'en' ? 'Combo Added to Slip!' : 'कॉम्बो जोडला गेला!')
                : (lang === 'en' ? '+ Add Combo to Order Slip' : '+ कॉम्बो पावतीमध्ये जोडा')}
            </button>
          </div>
        </div>

        {/* SECTION B: Filter & Search Controls */}
        <div className="space-y-4 mb-8">
          
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={lang === 'en' ? 'Search by dish name (e.g. Masala Dosa, Wada Pav, Sandwich, Pasta)...' : 'पदार्थाचे नाव शोधा (उदा. डोसा, वडापाव, सँडविच, पास्ता)...'}
              className="w-full px-5 py-3.5 bg-[#FFFDF9] border border-[#DECEB7] rounded-full text-sm text-[#241810] placeholder-[#8D7663] focus:outline-none focus:border-[#D37432] shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#8D7663] hover:text-[#241810]"
              >
                ✕ Clear
              </button>
            )}
          </div>

          {/* Category Pill Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  type="button"
                  className={`px-4 py-2 text-xs font-semibold rounded-full whitespace-nowrap shrink-0 transition-all ${
                    isSelected
                      ? 'bg-[#241810] text-[#FBF6EE] shadow-xs'
                      : 'bg-[#FFFDF9] text-[#5F4B3C] border border-[#DECEB7] hover:bg-[#F3E9D7]'
                  }`}
                >
                  <span>{lang === 'en' ? cat.nameEn : cat.nameMr}</span>
                  <span className={`ml-1 text-[10px] font-mono ${isSelected ? 'text-[#DCE6D8]' : 'text-[#8D7663]'}`}>
                    ({cat.count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Dietary Filters */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-[#8D7663] font-medium whitespace-nowrap shrink-0">
              {lang === 'en' ? 'Quick Filter:' : 'फिल्टर:'}
            </span>
            {[
              { id: 'all', labelEn: 'All Dishes', labelMr: 'सर्व' },
              { id: 'popular', labelEn: 'Popular Hits', labelMr: 'लोकप्रिय' },
              { id: 'jain', labelEn: 'Jain Friendly', labelMr: 'जैन पर्याय' },
              { id: 'under100', labelEn: 'Under ₹100', labelMr: '₹१०० च्या आत' },
              { id: 'spicy', labelEn: 'Spicy Thecha', labelMr: 'झणझणीत ठेचा' },
            ].map((f) => {
              const active = dietaryFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setDietaryFilter(f.id as typeof dietaryFilter)}
                  className={`px-3 py-1 rounded-full text-[11px] whitespace-nowrap shrink-0 transition-colors ${
                    active
                      ? 'bg-[#D37432] text-white font-semibold'
                      : 'bg-[#F3E9D7] text-[#5F4B3C] border border-[#DECEB7] hover:bg-[#EBE0CC]'
                  }`}
                >
                  {lang === 'en' ? f.labelEn : f.labelMr}
                </button>
              );
            })}
          </div>

        </div>

        {/* SECTION C: 3-Column Modern Indian Food Cards (Inspired by Reference Image) */}
        {filteredItems.length === 0 ? (
          <div className="py-16 text-center text-[#735E52] bg-[#FFFDF9] rounded-3xl border border-[#DECEB7]">
            <div className="font-editorial text-xl text-[#241810]">
              {lang === 'en' ? 'No dishes matched your filter' : 'निवडीनुसार कोणताही पदार्थ सापडला नाही'}
            </div>
            <p className="text-xs text-[#8D7663] mt-1">
              Try clearing the search query or switching categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setDietaryFilter('all');
              }}
              className="mt-4 px-5 py-2.5 bg-[#241810] text-white text-xs font-bold rounded-full"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => {
              const isAdded = addedItemIds[item.id];
              // Alternating soft sage and warm ivory backgrounds like the reference design
              const isSage = idx % 2 === 1;

              return (
                <div
                  key={item.id}
                  className={`border rounded-[28px] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group ${
                    isSage
                      ? 'bg-[#DCE6D8] border-[#C5D4C1]'
                      : 'bg-[#FFFDF9] border-[#E7DBCA]'
                  }`}
                >
                  <div>
                    {/* Floating Plate / Pod Image */}
                    {item.image ? (
                      <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md bg-white mb-3 group-hover:scale-105 transition-transform duration-500">
                        <img
                          src={item.image}
                          alt={item.nameEn}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 mx-auto rounded-full bg-[#F3E9D7] border border-[#DECEB7] flex items-center justify-center font-editorial text-lg text-[#D37432] mb-3">
                        ✦
                      </div>
                    )}

                    {/* Badge and Star Row */}
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#586B52] bg-white/80 px-2.5 py-0.5 rounded-full">
                        {item.category.replace('-', ' ')}
                      </span>
                      <div className="text-xs text-[#D37432] font-bold">
                        {item.popular ? '★★★★★' : '★★★★☆'}
                      </div>
                    </div>

                    {/* Dish Title */}
                    <h3 className="font-editorial text-lg font-bold text-[#241810] group-hover:text-[#D37432] transition-colors">
                      {lang === 'en' ? item.nameEn : item.nameMr}
                    </h3>
                    <div className="text-[11px] font-marathi-brand text-[#758A6F] font-semibold mt-0.5">
                      {lang === 'en' ? item.nameMr : item.nameEn}
                    </div>

                    {/* Description */}
                    <p className={`mt-1.5 text-xs line-clamp-2 leading-relaxed ${isSage ? 'text-[#4A5D44]' : 'text-[#5F4B3C]'}`}>
                      {lang === 'en' ? item.descriptionEn : item.descriptionMr}
                    </p>
                  </div>

                  {/* Card Actions Bottom */}
                  <div className={`mt-4 pt-3 border-t flex items-center justify-between ${isSage ? 'border-[#C5D4C1]' : 'border-[#E7DBCA]'}`}>
                    <span className="font-mono text-base font-bold text-[#241810] tabular-nums">
                      ₹{item.price}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleOpenCustomizer(item)}
                        className="px-2.5 py-1 text-[11px] border border-[#DECEB7] hover:border-[#D37432] rounded-full text-[#5F4B3C] hover:text-[#D37432] bg-white transition-colors"
                      >
                        {lang === 'en' ? 'Customize' : 'बदल'}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleQuickAdd(item)}
                        className={`px-3.5 py-1 text-xs font-bold rounded-full transition-all shadow-xs ${
                          isAdded
                            ? 'bg-[#586B52] text-white'
                            : 'bg-[#D37432] hover:bg-[#B2581A] text-white'
                        }`}
                      >
                        {isAdded ? (lang === 'en' ? 'Added!' : 'जोडले!') : (lang === 'en' ? '+ Add' : '+ जोडा')}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Item Customizer Modal */}
      {customizingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#241810]/65 backdrop-blur-xs">
          <div className="bg-[#FFFDF9] border border-[#DECEB7] rounded-[28px] max-w-md w-full p-6 shadow-2xl text-[#241810]">
            <div className="flex justify-between items-start mb-4 border-b border-[#F3E9D7] pb-3">
              <div>
                <h3 className="font-editorial text-xl font-bold">
                  {lang === 'en' ? customizingItem.nameEn : customizingItem.nameMr}
                </h3>
                <span className="font-mono text-xs font-bold text-[#D37432]">
                  Base Price: ₹{customizingItem.price}
                </span>
              </div>
              <button
                onClick={() => setCustomizingItem(null)}
                className="text-[#8D7663] hover:text-[#241810] text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Packaging */}
              <div>
                <label className="block font-bold text-[#5F4B3C] mb-1.5 uppercase tracking-wider text-[10px]">
                  Service Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPackagingType('dine-in')}
                    className={`p-2.5 rounded-xl border text-left ${
                      packagingType === 'dine-in'
                        ? 'border-[#D37432] bg-[#FDE8D7] font-bold text-[#D37432]'
                        : 'border-[#DECEB7] text-[#5F4B3C]'
                    }`}
                  >
                    Dine-in Plate
                  </button>
                  <button
                    type="button"
                    onClick={() => setPackagingType('takeaway')}
                    className={`p-2.5 rounded-xl border text-left ${
                      packagingType === 'takeaway'
                        ? 'border-[#D37432] bg-[#FDE8D7] font-bold text-[#D37432]'
                        : 'border-[#DECEB7] text-[#5F4B3C]'
                    }`}
                  >
                    Takeaway Parcel (+₹5)
                  </button>
                </div>
              </div>

              {/* Spice */}
              <div>
                <label className="block font-bold text-[#5F4B3C] mb-1.5 uppercase tracking-wider text-[10px]">
                  Spice Preference
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['mild', 'medium', 'spicy'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSpicePreference(lvl)}
                      className={`py-2 px-2 text-center rounded-xl border capitalize ${
                        spicePreference === lvl
                          ? 'border-[#D37432] bg-[#D37432] text-white font-bold'
                          : 'border-[#DECEB7] text-[#5F4B3C]'
                      }`}
                    >
                      {lvl === 'mild' ? 'Mild (कमी)' : lvl === 'medium' ? 'Medium (मध्यम)' : 'Thecha (झणझणीत)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra Chutney & Cheese */}
              <div className="space-y-2 pt-1 border-t border-[#F3E9D7]">
                <label className="flex items-center justify-between cursor-pointer">
                  <span>Extra Fresh Coconut Chutney</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-[#586B52] font-bold">Free</span>
                    <input
                      type="checkbox"
                      checked={extraChutney}
                      onChange={(e) => setExtraChutney(e.target.checked)}
                      className="accent-[#D37432]"
                    />
                  </div>
                </label>

                {(customizingItem.category === 'sandwiches' || customizingItem.category === 'pav-bhaji' || customizingItem.category === 'fast-food') && (
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>Extra Grated Amul Cheese</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-mono text-[#D37432] font-bold">+₹25</span>
                      <input
                        type="checkbox"
                        checked={extraCheese}
                        onChange={(e) => setExtraCheese(e.target.checked)}
                        className="accent-[#D37432]"
                      />
                    </div>
                  </label>
                )}
              </div>

              {/* Confirm */}
              <div className="pt-3 border-t border-[#F3E9D7] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#8D7663]">Final Item Price</span>
                  <div className="font-mono text-base font-bold text-[#D37432]">
                    ₹{customizingItem.price + (extraCheese ? 25 : 0) + (packagingType === 'takeaway' ? 5 : 0)}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCustomizingItem(null)}
                    className="px-3.5 py-2 text-[#5F4B3C]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmCustomizer}
                    className="px-5 py-2 bg-[#D37432] hover:bg-[#B2581A] text-white font-bold rounded-full shadow-xs"
                  >
                    Add to Slip
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
