import React, { forwardRef } from "react";

export const InputComponents = forwardRef(({ ...props }, ref) => {
  {
    return <input ref={ref} autoComplete="off" {...props} />;
  }
});
