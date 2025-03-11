import axios from "axios";

export const deleteAccess = async (id: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:5003/access-list/delete/${id}`
    );
    console.log("delete data: ", response.status);
  } catch (err) {
    console.error("Error fetching temperature:", err);
    throw err;
  }
};
