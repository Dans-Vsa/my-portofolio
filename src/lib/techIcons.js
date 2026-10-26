import {
  FaBootstrap,
  FaCode,
  FaCss3Alt,
  FaDocker,
  FaFigma,
  FaGitAlt,
  FaHtml5,
  FaJava,
  FaLaravel,
  FaNodeJs,
  FaPhp,
  FaPython,
  FaReact,
} from 'react-icons/fa';
import {
  SiFastapi,
  SiGodotengine,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiSqlite,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from 'react-icons/si';

// portfolioData stores icon names as strings; resolve them here.
const TECH_ICONS = {
  FaBootstrap,
  FaCode,
  FaCss3Alt,
  FaDocker,
  FaFigma,
  FaGitAlt,
  FaHtml5,
  FaJava,
  FaLaravel,
  FaNodeJs,
  FaPhp,
  FaPython,
  FaReact,
  SiFastapi,
  SiGodotengine,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiSqlite,
  SiTailwindcss,
  SiTypescript,
  SiVite,
};

export const getTechIcon = (name) => TECH_ICONS[name] ?? FaCode;

export const TECH_CATEGORIES = ['Frontend', 'Language', 'Backend', 'Database', 'Game', 'Design', 'Tools'];
