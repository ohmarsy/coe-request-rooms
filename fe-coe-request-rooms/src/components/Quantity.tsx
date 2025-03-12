import React from 'react';
import { PeopleData } from '../services/getPeople';

interface QuantityProps {
  peopleData: PeopleData;
}

const Quantity: React.FC<QuantityProps> = ({ peopleData }) => {
  const totalPeople = peopleData.totalMovements ?? 0;
  return (
    <div className="flex flex-col items-center justify-center bg-white shadow-sm rounded-2xl p-8 w-full space-y-2 h-full">
      <div className="flex items-center justify-between">
        <p className="text-lg font-medium">{totalPeople ?? 'No data'} People</p>
      </div>
      <p className="text-gray-500 font-medium text-lg">Quantity</p>
    </div>
  );
};

export default Quantity;
