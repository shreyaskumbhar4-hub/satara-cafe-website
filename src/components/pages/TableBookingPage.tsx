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
    <div className="py-12 md:py-20 bg-[#FBF6EE] text-[#241810] animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header with botanical flourish */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-bold text-[#758A6F] mb-1 block">
            {lang === 'en' ? 'Gatherings & Friends Table' : 'कट्टा आरक्षण'}
          </span>
          <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-[#241810] tracking-tight">
            {lang === 'en' ? 'Reserve a Katta Table' : 'कट्ट्यावर जागा राखून ठेवा'}
          </h1>
          <div className="flex justify-center my-2 text-[#758A6F]">
            <span>❧ ✦ ☙</span>
          </div>
          <p className="text-xs sm:text-sm text-[#5F4B3C] mt-2 leading-relaxed">
            {lang === 'en'
              ? 'Coming with friends for an evening sandwich katta, or heading down from Ajinkyatara for a morning breakfast ride? Let us know so we have hot dosas and seats ready.'
              : 'मित्रांसोबत संध्याकाळच्या गप्पांसाठी किंवा सकाळी सायकलिंगनंतरच्या नाश्त्यासाठी — अगोदर कळवा, आम्ही टेबल सज्ज ठेवू.'}
          </p>
        </div>

        {/* Confirmation Slip */}
        {bookingConfirmed ? (
          <div className="bg-[#FFFDF9] border border-[#C5D4C1] rounded-[32px] p-8 sm:p-10 shadow-lg text-center space-y-4 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#E1EADA] text-[#586B52] font-bold text-2xl flex items-center justify-center mx-auto border border-[#C5D4C1]">
              ✓
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#241810]">
              {lang === 'en' ? 'Booking Request Forwarded!' : 'आरक्षण विनंती पाठवली!'}
            </h2>
            <div className="text-xs text-[#5F4B3C] bg-[#FBF6EE] p-5 rounded-2xl space-y-1.5 text-left font-mono border border-[#DECEB7]">
              <div><strong>Name:</strong> {formData.name}</div>
              <div><strong>Party:</strong> {formData.partySize} Guests</div>
              <div><strong>Date & Time:</strong> {formData.date} at {formData.timeSlot}</div>
              <div><strong>Occasion:</strong> {formData.occasion}</div>
            </div>
            <p className="text-xs text-[#758A6F]">
              {lang === 'en'
                ? 'Your WhatsApp message was sent to Satara Cafe counter at 075586 81179. No advance payment required!'
                : 'आपली व्हॉट्सअ‍ॅप नोंद ०७५५८६ ८११७९ वर पोहोचली आहे. कोणतेही आगाऊ शुल्क नाही!'}
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <a
                href={`tel:${CAFE_INFO.phone}`}
                className="px-6 py-2.5 bg-[#241810] text-[#FBF6EE] text-xs font-bold rounded-full hover:bg-[#D37432] transition-colors"
              >
                Call to Confirm: {CAFE_INFO.phone}
              </a>
              <button
                type="button"
                onClick={() => setBookingConfirmed(false)}
                className="px-4 py-2.5 text-xs text-[#5F4B3C] underline hover:text-[#241810]"
              >
                Book Another Table
              </button>
            </div>
          </div>
        ) : (
          /* The Interactive Booking Form */
          <div className="bg-[#FFFDF9] border border-[#DECEB7] rounded-[32px] p-6 sm:p-10 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              
              {/* Row 1: Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-[#586B52] mb-1.5 uppercase tracking-wider text-[10px]">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rushikesh Patil"
                    className="w-full px-4 py-2.5 bg-[#FBF6EE] border border-[#DECEB7] rounded-xl text-sm text-[#241810] focus:outline-none focus:border-[#D37432]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#586B52] mb-1.5 uppercase tracking-wider text-[10px]">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 98XXXXXXXX"
                    className="w-full px-4 py-2.5 bg-[#FBF6EE] border border-[#DECEB7] rounded-xl text-sm text-[#241810] focus:outline-none focus:border-[#D37432]"
                  />
                </div>
              </div>

              {/* Row 2: Party Size Selection */}
              <div>
                <label className="block font-bold text-[#586B52] mb-2 uppercase tracking-wider text-[10px]">
                  Number of Guests
                </label>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setFormData({ ...formData, partySize: num })}
                      className={`px-4 py-2 rounded-full font-mono text-xs font-bold border transition-all ${
                        formData.partySize === num
                          ? 'bg-[#D37432] text-white border-[#B2581A] shadow-xs'
                          : 'bg-[#FBF6EE] text-[#5F4B3C] border-[#DECEB7] hover:bg-[#F3E9D7]'
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
                  <label className="block font-bold text-[#586B52] mb-1.5 uppercase tracking-wider text-[10px]">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FBF6EE] border border-[#DECEB7] rounded-xl text-sm text-[#241810] focus:outline-none focus:border-[#D37432]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#586B52] mb-1.5 uppercase tracking-wider text-[10px]">
                    Preferred Time Slot
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#FBF6EE] border border-[#DECEB7] rounded-xl text-sm text-[#241810] focus:outline-none focus:border-[#D37432]"
                  >
                    {timeSlots.map((ts) => (
                      <option key={ts} value={ts}>{ts}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Occasion */}
              <div>
                <label className="block font-bold text-[#586B52] mb-1.5 uppercase tracking-wider text-[10px]">
                  Gathering Occasion
                </label>
                <div className="flex flex-wrap gap-2">
                  {occasions.map((occ) => (
                    <button
                      key={occ}
                      type="button"
                      onClick={() => setFormData({ ...formData, occasion: occ })}
                      className={`px-4 py-2 text-left rounded-full border text-xs leading-snug transition-all ${
                        formData.occasion === occ
                          ? 'border-[#D37432] bg-[#FDE8D7] font-bold text-[#D37432] shadow-xs'
                          : 'border-[#DECEB7] bg-[#FBF6EE] text-[#5F4B3C] hover:bg-[#F3E9D7]'
                      }`}
                    >
                      {occ}
                    </button>
                  ))}
                </div>
              </div>

              {/* Row 5: Special Note */}
              <div>
                <label className="block font-bold text-[#586B52] mb-1.5 uppercase tracking-wider text-[10px]">
                  Special Request or Pre-order
                </label>
                <input
                  type="text"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Keep 4 filter coffees and 4 masala dosas ready on arrival, corner wooden table..."
                  className="w-full px-4 py-2.5 bg-[#FBF6EE] border border-[#DECEB7] rounded-xl text-xs text-[#241810] focus:outline-none focus:border-[#D37432]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-[#E7DBCA] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[11px] text-[#758A6F]">
                  No deposit or card required. Instant WhatsApp notification to 075586 81179.
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#D37432] hover:bg-[#B2581A] text-white text-xs uppercase tracking-wider font-bold rounded-full shadow-md hover:shadow-lg transition-all text-center"
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
