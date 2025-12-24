import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skills = [
    { name: 'React / Next.js', level: 85 },
    { name: 'JavaScript / TypeScript', level: 80 },
    { name: 'Tailwind CSS / Bootstrap', level: 90 },
    { name: 'UI/UX Design (Figma)', level: 85 },
    { name: 'HTML5 & CSS3', level: 95 },
    { name: 'Git & GitHub', level: 85 },
  ];

  const stats = [
    { label: 'Projects Completed', value: '30+' },
    { label: 'Years Experience', value: '2+' },
    { label: 'Happy Clients', value: '15+' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  // Education & Experience data
  const education = [
    { title: 'Digital Technology University of Indonesia', desc: 'University' },
    { title: 'SMK Taruna Bhakti Cikarang', desc: 'Vocational High School' },
    { title: 'SMPN 4 South Cikarang', desc: 'Junior High School' },
    { title: 'SD Islam Insan Taqwa', desc: 'Elementary School' },
    { title: 'TK Berdikari', desc: 'Kindergarten' },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden bg-transparent"
    >
      <motion.div
        className="w-full flex justify-center items-center px-2 sm:px-4 lg:px-0"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="w-full max-w-5xl bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10 md:p-14 flex flex-col md:flex-row gap-10 md:gap-12">
          {/* Left: About Description */}
          <motion.div variants={itemVariants} className="flex-1 flex flex-col justify-center">
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 text-left">About Me</h2>
              <div className="w-16 h-1 bg-blue-600 rounded-full mb-4"></div>
            </div>
            <div className="space-y-5">
              <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                I'm <span className="font-semibold text-blue-600">Danish Vesa Bintang Parikesit</span>,
                but you can call me <span className="font-semibold">Vesa</span>. I'm a passionate
                <span className="font-semibold text-blue-600"> Frontend Developer</span> and
                <span className="font-semibold text-blue-600"> UI/UX Designer</span> with over
                2 years of experience creating modern, responsive, and user-centered web applications.
              </p>
              <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                My journey in web development started with a fascination for how beautiful interfaces
                can transform user experiences. I specialize in translating design mockups into
                pixel-perfect, interactive websites using React, Tailwind CSS, and modern frontend
                frameworks. I believe that great design is not just about aesthetics—it's about
                functionality, accessibility, and creating delightful user journeys.
              </p>
              <p className="text-base md:text-lg text-gray-800 leading-relaxed">
                When I'm not coding or designing, you can find me exploring the latest UI/UX trends,
                contributing to open-source projects, or experimenting with new frontend technologies.
                I'm always eager to collaborate on projects that push creative boundaries and solve
                real-world problems through innovative design and development.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white/90 border border-blue-100 p-4 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-gray-700 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          {/* Right: Education Timeline as Cards */}
          <motion.div variants={itemVariants} className="flex-1 flex flex-col justify-center">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2 text-left">Education & Experience</h3>
              <div className="w-12 h-1 bg-blue-600 rounded-full mb-4"></div>
            </div>
            <div className="flex flex-col gap-4">
              {education.length === 0 ? (
                <div className="bg-white/80 border border-dashed border-blue-300 p-6 rounded-xl text-center text-gray-400">
                  Data pendidikan & pengalaman belum tersedia.
                </div>
              ) : (
                education.map((edu, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="bg-white/90 border border-blue-100 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col"
                  >
                    <h4 className="font-semibold text-base text-gray-900 mb-1">{edu.title}</h4>
                    <p className="text-xs text-gray-600">{edu.desc}</p>
                  </motion.div>
                ))
              )}
            </div>
            <motion.div variants={itemVariants} className="pt-8">
              <a
                href="/cv-vesa.pdf"
                download
                className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Download CV
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;