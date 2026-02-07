'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { projectData, FILTER_GROUPS } from '@/data/robotyka-projects';
import { ProjectCard } from './ProjectCard';

export function ProjectFilter() {
  const t = useTranslations('robotyka.projects');
  const [activeFilter, setActiveFilter] = useState('all');

  const availableTags = useMemo(() => {
    const allTags = new Set<string>();
    projectData.forEach((p) => p.tags.forEach((tag) => allTags.add(tag)));
    return allTags;
  }, []);

  const filterByGroup = (group: readonly string[]) =>
    group.filter((tag) => availableTags.has(tag)).sort();

  const positionTags = filterByGroup(FILTER_GROUPS.position);
  const stdSwTags = filterByGroup(FILTER_GROUPS.standardSoftware);
  const robTechTags = filterByGroup(FILTER_GROUPS.robotsTechnology);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projectData;
    return projectData.filter((p) => p.tags.includes(activeFilter));
  }, [activeFilter]);

  const handleFilter = (tag: string) => {
    setActiveFilter(tag);
  };

  return (
    <div>
      {/* Filters */}
      <div className="space-y-4 mb-8">
        {/* All button */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleFilter('all')}
            className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded border transition-colors ${
              activeFilter === 'all'
                ? 'bg-emerald-neon/20 text-emerald-neon border-emerald-neon/50'
                : 'text-text-muted border-glass-border hover:text-foreground hover:border-text-muted'
            }`}
          >
            {t('filterAll')}
          </button>
        </div>

        {/* Position */}
        <FilterGroup
          label={t('filterGroupPosition')}
          tags={positionTags}
          activeFilter={activeFilter}
          onFilter={handleFilter}
        />

        {/* Standard & Software */}
        <FilterGroup
          label={t('filterGroupStandardSoftware')}
          tags={stdSwTags}
          activeFilter={activeFilter}
          onFilter={handleFilter}
        />

        {/* Robots & Technology */}
        <FilterGroup
          label={t('filterGroupRobotsTechnology')}
          tags={robTechTags}
          activeFilter={activeFilter}
          onFilter={handleFilter}
        />
      </div>

      {/* Project Cards Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {filteredProjects.map((project, i) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function FilterGroup({
  label,
  tags,
  activeFilter,
  onFilter,
}: {
  label: string;
  tags: string[];
  activeFilter: string;
  onFilter: (tag: string) => void;
}) {
  if (tags.length === 0) return null;

  return (
    <div>
      <span className="block text-[10px] font-mono uppercase tracking-widest text-emerald-neon mb-2 pb-1 border-b border-glass-border">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onFilter(tag)}
            className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded border transition-all ${
              activeFilter === tag
                ? 'bg-emerald-neon/20 text-emerald-neon border-emerald-neon/50'
                : 'text-text-muted border-glass-border hover:text-foreground hover:border-text-muted hover:-translate-y-0.5'
            }`}
          >
            {tag.replace(/_/g, ' ')}
          </button>
        ))}
      </div>
    </div>
  );
}
