import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import ImgWelcome from '../assets/image-welcome-page.png';
import Button from '../components/Button';

// Motion animation settings
const motionSettings = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
};

const WelcomePage = () => {
    return (
        <motion.div {...motionSettings} className="w-screen h-screen bg-[var(--background-color)] flex flex-col items-center text-[var(--text-color)]">
            
            {/* Header */}
            <h1 className="text-6xl font-bold my-16">
                <span className="text-[var(--primary-color)]">CoE</span> Rooms
            </h1>

            {/* Sign-in Button */}
            <Link to="/sign-in">
                <Button>Sign in</Button>
            </Link>

            {/* Sign-up link */}
            <p className="mt-8">
                You don’t have an account?{' '}
                <Link to="/sign-up" className="text-[var(--primary-color)] cursor-pointer underline">
                    Sign up
                </Link>
            </p>

            {/* Welcome Image */}
            <img className="mt-16" src={ImgWelcome} alt="Illustration of welcoming users to CoE Rooms" />

            {/* Footer */}
            <footer className="mt-16 text-center text-[#140B0C] opacity-40">
                <p>Developed by</p>
                <p className="font-semibold">BOSS OHM LEE EARTH ICE</p>
            </footer>
        </motion.div>
    );
};

export default WelcomePage;
