import React from "react";

function ModalEditGroup({ openModalEditGroup, children }) {
  if (!openModalEditGroup) {
    return false;
  }
  return (
    <div className=" z-50 inset-0 absolute flex justify-center items-center  transition-colors bg-transparent-black">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-secondary-background rounded-xl"
      >
        {children}
      </div>
    </div>
  );
}

export default ModalEditGroup;
