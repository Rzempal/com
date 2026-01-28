"use client";

import { motion } from "framer-motion";

/**
 * PCBBackground - Tech-Noir style PCB background
 *
 * Features:
 * - Noise texture overlay
 * - Vignette and grid pattern
 * - Energy beams with Framer Motion
 * - Animated pads at junction points
 */
export function PCBBackground() {
	// Wide routing paths for visual interest
	const leftPath = "M50 0 V 10 L 5 20 V 45 L 25 45 V 48";
	const rightPath = "M50 0 V 10 L 95 20 V 45 L 75 45 V 48";

	return (
		<div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
			{/* Warstwa 1: Tekstura Szumu (Noise) */}
			<div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.svg')] mix-blend-overlay" />

			{/* Warstwa 2: Winieta i Grid */}
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_90%)]" />
			<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />

			{/* Warstwa 3: SVG Circuit */}
			<svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
				{/* --- STATIC TRACES (Tło ścieżek) --- */}
				<path d={leftPath} className="stroke-zinc-800/40 fill-none" strokeWidth="0.5" />
				<path d={rightPath} className="stroke-zinc-800/40 fill-none" strokeWidth="0.5" />

				{/* --- ENERGY BEAMS (Aktywny prąd) --- */}
				{/* Emerald Beam (Lewa strona) */}
				<motion.path
					d={leftPath}
					className="stroke-emerald-500 fill-none"
					strokeWidth="1.2"
					initial={{ pathLength: 0, opacity: 0 }}
					animate={{
						pathLength: [0, 0.3, 0],
						opacity: [0, 1, 0],
					}}
					transition={{
						duration: 4,
						repeat: Infinity,
						ease: "linear",
						times: [0, 0.5, 1],
					}}
					style={{ filter: "drop-shadow(0 0 4px #10b981)" }}
				/>

				{/* Cyan Beam (Prawa strona) - Opóźniona */}
				<motion.path
					d={rightPath}
					className="stroke-cyan-400 fill-none"
					strokeWidth="1.2"
					initial={{ pathLength: 0, opacity: 0 }}
					animate={{
						pathLength: [0, 0.3, 0],
						opacity: [0, 1, 0],
					}}
					transition={{
						duration: 4,
						repeat: Infinity,
						ease: "linear",
						delay: 2,
					}}
					style={{ filter: "drop-shadow(0 0 4px #06b6d4)" }}
				/>

				{/* --- PADS (Kropki lutownicze) --- */}
				<circle
					cx="50"
					cy="10"
					r="0.6"
					className="fill-zinc-900 stroke-zinc-700"
					strokeWidth="0.5"
				/>

				<circle
					cx="5"
					cy="20"
					r="0.6"
					className="fill-zinc-900 stroke-emerald-500/50"
					strokeWidth="0.5">
					<animate attributeName="opacity" values="0.5;1;0.5" dur="4s" repeatCount="indefinite" />
				</circle>

				<circle
					cx="95"
					cy="20"
					r="0.6"
					className="fill-zinc-900 stroke-cyan-500/50"
					strokeWidth="0.5">
					<animate
						attributeName="opacity"
						values="0.5;1;0.5"
						dur="4s"
						repeatCount="indefinite"
						begin="2s"
					/>
				</circle>

				<circle
					cx="25"
					cy="45"
					r="0.6"
					className="fill-zinc-900 stroke-emerald-500/50"
					strokeWidth="0.5">
					<animate
						attributeName="opacity"
						values="0.5;1;0.5"
						dur="4s"
						repeatCount="indefinite"
						begin="1s"
					/>
				</circle>

				<circle
					cx="75"
					cy="45"
					r="0.6"
					className="fill-zinc-900 stroke-cyan-500/50"
					strokeWidth="0.5">
					<animate
						attributeName="opacity"
						values="0.5;1;0.5"
						dur="4s"
						repeatCount="indefinite"
						begin="3s"
					/>
				</circle>
			</svg>
		</div>
	);
}
