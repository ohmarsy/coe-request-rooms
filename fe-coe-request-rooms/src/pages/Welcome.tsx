import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import ImgWelcome from "../assets/image-welcome-page.png";
import Button from "../components/Button";

// Animation settings
const fadeInUp = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
};

const WelcomePage = () => {
    return (
        <motion.div 
            {...fadeInUp} 
            className="h-screen flex flex-col items-center justify-between text-[var(--text-color)] bg-[var(--background-color)] px-4 gap-4"
        >
            {/* Header */}
            <h1 className="text-4xl md:text-6xl font-bold mt-24">
                <span className="text-[var(--primary-color)]">CoE</span> Rooms
            </h1>

            {/* Sign-in Button */}
            <Link to="/sign-in">
                <Button>Sign in</Button>
            </Link>

            {/* Sign-up link */}
            <p className="text-sm">
                Don’t have an account?{' '}
                <Link to="/sign-up" className="text-[var(--primary-color)] underline">
                    Sign up
                </Link>
            </p>

            {/* Welcome Image */}
            <img 
                src={ImgWelcome} 
                alt="Welcome illustration for CoE Rooms" 
            />

            {/* Footer */}
            <footer className="w-full text-center text-[#140B0C] opacity-40 text-sm py-4">
                <p>Developed by</p>
                <p className="font-semibold">BOSS OHM LEE EARTH ICE</p>
            </footer>
        </motion.div>
    );
};

export default WelcomePage;
