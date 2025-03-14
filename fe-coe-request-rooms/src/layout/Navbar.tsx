import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBook,
  faChevronDown,
  faChevronUp,
  faDashboard,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { getUserName } from "../services/getUserName";
import { User } from "../pages/ShowName";
import Loading from "../components/Loading";

interface NavbarProps {
  name: string;
  toggleSidebar?: () => void;
  isMobile: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isMobile }) => {
  const [userName, setUserName] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);

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
    return <Loading />;
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
        <div className="text-white text-lg font-bold max-[500px]:text-sm flex gap-3 items-center hover:bg-[#2354aa] px-4 py-2 rounded-lg duration-300 transition-all">
          <FontAwesomeIcon icon={faUser} />
          {userName!.first_name ?? "User"}
          <FontAwesomeIcon
            icon={toggle ? faChevronUp : faChevronDown}
            className="cursor-pointer"
            onClick={() => {
              setToggle(!toggle);
            }}
          />
          {toggle && (
            <div className="absolute right-6 top-14 mt-2 bg-white text-black shadow-lg rounded-t-none rounded-lg overflow-hidden">
              <ul className="flex flex-col">
                {userName?.role == "staff" && (
                  <a
                    className="hover:bg-gray-200 font-bold  cursor-pointer p-3 flex gap-4"
                    href={`${
                      pathname == "/request-rooms" ? "main" : "/request-rooms"
                    }`}
                  >
                    <span className="">
                      <FontAwesomeIcon
                        icon={
                          pathname === "/request-rooms" ? faDashboard : faBook
                        }
                      />
                    </span>
                    {pathname === "/request-rooms" ? "Admin" : "Request Room"}
                  </a>
                )}
                {pathname === "/request-rooms" ? (
                  <button
                    className="flex items-center gap-4 p-3 text-black w-full cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      localStorage.removeItem("access_token");
                      localStorage.removeItem("refresh_token");
                      window.location.reload();
                    }}
                  >
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    Sign out
                  </button>
                ) : null}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
