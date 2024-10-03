import React from "react";

function ModalEditLocation({ children, isModalLocationOpen }) {
  if (!isModalLocationOpen) {
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

export default ModalEditLocation;
