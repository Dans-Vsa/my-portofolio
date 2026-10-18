import { useEffect, useMemo, useRef, useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiX } from 'react-icons/fi';
import SectionHeader from '../components/SectionHeader';
import { useLanguage } from '../i18n/languageContext';
import { portfolioData } from '../data/portfolioData';
import { getTechIcon, TECH_CATEGORIES } from '../lib/techIcons';

const GITHUB = 'https://github.com/Dans-Vsa/';
const EASE = [0.22, 1, 0.36, 1];

// Display names for repos; `my-portofolio` is translated as "this portfolio".
const REPO_LABELS = {
  'legenda-lembah-angin': 'Legenda Lembah Angin',
  'kopi-tycoon': 'Kopi Tycoon',
  PortoGameLab: 'PortoGameLab',
  'fujimoto-archive': 'Fujimoto Archive',
  'look-back': 'Look Back',
  'chainsaw-man-fanblog': 'Devil/Hunter Log',
  'spendwise-api': 'SpendWise API',
  gitpulse: 'gitpulse',
  'gesture-pilot': 'gesture-pilot',
  MedicalSystem: 'Medical System',
  'Foodstall-System': 'Foodstall System',
  'PFW-InstalBreeze-JetSream': 'Breeze & Jetstream',
  'Game-PlatypusD': 'PlatypusD',
  'Game-ALIENKI': 'ALIENKI',
};

const techStack = portfolioData.techStack;

