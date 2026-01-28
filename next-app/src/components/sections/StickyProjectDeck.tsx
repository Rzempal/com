'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import Image from 'next/image';

// === Project Data ===
const projects = [
  {
    id: 'mclaren-p47',
    title: 'McLaren P47',
    category: 'ROBOTICS',
    description: 'System sterowania robotem inspekcyjnym. Integracja IoT i wideo w czasie rzeczywistym.',
    img: '/images/robotyka/P47-1.jpg',
    color: '#10b981',
    accentClass: 'bg-emerald-500',
    tags: ['NODE.JS', 'IOT', 'OPENCV'],
  },
  {
    id: 'karton-ai',
    title: 'Karton AI',
    category: 'MOBILE APP',
    description: 'Optymalizacja ścieżek magazynowych z asystentem AI i generowaniem tras.',
    img: '/images/app/Karton-AI.jpg',
    color: '#06b6d4',
    accentClass: 'bg-cyan-500',
    tags: ['REACT NATIVE', 'GPT-4'],
  },
  {
    id: 'portfolio-v2',
    title: 'Portfolio V2',
    category: 'WEB DEV',
    description: 'Szwajcarski design, minimalizm i animacje Framer Motion. Tech-Noir aesthetic.',
    img: '/images/main/main_hero_background.png',
    color: '#a855f7',
    accentClass: 'bg-purple-500',
    tags: ['NEXT.JS', 'FRAMER MOTION'],
  },
];

// === Single Card Component ===
interface CardProps {
  project: (typeof projects)[0];
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

function Card({ project, index, progress, range, targetScale }: CardProps) {
  // Framer Motion transforms based on scroll progress
  const scale = useTransform(progress, range, [1, targetScale]);
  const filter = useTransform(progress, range, ['brightness(1)', 'brightness(0.5)']);

  return (
    <div
      className="h-screen flex items-center justify-center sticky"
      style={{ top: `${96 + index * 16}px` }}
    >
      <motion.div
        style={{ scale, filter }}
        className="relative w-full max-w-2xl h-[450px] rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-2xl origin-top"
      >
        {/* Top accent bar */}
        <div className={`absolute top-0 w-full h-1 ${project.accentClass} opacity-50`} />

        {/* Image area */}
        <div className="h-[60%] relative border-b border-white/5">
          <Image
            src={project.img}
            alt={project.title}
            fill
            className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
          />
          {/* Category overlay */}
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded border border-white/10 font-mono text-xs text-white">
            {project.category}
          </div>
          {/* Index badge */}
          <div
            className="absolute bottom-4 right-4 font-mono text-[10px] border px-1 py-0.5 rounded"
            style={{ borderColor: `${project.color}80`, color: project.color }}
          >
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>

        {/* Content area */}
        <div className="p-8 bg-zinc-900/80 backdrop-blur-xl h-[40%] flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
            <p className="text-sm text-zinc-400 font-light leading-relaxed">{project.description}</p>
          </div>

          {/* Tech tags */}
          <div className="flex gap-2 font-mono text-[10px]" style={{ color: project.color }}>
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded border"
                style={{
                  backgroundColor: `${project.color}10`,
                  borderColor: `${project.color}30`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// === Main Section ===
export function StickyProjectDeck() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section ref={containerRef} className="relative z-10 bg-transparent mt-32">
      {/* Section header */}
      <div className="mb-24 px-6 max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-4">
          Wybrane <span className="text-cyan-500">Projekty</span>
        </h2>
        <p className="text-zinc-500 font-mono text-sm">
          // SELECTED_WORKS_ARCHIVE
          <br />
          // SCROLL_TO_INSPECT_FILES
        </p>
      </div>

      {/* Stacking cards */}
      {projects.map((project, i) => {
        const targetScale = 1 - (projects.length - i) * 0.05;
        return (
          <Card
            key={project.id}
            index={i}
            project={project}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </section>
  );
}
