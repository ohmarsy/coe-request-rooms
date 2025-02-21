import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTableCells,
  faImage,
  faTableList,
  faDoorOpen,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const SideBar = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  const menuItems = [
    { title: "Dashboard", icon: faTableCells, route: "dashboard" },
    { title: "Image analyse", icon: faImage, route: "image-analyse" },
    { title: "Report table", icon: faTableList, route: "report-table" },
    { title: "Manage room", icon: faDoorOpen, route: "manage-room" },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-74" : "w-20"
      } duration-300 h-screen bg-white shadow-md p-8 flex flex-col`}
    >
      {/* Header */}
      <div className="flex gap-x-4 items-center">
        <img
          src="./src/assets/LogoCoE.png"
          className={`cursor-pointer duration-100 ${isOpen ? "w-10" : "w-8"}`}
        />
        <div className={`flex items-end gap-2 ${isOpen ? "block" : "hidden"}`}>
          <span className="text-[var(--primary-color)] font-bold text-2xl">
            CoE
          </span>
          <span className="text-[var(--primary-color)] font-bold text-lg">
            Rooms
          </span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="duration-200 text-gray-600"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

      {/* Menu Items */}
      <ul className="pt-6 flex-1">
        {menuItems.map((menu, index) => (
          <li key={index} className="mb-4">
            <a
              href={`#`}
              className={`
              flex items-center gap-4 p-3 rounded-lg
              ${
                index === 0
                  ? "bg-[var(--primary-color)]  text-white"
                  : "text-gray-700 hover:bg-gray-100"
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
            </a>
          </li>
        ))}
      </ul>

      {/* Sign Out Button */}
      <div className="pt-6 border-t border-gray-200">
        <a
          href="#"
          className={`
          flex items-center gap-4 p-3 text-gray-700 hover:bg-gray-100 rounded-lg
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
        </a>
      </div>
    </div>
  );
};

export default SideBar;
