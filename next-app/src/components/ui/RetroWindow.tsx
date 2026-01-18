"use client";

import { ReactNode } from "react";
import { FaTimes } from "react-icons/fa";

interface RetroWindowProps {
    title: string;
    children: ReactNode;
    onClose: () => void;
    isOpen: boolean;
    className?: string;
    color?: string; // e.g. "magenta", "cyan" for border accents inside
}

export const RetroWindow = ({ title, children, onClose, isOpen, className = "", color = "cyan" }: RetroWindowProps) => {
    if (!isOpen) return null;

    return (
        <div className={`fixed z-50 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[90vw] max-w-[600px] bg-win-gray p-[4px] win95-shadow-out ${className}`}>
            {/* Title Bar */}
            <div className="bg-win-blue text-white flex justify-between items-center px-1 py-[2px] mb-1 select-none">
                <span className="font-bold text-sm tracking-tight px-1 font-[var(--font-share-tech-mono)]">{title}</span>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                    className="bg-win-gray text-black w-5 h-5 flex items-center justify-center win95-shadow-out active:win95-shadow-in text-xs font-bold leading-none"
                >
                    <FaTimes size={12} />
                </button>
            </div>

            {/* Content Area */}
            <div className="bg-black text-[var(--accent)] p-4 win95-shadow-in min-h-[300px] font-mono relative overflow-hidden">
                {/* Inner Grid/Glow Effect */}
                <div className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(${color === 'magenta' ? '#ff00ff' : '#00ffff'} 1px, transparent 1px), linear-gradient(90deg, ${color === 'magenta' ? '#ff00ff' : '#00ffff'} 1px, transparent 1px)`,
                        backgroundSize: '20px 20px'
                    }}
                ></div>

                <div className="relative z-10 w-full h-full">
                    {children}
                </div>
            </div>
        </div>
    );
};
