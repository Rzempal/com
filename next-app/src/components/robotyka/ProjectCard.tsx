'use client';

import { useTranslations } from 'next-intl';
import type { RobotykaProject } from '@/data/robotyka-projects';

export function ProjectCard({ project }: { project: RobotykaProject }) {
  const t = useTranslations('robotyka.projects');

  return (
    <div className="group rounded-lg border border-glass-border bg-glass-bg-light p-5 flex flex-col h-full transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0_var(--color-emerald-neon)]">
      {/* Name */}
      <h4 className="text-sm font-bold text-emerald-neon uppercase font-mono mb-1">
        {t(project.nameKey)}
      </h4>

      {/* Date & Company */}
      <p className="text-[10px] font-mono text-text-tertiary mb-3 pb-2 border-b border-glass-border">
        {t(project.dateCompanyKey)}
      </p>

      {/* Details */}
      <div className="space-y-2.5 flex-1">
        <ProjectDetail label={t('cardPositionLabel')} value={t(project.positionKey)} />
        <ProjectDetail label={t('cardStandardSoftwareLabel')} value={t(project.standardSoftwareKey)} />
        <ProjectDetail label={t('cardRobotsTechnologyLabel')} value={t(project.robotsTechnologyKey)} />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-glass-border">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-text-tertiary/30 text-text-tertiary uppercase"
          >
            {tag.replace(/_/g, ' ')}
          </span>
        ))}
      </div>
    </div>
  );
}

function ProjectDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="block text-[9px] font-mono font-bold uppercase text-text-tertiary mb-0.5">
        {label}
      </span>
      <span className="text-xs font-mono text-text-muted">{value}</span>
    </div>
  );
}
