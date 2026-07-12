import Image from "next/image";

export default function ListingCard({ listing }) {
  return (
    <div
      className="
        group
        bg-white
        rounded-2xl
        overflow-hidden
        border
        border-gray-200
        shadow-sm
        hover:shadow-2xl
        hover:-translate-y-2
        transition-all
        duration-300
      "
    >
      {/* IMAGE */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <Image
          src={listing.imageUrl}
          alt={listing.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        <span
          className="
            absolute
            top-4
            left-4
            bg-white/90
            backdrop-blur
            px-3
            py-1
            rounded-full
            text-xs
            font-semibold
            capitalize
          "
        >
          {listing.category}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-900 line-clamp-1">
          {listing.title}
        </h2>

        <p className="text-gray-500 text-sm mt-3 line-clamp-2 h-10">
          {listing.description}
        </p>

        <div className="mt-5 space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>📦 Stock</span>
            <span className="font-medium">
              {listing.stockQuantity}
            </span>
          </div>

          <div className="flex justify-between">
            <span>🚚 Delivery</span>
            <span className="font-medium">
              {listing.deliveryDays} days
            </span>
          </div>

          <div className="flex justify-between">
            <span>📂 Category</span>
            <span className="font-medium capitalize">
              {listing.category}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div>
            <span className="text-3xl font-bold text-[#C19A6B]">
              ${listing.price}
            </span>

            <span className="text-gray-500 text-sm ml-1">
              / {listing.unit}
            </span>
          </div>

          <button
            className="
              px-5
              py-2.5
              rounded-xl
              bg-[#C19A6B]
              text-white
              font-medium
              hover:bg-[#a57f55]
              transition
            "
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}