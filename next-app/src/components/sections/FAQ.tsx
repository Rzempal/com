'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'] as const;

export function FAQ() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative z-10 py-24 px-6 bg-transparent">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {t('heading')}
          </h2>
          <p className="text-zinc-500 font-mono text-sm">
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
                      ? 'border-emerald-500/50 bg-zinc-900/80'
                      : 'border-white/10 bg-zinc-900/50 hover:border-emerald-500/30 hover:bg-zinc-900/70'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-sm md:text-base text-white font-medium">
                      {t(`items.${key}.question`)}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-emerald-500 text-xl shrink-0"
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
                      <div className="px-6 py-4 text-sm text-zinc-400 leading-relaxed border-x border-b border-white/10 rounded-b-lg bg-zinc-900/30">
                        {t(`items.${key}.answer`)}
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
