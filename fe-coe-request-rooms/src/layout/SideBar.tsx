import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableCells,
  faImage,
  faTableList,
  faDoorOpen,
  faRightFromBracket,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

// Define the type for props
interface SideBarProps {
  selectedMenu: string;
  setSelectedMenu: (menu: string) => void;
}

// Define Modal type
interface ModalData {
  isOpen: boolean;
  title: string;
  icon: any;
}

const SideBar = ({ setSelectedMenu, selectedMenu }: SideBarProps) => {
  // State for modal
  const [modal, setModal] = useState<ModalData>({
    isOpen: false,
    title: "",
    icon: null,
  });

  const menuItems = [
    { title: "Dashboard", icon: faTableCells, route: "dashboard" },
    { title: "Image Analyse", icon: faImage, route: "image-analyse" },
    { title: "Report Table", icon: faTableList, route: "report-table" },
    { title: "Manage Room", icon: faDoorOpen, route: "manage-room" },
  ];

  // Function to handle menu item click
  const handleMenuClick = (menu: any) => {
    setSelectedMenu(menu.route);
  };

  // Function to handle icon click and open modal
  const handleIconClick = (e: React.MouseEvent, menu: any) => {
    e.stopPropagation(); // Prevent triggering the button click event
    setModal({
      isOpen: true,
      title: menu.title,
      icon: menu.icon,
    });
  };

  // Function to close modal
  const closeModal = () => {
    setModal({
      ...modal,
      isOpen: false,
    });
  };

  return (
    <>
      <div className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 p-6 flex flex-col">
        <ul className="flex-1">
          {menuItems.map((menu, index) => (
            <li key={index} className="mb-4">
              <button
                onClick={() => handleMenuClick(menu)}
                className={`flex items-center gap-4 p-3 px-6 rounded-lg w-full text-left cursor-pointer ${
                  selectedMenu === menu.route
                    ? "bg-[var(--primary-color)] text-white"
                    : "text-[var(--text-color)] hover:bg-gray-100"
                }`}
              >
                <span 
                  className="cursor-pointer" 
                  onClick={(e) => handleIconClick(e, menu)}
                >
                  <FontAwesomeIcon icon={menu.icon} />
                </span>
                <span>{menu.title}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-auto border-t border-gray-200 pt-6">
          <button className="flex items-center gap-4 p-3 text-[var(--text-color)] hover:bg-gray-100 rounded-lg w-full text-left cursor-pointer">
            <FontAwesomeIcon icon={faRightFromBracket} />
            <span>Sign out</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {modal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">{modal.title} Icon Details</h3>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            
            <div className="flex flex-col items-center p-4">
              <div className="text-4xl mb-4 text-[var(--primary-color)]">
                <FontAwesomeIcon icon={modal.icon} />
              </div>
              <p>This is the {modal.title} feature icon.</p>
              <p className="mt-2 text-sm text-gray-500">
                Click on this icon to access {modal.title.toLowerCase()} functionalities.
              </p>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-[var(--primary-color)] text-white py-2 px-4 rounded hover:bg-opacity-90"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;