// src/features/reviews/components/ReviewItem.jsx
export default function ReviewItem({ review }) {
  return (
    <div className="border-b border-gray-100 py-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#3A2B20]">{review.userName || "Anonymous"}</span>
          <span className="text-yellow-500 text-sm">{"★".repeat(review.rating)}</span>
        </div>
        {review.createdAt && (
          <span className="text-xs text-gray-400">
            {new Date(review.createdAt).toLocaleDateString()}
          </span>
        )}
      </div>
      <p className="text-gray-600 text-[15px] leading-relaxed">{review.comment}</p>
    </div>
  );
}