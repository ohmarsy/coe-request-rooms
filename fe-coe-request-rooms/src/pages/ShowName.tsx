import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
}

const ShowName: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    const fetchUserData = async () => {
        try {
            const accessToken = localStorage.getItem('access_token');
            const response = await axios.get('http://localhost:5002/protected', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setUser(response.data.user);
        } catch (error: any) {
            if (error.response?.status === 401) {
                await refreshAccessToken();
            } else {
                console.error("Failed to fetch user data:", error.response?.data.error);
            }
        }
    };

    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem('refresh_token');
        try {
            const response = await axios.post('http://localhost:5002/refresh/', {
                refresh_token: refreshToken
            });
            const { access_token } = response.data;
            localStorage.setItem('access_token', access_token);
            fetchUserData();
        } catch (error: any) {
            console.error("Failed to refresh token:", error.response?.data.error);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            navigate('/login');
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            {user ? (
                <div>
                    <h3>Welcome, {user.first_name} {user.last_name}</h3>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ShowName;
