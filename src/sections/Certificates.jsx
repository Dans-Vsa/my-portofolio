import { useEffect, useMemo, useRef, useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiExternalLink, FiX } from 'react-icons/fi';
import SectionHeader from '../components/SectionHeader';
import { useLanguage } from '../i18n/languageContext';
import { portfolioData } from '../data/portfolioData';

const EASE = [0.22, 1, 0.36, 1];
const TOPICS = ['ai', 'web'];
const certificates = portfolioData.certificates;

const Certificates = ({ onBack, isBackTransitioning = false }) => {
  const { t } = useLanguage();
  const c = t.certificates;
  const [filter, setFilter] = useState('all');
  const [openIndex, setOpenIndex] = useState(null);
  const touchX = useRef(null);

  const formatDate = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(c.locale, { day: 'numeric', month: 'short', year: 'numeric' });
    return (iso) => fmt.format(new Date(`${iso}T00:00:00`));
  }, [c.locale]);

  const filters = [
    { id: 'all', label: c.all, count: certificates.length },
    ...TOPICS.map((topic) => ({
      id: topic,
      label: c.topics[topic],
      count: certificates.filter((cert) => cert.topic === topic).length,
    })),
  ];

  const visible = filter === 'all' ? certificates : certificates.filter((cert) => cert.topic === filter);
  const current = openIndex === null ? null : visible[openIndex];

  const step = (dir) => setOpenIndex((i) => (i + dir + visible.length) % visible.length);

  // While the viewer is open, arrows browse and Esc closes it (instead of App's Esc going home).
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e) => {
      if (!['Escape', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
      e.stopImmediatePropagation();
      e.preventDefault();
      if (e.key === 'Escape') setOpenIndex(null);
      else setOpenIndex((i) => (i + (e.key === 'ArrowRight' ? 1 : -1) + visible.length) % visible.length);
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [openIndex, visible.length]);

  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 45) step(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  return (
    <section className="h-full w-full bg-white text-zinc-900 select-none relative overflow-hidden flex flex-col">
      <SectionHeader
        onBack={onBack}
        isBackTransitioning={isBackTransitioning}
        eyebrow={c.eyebrow}
        meta={c.summary(certificates.length)}
        title={c.title}
      />

      <div className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain no-scrollbar">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-6 sm:pt-10 pb-16">
          {/* Topic filter */}
          <div role="tablist" aria-label={c.title} className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center">
            {filters.map((f) => {
              const isActive = f.id === filter;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(f.id)}
                  className={`relative shrink-0 inline-flex items-center gap-2 h-9 px-4 rounded-full border text-sm font-medium cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 ${
                    isActive ? 'border-zinc-900 text-white' : 'border-border text-zinc-600 hover:text-zinc-900 hover:border-zinc-400'
                  }`}
                >
                  {isActive && (
                    <Motion.span
                      layoutId="cert-filter-thumb"
                      className="absolute inset-0 rounded-full bg-zinc-900"
                      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                    />
                  )}
                  <span className="relative z-10">{f.label}</span>
                  <span className="relative z-10 text-xs tabular-nums text-zinc-400">{f.count}</span>
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-center text-xs text-zinc-400">{c.hint}</p>

          <Motion.ul layout className="mt-6 sm:mt-8 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((cert, i) => (
                <Motion.li
                  key={cert.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(i)}
                    className="group w-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-900 rounded-btn"
                  >
                    <div className="relative overflow-hidden rounded-btn border border-border bg-bg aspect-[16/9] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_16px_36px_-16px_rgba(0,0,0,0.35)]">
                      <img
                        src={cert.thumb}
                        alt={cert.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <h2 className="mt-3 text-sm sm:text-base font-semibold tracking-tight leading-snug">{cert.title}</h2>
                    <p className="mt-0.5 text-xs text-zinc-500">
                      {cert.issuer} · {formatDate(cert.date)}
                    </p>
                  </button>
                </Motion.li>
              ))}
            </AnimatePresence>
          </Motion.ul>
        </div>
      </div>

      {/* Full-size viewer */}
      <AnimatePresence>
        {current && (
          <Motion.div
            key="viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 z-50 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center px-4 py-6 sm:px-16"
            onClick={() => setOpenIndex(null)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              aria-label={c.close}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors"
            >
              <FiX size={20} />
            </button>

            <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait" initial={false}>
                <Motion.img
                  key={current.id}
                  src={current.image}
                  alt={current.title}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="w-full max-h-[68vh] object-contain rounded-btn bg-white shadow-2xl"
                  style={{ backgroundImage: `url("${current.thumb}")`, backgroundSize: 'cover' }}
                />
              </AnimatePresence>

              {visible.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label={c.prev}
                    className="hidden sm:flex absolute left-0 top-1/2 -translate-x-[calc(100%+12px)] -translate-y-1/2 w-11 h-11 rounded-full bg-white text-black items-center justify-center hover:scale-105 active:scale-95 cursor-pointer transition-transform"
                  >
                    <FiChevronLeft size={22} />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label={c.next}
                    className="hidden sm:flex absolute right-0 top-1/2 translate-x-[calc(100%+12px)] -translate-y-1/2 w-11 h-11 rounded-full bg-white text-black items-center justify-center hover:scale-105 active:scale-95 cursor-pointer transition-transform"
                  >
                    <FiChevronRight size={22} />
                  </button>
                </>
              )}

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-white">
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                    {c.topics[current.topic]} · {openIndex + 1} {c.of} {visible.length}
                  </p>
                  <h2 className="text-lg sm:text-xl font-bold tracking-tight">{current.title}</h2>
                  <p className="text-xs sm:text-sm text-zinc-400">
                    {current.issuer} · {formatDate(current.date)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label={c.prev}
                    className="sm:hidden w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center active:scale-95"
                  >
                    <FiChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label={c.next}
                    className="sm:hidden w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center active:scale-95"
                  >
                    <FiChevronRight size={20} />
                  </button>
                  <a
                    href={current.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/25 px-4 py-2 text-xs font-semibold hover:border-white transition-colors"
                  >
                    <FiExternalLink size={14} />
                    {c.open}
                  </a>
                </div>
              </div>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
