import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addUserData, getUserData } from "../services/userApi";
import { fetchUserData } from "../features/userSlice";
import { useDispatch } from "react-redux";
import LabelComponents from "../custom/LabelComponents";
import ErrorComponents from "../custom/ErrorComponents";
import ButtonComponents from "../custom/ButtonComponents";
import { systemAddLogs } from "../services/logsApi";
import { sessionData } from "../hooks/sessionData";

function UserAddData({ handleCloseModalAddUser }) {
  const { data } = sessionData();
  let d = data.data;
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleAddUserData = async (data) => {
    // const { userNameInput, passwordInput, fullNameInput, employeeIdInput } =
    //   getValues();

    try {
      const response = await addUserData({
        user_name: data.userNameInput,
        user_pass: data.passWordInput,
        user_fullname: data.fullnameInput,
        user_empid: data.employeeIdInput,
        permissions_id: data.permissionIdInput,
      });

      if (response) {
        await systemAddLogs({
          logs_type: "New User",
          logs_desc: `Created a new user named ${data.fullnameInput} - ${data.employeeIdInput}`,
          logs_performBy: d.user_empid,
        });

        dispatch(fetchUserData());
        handleCloseModalAddUser();
      }

      console.log(data);

      return response.data;
    } catch (error) {
      console.log("Error adding data from user", error);
    }
  };

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

  const InputUsername = () => {
    return (
      <input
        className=" bg-main-background text-text-color font-regular text-[14px] rounded-md p-2 outline-none w-full text-center"
        autoComplete="off"
        type="text"
        {...register("userNameInput", {
          required: true,
          pattern: {
            value: /\d/,
            message: "Username must contain numbers",
          },
        })}
      />
    );
  };

  const InputComponents = ({ registerValue }) => {
    return (
      <input
        className=" bg-main-background text-text-color font-regular text-[14px] rounded-md p-2 outline-none w-full text-center"
        type="text"
        autoComplete="off"
        {...register(`${registerValue}`, { required: true })}
      />
    );
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddUserData)}
      className="relative space-y-4 p-6 font-Inter w-[500px]"
    >
      <div className="text-center text-[20px] font-bold my-2">New User</div>
      <div className="space-y-1">
        <LabelComponents label={`Username:`} />
        <InputUsername />
        {errors.userNameInput?.type === "required" && (
          <ErrorComponents label={`Username is required`} />
        )}
        {errors.userNameInput && (
          <ErrorComponents label={errors.userNameInput.message} />
        )}
      </div>
      <div className="space-y-1">
        <LabelComponents label="Password:" />
        <input
          className=" bg-main-background text-text-color font-regular text-[14px] rounded-md p-2 outline-none w-full text-center"
          type="text"
          autoComplete="off"
          {...register("passWordInput", { required: true })}
        />
        {errors.passWordInput?.type === "required" && (
          <ErrorComponents label={`Password is required`} />
        )}
      </div>
      <div className="space-y-1">
        <LabelComponents label={`Full Name:`} />
        <InputComponents registerValue="fullnameInput" />
        {errors.fullnameInput?.type === "required" && (
          <ErrorComponents label={`Full Name is required`} />
        )}
      </div>
      <div className="flex items-center space-x-4">
        <div className="space-y-1">
          <LabelComponents label={`Employee Id:`} />
          <InputComponents registerValue="employeeIdInput" />
          {errors.employeeIdInput?.type === "required" && (
            <ErrorComponents label={`Employee id is required`} />
          )}
        </div>
        <div className="space-y-1">
          <LabelComponents label="Permissions:" />
          <select
            id="permissions"
            autoComplete="off"
            className=" bg-main-background text-[14px] p-[9px] text-text-color font-regular rounded-md outline-none w-[230px]"
            {...register("permissionIdInput", { required: true })}
          >
            <option value="">Choose a persmission</option>
            {dataPermission.map((p) => {
              return (
                <option key={p.permission_id} value={p.value}>
                  {p.display_value}
                </option>
              );
            })}
          </select>
          {errors.permissionIdInput?.type === "required" && (
            <ErrorComponents label={`Permissions is required`} />
          )}
        </div>
      </div>
      <div className="space-x-4 font-inter flex justify-end text-sm">
        <ButtonComponents
          label={`Submit`}
          bgColor={`bg-blue-500`}
          textColor={`text-text-color`}
          type={`submit`}
        />
        <ButtonComponents
          onClick={handleCloseModalAddUser}
          textColor="bg-text-color"
          bgColor="text-main-background"
          label="Cancel"
        />
      </div>
    </form>
  );
}

export default UserAddData;
