import { useEffect, useState } from "react";

const TimeBox = () => {
  const [blink, setBlink] = useState(true);
  const [time, setTime] = useState({
    hour: "",
    minute: "",
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      setTime({
        hour: now.getHours().toString().padStart(2, "0"),
        minute: now.getMinutes().toString().padStart(2, "0"),
      });
    };

    updateTime();
    const interval = setInterval(() => {
      setBlink((prev) => !prev);
      updateTime();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 bg-white h-[120px] flex flex-col items-center justify-center gap-2 shadow-sm rounded-2xl max-[1024px]:w-full max-[1024px]:py-3">
      <div className="text-2xl font-medium max-[1240px]:text-xl max-[1080px]:text-lg">
        {time.hour}
        <span className={`${blink ? "opacity-100" : "opacity-0"}`}> : </span>
        {time.minute}
      </div>
      <p className="text-[#7d7d7d] font-medium text-base">Time</p>
    </div>
  );
};

export default TimeBox;
