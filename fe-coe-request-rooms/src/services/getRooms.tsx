import {api} from "./useApiService";
import { RoomProps } from '../components/AllRoom';

export const getRooms = async (): Promise<RoomProps[]> => {
  const baseUrl = import.meta.env.REACT_APP_API_URL || "http://localhost";

  try {
    const response =await api.get(`${baseUrl}:5003/all-rooms`); 
    
    return response.data;
  } catch (err) {
    console.error("Error fetching images:", err);
    throw err;
  }
};
