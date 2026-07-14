"use client";

import { useState } from "react";
import UserToolbar from "@/src/features/users/components/UserToolbar";
import UsersTable from "@/src/features/users/components/UsersTable";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [allUsers, setAllUsers] = useState([]); // All users fetched from API

  // Filter the users directly during rendering (No extra useEffect or state needed!)
  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      (user.fullName || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (user.email || "")
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesRole = role === "" || user.role === role;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-ink">
          Users
        </h1>
        <p className="mt-1 text-sm text-ink/60">
          Manage all registered users.
        </p>
      </div>

      <UserToolbar
        search={search}
        setSearch={setSearch}
        role={role}
        setRole={setRole}
        users={filteredUsers} // Safely passes the filtered list for export
      />

      <UsersTable
        filteredUsers={filteredUsers} // Pass the already filtered users to display
        onDataFetch={setAllUsers}     // Callback to save the raw data when loaded
      />
    </div>
  );
}
