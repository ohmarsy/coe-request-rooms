import React from "react";

interface DateProps {
  date: string;
}
const DateBox: React.FC<DateProps> = ({ date }) => {
  return (
    <div className="flex-2 bg-white h-[120px] flex flex-col items-center justify-center gap-2 shadow-sm rounded-2xl max-[1024px]:w-full max-[1024px]:py-3">
      <p className="text-2xl font-medium max-[1240px]:text-xl max-[1080px]:text-lg">
        {date}
      </p>
      <p className="text-[#7d7d7d] font-medium text-base">Date</p>
    </div>
  );
};

export default DateBox;
