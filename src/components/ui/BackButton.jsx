"use client";

import { useRouter } from "next/navigation";

export default function BackButton({
  className = "",
}) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`
        flex
        items-center
        justify-center
        w-10
        h-10
        rounded-full
        border
        border-stone-300
        bg-white
        text-lg
        leading-none
        text-stone-700
        transition
        hover:text-rust
        hover:border-rust
        hover:shadow-sm
        ${className}
      `}
      aria-label="Go back"
    >
      <span className="relative -top-px">
        ←
      </span>
    </button>
  );
}