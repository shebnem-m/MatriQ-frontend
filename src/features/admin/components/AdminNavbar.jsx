"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Globe, Bell, User } from "lucide-react";

const PAGE_TITLES = [
  { href: "/admin/users", title: "Users" },
  { href: "/admin/suppliers", title: "Suppliers" },
  { href: "/admin/listings", title: "Listings" },
  { href: "/admin/orders", title: "Orders" },
  { href: "/admin/reviews", title: "Reviews" },
];

export default function AdminNavbar({ onMenuClick }) {
  const pathname = usePathname();
  const router = useRouter();

  const [isGlobeOpen, setIsGlobeOpen] = useState(false);
  const [isBellOpen, setIsBellOpen] = useState(false);

  const globeRef = useRef(null);
  const bellRef = useRef(null);

  const title =
    PAGE_TITLES.find(
      ({ href }) => pathname === href || pathname.startsWith(`${href}/`)
    )?.title ?? "Dashboard";

  useEffect(() => {
    function handleClickOutside(e) {
      if (globeRef.current && !globeRef.current.contains(e.target)) {
        setIsGlobeOpen(false);
      }
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setIsBellOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-chalk">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Sol tərəf: Menyu düyməsi və Səhifə Başlığı */}
        <div className="flex items-center gap-4 pl-12 md:pl-0">
          <button
            type="button"
            aria-label="Toggle sidebar"
            onClick={onMenuClick}
            className="hidden rounded-sm p-1.5 text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink md:inline-flex"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="font-display text-xl font-bold tracking-tight text-ink">
            {title}
          </h1>
        </div>

        {/* Sağ tərəf: İkonlar və Profil */}
        <div className="flex items-center gap-1 sm:gap-2">
          
          {/* Globe (Dil seçimi) - desktop: hover, mobile: tap */}
          <div
            className="group relative"
            ref={globeRef}
            onMouseEnter={() => setIsGlobeOpen(true)}
            onMouseLeave={() => setIsGlobeOpen(false)}
          >
            <button
              type="button"
              aria-label="Change language"
              onClick={() => setIsGlobeOpen((prev) => !prev)}
              className="rounded-full p-2 text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
            >
              <Globe className="h-5 w-5" />
            </button>

            {isGlobeOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-lg border border-ink/10 bg-white p-4 text-sm text-ink/60 shadow-lg z-50">
                Language selection coming soon.
              </div>
            )}
          </div>

          {/* Bell (Bildirişlər) - desktop: hover, mobile: tap */}
          <div
            className="group relative"
            ref={bellRef}
            onMouseEnter={() => setIsBellOpen(true)}
            onMouseLeave={() => setIsBellOpen(false)}
          >
            <button
              type="button"
              aria-label="Notifications"
              onClick={() => setIsBellOpen((prev) => !prev)}
              className="relative rounded-full p-2 text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink"
            >
              <Bell className="h-5 w-5" />
              {/* Qırmızı bildiriş nişanı bura yerləşdirildi */}
              <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rust text-[10px] font-semibold leading-none text-chalk">
                3
              </span>
            </button>

            {isBellOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-lg border border-ink/10 bg-white p-4 text-sm text-ink/60 shadow-lg z-50">
                Notifications coming soon.
              </div>
            )}
          </div>

          {/* Profil Düyməsi */}
          <button
            type="button"
            aria-label="Profile"
            onClick={() => router.push("/profile")}
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-ink text-chalk transition-opacity hover:opacity-90"
          >
            <User className="h-5 w-5" />
          </button>

        </div>
      </div>
    </header>
  );
}