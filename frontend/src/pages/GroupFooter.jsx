import React from "react";

function GroupFooter({
  groupData,
  handleGroupPaginate,
  GroupCurrentPage,
  GroupItemsPerPage,
}) {
  return (
    <div className="flex items-center flex-column flex-wrap md:flex-row justify-end pt-4 text-[14px]">
      <div className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <div className="flex text-main-background">
          <button
            onClick={() => handleGroupPaginate(GroupCurrentPage - 1)}
            disabled={GroupCurrentPage === 1}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </button>
          <div>
            <button
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white `}
            >
              {GroupCurrentPage}
            </button>
          </div>
          <button
            onClick={() => handleGroupPaginate(GroupCurrentPage + 1)}
            disabled={
              GroupCurrentPage ===
              Math.ceil(groupData.length / GroupItemsPerPage)
            }
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
              GroupCurrentPage ===
              Math.ceil(groupData.length / GroupItemsPerPage)
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default GroupFooter;
