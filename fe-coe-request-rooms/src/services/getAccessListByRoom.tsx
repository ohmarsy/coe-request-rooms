import axios from "axios";

export interface AccessListData {
  approved: boolean;
  checkin: string;
  checkout: string;
  date: string;
  id: number;
  room_id: string;
  user_id: number;
}

export const getAccessListByRoom = async (
  room_id: string
): Promise<AccessListData[]> => {
  try {
    const response = await axios.get(
      `http://localhost:5003/access-list/room/${room_id}`
    );
    return response.data;
  } catch (err) {
    console.error("Error fetching access list:", err);
    throw err;
  }
};
