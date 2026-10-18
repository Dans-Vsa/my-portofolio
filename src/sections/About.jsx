import { Fragment, useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiArrowUpRight, FiInstagram, FiMail, FiGithub, FiDownload } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { LampContainer } from '@/components/ui/lamp';
import LanguageToggle from '../components/LanguageToggle';
import { useLanguage } from '../i18n/languageContext';
import { portfolioData } from '../data/portfolioData';
import { getTechIcon, TECH_CATEGORIES } from '../lib/techIcons';

const FULL_NAME = 'Danish Vesa Bintang Parikesit';
const NICKNAME = 'Vesa';
const EMAIL = 'danishbintang80@gmail.com';

const iconButtons = [
  { icon: FiMail, label: 'Email', href: `mailto:${EMAIL}` },
  { icon: FiInstagram, label: 'Instagram', href: 'https://www.instagram.com/dasnhilo/', external: true },
  { icon: FaWhatsapp, label: 'WhatsApp', href: 'https://wa.me/6281382449254', external: true },
  { icon: FiGithub, label: 'GitHub', href: 'https://github.com/Dans-Vsa', external: true },
];

const toolkit = TECH_CATEGORIES.map((category) => ({
  category,
  items: portfolioData.techStack.filter((tech) => tech.category === category),
})).filter((group) => group.items.length > 0);

const EASE_REVEAL = [0.22, 1, 0.36, 1];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, delay, ease: EASE_REVEAL },
});

// Replaces {fullName} / {nickname} in translated copy with emphasized spans.
const withNames = (text) =>
  text.split(/(\{fullName\}|\{nickname\})/).map((part, i) => {
    if (part === '{fullName}') return <strong key={i} className="font-semibold text-white">{FULL_NAME}</strong>;
    if (part === '{nickname}') return <strong key={i} className="font-semibold text-white">{NICKNAME}</strong>;
    return <Fragment key={i}>{part}</Fragment>;
  });

const SectionLabel = ({ children }) => (
  <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">{children}</h2>
);

const BackButton = ({ onBack, label, hidden, className = '' }) => (
  <button
    type="button"
    onClick={onBack}
    aria-label={label}
    className={`rounded-full bg-white text-black flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
      hidden ? 'opacity-0 pointer-events-none' : 'opacity-100'
    } ${className}`}
  >
    <FiArrowLeft size={18} className="sm:text-[20px]" />
  </button>
);

