import React from "react";
import CasinoPlus from "../assets/img/casino-plus.png";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="bg-main-background text-text-color h-screen justify-center font-inter font-semibold items-center flex flex-col space-y-8">
      <img src={CasinoPlus} alt="casino-logo" className="h-[100px]" />
      <p className="text-[42px] font-bold ">Opps! Page Not Found</p>
      <p>
        <button
          onClick={() => navigate("/loginPage")}
          className=" underline text-blue-500"
        >
          Click here
        </button>
        to return to the home page
      </p>
    </div>
  );
}

export default NotFoundPage;
