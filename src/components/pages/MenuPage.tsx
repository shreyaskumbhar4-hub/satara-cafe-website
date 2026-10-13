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
  const [comboStep, setComboStep] = useState<1 | 2 | 3>(1);
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

  // Combo calculations
  const rawComboTotal = (comboMain?.price || 0) + (comboSnack?.price || 0) + (comboDrink?.price || 0);
  const comboDiscount = 20; // Saves ₹20 in a bundle
  const discountedComboTotal = Math.max(0, rawComboTotal - comboDiscount);

  const handleAddComboToSlip = () => {
    if (!comboMain || !comboSnack || !comboDrink) return;
    const title = `${comboMain.nameEn} + ${comboSnack.nameEn} + ${comboDrink.nameEn}`;
    onAddCombo(title, [comboMain, comboSnack, comboDrink], discountedComboTotal);
    setComboAddedSuccess(true);
    setTimeout(() => setComboAddedSuccess(false), 2500);
  };

  return (
    <div className="py-12 md:py-20 bg-[#fcf8f2] text-[#241a15] animate-fade-in">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Editorial Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-[11px] uppercase tracking-widest font-bold text-[#9c3418] mb-2">
            {lang === 'en' ? 'Authentic Sadar Bazar Recipes' : 'सदर बझार, सातारा'}
          </div>
          <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-[#241a15] tracking-tight">
            {lang === 'en' ? 'The Artisanal Menu' : 'आमचे मेनू कार्ड'}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#5c4a40] leading-relaxed">
            {lang === 'en'
              ? 'Every dish is roasted fresh on order. Generous bowls of freshly grated coconut chutney and piping hot sambar are served without hesitation.'
              : 'प्रत्येक पदार्थ ताज्या साहित्यातून आणि ऑर्डरनुसार गरमागरम तयार केला जातो. नारळाची चटणी आणि सांबार मनसोक्त दिले जाते.'}
          </p>
        </div>

        {/* SECTION A: Interactive Katta Combo Maker (कट्टा कॉम्बो मेकर) */}
        <div className="bg-[#fffdfa] border-2 border-[#e8dfd1] rounded-2xl p-6 sm:p-8 mb-12 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#f4ecdf] gap-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#9c3418] tracking-widest">
                Interactive Meal Builder
              </span>
              <h2 className="font-editorial text-xl sm:text-2xl font-bold text-[#241a15]">
                {lang === 'en' ? 'Build Your Own Satara Katta Combo' : 'आपला खास कट्टा कॉम्बो तयार करा'}
              </h2>
            </div>
            <div className="text-xs font-mono font-bold text-[#2e6930] bg-[#e8f2e8] px-3 py-1 rounded">
              Bundle Savings: Save ₹{comboDiscount}
            </div>
          </div>

          {/* 3 Step Interactive Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            
            {/* Step 1: Pick Main */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#9c3418] text-white text-[11px] font-bold flex items-center justify-center">1</span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#241a15]">
                  {lang === 'en' ? 'Select Main Course' : '१. मुख्य पदार्थ'}
                </span>
              </div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {MENU_ITEMS.filter((i) => i.category === 'south-indian' || i.category === 'sandwiches' || i.category === 'satara-katta').slice(0, 5).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setComboMain(item)}
                    className={`w-full text-left p-2.5 rounded border text-xs flex justify-between items-center transition-colors ${
                      comboMain?.id === item.id
                        ? 'border-[#9c3418] bg-[#9c3418]/10 font-bold text-[#9c3418]'
                        : 'border-[#e8dfd1] bg-[#fcf8f2] text-[#524137] hover:border-[#c4b59f]'
                    }`}
                  >
                    <span className="truncate">{lang === 'en' ? item.nameEn : item.nameMr}</span>
                    <span className="font-mono text-[11px] tabular-nums ml-2">₹{item.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Pick Snack */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#9c3418] text-white text-[11px] font-bold flex items-center justify-center">2</span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#241a15]">
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
                    className={`w-full text-left p-2.5 rounded border text-xs flex justify-between items-center transition-colors ${
                      comboSnack?.id === item!.id
                        ? 'border-[#9c3418] bg-[#9c3418]/10 font-bold text-[#9c3418]'
                        : 'border-[#e8dfd1] bg-[#fcf8f2] text-[#524137] hover:border-[#c4b59f]'
                    }`}
                  >
                    <span className="truncate">{lang === 'en' ? item!.nameEn : item!.nameMr}</span>
                    <span className="font-mono text-[11px] tabular-nums ml-2">₹{item!.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Pick Drink */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#9c3418] text-white text-[11px] font-bold flex items-center justify-center">3</span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#241a15]">
                  {lang === 'en' ? 'Select Beverage' : '३. पेय / कॉफी'}
                </span>
              </div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {MENU_ITEMS.filter((i) => i.category === 'beverages').map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setComboDrink(item)}
                    className={`w-full text-left p-2.5 rounded border text-xs flex justify-between items-center transition-colors ${
                      comboDrink?.id === item.id
                        ? 'border-[#9c3418] bg-[#9c3418]/10 font-bold text-[#9c3418]'
                        : 'border-[#e8dfd1] bg-[#fcf8f2] text-[#524137] hover:border-[#c4b59f]'
                    }`}
                  >
                    <span className="truncate">{lang === 'en' ? item.nameEn : item.nameMr}</span>
                    <span className="font-mono text-[11px] tabular-nums ml-2">₹{item.price}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Combo Total & Add Action Bar */}
          <div className="mt-6 pt-5 border-t border-[#f4ecdf] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-[#524137]">
              <div>
                <strong>Selected Bundle:</strong> {comboMain?.nameEn} + {comboSnack?.nameEn} + {comboDrink?.nameEn}
              </div>
              <div className="font-mono text-sm mt-0.5">
                <span className="text-[#8c786a] line-through mr-2">₹{rawComboTotal}</span>
                <span className="text-base font-bold text-[#9c3418]">Combo Deal: ₹{discountedComboTotal}</span>
              </div>
            </div>

            <button
              onClick={handleAddComboToSlip}
              type="button"
              className={`w-full sm:w-auto px-6 py-3 rounded text-xs uppercase tracking-wider font-bold transition-all shadow-sm ${
                comboAddedSuccess
                  ? 'bg-[#2e6930] text-white'
                  : 'bg-[#9c3418] hover:bg-[#802810] text-[#fcf8f2]'
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
              className="w-full px-4 py-3 bg-[#fffdfa] border border-[#e8dfd1] rounded-lg text-sm text-[#241a15] placeholder-[#8c786a] focus:outline-none focus:border-[#9c3418] shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8c786a] hover:text-[#241a15]"
              >
                ✕ Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  type="button"
                  className={`px-3 py-1.5 text-xs font-semibold rounded whitespace-nowrap shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-[#241a15] text-[#fcf8f2]'
                      : 'bg-[#fffdfa] text-[#5c4a40] border border-[#e8dfd1] hover:bg-[#f4ecdf]'
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

          {/* Quick Dietary Filters */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-[#8c786a] font-medium whitespace-nowrap shrink-0">
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
                  className={`px-2.5 py-1 rounded text-[11px] whitespace-nowrap shrink-0 transition-colors ${
                    active
                      ? 'bg-[#9c3418] text-[#fcf8f2] font-semibold'
                      : 'bg-[#f4ecdf] text-[#524137] border border-[#e2d6c3] hover:bg-[#e8dfd1]'
                  }`}
                >
                  {lang === 'en' ? f.labelEn : f.labelMr}
                </button>
              );
            })}
          </div>

        </div>

        {/* SECTION C: 2-Column Printed Cafe Menu Card */}
        <div className="bg-[#fffdfa] border border-[#e8dfd1] rounded-xl p-6 sm:p-10 shadow-xs">
          
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-[#735e52]">
              <div className="font-editorial text-lg text-[#241a15]">
                {lang === 'en' ? 'No dishes matched your filter' : 'निवडीनुसार कोणताही पदार्थ सापडला नाही'}
              </div>
              <p className="text-xs text-[#8c786a] mt-1">
                {lang === 'en' ? 'Try clearing the search query or switching categories.' : 'कृपया इतर शोध पर्याय किंवा वर्गवारी वापरून पहा.'}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setDietaryFilter('all');
                }}
                className="mt-4 px-4 py-2 bg-[#241a15] text-[#fcf8f2] text-xs font-bold rounded"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {filteredItems.map((item) => {
                const isAdded = addedItemIds[item.id];
                return (
                  <div
                    key={item.id}
                    className="pb-4 border-b border-[#f4ecdf] flex flex-col justify-between group"
                  >
                    <div>
                      {/* Name & Tabular Price */}
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-bold text-sm sm:text-base text-[#241a15] group-hover:text-[#9c3418] transition-colors">
                          {lang === 'en' ? item.nameEn : item.nameMr}
                        </h3>
                        <span className="font-mono text-sm sm:text-base font-bold text-[#241a15] tabular-nums shrink-0">
                          ₹{item.price}
                        </span>
                      </div>

                      {/* Marathi name kicker */}
                      <div className="text-[11px] text-[#8c786a] font-marathi-brand mt-0.5">
                        {lang === 'en' ? item.nameMr : item.nameEn}
                      </div>

                      {/* Description */}
                      <p className="mt-1.5 text-xs text-[#5c4a40] leading-relaxed">
                        {lang === 'en' ? item.descriptionEn : item.descriptionMr}
                      </p>
                    </div>

                    {/* Card Actions */}
                    <div className="mt-3 flex items-center justify-between text-xs pt-1">
                      <div className="text-[10px] text-[#735e52] space-x-1.5">
                        {item.jainAvailable && <span>• Jain Avl.</span>}
                        {item.spicyLevel === 3 && <span className="text-[#9c3418] font-bold">• Hot Thecha</span>}
                        {item.popular && <span className="font-semibold text-[#c88937]">• Favorite</span>}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenCustomizer(item)}
                          className="px-2.5 py-1 text-[11px] border border-[#dcd1be] hover:border-[#9c3418] rounded text-[#524137] hover:text-[#9c3418] transition-colors"
                        >
                          {lang === 'en' ? 'Customize' : 'बदल करा'}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleQuickAdd(item)}
                          className={`px-3 py-1 rounded text-[11px] font-bold uppercase tracking-wider transition-colors ${
                            isAdded
                              ? 'bg-[#2e6930] text-[#fcf8f2]'
                              : 'bg-[#9c3418] hover:bg-[#802810] text-[#fcf8f2]'
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

          {/* Footer Note */}
          <div className="mt-10 pt-6 border-t border-[#e8dfd1] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#735e52]">
            <div>
              <strong>Pure Vegetarian Counter</strong> · Fresh coconut grated twice daily in Sadar Bazar.
            </div>
            <div>
              Takeaway parcels packaged hygienically for roadside delivery (+₹5 per box).
            </div>
          </div>
        </div>

      </div>

      {/* Item Customizer Modal */}
      {customizingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#241a15]/65 backdrop-blur-xs">
          <div className="bg-[#fffdfa] border border-[#dcd1be] rounded-xl max-w-md w-full p-6 shadow-2xl text-[#241a15]">
            <div className="flex justify-between items-start mb-4 border-b border-[#f4ecdf] pb-3">
              <div>
                <h3 className="font-editorial text-lg font-bold">
                  {lang === 'en' ? customizingItem.nameEn : customizingItem.nameMr}
                </h3>
                <span className="font-mono text-xs font-bold text-[#9c3418]">
                  Base Price: ₹{customizingItem.price}
                </span>
              </div>
              <button
                onClick={() => setCustomizingItem(null)}
                className="text-[#8c786a] hover:text-[#241a15] text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              {/* Packaging */}
              <div>
                <label className="block font-bold text-[#524137] mb-1.5 uppercase tracking-wider text-[10px]">
                  Service Mode
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPackagingType('dine-in')}
                    className={`p-2.5 rounded border text-left ${
                      packagingType === 'dine-in'
                        ? 'border-[#9c3418] bg-[#9c3418]/10 font-bold text-[#9c3418]'
                        : 'border-[#e8dfd1] text-[#524137]'
                    }`}
                  >
                    Dine-in Plate
                  </button>
                  <button
                    type="button"
                    onClick={() => setPackagingType('takeaway')}
                    className={`p-2.5 rounded border text-left ${
                      packagingType === 'takeaway'
                        ? 'border-[#9c3418] bg-[#9c3418]/10 font-bold text-[#9c3418]'
                        : 'border-[#e8dfd1] text-[#524137]'
                    }`}
                  >
                    Takeaway Parcel (+₹5)
                  </button>
                </div>
              </div>

              {/* Spice */}
              <div>
                <label className="block font-bold text-[#524137] mb-1.5 uppercase tracking-wider text-[10px]">
                  Spice Preference
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['mild', 'medium', 'spicy'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSpicePreference(lvl)}
                      className={`py-2 px-2 text-center rounded border capitalize ${
                        spicePreference === lvl
                          ? 'border-[#9c3418] bg-[#9c3418] text-white font-bold'
                          : 'border-[#e8dfd1] text-[#524137]'
                      }`}
                    >
                      {lvl === 'mild' ? 'Mild (कमी)' : lvl === 'medium' ? 'Medium (मध्यम)' : 'Thecha (झणझणीत)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Extra Chutney & Cheese */}
              <div className="space-y-2 pt-1 border-t border-[#f4ecdf]">
                <label className="flex items-center justify-between cursor-pointer">
                  <span>Extra Fresh Coconut Chutney</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-[#2e6930] font-bold">Free</span>
                    <input
                      type="checkbox"
                      checked={extraChutney}
                      onChange={(e) => setExtraChutney(e.target.checked)}
                      className="accent-[#9c3418]"
                    />
                  </div>
                </label>

                {(customizingItem.category === 'sandwiches' || customizingItem.category === 'pav-bhaji' || customizingItem.category === 'fast-food') && (
                  <label className="flex items-center justify-between cursor-pointer">
                    <span>Extra Grated Amul Cheese</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-mono text-[#9c3418] font-bold">+₹25</span>
                      <input
                        type="checkbox"
                        checked={extraCheese}
                        onChange={(e) => setExtraCheese(e.target.checked)}
                        className="accent-[#9c3418]"
                      />
                    </div>
                  </label>
                )}
              </div>

              {/* Confirm */}
              <div className="pt-3 border-t border-[#f4ecdf] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#8c786a]">Final Item Price</span>
                  <div className="font-mono text-base font-bold text-[#9c3418]">
                    ₹{customizingItem.price + (extraCheese ? 25 : 0) + (packagingType === 'takeaway' ? 5 : 0)}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCustomizingItem(null)}
                    className="px-3 py-2 text-[#735e52]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmCustomizer}
                    className="px-4 py-2 bg-[#9c3418] hover:bg-[#802810] text-white font-bold rounded"
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
