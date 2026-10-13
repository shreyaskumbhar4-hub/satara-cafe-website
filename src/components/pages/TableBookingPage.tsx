import React, { useState } from 'react';
import { CAFE_INFO } from '../../data/cafeData';
import { Language, TableBooking } from '../../types';

interface TableBookingPageProps {
  lang: Language;
}

export const TableBookingPage: React.FC<TableBookingPageProps> = ({ lang }) => {
  const [formData, setFormData] = useState<TableBooking>({
    name: '',
    phone: '',
    partySize: 4,
    date: new Date().toISOString().split('T')[0],
    timeSlot: '5:30 PM',
    occasion: 'College Katta Catchup',
    notes: '',
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const timeSlots = [
    '8:00 AM',
    '9:30 AM',
    '11:00 AM',
    '1:00 PM',
    '4:30 PM',
    '5:30 PM',
    '7:00 PM',
    '8:30 PM',
    '9:30 PM',
  ];

  const occasions = [
    'Morning Cycling / Ride Breakfast',
    'Evening College Katta Catchup',
    'Family Weekend Tiffin',
    'Birthday Treat / Friend Gathering',
    'Highway Travelers Quick Halt',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    let msg = `*Satara Cafe (सातारा कॅफे) - Table Booking Request*\n`;
    msg += `--------------------------------\n`;
    msg += `*Name:* ${formData.name.trim()}\n`;
    msg += `*Contact:* ${formData.phone.trim()}\n`;
    msg += `*Party Size:* ${formData.partySize} Guests\n`;
    msg += `*Date & Time:* ${formData.date} at ${formData.timeSlot}\n`;
    msg += `*Occasion:* ${formData.occasion}\n`;
    if (formData.notes?.trim()) {
      msg += `*Special Note:* "${formData.notes.trim()}"\n`;
    }
    msg += `--------------------------------\n`;
    msg += `_Location: Sadar Bazar, Satara_\n`;

    const url = `https://wa.me/${CAFE_INFO.phoneRaw}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setBookingConfirmed(true);
  };

  return (
    <div className="py-12 md:py-20 bg-[#fcf8f2] text-[#241a15] animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-[11px] uppercase tracking-widest font-bold text-[#9c3418] mb-1">
            {lang === 'en' ? 'Gatherings & Friends Table' : 'कट्टा आरक्षण'}
          </div>
          <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-[#241a15]">
            {lang === 'en' ? 'Reserve a Katta Table' : 'कट्ट्यावर जागा राखून ठेवा'}
          </h1>
          <p className="text-xs sm:text-sm text-[#735e52] mt-2 leading-relaxed">
            {lang === 'en'
              ? 'Coming with friends for an evening sandwich katta, or heading down from Ajinkyatara for a morning breakfast ride? Let us know so we have hot dosas and seats ready.'
              : 'मित्रांसोबत संध्याकाळच्या गप्पांसाठी किंवा सकाळी सायकलिंगनंतरच्या नाश्त्यासाठी — अगोदर कळवा, आम्ही टेबल सज्ज ठेवू.'}
          </p>
        </div>

        {/* Confirmation Slip */}
        {bookingConfirmed ? (
          <div className="bg-[#fffdfa] border-2 border-[#2e6930] rounded-2xl p-8 sm:p-10 shadow-lg text-center space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#e8f2e8] text-[#2e6930] font-bold text-2xl flex items-center justify-center mx-auto">
              ✓
            </div>
            <h2 className="font-editorial text-2xl font-bold text-[#241a15]">
              {lang === 'en' ? 'Booking Request Forwarded!' : 'आरक्षण विनंती पाठवली!'}
            </h2>
            <div className="text-xs text-[#524137] bg-[#f4ecdf] p-4 rounded-lg space-y-1 text-left font-mono">
              <div><strong>Name:</strong> {formData.name}</div>
              <div><strong>Party:</strong> {formData.partySize} Guests</div>
              <div><strong>Date & Time:</strong> {formData.date} at {formData.timeSlot}</div>
              <div><strong>Occasion:</strong> {formData.occasion}</div>
            </div>
            <p className="text-xs text-[#735e52]">
              {lang === 'en'
                ? 'Your WhatsApp message was sent to Satara Cafe counter at 075586 81179. No advance payment required!'
                : 'आपली व्हॉट्सअ‍ॅप नोंद ०७५५८६ ८११७९ वर पोहोचली आहे. कोणतेही आगाऊ शुल्क नाही!'}
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <a
                href={`tel:${CAFE_INFO.phone}`}
                className="px-5 py-2.5 bg-[#241a15] text-[#fcf8f2] text-xs font-bold rounded"
              >
                Call to Confirm: {CAFE_INFO.phone}
              </a>
              <button
                type="button"
                onClick={() => setBookingConfirmed(false)}
                className="px-4 py-2.5 text-xs text-[#735e52] underline"
              >
                Book Another Table
              </button>
            </div>
          </div>
        ) : (
          /* The Interactive Booking Form */
          <div className="bg-[#fffdfa] border border-[#e2d6c3] rounded-2xl p-6 sm:p-10 shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              
              {/* Row 1: Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#241a15] mb-1.5 uppercase tracking-wider text-[10px]">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rushikesh Patil"
                    className="w-full px-3.5 py-2.5 bg-[#fcf8f2] border border-[#dcd1be] rounded-lg text-sm text-[#241a15] focus:outline-none focus:border-[#9c3418]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#241a15] mb-1.5 uppercase tracking-wider text-[10px]">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 98XXXXXXXX"
                    className="w-full px-3.5 py-2.5 bg-[#fcf8f2] border border-[#dcd1be] rounded-lg text-sm text-[#241a15] focus:outline-none focus:border-[#9c3418]"
                  />
                </div>
              </div>

              {/* Row 2: Party Size Selection */}
              <div>
                <label className="block font-bold text-[#241a15] mb-2 uppercase tracking-wider text-[10px]">
                  Number of Guests
                </label>
                <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setFormData({ ...formData, partySize: num })}
                      className={`py-2 rounded-lg font-mono text-sm font-bold border transition-colors ${
                        formData.partySize === num
                          ? 'bg-[#9c3418] text-white border-[#802810]'
                          : 'bg-[#fcf8f2] text-[#524137] border-[#dcd1be] hover:border-[#c4b59f]'
                      }`}
                    >
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 3: Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#241a15] mb-1.5 uppercase tracking-wider text-[10px]">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#fcf8f2] border border-[#dcd1be] rounded-lg text-sm text-[#241a15] focus:outline-none focus:border-[#9c3418]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#241a15] mb-1.5 uppercase tracking-wider text-[10px]">
                    Preferred Time Slot
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#fcf8f2] border border-[#dcd1be] rounded-lg text-sm text-[#241a15] focus:outline-none focus:border-[#9c3418]"
                  >
                    {timeSlots.map((ts) => (
                      <option key={ts} value={ts}>{ts}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Occasion */}
              <div>
                <label className="block font-bold text-[#241a15] mb-1.5 uppercase tracking-wider text-[10px]">
                  Gathering Occasion
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {occasions.map((occ) => (
                    <button
                      key={occ}
                      type="button"
                      onClick={() => setFormData({ ...formData, occasion: occ })}
                      className={`p-2.5 text-left rounded-lg border text-xs leading-snug transition-colors ${
                        formData.occasion === occ
                          ? 'border-[#9c3418] bg-[#9c3418]/10 font-bold text-[#9c3418]'
                          : 'border-[#dcd1be] bg-[#fcf8f2] text-[#524137] hover:border-[#c4b59f]'
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 5: Special Note */}
              <div>
                <label className="block font-bold text-[#241a15] mb-1.5 uppercase tracking-wider text-[10px]">
                  Special Request or Pre-order
                </label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Keep 4 filter coffees and 4 masala dosas ready on arrival, corner wooden table..."
                  className="w-full px-3.5 py-2.5 bg-[#fcf8f2] border border-[#dcd1be] rounded-lg text-xs text-[#241a15] focus:outline-none focus:border-[#9c3418]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-[#f4ecdf] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[11px] text-[#735e52]">
                  No deposit or card required. Instant WhatsApp notification to 075586 81179.
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#9c3418] hover:bg-[#802810] text-[#fcf8f2] text-xs uppercase tracking-wider font-bold rounded-lg shadow-md transition-all text-center"
                >
                  Send Table Request to WhatsApp
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
