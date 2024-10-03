import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addLocationData, errorObj } from "../services/locationApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchLocationData } from "../features/locationSlice";
import { systemAddLogs } from "../services/logsApi";
import { sessionData } from "../hooks/sessionData";
import { fetchGroupData } from "../features/groupSlice";
import LocationAddGroupList from "./LocationAddGroupList";
import ErrorComponents from "../custom/ErrorComponents";

function LocationAdd({
  handleCloseModalAddLocation,
  isDropdownVisible,
  setIsDropdownVisible,
}) {
  const dispatch = useDispatch();
  const { group } = useSelector((state) => state.group);
  // const { grp_name } = group
  console.log(group);
  const { data } = sessionData();
  let sData = data.data;

  const [inputValue, setInputValue] = useState("");
  const [grpIdValue, setGrpValue] = useState("");

  const groupFilterSearch = group.filter((g) =>
    g.grp_name.includes(inputValue)
  );

  let groupDataSort = groupFilterSearch.sort((a, b) => a.grp_ID - b.grp_ID);

  const handleInputChange = (e) => {
    const inputValue = e.target.value.toUpperCase();
    setInputValue(inputValue);
    setIsDropdownVisible(true);
  };

  const handleOptionClick = useCallback((g) => {
    setInputValue(g.grp_name);
    setGrpValue(g.grp_ID);
    setIsDropdownVisible(false);
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm();

  const handleAddLocation = async (data) => {
    try {
      const response = await addLocationData({
        loc_name: data.locationName,
        loc_desc: data.locationDescription,
        grp_name: inputValue,
      });

      if (response.data) {
        await systemAddLogs({
          logs_type: "New Location",
          logs_desc: `Created a new location named ${data.locationName}`,
          logs_performBy: sData.user_name,
        });
        setIsDropdownVisible(false);
        handleCloseModalAddLocation();
        dispatch(fetchLocationData());
      }

      return response.data;
    } catch (error) {
      setError("locationName", {
        type: "manual",
        message: errorObj.errMessage,
      });
      console.log("Error adding data from location.");
    }
  };
  useEffect(() => {
    dispatch(fetchGroupData());
  }, []);

  return (
    <form
      onClick={() => {
        isDropdownVisible = true ? setIsDropdownVisible(false) : null;
      }}
      onSubmit={handleSubmit(handleAddLocation)}
      className="relative space-y-4 p-6 font-Inter w-[500px] text-sm"
    >
      <div className="text-center text-[20px] font-bold">New Location</div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <p className="text-md font-semibold text-text-color">Name</p>
          <input
            type="text"
            autoComplete="off"
            onFocus={() => setIsDropdownVisible(false)}
            className={`
                 ${
                   errors.locationName?.type === "required" ||
                   errors.locationName
                     ? "border-red-800 border"
                     : ""
                 }
              rounded-md p-2 text-center outline-none bg-main-background`}
            {...register("locationName", { required: true })}
            onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
          />
          {errors.locationName?.type === "required" && (
            <ErrorComponents label="Name is required" />
          )}
          {errors.locationName && (
            <p role="alert" className="text-sm text-red-500">
              {errors.locationName.message}
            </p>
          )}
        </div>
        <div className="absolute right-5 flex flex-col">
          <div>
            <p className="text-md font-semibold text-text-color">Group</p>
            <input
              onClick={(e) => {
                e.stopPropagation();
              }}
              className={` 
                ${
                  errors.inputValue?.type === "required" || errorObj.isGrpError
                    ? "border-red-800 border"
                    : ""
                }
                ${
                  isDropdownVisible ? "rounded-t-md" : "rounded-md"
                } w-[220px] p-2 font-black text-center outline-none bg-main-background`}
              type="text"
              value={inputValue}
              {...register("inputValue", { required: true })}
              onFocus={() => {
                setIsDropdownVisible(true);
                errorObj.isGrpError = false;
              }}
              onChange={handleInputChange}
            />
            <div className="">
              {errors.inputValue?.type === "required" && (
                <ErrorComponents label="Group is required " />
              )}
              {errorObj?.isGrpError && (
                <ErrorComponents label={errorObj.grpErrorMessage} />
              )}
            </div>
            {isDropdownVisible && groupFilterSearch.length > 0 && (
              <ul className="bg-main-background z-10 w-full h-[150px] overflow-y-auto border-secondary-background rounded-b-lg p-1">
                {groupDataSort.map((g) => (
                  <LocationAddGroupList
                    g={g}
                    handleOptionClick={handleOptionClick}
                    key={g.grp_ID}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-md font-semibold text-text-color">Description</p>
        <input
          type="text"
          autoComplete="off"
          onFocus={() => setIsDropdownVisible(false)}
          className={`${
            errors.locationDescription?.type === "required"
              ? "border-red-800 border"
              : ""
          } w-full rounded-md p-2 text-center outline-none bg-main-background uppercase`}
          {...register("locationDescription", { required: true })}
          onChange={(e) => (e.target.value = e.target.value.toUpperCase())}
        />
        {errors.locationDescription?.type === "required" && (
          <ErrorComponents label="Description is required" />
        )}
      </div>
      <div className="text-right space-x-4 text-sm">
        <button
          onClick={handleCloseModalAddLocation}
          className=" bg-text-color text-main-background px-4 py-2 rounded-lg font-bold"
        >
          Cancel
        </button>
        <button
          type="submit"
          className=" bg-blue-500 text-text-color px-4 py-2 rounded-lg font-bold"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default LocationAdd;
