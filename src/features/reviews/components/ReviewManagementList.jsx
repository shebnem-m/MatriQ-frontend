"use client";
import { useEffect, useState } from "react";
import { deleteReview, getAllReviews } from "../api";

export default function ReviewManagementList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllReviews()
      .then((data) => setReviews(Array.isArray(data) ? data : (data?.content || [])))
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setError(err.message || "Failed to load reviews.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    try {
      await deleteReview(id);
      setReviews(reviews.filter((r) => r.id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete review!");
    }
  };

  if (loading) return <p className="text-sm text-zinc-500">Loading...</p>;
  if (error) return <p className="text-sm text-red-500">{error}</p>;
  if (reviews.length === 0) return <p className="text-sm text-zinc-500 italic">No reviews yet.</p>;

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="flex items-center gap-6 p-6 border rounded-xl hover:bg-zinc-50 transition">
          <span className="w-40 font-medium">{review.userName || "Anonymous"}</span>
          <span className="w-24 text-yellow-500">{"★".repeat(review.rating)}</span>
          <p className="flex-1 text-sm text-zinc-600 truncate">{review.comment}</p>
          <span className="w-32 text-sm text-zinc-500">{new Date(review.createdAt).toLocaleDateString()}</span>
          <button
            onClick={() => handleDelete(review.id)}
            className="w-20 text-red-600 hover:text-red-800 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}