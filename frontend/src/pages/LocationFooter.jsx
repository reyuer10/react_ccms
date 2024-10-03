import React, { memo } from "react";

function LocationFooter({
  locationCurrentPage,
  locationCurrentItems,
  locationItemsPerPage,
  locationPaginate,
  locationHandlePrevPage,
  locationHandleNextPage,
  location,
}) {
  let locationLastPage = Math.ceil(location.length / locationItemsPerPage);
  return (
    <div className="flex items-center flex-column flex-wrap md:flex-row justify-end pt-4 text-[14px]">
      <div className="flex text-main-background">
        <div>
          <button
            onClick={locationHandlePrevPage}
            disabled={locationCurrentPage === 1}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </button>
        </div>
        <div>
          <button
            className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
          >
            {locationCurrentPage}
          </button>
        </div>
        <button
          onClick={locationHandleNextPage}
          disabled={locationCurrentPage === locationLastPage}
          className={`flex items-center justify-center px-3 h-8 leading-tight bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 text-main-background`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default memo(LocationFooter);
