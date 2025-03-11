import axios from "axios";

export interface PeopleData {
    totalMovements: number;
    maxTimestamp: string;
}
export const getPeople = async (): Promise<PeopleData> => {
    try {
        const response = await axios.get("http://10.161.112.106:8000/motion/group");
        console.log('people data: ', response.data);
        return response.data;
    } catch (err) {
        console.error("Error fetching people:", err);
        throw err;
    }
};