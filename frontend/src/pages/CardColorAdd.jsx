import React, { useEffect } from "react";
import ButtonComponents from "../custom/ButtonComponents";
import { useForm } from "react-hook-form";
import ErrorComponents from "../custom/ErrorComponents";
import LabelComponents from "../custom/LabelComponents";
import { fetchAddCardColor } from "../services/cardColorApi";
// import { useModal } from "../hooks/useModal";
import { useDispatch } from "react-redux";
import { fetchCardColorData } from "../features/cardColorSlice";
import { systemAddLogs } from "../services/logsApi";
import { sessionData } from "../hooks/sessionData";

function CardColorAdd({ handleCancelCardColor }) {
  const { data } = sessionData();
  let d = data.data;
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleAddCardColor = async (data) => {
    const response = await fetchAddCardColor({
      cardcolor_name: data.cardColorInput,
    });
    if (response) {
      systemAddLogs({
        logs_type: "New Card Color",
        logs_desc: `Created a new card color named ${data.cardColorInput}`,
        logs_performBy: d.user_empid,
      });
      handleCancelCardColor();
      dispatch(fetchCardColorData());
    }
    return response.data;
  };

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        handleCancelCardColor();
      }
    };
    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  return (
    <form
      onSubmit={handleSubmit(handleAddCardColor)}
      className="w-[500px] p-4 space-y-4"
    >
      <div>
        <p className="text-center text-[20px] font-bold my-2">New Card Color</p>
      </div>
      <div>
        <LabelComponents label="Card Color" />
        <input
          className="bg-main-background text-text-color font-regular text-[14px] rounded-md p-2 outline-none w-full text-center"
          autoComplete="off"
          type="text"
          {...register("cardColorInput", { required: true })}
        />
        {errors.cardColorInput?.type === "required" && (
          <ErrorComponents label="Card color is required" />
        )}
      </div>
      <div className="space-x-4 text-right">
        <ButtonComponents
          label={`Submit`}
          bgColor={`bg-blue-500`}
          textColor={`text-text-color`}
          type={`submit`}
        />
        <ButtonComponents
          onClick={handleCancelCardColor}
          label="Cancel"
          textColor="bg-text-color"
          bgColor="text-main-background"
        />
      </div>
    </form>
  );
}

export default CardColorAdd;
