"use client";
import { motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";

export default function Resume() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const education = [
    {
      degree: "Upper Second Honour | Information Technology",
      school: "University of Greenwich",
      year: "2021 - 2025",
    },
  ];

  const projects = [
    {
      title: "University Test Exam Website",
      company: "Devplus Company",
      year: "Feb 2025 - Apr 2025",
      technologies: "JavaScript, ReactJS, Antd Design, ",
      github: "",
    },
    {
      title: "Quiz App - Quiz AI Generation",
      company: "Devplus Company",
      year: "Feb 2025 - Mar 2025",
      technologies: "JavaScript, HTML, CSS ",
      github: "https://github.com/Team1-DevPlus/DevPlus_QuizWebsiteAI",
    },
    {
      title: "Noel Techshop - Electronics Sales Website",
      company: "University of Greenwich",
      year: "Jan 2024 - Dec 2024",
      technologies: "ReactJS, Tailwind CSS, NodeJS, ExpressJS, MongoDB",
      github: "https://github.com/punhnahk/final",
    },
    {
      title: "Student Contribution Website",
      company: "University of Greenwich",
      year: "Jan 2024 - Apr 2024",
      technologies: ".NET Framework, C#, JavaScript, Bootstrap",
      github:
        "https://github.com/yourgithub/student-contributionhttps://github.com/COMP1640-Greenwich/Enterprise-Web-Development_1640",
    },
  ];

  const experience = [
    {
      title: "Intern Developer",
      company: "Devplus Company",
      year: "Feb 2025 - Apr 2025",
      technologies:
        "Full-stack Development, ReactJs, NodeJS, Express, JavaScript",
    },
  ];

  const skills = [
    "JavaScript",
    "TypeScript",
    "ReactJS",
    "TailwindCSS",
    "NodeJS",
    "ExpressJS",
    "MongoDB",
    "Antd Design",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white px-6 py-12 pt-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="show"
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-3xl font-extrabold text-blue-400">Resume</h1>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2"
          >
            Download CV
          </a>
        </motion.div>

        {/* Education */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          className="mb-8"
        >
          <h2 className="text-xl font-bold text-yellow-400">Education</h2>
          {education.map((edu, index) => (
            <div
              key={index}
              className="mt-2 p-4 bg-gray-800 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold">{edu.degree}</h3>
              <p className="text-sm text-gray-400">
                {edu.school} | {edu.year}
              </p>
            </div>
          ))}
        </motion.section>

        <motion.section
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          className="mb-8"
        >
          <h2 className="text-xl font-bold text-orange-400">Experience</h2>
          {experience.map((exp, index) => (
            <div
              key={index}
              className="mt-2 p-4 bg-gray-800 rounded-lg shadow-md"
            >
              <h3 className="text-lg font-semibold">{exp.title}</h3>
              <p className="text-sm text-gray-400">
                {exp.company} | {exp.year}
              </p>
              <p className="text-xs text-blue-300 mt-1">{exp.technologies}</p>
            </div>
          ))}
        </motion.section>

        {/* Projects */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          className="mb-8"
        >
          <h2 className="text-xl font-bold text-green-400">Projects</h2>
          {projects.map((project, index) => (
            <div
              key={index}
              className="mt-2 p-4 bg-gray-800 rounded-lg shadow-md relative"
            >
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-sm text-gray-400">
                {project.company} | {project.year}
              </p>
              <p className="text-xs text-blue-300 mt-1">
                {project.technologies}
              </p>
              <div className="flex justify-between">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-2 right-2 text-blue-400 text-sm underline"
                >
                  <FaGithub />
                </a>
              </div>
            </div>
          ))}
        </motion.section>

        {/* Experience */}

        {/* Skills */}
        <motion.section
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          className="mb-8"
        >
          <h2 className="text-xl font-bold text-pink-400">Skills</h2>
          <div className="flex flex-wrap gap-2 mt-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-gray-700 text-sm px-3 py-1 rounded-full shadow-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
