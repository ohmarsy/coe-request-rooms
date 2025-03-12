import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL || "http://localhost:5002",
});



api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});


api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshAccessToken();
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

// ฟังก์ชันสำหรับรีเฟรชโทเค็น
const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  try {
    const response = await axios.post(`${api.defaults.baseURL}/refresh/`, {
      refresh_token: refreshToken
    });
    const { access_token } = response.data;
    localStorage.setItem('access_token', access_token);
  } catch (error: any) {
    console.error("Failed to refresh token:", error.response?.data.error);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login'; 
  }
};

export { api, refreshAccessToken };
