import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const stats = [
    { label: 'Projects Completed', value: '30+' },
    { label: 'Years Experience', value: '2+' },
    { label: 'Happy Clients', value: '15+' },
  ];

  const education = [
    { title: 'Digital Technology University of Indonesia', desc: 'University' },
    { title: 'SMK Taruna Bhakti Cikarang', desc: 'Vocational High School' },
    { title: 'SMPN 4 South Cikarang', desc: 'Junior High School' },
    { title: 'SD Islam Insan Taqwa', desc: 'Elementary School' },
    { title: 'TK Berdikari', desc: 'Kindergarten' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="about" ref={ref} className="min-h-full px-6 sm:px-10 md:px-14 py-md">
      <motion.div
        className="flex flex-col md:flex-row gap-md md:gap-lg"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Left: About Description */}
        <motion.div variants={itemVariants} className="flex-1 flex flex-col justify-center">
          <div className="mb-sm">
            <h2 className="text-3xl md:text-4xl font-normal text-text mb-2">About Me</h2>
            <div className="w-16 h-px bg-border" />
          </div>
          <div className="space-y-4">
            <p className="text-base md:text-lg text-text-secondary leading-relaxed">
              I'm <span className="font-medium text-text">Danish Vesa Bintang Parikesit</span>, but
              you can call me <span className="font-medium text-text">Vesa</span>. I'm a{' '}
              <span className="font-medium text-text">Frontend Developer</span> and{' '}
              <span className="font-medium text-text">UI/UX Designer</span> with over 2 years of
              experience creating modern, responsive, and user-centered web applications.
            </p>
            <p className="text-base md:text-lg text-text-secondary leading-relaxed">
              My journey in web development started with a fascination for how interfaces can
              transform user experiences. I specialize in translating design mockups into
              pixel-perfect, interactive websites using React, Tailwind CSS, and modern frontend
              frameworks.
            </p>
            <p className="text-base md:text-lg text-text-secondary leading-relaxed">
              When I'm not coding or designing, you can find me exploring the latest UI/UX trends,
              contributing to open-source projects, or experimenting with new frontend technologies.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-sm pt-md">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="border border-border p-4 rounded-btn text-center"
              >
                <div className="text-2xl md:text-3xl font-medium text-text mb-1">{stat.value}</div>
                <div className="text-xs md:text-sm text-text-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Education */}
        <motion.div variants={itemVariants} className="flex-1 flex flex-col justify-center">
          <div className="mb-sm">
            <h3 className="text-2xl font-normal text-text mb-2">Education & Experience</h3>
            <div className="w-12 h-px bg-border" />
          </div>
          <div className="flex flex-col gap-3">
            {education.map((edu) => (
              <motion.div
                key={edu.title}
                variants={itemVariants}
                className="border border-border p-4 rounded-btn"
              >
                <h4 className="font-medium text-sm text-text mb-1">{edu.title}</h4>
                <p className="text-xs text-text-secondary">{edu.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div variants={itemVariants} className="pt-md">
            <a
              href="/cv-vesa.pdf"
              download
              className="inline-block px-8 py-3 bg-text text-bg-secondary font-medium rounded-btn hover:bg-primary transition-colors"
            >
              Download CV
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
