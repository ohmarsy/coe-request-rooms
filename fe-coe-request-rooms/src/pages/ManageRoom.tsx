import React, { useEffect, useState } from "react";

const ManageRoomPage = () => {
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
      <div className="flex flex-col flex-1/3 h-full gap-3 p-2">
        <div className="w-full flex gap-3 items-center justify-center">
          <div className="flex-2 bg-white h-[120px] flex flex-col items-center justify-center gap-2 shadow-sm rounded-2xl">
            <p className="text-3xl">{dateTime.date}</p>
            <p className="text-[#7d7d7d] font-medium text-base">Date</p>
          </div>
          <div className="flex-1 bg-white h-[120px] flex flex-col items-center justify-center gap-2 shadow-sm rounded-2xl">
            <div className="text-3xl">
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
            <p className="text-2xl px-8 py-4 border-b border-b-gray-200">
              All rooms
            </p>
            <div className="px-4 py-4 text-lg flex flex-col gap-2 max-h-[67vh] overflow-scroll scrollbar-hidden">
              {rooms.map((room, index) => (
                <p
                  className="bg-gray-100 hover:bg-[var(--primary-color)] hover:text-white duration-100 rounded-2xl w-full px-6 py-3 font-medium cursor-pointer"
                  key={index}
                >
                  {room.name}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex-2/3 h-full p-2">
        <div className="p-2 h-full bg-white shadow-sm rounded-2xl"></div>
      </div>
    </div>
  );
};

export default ManageRoomPage;
