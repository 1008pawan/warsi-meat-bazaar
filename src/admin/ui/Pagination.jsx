import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  perPage,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * perPage + 1;
  const endItem = Math.min(currentPage * perPage, totalItems);

  const getPages = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <p className="text-sm text-gray-500">
        Showing <span className="font-semibold">{startItem}</span> to{" "}
        <span className="font-semibold">{endItem}</span> of{" "}
        <span className="font-semibold">{totalItems}</span> entries
      </p>

      <div className="flex items-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex h-10 w-10 bg-white shadow-3xl items-center justify-center rounded-lg border border-zinc-300 cursor-pointer disabled:opacity-50"
        >
          <ChevronLeft size={18} />
        </button>

        {getPages().map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-2">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`h-10 w-10 rounded-lg transition border-zinc-200 cursor-pointer ${
                currentPage === page
                  ? "bg-red-600 text-white"
                  : "border hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ),
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex h-10 w-10 bg-white items-center justify-center rounded-lg border border-zinc-300 cursor-pointer disabled:opacity-50"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
