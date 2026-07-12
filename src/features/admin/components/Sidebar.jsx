"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutGrid, Users, Building2, Tag, ShoppingBag, Star } from "lucide-react"; // Assuming Lucide icons
import LogoutButton from "@/src/features/auth/components/LogoutButton"; // Assuming you have a LogoutButton component

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutGrid },
    { label: "Users", href: "/admin/users", icon: Users },
    { label: "Suppliers", href: "/admin/suppliers", icon: Building2 },
    { label: "Listings", href: "/admin/listings", icon: Tag },
    { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { label: "Reviews", href: "/admin/reviews", icon: Star },
  ];

  return (
    <>
      {/* --- MOBILE HAMBURGER BUTTON --- */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg bg-neutral-950 p-2 text-white shadow-md hover:bg-neutral-800 focus:outline-none"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* --- MOBILE BACKDROP OVERLAY --- */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* --- SIDEBAR CONTAINER --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen w-64 flex-col bg-neutral-950 text-neutral-300 transition-transform duration-300 ease-in-out 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:static md:translate-x-0`}
      >
        {/* Logo */}
        {/* Logo */}
        <div className="flex items-center px-6 py-6 pl-16 md:pl-6">
          <Link 
            href="/admin" 
            onClick={() => setIsOpen(false)} // Closes the mobile drawer when clicked
            className="group text-2xl font-extrabold tracking-tight text-white transition-opacity hover:opacity-90"
          >
            Matri<span className="text-orange-500 transition-colors group-hover:text-orange-400">Q</span>
          </Link>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 space-y-1 px-3 overflow-y-auto">
          {navItems.map(({ label, href, icon: Icon }) => {
            const isActive =
              pathname === href || pathname.startsWith(`${href}/`);

            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)} // Close drawer on mobile click
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="border-t border-neutral-800 px-3 py-4">
          <LogoutButton />
        </div>
      </aside>
    </>
  );
}