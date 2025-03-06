import React, { useState } from 'react';

interface Temperature {
  indoor?: number;
  outdoor?: number;
  tempType: string;
}

const TemperatureDisplay: React.FC<Temperature> = ({ indoor, outdoor, tempType }) => {
  const [unit] = useState('C');

  return (
    <div className="flex flex-col items-center justify-center bg-white  shadow-sm rounded-2xl p-4 w-full h-full">
      <div className="flex items-start">
        <span className="text-6xl font-bold text-black">
          {indoor ? indoor : outdoor}
        </span>
        <span className="text-4xl font-bold text-gray-400 mt-2">
          °{unit}
        </span>
      </div>
      <div className="font-medium text-base text-[#7d7d7d] mt-2">
        {tempType === 'indoor' ? 'Indoor' : 'Outdoor'}
      </div>
    </div>
  );
};

export default TemperatureDisplay;