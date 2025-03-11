import axios from "axios";

export interface TemperatureData {
    Location: string;
    Timestamps: number;
    Temperature: number;
}

export interface AllTemperatureProps {
    Inside: TemperatureData;
    Outside: TemperatureData;
}

export const getTemperature = async (): Promise<AllTemperatureProps> => {
    try {
        const response = await axios.get("http://10.161.112.106:8000/temp");
        console.log('temp data: ', response.data);
        return response.data;
    } catch (err) {
        console.error("Error fetching temperature:", err);
        throw err;
    }
};