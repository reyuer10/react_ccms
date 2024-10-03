import React from "react";

function ModalAddGroup({ isModalOpen, children }) {
  if (!isModalOpen) {
    return false;
  }
  return (
    <div className=" inset-0 absolute flex justify-center items-center z-50 transition-colors bg-transparent-black">
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

export default ModalAddGroup;
