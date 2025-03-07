import React, { useState } from 'react';

interface Temperature {
  indoor?: number;
  outdoor?: number;
  tempType: string;
}

const TemperatureDisplay: React.FC<Temperature> = ({ indoor, outdoor, tempType }) => {
  const [unit] = useState('C');

  return (
    <div className="flex flex-col items-center justify-center bg-white  shadow-sm rounded-2xl p-4 w-full h-full text-sm sm:text-base">
      <div className="flex items-center ">
        <span className="text-2xl sm:text-5xl font-bold text-black">
          {indoor ? indoor : outdoor}
        </span>
        <span className="text-base sm:text-3xl font-bold text-gray-400">
          °{unit}
        </span>
      </div>
      <div className="text-sm sm:text-base text-[#7d7d7d] mt-2">
        {tempType === 'indoor' ? 'Indoor Temp' : 'Outdoor Temp'}
      </div>
    </div>
  );
};

export default TemperatureDisplay;