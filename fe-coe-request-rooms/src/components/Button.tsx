import React from 'react';

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    size?: 'small' | 'medium' | 'large';
}

const Button: React.FC<ButtonProps> = ({ children, onClick, size = 'medium', className }) => {
    const sizeClasses = {
        small: '--------',
        medium: 'px-16 py-2 text-base',
        large: '-------',
    };

    return (
        <button
            className={`bg-[var(--primary-color)] text-white rounded-lg transition-transform duration-200 hover:scale-105 hover:cursor-pointer ${sizeClasses[size]} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
