'use client';

import { motion } from 'framer-motion';

const contacts = [
  {
    label: 'Email',
    value: 'kontakt@michalrapala.com',
    href: 'mailto:kontakt@michalrapala.com',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'Rzempal',
    href: 'https://github.com/Rzempal',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'michal-rapala',
    href: 'https://www.linkedin.com/in/michal-rapala',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export function Contact() {
  return (
    <section className="relative z-10 py-32 px-6 bg-transparent">
      <div className="max-w-2xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Kontakt
          </h2>
          <p className="text-zinc-500 font-mono text-sm mb-12">
            {'// OPEN_FOR_COLLABORATION'}
          </p>
        </motion.div>

        {/* Contact links */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
          {contacts.map((contact, i) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group flex items-center gap-3 px-5 py-3 rounded-lg border border-white/10 bg-zinc-900/50 hover:border-cyan-500/50 hover:bg-zinc-900/80 transition-colors"
            >
              <span className="text-zinc-500 group-hover:text-cyan-500 transition-colors">
                {contact.icon}
              </span>
              <div className="text-left">
                <div className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">
                  {contact.label}
                </div>
                <div className="text-sm text-white group-hover:text-cyan-400 transition-colors">
                  {contact.value}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
