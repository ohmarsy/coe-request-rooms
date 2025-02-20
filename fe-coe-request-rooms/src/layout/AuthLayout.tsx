import { motion } from "framer-motion";

import ImageAuth from '../assets/image-auth.png'
export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            <div className="w-1/3 bg-[var(--primary-color)] text-white flex flex-col items-center  p-10">
                <motion.div 
                initial={{x: -100 , opacity: 0}}
                animate={{ x: 0 , opacity: 1}}
                transition={{ duration: 0.8 }}
                className="mt-8 text-m">
                    <p> CoE Rooms</p>
                    <p className="text-3xl leading-relaxed mt-4">

                        Your workspace awaits <br />
                        Where Ideas bloom <br />
                        and comfort meets <br />
                        productivity.
                    </p>
                </motion.div>
            
            <motion.img 
            initial={{x: -100 , opacity: 0}}
            animate={{ x: 0 , opacity: 1}}
            transition={{ duration: 1 }}
            src={ImageAuth}></motion.img>

            </div>
            <div className="w-2/3 flex items-center justify-center">{children}</div>
        </div>
    );
}
