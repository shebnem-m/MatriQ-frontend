"use client";
import Image from "next/image";
import { useAuth } from "@/src/context/AuthContext";
import { ReviewList, AddReviewForm } from '@/src/features/reviews';
import Link from "next/link";

export default function ListingDetail({ listing }) {
  const { user } = useAuth();
  if (!listing) return null;

  return (
    <section className="bg-[#F8F5F1] min-h-screen pb-12">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 pt-8">
        
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#B57947] transition">
    Home
  </Link>
          <span className="mx-2">›</span>
          <span className="hover:text-[#B57947] cursor-pointer transition">{listing.category}</span>
          <span className="mx-2">›</span>
          <span className="text-[#3A2B20] font-medium line-clamp-1">{listing.title}</span>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
          
          <div className="lg:col-span-7 space-y-8">
            
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white aspect-[4/3] sm:aspect-square group">
              <Image
                src={listing.imageUrl}
                alt={listing.title}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            <div className="flex gap-3 sm:gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-[#B57947] ring-1 ring-offset-2 ring-[#B57947]/30 cursor-pointer flex-shrink-0">
                <Image
                  src={listing.imageUrl}
                  alt={listing.title}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-6 sm:p-8 border border-[#F0E9DB]">
              <h2 className="text-2xl font-semibold text-[#3A2B20] mb-6">Customer Reviews</h2>
              
              <ReviewList listingId={listing.id} />
              
              <div className="mt-8 pt-8 border-t border-[#F0E9DB]">
                {user ? (
                  <AddReviewForm listingId={listing.id} />
                ) : (
                  <div className="bg-[#F8F5F1] p-5 rounded-2xl text-center text-gray-600 text-sm">
                    Please log in to add your review.
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-7 lg:sticky lg:top-8 lg:self-start">
            
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3A2B20] leading-tight">
                {listing.title}
              </h1>
              
              <div className="mt-5 flex items-end gap-3">
                <span className="text-4xl sm:text-5xl font-bold text-[#B57947]">
                  AZN {listing.price.toFixed(2)}
                </span>
                <span className="text-lg text-gray-500 pb-1">/ {listing.unit}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="bg-white px-5 py-3 rounded-2xl text-sm font-medium border border-[#EDE4D5] flex items-center gap-2 shadow-sm">
                <span className="text-[#B57947]">📦</span>
                <span>{listing.stockQuantity} {listing.unit} stokda</span>
              </div>
              <div className="bg-white px-5 py-3 rounded-2xl text-sm font-medium border border-[#EDE4D5] flex items-center gap-2 shadow-sm">
                <span className="text-[#B57947]">🚚</span>
                <span>{listing.deliveryDays} gün çatdırılma</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-6 sm:p-8 border border-[#F0E9DB]">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#3A2B20] mb-5">Description</h2>
              <p className="text-gray-600 leading-relaxed text-[16px] sm:text-[17px]">
                {listing.description}
              </p>
            </div>

            <div className="bg-white rounded-3xl shadow-md p-6 sm:p-8 border border-[#F0E9DB]">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#3A2B20] mb-6">Product Information</h2>
              
              <div className="space-y-5 text-[15px]">
                <div className="flex justify-between pb-4 border-b border-[#F0E9DB]">
                  <span className="text-gray-500">Category</span>
                  <span className="font-semibold text-[#3A2B20] uppercase">{listing.category}</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-[#F0E9DB]">
                  <span className="text-gray-500">Material</span>
                  <span className="font-semibold text-[#3A2B20]">{listing.materialType}</span>
                </div>
                <div className="flex justify-between pb-4 border-b border-[#F0E9DB]">
                  <span className="text-gray-500">Stock</span>
                  <span className="font-semibold text-[#3A2B20]">{listing.stockQuantity} {listing.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery</span>
                  <span className="font-semibold text-[#3A2B20]">{listing.deliveryDays} Days</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 border border-[#F0E9DB] lg:sticky lg:top-8">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="text-4xl font-bold text-[#B57947]">AZN {listing.price.toFixed(2)}</p>
                </div>
                <div className="text-emerald-600 text-sm font-medium flex items-center gap-1">
                  ✓ In stock
                </div>
              </div>

              <button className="w-full bg-[#B57947] hover:bg-[#A46E43] active:bg-[#8C5D37] text-white font-semibold py-4 sm:py-5 rounded-2xl text-lg transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center gap-2">
                Buy Now
                <span>→</span>
              </button>

              <p className="text-center text-gray-500 text-xs sm:text-sm mt-6">
                Təhlükəsiz ödəniş • Dərhal sifariş təsdiqi
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}