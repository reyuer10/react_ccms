import React, { useState } from "react";

function CardColorFooter({
  cardColorPerItems,
  setCardColorPerItems,
  cardColorLastPage,
  setCardColorPage,
  cardColorPage,
}) {
  const handleNextPage = () => {
    if (cardColorPage !== cardColorLastPage) {
      setCardColorPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (cardColorPage !== 1) {
      setCardColorPage((prevPage) => prevPage - 1);
    }
  };

  let saveSelectInput = localStorage.setItem(
    "saveSelectInput",
    cardColorPerItems
  );


  

  const handleInputChange = (event) => {
    setCardColorPerItems(event.target.value);
  };

  return (
    <div className="text-right text-sm font-inter flex items-center justify-between mt-4 transition-colors">
      <div className="space-x-2 flex items-center">
        <p className="font-normal">Number of Items:</p>
        <select
          name="numOfItemsInput"
          id="numOfItemsInput"
          className="text-text-color bg-secondary-background"
          value={localStorage.getItem(saveSelectInput)}
          onChange={handleInputChange}
        >
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
      </div>
      <div className="text-right flex items-center font-medium ">
        <button
          className=" px-3 py-[4px] bg-text-color text-black rounded-l-md"
          onClick={handlePrevPage}
        >
          Previous
        </button>
        <p className=" px-4 py-[4px] bg-text-color text-black border-x-black border-x">
          {cardColorPage}
        </p>
        {/*  */}
        <button
          className={`${
            cardColorPage === cardColorLastPage && " opacity-70 cursor-default "
          }  px-3 py-[4px] bg-text-color text-black rounded-r-md hover:bg-slate-300 transition-colors`}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CardColorFooter;
