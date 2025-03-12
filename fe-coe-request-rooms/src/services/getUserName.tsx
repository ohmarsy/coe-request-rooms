import {api} from "./useApiService";
import { User } from "../pages/ShowName";

export const getUserName = async (): Promise<User> => {
  const baseUrl = import.meta.env.REACT_APP_API_URL || "http://localhost";

  try {
    const response = await api.get(`${baseUrl}:5002/protected`); 
    return response.data.user;
  } catch (err) {
    console.error("Error fetching user name:", err);
    throw err;
  }
};
