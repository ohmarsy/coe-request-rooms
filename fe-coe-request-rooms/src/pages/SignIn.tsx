import { useState } from "react";
import { motion } from "framer-motion";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import AuthForm from "../components/AuthForm";
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function SignInPage() {
  const baseUrl = import.meta.env.VITE_API_URL || "http://localhost";
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state
    const navigate = useNavigate();
    const { login, isAuthenticated, role } = useAuth();

    // Redirect if the user is already authenticated
    if (isAuthenticated) {
        return <Navigate to={role === 'student' ? "/request-rooms" : "/main"} replace />;
    }

    // Handle sign-in
    const handleSignIn = async (firstname?: string, lastname?: string, email?: string, password?: string, role?: string) => {
        console.log('Received values:', { firstname, lastname, email, password, role });
        setLoading(true); // Set loading state
        try {
            const response = await axios.post(`${baseUrl}:5002/login`, { email, password }, { withCredentials: true });
            if (response.status === 200) {
                login(response.data.access_token, response.data.refresh_token,response.data.role); // Store tokens
                navigate(response.data.role === "student" ? "/request-rooms" : '/main');
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data.error || 'Invalid email or password.');
            } else {
                setError('An unexpected error occurred.');
            }
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <AuthLayout>
            <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-[var(--background-color)] text-[var(--text-color)] w-full h-full flex flex-col items-center justify-center"
            >
                <h2 className="w-full max-w-xl mx-auto p-4 text-3xl text-[var(--text-color)] mb-6">
                    <span className="text-[var(--primary-color)]">Sign in</span> to CoE Rooms
                </h2>

                {error && <p className="text-red-500">{error}</p>}

                <AuthForm
                    linkTo="/main"
                    buttonText={loading ? "Signing in..." : "Sign in"} // Update button text based on loading
                    onSubmit={handleSignIn}
                    showDomainSelect={true}
                    showFirstNameLastName={false}
                />

                <div className="w-full max-w-xl mx-auto px-4">
                    <p className="mt-5 text-xs">
                        Don't have an account?{" "}
                        <Link to="/sign-up" className="text-[var(--primary-color)] underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </motion.div>
        </AuthLayout>
    );
}
