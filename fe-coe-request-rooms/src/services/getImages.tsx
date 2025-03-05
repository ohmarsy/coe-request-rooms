import axios from 'axios';

// Define the structure of an image
export interface ImageData {
  name: string;
  email: string;
  image: string;
}

export const getImages = async (): Promise<ImageData[]> => {
  try {
    const response = await axios.get("http://localhost:5003/images");
    
    return response.data;
  } catch (err) {
    console.error("Error fetching images:", err);
    throw err;
  }
};
