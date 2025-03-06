import React, { useEffect, useState } from "react";
import TemBox from "../components/TemBox";
import DateBox from "../components/DateBox";
import TimeBox from "../components/TimeBox";
import AllRoom from "../components/AllRoom";
import RoomStatus from "../components/RoomStatus";
import Quantity from "../components/Quantity";
import Card from "../components/Card";
import axios from "axios";
import { getImages, ImageData } from "../services/getImages";
import Table from "../components/Table";
import ReportTablePage from "./ReportTable";
import { useNavigate } from "react-router-dom";

interface TemperatureIndoor {
  indoor: number;
}

interface TemperatureOutdoor {
  outdoor: number;
}

interface People {
  people: number;
}

const columns = [
  { header: "Room", accessor: "room" },
  { header: "Room Status", accessor: "status" },
  { header: "Information", accessor: "information" },
  { header: "Device", accessor: "device" },
  { header: "Time", accessor: "time" },
  { header: "Date", accessor: "date" },
];

const data = [
  {
    room: "EN4102",
    status: "Occupied",
    information: "35.8",
    device: "AN-3351-3",
    time: "16:45",
    date: "12-02-2025",
  },
  {
    room: "EM5103",
    status: "Occupied",
    information: "35.8",
    device: "AN-3351-3",
    time: "17:35",
    date: "12-02-2025",
  },
  {
    room: "EM5103",
    status: "Occupied",
    information: "User_image",
    device: "CAM-32",
    time: "19:35",
    date: "12-02-2025",
  },
  {
    room: "EM5103",
    status: "Occupied",
    information: "User_image",
    device: "CAM-32",
    time: "19:35",
    date: "12-02-2025",
  },
  {
    room: "EM5103",
    status: "Occupied",
    information: "User_image",
    device: "CAM-32",
    time: "19:35",
    date: "12-02-2025",
  },
  {
    room: "EM5103",
    status: "Occupied",
    information: "User_image",
    device: "CAM-32",
    time: "19:35",
    date: "12-02-2025",
  },
  {
    room: "EM5103",
    status: "Occupied",
    information: "User_image",
    device: "CAM-32",
    time: "19:35",
    date: "12-02-2025",
  },
  {
    room: "EM5103",
    status: "Occupied",
    information: "User_image",
    device: "CAM-32",
    time: "19:35",
    date: "12-02-2025",
  },
  {
    room: "EM5103",
    status: "Occupied",
    information: "User_image",
    device: "CAM-32",
    time: "19:35",
    date: "12-02-2025",
  },
  {
    room: "EM5103",
    status: "Occupied",
    information: "User_image",
    device: "CAM-32",
    time: "19:35",
    date: "12-02-2025",
  },
  {
    room: "EM5103",
    status: "Occupied",
    information: "User_image",
    device: "CAM-32",
    time: "19:35",
    date: "12-02-2025",
  },
  {
    room: "EM5103",
    status: "Occupied",
    information: "User_image",
    device: "CAM-32",
    time: "19:35",
    date: "12-02-2025",
  },
  {
    room: "EM5103",
    status: "Occupied",
    information: "User_image",
    device: "CAM-32",
    time: "19:35",
    date: "12-02-2025",
  },
  {
    room: "EM5103",
    status: "Occupied",
    information: "User_image",
    device: "CAM-32",
    time: "19:35",
    date: "12-02-2025",
  },
  {
    room: "EM5103",
    status: "Occupied",
    information: "User_image",
    device: "CAM-32",
    time: "19:35",
    date: "12-02-2025",
  },
  {
    room: "EM5103",
    status: "Occupied",
    information: "User_image",
    device: "CAM-32",
    time: "19:35",
    date: "12-02-2025",
  },
  {
    room: "EM5103",
    status: "Occupied",
    information: "User_image",
    device: "CAM-32",
    time: "19:35",
    date: "12-02-2025",
  },
  {
    room: "EM5103",
    status: "Occupied",
    information: "User_image",
    device: "CAM-32",
    time: "19:35",
    date: "12-02-2025",
  },
  {
    room: "EM5103",
    status: "Occupied",
    information: "User_image",
    device: "CAM-32",
    time: "19:35",
    date: "12-02-2025",
  },
  {
    room: "EM5103",
    status: "Occupied",
    information: "User_image",
    device: "CAM-32",
    time: "19:35",
    date: "12-02-2025",
  },
  {
    room: "EM5103",
    status: "Occupied",
    information: "User_image",
    device: "CAM-32",
    time: "19:35",
    date: "12-02-2025",
  },
  {
    room: "EM5103",
    status: "Occupied",
    information: "User_image",
    device: "CAM-32",
    time: "19:35",
    date: "12-02-2025",
  },
  {
    room: "EM5103",
    status: "Occupied",
    information: "User_image",
    device: "CAM-32",
    time: "19:35",
    date: "12-02-2025",
  },
  {
    room: "EM5103",
    status: "Occupied",
    information: "User_image",
    device: "CAM-32",
    time: "19:35",
    date: "12-02-2025",
  },
  {
    room: "EM5103",
    status: "Occupied",
    information: "User_image",
    device: "CAM-32",
    time: "19:35",
    date: "12-02-2025",
  },
  {
    room: "EM5103",
    status: "Occupied",
    information: "User_image",
    device: "CAM-32",
    time: "19:35",
    date: "12-02-2025",
  },
];

