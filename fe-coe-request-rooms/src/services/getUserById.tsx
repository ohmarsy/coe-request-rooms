import axios from "axios";

export interface UserData {
  created_at: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  role: string;
}

export const getUserById = async (
  user_id: number
): Promise<UserData[]> => {
    const accessToken = localStorage.getItem('access_token');

  try {
    const response = await axios.get(
      `http://localhost:5002/user/${user_id}/`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }
    );
    return response.data;
  } catch (err) {
    console.error("Error fetching access list:", err);
    throw err;
  }
};
