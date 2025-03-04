import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

interface NavbarProps {
  name: string;
  toggleSidebar: () => void;
  isMobile: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isMobile }) => {
  const name = "User";
  return (
    <nav className="fixed top-0 left-0 w-full bg-[var(--primary-color)] h-16 flex items-center justify-between px-6 shadow-md z-50">
      <div className="flex items-center gap-4">
        {isMobile && (
          <button onClick={toggleSidebar} className="text-white">
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
        )}
        <img src="./src/assets/LogoCoE.png" className="w-12" alt="Logo" />
        <span className="text-white text-xl font-bold">CoE Rooms</span>
      </div>

      <h1 className="text-white text-lg font-bold">
        {name}
      </h1>
    </nav>
  );
};

export default Navbar;
