import ListingManagementList from "@/src/features/listings/components/ListingManagementList";

export default function AdminListingsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl p-4 sm:p-6">
      
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Listings
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Manage your material listings, update stock levels, or remove items.
        </p>
      </div>

      {/* Desktop Table Header */}
      <div className="hidden lg:flex items-center gap-6 rounded-xl border border-zinc-200 bg-zinc-50 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
        <span className="w-48 shrink-0">Product</span>
        <span className="w-24 shrink-0">Category</span>
        <span className="w-28 shrink-0">Price</span>
        <span className="w-24 shrink-0">Stock</span>
        <span className="w-32 shrink-0">Unit</span>
        <span className="flex-1 text-right">Actions</span>
      </div>

      <ListingManagementList />
      
    </div>
  );
}