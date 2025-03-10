import axios from "axios";

export interface PeopleData {
    totalMovements: number;
    maxTimestamp: string;
}
export const getPeople = async (): Promise<PeopleData> => {
    try {
        const response = await axios.get("https://1d0e-202-12-97-195.ngrok-free.app/motion/group");
        return response.data;
    } catch (err) {
        console.error("Error fetching people:", err);
        throw err;
    }
};