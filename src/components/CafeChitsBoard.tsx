import React, { useState } from 'react';
import { GOOGLE_REVIEWS, CAFE_INFO } from '../data/cafeData';
import { Language, ReviewItem } from '../types';

interface CafeChitsBoardProps {
  lang: Language;
}

export const CafeChitsBoard: React.FC<CafeChitsBoardProps> = ({ lang }) => {
  const [chits, setChits] = useState<ReviewItem[]>(GOOGLE_REVIEWS);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [dishFavorite, setDishFavorite] = useState('Masala Dosa on Banana Leaf');
  const [ratingStars, setRatingStars] = useState(5);
  const [pinnedNotice, setPinnedNotice] = useState(false);

  const handlePinNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !noteContent.trim()) return;

    const newChit: ReviewItem = {
      id: `chit-${Date.now()}`,
      author: authorName.trim(),
      role: 'Just pinned at the counter',
      rating: ratingStars,
      date: 'Today',
      dishMentioned: dishFavorite,
      text: noteContent.trim(),
      likes: 1,
    };

    setChits([newChit, ...chits]);
    setAuthorName('');
    setNoteContent('');
    setIsFormOpen(false);
    setPinnedNotice(true);
    setTimeout(() => setPinnedNotice(false), 4000);
  };

  return (
    <section id="chits" className="py-20 md:py-24 bg-[#f4ecdf] text-[#241a15] border-b border-[#e8dfd1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-[11px] uppercase tracking-widest font-bold text-[#9c3418] mb-2">
              {lang === 'en' ? 'Customer Notes & Google Maps Words' : 'ग्राहकांचे मनोगत'}
            </div>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#241a15] tracking-tight">
              {lang === 'en' ? 'Notes Pinned at the Counter' : 'कट्ट्यावरील आठवणी'}
            </h2>
            <p className="text-xs sm:text-sm text-[#735e52] mt-2">
              {CAFE_INFO.rating} ★ on Google Maps · 212 reviews · ₹1–200 average per person
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsFormOpen(true)}
            className="px-4 py-2.5 bg-[#241a15] hover:bg-[#9c3418] text-[#fcf8f2] text-xs uppercase tracking-wider font-bold rounded transition-colors self-start md:self-auto shadow-sm"
          >
            {lang === 'en' ? '+ Pin a Note' : '+ अभिप्राय नोंदवा'}
          </button>
        </div>

        {/* Success confirmation */}
        {pinnedNotice && (
          <div className="mb-6 p-4 rounded bg-[#e8f2e8] border border-[#c2ddc2] text-[#235e23] text-xs font-semibold">
            {lang === 'en' ? 'Your note has been pinned to the cafe board!' : 'आपली नोंद कट्ट्यावर यशस्वीपणे जोडली गेली!'}
          </div>
        )}

        {/* Paper Chits Wall (Tactile craft paper aesthetic) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {chits.map((chit, index) => {
            // slight rotation styling to mimic natural pinned paper notes
            const rotationClass = index % 3 === 0 ? '-rotate-1' : index % 3 === 1 ? 'rotate-1' : 'rotate-0';
            return (
              <div
                key={chit.id}
                className={`bg-[#fffdfa] border border-[#e2d6c3] p-6 rounded-lg paper-pinned transition-transform hover:-translate-y-1 hover:rotate-0 flex flex-col justify-between space-y-4 ${rotationClass}`}
              >
                <div>
                  {/* Pin mark indicator */}
                  <div className="w-2.5 h-2.5 rounded-full bg-[#9c3418] mx-auto -mt-3 mb-3 shadow-xs" title="Pinned" />

                  {/* Header info */}
                  <div className="flex items-baseline justify-between gap-2 border-b border-[#f4ecdf] pb-2">
                    <div>
                      <div className="font-bold text-sm text-[#241a15]">{chit.author}</div>
                      <div className="text-[10px] text-[#8c786a]">{chit.role}</div>
                    </div>
                    <div className="text-xs font-mono font-bold text-[#c88937]">
                      {chit.rating} ★
                    </div>
                  </div>

                  {chit.dishMentioned && (
                    <div className="text-[11px] font-semibold text-[#9c3418] mt-2">
                      Tried: {chit.dishMentioned}
                    </div>
                  )}

                  {/* Handwritten quote styling */}
                  <p className="mt-2 text-xs sm:text-sm text-[#524137] italic leading-relaxed">
                    "{lang === 'en' ? chit.text : (chit.textMr || chit.text)}"
                  </p>

                  {/* Owner response chit */}
                  {chit.ownerReply && (
                    <div className="mt-3 p-3 bg-[#f7f2e9] border-l-2 border-[#9c3418] rounded text-[11px] text-[#5c4a40]">
                      <div className="font-bold text-[#241a15] mb-0.5">
                        {lang === 'en' ? 'From the Cafe counter:' : 'कॅफे मालक:'}
                      </div>
                      <p>{chit.ownerReply}</p>
                    </div>
                  )}
                </div>

                <div className="text-[10px] text-[#8c786a] pt-2 border-t border-[#f4ecdf] flex justify-between items-center">
                  <span>{chit.date}</span>
                  <span>Google Maps Review</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Pin a Note Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#241a15]/60 backdrop-blur-xs">
          <div className="bg-[#fffdfa] border border-[#dcd1be] rounded-lg max-w-md w-full p-6 shadow-2xl text-[#241a15]">
            <h3 className="font-editorial text-xl font-bold mb-1">
              {lang === 'en' ? 'Leave a Note for Satara Cafe' : 'कट्ट्यावर आपली नोंद जोडा'}
            </h3>
            <p className="text-xs text-[#735e52] mb-4">
              {lang === 'en' ? 'Tell us what you liked about the food, the chutney, or the service.' : 'चव, चटणी किंवा सेवेबद्दल आपले मत सांगा.'}
            </p>

            <form onSubmit={handlePinNote} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">
                  {lang === 'en' ? 'Your Name' : 'नाव'}
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Rushikesh / Prathamesh"
                  className="w-full px-3 py-2 bg-[#fcf8f2] border border-[#dcd1be] rounded text-[#241a15] focus:outline-none focus:border-[#9c3418]"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  {lang === 'en' ? 'What did you order?' : 'काय खाल्ले?'}
                </label>
                <select
                  value={dishFavorite}
                  onChange={(e) => setDishFavorite(e.target.value)}
                  className="w-full px-3 py-2 bg-[#fcf8f2] border border-[#dcd1be] rounded text-[#241a15] focus:outline-none focus:border-[#9c3418]"
                >
                  <option value="Banana Leaf Masala Dosa">Banana Leaf Masala Dosa</option>
                  <option value="Satara Batata Wada Pav">Satara Batata Wada Pav</option>
                  <option value="Veg Cheese Grilled Sandwich">Veg Cheese Grilled Sandwich</option>
                  <option value="Bhajani Thalipeeth">Bhajani Thalipeeth with Loni</option>
                  <option value="Pav Bhaji">Special Pav Bhaji</option>
                  <option value="Cutting Chai / Filter Coffee">Cutting Chai / Filter Coffee</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  {lang === 'en' ? 'Star Rating' : 'रेटिंग'}
                </label>
                <div className="flex gap-2 text-base">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRatingStars(s)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      {s <= ratingStars ? '★' : '☆'}
                    </button>
                  ))}
                  <span className="text-xs font-mono ml-2 mt-1">{ratingStars} / 5</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  {lang === 'en' ? 'Your Note' : 'आपला अभिप्राय'}
                </label>
                <textarea
                  required
                  rows={3}
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder={lang === 'en' ? 'Write a friendly sentence or two...' : 'काही शब्द लिहा...'}
                  className="w-full px-3 py-2 bg-[#fcf8f2] border border-[#dcd1be] rounded text-[#241a15] focus:outline-none focus:border-[#9c3418]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-3 py-1.5 text-[#735e52] hover:text-[#241a15]"
                >
                  {lang === 'en' ? 'Cancel' : 'रद्द करा'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#9c3418] hover:bg-[#802810] text-[#fcf8f2] font-bold rounded"
                >
                  {lang === 'en' ? 'Pin Note' : 'नोंदवा'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
