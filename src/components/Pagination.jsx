export default function Pagination({
  currentPage,
  onPageChange,
  hasMore = true,
}) {
  return (
    <div className="flex justify-end items-center gap-2 mb-2">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`join-item btn btn-primary rounded-lg border-0 border-secondary p-0 px-2 h-9 ${
          !hasMore ? 'btn-disabled' : ''
        }`}
      >
        <img
          src="/assets/images/arrow-left.svg"
          className={`h-4 ${currentPage === 1 ? '' : 'brightness-0 invert'}`}
          alt=""
        />
      </button>

      <span className="px-3 py-1 text-sm font-medium text-gray-700">
        Page {currentPage}
      </span>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasMore}
        className={`join-item btn btn-primary rounded-lg border-0 border-secondary p-0 px-2 h-9 ${
          !hasMore ? 'btn-disabled' : ''
        }`}
      >
        <img
          src="/assets/images/arrow-right.svg"
          className={`h-4 ${!hasMore ? '' : 'brightness-0 invert'}`}
          alt=""
        />
      </button>
    </div>
  );
}
