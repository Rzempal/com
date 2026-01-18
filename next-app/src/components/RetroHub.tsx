"use client";

import { useState } from "react";
import { ElectricTrace } from "./ui/ElectricTrace";
import { RetroWindow } from "./ui/RetroWindow";
import { FaFolderClosed } from "react-icons/fa6";
import { projects, projectsPL } from "@/data/projects";

// Colors for the retro aesthetic
const colors = ["#bf00ff", "#00ffff", "#ff00ff", "#ff9e00"];

export default function RetroHub() {
    const [activeTrace, setActiveTrace] = useState<string | null>(null);
    const [openWindow, setOpenWindow] = useState<string | null>(null);

    const projectKeys = Object.keys(projects);

    const handleIconClick = (id: string) => {
        if (openWindow === id) return;
        setOpenWindow(null); // Close others
        setActiveTrace(id);
    };

    const handleTraceComplete = (id: string) => {
        setActiveTrace(null);
        setOpenWindow(id);
    };

    // Calculate icon positions (Desktop Grid Layout)
    const getIconPosition = (index: number) => {
        const col = Math.floor(index / 4);
        const row = index % 4;
        return { x: 10 + col * 15, y: 15 + row * 20 };
    };

    return (
        <section className="relative w-full h-screen bg-[#000000] overflow-hidden flex items-center justify-center snap-start" id="retroHub">
            {/* Background Grid - Vaporwave Purple */}
            <div className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(rgba(191, 0, 255, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(191, 0, 255, 0.4) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            ></div>

            {/* SVG Layer for Traces */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                {projectKeys.map((key, index) => {
                    const pos = getIconPosition(index);
                    // Trace from Icon (pos.x, pos.y) to Center (50, 50)
                    const startX = pos.x + 4;
                    const startY = pos.y + 5;
                    const controlX = (startX + 50) / 2;
                    const controlY = startY;

                    const path = `M ${startX} ${startY} Q ${controlX} ${controlY} 50 50`;

                    return (
                        <ElectricTrace
                            key={`trace-${key}`}
                            path={path}
                            trigger={activeTrace === key}
                            color={colors[index % colors.length]}
                            onComplete={() => handleTraceComplete(key)}
                        />
                    );
                })}
            </svg>

            {/* Desktop Icons */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                {projectKeys.map((key, index) => {
                    const trans = projectsPL[key];
                    const pos = getIconPosition(index);
                    const color = colors[index % colors.length];

                    return (
                        <div
                            key={key}
                            className="absolute flex flex-col items-center gap-2 pointer-events-auto cursor-pointer group w-24"
                            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                            onClick={() => handleIconClick(key)}
                        >
                            <div className="w-16 h-16 flex items-center justify-center bg-win-gray win95-shadow-out active:win95-shadow-in transition-transform group-hover:scale-105">
                                <FaFolderClosed size={32} color={color} />
                            </div>
                            <span className="bg-win-blue text-white text-xs px-1 font-[var(--font-share-tech-mono)] win95-shadow-in text-center break-words w-full">
                                {trans.tabName.replace('_', '')}
                            </span>
                        </div>
                    );
                })}

                {/* Helper text */}
                <div className="absolute bottom-10 left-10 text-[var(--accent)] text-xs font-mono opacity-50">
                    SYSTEM_READY // SELECT_MODULE
                </div>
            </div>

            {/* Windows Layer */}
            <div className="relative z-50">
                {projectKeys.map((key, index) => {
                    const trans = projectsPL[key];
                    const color = index % 2 === 0 ? "magenta" : "cyan"; // Alternating window colors

                    return (
                        <RetroWindow
                            key={`window-${key}`}
                            title={`C:\\${trans.tabName}EXE`}
                            isOpen={openWindow === key}
                            onClose={() => setOpenWindow(null)}
                            color={color}
                        >
                            <div className="text-center">
                                <h2 className="text-xl font-bold mb-4" style={{ color: color === 'magenta' ? 'var(--pink)' : 'var(--accent)' }}>
                                    {trans.title}
                                </h2>
                                <h3 className="text-sm font-bold mb-4 text-white opacity-80 uppercase tracking-widest">
                                    {trans.lead}
                                </h3>
                                <p className="mb-6 opacity-80 leading-relaxed text-sm">
                                    {trans.description}
                                </p>
                                <a
                                    href={projects[key].ctaUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-win-gray text-black px-4 py-2 font-bold win95-shadow-out active:win95-shadow-in hover:bg-white transition-colors text-sm"
                                >
                                    {trans.ctaLabel} &gt;&gt;
                                </a>
                            </div>
                        </RetroWindow>
                    );
                })}
            </div>

        </section>
    );
}
