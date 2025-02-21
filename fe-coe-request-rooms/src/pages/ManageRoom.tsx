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
      <div className="flex flex-col flex-1/3 h-full gap-2 p-2">
        <div className="w-full flex gap-2.5 items-center justify-center">
          <div className="w-full bg-white h-[120px] flex flex-col items-center justify-center gap-2 shadow-sm rounded-2xl">
            <p className="text-2xl">{dateTime.date}</p>
            <p className="text-[#7d7d7d] font-medium text-lg">Date</p>
          </div>
          <div className="w-full bg-white h-[120px] flex flex-col items-center justify-center gap-2 shadow-sm rounded-2xl">
            <p className="text-2xl">{dateTime.time}</p>
            <p className="text-[#7d7d7d] font-medium text-lg">Time</p>
          </div>
        </div>
        <div className="w-full h-full bg-white shadow-sm rounded-2xl"></div>
      </div>
      <div className="flex-2/3 bg-amber-600 h-full p-2"></div>
    </div>
  );
};

export default ManageRoomPage;
