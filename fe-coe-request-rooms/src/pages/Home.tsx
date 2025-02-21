import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import ImgWelcome from '../assets/image-welcome-page.png';
import Button from '../components/Button';

const HomePage = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-screen h-screen bg-[var(--background-color)] flex flex-col items-center">

            <h1
                className="text-6xl font-bold text-[var(--text-color)] my-16">
                <span className="text-[var(--primary-color)]">CoE</span> Rooms
            </h1>

            <Link to="/sign-in">
                <Button>
                    Sign in
                </Button>
            </Link>

            <p className="mt-8 text-[var(--text-color)]">
                You don’t have an account?{' '}
                <Link to="/sign-up" className="text-[var(--primary-color)] cursor-pointer underline">Sign up</Link>
            </p>

            <img className="mt-16" src={ImgWelcome} alt="Welcome Illustration" />

            <footer className="mt-16 text-center text-[#140B0C] opacity-40">
                <p>Developed by</p>
                <p>BOSS OHM LEE EARTH ICE</p>
            </footer>
        </motion.div>
    );
};

export default HomePage;
