"use client";

import { FaChevronDown } from "react-icons/fa6";
import styles from "./Hero.module.css";
import { useEffect, useState } from "react";

interface HeroProps {
    onScrollClick: () => void;
}

export default function Hero({ onScrollClick }: HeroProps) {
    const [subtitle, setSubtitle] = useState("");
    const fullText = "Jack into the digital world where code meets creativity.";

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setSubtitle(fullText.substring(0, index) + "|");
            index++;
            if (index > fullText.length) {
                clearInterval(interval);
                setSubtitle(fullText); // remove cursor at end or keep blinking? legacy had |
            }
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className={styles.heroSection} id="heroSection">
            <div className={styles.heroOverlay}>
                {/* Badge */}
                <div className={styles.gateTag}>
                    <span className={styles.tagEng}>ENGINEER</span>
                    <span className="mx-2 text-white/50">//</span>
                    <span className={styles.tagDev}>DEVELOPER</span>
                </div>

                {/* Title */}
                <h1 className={styles.gateTitle}>
                    <span className={styles.line1}>Michal</span>
                    <span className={`${styles.line2} glitch`} data-text="Rapala">Rapala</span>
                    <span className={styles.line3}>.com</span>
                </h1>

                {/* Subtitle */}
                <p className={styles.gateSubtitle}>
                    {subtitle}
                    <br />
                    <span className={styles.subtitleNote}>v.3.0.5 // NEURAL_LINK_ESTABLISHED</span>
                </p>

                <h2 className={styles.pillarsHeading}>
                    Symulacje robotyczne. Aplikacje. Strony internetowe.
                </h2>

                {/* Scroll Indicator */}
                <div className={styles.scrollIndicator} onClick={onScrollClick}>
                    <span>ZOBACZ, CZYM SIĘ ZAJMUJĘ</span>
                    <FaChevronDown />
                </div>
            </div>
        </section>
    );
}
