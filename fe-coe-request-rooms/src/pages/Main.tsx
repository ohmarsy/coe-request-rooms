import React from "react";
import SideBar from "../layout/SideBar";
import Dashboard from "./Dashboard";

const MainPage = () => {
  return (
    <div className="flex">
      <SideBar></SideBar>
      <div className="p-7 text-2xl font-bold flex-1 h-screen">
        <Dashboard />
      </div>
    </div>
  );
};

export default MainPage;
