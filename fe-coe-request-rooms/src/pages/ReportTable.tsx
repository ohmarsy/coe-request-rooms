import { useEffect, useState } from "react";
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
        const dataTable = await getReportTable();
        setReportTable(dataTable);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching report table:", err);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex flex-col justify-center items-center bg-white">
        <svg
          className="animate-spin h-12 w-12 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <p className="mt-4 text-lg font-medium text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full p-2">
      <h1 className="text-xl font-bold mb-4">Room Status Table</h1>
      <Table columns={columns} data={ReportTable} maxRows={10} />
    </div>
  );
};

export default ReportTablePage;
