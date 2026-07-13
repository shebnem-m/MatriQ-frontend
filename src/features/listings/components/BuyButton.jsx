"use client";
import { useRouter } from "next/navigation";
import { createOrder } from "../api";

export default function BuyButton({ listingId }) {
  const router = useRouter();

  const handleBuy = async () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      await createOrder({ listingId });
      router.push("/orders");
    } catch (error) {
      console.error("Sifariş xətası:", error);
      alert("Sifariş zamanı xəta baş verdi.");
    }
  };

  return (
    <button 
      onClick={handleBuy}
      className="w-full bg-[#B57947] hover:bg-[#A46E43] active:bg-[#8C5D37] text-white font-semibold py-4 sm:py-5 rounded-2xl text-lg transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center gap-2"
    >
      Buy Now
      <span>→</span>
    </button>
  );
}