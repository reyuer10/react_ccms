import React, { memo } from "react";

function CanisterFooter({ canister, paginate, itemsPerPage, currentPage }) {
  return (
    <nav
      className="flex items-center flex-column flex-wrap md:flex-row justify-end pt-4"
      aria-label="Table navigation"
    >
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </button>
        </li>
        <div>
          <button
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white `}
          >
            {currentPage}
          </button>
        </div>
        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              currentPage === Math.ceil(canister.length / itemsPerPage)
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={currentPage === Math.ceil(canister.length / itemsPerPage)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default memo(CanisterFooter);
