import React from "react";

function ModalEditCanister({
  isEditButtonClick,
  handleCloseModalEdit,
  children,
}) {
  if (!isEditButtonClick) {
    return false;
  }
  return (
    <div
      // onClick={handleCloseModalEdit}
      className=" z-50 inset-0 absolute flex justify-center items-center  transition-colors bg-transparent-black"
    >
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

export default ModalEditCanister;
