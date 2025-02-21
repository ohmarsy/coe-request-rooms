import SideBar from "../layout/SideBar";
import ManageRoomPage from "./ManageRoom";

const MainPage = () => {
  return (
    <div className="flex bg-[var(--background-color)]">
      <SideBar></SideBar>
      <div className="p-7 text-2xl font-bold flex-1 h-screen">
        <ManageRoomPage />
      </div>
    </div>
  );
};

export default MainPage;
