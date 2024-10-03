import React from "react";

function ModalAddLocation({
  openModalAddLocation,
  isDropdownVisible,
  setIsDropdownVisible,
  ModalAddLocation,
  children,
}) {
  if (!openModalAddLocation) {
    return false;
  }
  return (
    <div
      onClick={() => {
        isDropdownVisible = true ? setIsDropdownVisible(false) : null;
      }}
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

export default ModalAddLocation;
