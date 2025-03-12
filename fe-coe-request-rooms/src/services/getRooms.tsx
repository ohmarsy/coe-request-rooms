import {api} from "./useApiService";

import { RoomProps } from '../components/AllRoom';

export const getRooms = async (): Promise<RoomProps[]> => {
  try {
    const response =await api.get("http://localhost:5003/rooms"); 
    
    return response.data;
  } catch (err) {
    console.error("Error fetching images:", err);
    throw err;
  }
};
