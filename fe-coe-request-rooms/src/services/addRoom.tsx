import axios from "axios";
import { RoomProps } from "../components/AllRoom";

export const addRoom = async (room_id: string): Promise<RoomProps> => {
  const baseUrl = import.meta.env.REACT_APP_API_URL || "http://localhost";

  try {
    const response = await axios.post(`${baseUrl}:5003/add-room`, {
      room_id: room_id,
    });

    return response.data;
  } catch (err) {
    console.error("Error posting room:", err);
    throw err;
  }
};
