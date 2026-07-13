"use client";

import OrderStatusDropdown from "./OrderStatusDropdown";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function OrderManagementCard({
  order,
  buyerName,
  onStatusChange,
  onDelete,
  isUpdating,
}) {
  return (
    <div className="
  w-full
  rounded-xl
  border border-zinc-200
  bg-white
  p-4
  shadow-sm
  transition-all
  duration-200
  hover:border-zinc-300
  hover:shadow-md
  dark:border-zinc-800
  dark:bg-zinc-900
">

  {/* Mobile View - Single column flow to eliminate horizontal scrolling */}
  <div className="flex flex-col gap-4 lg:hidden w-full">
    
    {/* Top Row: Buyer info & ID */}
    <div className="min-w-0">
      <p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate text-base">
        {buyerName ?? "Loading..."}
      </p>
      <p className="mt-0.5 text-xs font-mono text-zinc-400">
        #{order.id.slice(0, 8)}
      </p>
    </div>

    {/* Middle Row: Key Stats (Price, Items, Date) stacked cleanly */}
    <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-4 border-y border-zinc-100 py-3 dark:border-zinc-800 text-xs">
      <div>
        <p className="text-zinc-400 font-medium mb-0.5">Total Price</p>
        <p className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">
          ${order.totalPrice.toFixed(2)}
        </p>
      </div>
      <div>
        <p className="text-zinc-400 font-medium mb-0.5">Items</p>
        <p className="font-semibold text-zinc-700 dark:text-zinc-300">
          {order.quantity} {order.quantity === 1 ? "item" : "items"}
        </p>
      </div>
      <div>
        <p className="text-zinc-400 font-medium mb-0.5">Created</p>
        <p className="font-semibold text-zinc-700 dark:text-zinc-300">
          {formatDate(order.createdAt)}
        </p>
      </div>
    </div>

    {/* Bottom Row: Fully fluid interactive elements */}
    <div className="flex items-center justify-between gap-3 pt-1">
      <div className="flex-1 max-w-[200px]">
        <OrderStatusDropdown
          currentStatus={order.status}
          onChange={(status) => onStatusChange(order.id, status)}
          disabled={isUpdating}
        />
      </div>
      <button
        onClick={() => onDelete(order.id)}
        className="
          rounded-lg
          p-2
          text-zinc-400
          transition-colors
          hover:bg-red-50
          hover:text-red-600
          dark:hover:bg-red-950/30
          dark:hover:text-red-400
          shrink-0
        "
        aria-label="Delete order"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      </button>
    </div>
  </div>

  {/* Desktop View - Kept stable for larger viewports */}
  <div className="
    hidden
    lg:flex
    items-center
    justify-between
    gap-4
  ">
    <div className="flex items-center gap-6 min-w-0 flex-1 text-sm">
      <span className="w-20 shrink-0 font-mono text-xs text-zinc-400">
        #{order.id.slice(0,8)}
      </span>

      <span className="w-48 shrink-0 truncate font-semibold text-zinc-900 dark:text-zinc-100">
        {buyerName ?? "Loading..."}
      </span>

      <span className="w-24 shrink-0 text-zinc-500 dark:text-zinc-400">
        {order.quantity} item{order.quantity !== 1 ? "s" : ""}
      </span>

      <span className="w-32 shrink-0 text-zinc-500 dark:text-zinc-400">
        {formatDate(order.createdAt)}
      </span>

      <span className="w-28 shrink-0 font-bold text-zinc-950 dark:text-zinc-50 text-right pr-4">
        ${order.totalPrice.toFixed(2)}
      </span>
    </div>

    <div className="flex items-center gap-2">
      <OrderStatusDropdown
        currentStatus={order.status}
        onChange={(status) => onStatusChange(order.id, status)}
        disabled={isUpdating}
      />
      <button
        onClick={() => onDelete(order.id)}
        className="
          rounded-lg
          p-2
          text-zinc-400
          transition-colors
          hover:bg-red-50
          hover:text-red-600
          dark:hover:bg-red-950/30
          dark:hover:text-red-400
          shrink-0
        "
        aria-label="Delete order"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      </button>
    </div>
  </div>

</div>
  );
}