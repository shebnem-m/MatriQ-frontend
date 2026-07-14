"use client";

import { Pencil, Trash2 } from "lucide-react";
import RoleBadge from "./RoleBadge";
import StatusBadge from "./StatusBadge";

export default function UserRow({ user, onDelete }) {
  return (
    <tr className="border-b border-ink/10 hover:bg-paper transition">

      <td className="px-6 py-4">
        <p className="font-semibold text-ink">
          {user.fullName}
        </p>
      </td>

      <td className="px-6 py-4 text-ink/70">
        {user.email}
      </td>

      <td className="px-6 py-4">
        <RoleBadge role={user.role} />
      </td>

      <td className="px-6 py-4">
        <StatusBadge />
      </td>

      <td className="px-6 py-4">
        {user.birthDate || "-"}
      </td>

      <td className="px-6 py-4">
        <div className="flex justify-center gap-2">

          <button
            className="rounded-md p-2 hover:bg-paper"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(user.id)}
            className="rounded-md p-2 text-red-600 hover:bg-red-50"
          >
            <Trash2 size={18} />
          </button>

        </div>
      </td>

    </tr>
  );
}