const DashboardPage = () => {
  const navigate = useNavigate();

  const [selectedRoom, setSelectedRoom] = useState("");
  const [imageData, setImageData] = useState<ImageData[]>([]);
  const [temperatureIndoor, setTemperatureIndoorData] = useState<
    TemperatureIndoor[]
  >([]);
  const [temperatureOutdoor, setTemperatureOutdoorData] = useState<
    TemperatureOutdoor[]
  >([]);
  const [people, setPeopleData] = useState<People[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getImages();
        setImageData(data);
        const responseTempIndoor = await axios.get(
          "http://localhost:5003/temperature-indoor"
        );
        const responseTempOutdoor = await axios.get(
          "http://localhost:5003/temperature-outdoor"
        );
        const responsePeople = await axios.get("http://localhost:5003/people");

        setTemperatureIndoorData(responseTempIndoor.data || {});
        setTemperatureOutdoorData(responseTempOutdoor.data || {});
        setPeopleData(responsePeople.data || {});

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

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
    {
      name: "EN4202",
    },
    {
      name: "EN4202",
    },
  ];
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full flex flex-col gap-3">
      {/* Top Column */}
      <div className="flex flex-col lg:flex-row gap-3 flex-1">
        {/* AllRoom Left */}
        <div className="w-full lg:flex-1">
          <AllRoom
            rooms={rooms}
            handleClickRoom={handleClickRoom}
            maxRooms={4}
          />
        </div>

        {/* Image Middle */}
        <div className="w-full lg:flex-1">
          {/* <Image/> */}
          <Card
            name={imageData[0].name}
            email={imageData[0].email}
            image={imageData[0].image}
          />
        </div>

        {/* Status/Quantity Right */}
        <div className="w-full lg:flex-1 flex flex-col gap-3 lg:mt-0">
          <RoomStatus />
          <Quantity people={people[0].people} />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-col xl:flex-row gap-3 flex-1 ">
        {/* Date and Time Boxes + Temperature */}
        <div className="w-full xl:flex-1 flex flex-col gap-3 pb-0">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <DateBox />
            <TimeBox />
          </div>
          <div className="flex gap-3 h-full">
            <TemBox indoor={temperatureIndoor[0].indoor} tempType={"indoor"} />
            <TemBox
              outdoor={temperatureOutdoor[0].outdoor}
              tempType={"outdoor"}
            />
          </div>
        </div>

        {/* Report Table */}
        <div className="w-full xl:flex-2 bg-white  shadow-sm rounded-2xl p-6 h-full">
          <p className="text-xl font-bold py-2">Room Status Table</p>
          <Table columns={columns} data={data} maxRows={4} pagination={false} />
          <div className="flex justify-end pt-2">
            <p
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
              onClick={() => {
                navigate("/main?menu=report-table");
              }}
            >
              See more
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
