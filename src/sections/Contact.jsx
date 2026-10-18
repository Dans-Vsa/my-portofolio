import { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { FiArrowUpRight, FiCheck, FiCopy, FiDownload, FiGithub, FiInstagram, FiMail, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import SectionHeader from '../components/SectionHeader';
import { useLanguage } from '../i18n/languageContext';

const EMAIL = 'danishbintang80@gmail.com';
const WHATSAPP = '6281382449254';
const EASE = [0.22, 1, 0.36, 1];
const TOPIC_IDS = ['freelance', 'fulltime', 'collab', 'other'];

const channels = [
  { id: 'email', icon: FiMail, label: 'Email', value: EMAIL, href: `mailto:${EMAIL}`, copy: EMAIL },
  { id: 'whatsapp', icon: FaWhatsapp, label: 'WhatsApp', value: '+62 813 8244 9254', href: `https://wa.me/${WHATSAPP}`, external: true },
  { id: 'instagram', icon: FiInstagram, label: 'Instagram', value: '@dasnhilo', href: 'https://www.instagram.com/dasnhilo/', external: true },
  { id: 'github', icon: FiGithub, label: 'GitHub', value: 'Dans-Vsa', href: 'https://github.com/Dans-Vsa', external: true },
];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE },
});

// Live clock for Western Indonesia Time; ticks once a minute.
const useJakartaTime = (locale) => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  return new Intl.DateTimeFormat(locale, {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
    weekday: 'long',
  }).format(now);
};

const Contact = ({ onBack, isBackTransitioning = false }) => {
  const { t } = useLanguage();
  const ct = t.contact;
  const time = useJakartaTime(t.certificates.locale);
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('freelance');
  const [message, setMessage] = useState('');

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  // Compose the note client-side; it only leaves the page through the visitor's own mail app or WhatsApp.
  const subject = `${ct.topics[topic]}${name.trim() ? ` · ${name.trim()}` : ''}`;
  const body = `${ct.greeting(name.trim())}\n\n${message.trim()}`;
  const mailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const waHref = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`[${ct.topics[topic]}]\n${body}`)}`;
  const canSend = message.trim().length > 0;

  return (
    <section className="h-full w-full bg-white text-zinc-900 relative overflow-hidden flex flex-col">
      <SectionHeader
        onBack={onBack}
        isBackTransitioning={isBackTransitioning}
        eyebrow={ct.available}
        title={ct.eyebrow}
      />

      <div className="flex-1 min-h-0 overflow-y-auto overscroll-y-contain no-scrollbar">
        <div className="max-w-5xl mx-auto px-4 sm:px-8 pt-8 sm:pt-12 pb-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {/* Left: intro + channels */}
          <div className="flex flex-col gap-8">
            <Motion.div {...reveal()} className="flex flex-col gap-4">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-zinc-700">
                <span className="relative flex w-2 h-2" aria-hidden="true">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
                </span>
                {ct.available}
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.02]">{ct.title}</h2>
              <p className="text-base sm:text-lg text-zinc-500 leading-relaxed max-w-md">{ct.lead}</p>
              <p className="text-sm text-zinc-500">
                {ct.localTime}: <span className="font-semibold text-zinc-900 tabular-nums">{time} WIB</span>
              </p>
            </Motion.div>

            <Motion.div {...reveal(0.08)}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">{ct.channels}</h3>
              <ul className="mt-3 divide-y divide-border border-y border-border">
                {channels.map((ch) => {
                  const Icon = ch.icon;
                  return (
                    <li key={ch.id} className="flex items-center gap-3 py-3.5">
                      <span className="w-10 h-10 shrink-0 rounded-btn bg-bg flex items-center justify-center text-zinc-800">
                        <Icon size={18} aria-hidden="true" />
                      </span>
                      <a
                        href={ch.href}
                        target={ch.external ? '_blank' : undefined}
                        rel={ch.external ? 'noopener noreferrer' : undefined}
                        className="group flex-1 min-w-0"
                      >
                        <span className="block text-xs text-zinc-500">{ch.label}</span>
                        <span className="flex items-center gap-1 text-sm sm:text-base font-medium truncate group-hover:underline underline-offset-4">
                          {ch.value}
                          <FiArrowUpRight size={15} className="shrink-0 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
                        </span>
                      </a>
                      {ch.copy && (
                        <button
                          type="button"
                          onClick={copyEmail}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-zinc-700 hover:border-zinc-900 cursor-pointer transition-colors"
                          aria-live="polite"
                        >
                          {copied ? <FiCheck size={13} /> : <FiCopy size={13} />}
                          {copied ? ct.copied : ct.copy}
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </Motion.div>

            <Motion.a
              {...reveal(0.14)}
              href="/cv-vesa.pdf"
              download="Danish_Vesa_CV.pdf"
              className="inline-flex w-fit items-center gap-2 rounded-btn border border-zinc-900 px-5 py-3 text-sm font-semibold hover:bg-zinc-900 hover:text-white transition-colors"
            >
              <FiDownload size={16} />
              {ct.downloadCv}
            </Motion.a>
          </div>

          {/* Right: quick message composer */}
          <Motion.form
            {...reveal(0.1)}
            onSubmit={(e) => e.preventDefault()}
            className="self-start rounded-card bg-bg p-5 sm:p-7 flex flex-col gap-5"
          >
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">{ct.composer}</h3>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">{ct.name}</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={ct.namePlaceholder}
                maxLength={60}
                className="h-11 rounded-btn border border-border bg-white px-4 text-sm outline-none focus:border-zinc-900 transition-colors"
              />
            </label>

            <fieldset className="flex flex-col gap-2">
              <legend className="text-sm font-medium mb-1.5">{ct.topic}</legend>
              <div className="flex flex-wrap gap-2">
                {TOPIC_IDS.map((id) => {
                  const isActive = id === topic;
                  return (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setTopic(id)}
                      className={`h-9 px-3.5 rounded-full border text-xs sm:text-sm font-medium cursor-pointer transition-colors ${
                        isActive ? 'bg-zinc-900 border-zinc-900 text-white' : 'bg-white border-border text-zinc-600 hover:border-zinc-400'
                      }`}
                    >
                      {ct.topics[id]}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium">{ct.message}</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={ct.messagePlaceholder}
                rows={5}
                maxLength={1500}
                className="rounded-btn border border-border bg-white px-4 py-3 text-sm leading-relaxed outline-none focus:border-zinc-900 transition-colors resize-none"
              />
            </label>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <a
                href={canSend ? mailHref : undefined}
                aria-disabled={!canSend}
                className={`flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-btn text-sm font-semibold transition-all ${
                  canSend ? 'bg-zinc-900 text-white hover:bg-black active:scale-[0.98]' : 'bg-zinc-200 text-zinc-400 pointer-events-none'
                }`}
              >
                <FiSend size={15} />
                {ct.sendEmail}
              </a>
              <a
                href={canSend ? waHref : undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-disabled={!canSend}
                className={`flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-btn border text-sm font-semibold transition-all ${
                  canSend ? 'border-zinc-900 text-zinc-900 hover:bg-white active:scale-[0.98]' : 'border-zinc-200 text-zinc-400 pointer-events-none'
                }`}
              >
                <FaWhatsapp size={16} />
                {ct.sendWhatsApp}
              </a>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed">{ct.composerNote}</p>
          </Motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
