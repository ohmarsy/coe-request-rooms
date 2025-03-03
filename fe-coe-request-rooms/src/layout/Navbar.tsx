import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

interface NavbarProps {
  name: string;
  isOpen: boolean;
}
const Navbar: React.FC<NavbarProps> = ({ name, isOpen }) => {
  if (name === "dashboard") {
    name = "Dashboard";
  } else if (name === "image-analyse") {
    name = "Image Analyse";
  } else if (name === "report-table") {
    name = "Report Table";
  } else if (name === "manage-room") {
    name = "Manage Room";
  }

  return (
    <nav className="bg-[var(--primary-color)] h-[60px] sm:h-[70px] md:h-[80px] w-full">
      <div
        className={`mx-auto px-2 sm:px-4 md:px-6 lg:px-8 flex items-center justify-between h-full ${
          isOpen ? "ml-[296px]" : "ml-[80px]"
        }`}
      >
        <h1 className="text-white text-base sm:text-lg md:text-xl font-bold">{`${name.toString()}`}</h1>
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <FontAwesomeIcon
            icon={faBell}
            className="text-white text-lg sm:text-xl md:text-2xl"
          />
          <img
            src="./src/assets/LogoCoE.png"
            className="w-8 sm:w-10 md:w-12 lg:w-14"
          />
          <h1 className="text-white text-base sm:text-lg md:text-xl  font-bold">
            Name
          </h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
