"use client";
import { useState } from "react";
import { addReview } from "../api"; // services/reviewService əvəzinə birbaşa api.js-dən import edirik

export default function AddReviewForm({ listingId, onReviewAdded }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // listingId və data-nı göndəririk
      await addReview(listingId, { rating: Number(rating), comment });
      setComment("");
      setRating(5);
      if (onReviewAdded) onReviewAdded(); // Rəy əlavə olunandan sonra siyahını yeniləmək üçün
    } catch (error) {
      console.error(error);
      alert("Rəy əlavə edilərkən xəta baş verdi!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold text-[#3A2B20]">Write a Review</h3>
      
      {/* Rating seçimi */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Rating (1-5)</label>
        <select 
          value={rating} 
          onChange={(e) => setRating(e.target.value)}
          className="w-full p-2 border border-gray-200 rounded-xl"
        >
          {[5, 4, 3, 2, 1].map(num => <option key={num} value={num}>{num} Stars</option>)}
        </select>
      </div>

      {/* Şərh sahəsi */}
      <div>
        <textarea 
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full p-3 border border-gray-200 rounded-xl min-h-[100px]"
        />
      </div>

      <button 
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#B57947] hover:bg-[#A46E43] text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "Sending..." : "Submit Review"}
      </button>
    </form>
  );
}