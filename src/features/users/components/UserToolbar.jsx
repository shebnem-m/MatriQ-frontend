"use client";

import { Search, Download } from "lucide-react";

export default function UserToolbar({
  search,
  setSearch,
  role,
  setRole,
  users = [], // List of users to be exported
}) {

  // Function to export users list to CSV format
  const handleExport = () => {
    if (!users || users.length === 0) {
      alert("No users found to export!");
      return;
    }

    const headers = ["ID", "Full Name", "Email", "Role", "Status"];

    const rows = users.map(user => [
      user.id || "",
      `"${user.fullName || ""}"`, // Wrapping in quotes in case full name contains commas
      user.email || "",
      user.role || "",
      user.status || ""
    ]);

    // Using UTF-8 BOM (\uFEFF) to ensure special characters display correctly in Excel
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users_list.csv");
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-ink/10 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">

      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40"
        />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-ink/10 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-rust"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">

        {/* Role Filter */}
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="rounded-lg border border-ink/10 bg-white px-4 py-2.5 text-sm outline-none cursor-pointer focus:border-rust"
        >
          <option value="">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="SUPPLIER">Supplier</option>
          <option value="CUSTOMER">Customer</option>
        </select>

        {/* Export */}
        <button
          onClick={handleExport}
          className="flex items-center gap-2 rounded-lg border border-ink/10 bg-white px-4 py-2.5 text-sm font-medium hover:bg-paper transition active:scale-95"
        >
          <Download size={18} />
          Export
        </button>

      </div>
    </div>
  );
}