import React, { memo, useEffect, useState } from "react";
import LabelComponents from "../custom/LabelComponents";
import ButtonComponents from "../custom/ButtonComponents";
import { useForm } from "react-hook-form";
import ErrorComponents from "../custom/ErrorComponents";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocationData } from "../features/locationSlice";
import { editLocationData, errorObj } from "../services/locationApi";
import { fetchGroupData } from "../features/groupSlice";

function LocationEditPage({ handleCloseModalEditLocation, locationGetId }) {
  const { group } = useSelector((state) => state.group);
  const [groupData, setGroup] = useState([]);
  const dispatch = useDispatch();

  const [groupSearchFilter, setGroupSearchFilter] = useState("");
  const [groupIsDropDownVisible, setGroupDropDOwnVisible] = useState(false);

  const groupDataFilter = group.filter((g) =>
    g.grp_name.toUpperCase().includes(groupSearchFilter.toUpperCase())
  );
  const groupDataSort = groupDataFilter.sort((a, b) => a.grp_ID - b.grp_ID);

  const handleGroupOnchange = (e) => {
    setGroupSearchFilter(e.target.value);
    setGroup(groupDataFilter);
  };

  const handleSelectFilter = (g) => {
    setGroupSearchFilter(g.grp_name);
    setGroupDropDOwnVisible(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    getValues,
  } = useForm();

  const handleChangeToUpperCase = (e) => {
    return e.target.value.toUpperCase();
  };

  useEffect(() => {
    if (locationGetId) {
      setValue("locNameEdit", locationGetId.loc_name || "");
      setValue("descEditValue", locationGetId.loc_desc || "");
      setGroupSearchFilter(locationGetId.grp_name || "");
    }
    dispatch(fetchGroupData());
  }, [locationGetId, setValue, dispatch]);

  const handleSaveEditLocation = async () => {
    const { locNameEdit, descEditValue } = getValues();
    try {
      const response = await editLocationData({
        loc_name: locNameEdit.toUpperCase().trim(),
        loc_desc: descEditValue.toUpperCase().trim(),
        grp_name: groupSearchFilter.toUpperCase().trim(),
        loc_ID: locationGetId.loc_ID,
      });

      handleCloseModalEditLocation();
      dispatch(fetchLocationData());
      return response;
    } catch (error) {
      setError("groupSearchFilter", {
        type: "manual",
        message: errorObj.errGroupEditMessage,
      });
      console.log("Error edit data from location", error);
    }
  };

  const handleStopPropagation = (e) => {
    return e.stopPropagation();
  };

  return (
    <form
      onClick={() => {
        groupIsDropDownVisible === true ? setGroupDropDOwnVisible(false) : null;
      }}
      onSubmit={handleSubmit(handleSaveEditLocation)}
      className="p-4 font-inter w-[500px]"
    >
      <div className="text-center font-bold text-lg m-2">Edit Location</div>
      <div>
        {locationGetId && (
          <div className="flex flex-col space-y-4">
            <div className=" flex items-center justify-between relative">
              <div>
                <LabelComponents label="Name" />
                <input
                  className={`${
                    errors.locNameEdit?.type === "required"
                      ? "border border-red-800"
                      : ""
                  } bg-main-background text-text-color font-regular text-[14px] rounded-md p-2 outline-none w-full text-center uppercase`}
                  type="text"
                  autoComplete="off"
                  {...register("locNameEdit", { required: true })}
                  onChange={handleChangeToUpperCase}
                />
                {errors.locNameEdit?.type === "required" && (
                  <ErrorComponents label="Location value cannot be empty." />
                )}
              </div>
              <div
                onClick={handleStopPropagation}
                className="absolute right-0 top-0"
              >
                <LabelComponents label="Group" />
                <input
                  className={`${
                    errors.groupSearchFilter?.type === "required" ||
                    errorObj.isErrorGrpEdit
                      ? "border border-red-800"
                      : ""
                  } ${
                    groupIsDropDownVisible
                      ? "rounded-t-md border-b-2 border-b-secondary-background"
                      : "rounded-md"
                  } bg-main-background text-text-color font-regular font-black text-[14px] p-2 outline-none w-full text-center uppercase`}
                  type="text"
                  {...register("groupSearchFilter")}
                  value={groupSearchFilter}
                  onChange={handleGroupOnchange}
                  autoComplete="off"
                  onFocus={() => {
                    errorObj.isErrorGrpEdit = false;
                    setGroupDropDOwnVisible(true);
                  }}
                />
                {groupIsDropDownVisible && groupDataSort.length > 0 && (
                  <>
                    {groupDataSort.map((g) => (
                      <ul
                        key={g.grp_ID}
                        className="bg-main-background z-10 w-full border-secondary-background p-1"
                      >
                        <li
                          onClick={() => handleSelectFilter(g)}
                          className="hover:bg-secondary-background transition-colors text-[14px] cursor-pointer px-2 p-1"
                        >
                          {g.grp_name}
                        </li>
                      </ul>
                    ))}
                  </>
                )}
                {/* {errors.groupSearchFilter?.type === "required" && (
                  <ErrorComponents label="Group cannot be empty " />
                )} */}
                {errors.groupSearchFilter && errorObj.isErrorGrpEdit && (
                  <ErrorComponents label={errorObj.errGroupEditMessage} />
                )}
              </div>
            </div>
            <div>
              <LabelComponents label="Description" />
              <input
                className=" bg-main-background text-text-color font-regular text-[14px] rounded-md p-2 outline-none w-full text-center uppercase"
                autoComplete="off"
                type="text"
                {...register("descEditValue", { required: true })}
                onChange={handleChangeToUpperCase}
              />
              {errors.descEditValue?.type === "required" && (
                <ErrorComponents label="Description value cannot be empty" />
              )}
            </div>
            <div className=" text-right space-x-3">
              <ButtonComponents
                label="Cancel"
                onClick={handleCloseModalEditLocation}
                bgColor="bg-text-color"
                textColor="text-black"
                textSize="14px"
              />
              <ButtonComponents
                type="submit"
                label="Save Changes"
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

export default memo(LocationEditPage);
