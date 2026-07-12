"use client";

export default function OrderFilters({
  selectedStatus,
  onStatusChange,
}) {
  const statuses = [
    {
      value: "ALL",
      label: "All Orders",
    },
    {
      value: "PENDING",
      label: "Pending",
    },
    {
      value: "CONFIRMED",
      label: "Confirmed",
    },
    {
      value: "SHIPPED",
      label: "Shipped",
    },
    {
      value: "COMPLETED",
      label: "Completed",
    },
    {
      value: "CANCELLED",
      label: "Cancelled",
    },
  ];

  return (
    <aside
      className="
        w-full
        lg:w-64
        shrink-0
        rounded-xl
        border
        border-stone-200
        bg-white
        p-6
        shadow-sm
      "
    >
      <h2 className="
        font-display
        text-xl
        font-bold
        text-rust
      ">
        Filters
      </h2>

      <p className="mt-1 mb-6 text-sm text-gray-600">
        Filter your orders.
      </p>


      <div>
        <h3 className="
          mb-3
          text-sm
          font-semibold
          uppercase
          tracking-wide
          text-gray-700
        ">
          Status
        </h3>


        <div className="space-y-2">

          {statuses.map((status) => (

            <button
              key={status.value}
              onClick={() => onStatusChange(status.value)}
              className={`
                w-full
                rounded-lg
                px-4
                py-2
                text-left
                text-sm
                font-medium
                transition
                ${
                  selectedStatus === status.value
                    ? "bg-rust text-white"
                    : "text-gray-700 hover:bg-stone-100"
                }
              `}
            >
              {status.label}
            </button>

          ))}

        </div>
      </div>

    </aside>
  );
}