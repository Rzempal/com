'use client';

import { useState, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { projectData, FILTER_GROUPS } from '@/data/robotyka-projects';
import { ProjectCard } from './ProjectCard';

const filterGroupKeys = [
  { key: 'position', data: FILTER_GROUPS.position, label: 'filterGroupPosition' },
  { key: 'standard', data: FILTER_GROUPS.standard, label: 'filterGroupStandard' },
  { key: 'software', data: FILTER_GROUPS.software, label: 'filterGroupSoftware' },
  { key: 'robots', data: FILTER_GROUPS.robots, label: 'filterGroupRobots' },
  { key: 'technology', data: FILTER_GROUPS.technology, label: 'filterGroupTechnology' },
] as const;

type ActiveFilters = Record<string, string>;

export function ProjectFilter() {
  const t = useTranslations('robotyka.projects');
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});
  const [openGroup, setOpenGroup] = useState<number | null>(null);

  const availableTags = useMemo(() => {
    const allTags = new Set<string>();
    projectData.forEach((p) => p.tags.forEach((tag) => allTags.add(tag)));
    return allTags;
  }, []);

  const activeTagValues = useMemo(() => Object.values(activeFilters), [activeFilters]);
  const hasAnyFilter = activeTagValues.length > 0;

  const filteredProjects = useMemo(() => {
    if (!hasAnyFilter) return projectData;
    return projectData.filter((p) =>
      activeTagValues.every((tag) => p.tags.includes(tag)),
    );
  }, [activeTagValues, hasAnyFilter]);

  const handleFilter = useCallback((groupKey: string, tag: string) => {
    setActiveFilters((prev) => {
      const next = { ...prev };
      if (next[groupKey] === tag) {
        delete next[groupKey];
      } else {
        next[groupKey] = tag;
      }
      return next;
    });
  }, []);

  const resetFilters = useCallback(() => {
    setActiveFilters({});
  }, []);

  const toggleGroup = (index: number) => {
    setOpenGroup(openGroup === index ? null : index);
  };

  return (
    <div>
      {/* Filters */}
      <div className="space-y-2 mb-8">
        {/* All button — always visible */}
        <div className="flex flex-wrap gap-2 mb-2">
          <button
            onClick={resetFilters}
            className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded border transition-colors ${
              !hasAnyFilter
                ? 'bg-emerald-neon/20 text-emerald-neon border-emerald-neon/50'
                : 'text-text-muted border-glass-border hover:text-foreground hover:border-text-muted'
            }`}
          >
            {t('filterAll')}
          </button>
        </div>

        {/* Accordion groups */}
        <div className="space-y-1.5">
          {filterGroupKeys.map((group, i) => {
            const tags = group.data
              .filter((tag) => availableTags.has(tag))
              .sort();

            if (tags.length === 0) return null;

            const isOpen = openGroup === i;
            const activeTagInGroup = activeFilters[group.key];

            return (
              <div key={group.key}>
                <button
                  onClick={() => toggleGroup(i)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors flex items-center justify-between gap-4 ${
                    isOpen
                      ? 'border-emerald-neon/50 bg-glass-bg'
                      : activeTagInGroup
                        ? 'border-emerald-neon/30 bg-glass-bg-light'
                        : 'border-border-subtle bg-glass-bg-light hover:border-emerald-neon/30 hover:bg-glass-bg'
                  }`}
                >
                  <span className="text-xs font-mono uppercase tracking-widest text-emerald-neon">
                    {t(group.label)}
                    {activeTagInGroup && (
                      <span className="text-foreground"> — {activeTagInGroup.replace(/_/g, ' ')}</span>
                    )}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-emerald-neon text-lg shrink-0"
                  >
                    +
                  </motion.span>
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
                      <div className="pt-2 pb-1 px-1">
                        <div className="flex flex-wrap gap-1.5">
                          {tags.map((tag) => (
                            <button
                              key={tag}
                              onClick={() => handleFilter(group.key, tag)}
                              className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded border transition-all ${
                                activeTagInGroup === tag
                                  ? 'bg-emerald-neon/20 text-emerald-neon border-emerald-neon/50'
                                  : 'text-text-muted border-glass-border hover:text-foreground hover:border-text-muted hover:-translate-y-0.5'
                              }`}
                            >
                              {tag.replace(/_/g, ' ')}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
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
