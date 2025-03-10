import { useEffect, useState } from "react";
import TemBox from "../components/TemBox";
import DateBox from "../components/DateBox";
import TimeBox from "../components/TimeBox";
import AllRoom, { RoomProps } from "../components/AllRoom";
import RoomStatus from "../components/RoomStatus";
import Quantity from "../components/Quantity";
import Card from "../components/Card";
import axios from "axios";
import { getImages, ImageData } from "../services/getImages";
import Table from "../components/Table";
import { useNavigate } from "react-router-dom";
import { getRooms } from "../services/getRooms";
import { getPeople, PeopleData } from "../services/getPeople";

interface TemperatureIndoor {
  indoor: number;
}

interface TemperatureOutdoor {
  outdoor: number;
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
<<<<<<< Updated upstream
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
=======

 
>>>>>>> Stashed changes
];

const DashboardPage = () => {
  const navigate = useNavigate();

  const [selectedRoom, setSelectedRoom] = useState("");
  const [imageData, setImageData] = useState<ImageData[]>([]);
  const [roomData, setRoomData] = useState<RoomProps[]>([]);
  const [peopleData, setPeopleData] = useState<PeopleData[]>([]);
  
  const [temperatureIndoor, setTemperatureIndoorData] = useState<
    TemperatureIndoor[]
  >([]);
  const [temperatureOutdoor, setTemperatureOutdoorData] = useState<
    TemperatureOutdoor[]
  >([]);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getImages();
        const roomData = await getRooms();
        const peopleData = await getPeople();
        setImageData(data);
        setRoomData(roomData);
        setPeopleData(peopleData);
        console.log("peopleData: ", peopleData);
        

        const responseTempIndoor = await axios.get("http://localhost:5003/temperature-indoor");
        const responseTempOutdoor = await axios.get("http://localhost:5003/temperature-outdoor");

        setTemperatureIndoorData(responseTempIndoor.data || {});
        setTemperatureOutdoorData(responseTempOutdoor.data || {});

        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleClickRoom = (name: string) => {
    setSelectedRoom(name);
    console.log(selectedRoom);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 p-2">
      {/* Top Column */}
      <div className="flex flex-col lg:flex-row gap-3 flex-2 max-xl:flex-1 h-1/2 max-lg:h-1/1">
        {/* AllRoom Left */}
        <div className="w-full lg:flex-1">
          <AllRoom
            rooms={roomData}
            handleClickRoom={handleClickRoom}
            classNameOuter={"min-h-[100%]"}
            classNameInner={"max-h-[22vh] min-h-[13.75rem] max-lg:h-[200px]"}
          />
        </div>

        <div className="flex flex-row gap-3 w-full flex-1 max-[1280px]:flex-2">
          {/* Image Middle */}
          <div className="flex flex-col w-full lg:flex-1 max-[1280px]:flex-1 gap-3">
            {/* <Image/> */}
            <Card
              name={imageData[0].name}
              email={imageData[0].email}
              image={imageData[0].image}
            />
          </div>

          {/* Status/Quantity Right */}
          <div className="w-full flex-1 flex flex-col gap-3 lg:mt-0">
            <RoomStatus />
            <Quantity peopleData={peopleData}/>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-col xl:flex-row gap-3 h-1/2 max-lg:h-1/1">
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
          <Table columns={columns} data={data} maxRows={4} pagination={false} buttonShow={false}/>
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
