import Image from "next/image";

export default function ListingDetail({ listing }) {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4 bg-[#F5F2ED]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Şəkil hissəsi */}
        <div className="md:col-span-1">
          <div className="relative h-80 w-full">
            <Image src={listing.imageUrl} alt={listing.title} fill className="object-contain" />
          </div>
        </div>

        {/* Məlumat hissəsi */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center gap-4">
            <div className="bg-[#C19A6B] text-white w-12 h-12 flex items-center justify-center rounded-full font-bold">
              {listing.points || 98}
            </div>
            <h1 className="text-3xl font-bold text-[#4A3728]">{listing.title}</h1>
          </div>

          <div className="space-y-3 text-[#4A3728]">
            <p className="text-xl font-semibold">Product Növü: <span className="font-normal">{listing.category}</span></p>
            <div className="space-y-2 text-lg">
              <p>⚡ Güc: <strong>{listing.strength}</strong></p>
              <p>〰️ Növ: <strong>{listing.type}</strong></p>
              <p>▤ Danavarlıq: <strong>{listing.granularity}</strong></p>
              <p>🌐 Menşei: <strong>{listing.origin}</strong></p>
            </div>
          </div>

          <p className="text-3xl font-bold text-[#C19A6B]">Fiyat: AZN {listing.price}</p>
        </div>
      </div>
    </div>
  );
}