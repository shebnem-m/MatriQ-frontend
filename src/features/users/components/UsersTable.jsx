"use client";

import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../api";
import UserRow from "./UserRow";

export default function UsersTable({ filteredUsers = [], onDataFetch }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      const data = await getUsers();
      const fetchedUsers = data.content ?? [];
      console.log("Users fetched successfully:", fetchedUsers);
      
      if (onDataFetch) {
        onDataFetch(fetchedUsers); // Send data to parent component
      }
    } catch (err) {
      console.error("Error loading users:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this user?")) return;

    try {
      await deleteUser(id);
      // Inform parent component about the deletion by updating its list
      if (onDataFetch) {
        onDataFetch((prev) => prev.filter((user) => user.id !== id));
      }
    } catch (err) {
      alert(err.message);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-ink/10 bg-white p-10 text-center">
        Loading users...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-ink/10 bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-paper">
          <tr className="border-b border-ink/10">
            <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Joined</th>
            <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan={6}
                className="py-10 text-center text-ink/50"
              >
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}