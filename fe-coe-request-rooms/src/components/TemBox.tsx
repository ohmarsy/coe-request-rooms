import React, { useState } from "react";
import { AllTemperatureProps } from "../services/getTemperature";

interface TemperatureProps {
  AllTemperatureData: AllTemperatureProps;
  tempType: "inside" | "outside";
}

const TemperatureDisplay: React.FC<TemperatureProps> = ({
  AllTemperatureData,
  tempType,
}) => {
  const [unit] = useState("C");

  const temperature =
    tempType === "inside"
      ? AllTemperatureData.Inside?.Temperature
      : AllTemperatureData.Outside?.Temperature;

  const acStatus =
    tempType === "inside" && temperature !== undefined && temperature < 25
      ? "on"
      : "off";

  return (
    <div className="flex flex-col items-center justify-center bg-white shadow-sm rounded-2xl p-4 w-full h-full text-sm sm:text-base">
      <div className="flex flex-col items-center min-h-[100px] justify-center">
        <div className="flex items-center">
          <span className="text-2xl sm:text-5xl font-bold text-black">
            {temperature ?? "--"}
          </span>
          <span className="text-base sm:text-3xl font-bold text-gray-400">
            °{unit}
          </span>
        </div>
        <div className="text-sm sm:text-base text-[#7d7d7d] mt-2">
          {tempType === "inside" ? "Indoor Temp" : "Outdoor Temp"}
        </div>

        <div className="text-xs xs:text-sm text-[#7d7d7d] mt-2 h-4">
          {tempType === "inside" && temperature !== undefined && temperature !== null && (
            <>
              Air conditioner:{" "}
              <span className={acStatus === "on" ? "text-green-500" : "text-red-500"}>
                {acStatus}
              </span>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default TemperatureDisplay;