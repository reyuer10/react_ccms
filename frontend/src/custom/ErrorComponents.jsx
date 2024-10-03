import React from "react";

function ErrorComponents({ label }) {
  return (
    <p role="alert" className="text-sm text-red-500 text-center ">
      {label}
    </p>
  );
}

export default ErrorComponents;
