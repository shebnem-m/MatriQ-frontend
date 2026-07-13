export default function BuyButton({ listingId, quantity, onBuy, isLoading }) {
  return (
    <button
      onClick={onBuy}
      disabled={isLoading}
      className={`w-full py-4 rounded-2xl text-white font-bold transition-all shadow-lg 
        ${isLoading ? 'bg-rust/70 cursor-not-allowed' : 'bg-rust hover:bg-rust/90 hover:shadow-xl'}`}
    >
      {isLoading ? "Processing..." : `Buy Now (${quantity})`}
    </button>
  );
}