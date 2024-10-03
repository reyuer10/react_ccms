import React from "react";
import { dashBoardData } from "../assets/data/dashboardData";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import SideBarList from "./SideBarList";
import { fetchCanister } from "../features/canisterSlice";
import axios from "axios";

function Sidebar() {
  const navigate = useNavigate();

  // const { canister, status, error } = useSelector((state) => state.canister);

  const handlelogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/login/logout"
      );
      navigate("loginPage");
      sessionStorage.clear();
      sessionStorage.removeItem("token");
      return response.data;
    } catch (error) {
      if (error && error.response) {
        console.log("Error fetching data!", error.response.data.message);
      }
    }
  };

  return (
    <div className={`bg-secondary-background text-text-color h-full w-[300px]`}>
      <div className="">
        <div className="px-10 pt-4 leading-5">
          <p className="font-bold text-[22px]">Casino Card</p>
          <p className="font-regular text-[14px] italic"> Management System</p>
        </div>
        <div className="m-10">
          <div className="font-bold text-[22px] border-b-2 border-border-main">
            Card Sorting Room
          </div>
          {dashBoardData.map((d) => {
            return <SideBarList d={d} key={d.dNavId} />;
          })}
          <div onClick={handlelogout} className="absolute bottom-4">
            Logout
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
