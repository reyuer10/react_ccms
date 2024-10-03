import React, { memo, useCallback, useEffect, useState } from "react";
import { maintenanceData } from "../../assets/data/maintenanceData";
import MaintenancePageList from "./MaintenancePageList";
import CanisterPage from "../CanisterPage";
import LocationPage from "../LocationPage";
import UserPage from "../UserPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchCanister } from "../../features/canisterSlice";
import { getLocationData } from "../../services/locationApi";
import { fetchLocationData } from "../../features/locationSlice";
import GroupPage from "../GroupPage";
import { fetchGroupData } from "../../features/groupSlice";
import { fetchUserData } from "../../features/userSlice";
import CardColorPage from "../CardColorPage";

function MaintenancePage() {
  const [tabPage, setTabPage] = useState(1);
  const handleTabClickButton = useCallback((tabName) => {
    setTabPage(tabName);
    if (tabName === 1) {
    }
    [];
  });

  let MaintenancePages;
  if (tabPage === 1) {
    MaintenancePages = <CanisterPage />;
  } else if (tabPage === 2) {
    MaintenancePages = <LocationPage />;
  } else if (tabPage === 3) {
    MaintenancePages = <GroupPage />;
  } else if (tabPage === 4) {
    MaintenancePages = <CardColorPage />;
  } else if (tabPage === 5) {
    MaintenancePages = <UserPage />;
  }

  return (
    <div className=" text-text-color flex flex-col font-inter">
      <div className="flex">
        {maintenanceData.map((m) => {
          return (
            <MaintenancePageList
              tabPage={tabPage}
              handleTabClickButton={handleTabClickButton}
              key={m.mId}
              m={m}
            />
          );
        })}
      </div>
      <div className={`rounded-b-xl bg-secondary-background rounded-tr-xl`}>
        {MaintenancePages}
      </div>
    </div>
  );
}

export default memo(MaintenancePage);
