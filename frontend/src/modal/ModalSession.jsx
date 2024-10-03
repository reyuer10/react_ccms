import React from "react";

function ModalSession() {
  return (
    <div className="inset-0 absolute flex justify-center items-center z-50 transition-colors bg-transparent-black ">
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        Session
      </div>
    </div>
  );
}

export default ModalSession;
