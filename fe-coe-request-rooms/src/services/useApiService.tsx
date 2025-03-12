import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useApiService = (baseURL: string) => {
    const apiClient = axios.create({
        baseURL,
    });
    const navigate = useNavigate();

    const getAccessToken = () => {
        return localStorage.getItem('access_token');
    };

    const handleUnauthorized = async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        try {
            const response = await axios.post(`${baseURL}/refresh/`, {
                refresh_token: refreshToken,
            });
            const { access_token } = response.data;
            localStorage.setItem('access_token', access_token);
            return access_token;
        } catch (error: any) {
            console.error("Failed to refresh token:", error.response?.data.error);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            navigate('/login');
            throw error;
        }
    };

    const apiRequest = async (method: 'get' | 'post', url: string, data?: any) => {
        try {
            const accessToken = getAccessToken();
            const response = await apiClient({
                method,
                url,
                data,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 401) {
                const newAccessToken = await handleUnauthorized();
                if (newAccessToken) {
                    return apiRequest(method, url, data); // Retry the original request
                }
            }
            console.error("API request failed:", error.response?.data.error);
            throw error;
        }
    };

    return {
        apiRequest,
    };
};

export default useApiService;
