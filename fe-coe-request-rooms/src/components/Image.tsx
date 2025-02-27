import React from 'react';

const Image = () => {
  return (
    <div className="flex flex-col bg-white shadow-sm rounded-2xl p-4 w-full">
      <div className="bg-gray-200 flex justify-center shadow-sm rounded-2xl p-4 ">
      {/* <image></image> */}
      </div>
      <div className="bg-white p-4 space-y-2">
        <p className="text-base font-medium">Name: Jonh Smith</p>
        <p className="text-base font-medium">Email: Jonh.s@kkumail.com</p>
      </div>
    </div>
  );
};

export default Image;