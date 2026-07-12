"use client";
import { useEffect, useState } from "react";
import { fetchReviewsByListing } from "../api"; // services/reviewService əvəzinə api.js-dən import edirik
import ReviewItem from "./ReviewItem";

export default function ReviewList({ listingId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const data = await fetchReviewsByListing(listingId);
        // Əgər API cavabı birbaşa array deyilsə, bəlkə data.content-dədir? 
        // Aşağıdakı yoxlama bunu həll edir:
        setReviews(Array.isArray(data) ? data : (data?.content || []));
      } catch (error) {
        console.error("Rəyləri çəkərkən xəta baş verdi:", error);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [listingId]);

  if (loading) return <p className="text-gray-400 text-sm">Loading reviews...</p>;
  
  if (reviews.length === 0) {
    return <p className="text-gray-500 italic text-sm">No reviews yet.</p>;
  }

 return (
    <div className="space-y-4">
      {reviews.map((review, index) => (
        <ReviewItem key={review.id || index} review={review} />
      ))}
    </div>
  );
}