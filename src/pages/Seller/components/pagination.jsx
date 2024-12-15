import React from 'react';

const Pagination = ({
  pageNumber,
  totalPages,
  totalElements,
  handlePrevious,
  handleNext,
  setPageNumber,
  size,
}) => {
  const getPageNumbers = () => {
    const range = [];
    const start = Math.max(0, pageNumber - 2); // Hiển thị 2 trang trước
    const end = Math.min(totalPages - 1, pageNumber + 2); // Hiển thị 2 trang sau

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  return (
    <div className="py-6 flex border-t border-stroke dark:border-strokedark px-4 md:px-6 xl:px-7.5">
      {/* Mobile view */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={handlePrevious}
          disabled={pageNumber === 0}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={pageNumber === totalPages - 1}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </button>
      </div>

      {/* Desktop view */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700 dark:text-white">
            Showing
            <span className="font-medium"> {pageNumber * size + 1} </span>
            to+
            <span className="font-medium"> {Math.min((pageNumber + 1) * size, totalElements)} </span>
            of
            <span className="font-medium"> {totalElements} </span>
            results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={handlePrevious}
              disabled={pageNumber === 0}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" />
              </svg>
            </button>
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => setPageNumber(page)}
                className={`relative z-10 inline-flex items-center justify-center w-10 h-10 text-sm font-semibold ${page === pageNumber ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  } ring-1 ring-inset ring-gray-300 focus:outline-offset-0`}
              >
                {page + 1}
              </button>
            ))}
            <button
              onClick={handleNext}
              disabled={pageNumber === totalPages - 1}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
