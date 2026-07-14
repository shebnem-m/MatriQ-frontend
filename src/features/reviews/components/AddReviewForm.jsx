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
    alert("Please write a review!");
    return;
  }

  if (!user?.id) {
    alert("You must be logged in to write a review!");
    return;
  }

  setIsSubmitting(true);

  try {
    await addReview(listingId, {
      ownerId: user.id,
      rating: Number(rating),
      comment: comment.trim(),
    });

    alert("Your review has been submitted successfully! 🎉");
    setComment("");
    setRating(5);
    if (onReviewAdded) onReviewAdded();

  } catch (error) {
    console.error("Full Review Error:", error);
    alert(error.message || "An error occurred while submitting your review!");

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
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}