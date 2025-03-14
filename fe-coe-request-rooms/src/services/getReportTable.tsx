import { getRooms } from "./getRooms";
import { getTemperature } from "./getTemperature";
import { fetchAllImages } from "./getImages";

export interface ReportTableData {
  id: string;
  room: string;
  device: string;
  information: string;
  time: string;
  date: string;
  
  [key: string]: string;
}

// Helper function to convert Unix timestamp to Thai timezone (UTC+7) format
const formatTimestamp = (unixTimestamp: number): { time: string; date: string } => {
  const date = new Date(unixTimestamp * 1000); // Convert seconds to milliseconds
  date.setUTCHours(date.getUTCHours() + 7); // Convert to UTC+7

  let formattedTime = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return { time: formattedTime, date: formattedDate };
};

export const getReportTable = async ( ): Promise<ReportTableData[]> => {
  try {
    const rooms = await getRooms();
    const temperatureData = await getTemperature();
    const imagesData = await fetchAllImages();

    const validRooms = rooms.map((room) => room.room_id);

    const reportData: ReportTableData[] = [];

    //Temperature Data
    const tempEntries = Object.values(temperatureData);
    tempEntries.forEach((temp) => {
      if (validRooms.includes("EN4412")) {
        const { time, date } = formatTimestamp(temp.Timestamps);
        reportData.push({
          id: temp.id,
          room: "EN4412",
          device: "IoT",
          information: temp.Temperature.toString(),
          time,
          date,
        });
      }
    });

    imagesData.forEach((image) => {
      if (validRooms.includes("EN4412")) {
        const timestamp = new Date(image.timestamps.split(" ")[0]);
        const formattedDate = `${timestamp.getDate().toString().padStart(2, '0')}/${(timestamp.getMonth() + 1).toString().padStart(2, '0')}/${timestamp.getFullYear().toString()}`;
    
        reportData.push({
          id: image.id.toString(),
          room: "EN4412",
          device: "IPCamera",
          information: "User_image",
          time: image.timestamps.split(" ")[1],
          date: formattedDate, 
        });
      }
    });
    

    return reportData;
  } catch (error) {
    console.error("Error merging report data:", error);
    return [];
  }
};
