import React from 'react';
import { motion as Motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import Carousel from '@/components/ui/carousel';
import { portfolioData } from '../data/portfolioData';
import LanguageToggle from '../components/LanguageToggle';
import { useLanguage } from '../i18n/languageContext';

const Projects = ({ onBack, isBackTransitioning = false }) => {
  const { t } = useLanguage();
  // Map projects from portfolioData to carousel slide format
  const projectSlides = portfolioData.projects.map((project) => ({
    title: project.title,
    description: project.description,
    button: t.projects.viewProject,
    src: project.image,
    tags: project.tags,
    link: project.githubLink !== '#' ? project.githubLink : project.liveLink,
  }));

  return (
    <section className="h-full w-full bg-white text-zinc-900 select-none relative overflow-hidden flex flex-col justify-between py-4 sm:py-6 px-4 sm:px-8">
      {/* Top Bar Header */}
      <header className="w-full flex items-center justify-between z-30 shrink-0 max-w-6xl mx-auto pt-1 sm:pt-2">
        {/* Back Button */}
        <button
          type="button"
          onClick={onBack}
          aria-label={t.backToHome}
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-zinc-900 text-white flex items-center justify-center cursor-pointer hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-md shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 ${
            isBackTransitioning ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <FiArrowLeft size={18} className="sm:text-[20px]" />
        </button>

        {/* Section Heading */}
        <div className="text-center">
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
            {t.projects.eyebrow} · {t.projects.builds(projectSlides.length)}
          </span>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-zinc-900">
            {t.projects.title}
          </h1>
        </div>

        <LanguageToggle tone="light" className="shrink-0" />
      </header>

      {/* Center Main Stage: 3D Carousel */}
      <div className="relative flex-1 w-full flex items-center justify-center min-h-0 my-auto overflow-visible z-20">
        <Carousel slides={projectSlides} />
      </div>

      {/* Bottom Hint */}
      <footer className="w-full text-center z-20 shrink-0 pb-1 sm:pb-2">
        <p className="text-[11px] sm:text-xs font-medium text-zinc-400">
          <span className="hidden sm:inline">{t.projects.hintDesktop} • </span>
          <span className="sm:hidden">{t.projects.hintMobile} • </span>
          {t.projects.hintEsc}
        </p>
      </footer>
    </section>
  );
};

export default Projects;
