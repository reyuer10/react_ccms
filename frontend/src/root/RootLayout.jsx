import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

function RootLayout() {
  return (
    <div className="flex bg-main-background h-screen">
      <div className="">
        <Sidebar />
      </div>
      <div className="w-full">
        <div>
          <Header />
        </div>
        <div className="m-10">
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
