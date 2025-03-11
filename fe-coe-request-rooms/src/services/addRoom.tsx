import axios from "axios";
import { RoomProps } from "../components/AllRoom";

export const addRoom = async (room_id: string): Promise<RoomProps> => {
  try {
    const response = await axios.post("http://localhost:5003/add-room", {
      room_id: room_id,
    });

    return response.data;
  } catch (err) {
    console.error("Error posting room:", err);
    throw err;
  }
};
