import React, { useState } from 'react';
import { CartItem, Language } from '../types';
import { CAFE_INFO } from '../data/cafeData';

interface TableSlipDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
  lang: Language;
}

export const TableSlipDrawer: React.FC<TableSlipDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  lang,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [serviceType, setServiceType] = useState<'takeaway' | 'dine-in'>('takeaway');
  const [orderSent, setOrderSent] = useState(false);

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((acc, item) => {
    const pkg = item.customization.packaging === 'takeaway' ? 5 : 0;
    const cheese = item.customization.extraCheese ? 25 : 0;
    return acc + (item.menuItem.price + pkg + cheese) * item.quantity;
  }, 0);

  const handleSendWhatsApp = () => {
    let msg = `*Satara Cafe (सातारा कॅफे) - Order Slip*\n`;
    msg += `--------------------------------\n`;
    msg += `*Order:* ${serviceType === 'takeaway' ? 'Takeaway Parcel' : 'Dine-In'}\n`;
    if (customerName.trim()) msg += `*Name:* ${customerName.trim()}\n`;
    if (customerPhone.trim()) msg += `*Contact:* ${customerPhone.trim()}\n`;
    msg += `--------------------------------\n`;
    
    cartItems.forEach((ci, idx) => {
      msg += `${idx + 1}. ${ci.menuItem.nameEn} x ${ci.quantity} - ₹${ci.menuItem.price * ci.quantity}\n`;
    });

    msg += `--------------------------------\n`;
    msg += `*Total: ₹${totalAmount}*\n`;
    msg += `_Pickup at Sadar Bazar, Satara_\n`;

    const url = `https://wa.me/${CAFE_INFO.phoneRaw}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setOrderSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#241a15]/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div 
        className="w-full max-w-md bg-[#fffdfa] border-l border-[#dcd1be] text-[#241a15] flex flex-col h-full shadow-2xl relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Paper Tear Line Aesthetic */}
        <div className="h-2 bg-[#f4ecdf] border-b border-[#e2d6c3] border-dashed" />

        {/* Slip Header */}
        <div className="p-5 border-b border-[#e8dfd1] bg-[#fcf8f2] flex items-center justify-between">
          <div>
            <div className="font-editorial text-xl font-bold tracking-tight text-[#241a15]">
              Satara Cafe <span className="font-marathi-brand text-[#9c3418] text-sm">सातारा कॅफे</span>
            </div>
            <div className="text-[11px] text-[#735e52]">
              Table Order Slip · Sadar Bazar, Satara
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 text-[#735e52] hover:text-[#241a15] text-sm font-bold"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body Content */}
        {orderSent ? (
          <div className="p-8 flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#e8f2e8] text-[#2e6930] flex items-center justify-center font-bold text-lg">
              ✓
            </div>
            <h3 className="font-editorial text-xl font-bold text-[#241a15]">
              {lang === 'en' ? 'Slip Forwarded to WhatsApp' : 'ऑर्डर पावती पाठवली'}
            </h3>
            <p className="text-xs text-[#5c4a40] max-w-xs leading-relaxed">
              {lang === 'en'
                ? 'Your order details have opened in WhatsApp to 075586 81179. The kitchen will prepare it shortly!'
                : 'आपली ऑर्डर व्हॉट्सअ‍ॅपवर उघडली गेली आहे. स्वयंपाकघरात तयारी सुरू होईल!'}
            </p>
            <div className="pt-2 flex flex-col w-full gap-2">
              <a
                href={`tel:${CAFE_INFO.phone}`}
                className="w-full py-2.5 px-4 bg-[#241a15] hover:bg-[#9c3418] text-[#fcf8f2] text-xs font-bold rounded transition-colors text-center"
              >
                {lang === 'en' ? `Call Counter (${CAFE_INFO.phone})` : `फोन करा (${CAFE_INFO.phone})`}
              </a>
              <button
                type="button"
                onClick={() => {
                  setOrderSent(false);
                  onClearCart();
                  onClose();
                }}
                className="py-2 text-xs text-[#735e52] hover:text-[#241a15]"
              >
                {lang === 'en' ? 'Clear & Start Over' : 'नवीन पावती'}
              </button>
            </div>
          </div>
        ) : cartItems.length === 0 ? (
          <div className="p-8 flex-1 flex flex-col items-center justify-center text-center text-[#735e52] space-y-3">
            <div className="font-editorial text-lg text-[#241a15]">
              {lang === 'en' ? 'No Items on the Slip' : 'पावती रिकामी आहे'}
            </div>
            <p className="text-xs max-w-xs text-[#8c786a]">
              {lang === 'en'
                ? 'Browse the menu and click "+ Add" on any dosa, wada pav, sandwich, or chai.'
                : 'मेनूमधील कोणताही पदार्थ निवडून "+ जोडा" वर क्लिक करा.'}
            </p>
            <button
              onClick={onClose}
              type="button"
              className="mt-2 px-4 py-2 bg-[#241a15] text-[#fcf8f2] text-xs uppercase tracking-wider font-bold rounded"
            >
              {lang === 'en' ? 'Look at Menu' : 'मेनू पहा'}
            </button>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Slip Itemized Paper Lines */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3 divide-y divide-[#f4ecdf]">
              {cartItems.map((ci) => {
                const itemTotal = ci.menuItem.price * ci.quantity;
                return (
                  <div key={ci.cartId} className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                    <div className="flex-1">
                      <div className="font-bold text-[#241a15]">
                        {lang === 'en' ? ci.menuItem.nameEn : ci.menuItem.nameMr}
                      </div>
                      <div className="text-[11px] text-[#735e52] tabular-nums">
                        ₹{ci.menuItem.price} each
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-[#f4ecdf] px-2 py-1 rounded">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(ci.cartId, -1)}
                        className="font-bold px-1 text-[#524137]"
                      >
                        -
                      </button>
                      <span className="font-mono font-bold tabular-nums w-4 text-center">
                        {ci.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(ci.cartId, 1)}
                        className="font-bold px-1 text-[#524137]"
                      >
                        +
                      </button>
                    </div>

                    <div className="font-mono font-bold text-right tabular-nums w-12 text-[#241a15]">
                      ₹{itemTotal}
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(ci.cartId)}
                      className="text-[#a39082] hover:text-[#9c3418] px-1 text-sm"
                      title="Remove"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Slip Paper Details & Total */}
            <div className="p-5 bg-[#fcf8f2] border-t border-[#e8dfd1] space-y-3 text-xs">
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setServiceType('takeaway')}
                  className={`py-1.5 px-2 text-center rounded border text-xs font-semibold ${
                    serviceType === 'takeaway'
                      ? 'border-[#9c3418] bg-[#9c3418]/10 text-[#9c3418]'
                      : 'border-[#dcd1be] text-[#735e52]'
                  }`}
                >
                  Takeaway Parcel
                </button>
                <button
                  type="button"
                  onClick={() => setServiceType('dine-in')}
                  className={`py-1.5 px-2 text-center rounded border text-xs font-semibold ${
                    serviceType === 'dine-in'
                      ? 'border-[#9c3418] bg-[#9c3418]/10 text-[#9c3418]'
                      : 'border-[#dcd1be] text-[#735e52]'
                  }`}
                >
                  Dine-In Table
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="px-2.5 py-1.5 bg-[#fffdfa] border border-[#dcd1be] rounded text-[#241a15] text-xs focus:outline-none focus:border-[#9c3418]"
                />
                <input
                  type="tel"
                  placeholder="Mobile No."
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="px-2.5 py-1.5 bg-[#fffdfa] border border-[#dcd1be] rounded text-[#241a15] text-xs focus:outline-none focus:border-[#9c3418]"
                />
              </div>

              {/* Dotted slip total */}
              <div className="pt-2 border-t border-[#e2d6c3] border-dashed flex justify-between items-baseline font-bold">
                <span className="font-editorial text-sm text-[#241a15]">
                  {lang === 'en' ? 'Estimated Total' : 'एकूण रक्कम'}
                </span>
                <span className="font-mono text-xl text-[#9c3418] tabular-nums">
                  ₹{totalAmount}
                </span>
              </div>

              {/* Action */}
              <div className="pt-1 space-y-2">
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="w-full py-3 bg-[#2e6930] hover:bg-[#255627] text-[#fcf8f2] text-xs uppercase tracking-wider font-bold rounded transition-colors text-center"
                >
                  Send Order via WhatsApp (075586 81179)
                </button>

                <a
                  href={`tel:${CAFE_INFO.phone}`}
                  className="w-full py-2 bg-[#f4ecdf] hover:bg-[#e8dfd1] text-[#241a15] text-xs font-bold rounded block text-center"
                >
                  Or Call Counter: {CAFE_INFO.phone}
                </a>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
