import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableCells,
  faImage,
  faTableList,
  faDoorOpen,
  faRightFromBracket,
  faChevronCircleLeft,
  faChevronCircleRight,
} from "@fortawesome/free-solid-svg-icons";

// Define the type for props
interface SideBarProps {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const SideBar = ({ setSelectedMenu, selectedMenu, isOpen, setIsOpen }: SideBarProps) => {

  const menuItems = [
    { title: "Dashboard", icon: faTableCells, route: "dashboard" },
    { title: "Image Analyse", icon: faImage, route: "image-analyse" },
    { title: "Report Table", icon: faTableList, route: "report-table" },
    { title: "Manage Room", icon: faDoorOpen, route: "manage-room" },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-74 p-8" : "w-20 p-2 py-8"
      } duration-300 bg-white shadow-md flex flex-col fixed z-[999] top-0 bottom-0`}
    >
      {/* Header */}
      <div
        className={`flex ${
          isOpen ? "flex-row" : "flex-col-reverse"
        } gap-x-6 items-center`}
      >
        <div className="flex gap-2 items-center justify-center">
          <img
            src="./src/assets/LogoCoE.png"
            className={`duration-100 ${isOpen ? "w-14" : "w-0"}`}
          />
          <div
            className={`flex items-end gap-2 ${isOpen ? "block" : "hidden"}`}
          >
            <span className="text-[var(--primary-color)] font-bold text-2xl">
              CoE
            </span>
            <span className="text-[var(--primary-color)] font-bold text-lg">
              Rooms
            </span>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`duration-100 text-[var(--primary-color)] cursor-pointer ${
            isOpen ? "" : "" 
          }`}
        >
          <FontAwesomeIcon icon={isOpen ? faChevronCircleLeft : faChevronCircleRight} size="xl" /> 
        </button>
      </div>

      {/* Menu Items */}
      <ul className="pt-8 flex-1">
        {menuItems.map((menu, index) => (
          <li key={index} className="mb-4">
            <button
              onClick={() => setSelectedMenu(menu.route)}
              className={`
              flex items-center gap-4 p-3 px-6 rounded-lg w-full text-left cursor-pointer
              ${
                selectedMenu === menu.route
                  ? "bg-[var(--primary-color)] text-white"
                  : "text-[var(--text-color)] hover:bg-gray-100"
              }
              ${!isOpen && "justify-center"}
            `}
            >
              <FontAwesomeIcon
                icon={menu.icon}
                className={`${!isOpen ? "text-xl" : ""}`}
              />
              <span
                className={`${!isOpen ? "hidden" : "block"} whitespace-nowrap `}
              >
                {menu.title}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* Sign Out Button */}
      <div className="pt-6 border-t border-gray-200">
        <button
          className={`
          flex items-center gap-4 p-3 text-[var(--text-color)] hover:bg-gray-100 rounded-lg w-full text-left cursor-pointer
          ${!isOpen && "justify-center"}
        `}
        >
          <FontAwesomeIcon
            icon={faRightFromBracket}
            className={`${!isOpen ? "text-xl" : ""}`}
          />
          <span
            className={`${!isOpen ? "hidden" : "block"} whitespace-nowrap `}
          >
            Sign out
          </span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
