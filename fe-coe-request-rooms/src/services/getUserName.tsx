import axios from "axios";
import { User } from "../pages/ShowName";

export const getUserName = async (): Promise<User> => {
    const token = localStorage.getItem('access_token');
  try {
    const response = await axios.get(`http://localhost:5002/protected`, {
      headers: {
          Authorization: `Bearer ${token}`
      }
    });
    
    return response.data.user;
  } catch (err) {
    console.error("Error fetching access list:", err);
    throw err;
  }
};
