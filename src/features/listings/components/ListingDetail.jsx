import Image from "next/image";

export default function ListingDetail({ listing }) {
  if (!listing) return null;

  return (
    <section className="bg-[#F8F5F1] min-h-screen pb-16">
      <div className="max-w-6xl mx-auto px-6 pt-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <span className="hover:text-[#B57947] cursor-pointer transition">Home</span>
          <span className="mx-2">›</span>
          <span className="hover:text-[#B57947] cursor-pointer transition">{listing.category}</span>
          <span className="mx-2">›</span>
          <span className="text-[#3A2B20] font-medium">{listing.title}</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Image Gallery Section */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white aspect-[16/13] group">
              <Image
                src={listing.imageUrl}
                alt={listing.title}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105"
                priority
              />
              {/* Subtle overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Thumbnail strip (placeholder for future multiple images) */}
            <div className="flex gap-4 mt-6">
              <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#B57947] ring-1 ring-offset-2 ring-[#B57947]/30 cursor-pointer">
                <Image
                  src={listing.imageUrl}
                  alt={listing.title}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
              {/* Add more thumbnails when you have multiple images */}
            </div>
          </div>

          {/* Right Column - Info & CTA */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Title & Price */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#3A2B20] leading-tight">
                {listing.title}
              </h1>
              
              <div className="mt-6 flex items-end gap-3">
                <span className="text-5xl font-bold text-[#B57947]">
                  AZN {listing.price.toFixed(2)}
                </span>
                <span className="text-xl text-gray-500 pb-1">/ {listing.unit}</span>
              </div>
            </div>

            {/* Quick Info Pills */}
            <div className="flex flex-wrap gap-3">
              <div className="bg-white px-5 py-2.5 rounded-2xl text-sm font-medium border border-[#EDE4D5] flex items-center gap-2">
                <span className="text-[#B57947]">📦</span>
                <span>{listing.stockQuantity} {listing.unit} in stock</span>
              </div>
              <div className="bg-white px-5 py-2.5 rounded-2xl text-sm font-medium border border-[#EDE4D5] flex items-center gap-2">
                <span className="text-[#B57947]">🚚</span>
                <span>{listing.deliveryDays} days delivery</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl shadow-md p-8 border border-[#F0E9DB]">
              <h2 className="text-2xl font-semibold text-[#3A2B20] mb-5">Description</h2>
              <p className="text-gray-600 leading-relaxed text-[17px]">
                {listing.description}
              </p>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-3xl shadow-md p-8 border border-[#F0E9DB]">
              <h2 className="text-2xl font-semibold text-[#3A2B20] mb-7">Product Information</h2>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-5 border-b border-[#F0E9DB]">
                  <span className="text-gray-500">Category</span>
                  <span className="font-semibold text-[#3A2B20] uppercase tracking-wider">{listing.category}</span>
                </div>
                
                <div className="flex justify-between items-center pb-5 border-b border-[#F0E9DB]">
                  <span className="text-gray-500">Material</span>
                  <span className="font-semibold text-[#3A2B20]">{listing.materialType}</span>
                </div>
                
                <div className="flex justify-between items-center pb-5 border-b border-[#F0E9DB]">
                  <span className="text-gray-500">Stock Quantity</span>
                  <span className="font-semibold text-[#3A2B20]">{listing.stockQuantity} {listing.unit}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Delivery Time</span>
                  <span className="font-semibold text-[#3A2B20]">{listing.deliveryDays} Days</span>
                </div>
              </div>
            </div>

            {/* Buy Section */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#F0E9DB] sticky top-8">
              <div className="flex justify-between items-baseline mb-8">
                <div>
                  <p className="text-sm text-gray-500">Total Price</p>
                  <p className="text-4xl font-bold text-[#B57947]">AZN {listing.price.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-emerald-600 font-medium">✓ In stock</p>
                </div>
              </div>

              <button
                className="w-full bg-[#B57947] hover:bg-[#A46E43] active:bg-[#8C5D37] text-white font-semibold text-lg py-5 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center gap-3 group"
              >
                Buy Now
                <span className="group-active:translate-x-1 transition">→</span>
              </button>

              <p className="text-center text-gray-500 text-sm mt-6">
                Secure checkout • Instant order confirmation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}