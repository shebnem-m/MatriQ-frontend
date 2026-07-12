"use client";

import React, { useState, useEffect, useCallback } from "react";
import { fetchListings } from "@/src/features/listings/api";
import ListingCard from "@/src/features/listings/components/ListingCard";
import { useSearchParams } from "next/navigation";

export default function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("price-low");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(15000);
  const [selectedCategory, setSelectedCategory] = useState("");
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const categories = ["metal", "polymer", "timber"];
  
  const sortOptions = [
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "newest", label: "Newest First" }
  ];

  const loadListings = useCallback(async () => {
  try {
    setLoading(true);

    const filters = {
      sort: sortBy,
      ...(searchQuery.trim() && {
        title: searchQuery.trim(),
      }),
      ...(priceMin > 0 && {
        minPrice: priceMin,
      }),
      ...(priceMax < 15000 && {
        maxPrice: priceMax,
      }),
      ...(selectedCategory && {
        category: selectedCategory,
      }),
    };

    const data = await fetchListings(filters);

    setListings(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error("Failed to fetch listings:", error);
    setListings([]);
  } finally {
    setLoading(false);
  }
}, [sortBy, searchQuery, priceMin, priceMax, selectedCategory]);


useEffect(() => {
  loadListings();
}, [loadListings]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadListings();
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#2C2C2C]">
      <div className="flex">
        <aside className="hidden lg:block w-72 bg-white border-r border-[#E5E0D8] p-6">
          <div className="mb-8">
            <h3 className="text-xs tracking-widest text-[#8C7A6B] uppercase mb-3">SORT BY</h3>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full border rounded-lg px-4 py-2">
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>

          <div className="mb-8">
            <h3 className="text-xs tracking-widest text-[#8C7A6B] uppercase mb-3">PRICE RANGE</h3>
            <div className="flex justify-between text-sm mb-3">
              <span>{priceMin} AZN</span>
              <span>{priceMax} AZN</span>
            </div>
            <input type="range" min="0" max="15000" step="50" value={priceMin} onChange={(e) => setPriceMin(Number(e.target.value))} className="w-full" />
            <input type="range" min="0" max="15000" step="50" value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))} className="w-full mt-4" />
          </div>

          <div>
            <div className="flex justify-between mb-3">
              <h3 className="text-xs tracking-widest uppercase text-[#8C7A6B]">CATEGORY</h3>
              {selectedCategory && (
                <button onClick={() => setSelectedCategory("")} className="text-sm text-[#C19A6B]">Clear</button>
              )}
            </div>
            <div className="space-y-2">
              {categories.map(category => (
                <label key={category} className="flex gap-2 items-center cursor-pointer capitalize">
                  <input type="radio" name="category" checked={selectedCategory === category} onChange={() => setSelectedCategory(category)} />
                  <span>{category}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="bg-white border-b border-[#E5E0D8] p-6">
            <form onSubmit={handleSearchSubmit}>
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search materials..." className="w-full border rounded-full px-5 py-3" />
            </form>
          </div>

          <section className="p-8">
            <div className="flex justify-between mb-6">
              <h1 className="text-2xl font-semibold">All Materials</h1>
              <span className="text-sm text-[#8C7A6B]">{listings.length} products found</span>
            </div>

            {loading ? (
              <div>Loading...</div>
            ) : listings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map(item => (
                  <ListingCard key={item.id} listing={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">No products found</div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}