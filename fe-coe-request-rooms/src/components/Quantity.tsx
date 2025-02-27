import React, { useState } from 'react';

const Quantity = () => {
  const [count, setCount] = useState(2);
  
  return (
    <div className="flex flex-col items-center justify-center bg-white  shadow-sm rounded-2xl p-8 w-full max-w-md space-y-2 h-full">
      <div className="flex items-center justify-between">
        <p className="text-lg font-medium">{count} People</p>
      </div>
      <p className="text-gray-500 font-medium text-lg">Quantity</p>
    </div>
  );
};

export default Quantity;