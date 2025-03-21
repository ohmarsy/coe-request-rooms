import React from 'react';
import { PeopleData } from '../services/getPeople';

interface QuantityProps {
  peopleData: PeopleData | null;
}

const Quantity: React.FC<QuantityProps> = ({ peopleData }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white shadow-sm rounded-2xl p-8 w-full space-y-2 h-full">
      <div className="flex items-center justify-between">
        <p className={`text-xs sm:text-lg  font-medium ${peopleData?.totalMovements ? '' : 'text-gray-400'}`}>{peopleData?.totalMovements ? `${peopleData.totalMovements} People` : 'No data'}</p>
      </div>
      <p className="text-gray-500 font-medium text-sm sm:text-lg">Quantity</p>
    </div>
  );
};

export default Quantity;
