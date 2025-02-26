import { useState } from "react";
import SideBar from "../layout/SideBar";
import ManageRoomPage from "./ManageRoom";
import DashboardPage from "./Dashboard";
import ImageAnalysePage from "./ImageAnalyse";
import ReportTablePage from "./ReportTable";
import Navbar from "../layout/Navbar";

const MainPage = () => {
  const [selectedMenu, setSelectedMenu] = useState("dashboard");

  const renderComponent = () => {
    switch (selectedMenu) {
      case "dashboard":
        return <DashboardPage />;
      case "image-analyse":
        return <ImageAnalysePage />;
      case "report-table":
        return <ReportTablePage />;
      case "manage-room":
        return <ManageRoomPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="flex bg-[var(--background-color)]">
      <SideBar setSelectedMenu={setSelectedMenu} selectedMenu={selectedMenu} />
      <div className="flex flex-col w-full">
        <Navbar />
        <div
          className="p-7 text-2xl font-bold flex-1 h-screen duration-300 fade-in"
          key={selectedMenu}
        >
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
