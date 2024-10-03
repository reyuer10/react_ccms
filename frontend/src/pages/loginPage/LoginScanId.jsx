import React, { memo, useEffect, useState } from "react";
import ScanId from "../../assets/img/scan-id.png";

function LoginScanId({
  rfidCodeInput,
  setRfidCodeInput,
  handleLoginCredentials,
  isError,
  validationMessage,
  ScanInputRef,
  handleCheckLoginStatus,
  handleImageClick,
  focusImage,
}) {
  useEffect(() => {
    ScanInputRef.current.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (rfidCodeInput.length >= 10 || e.key === "Enter") {
        handleLoginCredentials();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [rfidCodeInput]);

  return (
    <div className="flex flex-col justify-center items-center">
      {/* <button className="text-white" onClick={handleCheckLoginStatus}>
        check Status
      </button>


      <button className="px-4 py-2 rounded bg-blue-500 text-white" onClick={handleLoginCredentials}>
        submit
      </button> */}
      <img
        onClick={handleImageClick}
        src={ScanId}
        alt="Scan ID"
        className={`${
          focusImage
            ? " scale-95 animate-pulse  shadow-blue-500 shadow-2xl rounded-[40px]"
            : ""
        } h-[260px] cursor-pointer transition-all`}
      />
      <div>
        <input
          ref={ScanInputRef}
          type="text"
          id="userRfidCodeInput"
          autoComplete="off"
          // className=" opacity-0"
          value={rfidCodeInput}
          onChange={(e) => setRfidCodeInput(e.target.value)}
        />
        {isError && (
          <p className=" font-normal text-red-500 text-sm ">
            {validationMessage}
          </p>
        )}
      </div>
    </div>
  );
}

export default memo(LoginScanId);
