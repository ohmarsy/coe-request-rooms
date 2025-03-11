import React, { useState } from "react";

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
  const rowsPerPage = maxRows;
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const visibleData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  function checkTypeDataInfo(value: string) {
    return !isNaN(Number(value));
  }

  return (
    <div className="overflow-x-auto">
      <div className="w-full overflow-x-auto  whitespace-nowrap">
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
                className={`hover:bg-blue-500 hover:text-white ${
                  rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
                key={rowIndex}
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-4 py-2 whitespace-nowrap">
                    {col.accessor === "information" ? (
                      checkTypeDataInfo(row[col.accessor]) ? (
                        <span>{row[col.accessor]}</span>
                      ) : (
                        <a href="#" className="text-blue-600 underline">
                          {row[col.accessor]}
                        </a>
                      )
                    ) : col.accessor === "approved" ? (
                      row[col.accessor] === "Approved" ? (
                        <p className="text-green-500">{row[col.accessor]}</p>
                      ) : (
                        <p className="text-red-500">{row[col.accessor]}</p>
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
            className={`transition duration-200 ease-in-out ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            {"<"}
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`transition duration-200 ease-in-out ${
                currentPage === index + 1
                  ? "text-black font-bold"
                  : "text-gray-600"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={`px-3 py-2 transition duration-200 ease-in-out ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
