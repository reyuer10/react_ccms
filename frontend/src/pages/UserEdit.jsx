import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { editUserData } from "../services/userApi";
import { useDispatch } from "react-redux";
import { fetchUserData } from "../features/userSlice";
import ErrorComponents from "../custom/ErrorComponents";
import LabelComponents from "../custom/LabelComponents";
import ButtonComponents from "../custom/ButtonComponents";

function UserEdit({ getUserData, handleRemoveModal }) {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    register,
  } = useForm();

  const dataPermission = [
    {
      permission_id: 1,
      value: 1,
      display_value: "Example 1",
    },
    {
      permission_id: 2,
      value: 2,
      display_value: "Example 2",
    },
    {
      permission_id: 3,
      value: 3,
      display_value: "Example 3",
    },
    {
      permission_id: 4,
      value: 4,
      display_value: "Example 4",
    },
  ];

  const InputComponent = ({ registerValue }) => {
    return (
      <input
        type="text"
        className=" bg-main-background text-text-color font-regular text-[14px] rounded-md p-2 outline-none w-full text-center"
        autoComplete="off"
        {...register(`${registerValue}`, { required: true })}
      />
    );
  };

  useEffect(() => {
    if (getUserData) {
      getUserData.map((d) => {
        setValue("user_id", d.user_id || "");
        setValue("employeeIdInput", d.user_empid || "");
        setValue("permissionIdInput", d.permissions_id);
        setValue("fullnameInput", d.user_fullname || "");
        setValue("usernameInput", d.user_name || "");
        setValue("passwordInput", d.user_pass || "");
      });
    }
  }, [getUserData, setValue]);

  const onSubmit = async () => {
    const {
      user_id,
      permissionIdInput,
      fullnameInput,
      usernameInput,
      passwordInput,
      employeeIdInput,
    } = getValues();
    try {
      const response = await editUserData(user_id, {
        user_name: usernameInput,
        user_pass: passwordInput,
        user_fullname: fullnameInput,
        user_empid: employeeIdInput,
        permissions_id: permissionIdInput,
      });
      dispatch(fetchUserData());
      handleRemoveModal();
      return response;
    } catch (error) {
      console.log("Error editing user from user!", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="font-inter">
      <div className="text-center font-bold text-text-color text-xl p-4">
        <p>Edit User</p>
      </div>
      {getUserData && (
        <>
          <div className="flex px-4 space-x-6">
            <div className="flex flex-col">
              <LabelComponents label="Username:" />
              <input
                type="text"
                className=" bg-main-background text-text-color font-regular text-[14px] rounded-md p-2 outline-none w-full text-center"
                autoComplete="off"
                {...register("usernameInput", { required: true })}
              />
              {errors.usernameInput?.type === "required" && (
                <ErrorComponents label="Username cannot be empty." />
              )}
            </div>
            <div className="flex flex-col">
              <LabelComponents label="Password:" />
              <InputComponent registerValue="passwordInput" />
              {errors.passwordInput?.type === "required" && (
                <ErrorComponents label="Password cannot be empty." />
              )}
            </div>
          </div>
          <div className="m-4">
            <LabelComponents label="Full Name:" />
            <InputComponent registerValue="fullnameInput" />
            {errors.fullnameInput?.type === "required" && (
              <ErrorComponents label="Fullname cannot be empty." />
            )}
          </div>
          <div className="flex items-center px-4 space-x-6">
            <div>
              <LabelComponents label="Employee id:" />
              <InputComponent registerValue="employeeIdInput" />
              {errors.employeeIdInput?.type === "required" && (
                <ErrorComponents lable="Employee id cannot be empty." />
              )}
            </div>
            <div>
              <div className="space-y-1 mb-2">
                <LabelComponents label="Permissions:" />
                <select
                  id="permissions"
                  autoComplete="off"
                  className=" bg-main-background text-[14px] p-[9px] text-text-color font-regular rounded-md outline-none w-[210px]"
                  {...register("permissionIdInput", { required: true })}
                >
                  {/* <option value="none">Choose a persmission</option> */}
                  {dataPermission.map((p) => {
                    return (
                      <option key={p.permission_id} value={p.value}>
                        {p.display_value}
                      </option>
                    );
                  })}
                </select>
                {errors.permissionIdInput?.type === "required" && (
                  <ErrorComponents label="Permissions is required" />
                )}
              </div>
            </div>
          </div>
          <div className="text-right p-4 space-x-4">
            <ButtonComponents
              label="Cancel"
              bgColor="bg-text-color"
              textColor="text-black"
              textSize="14px"
              onClick={handleRemoveModal}
            />
            <ButtonComponents
              label="Save changes"
              textColor="text-text-color"
              bgColor="bg-green-500"
              textSize="14px"
              type="Submit"
            />
          </div>
        </>
      )}
    </form>
  );
}

export default memo(UserEdit);
