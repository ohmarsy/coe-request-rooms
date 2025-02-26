import React, { useEffect, useState } from "react";
import AllRoom from "../components/AllRoom";
import DateBox from "../components/DateBox";
import TimeBox from "../components/TimeBox";

const ManageRoomPage = () => {
  const [selectedRoom, setSelectedRoom] = useState("");

  const handleClickRoom = (name: string) => {
    setSelectedRoom(name);
  };

  const [dateTime, setDateTime] = useState({
    date: "",
    hour: "",
    minute: "",
  });

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

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      setDateTime({
        date: now.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        hour: now.getHours().toString().padStart(2, "0"),
        minute: now.getMinutes().toString().padStart(2, "0"),
      });
    };

    updateDateTime();
    const interval = setInterval(() => {
      updateDateTime();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex">
      <div className="flex flex-col flex-1/3 h-full gap-3 p-2 pb-0">
        <div className="w-full flex gap-3 items-center justify-center max-[1024px]:flex-col">
          <DateBox date={dateTime.date} />
          <TimeBox hour={dateTime.hour} minute={dateTime.minute} />
        </div>
        <AllRoom rooms={rooms} handleClickRoom={handleClickRoom} />
      </div>
      <div className="flex-2/3 h-full p-2 pb-0">
        <div className="px-8 py-4 h-full bg-white shadow-sm rounded-2xl">
          {selectedRoom ? (
            <p className="text-xl max-[1024px]:text-lg flex items-center gap-2 min-w-[200px]">
              Room :
              <span
                className={`${
                  selectedRoom ? "bg-gray-100" : ""
                } px-3 py-1 text-lg rounded-md`}
              >
                {selectedRoom ?? " "}
              </span>
            </p>
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
