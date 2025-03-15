import { useEffect, useState } from "react";
import Table from "../components/Table";
import { getReportTable, ReportTableData } from "../services/getReportTable";
import Loading from "../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

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
  const [page, setPage] = useState(1); // Current page


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before fetching

        // Fetch data with pagination
        const dataTable = await getReportTable(page, 10);

        setReportTable(dataTable);
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.error("Error fetching report table:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [page]); // Re-fetch data when `page` or `perPage` changes

  // Handle pagination changes
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col w-full p-2">
      <Table
        columns={columns}
        data={reportTable}
        maxRows={10}
        pagination={false}
      />

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4 w-full">
        <div>
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className={`cursor-pointer ${page === 1 ? "text-gray-200" : ""}`}
            />
          </button>
          <span className="mx-2">{page}</span>
          <button onClick={() => handlePageChange(page + 1)}>
            <FontAwesomeIcon
              icon={faChevronRight}
              className={`cursor-pointer`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportTablePage;
