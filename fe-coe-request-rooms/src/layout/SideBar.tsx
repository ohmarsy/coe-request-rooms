import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const SideBar = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  
  return (
    <div className={`${isOpen ? "w-64" : "w-20"} duration-300 h-screen bg-white shadow-md p-8`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {isOpen && (
            <div className="flex items-end gap-2">
              <span className="text-[var(--primary-color)] font-bold text-2xl">CoE</span>
              <span className="text-[var(--primary-color)] font-bold text-lg">Rooms</span>
            </div>
          )}
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="duration-200"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    </div>
  );
};

export default SideBar;