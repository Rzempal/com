'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="relative z-10 border-t border-white/5 bg-transparent">
      <div className="max-w-5xl mx-auto px-6 py-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-xs font-mono text-zinc-600 tracking-wider"
        >
          {t('tagline')}
        </motion.p>
      </div>
    </footer>
  );
}
