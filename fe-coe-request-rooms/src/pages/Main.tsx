import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SideBar from "../layout/SideBar";
import ManageRoomPage from "./ManageRoom";
import DashboardPage from "./Dashboard";
import ImageAnalysePage from "./ImageAnalyse";
import ReportTablePage from "./ReportTable";
import Navbar from "../layout/Navbar";
import Backdrop from "../components/Backdrop";

const MainPage = () => {
  const location = useLocation();
  const [selectedMenu, setSelectedMenu] = useState("dashboard");
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const menu = urlParams.get("menu") || "dashboard";

    if (menu) {
      setSelectedMenu(menu);
    }
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 1024); // เช็คว่าเป็น mobile หรือไม่
      setIsOpen(window.innerWidth > 1024); // เมื่อหน้าจอใหญ่กว่าหรือเท่ากับ 1024px จะเปิด Sidebar
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [location.search]);

  const toggleSidebar = () => {
    setIsOpen((prevState) => !prevState);
  };

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
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Navbar
        name={selectedMenu}
        toggleSidebar={toggleSidebar}
        isMobile={isMobile}
      />

      <div className="flex flex-1 relative">
        {isOpen && (
          <SideBar
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
          />
        )}

        {isOpen && isMobile && <Backdrop onClick={toggleSidebar} />}

        {/* Page Content */}
        <div
          className={`flex-1 p-2 transition-all duration-300 ease-in-out fade-in ${
            isOpen && !isMobile ? "ml-64" : ""
          } mt-16 min-w-[calc(100vw-295px)] min-h-[calc(100vh-64px)]`}
        >
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
