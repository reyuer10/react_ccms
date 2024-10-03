import React from "react";

function ButtonComponents({
  label,
  type,
  onClick,
  bgColor,
  textColor,
  textSize,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${bgColor} ${textColor} text-[${textSize}] px-4 py-2  rounded-lg font-bold`}
    >
      {label}
    </button>
  );
}

export default ButtonComponents;
