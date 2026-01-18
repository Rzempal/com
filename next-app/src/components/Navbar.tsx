"use client";

import Link from "next/link";
import { FaLinkedin, FaGithub, FaEnvelope, FaArrowLeft } from "react-icons/fa6";
import { useState } from "react";

interface NavbarProps {
    onSidebarToggle?: () => void;
    sidebarOpen?: boolean;
}

export default function Navbar({ onSidebarToggle, sidebarOpen = false }: NavbarProps) {
    const [copied, setCopied] = useState(false);

    const copyEmail = () => {
        navigator.clipboard.writeText("kontakt@michalrapala.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <nav className="cyber-nav">
            <div className="cyber-nav-content">
                {/* Left: Social Links */}
                <div className="cyber-nav-links">
                    <button
                        className="cyber-nav-link lang-toggle"
                        aria-label="Switch Language"
                    >
                        <span className="text-[0.7rem] font-bold">EN</span>
                    </button>
                    <Link
                        href="https://www.linkedin.com/in/michal-rapala"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cyber-nav-link"
                        title="LinkedIn"
                    >
                        <FaLinkedin />
                    </Link>
                    <Link
                        href="https://github.com/Rzempal"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cyber-nav-link"
                        title="GitHub"
                    >
                        <FaGithub />
                    </Link>
                    <button
                        className="cyber-nav-link"
                        title={copied ? "Skopiowano!" : "Kopiuj email"}
                        onClick={copyEmail}
                    >
                        <FaEnvelope />
                    </button>
                </div>

                {/* Right: Sidebar Toggle & Status */}
                <div className="cyber-nav-right">
                    <div className="cyber-nav-status">
                        <span className="status-dot" />
                        <span className="status-text">OTWARTY NA NOWE PROJEKTY</span>
                    </div>
                </div>
            </div>
        </nav>
    );
}
