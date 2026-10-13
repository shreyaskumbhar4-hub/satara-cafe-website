import React, { useState } from 'react';
import { GOOGLE_REVIEWS, CAFE_INFO } from '../../data/cafeData';
import { Language, ReviewItem } from '../../types';

interface ReviewsPageProps {
  lang: Language;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ lang }) => {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(GOOGLE_REVIEWS);
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  // Form modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [dishFavorite, setDishFavorite] = useState('Banana Leaf Masala Dosa');
  const [ratingVal, setRatingVal] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [toastMessage, setToastMessage] = useState(false);

  const filterKeywords = ['All', 'Masala Dosa', 'Sambar & Chutney', 'Thalipeeth', 'Sandwiches', 'Wada Pav'];

  const filteredReviews = reviewsList.filter((r) => {
    if (activeFilter === 'All') return true;
    return (
      r.dishMentioned?.toLowerCase().includes(activeFilter.toLowerCase()) ||
      r.text.toLowerCase().includes(activeFilter.toLowerCase())
    );
  });

  const handleLike = (id: string) => {
    const isLiked = likedReviews[id];
    setLikedReviews((prev) => ({ ...prev, [id]: !isLiked }));
    setReviewsList((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          return {
            ...r,
            likes: (r.likes || 0) + (isLiked ? -1 : 1),
          };
        }
        return r;
      })
    );
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !reviewText.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: authorName.trim(),
      role: 'Verified Customer · Pinned Just Now',
      rating: ratingVal,
      date: 'Just Now',
      dishMentioned: dishFavorite,
      text: reviewText.trim(),
      likes: 1,
    };

    setReviewsList([newRev, ...reviewsList]);
    setIsModalOpen(false);
    setAuthorName('');
    setReviewText('');
    setToastMessage(true);
    setTimeout(() => setToastMessage(false), 3500);
  };

  return (
    <div className="py-12 md:py-20 bg-[#f4ecdf] text-[#241a15] animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-[11px] uppercase tracking-widest font-bold text-[#9c3418] mb-1">
              {lang === 'en' ? 'Verified Google Reviews' : 'गुगल मॅप्स वरील अभिप्राय'}
            </div>
            <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-[#241a15]">
              {lang === 'en' ? 'Notes Pinned on Our Board' : 'कट्ट्यावरील आठवणी व अभिप्राय'}
            </h1>
            <p className="text-xs sm:text-sm text-[#735e52] mt-2">
              Google Maps Rating: <strong>{CAFE_INFO.rating} ★ (212 reviews)</strong> · Average budget: ₹1–200 per head
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-5 py-3 bg-[#241a15] hover:bg-[#9c3418] text-[#fcf8f2] text-xs uppercase tracking-wider font-bold rounded transition-colors self-start md:self-auto shadow-sm"
          >
            {lang === 'en' ? '+ Pin Your Review' : '+ आपला अभिप्राय नोंदवा'}
          </button>
        </div>

        {/* Confirmation Toast */}
        {toastMessage && (
          <div className="mb-6 p-4 rounded bg-[#e8f2e8] border border-[#c2ddc2] text-[#2e6930] text-xs font-bold">
            {lang === 'en' ? 'Thank you! Your note has been pinned to the board.' : 'धन्यवाद! आपला अभिप्राय कट्ट्यावर जोडला गेला.'}
          </div>
        )}

        {/* Aggregate Ratings Overview Board */}
        <div className="bg-[#fffdfa] border border-[#e2d6c3] rounded-2xl p-6 sm:p-8 mb-10 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-[#f0e6d8] pb-6 md:pb-0 md:pr-8">
              <div className="font-editorial text-6xl font-bold text-[#241a15] leading-none tabular-nums">
                {CAFE_INFO.rating}
              </div>
              <div className="flex items-center justify-center md:justify-start gap-1 my-2 text-[#c88937] text-lg">
                ★★★★☆
              </div>
              <div className="text-xs text-[#735e52]">
                {CAFE_INFO.reviewCount} total Google reviews
              </div>
              <div className="text-xs text-[#9c3418] font-bold mt-1">
                ₹1–200 per person · Reported by locals
              </div>
            </div>

            <div className="md:col-span-8 space-y-2 text-xs">
              {[
                { stars: 5, pct: '56%' },
                { stars: 4, pct: '24%' },
                { stars: 3, pct: '11%' },
                { stars: 2, pct: '4%' },
                { stars: 1, pct: '5%' },
              ].map((row) => (
                <div key={row.stars} className="flex items-center gap-3">
                  <span className="w-3 font-bold text-[#524137] tabular-nums">{row.stars}★</span>
                  <div className="flex-1 h-2.5 bg-[#f4ecdf] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#c88937] rounded-full"
                      style={{ width: row.pct }}
                    />
                  </div>
                  <span className="w-8 text-right font-mono text-[11px] text-[#8c786a] tabular-nums">
                    {row.pct}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Filter Keywords */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
          <span className="text-xs font-bold text-[#735e52] whitespace-nowrap shrink-0">
            Mentioned Dishes:
          </span>
          {filterKeywords.map((kw) => {
            const isActive = activeFilter === kw;
            return (
              <button
                key={kw}
                onClick={() => setActiveFilter(kw)}
                className={`px-3 py-1 rounded text-xs whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'bg-[#241a15] text-[#fcf8f2] font-bold'
                    : 'bg-[#fffdfa] border border-[#dcd1be] text-[#524137] hover:bg-[#e8dfd1]'
                }`}
              >
                {kw}
              </button>
            );
          })}
        </div>

        {/* The Paper Chits Grid (Tactile Pinned Paper Aesthetic) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((chit, idx) => {
            const isLiked = likedReviews[chit.id];
            const rotationClass = idx % 3 === 0 ? '-rotate-1' : idx % 3 === 1 ? 'rotate-1' : 'rotate-0';

            return (
              <div
                key={chit.id}
                className={`bg-[#fffdfa] border border-[#e2d6c3] p-6 rounded-lg paper-pinned transition-transform hover:-translate-y-1 hover:rotate-0 flex flex-col justify-between space-y-4 ${rotationClass}`}
              >
                <div>
                  {/* Pin Mark */}
                  <div className="w-2.5 h-2.5 rounded-full bg-[#9c3418] mx-auto -mt-3 mb-3 shadow-xs" title="Pinned" />

                  {/* Header info */}
                  <div className="flex items-baseline justify-between gap-2 border-b border-[#f4ecdf] pb-2">
                    <div>
                      <div className="font-bold text-sm text-[#241a15]">{chit.author}</div>
                      <div className="text-[10px] text-[#8c786a] truncate max-w-[170px]">{chit.role}</div>
                    </div>
                    <div className="text-xs font-mono font-bold text-[#c88937]">
                      {chit.rating} ★
                    </div>
                  </div>

                  {chit.dishMentioned && (
                    <div className="text-[11px] font-semibold text-[#9c3418] mt-2">
                      Dish: {chit.dishMentioned}
                    </div>
                  )}

                  {/* Handwritten Quote Styling */}
                  <p className="mt-2 text-xs sm:text-sm text-[#524137] italic leading-relaxed">
                    "{lang === 'en' ? chit.text : (chit.textMr || chit.text)}"
                  </p>

                  {/* Owner reply */}
                  {chit.ownerReply && (
                    <div className="mt-3 p-3 bg-[#f7f2e9] border-l-2 border-[#9c3418] rounded text-[11px] text-[#5c4a40]">
                      <div className="font-bold text-[#241a15] mb-0.5">
                        {lang === 'en' ? 'From the Cafe counter:' : 'कॅफे मालक:'}
                      </div>
                      <p>{chit.ownerReply}</p>
                    </div>
                  )}
                </div>

                <div className="text-[11px] text-[#8c786a] pt-3 border-t border-[#f4ecdf] flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => handleLike(chit.id)}
                    className={`flex items-center gap-1.5 transition-colors ${
                      isLiked ? 'text-[#9c3418] font-bold' : 'hover:text-[#241a15]'
                    }`}
                  >
                    <span>{isLiked ? '❤️ Helpful' : '🤍 Helpful'}</span>
                    <span className="font-mono tabular-nums">({chit.likes || 0})</span>
                  </button>
                  <span>{chit.date}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Pin a Note Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#241a15]/65 backdrop-blur-xs">
          <div className="bg-[#fffdfa] border border-[#dcd1be] rounded-xl max-w-md w-full p-6 shadow-2xl text-[#241a15]">
            <h3 className="font-editorial text-xl font-bold mb-1">
              {lang === 'en' ? 'Pin a Review Chit' : 'आपला अभिप्राय नोंदवा'}
            </h3>
            <p className="text-xs text-[#735e52] mb-4">
              Share what you loved about our dosas, wada pav, or the complimentary chutney.
            </p>

            <form onSubmit={handleAddReview} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#524137] mb-1">Your Name</label>
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
                <label className="block font-bold text-[#524137] mb-1">Favorite Dish</label>
                <select
                  value={dishFavorite}
                  onChange={(e) => setDishFavorite(e.target.value)}
                  className="w-full px-3 py-2 bg-[#fcf8f2] border border-[#dcd1be] rounded text-[#241a15] focus:outline-none focus:border-[#9c3418]"
                >
                  <option value="Banana Leaf Masala Dosa">Banana Leaf Masala Dosa</option>
                  <option value="Satara Batata Wada Pav">Satara Batata Wada Pav</option>
                  <option value="Veg Cheese Grilled Sandwich">Veg Cheese Grilled Sandwich (Vag CHIS)</option>
                  <option value="Bhajani Thalipeeth">Bhajani Thalipeeth with Loni</option>
                  <option value="Special Pav Bhaji">Special Pav Bhaji</option>
                  <option value="Cutting Chai / Filter Coffee">Cutting Chai / Filter Coffee</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#524137] mb-1">Rating</label>
                <div className="flex gap-2 text-base text-[#c88937]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRatingVal(s)}
                      className="p-1 hover:scale-110"
                    >
                      {s <= ratingVal ? '★' : '☆'}
                    </button>
                  ))}
                  <span className="text-xs font-mono text-[#241a15] ml-2 mt-1">{ratingVal} / 5</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#524137] mb-1">Your Words</label>
                <textarea
                  required
                  rows={3}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write a few honest words..."
                  className="w-full px-3 py-2 bg-[#fcf8f2] border border-[#dcd1be] rounded text-[#241a15] focus:outline-none focus:border-[#9c3418]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-2 text-[#735e52]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#9c3418] hover:bg-[#802810] text-white font-bold rounded"
                >
                  Pin Note to Board
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
