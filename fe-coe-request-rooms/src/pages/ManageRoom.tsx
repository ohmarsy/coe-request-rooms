import React, { useState } from "react";
import AllRoom from "../components/AllRoom";
import DateBox from "../components/DateBox";
import TimeBox from "../components/TimeBox";
import Switch from "../components/Switch";

const ManageRoomPage = () => {
  const [selectedRoom, setSelectedRoom] = useState("");

  const handleClickRoom = (name: string) => {
    setSelectedRoom(name);
  };

  const rooms = [
    {
      name: "EN4204",
    },
    {
      name: "EN4203",
    },
    {
      name: "EN4202",
    },
  ];

  return (
    <div className="w-full h-full flex">
      <div className="flex flex-col flex-1/3 h-full gap-3 p-2 pb-0">
        <div className="w-full flex gap-3 items-center justify-center max-[1024px]:flex-col">
          <DateBox />
          <TimeBox />
        </div>
        <AllRoom
          rooms={rooms}
          handleClickRoom={handleClickRoom}
          selectedRoom={selectedRoom}
        />
      </div>
      <div className="flex-2/3 h-full p-2 pb-0">
        <div className="h-full bg-white shadow-sm rounded-2xl text-[var(--text-color)]">
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
              <div className="flex items-center justify-center">
                <Switch
                  leftname={"Request Rooms"}
                  rightname={"Request History"}
                  onClick_left={() => {}}
                />
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
