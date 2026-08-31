import { useEffect, useState } from 'react';
import { FiInstagram, FiMail, FiGithub } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import FoldText from '../components/motion/FoldText';

const ROLES = ['Creative Designer', 'Frontend Developer', 'UI/UX Designer'];

// Persistent identity panel — the one thing always on screen. Everything
// else (About/Portfolio/Contact) only exists as previews in the spiral.
const Home = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let exitTimeout;
    const interval = setInterval(() => {
      // Fade the outgoing role out first, then swap text and let FoldText
      // fold the new one in — without this, the old text just vanished
      // the instant the new one started folding, which read as a jump cut.
      setIsExiting(true);
      exitTimeout = setTimeout(() => {
        setRoleIndex((current) => (current + 1) % ROLES.length);
        setIsExiting(false);
      }, 260);
    }, 2600);
    return () => {
      clearInterval(interval);
      clearTimeout(exitTimeout);
    };
  }, []);

  const iconButtons = [
    { icon: FiInstagram, label: 'Instagram', href: 'https://www.instagram.com/dasnhilo/', external: true },
    { icon: FiMail, label: 'Contact', href: 'mailto:danishbintang75@gmail.com' },
    { icon: FaWhatsapp, label: 'WhatsApp', href: 'https://wa.me/6281382449254', external: true },
    { icon: FiGithub, label: 'GitHub', href: 'https://github.com/Dans-Vsa', external: true },
  ];

  return (
    <div className="flex flex-col gap-md">
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text leading-tight">
          Danish Vesa
        </h1>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal text-text-secondary leading-tight">
          <span
            className={`inline-block transition-opacity duration-300 ease-out ${
              isExiting ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <FoldText
              text={ROLES[roleIndex]}
              splitBy="word"
              hinge="top"
              trigger="mount"
              duration={0.8}
              stagger={0.07}
              ease="power2.out"
              perspective={900}
              fontSize="inherit"
              fontWeight="inherit"
              color="var(--color-text-secondary)"
            />
          </span>
        </h1>
      </div>

      <div className="flex gap-sm">
        {iconButtons.map((button) => {
          const Icon = button.icon;
          return (
            <a
              key={button.label}
              href={button.href}
              target={button.external ? '_blank' : undefined}
              rel={button.external ? 'noopener noreferrer' : undefined}
              aria-label={button.label}
              className="w-14 h-14 flex items-center justify-center bg-bg-secondary border border-border rounded-btn text-text cursor-pointer hover:text-primary hover:-translate-y-0.5 transition-all"
            >
              <Icon size={22} />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
