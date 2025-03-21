import { useEffect, useState } from "react";
import TemBox from "../components/TemBox";
import DateBox from "../components/DateBox";
import TimeBox from "../components/TimeBox";
import AllRoom, { RoomProps } from "../components/AllRoom";
import RoomStatus from "../components/RoomStatus";
import Quantity from "../components/Quantity";
import Card from "../components/Card";
import Table from "../components/Table";
import { useNavigate } from "react-router-dom";
import { getRooms } from "../services/getRooms";
import { getPeople, PeopleData } from "../services/getPeople";
import { getReportTable, ReportTableData } from "../services/getReportTable";
import {
  AllTemperatureProps,
  getTemperature,
} from "../services/getTemperature";
import Loading from "../components/Loading";
import { fetchAllImagesWithPagination } from "../services/getImageWithPagination";
import { ImageData } from "../services/getImages";

const columns = [
  { header: "Room", accessor: "room" },
  { header: "Device", accessor: "device" },
  { header: "Information", accessor: "information" },
  { header: "Time", accessor: "time" },
  { header: "Date", accessor: "date" },
];

const DashboardPage = () => {
  const navigate = useNavigate();
  const [hasFetchData, setHasFetchedData] = useState(false);

  const [selectedRoom, setSelectedRoom] = useState("");
  const [imageData, setImageData] = useState<ImageData[]>([]);
  const [roomData, setRoomData] = useState<RoomProps[]>([]);
  const [peopleData, setPeopleData] = useState<PeopleData | null>({
    totalMovements: 0,
    maxTimestamp: "",
  });
  const [ReportTable, setReportTable] = useState<ReportTableData[]>([]);
  const [temperatureData, setTemperatureData] =
    useState<AllTemperatureProps | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (hasFetchData) return;
      try {
        const data = await fetchAllImagesWithPagination({
          page: 1,
          per_page: 1,
        });
        const roomData = await getRooms();
        const peopleData = await getPeople();
        const dataTable = await getReportTable();
        const temperatureData = await getTemperature();

        setReportTable(dataTable);
        setImageData(data);
        setRoomData(roomData);
        setPeopleData(selectedRoom === "EN4412" ? peopleData : null);
        setTemperatureData(selectedRoom === "EN4412" ? temperatureData : null);

        setHasFetchedData(true);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [selectedRoom, hasFetchData]);

  const handleClickRoom = (name: string) => {
    setSelectedRoom(name);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full h-full flex flex-col gap-3 p-2">
      {/* Top Column */}
      <div className="flex flex-col lg:flex-row  gap-3 flex-2 max-xl:flex-1 h-1/2 max-lg:h-1/1">
        {/* AllRoom Left */}
        <div className="w-full lg:flex-1">
          <AllRoom
            rooms={roomData}
            handleClickRoom={handleClickRoom}
            selectedRoom={selectedRoom}
            classNameOuter={"min-h-[100%]"}
            classNameInner={
              "max-h-[22vh] min-h-[13.75rem] max-lg:h-[200px] max-[1280px]:max-h-[155px]"
            }
          />
        </div>

        <div className="flex flex-row gap-3 w-full  flex-1 max-[1280px]:flex-2">
          {/* Image Middle */}
          <div className="flex flex-col w-full lg:flex-1 max-[1280px]:flex-1 gap-3">
            {/* Conditional rendering for EN4412 */}
            {selectedRoom === "EN4412" && imageData ? (
              <Card
                image={imageData[0].imageUrl}
                date={new Date(imageData[0].timestamps).toLocaleDateString(
                  "en-GB"
                )}
                time={new Date(imageData[0].timestamps).toLocaleTimeString([], {
                  hour12: false,
                  hour: "2-digit",
                  minute: "2-digit",
                })}
                page="dashboard"
              />
            ) : (
              <div
                className="w-full h-full bg-white flex items-center justify-center flex-col rounded-2xl shadow-sm"
                onClick={() => console.log(imageData[0])}
              >
                <p className="text-gray-400 text-xs sm:text-lg truncate ">
                  No image data
                </p>
              </div>
            )}
          </div>

          {/* Status/Quantity Right */}
          <div className="w-full flex-1 flex flex-col gap-3 lg:mt-0">
            <RoomStatus peopleData={peopleData} />
            <Quantity peopleData={peopleData} />
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-col xl:flex-row gap-3 h-1/1 max-lg:h-1/1">
        {/* Date and Time Boxes + Temperature */}
        <div className="w-full xl:flex-1 flex flex-col gap-3 pb-0">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <DateBox />
            <TimeBox />
          </div>
          <div className="flex gap-3 h-full">
            <>
              <TemBox AllTemperatureData={temperatureData} tempType="inside" />
              <TemBox AllTemperatureData={temperatureData} tempType="outside" />
            </>
          </div>
        </div>

        {/* Report Table */}
        <div className="w-full xl:flex-2 bg-white  shadow-sm rounded-2xl p-6 h-full">
          <p className="text-xl font-bold py-2">Report Table</p>
          <Table
            columns={columns}
            data={ReportTable}
            maxRows={3}
            pagination={false}
            buttonShow={false}
          />
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
