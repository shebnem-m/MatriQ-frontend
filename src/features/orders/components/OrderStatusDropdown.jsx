"use client";

const ALLOWED_TRANSITIONS = {
  PENDING: ["PENDING", "CONFIRMED", "CANCELLED"],
  CONFIRMED: ["CONFIRMED", "SHIPPED", "CANCELLED"],
  SHIPPED: ["SHIPPED", "COMPLETED"],
  COMPLETED: ["COMPLETED"],
  CANCELLED: ["CANCELLED"],
};

const STATUS_STYLES = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  CONFIRMED: "bg-blue-50 text-blue-700 border-blue-200",
  SHIPPED: "bg-purple-50 text-purple-700 border-purple-200",
  COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-200",
  CANCELLED: "bg-red-50 text-red-700 border-red-200",
};

export default function OrderStatusDropdown({
  currentStatus,
  onChange,
  disabled,
}) {
  const options = ALLOWED_TRANSITIONS[currentStatus] ?? [currentStatus];
  const isLocked = options.length === 1;

  return (
    <select
      value={currentStatus}
      disabled={disabled || isLocked}
      onChange={(e) => onChange(e.target.value)}
      className={`
        min-w-[150px]
        rounded-full
        border
        px-4
        py-2
        text-sm
        font-semibold
        transition-all
        duration-200
        cursor-pointer
        shadow-sm
        focus:outline-none
        focus:ring-2
        focus:ring-orange-400
        focus:border-orange-400
        disabled:cursor-not-allowed
        disabled:opacity-70
        disabled:shadow-none
        ${STATUS_STYLES[currentStatus]}
      `}
    >
      {options.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}