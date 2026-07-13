import ReviewManagementList from "@/src/features/reviews/components/ReviewManagementList";

export default function AdminReviewsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Reviews
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Manage user reviews, moderate content, or remove them when necessary.
        </p>
      </div>

      <div className="hidden lg:flex items-center gap-6 rounded-xl border border-zinc-200 bg-zinc-50 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-4">
        <span className="w-40 shrink-0">User</span>
        <span className="w-24 shrink-0">Rating</span>
        <span className="flex-1">Comment</span>
        <span className="w-32 shrink-0">Date</span>
        <span className="w-20 shrink-0 text-center">Action</span>
      </div>

      <ReviewManagementList />
    </div>
  );
}