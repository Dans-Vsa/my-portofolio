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

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 bg-transparent"
    >
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-2xl"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          <motion.div variants={itemVariants} className="space-y-6">
            
            <p className="text-lg text-gray-700 leading-relaxed">
              I'm <span className="font-semibold text-blue-600">Danish Vesa Bintang Parikesit</span>, 
              but you can call me <span className="font-semibold">Vesa</span>. I'm a passionate 
              <span className="font-semibold text-blue-600"> Frontend Developer</span> and 
              <span className="font-semibold text-blue-600"> UI/UX Designer</span> with over 
              2 years of experience creating modern, responsive, and user-centered web applications.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              My journey in web development started with a fascination for how beautiful interfaces 
              can transform user experiences. I specialize in translating design mockups into 
              pixel-perfect, interactive websites using React, Tailwind CSS, and modern frontend 
              frameworks. I believe that great design is not just about aesthetics—it's about 
              functionality, accessibility, and creating delightful user journeys.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              When I'm not coding or designing, you can find me exploring the latest UI/UX trends, 
              contributing to open-source projects, or experimenting with new frontend technologies. 
              I'm always eager to collaborate on projects that push creative boundaries and solve 
              real-world problems through innovative design and development.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-6 rounded-xl text-center hover:shadow-lg transition-shadow"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Education & Experience
            </h3>

            <div className="space-y-3 sm:space-y-4">
              {/* Education Timeline */}
              <motion.div
                variants={itemVariants}
                className="relative pl-6 sm:pl-8 pb-4 sm:pb-6 border-l-2 border-blue-500"
              >
                <div className="absolute -left-2 top-0 w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full"></div>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-3 sm:p-4 rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-sm sm:text-base text-gray-900">Digital Technology University of Indonesia</h4>
                  <p className="text-xs sm:text-sm text-gray-600">University</p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="relative pl-6 sm:pl-8 pb-4 sm:pb-6 border-l-2 border-blue-500"
              >
                <div className="absolute -left-2 top-0 w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full"></div>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-3 sm:p-4 rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-sm sm:text-base text-gray-900">SMK Taruna Bhakti Cikarang</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Vocational High School</p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="relative pl-6 sm:pl-8 pb-4 sm:pb-6 border-l-2 border-blue-500"
              >
                <div className="absolute -left-2 top-0 w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full"></div>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-3 sm:p-4 rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-sm sm:text-base text-gray-900">SMPN 4 South Cikarang</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Junior High School</p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="relative pl-6 sm:pl-8 pb-4 sm:pb-6 border-l-2 border-blue-500"
              >
                <div className="absolute -left-2 top-0 w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full"></div>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-3 sm:p-4 rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-sm sm:text-base text-gray-900">SD Islam Insan Taqwa</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Elementary School</p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="relative pl-6 sm:pl-8 border-l-2 border-blue-500"
              >
                <div className="absolute -left-2 top-0 w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full"></div>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-3 sm:p-4 rounded-lg hover:shadow-md transition-shadow">
                  <h4 className="font-semibold text-sm sm:text-base text-gray-900">TK Berdikari</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Kindergarten</p>
                </div>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="pt-6">
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