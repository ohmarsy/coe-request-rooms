import axios from "axios";

export interface PeopleData {
    totalMovements: number;
    maxTimestamp: string;
}
export const getPeople = async (): Promise<PeopleData[]> => {
    try {
        const response = await axios.get("http://localhost:5003/people");
        return response.data;
    } catch (err) {
        console.error("Error fetching people:", err);
        throw err;
    }
};