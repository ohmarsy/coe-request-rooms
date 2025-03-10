import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import AuthForm from "../components/AuthForm";

export default function SignInPage() {
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignIn = async (firstname?: string, lastname?: string, email?: string, password?: string, role?:string) => {
        console.log("Signing in:", firstname ?? "No Firstname", lastname ?? "No Lastname", email ?? "No Email", password ?? "No Password" ,role ?? "No Role");

        try {
            const response = await fetch('http://localhost:5002/access_account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Sign-in failed. Please try again.');
                return;
            }

            const data = await response.json();
            console.log("Sign-in successful!", data);
            
            navigate('/main');
        } catch (error) {
            setError('Network error. Please try again later.');
            console.error("Network error:", error);
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

                {error && <p className="text-red-500">{error}</p>} {/* Display error message */}

                <AuthForm
                    linkTo="/main"
                    buttonText="Sign in"
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
