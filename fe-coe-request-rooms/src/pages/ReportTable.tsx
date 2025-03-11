import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import { getReportTable, ReportTableData } from "../services/getReportTable";
const columns = [
  { header: "Room", accessor: "room" },
  { header: "Room Status", accessor: "status" },
  { header: "Information", accessor: "information" },
  { header: "Device", accessor: "device" },
  { header: "Time", accessor: "time" },
  { header: "Date", accessor: "date" },
];


const ReportTablePage = () => {
  
  const [ReportTable, setReportTable] = useState<ReportTableData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await getReportTable();
        // setReportTable(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching report table:", err);
      }
    };
    fetchData();
  }
  , []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full p-2">
      <h1 className="text-xl font-bold mb-4">Room Status Table</h1>
      <Table columns={columns} data={ReportTable} maxRows={10} />
    </div>
  );
};

export default ReportTablePage;
