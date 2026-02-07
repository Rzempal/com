'use client';

import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'] as const;

function parseAnswer(text: string): ReactNode[] {
  const parts = text.split(/\*\*/);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-cyan-400">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export function FAQ() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative z-10 py-24 px-6 bg-transparent">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            {t('heading')}
          </h2>
          <p className="text-text-tertiary font-mono text-sm">
            {t('subheading')}
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqKeys.map((key, i) => {
            const isOpen = openIndex === i;

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <button
                  onClick={() => toggle(i)}
                  className={`w-full text-left px-6 py-4 rounded-lg border transition-colors ${
                    isOpen
                      ? 'border-cyan-500/50 bg-glass-bg'
                      : 'border-border-subtle bg-glass-bg-light hover:border-cyan-500/30 hover:bg-glass-bg'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm md:text-base text-foreground font-medium">
                      {t(`items.${key}.question`)}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-cyan-500 text-xl shrink-0"
                    >
                      +
                    </motion.span>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      {/* Gradient border wrapper */}
                      <div className="mt-1 rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-800 p-[1px]">
                        <div className="rounded-xl bg-glass-bg px-6 py-5">
                          <div className="flex gap-4">
                            {/* !! marker */}
                            <span className="shrink-0 text-lg font-bold bg-gradient-to-b from-cyan-400 to-cyan-600 bg-clip-text text-transparent select-none">
                              !!
                            </span>
                            {/* Answer text */}
                            <p className="text-sm md:text-base text-text-muted leading-relaxed">
                              {parseAnswer(t(`items.${key}.answer`))}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
