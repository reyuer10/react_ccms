import React from "react";

function UserFooter({
  filteredUserData,
  userItemsPerPage,
  userCurrentPage,
  handleUserPaginate,
}) {
  return (
    <div className="flex items-center flex-column flex-wrap md:flex-row justify-end pt-4">
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <li className="flex text-main-background">
          <button
            onClick={() => handleUserPaginate(userCurrentPage - 1)}
            disabled={userCurrentPage === 1}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </button>
          <button
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white `}
          >
            {userCurrentPage}
          </button>
          <button
            onClick={() => handleUserPaginate(userCurrentPage + 1)}
            disabled={
              userCurrentPage ===
              Math.ceil(filteredUserData.length / userItemsPerPage)
            }
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              userCurrentPage ===
              Math.ceil(filteredUserData.length / userItemsPerPage)
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
}

export default UserFooter;
