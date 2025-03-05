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
  pagination? : boolean;
}

const Table: React.FC<TableProps> = ({ columns, data, maxRows,pagination=true }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = maxRows;
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const visibleData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="relative overflow-x-auto">
      <div className="relative overflow-x-auto lg:overflow-scroll whitespace-nowrap max-w-[1200px]">
        <table className="w-full min-w-full border-collapse border-spacing-0 table-auto max-w-[1200px] overflow-x-scroll">
          <thead>
            <tr className="text-gray-500 text-left text-sm">
              {columns.map((col, index) => (
                <th key={index} className="px-4 py-2 font-medium whitespace-nowrap lg:whitespace-normal">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody >
            {visibleData.map((row, rowIndex) => (
              <tr
                className={`hover:bg-blue-500 hover:text-white ${rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}`}
                key={rowIndex}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-2 whitespace-nowrap lg:whitespace-normal"
                  >
                    {col.accessor === "information" ? (
                      <a href="#" className="text-blue-600 hover:underline">
                        {row[col.accessor]}
                      </a>
                    ) : (
                      row[col.accessor]
                    )}
                  </td>
                ))}
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
              className={`transition duration-200 ease-in-out ${currentPage === index + 1 ? "text-black font-bold" : "text-gray-600"
                }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={`px-3 py-2 transition duration-200 ease-in-out ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            {">"}
          </button>
        </div>
      )}
    </div>
      
  );
};

export default Table;