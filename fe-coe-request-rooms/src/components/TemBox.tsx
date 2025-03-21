import React, { useState } from "react";
import { AllTemperatureProps } from "../services/getTemperature";

interface TemperatureProps {
  AllTemperatureData: AllTemperatureProps | null;
  tempType: "inside" | "outside";
}

const TemperatureDisplay: React.FC<TemperatureProps> = ({
  AllTemperatureData,
  tempType,
}) => {
  const [unit] = useState("C");

  // เช็คค่า temperature ก่อนใช้งาน
  const temperature =
    tempType === "inside"
      ? AllTemperatureData?.Inside?.Temperature ?? null
      : AllTemperatureData?.Outside?.Temperature ?? null;

  // เช็คสถานะแอร์เมื่อ temperature มีค่าปกติ
  // const acStatus =
  //   tempType === "inside" && temperature !== null && temperature < 25
  //     ? "on"
  //     : "off";

  return (
    <div className="flex flex-col items-center justify-center bg-white shadow-sm rounded-2xl p-4 w-full h-full text-sm sm:text-base">
      <div className="flex flex-col items-center min-h-[100px]  justify-center">
        {/* แสดงค่าอุณหภูมิ และเปลี่ยนสีถ้าไม่มีข้อมูล */}
        <div className="flex items-center ">
          <span
            className={`text-2xl sm:text-5xl font-light ${temperature === null ? "text-gray-400 text-sm" : "text-black"
              }`}
          >
            {temperature !== null ? temperature : "-"}
          </span>
          <span className="text-base sm:text-3xl font-bold text-gray-400">
            °{unit}
          </span>
        </div>

        <div className="text-sm sm:text-base text-[#7d7d7d] mt-2 truncate ">
          {tempType === "inside" ? "Inside Temp" : "Outside Temp"}
        </div>

        {/* <div className="text-xs xs:text-sm text-[#7d7d7d] mt-2 h-4">
          {tempType === "inside" && temperature !== null && (
            <>
              Air conditioner:{" "}
              <span
                className={acStatus === "on" ? "text-green-500" : "text-red-500"}
              >
                {acStatus}
              </span>
            </>
          )}
        </div> */}

      </div>
    </div>
  );
};

export default TemperatureDisplay;
