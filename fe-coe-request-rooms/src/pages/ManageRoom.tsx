import React, { useEffect, useState } from "react";

const ManageRoomPage = () => {
  const [dateTime, setDateTime] = useState({
    date: "",
    time: "",
  });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();

      setDateTime({
        date: now.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }), 
        time: now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }), 
      });
    };

    updateDateTime(); 
    const interval = setInterval(updateDateTime, 1000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="w-full h-full flex">
      <div className="flex flex-col flex-1/3 h-full gap-3 p-2">
        <div className="w-full flex gap-3 items-center justify-center">
          <div className="flex-2 bg-white h-[120px] flex flex-col items-center justify-center gap-2 shadow-sm rounded-2xl">
            <p className="text-2xl">{dateTime.date}</p>
            <p className="text-[#7d7d7d] font-medium text-base">Date</p>
          </div>
          <div className="flex-1 bg-white h-[120px] flex flex-col items-center justify-center gap-2 shadow-sm rounded-2xl">
            <p className="text-2xl">{dateTime.time}</p>
            <p className="text-[#7d7d7d] font-medium text-base">Time</p>
          </div>
        </div>
        <div className="w-full h-full bg-white shadow-sm rounded-2xl">
          <div className="flex flex-col">
            <p className="text-2xl px-6 py-4 border-b border-b-[#f7f7f7]">All rooms</p>
            <div className="px-2 py-4 text-lg flex flex-col gap-2">
              <p className="hover:bg-gray-100 rounded-2xl w-full px-4 py-2 font-medium">EN4204</p>
              <p className="hover:bg-gray-100 rounded-2xl w-full px-4 py-2 font-medium">EN4204</p>
              <p className="hover:bg-gray-100 rounded-2xl w-full px-4 py-2 font-medium">EN4204</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-2/3 h-full p-2">
        <div className="p-2 h-full bg-white shadow-sm rounded-2xl">

        </div>
      </div>
    </div>
  );
};

export default ManageRoomPage;
