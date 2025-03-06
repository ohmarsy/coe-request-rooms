import React, { useState } from "react";
import AllRoom from "../components/AllRoom";
import DateBox from "../components/DateBox";
import TimeBox from "../components/TimeBox";
import Switch from "../components/Switch";
import { useEffect } from "react";
import Table from "../components/Table";
import axios from "axios";

const ManageRoomPage = () => {
  const [selectedRoom, setSelectedRoom] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make the API request
        const response = await axios.get("http://localhost:5002/user/1");

        setUserData(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { header: "Room", accessor: "room" },
    { header: "Room Status", accessor: "status" },
    { header: "Information", accessor: "information" },
    { header: "Device", accessor: "device" },
    { header: "Time", accessor: "time" },
    { header: "Date", accessor: "date" },
  ];

  const data = [
    {
      room: "EN4102",
      status: "Occupied",
      information: "35.8",
      device: "AN-3351-3",
      time: "16:45",
      date: "12-02-2025",
    },
    {
      room: "EM5103",
      status: "Occupied",
      information: "35.8",
      device: "AN-3351-3",
      time: "17:35",
      date: "12-02-2025",
    },
    {
      room: "EM5103",
      status: "Occupied",
      information: "User_image",
      device: "CAM-32",
      time: "19:35",
      date: "12-02-2025",
    },
    {
      room: "EM5103",
      status: "Occupied",
      information: "User_image",
      device: "CAM-32",
      time: "19:35",
      date: "12-02-2025",
    },
  ];

  const handleClickRoom = (name: string) => {
    setSelectedRoom(name);
    console.log(JSON.stringify(userData, null, 2));
  };

  const rooms = [
    {
      name: "EN4204",
    },
    {
      name: "EN4203",
    },
    {
      name: "EN4201",
    },
    {
      name: "EN4301",
    },
    {
      name: "EN4302",
    },
    {
      name: "EN4303",
    },
    {
      name: "EN4402",
    },
    {
      name: "EN4403",
    },
    {
      name: "EN4405",
    },
    {
      name: "EN4405",
    },
    {
      name: "EN4405",
    },
    {
      name: "EN4405",
    },
    {
      name: "EN4405",
    },
    {
      name: "EN4405",
    },
  ];

  const [activeComponent, setActiveComponent] = React.useState<
    "RequestRooms" | "RequestHistory"
  >("RequestRooms");

  const [animate, setAnimate] = useState(false);

  const handleLeft = () => {
    setActiveComponent("RequestRooms");
    console.log("left");
  };
  const handleRight = () => {
    setActiveComponent("RequestHistory");
    console.log("right");
  };

  useEffect(() => {
    if (selectedRoom) {
      setAnimate(false);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true);
        });
      });
    }
  }, [selectedRoom]);

  return (
    <div className="w-full h-full flex gap-3">
      <div className="flex flex-col flex-1/3 h-full gap-3">
        <div className="w-full flex gap-3 items-center justify-center max-[1024px]:flex-col">
          <DateBox />
          <TimeBox />
        </div>
        <AllRoom
          rooms={rooms}
          handleClickRoom={handleClickRoom}
          selectedRoom={selectedRoom}
          classNameOuter={"h-full"}
          classNameInner={"max-h-[65vh] overflow-auto rounded-lg"}
        />
      </div>
      <div className="flex-2/3 h-full">
        <div
          className={`h-full bg-white shadow-sm rounded-2xl text-[var(--text-color)] duration-300 ${
            animate ? "fade-in" : ""
          }`}
        >
          {selectedRoom ? (
            <div className="flex flex-col">
              <p className="text-xl font-medium max-[1024px]:text-lg flex items-center gap-2 min-w-[200px] px-8 py-4 border-b border-b-gray-200">
                Room :
                <span
                  className={`${
                    selectedRoom ? "bg-gray-100" : ""
                  } px-3 py-1 text-lg rounded-md`}
                >
                  {selectedRoom ?? " "}
                </span>
              </p>
              <div className="flex items-center justify-center flex-col">
                <Switch
                  leftname={"Request Rooms"}
                  rightname={"Request History"}
                  onClick_left={handleLeft}
                  onClick_right={handleRight}
                />
                <div className="flex flex-col w-full px-8">
                  <p className="text-start">
                    {activeComponent === "RequestRooms"
                      ? "RequestRooms"
                      : "RequestHistory"}
                  </p>
                  <Table columns={columns} data={data} maxRows={10} />
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <p className="text-center">Please select the room</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageRoomPage;
