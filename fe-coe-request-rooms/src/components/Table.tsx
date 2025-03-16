import React, { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { fetchAllImages , ImageData  } from "../services/getImages";


interface Column {
  header: string;
  accessor: string;
}

interface RowData {
  [key: string]: string;
}

interface TableProps {
  columns: Column[];
  data: RowData[];
  maxRows: number;
  pagination?: boolean;
  buttonShow?: boolean;
  handleApprove?: (id: string) => void;
  handleReject?: (id: string) => void;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  maxRows,
  pagination = true,
  buttonShow = false,
  handleApprove,
  handleReject,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedRowData, setSelectedRowData] = useState<RowData | null>(null);
  const [imageData, setImageData] = useState<ImageData[]>([]);

  const rowsPerPage = maxRows;
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const visibleData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllImages ();
        setImageData(data);
      } catch (err) {
        console.error("Error fetching data:", err);

      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (row: RowData) => {
    setSelectedRowData(row);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRowData(null);
  };

  function checkTypeDataInfo(value: string) {
    return !isNaN(Number(value));
  }

  return (
    <div className="overflow-x-auto">
      <div className="w-full overflow-x-auto whitespace-nowrap">
        <table className="w-full min-w-max border-collapse border-spacing-0 table-auto">
          <thead>
            <tr className="text-gray-500 text-left text-sm">
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="px-4 py-2 font-medium whitespace-nowrap"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visibleData.map((row, rowIndex) => (
              <tr
                className={`${rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                key={rowIndex}
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-4 py-2 whitespace-nowrap">
                    {col.accessor === "information" ? (
                      checkTypeDataInfo(row[col.accessor]) ? (
                        <span>
                          {!isNaN(parseFloat(row[col.accessor])) ?
                            `${row[col.accessor]} °C` : row[col.accessor]}
                        </span>
                      ) : (
                        <button
                          className="text-blue-600 underline cursor-pointer"
                          onClick={() => handleOpenModal(row)}
                        >
                          {row[col.accessor]}
                        </button>
                      )
                    ) : col.accessor === "approved" || col.accessor === "status" ? (
                      row[col.accessor] === "Approved" ? (
                        <p className="text-green-500">{row[col.accessor]}</p>
                      ) : (
                        row[col.accessor] === "Pending" ? (
                          <p className="text-gray-500">{row[col.accessor]}</p>
                        ) : (
                          <p className="text-red-500">{row[col.accessor]}</p>
                        )
                      )
                    ) : (
                      row[col.accessor]
                    )}
                  </td>
                ))}
                {buttonShow && (
                  <td className="px-4 py-2 whitespace-nowrap flex gap-2">
                    <button
                      onClick={() => {
                        handleApprove?.(row.id as string);
                      }}
                      className="px-4 py-0.5 text-sm text-green-500 bg-green-200 shadow-2xs rounded-lg hover:bg-green-300 hover:text-green-700 focus:outline-none cursor-pointer"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        handleReject?.(row.id as string);
                      }}
                      className="px-4 py-0.5 text-sm text-red-500 bg-red-200 shadow-2xs rounded-lg hover:bg-red-300 hover:text-red-700 focus:outline-none cursor-pointer"
                    >
                      Reject
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex justify-end items-center mt-4 space-x-2 text-gray-600 text-base">
          <button
            className={`transition duration-200 ease-in-out ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            {"<"}
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`transition duration-200 ease-in-out cursor-pointer ${currentPage === index + 1
                ? "text-black font-bold"
                : "text-gray-600"
                }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={`px-3 py-2 transition duration-200 ease-in-out cursor-pointer ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            {">"}
          </button>
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} title="Image Information">
        
        {imageData ? (
          imageData.filter((item) => `${item.id}` == `${selectedRowData?.id}`)
            .map((item, index) => (
              <div className="w-full overflow-hidden " key={index}>
                <img
                    src={item.imageUrl}
                  alt="Camera capture"
                  className="w-48 h-48 object-cover mx-auto rounded-md"
                />
              </div>
            ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            <p>No image data available</p>
          </div>
        )}

      </Modal>

    </div>
  );
};

export default Table;