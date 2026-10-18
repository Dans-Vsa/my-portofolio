import { motion as Motion } from 'framer-motion';
import { useLanguage, LANGUAGES } from '../i18n/languageContext';

const TONES = {
  light: {
    track: 'bg-bg-secondary border-border text-text-secondary',
    thumb: 'bg-text',
    active: 'text-white',
    ring: 'focus-visible:outline-text',
  },
  dark: {
    track: 'bg-zinc-900/80 border-zinc-700 text-zinc-400 backdrop-blur',
    thumb: 'bg-white',
    active: 'text-black',
    ring: 'focus-visible:outline-white',
  },
};

// Segmented ID / EN switch. The thumb slides between options via layoutId.
const LanguageToggle = ({ tone = 'light', className = '' }) => {
  const { lang, setLang, t } = useLanguage();
  const styles = TONES[tone];

  return (
    <div
      role="group"
      aria-label={t.languageToggle}
      className={`inline-flex items-center p-1 rounded-full border text-xs font-semibold tracking-wide ${styles.track} ${className}`}
    >
      {LANGUAGES.map((code) => {
        const isActive = code === lang;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={isActive}
            className={`relative h-7 sm:h-8 min-w-[34px] sm:min-w-[40px] px-2.5 sm:px-3 rounded-full uppercase cursor-pointer transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${styles.ring} ${
              isActive ? styles.active : 'hover:opacity-70'
            }`}
          >
            {isActive && (
              <Motion.span
                layoutId={`lang-thumb-${tone}`}
                className={`absolute inset-0 rounded-full ${styles.thumb}`}
                transition={{ type: 'spring', stiffness: 500, damping: 38 }}
              />
            )}
            <span className="relative z-10">{code}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LanguageToggle;
