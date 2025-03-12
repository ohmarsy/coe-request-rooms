import axios from "axios";

export const deleteAccess = async (id: string) => {
  const baseUrl = import.meta.env.REACT_APP_API_URL || "http://localhost";

  try {
    const response = await axios.delete(
      `${baseUrl}:5003/access-list/delete/${id}`
    );
    console.log("delete data: ", response.status);
  } catch (err) {
    console.error("Error fetching temperature:", err);
    throw err;
  }
};
