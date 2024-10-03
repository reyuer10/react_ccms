import React, { useState } from "react";
// import ErrorComponents from "../../custom/ErrorComponents";
import { eyeCrossedIcons, eyeIcons } from "../../assets/data/svg";

function LoginNextButton({
  handleSubmit,
  handleLoginCredentials,
  register,
  errors,
}) {
  const [isEyeIconClick, setIsEyeIconClick] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(handleLoginCredentials)();
      }}
      className="flex flex-col box-border w-[350px]"
    >
      <div className="space-y-2">
        <div>
          <p className="font-inter text-text-color block">User ID</p>
          <input
            type="text"
            id="user-id"
            className={`rounded font-extrabold outline-none w-full px-3 py-1 text-center  ${
              errors.userpasswordInput?.type === "required" &&
              "  border-2 border-red-500 rounded "
            }`}
            autoComplete="off"
            {...register("userIdInput", { required: true })}
          />
          {errors.userIdInput?.type === "required" && (
            <p className=" font-normal text-red-500 text-sm">
              User Id is required!
            </p>
          )}
          {errors.userIdInput && (
            <p className=" font-normal text-red-500 text-sm">
              {errors.userIdInput.message}
            </p>
          )}
        </div>
        <div className="relative">
          <p
            htmlFor="user-password"
            className="font-inter text-text-color block textce"
          >
            Password
          </p>
          <input
            type={isEyeIconClick ? `text` : `password`}
            id="user-password"
            className={`rounded font-extrabold outline-none px-3 w-full py-1 text-center ${
              errors.userpasswordInput?.type === "required" &&
              "  border-2 border-red-500 rounded"
            }`}
            autoComplete="off"
            {...register("userpasswordInput", { required: true })}
          />
          {errors.userpasswordInput?.type === "required" && (
            <p className=" font-normal text-red-500 text-sm">
              Password is required!
            </p>
          )}
          <span
            onClick={() => setIsEyeIconClick(!isEyeIconClick)}
            className="absolute right-0 p-1 mx-1"
          >
            {isEyeIconClick ? <>{eyeIcons}</> : <>{eyeCrossedIcons}</>}
          </span>
        </div>
      </div>
      <div className=" my-7">
        <button
          className="w-full text-sm font-bold  text-text-color bg-blue-500 rounded-md py-2"
          type="submit"
        >
          Login
        </button>
      </div>
      {errors.userpasswordInput && (
        <p className=" font-normal text-red-500 text-sm text-center">
          {errors.userpasswordInput.message}
        </p>
      )}
    </form>
  );
}

export default LoginNextButton;
