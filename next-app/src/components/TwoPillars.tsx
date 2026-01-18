"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import styles from "./TwoPillars.module.css";
import Image from "next/image";

interface TwoPillarsProps {
    id?: string;
}

export default function TwoPillars({ id }: TwoPillarsProps) {
    return (
        <section className={styles.twoPillarsSection} id={id}>
            <div className={styles.twoPillarsGrid}>

                {/* Left Pillar: ENG:// SYMULACJA */}
                <article className={`${styles.pillar} ${styles.pillarEng}`}>
                    <header className={styles.pillarHeader}>
                        <span className={styles.pillarDot}></span>
                        <span className={`${styles.pillarPrefix} ${styles.pillarPrefixEng}`}>ENG://</span>
                        <span className={styles.pillarTitle}>SYMULACJA</span>
                    </header>

                    <div className={styles.pillarMedia}>
                        {/* Using placeholder or local image if available. Since assets were cleared, using standard next/image would fail without file. Using text fallback/remote for now or placehold.co */}
                        <img
                            src="https://placehold.co/400x250/1e293b/48d2e7?text=Robotyka"
                            alt="Robotyka"
                        />
                    </div>

                    <h3 className={styles.pillarHeadlineH3}>
                        Od ponad dekady pracuję jako inżynier robotyki w przemyśle motoryzacyjnym.
                    </h3>

                    <p className={styles.pillarDesc}>
                        &gt; Zaawansowane usługi symulacji procesów produkcyjnych oraz programowanie offline robotów przemysłowych (KUKA, Fanuc, ABB). Optymalizuję przepływy pracy i zwiększam efektywność produkcji.
                    </p>

                    <Link href="https://robotyka.michalrapala.com" target="_blank" className={styles.pillarLink}>
                        <span>Dowiedz się więcej</span>
                        <FaArrowRight />
                    </Link>
                </article>

                {/* Right Pillar: DEV:// PROGRAMOWANIE */}
                <article className={`${styles.pillar} ${styles.pillarDev}`}>
                    <header className={styles.pillarHeader}>
                        <span className={`${styles.pillarDot} ${styles.pillarDotYellow}`}></span>
                        <span className={`${styles.pillarPrefix} ${styles.pillarPrefixDev}`}>DEV://</span>
                        <span className={`${styles.pillarTitle} ${styles.pillarTitleDev}`}>PROGRAMOWANIE</span>
                    </header>

                    <div className={styles.pillarMedia}>
                        {/* Headline Text used as media in design */}
                        <div className={styles.pillarHeadlineText}>
                            <span className="block">
                                <span className={styles.wordCyan}>KOD</span> JEST
                            </span>
                            <span className="block">OSTATNIM</span>
                            <span className="block">
                                KROKIEM<span className={styles.dotMagenta}>.</span>
                            </span>
                        </div>
                    </div>

                    <h3 className={styles.pillarHeadlineH3}>
                        Współzałożyciel ResztaToKod.pl
                    </h3>

                    <p className={styles.pillarDesc}>
                        &gt; Technologia przestała być barierą. Stała się dźwignią dla tych, którzy mają plan.
                    </p>

                    <div className={styles.rtkCtaContainer}>
                        <Link href="https://resztatokod.pl" target="_blank" className={styles.rtkLogoLink}>
                            <div className={styles.rtkLogoWrapper}>
                                <svg viewBox="0 0 370 60" className={styles.rtkLogoLong}>
                                    {/* SVG Content ported from index.html */}
                                    <circle cx="5" cy="15" r="2" className={`${styles.rtkLongNode} rtk-n1`} />
                                    <circle cx="20" cy="5" r="2" className={`${styles.rtkLongNode} rtk-n2`} />
                                    <circle cx="10" cy="30" r="2" className={`${styles.rtkLongNode} rtk-n3`} />
                                    <line x1="5" y1="15" x2="20" y2="5" className={`${styles.rtkLongLink} rtk-l1`} />
                                    <line x1="20" y1="5" x2="10" y2="30" className={`${styles.rtkLongLink} rtk-l2`} />
                                    <line x1="5" y1="15" x2="10" y2="30" className={`${styles.rtkLongLink} rtk-l3`} />
                                    <path d="M 10 30 L 40 30" className={styles.rtkLongPath} />
                                    <text x="48" y="38" className={styles.rtkLongCmd}>&gt;_</text>
                                    <text x="86" y="38" className={styles.rtkLongUrl}>cd resztatokod.pl</text>
                                </svg>
                            </div>
                        </Link>
                    </div>
                </article>

            </div>
        </section>
    );
}
