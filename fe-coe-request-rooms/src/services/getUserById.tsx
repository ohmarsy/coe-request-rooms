import { api } from "./useApiService";

export interface UserData {
  created_at: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  role: string;
}

export const getUserById = async (user_id: number): Promise<UserData[]> => {
  const baseUrl = import.meta.env.REACT_APP_API_URL || "http://localhost";

  try {
    const response = await api.get(`${baseUrl}:5002/user/${user_id}`);
    return response.data;
  } catch (err) {
    console.error("Error fetching access list:", err);
    throw err;
  }
};
