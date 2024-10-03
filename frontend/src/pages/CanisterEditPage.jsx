import React, { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchCanister } from "../features/canisterSlice";
import ErrorComponents from "../custom/ErrorComponents";
import LabelComponents from "../custom/LabelComponents";
import ButtonComponents from "../custom/ButtonComponents";
import { InputComponents } from "../custom/InputComponents";
import { sessionData } from "../hooks/sessionData";
import { canisterErrorObj, handleEditCanister } from "../services/canisterApi";

function CanisterEditPage({ c, handleCloseModalEdit }) {
  const { data } = sessionData();
  let { isCanisterError, cnstrEditErrorMessage } = canisterErrorObj;
  let d = data.data;

  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    setError,
  } = useForm();

  useEffect(() => {
    if (c) {
      setValue("numberInputValue", c.canister_num || "");
      setValue("codeInputValue", c.canister_code || "");
      setValue("descriptionInputValue", c.canister_desc || "");
    }
  }, [c, setValue]);

  const handleSaveEditCanister = async () => {
    const { numberInputValue, codeInputValue, descriptionInputValue } =
      getValues();
    try {
      const response = await handleEditCanister({
        canister_ID: c.canister_ID,
        canister_code: codeInputValue,
        canister_num: numberInputValue,
        canister_desc: descriptionInputValue,
        logs_desc:
          "System detects that the user is trying to edit the canister and save without making any changes",
        logs_performBy: d.user_empid,
      });

      if (response) {
        dispatch(fetchCanister());
        handleCloseModalEdit();
      }
      return response;
    } catch (error) {
      setError("numberInputValue", {
        type: "manual",
        message: cnstrEditErrorMessage,
      });
      console.log("Error edit canister!", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSaveEditCanister)}
      className="p-4 font-inter w-[500px]"
    >
      <div className="text-center font-bold text-lg m-2">Edit Canister</div>
      <div>
        {c && (
          <div className="flex flex-col space-y-4">
            <div>
              <LabelComponents label="Number" />
              <InputComponents
                type="number"
                {...register("numberInputValue", { required: true })}
                className={`${
                  errors.numberInputValue?.type === "required" ||
                  errors.numberInputValue
                    ? "border-red-800 border"
                    : ""
                } bg-main-background text-text-color font-regular text-[14px] rounded-md p-2 outline-none w-full text-center`}
              />
              {errors.numberInputValue?.type === "required" && (
                <ErrorComponents label="Number value cannot be empty." />
              )}
              {errors.numberInputValue && (
                <ErrorComponents label={cnstrEditErrorMessage} />
              )}
            </div>
            <div>
              <LabelComponents label="Code" />
              <InputComponents
                {...register("codeInputValue", { required: true })}
                type="text"
                className={`${
                  errors.codeInputValue?.type === "required"
                    ? "border-red-800 border"
                    : ""
                } bg-main-background text-text-color font-regular text-[14px] rounded-md p-2 outline-none w-full text-center`}
              />
              {errors.codeInputValue?.type === "required" && (
                <>
                  <p role="alert" className="text-sm text-red-500 text-center">
                    Code value cannot be empty.
                  </p>
                </>
              )}
            </div>

            <div>
              <LabelComponents label="Description" />
              <InputComponents
                {...register("descriptionInputValue", { required: true })}
                type="text"
                className={`${
                  errors.descriptionInputValue?.type === "required"
                    ? "border-red-800 border"
                    : ""
                } bg-main-background text-text-color font-regular text-[14px] rounded-md p-2 outline-none w-full text-center`}
              />
              {errors.descriptionInputValue?.type === "required" && (
                <ErrorComponents label="Description value cannot be empty." />
              )}
            </div>
            <div className=" text-right space-x-3">
              <ButtonComponents
                label="Cancel"
                onClick={handleCloseModalEdit}
                textColor="text-black"
                textSize="14px"
                bgColor="bg-text-color"
              />
              <ButtonComponents
                label="Save Changes"
                type="submit"
                bgColor="bg-green-500"
                textSize="14px"
              />
            </div>
          </div>
        )}
      </div>
    </form>
  );
}

export default memo(CanisterEditPage);
