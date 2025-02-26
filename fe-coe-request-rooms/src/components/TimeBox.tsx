import React, { useEffect, useState } from "react";

interface TimeProps {
  hour: string;
  minute: string;
}

const TimeBox: React.FC<TimeProps> = ({ hour, minute }) => {
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 bg-white h-[120px] flex flex-col items-center justify-center gap-2 shadow-sm rounded-2xl max-[1024px]:w-full max-[1024px]:py-3">
      <div className="text-2xl font-medium max-[1240px]:text-xl max-[1080px]:text-lg">
        {hour}
        <span className={`${blink ? "opacity-100" : "opacity-0"}`}> : </span>
        {minute}
      </div>
      <p className="text-[#7d7d7d] font-medium text-base">Time</p>
    </div>
  );
};

export default TimeBox;
