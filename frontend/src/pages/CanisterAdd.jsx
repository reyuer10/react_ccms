import React, { useEffect } from "react";
import { canisterErrorObj, handleAddCanister } from "../services/canisterApi";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchCanister } from "../features/canisterSlice";
import ButtonComponents from "../custom/ButtonComponents";
import ErrorComponents from "../custom/ErrorComponents";
import LabelComponents from "../custom/LabelComponents";
import { sessionData } from "../hooks/sessionData";
import { InputComponents } from "../custom/InputComponents";
import { systemAddLogs } from "../services/logsApi";

function CanisterAdd({ handlCloseModal }) {
  const { data } = sessionData();
  let sData = data.data;
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm();

  const addCanister = async (data) => {
    try {
      const response = await handleAddCanister({
        canister_num: data.numberInput,
        canister_code: data.codeInput,
        canister_desc: data.descriptionInput,
      });

      if (response.data) {
        await systemAddLogs({
          logs_type: `New Canister`,
          logs_desc: `Created a new canister number ${data.numberInput}`,
          logs_performBy: sData.user_empid,
        });

        dispatch(fetchCanister());
        handlCloseModal();
      }

      return response.data;
    } catch (error) {
      setError("numberInput", {
        type: "manual",
        message: canisterErrorObj.errorMessage,
      });
    }
  };

  // ${
  //   errors.numberInput?.type === "required"
  //     ? "border-red-800 border"
  //     : ""
  // }

  return (
    <form
      onSubmit={handleSubmit(addCanister)}
      className="relative space-y-4 p-6 font-Inter w-[500px]"
    >
      <div className="text-center text-[20px] font-bold my-2">New Canister</div>

      <div className="space-y-1">
        <LabelComponents label="Number" />
        <input
          className={`${
            errors.numberInput?.type === "required" || errors.numberInput
              ? "border-red-800 border"
              : ""
          } bg-main-background text-text-color font-regular text-[14px] rounded-md p-2 outline-none w-full text-center`}
          type="number"
          {...register("numberInput", { required: true })}
        />
        {errors.numberInput?.type === "required" && (
          <ErrorComponents label={`Number is required`} />
        )}
        {errors.numberInput && (
          <ErrorComponents label={errors.numberInput.message} />
        )}
      </div>
      <div className="space-y-1">
        <LabelComponents label="Code" />
        <InputComponents
          type="text"
          {...register("codeInput", { required: true })}
          className={`${
            errors.codeInput?.type === "required" ? "border-red-800 border" : ""
          } bg-main-background text-text-color font-regular text-[14px] rounded-md p-2 outline-none w-full text-center`}
        />
        {errors.codeInput?.type === "required" && (
          <ErrorComponents label={`Code is required`} />
        )}
      </div>
      <div className="space-y-1">
        <LabelComponents label="Description" />
        <InputComponents
          type="text"
          {...register("descriptionInput", { required: true })}
          className={`${
            errors.descriptionInput?.type === "required"
              ? "border-red-800 border"
              : ""
          } bg-main-background text-text-color font-regular text-[14px] rounded-md p-2 outline-none w-full text-center`}
        />
        {errors.descriptionInput?.type === "required" && (
          <ErrorComponents label={`Description is required`} />
        )}
      </div>
      <div className="space-x-4 font-inter flex justify-end text-sm">
        <ButtonComponents
          onClick={handlCloseModal}
          label={`Cancel`}
          textColor={`text-main-background`}
          bgColor={`bg-text-color`}
        />
        <ButtonComponents
          type="submit"
          label={`Submit`}
          bgColor={`bg-blue-500`}
          textColor={`text-text-color`}
        />
      </div>
    </form>
  );
}

export default CanisterAdd;
