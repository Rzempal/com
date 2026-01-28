'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

// === PillarCard Component ===
interface PillarCardProps {
  title: string;
  desc: string;
  tag: string;
  color: 'emerald' | 'cyan';
  icon: React.ReactNode;
  delay: number;
  href?: string;
  stackItems?: string[];
}

function PillarCard({ title, desc, tag, color, icon, delay, href, stackItems = [] }: PillarCardProps) {
  const isEmerald = color === 'emerald';
  const glowColor = isEmerald ? 'group-hover:border-emerald-500/50' : 'group-hover:border-cyan-500/50';
  const shadowColor = isEmerald
    ? 'group-hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.2)]'
    : 'group-hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.2)]';
  const textColor = isEmerald ? 'group-hover:text-emerald-400' : 'group-hover:text-cyan-400';
  const accentColor = isEmerald ? 'bg-emerald-500' : 'bg-cyan-500';
  const tagTextColor = isEmerald ? 'text-emerald-500' : 'text-cyan-500';

  const CardContent = (
    <>
      {/* Connector Point (Wizualne gniazdo na górze) */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] ${accentColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_10px_currentColor]`}
      />

      <div>
        <div className="flex justify-between items-start mb-8">
          <span className={`font-mono text-[10px] ${tagTextColor} border border-zinc-800 px-2 py-1 rounded bg-black/50 tracking-widest`}>
            {tag}
          </span>
          <div className={`p-2 rounded border border-white/5 bg-white/5 ${textColor} transition-colors`}>
            {icon}
          </div>
        </div>

        <h3 className={`text-3xl font-bold text-white mb-4 ${textColor} transition-colors`}>{title}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed font-light">{desc}</p>
      </div>

      {/* Tech Stack Tags */}
      {stackItems.length > 0 && (
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-2">
          {stackItems.map((item, i) => (
            <span
              key={i}
              className="text-[10px] font-mono px-2 py-1 rounded border border-white/10 bg-white/5 text-zinc-400"
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </>
  );

  const cardClasses = `
    relative group min-h-[350px] flex flex-col justify-between p-8 rounded-xl
    bg-zinc-900/40 backdrop-blur-xl border border-white/5 
    transition-all duration-500 ease-out
    ${glowColor} ${shadowColor}
    hover:-translate-y-2
  `;

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        className={cardClasses}
      >
        {CardContent}
      </motion.a>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className={cardClasses}
    >
      {CardContent}
    </motion.div>
  );
}

// === Icons ===
const EngineeringIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
    />
  </svg>
);

const CodeIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
);

// === Main Section ===
export function TwoPillars() {
  const t = useTranslations('pillars');

  return (
    <section id="pillars" className="relative z-10 py-32">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24">
        {/* gap-24 na desktopie robi miejsce na linie PCB w środku */}
        <PillarCard
          title={t('robotics.headline')}
          desc={t('robotics.description')}
          tag="CORE_01"
          color="emerald"
          delay={0.2}
          href="https://robotyka.michalrapala.com"
          icon={<EngineeringIcon />}
          stackItems={['PCB', 'STM32', 'KUKA', 'ROS']}
        />
        <PillarCard
          title={t('dev.headline1')}
          desc={t('dev.description')}
          tag="CORE_02"
          color="cyan"
          delay={0.4}
          href="https://resztatokod.pl"
          icon={<CodeIcon />}
          stackItems={['NEXT.JS', 'REACT NATIVE', 'OPENAI']}
        />
      </div>
    </section>
  );
}
