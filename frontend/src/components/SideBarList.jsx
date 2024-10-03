import React, { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchCanister } from "../features/canisterSlice";

function SideBarList({ d }) {
  const dispatch = useDispatch();

  const handleFetchData = useCallback(
    (id) => {
      if (id === 7) {
        dispatch(fetchCanister());
      }
    },
    [dispatch]
  );

  return (
    <ul className=" font-inter">
      <NavLink
        to={d.dNavLink}
        className={`flex items-center px-1 space-x-4 font-medium hover:bg-main-background rounded-md py-2 `}
        onClick={() => handleFetchData(d.dNavId)}
      >
        <div className=" text-text-color fill-current mx-2 ">{d.dNavSvg}</div>
        <p className="text-sm ">{d.dNavName}</p>
      </NavLink>
    </ul>
  );
}

export default memo(SideBarList);
