import React, { useState } from 'react';
import { CAFE_INFO, NEARBY_LANDMARKS } from '../data/cafeData';
import { Language } from '../types';

interface SadarBazarCornerProps {
  lang: Language;
}

export const SadarBazarCorner: React.FC<SadarBazarCornerProps> = ({ lang }) => {
  const [copiedPlusCode, setCopiedPlusCode] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(CAFE_INFO.plusCode);
    setCopiedPlusCode(true);
    setTimeout(() => setCopiedPlusCode(false), 2000);
  };

  return (
    <section id="location" className="py-20 md:py-24 bg-[#fcf8f2] text-[#241a15] border-b border-[#e8dfd1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Finding Us in Town */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-[11px] uppercase tracking-widest font-bold text-[#9c3418]">
              {lang === 'en' ? 'Sadar Bazar Location' : 'पत्ता आणि मार्ग'}
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#241a15] tracking-tight">
              {lang === 'en' ? 'How to Find Us in Satara' : 'सदर बझारमध्ये कसे याल?'}
            </h2>

            <p className="text-sm sm:text-base text-[#5c4a40] leading-relaxed">
              {lang === 'en' ? (
                <>
                  We are situated in central Sadar Bazar, directly opposite the lane leading to the Police Staff Quarters and steps from Sainik Bank. Roadside parking for two-wheelers is available directly in front.
                </>
              ) : (
                <>
                  सैनिक बँक आणि पोलिस स्टाफ क्वार्टरजवळ, सदर बझारच्या मध्यवर्ती रस्त्यावर. दुचाकी वाहने लावण्यासाठी समोर पुरेशी जागा उपलब्ध आहे.
                </>
              )}
            </p>

            {/* Address & Plus Code Card */}
            <div className="bg-[#fffdfa] border border-[#e8dfd1] rounded-lg p-5 space-y-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#735e52]">
                  {lang === 'en' ? 'Postal Address' : 'पत्ता'}
                </span>
                <p className="font-semibold text-sm text-[#241a15] mt-0.5">
                  {CAFE_INFO.address}
                </p>
                <p className="text-xs text-[#735e52]">
                  {CAFE_INFO.landmark}
                </p>
              </div>

              <div className="pt-2 border-t border-[#f4ecdf] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#8c786a]">Google Plus Code</span>
                  <div className="font-mono text-xs font-bold text-[#9c3418]">{CAFE_INFO.plusCode}</div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="px-2.5 py-1 text-[11px] font-semibold border border-[#dcd1be] rounded text-[#5c4a40] hover:text-[#241a15] hover:bg-[#f4ecdf] transition-colors"
                >
                  {copiedPlusCode ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
            </div>

            {/* Direct Telephone and Map Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={CAFE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 text-xs uppercase tracking-wider font-bold bg-[#241a15] hover:bg-[#9c3418] text-[#fcf8f2] rounded transition-colors"
              >
                {lang === 'en' ? 'Open in Google Maps' : 'गुगल मॅप्सवर उघडा'}
              </a>

              <a
                href={`tel:${CAFE_INFO.phone}`}
                className="px-4 py-3 text-xs font-bold text-[#241a15] hover:text-[#9c3418] border border-[#dcd1be] rounded transition-colors tabular-nums"
              >
                Call: {CAFE_INFO.phone}
              </a>
            </div>

          </div>

          {/* Right Column: Local Satara Distances and Landmarks */}
          <div className="lg:col-span-6 bg-[#f4ecdf] border border-[#e8dfd1] rounded-xl p-6 sm:p-8">
            <h3 className="font-editorial text-lg sm:text-xl font-bold text-[#241a15] mb-2">
              {lang === 'en' ? 'Coming from Around Town' : 'शहरातील इतर भागांतून अंतर'}
            </h3>
            <p className="text-xs text-[#735e52] mb-6">
              {lang === 'en' 
                ? 'Whether you are arriving by ST bus, descending from Ajinkyatara, or driving in from the highway:' 
                : 'एसटी बसने, अजिंक्यतारा किल्ल्यावरून किंवा महामार्गावरून येताना:'}
            </p>

            <div className="space-y-3">
              {NEARBY_LANDMARKS.map((item) => (
                <div 
                  key={item.name}
                  className="bg-[#fffdfa] border border-[#e2d6c3] p-3.5 rounded-lg flex items-baseline justify-between gap-3 text-xs"
                >
                  <div>
                    <strong className="text-[#241a15] block">{item.name}</strong>
                    <span className="text-[11px] text-[#735e52]">{item.note}</span>
                  </div>
                  <span className="font-mono font-bold text-[#9c3418] shrink-0 text-xs tabular-nums">
                    {item.distance}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#e2d6c3] text-[11px] text-[#735e52]">
              <strong>Hours:</strong> Open daily from 7:30 AM to 10:30 PM without break. Dine-in and quick takeaway packing available.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
