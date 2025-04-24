"use client";
import Type from "@/features/Home/Components/TypeWriter";
import ava from "@/shared/assets/avatar.jpg";
import { motion } from "framer-motion";
import Link from "next/link";
import { DiGithubBadge } from "react-icons/di";
import { FaFigma, FaJs, FaNodeJs, FaReact } from "react-icons/fa";
import {
  SiMongodb,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

const skills = [
  { name: "ReactJS", icon: <FaReact className="text-blue-400 text-3xl" /> },
  { name: "JavaScript", icon: <FaJs className="text-yellow-400 text-3xl" /> },
  {
    name: "TypeScript",
    icon: <SiTypescript className="text-blue-500 text-3xl" />,
  },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500 text-3xl" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-black text-3xl" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-400 text-3xl" /> },
  {
    name: "TailwindCSS",
    icon: <SiTailwindcss className="text-teal-400 text-3xl" />,
  },
  {
    name: "GitHub",
    icon: <DiGithubBadge className="text-gray-400 text-3xl" />,
  },
  { name: "Figma", icon: <FaFigma className="text-fuchsia-500 text-3xl" /> },
];

export default function Home() {
  return (
    <div className="w-full text-white bg-gradient-to-br from-gray-900 to-gray-800">
      {/* <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-50">
        {["Home", "About", "Projects", "Contact"].map((item, index) => (
          <motion.li
            key={index}
            className="group flex items-center gap-2 p-2 bg-gray-700 rounded-l-lg shadow-md cursor-pointer hover:bg-blue-500 transition-all"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="text-white hidden group-hover:inline-block">
              {item}
            </span>
          </motion.li>
        ))}
      </div> */}
      {/* Hero Section */}
      <section className="relative flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-16 md:py-24 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-4">
            PHUNG KHANH
          </h1>
          <div className="pb-8 text-2xl">
            <Type />
          </div>
          {/* <p className="text-lg text-gray-300 mb-6">
            Frontend Developer specializing in creating beautiful, responsive
            web applications with React and modern CSS frameworks.
          </p> */}
          <div className="flex gap-4 justify-center md:justify-start">
            <Link
              href="/about"
              className="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition shadow-lg"
            >
              About Me
            </Link>
            <Link
              href="/project"
              className="px-6 py-3 rounded-lg border border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white font-semibold transition shadow-lg"
            >
              Portfolio
            </Link>
          </div>
          <div className="mt-6">
            <a
              href="https://github.com/punhnahk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              View my GitHub Repositories →
            </a>
          </div>
        </motion.div>

        <motion.img
          src={ava.src}
          alt="Profile"
          className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-blue-500 shadow-lg object-cover mt-8 md:mt-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{
            scale: 1.15,
            rotate: [0, 2, -2, 0],
            boxShadow: "0px 10px 20px rgba(0, 0, 255, 0.4)",
            filter: "brightness(1.2) contrast(1.1)",
          }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
          }}
        />
      </section>

      {/* Skills Section */}
      <section className="py-22 px-8 md:px-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Skills & Technologies
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-800 hover:bg-gray-600 rounded-lg p-4 flex flex-col items-center shadow-md"
              >
                {skill.icon}
                <span className="font-medium text-white mt-2">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
