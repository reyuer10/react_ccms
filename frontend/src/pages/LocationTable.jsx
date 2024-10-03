import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import LocationTableList from "./LocationTableList";
import ModalEditLocation from "../modal/ModalEditLocation";
import LocationEditPage from "./LocationEditPage";

function LocationTable({ locationCurrentItems }) {
  const { location } = useSelector((state) => state.location);
  const [locationGetId, setLocationGetId] = useState([]);

  const [isModalLocationOpen, setIsModalLocationOpen] = useState(false);

  const handleOpenModalEditLocation = useCallback(() => {
    setIsModalLocationOpen(true);
  }, []);
  const handleCloseModalEditLocation = useCallback(() => {
    setIsModalLocationOpen(false);
  }, []);

  const handleGetLocationId = (id) => {
    const locationId = location.find((l) => l.loc_ID === id);
    if (locationId) {
      setLocationGetId(locationId);
    }
    handleOpenModalEditLocation();
  };

  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
        <thead>
          <tr className=" text-text-color">
            <th scope="col" className="py-3 px-6">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th>Date Modified</th>
            <th scope="col" className="px-6">
              Group
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {locationCurrentItems.map((l) => (
            <LocationTableList
              l={l}
              key={l.loc_ID}
              handleGetLocationId={handleGetLocationId}
            />
          ))}
        </tbody>
      </table>
      <ModalEditLocation isModalLocationOpen={isModalLocationOpen}>
        <LocationEditPage
          locationGetId={locationGetId}
          handleCloseModalEditLocation={handleCloseModalEditLocation}
        />
      </ModalEditLocation>
    </>
  );
}

export default LocationTable;
