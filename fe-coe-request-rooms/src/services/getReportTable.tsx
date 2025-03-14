import { getRooms } from "./getRooms";
import { getTemperature } from "./getTemperature";
import { getImages } from "./getImages";

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
    hour12: true
  });

  formattedTime = formattedTime.replace("am", "AM").replace("pm", "PM");

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const formattedDateWithDash = formattedDate.replace(/\//g, '-');


  return { time: formattedTime, date: formattedDateWithDash  };
};

export const getReportTable = async (): Promise<ReportTableData[]> => {
  try {
    const rooms = await getRooms();
    const temperatureData = await getTemperature();
    const imagesData = await getImages();

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

    //Image Data
    imagesData.forEach((image) => {
      if (validRooms.includes("EN4412")) { 
        const { time, date } = formatTimestamp(Number(image.timestamps));
        reportData.push({
          id: image.id.toString(),
          room: "EN4412",
          device: "IPCamera",
          information: "User_image",
          time,
          date,
        });
      }
    });

    return reportData;
  } catch (error) {
    console.error("Error merging report data:", error);
    return [];
  }
};
