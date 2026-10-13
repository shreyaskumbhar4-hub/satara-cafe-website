import React, { useState } from 'react';
import { CAFE_INFO } from '../../data/cafeData';
import { ActivePage, CartItem, Language } from '../../types';

interface OrderSlipPageProps {
  lang: Language;
  cartItems: CartItem[];
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
  onNavigate: (page: ActivePage) => void;
}

export const OrderSlipPage: React.FC<OrderSlipPageProps> = ({
  lang,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigate,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [serviceType, setServiceType] = useState<'takeaway' | 'dine-in'>('takeaway');
  const [chefNote, setChefNote] = useState('');
  const [orderSent, setOrderSent] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => {
    const pkg = (item.customization?.packaging === 'takeaway' || serviceType === 'takeaway') ? 5 : 0;
    const cheese = item.customization?.extraCheese ? 25 : 0;
    return acc + (item.menuItem.price + pkg + cheese) * item.quantity;
  }, 0);

  const packagingCharges = serviceType === 'takeaway'
    ? cartItems.reduce((acc, item) => acc + 5 * item.quantity, 0)
    : 0;

  const grandTotal = subtotal;

  const handleSendToWhatsApp = () => {
    let msg = `*Satara Cafe (सातारा कॅफे) - Table Order Slip*\n`;
    msg += `--------------------------------\n`;
    msg += `*Order Type:* ${serviceType === 'takeaway' ? 'Takeaway Parcel' : `Dine-In (Table ${tableNumber || 'Counter'})`}\n`;
    if (customerName.trim()) msg += `*Customer:* ${customerName.trim()}\n`;
    if (customerPhone.trim()) msg += `*Contact:* ${customerPhone.trim()}\n`;
    msg += `--------------------------------\n`;
    msg += `*Items:*\n`;

    cartItems.forEach((ci, idx) => {
      const singlePrice = ci.menuItem.price + (ci.customization?.extraCheese ? 25 : 0) + (serviceType === 'takeaway' ? 5 : 0);
      msg += `${idx + 1}. ${ci.menuItem.nameEn} x ${ci.quantity} - ₹${singlePrice * ci.quantity}\n`;
      if (ci.isCombo && ci.comboDetails) {
        msg += `   └ [Combo Deal: ${ci.comboDetails}]\n`;
      }
      if (ci.customization?.spiceLevel && ci.customization.spiceLevel !== 'medium') {
        msg += `   └ [Spice: ${ci.customization.spiceLevel}]\n`;
      }
    });

    msg += `--------------------------------\n`;
    if (packagingCharges > 0) msg += `Packaging Fee: ₹${packagingCharges}\n`;
    if (chefNote.trim()) msg += `*Note:* "${chefNote.trim()}"\n`;
    msg += `*Grand Total: ₹${grandTotal}*\n`;
    msg += `--------------------------------\n`;
    msg += `_Pickup Counter: Sadar Bazar, Satara 415001 (Near Sainik Bank)_\n`;

    const url = `https://wa.me/${CAFE_INFO.phoneRaw}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setOrderSent(true);
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div className="py-12 md:py-20 bg-[#fcf8f2] text-[#241a15] animate-fade-in">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-[11px] uppercase tracking-widest font-bold text-[#9c3418] mb-1">
            {lang === 'en' ? 'Direct Counter Desk' : 'कट्टा पावती डेस्क'}
          </div>
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-[#241a15]">
            {lang === 'en' ? 'Your Table Order Slip' : 'आपली कच्ची पावती'}
          </h1>
          <p className="text-xs sm:text-sm text-[#735e52] mt-1">
            Review items, choose Dine-In or Parcel, and send directly to 075586 81179 via WhatsApp.
          </p>
        </div>

        {/* Successful Dispatch Banner */}
        {orderSent && (
          <div className="mb-8 p-6 rounded-xl bg-[#e8f2e8] border border-[#c2ddc2] text-[#235e23] text-center space-y-2">
            <div className="text-xl font-bold font-editorial">
              {lang === 'en' ? 'Order Slip Sent to Satara Cafe!' : 'ऑर्डर पावती व्हॉट्सअ‍ॅपवर पाठवली!'}
            </div>
            <p className="text-xs text-[#2e6930] max-w-md mx-auto">
              {lang === 'en'
                ? 'Your order was sent to the kitchen at Sadar Bazar. We will verify preparation time immediately.'
                : 'आपली ऑर्डर कॅफे कर्मचाऱ्यांना प्राप्त झाली आहे. तयारीची वेळ कळवली जाईल.'}
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <a
                href={`tel:${CAFE_INFO.phone}`}
                className="px-4 py-2 bg-[#2e6930] text-white text-xs font-bold rounded"
              >
                Call: {CAFE_INFO.phone}
              </a>
              <button
                type="button"
                onClick={() => {
                  setOrderSent(false);
                  onClearCart();
                }}
                className="px-4 py-2 text-xs text-[#2e6930] underline"
              >
                Create New Order
              </button>
            </div>
          </div>
        )}

        {/* Empty State */}
        {cartItems.length === 0 ? (
          <div className="bg-[#fffdfa] border-2 border-[#e8dfd1] rounded-2xl p-10 text-center space-y-4 shadow-xs">
            <div className="w-14 h-14 rounded-full bg-[#f4ecdf] text-[#9c3418] font-editorial text-2xl font-bold flex items-center justify-center mx-auto">
              0
            </div>
            <h2 className="font-editorial text-2xl font-bold text-[#241a15]">
              {lang === 'en' ? 'Your Order Slip is Empty' : 'पावतीवर कोणताही पदार्थ नाही'}
            </h2>
            <p className="text-xs text-[#735e52] max-w-sm mx-auto leading-relaxed">
              {lang === 'en'
                ? 'Add your favorite banana leaf dosas, wada pav, grilled sandwiches, or cutting chai from the artisanal menu.'
                : 'मेनूमधून डोसा, वडापाव, सँडविच किंवा कटींग चहा निवडून पावतीमध्ये जोडा.'}
            </p>
            <button
              onClick={() => onNavigate('menu')}
              type="button"
              className="mt-2 px-6 py-3 bg-[#9c3418] hover:bg-[#802810] text-[#fcf8f2] text-xs uppercase tracking-wider font-bold rounded shadow-xs"
            >
              {lang === 'en' ? 'Browse Menu & Combos' : 'मेनू कार्ड पहा'}
            </button>
          </div>
        ) : (
          /* The Paper Order Slip */
          <div className="bg-[#fffdfa] border border-[#e2d6c3] rounded-2xl shadow-lg overflow-hidden relative paper-pinned">
            
            {/* Perforated Top Tear Strip */}
            <div className="h-3 bg-[#f4ecdf] border-b-2 border-dashed border-[#dcd1be]" />

            {/* Slip Header Lockup */}
            <div className="p-6 sm:p-8 border-b border-[#f4ecdf] bg-[#fcf8f2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-editorial text-2xl font-bold text-[#241a15]">Satara Cafe</span>
                  <span className="font-marathi-brand text-base text-[#9c3418]">सातारा कॅफे</span>
                </div>
                <div className="text-xs text-[#735e52]">
                  Sadar Bazar, Satara 415001 · Near Sainik Bank
                </div>
                <div className="text-[11px] font-mono text-[#8c786a] mt-0.5">
                  Tel: {CAFE_INFO.phone} · Plus Code: {CAFE_INFO.plusCode}
                </div>
              </div>

              {/* Service Type Segmented Toggle */}
              <div className="flex items-center gap-1 bg-[#f4ecdf] p-1 rounded-lg border border-[#e2d6c3]">
                <button
                  type="button"
                  onClick={() => setServiceType('takeaway')}
                  className={`px-3 py-1.5 text-xs font-bold rounded transition-colors ${
                    serviceType === 'takeaway'
                      ? 'bg-[#9c3418] text-white shadow-xs'
                      : 'text-[#524137] hover:text-[#241a15]'
                  }`}
                >
                  Takeaway Parcel
                </button>
                <button
                  type="button"
                  onClick={() => setServiceType('dine-in')}
                  className={`px-3 py-1.5 text-xs font-bold rounded transition-colors ${
                    serviceType === 'dine-in'
                      ? 'bg-[#9c3418] text-white shadow-xs'
                      : 'text-[#524137] hover:text-[#241a15]'
                  }`}
                >
                  Dine-In Table
                </button>
              </div>
            </div>

            {/* Customer Contact Details */}
            <div className="p-6 sm:p-8 border-b border-[#f4ecdf] bg-[#fffdfa] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#735e52] mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Anand Shinde"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#fcf8f2] border border-[#dcd1be] rounded text-[#241a15] focus:outline-none focus:border-[#9c3418]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#735e52] mb-1">
                  WhatsApp / Phone
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 98XXXXXXXX"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-[#fcf8f2] border border-[#dcd1be] rounded text-[#241a15] focus:outline-none focus:border-[#9c3418]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#735e52] mb-1">
                  {serviceType === 'dine-in' ? 'Table Number' : 'Pickup Time'}
                </label>
                <input
                  type="text"
                  placeholder={serviceType === 'dine-in' ? 'e.g. Table 4' : 'e.g. In 15 mins'}
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-[#fcf8f2] border border-[#dcd1be] rounded text-[#241a15] focus:outline-none focus:border-[#9c3418]"
                />
              </div>
            </div>

            {/* Itemized Order Lines */}
            <div className="p-6 sm:p-8 space-y-4">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#735e52] flex justify-between border-b border-[#f4ecdf] pb-2">
                <span>Item & Preparation</span>
                <span className="text-right">Qty & Amount</span>
              </div>

              <div className="divide-y divide-[#f4ecdf]">
                {cartItems.map((ci) => {
                  const singlePrice = ci.menuItem.price + (ci.customization?.extraCheese ? 25 : 0) + (serviceType === 'takeaway' ? 5 : 0);
                  const lineTotal = singlePrice * ci.quantity;

                  return (
                    <div key={ci.cartId} className="py-3 flex items-start justify-between gap-4 text-xs">
                      <div>
                        <div className="font-bold text-sm text-[#241a15]">
                          {lang === 'en' ? ci.menuItem.nameEn : ci.menuItem.nameMr}
                        </div>
                        <div className="text-[11px] text-[#735e52]">
                          ₹{ci.menuItem.price} base
                          {ci.customization?.extraCheese && <span> + ₹25 cheese</span>}
                          {serviceType === 'takeaway' && <span> + ₹5 pack</span>}
                        </div>
                        {ci.isCombo && (
                          <div className="text-[10px] font-bold text-[#2e6930] mt-0.5">
                            Katta Combo Deal Bundle
                          </div>
                        )}
                        {ci.customization?.spiceLevel && (
                          <div className="text-[10px] text-[#8c786a]">
                            Spice: {ci.customization.spiceLevel}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5 bg-[#f4ecdf] px-2 py-1 rounded border border-[#e2d6c3]">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(ci.cartId, -1)}
                            className="font-bold px-1 text-[#524137] hover:text-[#241a15]"
                          >
                            -
                          </button>
                          <span className="font-mono font-bold tabular-nums w-4 text-center">
                            {ci.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(ci.cartId, 1)}
                            className="font-bold px-1 text-[#524137] hover:text-[#241a15]"
                          >
                            +
                          </button>
                        </div>

                        <div className="font-mono font-bold text-right tabular-nums w-14 text-sm text-[#241a15]">
                          ₹{lineTotal}
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(ci.cartId)}
                          className="text-[#a39082] hover:text-[#9c3418] text-base p-1"
                          title="Remove item"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Special Cooking Note Input */}
              <div className="pt-3 border-t border-[#f4ecdf]">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#735e52] mb-1">
                  Kitchen Instruction
                </label>
                <input
                  type="text"
                  placeholder="e.g. Roasted crisp on tawa, extra coconut chutney on the side..."
                  value={chefNote}
                  onChange={(e) => setChefNote(e.target.value)}
                  className="w-full px-3 py-2 bg-[#fcf8f2] border border-[#dcd1be] rounded text-xs text-[#241a15] focus:outline-none focus:border-[#9c3418]"
                />
              </div>

              {/* Bill Totals & Grand Amount */}
              <div className="pt-4 border-t-2 border-dashed border-[#e2d6c3] space-y-1.5 text-xs">
                <div className="flex justify-between text-[#735e52]">
                  <span>Items Count</span>
                  <span className="font-mono">{cartItems.reduce((acc, i) => acc + i.quantity, 0)} items</span>
                </div>
                {packagingCharges > 0 && (
                  <div className="flex justify-between text-[#735e52]">
                    <span>Takeaway Container Packing</span>
                    <span className="font-mono">₹{packagingCharges}</span>
                  </div>
                )}
                <div className="flex justify-between items-baseline pt-2 border-t border-[#f4ecdf]">
                  <span className="font-editorial text-lg font-bold text-[#241a15]">
                    {lang === 'en' ? 'Grand Total to Pay' : 'एकूण रक्कम'}
                  </span>
                  <span className="font-mono text-2xl font-bold text-[#9c3418] tabular-nums">
                    ₹{grandTotal}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions & Dispatch Bar */}
            <div className="p-6 sm:p-8 bg-[#fcf8f2] border-t border-[#e8dfd1] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handlePrintSlip}
                  className="px-4 py-3 border border-[#dcd1be] hover:border-[#241a15] text-[#524137] hover:text-[#241a15] text-xs font-bold rounded transition-colors"
                >
                  Print Slip 🖨️
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('menu')}
                  className="px-4 py-3 border border-[#dcd1be] text-[#524137] hover:text-[#241a15] text-xs font-bold rounded transition-colors"
                >
                  + Add More
                </button>
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleSendToWhatsApp}
                  className="flex-1 sm:flex-none px-6 py-3.5 bg-[#2e6930] hover:bg-[#255627] text-white text-xs uppercase tracking-wider font-bold rounded shadow-md transition-all text-center"
                >
                  Send Order via WhatsApp (075586 81179)
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
