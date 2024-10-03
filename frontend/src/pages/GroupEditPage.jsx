import React, { memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { editGroupData } from "../services/groupApi";
import { useDispatch } from "react-redux";
import { fetchGroupData } from "../features/groupSlice";
import ErrorComponents from "../custom/ErrorComponents";
import LabelComponents from "../custom/LabelComponents";
import ButtonComponents from "../custom/ButtonComponents";

function GroupEditPage({ getGroupId, closeModalEdit }) {
  const dispatch = useDispatch();
  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    getValues,
  } = useForm();

  useEffect(() => {
    if (getGroupId) {
      setValue("editNameInput", getGroupId.grp_name || "");
      setValue("editDescriptionInput", getGroupId.grp_desc || "");
    }
  }, [getGroupId, setValue]);

  const handleSubmitEditGroup = async () => {
    const { editNameInput, editDescriptionInput } = getValues();
    try {
      const response = await editGroupData({
        grp_name: editNameInput,
        grp_desc: editDescriptionInput,
        grp_ID: getGroupId.grp_ID,
      });
      dispatch(fetchGroupData());
      closeModalEdit();
      return response.data;
    } catch (error) {
      console.log("Error editing data from group", error);
    }
  };

  const InputComponent = ({ registerValue }) => {
    return (
      <input
        {...register(`${registerValue}`, { required: true })}
        type="text"
        className=" bg-main-background text-text-color font-regular text-[14px] rounded-md p-2 outline-none w-full text-center"
      />
    );
  };

  return (
    <form
      className="w-[500px] p-4"
      onSubmit={handleSubmit(handleSubmitEditGroup)}
    >
      <div className="space-y-4">
        <div className="text-center font-bold text-text-color text-xl">
          <p>Edit Group</p>
        </div>
        <div>
          <LabelComponents label="Name" />
          <InputComponent registerValue="editNameInput" />
          {errors.editNameInput?.type === "required" && (
            <ErrorComponents label="Name field cannot be empty." />
          )}
        </div>
        <div>
          <LabelComponents label="Description" />
          <InputComponent registerValue="editDescriptionInput" />
          {errors.editDescriptionInput?.type === "required" && (
            <ErrorComponents label="Description field cannot be empty." />
          )}
        </div>
        <div className="text-right space-x-4">
          <ButtonComponents
            label="Cancel"
            onClick={closeModalEdit}
            bgColor="bg-text-color"
            textColor="text-black"
            textSize="14px"
          />
          <ButtonComponents
            label="Save"
            type="submit"
            bgColor="bg-green-500"
            textSize="14px"
          />
        </div>
      </div>
    </form>
  );
}

export default memo(GroupEditPage);
