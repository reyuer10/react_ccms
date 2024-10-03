import React, { memo, useCallback, useEffect, useState } from "react";
import LocationHeader from "./LocationHeader";
import LocationTable from "./LocationTable";
import LocationFooter from "./LocationFooter";
import { fetchLocationData } from "../features/locationSlice";
import { useDispatch, useSelector } from "react-redux";
import ModalAddLocation from "../modal/ModalAddLocation";
import LocationAdd from "./LocationAdd";

function LocationPage() {
  const dispatch = useDispatch();
  const { location } = useSelector((state) => state.location);

  const [locationSearchInput, setSearchLocationInput] = useState("");
  const [locationData, setLocationData] = useState(location);
  const [openModalAddLocation, setOpenModalAddLocation] = useState(false);
  const [locationItemsPerPage] = useState(5);
  const [locationCurrentPage, setLocationCurrentPage] = useState(1);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleOpenModalAddLocation = useCallback(() => {
    setOpenModalAddLocation(true);
  }, []);
  const handleCloseModalAddLocation = useCallback(() => {
    setOpenModalAddLocation(false);
  }, []);

  const locationFilterSearch = location.filter((l) =>
    l.loc_name.toUpperCase().includes(locationSearchInput.toUpperCase())
  );

  useEffect(() => {
    setLocationData(locationFilterSearch);
  }, [location, locationSearchInput]);

  useEffect(() => {
    dispatch(fetchLocationData());
  }, [dispatch]);

  const locationIndexOfLastItems = locationCurrentPage * locationItemsPerPage;
  const locationIndexOfFirstItems =
    locationIndexOfLastItems - locationItemsPerPage;
  const locationCurrentItems = locationData.slice(
    locationIndexOfFirstItems,
    locationIndexOfLastItems
  );

  const locationLastPage = Math.ceil(location.length / locationItemsPerPage);
  const locationPaginate = useCallback((number) => {
    setLocationCurrentPage(number);
  }, []);

  const locationHandleNextPage = () => {
    if (locationCurrentPage < locationLastPage) {
      setLocationCurrentPage((prevState) => prevState + 1);
    }
  };

  const locationHandlePrevPage = () => {
    if (locationCurrentPage !== 1) {
      setLocationCurrentPage((prevState) => prevState - 1);
    }
  };

  return (
    <div className="font-inter m-4">
      <LocationHeader
        locationSearchInput={locationSearchInput}
        setSearchLocationInput={setSearchLocationInput}
        handleOpenModalAddLocation={handleOpenModalAddLocation}
      />
      <div className=" overflow-x-auto shadow-lg my-4 border-2 border-main-background rounded-lg">
        <LocationTable locationCurrentItems={locationCurrentItems} />
      </div>
      <div>
        <LocationFooter
          location={location}
          locationCurrentPage={locationCurrentPage}
          locationIndexOfFirstItems={locationIndexOfFirstItems}
          locationIndexOfLastItems={locationIndexOfLastItems}
          locationCurrentItems={locationCurrentItems}
          locationItemsPerPage={locationItemsPerPage}
          locationPaginate={locationPaginate}
          locationHandlePrevPage={locationHandlePrevPage}
          locationHandleNextPage={locationHandleNextPage}
        />
      </div>
      <ModalAddLocation
        isDropdownVisible={isDropdownVisible}
        setIsDropdownVisible={setIsDropdownVisible}
        openModalAddLocation={openModalAddLocation}
        handleCloseModalAddLocation={handleCloseModalAddLocation}
      >
        <LocationAdd
          isDropdownVisible={isDropdownVisible}
          setIsDropdownVisible={setIsDropdownVisible}
          handleCloseModalAddLocation={handleCloseModalAddLocation}
        />
      </ModalAddLocation>
    </div>
  );
}

export default memo(LocationPage);
