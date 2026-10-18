import { FiArrowLeft } from 'react-icons/fi';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '../i18n/languageContext';

// Shared top bar for the light section pages: round back button, centered title, ID/EN toggle.
// `meta` is extra eyebrow text that only shows from `sm` up, where there is room for it.
const SectionHeader = ({ onBack, isBackTransitioning = false, eyebrow, meta, title }) => {
  const { t } = useLanguage();

  return (
    <header className="w-full flex items-center justify-between z-30 shrink-0 max-w-6xl mx-auto px-4 sm:px-8 pt-5 sm:pt-8">
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

      <div className="text-center px-2 min-w-0">
        <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
          {eyebrow}
          {meta && <span className="hidden sm:inline"> · {meta}</span>}
        </span>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-zinc-900">{title}</h1>
      </div>

      <LanguageToggle tone="light" className="shrink-0" />
    </header>
  );
};

export default SectionHeader;
