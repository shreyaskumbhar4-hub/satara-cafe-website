import React, { useState } from 'react';
import { CAFE_INFO, NEARBY_LANDMARKS, SATARA_ATTRACTIONS } from '../../data/cafeData';
import { Language } from '../../types';

interface LocationPageProps {
  lang: Language;
}

export const LocationPage: React.FC<LocationPageProps> = ({ lang }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [selectedLandmarkIdx, setSelectedLandmarkIdx] = useState(0);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(CAFE_INFO.plusCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${CAFE_INFO.nameEn}, ${CAFE_INFO.address}`);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleShareToPhone = () => {
    const text = `Visit Satara Cafe (सातारा कॅफे) in Sadar Bazar, Satara! Map Plus Code: ${CAFE_INFO.plusCode}. Call: ${CAFE_INFO.phone}. Google Maps: ${CAFE_INFO.googleMapsUrl}`;
    if (navigator.share) {
      navigator.share({
        title: 'Satara Cafe - Sadar Bazar',
        text,
        url: CAFE_INFO.googleMapsUrl,
      }).catch(() => {});
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    }
  };

  const currentLandmark = NEARBY_LANDMARKS[selectedLandmarkIdx];

  return (
    <div className="py-12 md:py-20 bg-[#FBF6EE] text-[#241810] animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header with botanical flourish */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-[#758A6F] mb-1 block">
            {lang === 'en' ? 'Sadar Bazar Location & Satara Guide' : 'पत्ता, मार्ग व पर्यटन'}
          </span>
          <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-[#241810] tracking-tight">
            {lang === 'en' ? 'Finding Us in Satara' : 'सातारा कॅफे पत्ता व संपर्क'}
          </h1>
          <div className="flex justify-center my-2 text-[#758A6F]">
            <span>❧ ✦ ☙</span>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-[#5F4B3C] leading-relaxed max-w-xl mx-auto">
            {lang === 'en'
              ? 'Centrally located in Sadar Bazar right next to the Police Staff Quarter and Sainik Bank. Plenty of roadside two-wheeler parking and easy approach from Powai Naka.'
              : 'सैनिक बँक आणि पोलिस स्टाफ क्वार्टरजवळ, सदर बझारच्या मध्यवर्ती भागात. दुचाकी वाहनांसाठी समोर पुरेशी पार्किंग आणि पोवई नाक्यावरून सहज पोहोचता येणारा रस्ता.'}
          </p>
        </div>

        {/* SECTION 1: Address Card & Interactive Distance Estimator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Left Column: Practical Coordinates */}
          <div className="lg:col-span-5 bg-[#FFFDF9] border border-[#DECEB7] rounded-[28px] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm">
            <div className="space-y-5">
              
              {/* Address */}
              <div>
                <span className="text-[10px] uppercase font-bold text-[#758A6F] tracking-wider block">
                  Postal Address
                </span>
                <p className="font-editorial text-lg font-bold text-[#241810] mt-0.5">
                  {CAFE_INFO.address}
                </p>
                <p className="text-xs text-[#5F4B3C] mt-0.5">
                  {CAFE_INFO.landmark}
                </p>
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="mt-2 text-xs text-[#D37432] font-bold underline hover:text-[#B2581A] transition-colors"
                >
                  {copiedAddress ? 'Address Copied!' : 'Copy Full Address'}
                </button>
              </div>

              {/* Plus Code */}
              <div className="pt-4 border-t border-[#F3E9D7]">
                <span className="text-[10px] uppercase font-bold text-[#758A6F] tracking-wider block">
                  Google Maps Plus Code
                </span>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-mono text-sm font-bold text-[#D37432]">
                    {CAFE_INFO.plusCode}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="px-3.5 py-1.5 text-[11px] font-semibold border border-[#DECEB7] rounded-full text-[#5F4B3C] bg-[#FBF6EE] hover:bg-[#F3E9D7] transition-colors"
                  >
                    {copiedCode ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
              </div>

              {/* Hours */}
              <div className="pt-4 border-t border-[#F3E9D7]">
                <span className="text-[10px] uppercase font-bold text-[#758A6F] tracking-wider block">
                  Operating Hours
                </span>
                <div className="font-bold text-sm text-[#241810] mt-0.5">
                  7:30 AM – 10:30 PM (Daily)
                </div>
                <div className="text-xs text-[#5F4B3C] mt-0.5">
                  All 7 days · Breakfast, Lunch, Katta & Dinner
                </div>
              </div>

              {/* Phone */}
              <div className="pt-4 border-t border-[#F3E9D7]">
                <span className="text-[10px] uppercase font-bold text-[#758A6F] tracking-wider block">
                  Direct Telephone
                </span>
                <a
                  href={`tel:${CAFE_INFO.phone}`}
                  className="font-mono text-base font-bold text-[#D37432] hover:underline tabular-nums block mt-0.5"
                >
                  {CAFE_INFO.phone}
                </a>
              </div>

            </div>

            {/* Direct Link CTAs */}
            <div className="pt-6 border-t border-[#F3E9D7] flex flex-wrap gap-2.5">
              <a
                href={CAFE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-5 bg-[#D37432] hover:bg-[#B2581A] text-white text-xs uppercase tracking-wider font-bold rounded-full text-center transition-all shadow-md hover:shadow-lg"
              >
                Open in Google Maps ↗
              </a>

              <button
                type="button"
                onClick={handleShareToPhone}
                className="py-3 px-5 bg-[#F3E9D7] hover:bg-[#EBE0CC] text-[#241810] text-xs font-bold rounded-full transition-colors border border-[#DECEB7]"
                title="Share Location"
              >
                Share
              </button>
            </div>
          </div>

          {/* Right Column: Distance Estimator from Satara Landmarks */}
          <div className="lg:col-span-7 bg-[#DCE6D8] border border-[#C5D4C1] rounded-[28px] p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-editorial text-2xl font-bold text-[#241810]">
                  {lang === 'en' ? 'Travel Time from Town Points' : 'शहरातील इतर भागांतून अंतर व वेळ'}
                </h3>
                <span className="text-xs font-bold text-[#586B52] bg-[#FFFDF9] px-3 py-1 rounded-full border border-[#C5D4C1]">
                  Sadar Bazar Center
                </span>
              </div>
              <p className="text-xs text-[#4A5D44] mb-6">
                Click a landmark below to calculate driving and walking duration to Satara Cafe:
              </p>

              {/* Interactive Landmark Buttons */}
              <div className="space-y-2 mb-6">
                {NEARBY_LANDMARKS.map((lm, idx) => {
                  const isSelected = selectedLandmarkIdx === idx;
                  return (
                    <button
                      key={lm.name}
                      onClick={() => setSelectedLandmarkIdx(idx)}
                      type="button"
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-baseline justify-between gap-4 ${
                        isSelected
                          ? 'border-[#D37432] bg-[#FFFDF9] shadow-sm'
                          : 'border-[#C5D4C1] bg-[#E1EADA] hover:bg-[#FFFDF9] text-[#4A5D44]'
                      }`}
                    >
                      <div>
                        <strong className="text-xs text-[#241810] block">{lm.name}</strong>
                        <span className="text-[11px] text-[#586B52]">{lm.note}</span>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#D37432] shrink-0 tabular-nums">
                        {lm.distance}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Route Info Box */}
              <div className="p-4 bg-[#FFFDF9] border border-[#C5D4C1] rounded-2xl flex items-center justify-between gap-4 text-xs shadow-xs">
                <div>
                  <div className="text-[11px] text-[#758A6F] font-semibold">Selected Starting Point:</div>
                  <div className="font-editorial font-bold text-[#241810] text-base mt-0.5">{currentLandmark.name}</div>
                  <div className="text-[11px] text-[#586B52] mt-0.5 font-mono">Distance: {currentLandmark.distance}</div>
                </div>

                <a
                  href={`https://www.google.com/maps/dir/${encodeURIComponent(currentLandmark.name + ', Satara')}/${encodeURIComponent(CAFE_INFO.nameEn + ' ' + CAFE_INFO.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#D37432] hover:bg-[#B2581A] text-white text-xs font-bold rounded-full transition-colors shrink-0 shadow-xs"
                >
                  Start GPS Route ↗
                </a>
              </div>
            </div>

            {/* Roadside Note */}
            <div className="mt-6 pt-4 border-t border-[#C5D4C1] text-[11px] text-[#4A5D44] leading-relaxed">
              <strong>Road Note:</strong> If traveling on the Pune-Bangalore NH48 highway, exit at Bombay Restaurant Chowk and drive straight down the main road through Powai Naka to reach Sadar Bazar in under 8 minutes.
            </div>
          </div>

        </div>

        {/* SECTION 2: What to Visit After Eating (Satara Tourist Guide) */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-widest font-bold text-[#758A6F] mb-1 block">
              Local Heritage Guide
            </span>
            <h2 className="font-editorial text-2xl sm:text-4xl font-bold text-[#241810]">
              Where to Explore in Satara Next
            </h2>
            <div className="flex justify-center my-2 text-[#758A6F]">
              <span>❧ ✦ ☙</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SATARA_ATTRACTIONS.map((att) => (
              <div
                key={att.nameEn}
                className="bg-[#FFFDF9] border border-[#DECEB7] rounded-[28px] p-6 shadow-xs space-y-2 hover:shadow-md transition-shadow"
              >
                <div className="flex items-baseline justify-between gap-2 border-b border-[#F3E9D7] pb-2">
                  <h3 className="font-editorial text-lg font-bold text-[#241810]">{att.nameEn}</h3>
                  <span className="font-mono text-xs font-bold text-[#D37432] shrink-0 bg-[#FDE8D7] px-2.5 py-0.5 rounded-full">{att.distFromCafe}</span>
                </div>
                <p className="text-xs text-[#5F4B3C] leading-relaxed">
                  {lang === 'en' ? att.tipEn : att.tipMr}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
