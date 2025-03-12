import useApiService from "./useApiService";

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

export const getUserName = async (): Promise<User> => {
  const { apiRequest } = useApiService('http://localhost:5002'); // Pass the desired baseURL

  try {
      const userData = await apiRequest('get', '/protected');
      return userData.user; // Assuming the response contains a user object
  } catch (err) {
      console.error("Error fetching user data:", err);
      throw err;
  }
};