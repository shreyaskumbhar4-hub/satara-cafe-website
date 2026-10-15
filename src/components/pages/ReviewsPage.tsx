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
    <div className="py-12 md:py-20 bg-[#FBF6EE] text-[#241810] animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-4 border-b border-[#E7DBCA]">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-[#758A6F] mb-1 block">
              {lang === 'en' ? 'Verified Google Reviews' : 'गुगल मॅप्स वरील अभिप्राय'}
            </span>
            <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-[#241810] tracking-tight">
              {lang === 'en' ? 'Notes Pinned on Our Board' : 'कट्ट्यावरील आठवणी व अभिप्राय'}
            </h1>
            <p className="text-xs sm:text-sm text-[#5F4B3C] mt-2">
              Google Maps Rating: <strong className="text-[#241810]">{CAFE_INFO.rating} ★ ({CAFE_INFO.reviewCount} reviews)</strong> · Average budget: ₹1–200 per head
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3.5 bg-[#D37432] hover:bg-[#B2581A] text-white text-xs uppercase tracking-wider font-bold rounded-full transition-all self-start md:self-auto shadow-md hover:shadow-lg"
          >
            {lang === 'en' ? '+ Pin Your Review' : '+ आपला अभिप्राय नोंदवा'}
          </button>
        </div>

        {/* Confirmation Toast */}
        {toastMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-[#E1EADA] border border-[#C5D4C1] text-[#586B52] text-xs font-bold text-center">
            {lang === 'en' ? 'Thank you! Your note has been pinned to the board.' : 'धन्यवाद! आपला अभिप्राय कट्ट्यावर जोडला गेला.'}
          </div>
        )}

        {/* Aggregate Ratings Overview Board */}
        <div className="bg-[#FFFDF9] border border-[#DECEB7] rounded-[28px] p-6 sm:p-8 mb-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            <div className="md:col-span-4 text-center md:text-left border-b md:border-b-0 md:border-r border-[#E7DBCA] pb-6 md:pb-0 md:pr-8">
              <div className="font-editorial text-6xl font-bold text-[#241810] leading-none tabular-nums">
                {CAFE_INFO.rating}
              </div>
              <div className="flex items-center justify-center md:justify-start gap-1 my-2 text-[#D37432] text-lg">
                ★★★★☆
              </div>
              <div className="text-xs text-[#5F4B3C]">
                {CAFE_INFO.reviewCount} total Google reviews
              </div>
              <div className="text-xs text-[#758A6F] font-bold mt-1">
                ₹1–200 per person · Reported by locals
              </div>
            </div>

            <div className="md:col-span-8 space-y-2.5 text-xs">
              {[
                { stars: 5, pct: '56%' },
                { stars: 4, pct: '24%' },
                { stars: 3, pct: '11%' },
                { stars: 2, pct: '4%' },
                { stars: 1, pct: '5%' },
              ].map((row) => (
                <div key={row.stars} className="flex items-center gap-3">
                  <span className="w-4 font-bold text-[#241810] tabular-nums">{row.stars}★</span>
                  <div className="flex-1 h-3 bg-[#F3E9D7] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#758A6F] rounded-full transition-all duration-700"
                      style={{ width: row.pct }}
                    />
                  </div>
                  <span className="w-10 text-right font-mono text-[11px] text-[#8D7663] tabular-nums font-bold">
                    {row.pct}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Filter Keywords */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <span className="text-xs font-bold text-[#5F4B3C] whitespace-nowrap shrink-0">
            Mentioned Dishes:
          </span>
          {filterKeywords.map((kw) => {
            const isActive = activeFilter === kw;
            return (
              <button
                key={kw}
                onClick={() => setActiveFilter(kw)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'bg-[#241810] text-[#FBF6EE] shadow-xs'
                    : 'bg-[#FFFDF9] border border-[#DECEB7] text-[#5F4B3C] hover:bg-[#F3E9D7]'
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
                className={`bg-[#FFFDF9] border border-[#DECEB7] p-6 rounded-[24px] shadow-sm hover:shadow-md transition-all hover:-translate-y-1 hover:rotate-0 flex flex-col justify-between space-y-4 ${rotationClass}`}
              >
                <div>
                  {/* Pin Mark */}
                  <div className="w-3 h-3 rounded-full bg-[#D37432] mx-auto -mt-3 mb-3 shadow-xs" title="Pinned" />

                  {/* Header info */}
                  <div className="flex items-baseline justify-between gap-2 border-b border-[#F3E9D7] pb-2">
                    <div>
                      <div className="font-bold text-sm text-[#241810]">{chit.author}</div>
                      <div className="text-[10px] text-[#8D7663] truncate max-w-[170px]">{chit.role}</div>
                    </div>
                    <div className="text-xs font-mono font-bold text-[#D37432]">
                      {chit.rating} ★
                    </div>
                  </div>

                  {chit.dishMentioned && (
                    <div className="text-[11px] font-semibold text-[#586B52] bg-[#E1EADA] px-2.5 py-0.5 rounded-full inline-block mt-2">
                      Dish: {chit.dishMentioned}
                    </div>
                  )}

                  {/* Handwritten Quote Styling */}
                  <p className="mt-3 text-xs sm:text-sm text-[#5F4B3C] italic leading-relaxed">
                    "{lang === 'en' ? chit.text : (chit.textMr || chit.text)}"
                  </p>

                  {/* Owner reply */}
                  {chit.ownerReply && (
                    <div className="mt-3 p-3 bg-[#F3E9D7] border-l-2 border-[#D37432] rounded-xl text-[11px] text-[#5F4B3C]">
                      <div className="font-bold text-[#241810] mb-0.5">
                        {lang === 'en' ? 'From the Cafe counter:' : 'कॅफे मालक:'}
                      </div>
                      <p>{chit.ownerReply}</p>
                    </div>
                  )}
                </div>

                <div className="text-[11px] text-[#8D7663] pt-3 border-t border-[#F3E9D7] flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => handleLike(chit.id)}
                    className={`flex items-center gap-1.5 transition-colors ${
                      isLiked ? 'text-[#D37432] font-bold' : 'hover:text-[#241810]'
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#241810]/65 backdrop-blur-xs">
          <div className="bg-[#FFFDF9] border border-[#DECEB7] rounded-[32px] max-w-md w-full p-6 sm:p-8 shadow-2xl text-[#241810]">
            <h3 className="font-editorial text-2xl font-bold mb-1">
              {lang === 'en' ? 'Pin a Review Chit' : 'आपला अभिप्राय नोंदवा'}
            </h3>
            <p className="text-xs text-[#5F4B3C] mb-4">
              Share what you loved about our dosas, wada pav, or the complimentary chutney.
            </p>

            <form onSubmit={handleAddReview} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#586B52] mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Rushikesh / Prathamesh"
                  className="w-full px-3.5 py-2.5 bg-[#FBF6EE] border border-[#DECEB7] rounded-xl text-[#241810] focus:outline-none focus:border-[#D37432]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#586B52] mb-1">Favorite Dish</label>
                <select
                  value={dishFavorite}
                  onChange={(e) => setDishFavorite(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FBF6EE] border border-[#DECEB7] rounded-xl text-[#241810] focus:outline-none focus:border-[#D37432]"
                >
                  <option value="Banana Leaf Masala Dosa">Banana Leaf Masala Dosa</option>
                  <option value="Satara Batata Wada Pav">Satara Batata Wada Pav</option>
                  <option value="Veg Cheese Grilled Sandwich">Veg Cheese Grilled Sandwich</option>
                  <option value="Bhajani Thalipeeth">Bhajani Thalipeeth with Loni</option>
                  <option value="Special Pav Bhaji">Special Pav Bhaji</option>
                  <option value="Cutting Chai / Filter Coffee">Cutting Chai / Filter Coffee</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#586B52] mb-1">Rating</label>
                <div className="flex gap-2 text-lg text-[#D37432]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRatingVal(s)}
                      className="p-1 hover:scale-115 transition-transform"
                    >
                      {s <= ratingVal ? '★' : '☆'}
                    </button>
                  ))}
                  <span className="text-xs font-mono text-[#241810] ml-2 mt-1.5 font-bold">{ratingVal} / 5</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#586B52] mb-1">Your Words</label>
                <textarea
                  required
                  rows={3}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Write a few honest words..."
                  className="w-full px-3.5 py-2.5 bg-[#FBF6EE] border border-[#DECEB7] rounded-xl text-[#241810] focus:outline-none focus:border-[#D37432]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 text-xs text-[#5F4B3C] hover:text-[#241810]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#D37432] hover:bg-[#B2581A] text-white font-bold rounded-full shadow-md transition-colors"
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
