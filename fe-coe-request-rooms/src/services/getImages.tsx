import axios from 'axios';

// Define the structure of an image
export interface ImageData {
  id: number;
  name: string;
  email: string;
  image: string;
  timestamps: number;
}

export const getImages = async (): Promise<ImageData[]> => {
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost";

  try {
    const response = await axios.get(`${baseUrl}:5003/images`);

    return response.data;
  } catch (err) {
    console.error("Error fetching images:", err);
    throw err;
  }
};
