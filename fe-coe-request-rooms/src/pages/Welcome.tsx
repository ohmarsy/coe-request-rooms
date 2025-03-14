import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import ImgWelcome from "../assets/image-welcome-page.png";
import Button from "../components/Button";
import GradientText from "../components/GradientText";

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
            <footer className="w-full text-center text-[#140B0C]  py-4 flex flex-col space-y-2">
                <p className="opacity-40">Developed by</p>
                <div className="flex flex-row justify-center items-center gap-2 text-lg font-bold">
                    <a href="https://github.com/JakkapatB" target="_blank">
                        <GradientText children="BOSS" />
                    </a>
                    <a href="https://github.com/ohmarsy" target="_blank"><GradientText children="OHM" /></a>
                    <a href="https://github.com/WeerapongKh" target="_blank"><GradientText children="LEE" /></a>
                    <a href="https://github.com/Piyawat-Mokkhuthod" target="_blank"><GradientText children="EARTH" /></a>
                    <a href="https://github.com/Wachiice" target="_blank"><GradientText children="ICE" /></a>
                </div>
            </footer>
        </motion.div>
    );
};

export default WelcomePage;
