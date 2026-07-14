"use client";
import { useState } from "react";
import { useAuth } from "@/src/context/AuthContext";
import { addReview } from "../api";

export default function AddReviewForm({ listingId, onReviewAdded }) {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      alert("Rəy yazmalısınız!");
      return;
    }

    if (!user?.id) {
      alert("Rəy yazmaq üçün daxil olmalısınız!");
      return;
    }

    setIsSubmitting(true);

    try {
     await addReview(listingId, {
  rating: Number(rating),
  comment: comment.trim(),
//   userId: user.id,
});

      alert("Rəyiniz uğurla əlavə edildi! 🎉");
      setComment("");
      setRating(5);
      if (onReviewAdded) onReviewAdded();

    }  catch (error) {
  console.error("Full Review Error:", error);
  alert(error.message || "Rəy göndərilərkən xəta baş verdi!");

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold text-[#3A2B20]">Write a Review</h3>

      <div>
        <label className="block text-sm text-gray-600 mb-1">Rating (1-5)</label>
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full p-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-rust"
        >
          {[5, 4, 3, 2, 1].map(num => (
            <option key={num} value={num}>{num} Stars</option>
          ))}
        </select>
      </div>

      <div>
        <textarea
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full p-3 border border-gray-200 rounded-xl min-h-[100px] focus:ring-2 focus:ring-rust"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-rust hover:bg-rust/90 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "Göndərilir..." : "Submit Review"}
      </button>
    </form>
  );
}