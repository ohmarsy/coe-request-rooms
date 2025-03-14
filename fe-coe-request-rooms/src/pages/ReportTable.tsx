import { useEffect, useState } from "react";
import Table from "../components/Table";
import { getReportTable, ReportTableData } from "../services/getReportTable";
import Loading from "../components/Loading";
const columns = [
  { header: "Room", accessor: "room" },
  { header: "Device", accessor: "device" },
  { header: "Information", accessor: "information" },
  { header: "Time", accessor: "time" },
  { header: "Date", accessor: "date" },
];

const ReportTablePage = () => {
  const [reportTable, setReportTable] = useState<ReportTableData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataTable = await getReportTable();

        setReportTable(dataTable);
        

        console.log('reportTable', dataTable);
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching report table:", err);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col w-full p-2">
      <Table columns={columns} data={reportTable} maxRows={10} />
    </div>
  );
};

export default ReportTablePage;
