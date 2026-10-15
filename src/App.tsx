/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/pages/HomePage';
import { MenuPage } from './components/pages/MenuPage';
import { OrderSlipPage } from './components/pages/OrderSlipPage';
import { KitchenCraftPage } from './components/pages/KitchenCraftPage';
import { ReviewsPage } from './components/pages/ReviewsPage';
import { TableBookingPage } from './components/pages/TableBookingPage';
import { LocationPage } from './components/pages/LocationPage';
import { Footer } from './components/Footer';

import { ActivePage, CartCustomization, CartItem, Language, MenuItem } from './types';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'mr' : 'en'));
  };

  const handleNavigate = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddItem = (item: MenuItem, customization?: CartCustomization, quantity: number = 1) => {
    const custom: CartCustomization = customization || {
      spiceLevel: 'medium',
      extraChutney: true,
      extraSambar: true,
      extraCheese: false,
      packaging: 'dine-in',
    };

    const existingIndex = cartItems.findIndex(
      (ci) =>
        ci.menuItem.id === item.id &&
        ci.customization.spiceLevel === custom.spiceLevel &&
        ci.customization.extraCheese === custom.extraCheese &&
        ci.customization.packaging === custom.packaging &&
        !ci.isCombo
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        cartId: `${item.id}-${Date.now()}`,
        menuItem: item,
        quantity,
        customization: custom,
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const handleAddCombo = (comboTitle: string, items: MenuItem[], discountedTotal: number) => {
    const comboMenuItem: MenuItem = {
      id: `combo-${Date.now()}`,
      nameEn: `Katta Combo: ${comboTitle}`,
      nameMr: `कट्टा कॉम्बो: ${items.map((i) => i.nameMr).join(' + ')}`,
      category: 'satara-katta',
      price: discountedTotal,
      descriptionEn: `Bundled Deal (${items.map((i) => i.nameEn).join(', ')})`,
      descriptionMr: `विशेष कॉम्बो पॅक (${items.map((i) => i.nameMr).join(', ')})`,
      veg: true,
    };

    const newComboItem: CartItem = {
      cartId: `combo-${Date.now()}`,
      menuItem: comboMenuItem,
      quantity: 1,
      customization: {
        spiceLevel: 'medium',
        extraChutney: true,
        extraSambar: true,
        extraCheese: false,
        packaging: 'dine-in',
      },
      isCombo: true,
      comboDetails: items.map((i) => i.nameEn).join(' + '),
    };

    setCartItems([...cartItems, newComboItem]);
  };

  const handleUpdateQuantity = (cartId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (cartId: string) => {
    setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartAmount = cartItems.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF6EE] text-[#241810] font-sans antialiased selection:bg-[#D37432] selection:text-white">
      
      {/* Editorial Top Navigation */}
      <Navbar
        lang={lang}
        onToggleLang={toggleLanguage}
        activePage={activePage}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
      />

      {/* Main Multi-Page Dynamic Router */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage
            lang={lang}
            onNavigate={handleNavigate}
            onAddItem={handleAddItem}
          />
        )}

        {activePage === 'menu' && (
          <MenuPage
            lang={lang}
            onAddItem={handleAddItem}
            onAddCombo={handleAddCombo}
          />
        )}

        {activePage === 'order-slip' && (
          <OrderSlipPage
            lang={lang}
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearCart={handleClearCart}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'story-craft' && (
          <KitchenCraftPage
            lang={lang}
          />
        )}

        {activePage === 'reviews' && (
          <ReviewsPage
            lang={lang}
          />
        )}

        {activePage === 'table-booking' && (
          <TableBookingPage
            lang={lang}
          />
        )}

        {activePage === 'location' && (
          <LocationPage
            lang={lang}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        onNavigate={handleNavigate}
      />

      {/* Floating Order Slip Quick Tab */}
      {totalCartCount > 0 && activePage !== 'order-slip' && (
        <aside
          aria-label="Order slip badge"
          className="fixed bottom-5 right-5 z-40"
        >
          <button
            onClick={() => handleNavigate('order-slip')}
            type="button"
            className="flex items-center gap-3 px-5 py-3.5 bg-[#D37432] hover:bg-[#B2581A] text-white text-xs font-bold rounded-full shadow-xl hover:scale-105 transition-all active:scale-95 border border-[#B2581A]"
          >
            <span className="w-5 h-5 rounded-full bg-white text-[#D37432] text-[11px] font-bold flex items-center justify-center tabular-nums shadow-xs">
              {totalCartCount}
            </span>
            <span>{lang === 'en' ? 'View Order Slip' : 'पावती पहा'} · ₹{totalCartAmount}</span>
            <span className="text-xs text-[#FDE8D7] ml-0.5">→</span>
          </button>
        </aside>
      )}

    </div>
  );
}
