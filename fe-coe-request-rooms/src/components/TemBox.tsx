import React, { useState, useEffect } from 'react';

const TemperatureDisplay = () => {
  const [temperature, setTemperature] = useState(25);
  const [unit] = useState('C');

  return (
    <div className="flex flex-col items-center justify-center bg-white  shadow-sm rounded-2xl p-4 w-full max-w-md h-full">
      <div className="flex items-start">
        <span className="text-6xl font-bold text-black">
          {temperature}
        </span>
        <span className="text-4xl font-bold text-gray-400 mt-2">
          °{unit}
        </span>
      </div>
      <div className="font-medium text-base text-[#7d7d7d] mt-2">
        Temperature
      </div>
    </div>
  );
};

export default TemperatureDisplay;