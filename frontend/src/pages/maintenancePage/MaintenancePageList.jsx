import React from "react";

function MaintenancePageList({ m, handleTabClickButton, tabPage }) {
  return (
    <div
      onClick={() => handleTabClickButton(m.mId)}
      key={m.mId}
      className={`px-4 py-2 rounded-t-xl cursor-pointer bg-secondary-background mr-[2px] border-b-2 border-b-main-background ${
        tabPage === m.mId ? "border-none" : "shadow shadow-black"
      }`}
    >
      <p className="font-semibold">{m.mName}</p>
    </div>
  );
}

export default MaintenancePageList;
