import React from "react";
import Table from "../components/Table";
const columns = [
  { header: "Room", accessor: "room" },
  { header: "Room Status", accessor: "status" },
  { header: "Information", accessor: "information" },
  { header: "Device", accessor: "device" },
  { header: "Time", accessor: "time" },
  { header: "Date", accessor: "date" },
];

const data = [
  { room: "EN4102", status: "Occupied", information: "35.8", device: "AN-3351-3", time: "16:45", date: "12-02-2025" },
  { room: "EM5103", status: "Occupied", information: "35.8", device: "AN-3351-3", time: "17:35", date: "12-02-2025" },
  { room: "EM5103", status: "Occupied", information: "User_image", device: "CAM-32", time: "19:35", date: "12-02-2025" },
  { room: "EM5103", status: "Occupied", information: "User_image", device: "CAM-32", time: "19:35", date: "12-02-2025" },
  { room: "EM5103", status: "Occupied", information: "User_image", device: "CAM-32", time: "19:35", date: "12-02-2025" },
  { room: "EM5103", status: "Occupied", information: "User_image", device: "CAM-32", time: "19:35", date: "12-02-2025" },
  { room: "EM5103", status: "Occupied", information: "User_image", device: "CAM-32", time: "19:35", date: "12-02-2025" },
  { room: "EM5103", status: "Occupied", information: "User_image", device: "CAM-32", time: "19:35", date: "12-02-2025" },
  { room: "EM5103", status: "Occupied", information: "User_image", device: "CAM-32", time: "19:35", date: "12-02-2025" },
  { room: "EM5103", status: "Occupied", information: "User_image", device: "CAM-32", time: "19:35", date: "12-02-2025" },
  { room: "EM5103", status: "Occupied", information: "User_image", device: "CAM-32", time: "19:35", date: "12-02-2025" },
  { room: "EM5103", status: "Occupied", information: "User_image", device: "CAM-32", time: "19:35", date: "12-02-2025" },
  { room: "EM5103", status: "Occupied", information: "User_image", device: "CAM-32", time: "19:35", date: "12-02-2025" },
  { room: "EM5103", status: "Occupied", information: "User_image", device: "CAM-32", time: "19:35", date: "12-02-2025" },
  { room: "EM5103", status: "Occupied", information: "User_image", device: "CAM-32", time: "19:35", date: "12-02-2025" },
  { room: "EM5103", status: "Occupied", information: "User_image", device: "CAM-32", time: "19:35", date: "12-02-2025" },
  { room: "EM5103", status: "Occupied", information: "User_image", device: "CAM-32", time: "19:35", date: "12-02-2025" },
  { room: "EM5103", status: "Occupied", information: "User_image", device: "CAM-32", time: "19:35", date: "12-02-2025" },
  { room: "EM5103", status: "Occupied", information: "User_image", device: "CAM-32", time: "19:35", date: "12-02-2025" },
  { room: "EM5103", status: "Occupied", information: "User_image", device: "CAM-32", time: "19:35", date: "12-02-2025" },
  { room: "EM5103", status: "Occupied", information: "User_image", device: "CAM-32", time: "19:35", date: "12-02-2025" },
  { room: "EM5103", status: "Occupied", information: "User_image", device: "CAM-32", time: "19:35", date: "12-02-2025" },
  { room: "EM5103", status: "Occupied", information: "User_image", device: "CAM-32", time: "19:35", date: "12-02-2025" },
  { room: "EM5103", status: "Occupied", information: "User_image", device: "CAM-32", time: "19:35", date: "12-02-2025" },
  { room: "EM5103", status: "Occupied", information: "User_image", device: "CAM-32", time: "19:35", date: "12-02-2025" },
  { room: "EM5103", status: "Occupied", information: "User_image", device: "CAM-32", time: "19:35", date: "12-02-2025" },
];

const ReportTablePage: React.FC = () => {
  return (
    <div className="flex flex-col w-full p-2">
      <h1 className="text-xl font-bold mb-4">Room Status Table</h1>
      <Table columns={columns} data={data} maxRows={10} />
    </div>
  );
};

export default ReportTablePage;
