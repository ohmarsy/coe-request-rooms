import React, { useState } from 'react'
interface SwitchProps {
    leftname: string
    rightname: string
    onClick_left?: () => void
    onClick_right?: () => void
}
const Switch: React.FC<SwitchProps> = ({ leftname, rightname }) => {
    const [active, setActive] = useState<"leftfunc" | "rigthfunc">("leftfunc");
    return (
        <div className='flex p-4'>
            <div
                className='flex bg-[var(--background-color)] rounded-full border-1 border-gray-200'>
                <button
                    onClick={() => setActive("leftfunc")}
                    className={`px-4 py-2 rounded-l-full text-sm transition ${active === "leftfunc"
                        ? "bg-[var(--primary-color)] text-white"
                        : "text-[var(--text-color)] cursor-pointer" 
                        }`}>
                    {leftname}
                </button>
                <button
                    onClick={() => setActive("rigthfunc")}
                    className={`px-4 py-2 rounded-r-full text-sm  transition ${active === "rigthfunc"
                        ? "bg-[var(--primary-color)] text-white"
                        : "text-[var(--text-color)] cursor-pointer"
                        }`}>
                    {rightname}
                </button>
            </div>
        </div >
    )
}

export default Switch