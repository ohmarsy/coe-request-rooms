import React, { useEffect, useState } from "react";
const DateBox = () => {
  const [date, setDate] = useState({
    date: "",
  });

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();

      setDate({
        date: now.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      });
    };

    updateDate();
    const interval = setInterval(() => {
      updateDate();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-2 bg-white h-[120px] flex flex-col items-center justify-center gap-2 shadow-sm rounded-2xl max-[1024px]:w-full max-[1024px]:py-3">
      <p className="text-2xl font-medium max-[1240px]:text-xl max-[1080px]:text-lg">
        {date.date}
      </p>
      <p className="text-[#7d7d7d] font-medium text-base ">Date</p>
    </div>
  );
};

export default DateBox;
