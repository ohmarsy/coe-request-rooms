import React, { useState } from 'react'
import TemBox from '../components/TemBox'
import DateBox from '../components/DateBox';
import TimeBox from '../components/TimeBox';
import AllRoom from '../components/AllRoom';
import Image from '../components/Image';
import RoomStatus from '../components/RoomStatus';
import Quantity from '../components/Quantity';
import ReportTable from '../components/ReportTable';
import Card from '../components/Card';

const DashboardPage = () => {

  const [selectedRoom, setSelectedRoom] = useState("");

  const handleClickRoom = (name: string) => {
    setSelectedRoom(name);
  };

  const profiles = [
    {

      image: "https://picsum.photos/200/300.jpg",
      name: "Earth",
      email: "Piyawat.m@kkumail.com"

    }
  ];

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
    {
      name: "EN4202",
    },
    {
      name: "EN4202",
    },
  ];


  return (
    <div className="w-full h-full flex flex-col gap-3">
      {/* Top Column */}
      <div className="flex flex-col lg:flex-row gap-3 flex-1">
        {/* AllRoom Left */}
        <div className="w-full lg:flex-1">
          <AllRoom rooms={rooms} handleClickRoom={handleClickRoom} maxRooms={4} />
        </div>

        {/* Image Middle */}
        <div className="w-full lg:flex-1">
          {/* <Image/> */}
          {profiles.map((profile, index) => <Card
            key={index}
            name={profile.name}
            email={profile.email}
            image={profile.image}
          />)}
        </div>

        {/* Status/Quantity Right */}
        <div className="w-full lg:flex-1 flex flex-col gap-3 lg:mt-0">
          <RoomStatus />
          <Quantity />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-col xl:flex-row gap-3 flex-1">
        {/* Date and Time Boxes + Temperature */}
        <div className="w-full xl:flex-1 flex flex-col gap-3 pb-0">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <DateBox />
            <TimeBox />
          </div>
          <TemBox />
        </div>

        {/* Report Table */}
        <div className="w-full xl:flex-2 ">
          <ReportTable />
        </div>
      </div>


    </div>

  );
}

export default DashboardPage;