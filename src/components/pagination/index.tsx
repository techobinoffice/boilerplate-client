import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPageNumbers = () => {
    const pages: JSX.Element[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <li key={i}>
            <a
              href="#"
              onClick={() => onPageChange(i)}
              className={`flex items-center justify-center px-3 h-8 leading-tight ${
                currentPage === i
                  ? "text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
            >
              {i}
            </a>
          </li>
        );
      }
    } else {
      const startPage = Math.max(currentPage - 2, 1);
      const endPage = Math.min(currentPage + 2, totalPages);

      if (startPage > 1) {
        pages.push(
          <li key={1}>
            <a
              href="#"
              onClick={() => onPageChange(1)}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              1
            </a>
          </li>
        );
        if (startPage > 2) {
          pages.push(
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                ...
              </a>
            </li>
          );
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <li key={i}>
            <a
              href="#"
              onClick={() => onPageChange(i)}
              className={`flex items-center justify-center px-3 h-8 leading-tight ${
                currentPage === i
                  ? "text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
            >
              {i}
            </a>
          </li>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push(
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                ...
              </a>
            </li>
          );
        }
        pages.push(
          <li key={totalPages}>
            <a
              href="#"
              onClick={() => onPageChange(totalPages)}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {totalPages}
            </a>
          </li>
        );
      }
    }

    return pages;
  };

  return (
    <div className="text-center mt-5">
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <a
            href="#"
            onClick={() => onPageChange(currentPage - 1)}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            style={{ pointerEvents: currentPage === 1 ? "none" : "auto" }}
          >
            Previous
          </a>
        </li>
        {renderPageNumbers()}
        <li>
          <a
            href="#"
            onClick={() => onPageChange(currentPage + 1)}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            style={{
              pointerEvents: currentPage === totalPages ? "none" : "auto",
            }}
          >
            Next
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
