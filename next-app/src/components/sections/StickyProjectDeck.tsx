'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

// === Project Data ===
interface Project {
  id: string;
  translationKey: string;
  category: string;
  images: string[];
  color: string;
  accentClass: string;
  tags: string[];
  ctaUrl?: string;
  isLocked?: boolean;
}

const projects: Project[] = [
  {
    id: 'robotyka',
    translationKey: 'robotyka',
    category: 'ROBOTICS',
    images: [
      '/images/robotyka/P47-1.jpg',
      '/images/robotyka/P47-2.jpg',
      '/images/robotyka/P47-3.jpg',
    ],
    color: '#10b981',
    accentClass: 'bg-emerald-500',
    tags: ['TECNOMATIX', 'KUKA', 'SYMULACJA'],
    ctaUrl: 'https://robotyka.michalrapala.com/projekty.html',
  },
  {
    id: 'apps',
    translationKey: 'apps',
    category: 'WEB APPS',
    images: ['/images/global/logo_app.png'],
    color: '#06b6d4',
    accentClass: 'bg-cyan-500',
    tags: ['PYTHON', 'HTML', 'JS'],
    ctaUrl: 'https://michalrapala.app/',
  },
  {
    id: 'www',
    translationKey: 'www',
    category: 'WEB DEV',
    images: ['/images/global/logo_web_ai.png'],
    color: '#a855f7',
    accentClass: 'bg-purple-500',
    tags: ['NEXT.JS', 'REACT', 'NANOBANANA'],
  },
  {
    id: 'mobile',
    translationKey: 'mobile',
    category: 'MOBILE APP',
    images: ['/images/app/Karton-AI.jpg'],
    color: '#f59e0b',
    accentClass: 'bg-amber-500',
    tags: ['FLUTTER', 'ANDROID'],
    ctaUrl: 'https://pudelkonaleki.michalrapala.app/',
  },
  {
    id: 'locked',
    translationKey: 'locked',
    category: 'COMING SOON',
    images: [],
    color: '#71717a',
    accentClass: 'bg-zinc-500',
    tags: ['IDEA', 'CONTACT', 'IMPLEMENTATION'],
    isLocked: true,
  },
];

// === Image Slider Component ===
function ImageSlider({ images, alt, color }: { images: string[]; alt: string; color: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={alt}
            fill
            className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
          />
        </motion.div>
      </AnimatePresence>

      {/* Slider indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i === currentIndex ? color : 'rgba(255,255,255,0.3)',
                transform: i === currentIndex ? 'scale(1.2)' : 'scale(1)',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// === Locked Card Overlay ===
function LockedOverlay({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center z-20">
      {/* Scan lines effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
        }}
      />

      {/* Glassmorphism container */}
      <div className="relative bg-zinc-900/60 backdrop-blur-md rounded-xl p-8 border border-white/10 flex flex-col items-center gap-4">
        {/* Lock icon */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center border-2"
          style={{ borderColor: color, backgroundColor: `${color}20` }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        <span className="font-mono text-xs uppercase tracking-widest" style={{ color }}>
          Locked Content
        </span>
      </div>

      {/* Corner brackets */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/20" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/20" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/20" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/20" />
    </div>
  );
}

// === CTA Button Component ===
function CTAButton({ url, label, color }: { url: string; label: string; color: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-2 py-1 rounded font-mono text-[10px] uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap"
      style={{
        backgroundColor: `${color}20`,
        borderColor: `${color}50`,
        color: color,
        border: '1px solid',
      }}
    >
      {label}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    </a>
  );
}

// === Single Card Component ===
interface CardProps {
  project: Project;
  index: number;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

function Card({ project, index, progress, range, targetScale }: CardProps) {
  const t = useTranslations(`projects.${project.translationKey}`);
  const scale = useTransform(progress, range, [1, targetScale]);
  const filter = useTransform(progress, range, ['brightness(1)', 'brightness(0.5)']);

  return (
    <div
      className="h-screen flex items-center justify-center sticky"
      style={{ top: `${96 + index * 16}px` }}
    >
      <motion.div
        style={{ scale, filter }}
        className="relative w-full max-w-2xl h-[500px] rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-2xl origin-top"
      >
        {/* Top accent bar */}
        <div className={`absolute top-0 w-full h-1 ${project.accentClass} opacity-50`} />

        {/* Image area */}
        <div className="h-[55%] relative border-b border-white/5">
          {project.isLocked ? (
            <>
              <div className="absolute inset-0 bg-zinc-800" />
              <LockedOverlay color={project.color} />
            </>
          ) : (
            <ImageSlider images={project.images} alt={t('title')} color={project.color} />
          )}

          {/* Category overlay */}
          <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded border border-white/10 font-mono text-xs text-white z-10">
            {project.category}
          </div>

          {/* Index badge */}
          <div
            className="absolute bottom-4 right-4 font-mono text-[10px] border px-1 py-0.5 rounded z-10"
            style={{ borderColor: `${project.color}80`, color: project.color }}
          >
            {String(index + 1).padStart(2, '0')}
          </div>
        </div>

        {/* Content area */}
        <div className="p-6 bg-zinc-900/80 backdrop-blur-xl h-[45%] flex flex-col justify-between">
          <div>
            {/* Headline + CTA row */}
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-lg font-semibold" style={{ color: project.color }}>
                {t('headline')}
              </h3>
              {project.ctaUrl && <CTAButton url={project.ctaUrl} label={t('cta')} color={project.color} />}
            </div>
            <p className="text-sm text-zinc-400 font-light leading-relaxed line-clamp-3">
              {t('description')}
            </p>
          </div>

          {/* Tech tags */}
          <div
            className="flex flex-wrap gap-2 font-mono text-[10px]"
            style={{ color: project.color }}
          >
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded border uppercase tracking-wider"
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
  const t = useTranslations('pcb');
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
          {'// SELECTED_WORKS_ARCHIVE'}
          <br />
          {'// SCROLL_TO_INSPECT_FILES'}
        </p>
      </div>

      {/* Stacking cards */}
      {projects.map((project, i) => {
        const targetScale = 1 - (projects.length - i) * 0.04;
        return (
          <Card
            key={project.id}
            index={i}
            project={project}
            progress={scrollYProgress}
            range={[i * 0.18, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </section>
  );
}
