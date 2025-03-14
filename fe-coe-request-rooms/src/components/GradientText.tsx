import "./GradientText.css";
import { ReactNode } from "react";

interface GradientTextProps {
    children: ReactNode;
    className?: string;
    colors?: string[];
    animationSpeed?: number;
    showBorder?: boolean;
}

export default function GradientText({
    children,
    className = "",
    colors = ["#0e0725", "#0061ff", "#60efff","#f4e5f0"], // Default colors
    animationSpeed = 8, // Default animation speed in seconds
    showBorder = false, // Default overlay visibility
}: GradientTextProps) {
    const gradientStyle = {
        backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
        animationDuration: `${animationSpeed}s`,
    };

    return (
        <div className={`animated-gradient-text ${className}`}>
            {showBorder && <div className="gradient-overlay" style={gradientStyle}></div>}
            <div className="text-content" style={gradientStyle}>{children}</div>
        </div>
    );
}