const TechStack = ({ onBack, isBackTransitioning = false }) => {
  const { t } = useLanguage();
  const ts = t.techStack;
  const categoryLabels = t.about.categories;
  const [filter, setFilter] = useState('all');
  const [selectedId, setSelectedId] = useState(null);
  const gridRef = useRef(null);

  const filters = useMemo(
    () => [
      { id: 'all', label: ts.all, count: techStack.length },
      ...TECH_CATEGORIES.map((cat) => ({
        id: cat,
        label: categoryLabels[cat],
        count: techStack.filter((tech) => tech.category === cat).length,
      })).filter((f) => f.count > 0),
    ],
    [ts.all, categoryLabels],
  );

  const visible = filter === 'all' ? techStack : techStack.filter((tech) => tech.category === filter);
  const selected = techStack.find((tech) => tech.id === selectedId) ?? null;

  // Esc closes the detail sheet first; App's own Esc handler (back to home) only runs when nothing is open.
  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      e.stopImmediatePropagation();
      setSelectedId(null);
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [selected]);

  // Spotlight follows the pointer through CSS variables, so moving the mouse never re-renders.
  const handlePointerMove = (e) => {
    const el = gridRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  const repoLabel = (repo) => (repo === 'my-portofolio' ? ts.thisPortfolio : REPO_LABELS[repo] ?? repo);

  return (
    <section className="h-full w-full bg-white text-zinc-900 select-none relative overflow-hidden flex flex-col">
      <SectionHeader
        onBack={onBack}
        isBackTransitioning={isBackTransitioning}
        eyebrow={ts.eyebrow}
        meta={ts.count(techStack.length)}
        title={ts.title}
      />

      <div className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain no-scrollbar">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-6 sm:pt-10 pb-40">
          {/* Category filter */}
          <div
            role="tablist"
            aria-label={ts.title}
            className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center"
          >
            {filters.map((f) => {
              const isActive = f.id === filter;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setFilter(f.id);
                    setSelectedId(null);
                  }}
                  className={`relative shrink-0 inline-flex items-center gap-2 h-9 px-4 rounded-full border text-sm font-medium cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 ${
                    isActive ? 'border-zinc-900 text-white' : 'border-border text-zinc-600 hover:text-zinc-900 hover:border-zinc-400'
                  }`}
                >
                  {isActive && (
                    <Motion.span
                      layoutId="tech-filter-thumb"
                      className="absolute inset-0 rounded-full bg-zinc-900"
                      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                    />
                  )}
                  <span className="relative z-10">{f.label}</span>
                  <span className={`relative z-10 text-xs tabular-nums ${isActive ? 'text-zinc-400' : 'text-zinc-400'}`}>
                    {f.count}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-center text-xs text-zinc-400">{ts.hint}</p>

          {/* Grid with pointer spotlight */}
          <div
            ref={gridRef}
            onPointerMove={handlePointerMove}
            className="group/grid relative mt-6 sm:mt-8"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 opacity-0 group-hover/grid:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  'radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), rgba(0,0,0,0.06), transparent 70%)',
              }}
            />

            <Motion.ul layout className="relative grid grid-cols-3 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2.5 sm:gap-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {visible.map((tech) => {
                  const Icon = getTechIcon(tech.icon);
                  const isSelected = tech.id === selectedId;
                  return (
                    <Motion.li
                      key={tech.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, ease: EASE }}
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedId(isSelected ? null : tech.id)}
                        aria-pressed={isSelected}
                        style={{ '--brand': tech.color }}
                        className={`group w-full aspect-square sm:aspect-[5/4] flex flex-col items-center justify-center gap-2.5 rounded-btn border bg-white/80 backdrop-blur-[2px] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_12px_30px_-12px_rgba(0,0,0,0.25)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 ${
                          isSelected ? 'border-zinc-900 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.3)]' : 'border-border'
                        }`}
                      >
                        <Icon
                          aria-hidden="true"
                          className={`text-[28px] sm:text-[32px] transition-colors duration-300 group-hover:text-[color:var(--brand)] ${
                            isSelected ? 'text-[color:var(--brand)]' : 'text-zinc-800'
                          }`}
                        />
                        <span className="px-1 text-[11px] sm:text-xs font-medium text-zinc-700 text-center leading-tight">
                          {tech.name}
                        </span>
                      </button>
                    </Motion.li>
                  );
                })}
              </AnimatePresence>
            </Motion.ul>
          </div>
        </div>
      </div>

      {/* Detail sheet */}
      {/* Centered by the wrapper so framer's transform on the sheet doesn't fight a translate-x. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-3 z-40 flex justify-center px-3">
      <AnimatePresence>
        {selected && (
          <Motion.aside
            key={selected.id}
            initial={{ y: '120%' }}
            animate={{ y: 0 }}
            exit={{ y: '120%' }}
            transition={{ duration: 0.35, ease: EASE }}
            className="pointer-events-auto w-full sm:max-w-[560px] rounded-card border border-border bg-white p-5 sm:p-6 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)]"
            aria-live="polite"
          >
            <div className="flex items-start gap-4">
              {(() => {
                const Icon = getTechIcon(selected.icon);
                return (
                  <div
                    className="w-12 h-12 shrink-0 rounded-btn bg-bg flex items-center justify-center"
                    style={{ color: selected.color }}
                  >
                    <Icon size={26} aria-hidden="true" />
                  </div>
                );
              })()}
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                  {categoryLabels[selected.category]}
                </p>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight">{selected.name}</h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedId(null)}
                aria-label={ts.close}
                className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-zinc-500 hover:text-zinc-900 hover:bg-bg cursor-pointer transition-colors"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="mt-4">
              {selected.usedIn.length > 0 ? (
                <>
                  <p className="text-xs font-medium text-zinc-500">{ts.usedIn}</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {selected.usedIn.map((repo) => (
                      <li key={repo}>
                        <a
                          href={GITHUB + repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-zinc-800 hover:border-zinc-900 hover:text-black transition-colors"
                        >
                          <FiGithub size={13} aria-hidden="true" />
                          {repoLabel(repo)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="text-sm text-zinc-500">{ts.notYet}</p>
              )}
            </div>
          </Motion.aside>
        )}
      </AnimatePresence>
      </div>
    </section>
  );
};

export default TechStack;
