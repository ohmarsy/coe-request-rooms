import axios from "axios";
import { RoomProps } from "../components/AllRoom";

export const putAccessApproved = async (approved: string, id: string): Promise<RoomProps> => {
  try {
    const response = await axios.put(`http://localhost:5003/access-list/approve/${id}`, {
      approved
    });


    return response.data;
  } catch (err) {
    console.error("Error posting room:", err);
    throw err;
  }
};
