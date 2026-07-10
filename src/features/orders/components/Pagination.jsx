export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) {
    return null;
  }


  return (
    <div className="
      mt-8
      flex
      items-center
      justify-center
      gap-3
    ">

      <button
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
        className="
          rounded-lg
          border
          border-stone-300
          bg-white
          px-4
          py-2
          text-sm
          font-medium
          text-gray-700
          transition
          hover:border-rust
          disabled:opacity-40
        "
      >
        ←
      </button>


      <span className="
        rounded-lg
        bg-rust
        px-4
        py-2
        text-sm
        font-medium
        text-white
      ">
        {currentPage + 1} / {totalPages}
      </span>


      <button
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
        className="
          rounded-lg
          border
          border-stone-300
          bg-white
          px-4
          py-2
          text-sm
          font-medium
          text-gray-700
          transition
          hover:border-rust
          disabled:opacity-40
        "
      >
        →
      </button>

    </div>
  );
}