import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

interface NavbarProps {
  name: string;
}
const Navbar: React.FC<NavbarProps> = ({ name }) => {
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
    <nav className="bg-[var(--primary-color)] h-[80px] w-full">
      <div className="mx-auto px-2 sm:px-6 lg:px-8 flex items-center justify-between h-full">
        <h1 className="text-white text-xl font-bold">{`${name.toString()}`}</h1>
        <div className="flex items-center gap-4">
          <FontAwesomeIcon icon={faBell} className="text-white text-2xl" />
          <img src="./src/assets/LogoCoE.png" className="w-14" />
          <h1 className="text-white text-xl font-bold">Name</h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
