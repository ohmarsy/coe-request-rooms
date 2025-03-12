import {api} from "./useApiService";
import { User } from "../pages/ShowName";

export const getUserName = async (): Promise<User> => {
  try {
    const response = await api.get("http://localhost:5002/protected");  // ไม่ต้องกำหนด headers ใหม่
    return response.data.user;
  } catch (err) {
    console.error("Error fetching user name:", err);
    throw err;
  }
};
