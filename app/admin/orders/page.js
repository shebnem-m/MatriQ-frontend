import OrderManagementList from "@/src/features/orders/components/OrderManagementList";

export default function AdminOrdersPage() {
  return (
    <div className="mx-auto w-full max-w-7xl p-4 sm:p-6">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Orders
        </h1>

        <p className="mt-2 text-sm text-zinc-500">
          Review incoming orders, update their status, or remove them when necessary.
        </p>
      </div>

      {/* Desktop Table Header */}
      <div
        className="
          hidden
          lg:flex
          items-center
          gap-6
          rounded-xl
          border
          border-zinc-200
          bg-zinc-50
          px-6
          py-3
          text-xs
          font-semibold
          uppercase
          tracking-wider
          text-zinc-500
          mb-4
        "
      >
        <span className="w-20 shrink-0">Order</span>
        <span className="w-44 shrink-0">Buyer</span>
        <span className="w-24 shrink-0">Items</span>
        <span className="w-28 shrink-0">Total</span>
        <span className="w-32 shrink-0">Date</span>
        <span className="flex-1">Status</span>
      </div>

      <OrderManagementList />

    </div>
  );
}