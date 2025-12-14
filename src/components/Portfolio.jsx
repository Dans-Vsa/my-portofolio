import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { useInView } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { 
  FaReact, 
  FaNodeJs, 
  FaGitAlt, 
  FaExternalLinkAlt, 
  FaGithub,
  FaCode,
  FaHtml5,
  FaCss3Alt,
  FaPhp,
  FaLaravel,
  FaBootstrap,
  FaFigma,
  FaPython,
  FaDocker
} from 'react-icons/fa';
import { 
  SiJavascript, 
  SiTailwindcss,
  SiMysql,
  SiMongodb
} from 'react-icons/si';

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const iconMap = {
    FaReact: FaReact,
    SiJavascript: SiJavascript,
    SiTailwindcss: SiTailwindcss,
    FaNodeJs: FaNodeJs,
    FaGitAlt: FaGitAlt,
    FaCode: FaCode,
    FaHtml5: FaHtml5,
    FaCss3Alt: FaCss3Alt,
    FaPhp: FaPhp,
    FaLaravel: FaLaravel,
    FaBootstrap: FaBootstrap,
    FaFigma: FaFigma,
    FaPython: FaPython,
    SiMysql: SiMysql,
    SiMongodb: SiMongodb,
    FaDocker: FaDocker,
  };

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'techstack', label: 'Tech Stack' },
    { id: 'projects', label: 'Projects' },
  ];

  const getFilteredItems = () => {
    if (activeFilter === 'all') {
      return {
        certificates: portfolioData.certificates,
        techStack: portfolioData.techStack,
        projects: portfolioData.projects,
      };
    } else if (activeFilter === 'certificates') {
      return { certificates: portfolioData.certificates };
    } else if (activeFilter === 'techstack') {
      return { techStack: portfolioData.techStack };
    } else if (activeFilter === 'projects') {
      return { projects: portfolioData.projects };
    }
  };

  const filteredData = getFilteredItems();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        type: "spring",
        bounce: 0.4,
      },
    },
  };

  return (
    <section
      id="portfolio"
      ref={ref}
      className="py-20 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-2xl">
        
        {/* ============================================
            SECTION TITLE
            ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            My Portfolio
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mb-8"></div>
        </motion.div>

        {/* ============================================
            FILTER TABS
            ============================================ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* ============================================
            PORTFOLIO CONTENT
            ============================================ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          
          {/* ============================================
              CERTIFICATES SECTION
              ============================================ */}
          {filteredData.certificates && (
            <div className="mb-16">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                Certificates
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {(showAllCertificates 
                  ? filteredData.certificates 
                  : filteredData.certificates.slice(0, 6)
                ).map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
                  >
                    {/* Certificate Image */}
                    <div className="h-40 sm:h-48 overflow-hidden">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Certificate Info */}
                    <div className="p-4 sm:p-6">
                      <h4 className="text-base sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {cert.title}
                      </h4>
                      <p className="text-sm sm:text-base text-gray-600 mb-1">{cert.issuer}</p>
                      <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">{cert.date}</p>
                      
                      {/* View Certificate Link */}
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
                      >
                        View Certificate
                        <FaExternalLinkAlt size={14} />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* View More / View Less Button */}
              {filteredData.certificates.length > 6 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 }}
                  className="text-center mt-8"
                >
                  <button
                    onClick={() => setShowAllCertificates(!showAllCertificates)}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
                  >
                    {showAllCertificates ? (
                      <>
                        View Less <span className="ml-2">↑</span>
                      </>
                    ) : (
                      <>
                        View More ({filteredData.certificates.length - 6} more) <span className="ml-2">↓</span>
                      </>
                    )}
                  </button>
                </motion.div>
              )}
            </div>
          )}

          {/* ============================================
              TECH STACK SECTION - INFINITE CAROUSEL
              ============================================ */}
          {filteredData.techStack && (
            <div className="mb-16 overflow-hidden">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Tech Stack
              </h3>

              {/* Row 1 - Moving Left */}
              <div className="relative mb-6">
                <motion.div
                  className="flex gap-6"
                  animate={{
                    x: [0, -1920],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 30,
                      ease: "linear",
                    },
                  }}
                >
                  {/* Duplicate items twice for seamless loop */}
                  {[...filteredData.techStack.slice(0, 8), ...filteredData.techStack.slice(0, 8), ...filteredData.techStack.slice(0, 8)].map((tech, index) => {
                    const IconComponent = iconMap[tech.icon];
                    return (
                      <div
                        key={`row1-${index}`}
                        className="flex-shrink-0 w-40 bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:scale-110 flex flex-col items-center justify-center text-center"
                      >
                        {IconComponent && (
                          <IconComponent
                            size={48}
                            style={{ color: tech.color }}
                            className="mb-3"
                          />
                        )}
                        <h4 className="text-base font-bold text-gray-900 mb-1">
                          {tech.name}
                        </h4>
                        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {tech.category}
                        </span>
                      </div>
                    );
                  })}
                </motion.div>
              </div>

              {/* Row 2 - Moving Right */}
              <div className="relative">
                <motion.div
                  className="flex gap-6"
                  animate={{
                    x: [-1920, 0],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 30,
                      ease: "linear",
                    },
                  }}
                >
                  {/* Duplicate items twice for seamless loop */}
                  {[...filteredData.techStack.slice(8, 16), ...filteredData.techStack.slice(8, 16), ...filteredData.techStack.slice(8, 16)].map((tech, index) => {
                    const IconComponent = iconMap[tech.icon];
                    return (
                      <div
                        key={`row2-${index}`}
                        className="flex-shrink-0 w-40 bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:scale-110 flex flex-col items-center justify-center text-center"
                      >
                        {IconComponent && (
                          <IconComponent
                            size={48}
                            style={{ color: tech.color }}
                            className="mb-3"
                          />
                        )}
                        <h4 className="text-base font-bold text-gray-900 mb-1">
                          {tech.name}
                        </h4>
                        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          {tech.category}
                        </span>
                      </div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          )}

          {/* ============================================
              PROJECTS SECTION
              ============================================ */}
          {filteredData.projects && (
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                Projects
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredData.projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ delay: index * 0.15 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow cursor-pointer"
                  >
                    {/* Project Image */}
                    <div className="h-40 sm:h-48 overflow-hidden relative group">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      
                      {/* Overlay with Links */}
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                        >
                          <FaExternalLinkAlt size={20} />
                        </a>
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white rounded-full hover:bg-blue-600 hover:text-white transition-colors"
                        >
                          <FaGithub size={20} />
                        </a>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-4 sm:p-6">
                      <h4 className="text-base sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {project.title}
                      </h4>
                      <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 line-clamp-2">
                        {project.description}
                      </p>
                      
                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;

// ============================================
// CARA CUSTOMIZE:
// ============================================
// 1. Data sudah otomatis dari portfolioData.js
// 2. Untuk tambah icon tech stack baru:
//    - Import icon dari react-icons
//    - Tambahkan ke iconMap (line 27-35)
// 3. Ubah warna filter button (line 131-135)
// 4. Card style bisa diubah di:
//    - Certificates: line 168-169
//    - Tech Stack: line 223-224
//    - Projects: line 278-279
// 5. Hover effect bisa disesuaikan di whileHover
// ============================================