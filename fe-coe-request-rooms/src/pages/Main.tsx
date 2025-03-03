import { useState } from "react";
import SideBar from "../layout/SideBar";
import ManageRoomPage from "./ManageRoom";
import DashboardPage from "./Dashboard";
import ImageAnalysePage from "./ImageAnalyse";
import ReportTablePage from "./ReportTable";
import Navbar from "../layout/Navbar";

const MainPage = () => {
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [isOpen, setIsOpen] = useState(false);

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
      <SideBar
        setSelectedMenu={setSelectedMenu}
        selectedMenu={selectedMenu}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <div className="flex flex-col w-full">
        <Navbar name={selectedMenu} isOpen={isOpen}/>
        <div
          className={`px-4 py-4 flex-1 h-screen duration-300 fade-in overflow-hidden ${
            isOpen ? "ml-[296px]" : "ml-[80px]"
          }`}
          key={selectedMenu}
        >
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
