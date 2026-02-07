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

// === Image Slider Component with Parallax Zoom ===
interface ImageSliderProps {
  images: string[];
  alt: string;
  color: string;
  imageScale?: MotionValue<number>;
}

function ImageSlider({ images, alt, color, imageScale }: ImageSliderProps) {
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
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
          style={{ scale: imageScale }}
        >
          <Image
            src={images[currentIndex]}
            alt={alt}
            fill
            className="object-cover"
          />
          {/* Vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
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
  
  // Card scaling based on section progress (when next card pushes it)
  const scale = useTransform(progress, range, [1, targetScale]);
  const filter = useTransform(progress, range, ['brightness(1)', 'brightness(0.5)']);

  return (
    <div
      className="h-screen flex items-center justify-center sticky"
      style={{ top: `calc(10vh + ${index * 25}px)` }}
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
            <ImageSlider images={project.images} alt={t('headline')} color={project.color} />
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
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionT = useTranslations('projectsSection');
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="projects" ref={containerRef} className="relative z-10 bg-transparent mt-32">
      {/* Section header */}
      <div className="mb-16 md:mb-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {sectionT('heading')} <span className="text-cyan-500">{sectionT('headingAccent')}</span>
        </h2>
        <p className="text-zinc-500 font-mono text-sm">
          {'// SELECTED_WORKS_ARCHIVE'}
          <br />
          {'// SCROLL_TO_INSPECT_FILES'}
        </p>
      </div>

      {/* Desktop: Sticky section with scroll-reveal cards + horizontal wheel scroll */}
      <div className="hidden md:block">
        <div className="sticky top-0 min-h-screen flex flex-col justify-center py-16">
          {/* Scrollable cards container */}
          <div 
            className="relative overflow-x-auto scrollbar-hide px-6"
            onWheel={(e) => {
              // Convert vertical scroll to horizontal
              if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.currentTarget.scrollLeft += e.deltaY;
              }
            }}
          >
            <div className="flex items-stretch gap-5 pb-4" style={{ width: 'max-content', paddingLeft: 'calc(50vw - 140px)', paddingRight: 'calc(50vw - 140px)' }}>
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: i * 0.15,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ 
                    y: -16, 
                    scale: 1.03,
                    transition: { duration: 0.25 }
                  }}
                  className="cursor-pointer flex-shrink-0"
                >
                  <DesktopCard project={project} index={i} />
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-8 text-zinc-600 text-xs font-mono"
          >
            {'// SCROLL_HORIZONTALLY_TO_EXPLORE'}
          </motion.div>
        </div>
      </div>

      {/* Mobile: Vertical sticky stack */}
      <div className="md:hidden">
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
      </div>
    </section>
  );
}

// === Desktop Card (smaller, for horizontal layout) ===
function DesktopCard({ project, index }: { project: Project; index: number }) {
  const t = useTranslations(`projects.${project.translationKey}`);
  
  return (
    <div 
      className="w-[280px] h-[380px] rounded-xl overflow-hidden bg-zinc-900/95 backdrop-blur-sm border border-white/10 shadow-2xl"
      style={{ 
        boxShadow: `0 25px 50px -12px ${project.color}20, 0 0 0 1px ${project.color}10`
      }}
    >
      {/* Top accent bar */}
      <div className={`w-full h-1 ${project.accentClass} opacity-60`} />

      {/* Image area */}
      <div className="h-[50%] relative border-b border-white/5">
        {project.isLocked ? (
          <>
            <div className="absolute inset-0 bg-zinc-800" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center border-2" style={{ borderColor: project.color, backgroundColor: `${project.color}20` }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={project.color} strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
            </div>
          </>
        ) : (
          <Image src={project.images[0]} alt={t('headline')} fill className="object-cover" />
        )}
        
        {/* Category badge */}
        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur px-2 py-0.5 rounded border border-white/10 font-mono text-[10px] text-white">
          {project.category}
        </div>
        
        {/* Index */}
        <div className="absolute bottom-3 right-3 font-mono text-[10px] px-1 py-0.5 rounded border" style={{ borderColor: `${project.color}60`, color: project.color }}>
          {String(index + 1).padStart(2, '0')}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 h-[50%] flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-semibold mb-1" style={{ color: project.color }}>{t('headline')}</h3>
          <p className="text-xs text-zinc-400 line-clamp-2">{t('description')}</p>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {project.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="px-1.5 py-0.5 rounded text-[9px] font-mono uppercase" style={{ backgroundColor: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}>
              {tag}
            </span>
          ))}
        </div>
        
        {project.ctaUrl && (
          <a href={project.ctaUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-[10px] font-mono uppercase" style={{ color: project.color }}>
            {t('cta')}
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
