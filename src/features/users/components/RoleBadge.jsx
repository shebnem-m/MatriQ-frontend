export default function RoleBadge({ role }) {
  const colors = {
    ADMIN: "bg-red-100 text-red-700",
    SUPPLIER: "bg-blue-100 text-blue-700",
    CUSTOMER: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        colors[role] || "bg-gray-100 text-gray-700"
      }`}
    >
      {role}
    </span>
  );
}