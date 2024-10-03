import React from "react";
import { useForm } from "react-hook-form";
import { addGroupData } from "../services/groupApi";
import { fetchGroupData } from "../features/groupSlice";
import { useDispatch } from "react-redux";
import LabelComponents from "../custom/LabelComponents";
import ErrorComponents from "../custom/ErrorComponents";
import ButtonComponents from "../custom/ButtonComponents";
import { systemAddLogs } from "../services/logsApi";
import { sessionData } from "../hooks/sessionData";

function GroupAdd({ closeModalGroupAdd }) {
  const { data } = sessionData();
  let d = data.data;
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleAddGroup = async (data) => {
    try {
      await addGroupData({
        grp_name: data.nameInput,
        grp_desc: data.descriptionInput,
      });
      await systemAddLogs({
        logs_type: "New Group",
        logs_desc: `Created a new group named ${data.numberInput}`,
        logs_performBy: d.user_empid,
      });
      dispatch(fetchGroupData());
      closeModalGroupAdd();
    } catch (error) {
      throw new error("error adding canister");
    }
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
      onSubmit={handleSubmit(handleAddGroup)}
      className="relative space-y-4 p-6 font-Inter w-[500px]"
    >
      <div className="text-center text-[20px] font-bold my-2">New Group</div>
      <div className="space-y-1">
        <LabelComponents label="Name:" />
        <InputComponents registerValue="nameInput" />
        {errors.nameInput?.type === "required" && (
          <ErrorComponents label="Name is required" />
        )}
      </div>
      <div className="space-y-1">
        <LabelComponents label="Description:" />
        <InputComponents registerValue="descriptionInput" />
        {errors.descriptionInput?.type === "required" && (
          <ErrorComponents label="Description is required" />
        )}
      </div>

      <div className="space-x-4 font-inter flex justify-end text-sm">
        <ButtonComponents
          onClick={closeModalGroupAdd}
          label="Cancel"
          bgColor="bg-text-color"
          textColor="text-main-background"
        />
        <ButtonComponents
          label="Submit"
          bgColor="bg-blue-500"
          textColor="text-text-color"
        />
      </div>
    </form>
  );
}

export default GroupAdd;
