import React, { useEffect, useState } from "react";

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

  const [blink, setBlink] = useState(true);

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
      setBlink((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex">
      <div className="flex flex-col flex-1/3 h-full gap-3 p-2 pb-0">
        <div className="w-full flex gap-3 items-center justify-center max-[1024px]:flex-col">
          <div className="flex-2 bg-white h-[120px] flex flex-col items-center justify-center gap-2 shadow-sm rounded-2xl max-[1024px]:w-full max-[1024px]:py-3">
            <p className="text-2xl font-medium max-[1240px]:text-xl max-[1080px]:text-lg">
              {dateTime.date}
            </p>
            <p className="text-[#7d7d7d] font-medium text-base">Date</p>
          </div>
          <div className="flex-1 bg-white h-[120px] flex flex-col items-center justify-center gap-2 shadow-sm rounded-2xl max-[1024px]:w-full max-[1024px]:py-3">
            <div className="text-2xl font-medium max-[1240px]:text-xl max-[1080px]:text-lg">
              {dateTime.hour}
              <span className={`${blink ? "opacity-100" : "opacity-0"}`}>
                {" "}
                :{" "}
              </span>
              {dateTime.minute}
            </div>
            <p className="text-[#7d7d7d] font-medium text-base">Time</p>
          </div>
        </div>
        <div className="w-full h-full bg-white shadow-sm rounded-2xl flex flex-col">
          <div className="flex flex-col">
            <p className="text-xl px-8 py-4 border-b border-b-gray-200 max-[1024px]:text-lg">
              All rooms
            </p>
            <div className="px-4 py-4 text-lg flex flex-col gap-2 max-h-[67vh] overflow-scroll scrollbar-hidden">
              {rooms.map((room, index) => (
                <p
                  className="bg-gray-100 hover:bg-[var(--primary-color)] hover:text-white duration-100 rounded-lg w-full px-6 py-2 font-medium cursor-pointer"
                  key={index}
                  onClick={() => handleClickRoom(room.name)}
                >
                  {room.name}
                </p>
              ))}
            </div>
          </div>
        </div>
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
