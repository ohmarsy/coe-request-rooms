import { motion } from "framer-motion";
import ImageAuth from '../assets/image-auth.png'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen px-8 md:px-0 bg-[var(--background-color)]">
            <div className="hidden overflow-hidden md:flex w-1/3 bg-[var(--primary-color)] text-white flex-col items-center justify-center px-4">
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mt-8 text-base">
                    <p> CoE Rooms</p>
                    <p className="text-2xl">

                        Your workspace awaits <br />
                        Where Ideas bloom <br />
                        and comfort meets <br />
                        productivity.
                    </p>
                </motion.div>

                <motion.img
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="w-sm  px-8"
                    src={ImageAuth}></motion.img>

            </div>
            <div className="w-full md:w-2/3">{children}</div>
        </div>
    );
}
