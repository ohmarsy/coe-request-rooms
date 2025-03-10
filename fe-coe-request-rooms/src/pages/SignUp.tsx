import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import AuthForm from "../components/AuthForm";

export default function SignUpPage() {
    const navigate = useNavigate();
    
    const handleSignUp = async (firstname?: string, lastname?: string, email?: string, password?: string, role?: string) => {
        try {
            const response = await fetch('http://localhost:5002/registers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    first_name: firstname,  
                    last_name: lastname,  
                    email, 
                    password,
                    role: role  
                }),
            });
    
            if (response.ok) {
                console.log("Sign up successful!");
                navigate('/sign-in');
            } else {
                const errorData = await response.json();
                console.error("Error:", errorData.error || errorData.message);
            }
        } catch (error) {
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
                    <span className="text-[var(--primary-color)]">Sign up</span> to CoE Rooms
                </h2>

                <AuthForm
                    linkTo="/"
                    buttonText="Create account"
                    onSubmit={handleSignUp}
                    showDomainSelect={true} 
                    showFirstNameLastName={true} 
                />

                <div className="w-full max-w-xl mx-auto px-4">
                    <p className="mt-5 text-xs">
                        Already have an account?{" "}
                        <Link to="/sign-in" className="text-[var(--primary-color)] underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </motion.div>
        </AuthLayout>
    );
}
