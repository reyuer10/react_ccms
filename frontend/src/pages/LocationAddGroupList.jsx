import React from "react";

function LocationAddGroupList({ g, handleOptionClick }) {
  return (
    <li
      className="hover:bg-secondary-background cursor-pointer px-2 rounded p-1"
      onClick={() => handleOptionClick(g)}
      value={g.grp_ID}
    >
      {g.grp_name}
    </li>
  );
}

export default LocationAddGroupList;
