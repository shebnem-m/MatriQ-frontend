'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/listings?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#2a1a14] via-[#5c4033] to-[#c48e77] text-white overflow-hidden relative">
      {/* Main Content */}
      <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-12 relative">
        <div className="text-center max-w-4xl">
          {/* Big Title */}
          <h1 className="text-[92px] leading-none font-bold tracking-tighter mb-6">
            search everything
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl opacity-90 mb-16 max-w-2xl mx-auto">
            Steel rebar, concrete mix, brick types, timber, insulation, and much more
          </p>

          {/* Search Bar */}
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
      </div>

      {/* White Waves at the Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          width="100%" 
          height="180" 
          viewBox="0 0 1440 180" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path 
            d="M0 180L60 160C120 140 240 100 360 90C480 80 600 100 720 110C840 120 960 120 1080 100C1200 80 1320 40 1380 20L1440 0V180H0Z" 
            fill="white" 
            fillOpacity="0.12"
          />
          <path 
            d="M0 180L60 165C120 150 240 120 360 115C480 110 600 130 720 140C840 150 960 145 1080 125C1200 105 1320 65 1380 45L1440 25V180H0Z" 
            fill="white" 
            fillOpacity="0.08"
          />
        </svg>
      </div>
    </main>
  );
}