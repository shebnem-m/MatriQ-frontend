"use client";

import { usePathname } from "next/navigation";
import { Menu, User } from "lucide-react";

const PAGE_TITLES = [
  { href: "/admin/users", title: "Users" },
  { href: "/admin/suppliers", title: "Suppliers" },
  { href: "/admin/listings", title: "Listings" },
  { href: "/admin/orders", title: "Orders" },
  { href: "/admin/reviews", title: "Reviews" },
];

export default function AdminNavbar() {
  const pathname = usePathname();

  const title =
    PAGE_TITLES.find(
      ({ href }) => pathname === href || pathname.startsWith(`${href}/`)
    )?.title ?? "Dashboard";

  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-chalk">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left: menu toggle + page title (extra left padding on mobile clears the sidebar's fixed hamburger) */}
        <div className="flex items-center gap-4 pl-12 md:pl-0">
          <button
            type="button"
            aria-label="Toggle sidebar"
            className="hidden rounded-sm p-1.5 text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink md:inline-flex"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="font-display text-xl font-bold tracking-tight text-ink">
            {title}
          </h1>
        </div>

        {/* Right: language, notifications, profile */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            aria-label="Profile"
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-ink text-chalk transition-opacity hover:opacity-90"
          >
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
