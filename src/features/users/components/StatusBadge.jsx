export default function StatusBadge({ status = "ACTIVE" }) {
  const colors = {
    ACTIVE: "bg-emerald-100 text-emerald-700",
    INACTIVE: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        colors[status] || colors.ACTIVE
      }`}
    >
      {status}
    </span>
  );
}