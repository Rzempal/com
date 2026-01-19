'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Section {
  id: string;
  number: string;
}

const sections: Section[] = [
  { id: 'hero', number: '01' },
  { id: 'pillars', number: '02' },
  { id: 'pcb', number: '03' },
];

export function SectionProgress() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          threshold: 0.5,
          rootMargin: '-10% 0px -10% 0px',
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const activeNumber = sections.find((s) => s.id === activeSection)?.number || '01';

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-6">
        {sections.map(({ id, number }) => {
          const isActive = activeSection === id;

          return (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="group flex items-center gap-3 cursor-pointer"
              aria-label={`Go to section ${number}`}
            >
              {/* Number with dash */}
              <span
                className={`font-mono text-xs tracking-wider transition-colors duration-300 ${
                  isActive ? 'text-emerald-500' : 'text-zinc-600 group-hover:text-zinc-400'
                }`}
              >
                —{number}
              </span>

              {/* Active indicator dot */}
              <motion.div
                className="relative"
                initial={false}
                animate={{
                  scale: isActive ? 1 : 0,
                  opacity: isActive ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-emerald-500 blur-sm" />
              </motion.div>
            </button>
          );
        })}

        {/* Progress line */}
        <div className="absolute left-[14px] top-0 bottom-0 w-px bg-zinc-800 -z-10">
          <motion.div
            className="w-full bg-emerald-500/50"
            style={{
              height: `${((sections.findIndex((s) => s.id === activeSection) + 1) / sections.length) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </nav>

      {/* Mobile floating pill */}
      <div className="fixed bottom-6 right-6 z-50 lg:hidden">
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-14 right-0 mb-2 p-2 rounded-xl bg-zinc-900/90 backdrop-blur-md border border-zinc-800 shadow-xl"
            >
              {sections.map(({ id, number }) => {
                const isActive = activeSection === id;
                return (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg w-full transition-colors ${
                      isActive
                        ? 'bg-emerald-500/10 text-emerald-500'
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                    }`}
                  >
                    <span className="font-mono text-xs">—{number}</span>
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating pill button */}
        <motion.button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-700 shadow-lg"
          whileTap={{ scale: 0.95 }}
        >
          <span className="font-mono text-xs text-emerald-500 tracking-wider">
            —{activeNumber}
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          {/* Glow */}
          <div className="absolute right-[18px] w-1.5 h-1.5 rounded-full bg-emerald-500 blur-sm opacity-50" />
        </motion.button>
      </div>
    </>
  );
}
