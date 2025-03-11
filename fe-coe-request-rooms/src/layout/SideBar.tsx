import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableCells,
  faImage,
  faTableList,
  faDoorOpen,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

// Define the type for props
interface SideBarProps {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
}

const SideBar = ({ setSelectedMenu, selectedMenu }: SideBarProps) => {
  const navigate = useNavigate();

  const menuItems = [
    { title: "Dashboard", icon: faTableCells, route: "dashboard" },
    { title: "Image Analyse", icon: faImage, route: "image-analyse" },
    { title: "Report Table", icon: faTableList, route: "report-table" },
    { title: "Manage Room", icon: faDoorOpen, route: "manage-room" },
  ];

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
    if (menu) {
      navigate(`/main?menu=${menu}`);
    } else {
      navigate("/main");
    }
  };

  return (
    <>
      <div className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 p-6 flex flex-col z-50">
        <ul className="flex-1">
          {menuItems.map((menu, index) => (
            <li key={index} className="mb-4">
              <button
                onClick={() => handleMenuClick(menu.route)}
                className={`flex items-center gap-4 p-3 px-6 rounded-lg w-full text-left cursor-pointer ${
                  selectedMenu === menu.route
                    ? "bg-[var(--primary-color)] text-white"
                    : "text-[var(--text-color)] hover:bg-gray-100"
                }`}
              >
                <span className="cursor-pointer">
                  <FontAwesomeIcon icon={menu.icon} />
                </span>
                <span>{menu.title}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-auto border-t border-gray-200 pt-6">
          <button
            className="flex items-center gap-4 p-3 text-[var(--text-color)] hover:bg-gray-100 rounded-lg w-full text-left cursor-pointer"
            onClick={()=>{
              localStorage.removeItem("access_token");
              localStorage.removeItem("refresh_token");
              window.location.reload();
            }}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;
