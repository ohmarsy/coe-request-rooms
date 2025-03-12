import axios from "axios";

export interface ReportTableData {
  room: string;
  status: string;
  information: string;
  device: string;
  time: string;
  date: string;
  [key: string]: string;
}

export const getReportTable = async (): Promise<ReportTableData[]> => {
  const baseUrl = import.meta.env.REACT_APP_API_URL || "http://localhost";

  try {
    const response = await axios.get(`${baseUrl}:5003/report-table`);
    return response.data;
  } catch (err) {
    console.error("Error fetching report table:", err);
    throw err;
  }
};
