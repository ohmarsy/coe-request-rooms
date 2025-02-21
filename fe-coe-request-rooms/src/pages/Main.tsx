import React from "react";
import SideBar from "../layout/SideBar";

const MainPage = () => {
  return (
    <div className="flex">

      <SideBar></SideBar>
      <div className="p-7 text-2xl font-bold flex-1 h-screen">
        <h1> MainPage</h1>
      </div>
      
    </div>
  );
};

export default MainPage;
