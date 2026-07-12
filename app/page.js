'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { fetchListings } from '@/src/features/listings/api';
import ListingCard from '@/src/features/listings/components/ListingCard';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredItems, setFeaturedItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchListings({ limit: 6 });
      setFeaturedItems(data);
    };

    loadData();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/listings?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-[#2a1a14] via-[#5c4033] to-[#c48e77] text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
        <div className="text-center max-w-4xl z-10">
          <h1 className="text-[88px] leading-[1.05] font-bold tracking-tighter mb-6">
            Search Everything
          </h1>

          <p className="text-xl md:text-2xl opacity-90 mb-16 max-w-2xl mx-auto">
            Steel rebar, concrete mix, brick types, timber, insulation, and much more
          </p>

          <div className="flex items-center justify-center max-w-2xl mx-auto">
            <div className="relative flex w-full bg-white/95 rounded-full shadow-2xl">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type here to search"
                className="flex-1 bg-transparent px-8 py-5 text-gray-900 placeholder:text-gray-500 focus:outline-none text-lg rounded-l-full"
              />

              <button
                onClick={handleSearch}
                className="px-12 py-5 bg-[#a0522d] hover:bg-[#8b4513] active:scale-95 transition-all rounded-r-full font-semibold text-lg shadow-inner"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            width="100%"
            height="220"
            viewBox="0 0 1440 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0 220L60 190C120 160 240 120 360 115C480 110 600 145 720 160C840 175 960 165 1080 140C1200 115 1320 65 1380 45L1440 25V220H0Z"
              fill="#ffffff"
              fillOpacity="0.95"
            />
            <path
              d="M0 220L70 195C140 170 280 140 410 135C540 130 660 155 780 165C900 175 1020 160 1140 130C1260 100 1350 55 1410 35L1440 25V220H0Z"
              fill="#ffffff"
              fillOpacity="0.85"
            />
          </svg>
        </div>
      </div>

      {/* Featured Materials */}
      <section className="pt-8 pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-4xl font-bold text-gray-900">
              Featured Materials
            </h2>

            <a
              href="/listings"
              className="text-[#a0522d] hover:underline font-medium flex items-center gap-2"
            >
              View all materials →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <ListingCard key={item.id} listing={item} />
            ))}
          </div>
        </div>
      </section>

       <section className="py-20 bg-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            5,000+ Construction Material <br /> Products in One Solution.
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Decade-long commitment to being your primary guide for comparing construction materials. 
            We are an impartial team of materials experts: our sole mission is to help you build smart and durable.
          </p>
          <div className="flex items-center justify-center gap-6">
            <button className="px-8 py-3 bg-[#a0522d] text-white rounded-full font-medium hover:bg-[#8b4513] transition-all">
              View all categories
            </button>
            <a href="#" className="text-gray-900 font-medium hover:text-[#a0522d] transition-colors flex items-center gap-1">
              How it works →
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}