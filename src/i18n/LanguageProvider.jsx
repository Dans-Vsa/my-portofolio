import { useCallback, useEffect, useMemo, useState } from 'react';
import { LanguageContext, LANGUAGES } from './languageContext';
import { translations } from './translations';

const STORAGE_KEY = 'lang';

// Saved choice first, then the browser language, then English.
function getInitialLanguage() {
  if (typeof window === 'undefined') return 'en';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (LANGUAGES.includes(saved)) return saved;
  return window.navigator.language?.toLowerCase().startsWith('id') ? 'id' : 'en';
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    if (!LANGUAGES.includes(next)) return;
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo(() => ({ lang, setLang, t: translations[lang] }), [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
