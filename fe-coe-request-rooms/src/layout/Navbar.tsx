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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserName();
        console.log("userName", data);

        setUserName(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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


      <div className="flex flex-row  items-center space-x-6">
        <h1 className="text-white text-lg font-bold">
          {userName!.first_name ?? "User"}
        </h1>
        <button
          className="flex items-center gap-4 p-3 text-[var(--text-color)] w-full cursor-pointer"
          onClick={() => {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.reload();
          }}
        >
          <FontAwesomeIcon icon={faRightFromBracket} style={{color:'white'}}/>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
