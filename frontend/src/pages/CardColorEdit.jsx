import React, { useCallback, useEffect, useState } from "react";
import ButtonComponents from "../custom/ButtonComponents";
import { useForm } from "react-hook-form";
import ErrorComponents from "../custom/ErrorComponents";
import LabelComponents from "../custom/LabelComponents";
import { fetchEditCardColor } from "../services/cardColorApi";
import { useDispatch } from "react-redux";
import { fetchCardColorData } from "../features/cardColorSlice";

function CardColorEdit({ data, handleRemoveModal }) {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  useEffect(() => {
    if (data) {
      setValue("newCardColorValueInput", data.cardcolor_name || "");
    }
  }, [setValue]);

  const handleCancelEditCardColor = useCallback(() => {
    handleRemoveModal();
  }, []);

  const handleSaveEditFromCardColor = async () => {
    const { newCardColorValueInput } = getValues();
    await fetchEditCardColor({
      cardcolor_name: newCardColorValueInput,
      cardcolor_ID: data.cardcolor_ID,
    });

    console.log("Value of new input card color: ", newCardColorValueInput);
    console.log("Value of a card color id: ", data.cardcolor_ID);
    dispatch(fetchCardColorData());
    handleCancelEditCardColor();
  };

  useEffect(() => {
    const handleEscKeyForEdit = (e) => {
      if (e.key === "Escape") {
        handleCancelEditCardColor();
      }
    };

    document.addEventListener("keydown", handleEscKeyForEdit);

    return () => {
      document.removeEventListener("keydown", handleEscKeyForEdit);
    };
  }, []);

  return (
    <form
      className="w-[500px] p-4 space-y-4"
      onSubmit={handleSubmit(handleSaveEditFromCardColor)}
    >
      <div></div>
      <div>
        <LabelComponents label="Card Color" />
        <input
          className="bg-main-background text-text-color font-regular text-[14px] rounded-md p-2 outline-none w-full text-center"
          autoComplete="off"
          type="text"
          {...register("newCardColorValueInput", { required: true })}
        />
        {errors.newCardColorValueInput?.type === "required" && (
          <ErrorComponents label="Card color cannot be empty." />
        )}
      </div>
      <div className="space-x-4 text-right">
        <ButtonComponents
          label="Cancel"
          onClick={handleCancelEditCardColor}
          bgColor="bg-text-color"
          textColor="text-black"
          textSize="14px"
        />
        <ButtonComponents
          bgColor="bg-green-500"
          label="Save Changes"
          textColor=" text-text-color"
          type="submit"
          textSize="14px"
        />
      </div>
    </form>
  );
}

export default CardColorEdit;
