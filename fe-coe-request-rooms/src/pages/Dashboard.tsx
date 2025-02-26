import React, { useState } from 'react'
import TemBox from '../components/TemBox'
import DateBox from '../components/DateBox';
import TimeBox from '../components/TimeBox';
import AllRoom from '../components/AllRoom';
import Image from '../components/Image';
import RoomStatus from '../components/RoomStatus';
import Quantity from '../components/Quantity';
import ReportTable from '../components/ReportTable';


const DashboardPage = () => {

  const [selectedRoom, setSelectedRoom] = useState("");

  const handleClickRoom = (name: string) => {
    setSelectedRoom(name);
  };

  const rooms = [
    {
      name: "EN4204",
    },
    {
      name: "EN4203",
    },
    {
      name: "EN4202",
    },
  ];


  return (
    <div className="w-full h-full flex flex-col gap-3 p-2">
      {/* Top Column */}
      <div className="flex gap-3">
        {/* AllRoom Left */}
        <div className="flex-1">
          <AllRoom rooms={rooms} handleClickRoom={handleClickRoom} />
        </div>

        {/* Image Middle */}
        <div className="flex-1">
          <Image />
        </div>

        {/* Status/Quantity Right */}
        <div className="flex-1 flex flex-col gap-3">
          <RoomStatus />
          <Quantity />
        </div>
      </div>

      {/* Bottom Row */}
      {/* Bottom Row */}
      <div className="flex gap-3">
        {/* Date and Time Boxes + Temperature */}
        <div className="flex-1 flex flex-col gap-3 pb-0">
          <div className="flex gap-3 items-center justify-center max-[1024px]:flex-col">
            <DateBox />
            <TimeBox />
          </div>
          <TemBox />
        </div>

        {/* Report Table */}
        <div className="flex-2">
          <ReportTable />
        </div>
      </div>

    </div>

  );
}

export default DashboardPage