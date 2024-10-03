import React from "react";

function ModalCanister({
  isModalCanisterButtonOpen,
  handlCloseModal,
  children,
}) {
  if (!isModalCanisterButtonOpen) {
    return false;
  }
  return (
    <div
      // onClick={handlCloseModal}
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

export default ModalCanister;
