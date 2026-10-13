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
    <div className="py-12 md:py-20 bg-[#fcf8f2] text-[#241a15] animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-[11px] uppercase tracking-widest font-bold text-[#9c3418] mb-1">
            {lang === 'en' ? 'Sadar Bazar Location & Satara Guide' : 'पत्ता, मार्ग व पर्यटन'}
          </div>
          <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-[#241a15] tracking-tight">
            {lang === 'en' ? 'Finding Us in Satara' : 'सातारा कॅफे पत्ता व संपर्क'}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-[#5c4a40] leading-relaxed">
            {lang === 'en'
              ? 'Centrally located in Sadar Bazar right next to the Police Staff Quarter and Sainik Bank. Plenty of roadside two-wheeler parking and easy approach from Powai Naka.'
              : 'सैनिक बँक आणि पोलिस स्टाफ क्वार्टरजवळ, सदर बझारच्या मध्यवर्ती भागात. दुचाकी वाहनांसाठी समोर पुरेशी पार्किंग आणि पोवई नाक्यावरून सहज पोहोचता येणारा रस्ता.'}
          </p>
        </div>

        {/* SECTION 1: Address Card & Interactive Distance Estimator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Left Column: Practical Coordinates */}
          <div className="lg:col-span-5 bg-[#fffdfa] border border-[#e2d6c3] rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-xs">
            <div className="space-y-5">
              
              {/* Address */}
              <div>
                <span className="text-[10px] uppercase font-bold text-[#735e52] tracking-wider block">
                  Postal Address
                </span>
                <p className="font-bold text-base text-[#241a15] mt-0.5">
                  {CAFE_INFO.address}
                </p>
                <p className="text-xs text-[#735e52] mt-0.5">
                  {CAFE_INFO.landmark}
                </p>
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="mt-2 text-xs text-[#9c3418] font-bold underline hover:text-[#802810]"
                >
                  {copiedAddress ? 'Address Copied!' : 'Copy Full Address'}
                </button>
              </div>

              {/* Plus Code */}
              <div className="pt-4 border-t border-[#f4ecdf]">
                <span className="text-[10px] uppercase font-bold text-[#735e52] tracking-wider block">
                  Google Maps Plus Code
                </span>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-mono text-sm font-bold text-[#9c3418]">
                    {CAFE_INFO.plusCode}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="px-2.5 py-1 text-[11px] font-semibold border border-[#dcd1be] rounded text-[#524137] hover:bg-[#f4ecdf]"
                  >
                    {copiedCode ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
              </div>

              {/* Hours */}
              <div className="pt-4 border-t border-[#f4ecdf]">
                <span className="text-[10px] uppercase font-bold text-[#735e52] tracking-wider block">
                  Operating Hours
                </span>
                <div className="font-bold text-sm text-[#241a15] mt-0.5">
                  7:30 AM – 10:30 PM (Daily)
                </div>
                <div className="text-xs text-[#735e52] mt-0.5">
                  All 7 days · Breakfast, Lunch, Katta & Dinner
                </div>
              </div>

              {/* Phone */}
              <div className="pt-4 border-t border-[#f4ecdf]">
                <span className="text-[10px] uppercase font-bold text-[#735e52] tracking-wider block">
                  Direct Telephone
                </span>
                <a
                  href={`tel:${CAFE_INFO.phone}`}
                  className="font-mono text-base font-bold text-[#9c3418] hover:underline tabular-nums block mt-0.5"
                >
                  {CAFE_INFO.phone}
                </a>
              </div>

            </div>

            {/* Direct Link CTAs */}
            <div className="pt-6 border-t border-[#f4ecdf] flex flex-wrap gap-2">
              <a
                href={CAFE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 bg-[#241a15] hover:bg-[#9c3418] text-[#fcf8f2] text-xs uppercase tracking-wider font-bold rounded text-center transition-colors shadow-xs"
              >
                Open in Google Maps ↗
              </a>

              <button
                type="button"
                onClick={handleShareToPhone}
                className="py-3 px-4 bg-[#f4ecdf] hover:bg-[#e8dfd1] text-[#241a15] text-xs font-bold rounded transition-colors"
                title="Share Location"
              >
                Share Location
              </button>
            </div>
          </div>

          {/* Right Column: Distance Estimator from Satara Landmarks */}
          <div className="lg:col-span-7 bg-[#f4ecdf] border border-[#e2d6c3] rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-editorial text-xl font-bold text-[#241a15]">
                  {lang === 'en' ? 'Travel Time from Town Points' : 'शहरातील इतर भागांतून अंतर व वेळ'}
                </h3>
                <span className="text-xs font-bold text-[#9c3418]">Sadar Bazar Center</span>
              </div>
              <p className="text-xs text-[#735e52] mb-6">
                Click a landmark below to calculate driving and walking duration to Satara Cafe:
              </p>

              {/* Interactive Landmark Buttons */}
              <div className="space-y-2.5 mb-6">
                {NEARBY_LANDMARKS.map((lm, idx) => {
                  const isSelected = selectedLandmarkIdx === idx;
                  return (
                    <button
                      key={lm.name}
                      onClick={() => setSelectedLandmarkIdx(idx)}
                      type="button"
                      className={`w-full p-3 rounded-lg border text-left transition-colors flex items-baseline justify-between gap-4 ${
                        isSelected
                          ? 'border-[#9c3418] bg-[#fffdfa] shadow-xs'
                          : 'border-[#e2d6c3] bg-[#fffdfa]/60 hover:bg-[#fffdfa] text-[#524137]'
                      }`}
                    >
                      <div>
                        <strong className="text-xs text-[#241a15] block">{lm.name}</strong>
                        <span className="text-[11px] text-[#735e52]">{lm.note}</span>
                      </div>
                      <span className="font-mono text-xs font-bold text-[#9c3418] shrink-0 tabular-nums">
                        {lm.distance}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Route Info Box */}
              <div className="p-4 bg-[#fffdfa] border border-[#e2d6c3] rounded-xl flex items-center justify-between gap-4 text-xs">
                <div>
                  <div className="text-[11px] text-[#8c786a]">Selected Starting Point:</div>
                  <div className="font-bold text-[#241a15] text-sm mt-0.5">{currentLandmark.name}</div>
                  <div className="text-[11px] text-[#524137] mt-0.5 font-mono">Distance: {currentLandmark.distance}</div>
                </div>

                <a
                  href={`https://www.google.com/maps/dir/${encodeURIComponent(currentLandmark.name + ', Satara')}/${encodeURIComponent(CAFE_INFO.nameEn + ' ' + CAFE_INFO.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#9c3418] text-white text-xs font-bold rounded hover:bg-[#802810] shrink-0"
                >
                  Start GPS Route ↗
                </a>
              </div>
            </div>

            {/* Roadside Note */}
            <div className="mt-6 pt-4 border-t border-[#e2d6c3] text-[11px] text-[#735e52]">
              <strong>Road Note:</strong> If traveling on the Pune-Bangalore NH48 highway, exit at Bombay Restaurant Chowk and drive straight down the main road through Powai Naka to reach Sadar Bazar in under 8 minutes.
            </div>
          </div>

        </div>

        {/* SECTION 2: What to Visit After Eating (Satara Tourist Guide) */}
        <div>
          <div className="text-[11px] uppercase tracking-widest font-bold text-[#9c3418] mb-1">
            Local Heritage Guide
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#241a15] mb-6">
            Where to Explore in Satara Next
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SATARA_ATTRACTIONS.map((att) => (
              <div
                key={att.nameEn}
                className="bg-[#fffdfa] border border-[#e8dfd1] rounded-xl p-6 shadow-xs space-y-2"
              >
                <div className="flex items-baseline justify-between gap-2 border-b border-[#f4ecdf] pb-2">
                  <h3 className="font-bold text-sm text-[#241a15]">{att.nameEn}</h3>
                  <span className="font-mono text-xs font-bold text-[#9c3418] shrink-0">{att.distFromCafe}</span>
                </div>
                <p className="text-xs text-[#5c4a40] leading-relaxed">
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
