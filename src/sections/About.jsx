import { motion as Motion } from 'framer-motion';
import { FiArrowLeft, FiInstagram, FiMail, FiGithub, FiDownload } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { LampContainer } from '@/components/ui/lamp';

const iconButtons = [
  { icon: FiMail, label: 'Email', href: 'mailto:danishbintang75@gmail.com' },
  { icon: FiInstagram, label: 'Instagram', href: 'https://www.instagram.com/dasnhilo/', external: true },
  { icon: FaWhatsapp, label: 'WhatsApp', href: 'https://wa.me/6281382449254', external: true },
  { icon: FiGithub, label: 'GitHub', href: 'https://github.com/Dans-Vsa', external: true },
];

const stats = [
  { value: '30+', label: 'Projects Completed' },
  { value: '2+', label: 'Years Experience' },
  { value: '15+', label: 'Happy Clients' },
];

const education = [
  { title: 'Digital Technology University of Indonesia', desc: 'University' },
  { title: 'SMK Taruna Bhakti Cikarang', desc: 'Vocational High School' },
];

const About = ({ onBack, isBackTransitioning = false }) => {
  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden no-scrollbar bg-black text-white select-none relative scroll-smooth overscroll-y-contain">
      
      {/* ========================================================= */}
      {/* 1. FIRST SCREEN: WHITE SPOTLIGHT LAMP ON BLACK (100dvh)    */}
      {/* ========================================================= */}
      <section className="min-h-[100dvh] w-full relative flex flex-col justify-center overflow-hidden">
        <LampContainer>
          <Motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col items-center text-center gap-3 sm:gap-5 max-w-3xl my-auto px-4 sm:px-6"
          >
            {/* Name with high-contrast bright white */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white drop-shadow-[0_4px_16px_rgba(255,255,255,0.2)] leading-none py-1 sm:py-2">
              Danish Vesa
            </h1>

            {/* Role with crisp readable contrast */}
            <p className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-medium text-zinc-300 tracking-tight max-w-xs sm:max-w-none">
              Frontend Developer &amp; UI/UX Designer
            </p>

            {/* Action Buttons: Back Button + Social Links */}
            <div className="flex items-center justify-center gap-2.5 sm:gap-3 pt-3 sm:pt-5">
              <button
                type="button"
                onClick={onBack}
                aria-label="Back to Homepage"
                className={`w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white text-black flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 transition-all shadow-[0_0_24px_rgba(255,255,255,0.35)] shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  isBackTransitioning ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              >
                <FiArrowLeft size={18} className="sm:text-[20px] md:text-[22px]" />
              </button>

              {iconButtons.map((button) => {
                const Icon = button.icon;
                return (
                  <a
                    key={button.label}
                    href={button.href}
                    target={button.external ? '_blank' : undefined}
                    rel={button.external ? 'noopener noreferrer' : undefined}
                    aria-label={button.label}
                    className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center bg-zinc-900 border border-zinc-700 rounded-btn text-white cursor-pointer hover:bg-zinc-800 hover:border-white hover:-translate-y-0.5 active:scale-95 transition-all shadow-sm shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <Icon size={18} className="sm:text-[20px]" />
                  </a>
                );
              })}
            </div>
          </Motion.div>
        </LampContainer>
      </section>

      {/* ========================================================= */}
      {/* 2. SCROLLED CONTENT: HIGH-CONTRAST FADE UP ON SCROLL       */}
      {/* ========================================================= */}
      <section className="max-w-4xl mx-auto px-5 sm:px-10 lg:px-12 pb-24 sm:pb-36 pt-4 flex flex-col gap-12 sm:gap-20 md:gap-24">
        
        {/* Main Statement Headline */}
        <Motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="border-t border-zinc-800 pt-10 sm:pt-16"
        >
          <p className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-snug sm:leading-[1.3] text-zinc-300 max-w-3xl text-justify sm:text-left">
            <span className="font-semibold text-white">
              Frontend Developer &amp; UI/UX Designer
            </span>
            <span>
              , turning creative concepts and user needs into modern, accessible web interfaces that feel obvious.
            </span>
          </p>
        </Motion.div>

        {/* Biography Narrative */}
        <Motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4 sm:space-y-6 text-base sm:text-lg md:text-xl text-zinc-300 leading-relaxed font-normal text-justify sm:text-left"
        >
          <p>
            I'm <span className="font-semibold text-white">Danish Vesa Bintang Parikesit</span> (call me <span className="font-semibold text-white">Vesa</span>). A passionate Frontend Developer and UI/UX Designer with over 2 years of experience creating modern, responsive, and user-centered web applications.
          </p>
          <p>
            My journey in web development started with a fascination for how beautiful interfaces can transform user experiences. I specialize in translating design mockups into pixel-perfect, interactive websites using React, Tailwind CSS, and modern frontend frameworks.
          </p>
          <p>
            I believe that great design is not just about aesthetics: it is about seamless functionality, accessibility, and creating effortless digital journeys that real people can rely on every day.
          </p>
        </Motion.div>

        {/* Key Metrics: High Contrast Typographic Presentation */}
        <Motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-3 gap-3 sm:gap-8 md:gap-12 py-6 sm:py-8 border-y border-zinc-800 text-center sm:text-left"
        >
          {stats.map((stat, idx) => (
            <Motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * idx, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center sm:items-start"
            >
              <div className="text-2xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm md:text-base text-zinc-400 mt-1 font-medium leading-tight">
                {stat.label}
              </div>
            </Motion.div>
          ))}
        </Motion.div>

        {/* Education: High Contrast List */}
        <Motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-4 sm:space-y-6"
        >
          <h2 className="text-xs font-bold text-white uppercase tracking-widest">
            Education
          </h2>

          <div className="space-y-4 sm:space-y-6">
            {education.map((edu, idx) => (
              <Motion.div
                key={edu.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.08 * idx, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 pb-3 sm:pb-4 border-b border-zinc-800"
              >
                <h3 className="text-base sm:text-xl font-semibold text-white">
                  {edu.title}
                </h3>
                <span className="text-xs sm:text-base text-zinc-400">
                  {edu.desc}
                </span>
              </Motion.div>
            ))}
          </div>
        </Motion.div>

        {/* Availability & Download CV */}
        <Motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6 sm:space-y-8 pt-2"
        >
          <div className="space-y-2 text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed text-justify sm:text-left">
            <p>
              When I'm not coding or designing, you can find me exploring emerging web trends, experimenting with new design systems, or contributing to open-source ideas.
            </p>
            <p className="pt-2 text-white font-medium">
              Available for freelance projects and full-time opportunities worldwide. Currently based in Indonesia.
            </p>
          </div>

          <div>
            <a
              href="/cv-vesa.pdf"
              download="Danish_Vesa_CV.pdf"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 py-3.5 px-7 bg-white text-black font-semibold text-sm rounded-btn hover:bg-zinc-200 active:scale-98 transition-all shadow-[0_0_24px_rgba(255,255,255,0.25)]"
            >
              <FiDownload size={17} />
              <span>Download CV (PDF)</span>
            </a>
          </div>
        </Motion.div>

      </section>

    </div>
  );
};

export default About;
