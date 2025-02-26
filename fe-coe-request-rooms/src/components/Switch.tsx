import React, { useState } from 'react'
interface SwitchProps {
    leftname: string
    rightname: string
    onClick_left: () => void
    onClick_right: () => void
}
const Switch: React.FC<SwitchProps> = ({ leftname, rightname, onClick_left, onClick_right }) => {
    const [active, setActive] = useState<"leftfunc" | "rigthfunc">("leftfunc");
    const handleLeft = () => {
        setActive("leftfunc")
        onClick_left()
    }
    const handleRight = () => {
        setActive("rigthfunc")
        onClick_right()

    }
    return (
        <div className='flex p-4'>
            <div
                className='flex bg-[var(--background-color)] rounded-full border-1 border-gray-200'>
                <button
                    onClick={() => handleLeft()}
                    className={`px-4 py-2 rounded-l-full text-sm transition ${active === "leftfunc"
                        ? "bg-[var(--primary-color)] text-white"
                        : "text-[var(--text-color)] cursor-pointer"
                        }`}>
                    {leftname}
                </button>
                <button
                    onClick={() => handleRight()}
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