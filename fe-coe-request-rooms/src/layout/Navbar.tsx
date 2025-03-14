import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { getUserName } from "../services/getUserName";
import { User } from "../pages/ShowName";

interface NavbarProps {
  name: string;
  toggleSidebar?: () => void;
  isMobile: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isMobile }) => {
  const [userName, setUserName] = useState<User>();
  const [loading, setLoading] = useState(true);

  const pathname = window.location.pathname;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserName();
        setUserName(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex flex-col justify-center items-center bg-white">
        <svg
          className="animate-spin h-12 w-12 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p className="mt-4 text-lg font-medium text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <nav
      className={`${
        pathname === "/request-rooms" ? "max-w-[1556px] mx-auto" : "fixed"
      }  top-0 left-0 w-full  h-16 flex items-center justify-between px-6 shadow-md z-50 bg-[var(--primary-color)] `}
    >
      <div className="flex items-center gap-4 max-[500px]:gap-2">
        {isMobile && (
          <button onClick={toggleSidebar} className="text-white">
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
        )}
        <img src="./src/assets/LogoCoE.png" className="w-12" alt="Logo" />
        <span className="text-white text-xl font-bold max-[500px]:text-sm">
          CoE Rooms
        </span>
      </div>

      <div className="flex flex-row  items-center space-x-4 max-[500px]:space-x-2">
        <a className="px-4 py-2 bg-blue-300 font-bold  cursor-pointer rounded-lg">
          {pathname === "request-rooms" ? "Admin" : "Request Room"}
        </a>
        <h1 className="text-white text-lg font-bold max-[500px]:text-sm">
          {userName!.first_name ?? "User"}
        </h1>
        {pathname === "/request-rooms" ? (
          <button
            className="flex items-center gap-4 p-3 text-[var(--text-color)] w-full cursor-pointer"
            onClick={() => {
              localStorage.removeItem("access_token");
              localStorage.removeItem("refresh_token");
              window.location.reload();
            }}
          >
            <FontAwesomeIcon
              icon={faRightFromBracket}
              style={{ color: "white" }}
            />
          </button>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