const About = ({ onBack, isBackTransitioning = false }) => {
  const { t } = useLanguage();
  const a = t.about;
  const [pastHero, setPastHero] = useState(false);

  const handleScroll = (e) => {
    const next = e.currentTarget.scrollTop > e.currentTarget.clientHeight * 0.6;
    if (next !== pastHero) setPastHero(next);
  };

  return (
    <div
      onScroll={handleScroll}
      className="w-full h-full overflow-y-auto overflow-x-hidden no-scrollbar bg-black text-white select-none relative scroll-smooth overscroll-y-contain"
    >
      {/* Top bar. Stays put while the page scrolls (the transformed parent is the containing block). */}
      <div className="fixed inset-x-0 top-0 z-[60] flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-6 pb-8 pointer-events-none">
        {/* Fades content out under the bar once the hero is gone. */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 -z-10 bg-gradient-to-b from-black via-black/80 to-transparent transition-opacity duration-300 ${
            pastHero ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <AnimatePresence>
          {pastHero && (
            <Motion.div
              key="compact-back"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.25, ease: EASE_REVEAL }}
              className="pointer-events-auto"
            >
              <BackButton
                onBack={onBack}
                label={t.backToHome}
                hidden={isBackTransitioning}
                className="w-11 h-11 shadow-[0_0_0_1px_rgba(255,255,255,0.15)]"
              />
            </Motion.div>
          )}
        </AnimatePresence>
        <LanguageToggle tone="dark" className="pointer-events-auto ml-auto" />
      </div>

      {/* 1. Hero: lamp spotlight */}
      <section className="min-h-[100dvh] w-full relative flex flex-col justify-center overflow-hidden">
        <LampContainer>
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center gap-3 sm:gap-5 max-w-3xl my-auto px-4 sm:px-6"
          >
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-zinc-400">
              {a.eyebrow}
            </span>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-[0_4px_16px_rgba(255,255,255,0.2)] leading-none py-1 sm:py-2">
              Danish Vesa
            </h1>

            <p className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-medium text-zinc-300 tracking-tight max-w-xs sm:max-w-none">
              {a.role}
            </p>

            <div className="flex items-center justify-center gap-2.5 sm:gap-3 pt-3 sm:pt-5">
              <BackButton
                onBack={onBack}
                label={t.backToHome}
                hidden={isBackTransitioning}
                className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 shadow-[0_0_24px_rgba(255,255,255,0.35)]"
              />

              {iconButtons.map((button) => {
                const Icon = button.icon;
                return (
                  <a
                    key={button.label}
                    href={button.href}
                    target={button.external ? '_blank' : undefined}
                    rel={button.external ? 'noopener noreferrer' : undefined}
                    aria-label={button.label}
                    className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center bg-zinc-900 border border-zinc-700 rounded-btn text-white cursor-pointer hover:bg-zinc-800 hover:border-white hover:-translate-y-0.5 active:scale-95 transition-all shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <Icon size={18} className="sm:text-[20px]" />
                  </a>
                );
              })}
            </div>
          </Motion.div>
        </LampContainer>

        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-500 pointer-events-none"
          aria-hidden="true"
        >
          <span>{a.scrollHint}</span>
          <span className="block w-px h-8 bg-gradient-to-b from-zinc-500 to-transparent animate-pulse" />
        </Motion.div>
      </section>

      <div className="max-w-5xl mx-auto px-5 sm:px-10 lg:px-12 pb-24 sm:pb-36 flex flex-col gap-20 sm:gap-28">
        {/* 2. Intro: quick facts, statement + bio + stats */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 border-t border-zinc-800 pt-12 sm:pt-16">
          <Motion.aside {...reveal()} className="md:col-span-4 md:sticky md:top-24 self-start">
            <dl className="divide-y divide-zinc-800 border-y border-zinc-800 text-sm sm:text-base">
              {[
                [a.facts.based, a.facts.basedValue],
                [a.facts.focus, a.facts.focusValue],
                [a.facts.status, a.facts.statusValue, true],
              ].map(([term, value, live]) => (
                <div key={term} className="flex items-center justify-between gap-4 py-4">
                  <dt className="text-zinc-500">{term}</dt>
                  <dd className="inline-flex items-center gap-2 font-medium text-white text-right">
                    {live && (
                      <span className="relative flex w-2 h-2" aria-hidden="true">
                        <span className="absolute inline-flex w-full h-full rounded-full bg-white opacity-60 animate-ping" />
                        <span className="relative inline-flex w-2 h-2 rounded-full bg-white" />
                      </span>
                    )}
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </Motion.aside>

          <div className="md:col-span-8 flex flex-col gap-10 sm:gap-12">
            <Motion.p
              {...reveal(0.05)}
              className="text-2xl sm:text-3xl md:text-4xl font-normal leading-snug sm:leading-[1.25] text-zinc-400 tracking-tight"
            >
              <span className="font-semibold text-white">{a.statementLead}</span>
              {a.statementRest}
            </Motion.p>

            <Motion.div
              {...reveal(0.1)}
              className="space-y-5 text-base sm:text-lg text-zinc-300 leading-relaxed"
            >
              {a.bio.map((paragraph, i) => (
                <p key={i}>{withNames(paragraph)}</p>
              ))}
            </Motion.div>

            <Motion.dl {...reveal(0.15)} className="grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-zinc-800">
              {a.stats.map((stat) => (
                <div key={stat.value + stat.label} className="flex flex-col">
                  <dd className="order-1 text-3xl sm:text-5xl font-bold text-white tracking-tight tabular-nums">
                    {stat.value}
                  </dd>
                  <dt className="order-2 mt-1.5 text-xs sm:text-sm text-zinc-500 font-medium leading-tight">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </Motion.dl>
          </div>
        </section>

        {/* 3. What I do */}
        <section className="flex flex-col gap-8 sm:gap-10">
          <Motion.div {...reveal()}>
            <SectionLabel>{a.servicesTitle}</SectionLabel>
          </Motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {a.services.map((service, i) => (
              <Motion.article key={service.title} {...reveal(0.08 * i)} className="border-t border-zinc-700 pt-6">
                <span className="text-sm text-zinc-600 tabular-nums">0{i + 1}</span>
                <h3 className="mt-3 text-xl sm:text-2xl font-semibold text-white tracking-tight">{service.title}</h3>
                <p className="mt-3 text-sm sm:text-base text-zinc-400 leading-relaxed">{service.desc}</p>
              </Motion.article>
            ))}
          </div>
        </section>

        {/* 4. Toolkit */}
        <section className="flex flex-col gap-8 sm:gap-10">
          <Motion.div {...reveal()}>
            <SectionLabel>{a.toolkitTitle}</SectionLabel>
          </Motion.div>
          <dl className="divide-y divide-zinc-800 border-y border-zinc-800">
            {toolkit.map((group, i) => (
              <Motion.div
                key={group.category}
                {...reveal(0.05 * i)}
                className="grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-3 sm:gap-6 py-5 sm:py-6"
              >
                <dt className="text-sm font-medium text-zinc-500 sm:pt-2">{a.categories[group.category]}</dt>
                <dd className="flex flex-wrap gap-2">
                  {group.items.map((tech) => {
                    const Icon = getTechIcon(tech.icon);
                    return (
                      <span
                        key={tech.id}
                        className="inline-flex items-center gap-2 rounded-btn border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-zinc-200 hover:border-zinc-500 hover:text-white transition-colors"
                      >
                        <Icon size={15} aria-hidden="true" />
                        {tech.name}
                      </span>
                    );
                  })}
                </dd>
              </Motion.div>
            ))}
          </dl>
        </section>

        {/* 5. Education */}
        <section className="flex flex-col gap-8 sm:gap-10">
          <Motion.div {...reveal()}>
            <SectionLabel>{a.educationTitle}</SectionLabel>
          </Motion.div>
          <ol className="border-y border-zinc-800 divide-y divide-zinc-800">
            {a.education.map((edu, i) => (
              <Motion.li
                key={edu.title}
                {...reveal(0.08 * i)}
                className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 py-5 sm:py-6"
              >
                <h3 className="text-lg sm:text-2xl font-semibold text-white tracking-tight">{edu.title}</h3>
                <span className="text-sm sm:text-base text-zinc-500">{edu.desc}</span>
              </Motion.li>
            ))}
          </ol>
        </section>

        {/* 6. Outro + CTA */}
        <Motion.section {...reveal()} className="flex flex-col gap-8 sm:gap-10 pt-4">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.02] text-white max-w-4xl">
            {a.outroTitle}
          </h2>
          <div className="max-w-2xl space-y-4 text-base sm:text-lg text-zinc-400 leading-relaxed">
            <p>{a.outroBody}</p>
            <p className="text-white font-medium">{a.availability}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/cv-vesa.pdf"
              download="Danish_Vesa_CV.pdf"
              className="inline-flex items-center justify-center gap-2.5 py-3.5 px-7 bg-white text-black font-semibold text-sm rounded-btn hover:bg-zinc-200 active:scale-[0.98] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <FiDownload size={17} />
              <span>{a.downloadCv}</span>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="group inline-flex items-center justify-center gap-2.5 py-3.5 px-7 border border-zinc-700 text-white font-semibold text-sm rounded-btn hover:border-white active:scale-[0.98] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <span>{a.sayHello}</span>
              <FiArrowUpRight size={17} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </Motion.section>
      </div>
    </div>
  );
};

export default About;
