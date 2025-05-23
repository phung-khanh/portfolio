/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import LanguageGraph from "@/features/Home/Components/LanguageGraph";
import CommitCalendar from "@/features/Project/Components/CommitTree";
import GitHubStats from "@/features/Project/Components/GitHubStatus";
import ProjectCard from "@/features/Project/Components/ProjectCard";
import {
  fetchAllRepositories,
  fetchOrgRepositories,
} from "@/shared/api/github";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaChartPie, FaProjectDiagram } from "react-icons/fa";

export default function Projects() {
  interface Repository {
    id: number;
    name: string;
    html_url: string;
    [key: string]: any;
  }

  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("projects");

  const selectedRepos = [
    "DevPlus_QuizWebsiteAI",
    "final",
    "noel",
    "portfolio",
    "Enterprise-Web-Development_1640",
  ];

  useEffect(() => {
    const loadRepos = async () => {
      try {
        // Pass queryKey as an array
        const personalRepos = await fetchAllRepositories("phung-khanh");
        const orgRepos1 = await fetchOrgRepositories("Team1-DevPlus");
        const orgRepos2 = await fetchOrgRepositories("COMP1640-Greenwich");

        if (!Array.isArray(orgRepos1) || !Array.isArray(orgRepos2)) {
          console.error(
            "Error: Expected an array for orgRepos, but received:",
            orgRepos1
          );
          return;
        }

        const allRepos = [...personalRepos, ...orgRepos1, ...orgRepos2];
        const filteredRepos = allRepos.filter((repo) =>
          selectedRepos.includes(repo.name)
        );

        setRepos(filteredRepos);
      } catch (error) {
        console.error("Error fetching repos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRepos();
  }, []);

  return (
    <div className="py-12 px-6 sm:px-10 lg:px-12 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-extrabold text-blue-400">My Projects</h1>
          <p className="text-lg text-gray-400">
            A collection of my work, experiments, and open-source contributions.
          </p>
        </motion.div>

        {/* Tabs Navigation */}
        <div className="flex justify-center gap-6 mb-10 border-b border-gray-700">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-6 py-3 text-lg font-semibold rounded-t-lg ${
              activeTab === "projects"
                ? "border-b-2 border-blue-500 text-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <FaProjectDiagram className="text-xl" />
            Projects
          </button>

          <button
            onClick={() => setActiveTab("stats")}
            className={`flex items-center gap-2 px-6 py-3 text-lg font-semibold rounded-t-lg ${
              activeTab === "stats"
                ? "border-b-2 border-blue-500 text-blue-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <FaChartPie className="text-xl" />
            GitHub Stats
          </button>
        </div>

        {/* Main Content */}
        {activeTab === "projects" ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {loading
              ? Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <motion.div
                      key={index}
                      className="bg-gray-800 animate-pulse rounded-lg h-80 flex items-center justify-center"
                    >
                      <AiOutlineLoading3Quarters className="text-3xl text-gray-400 animate-spin" />
                    </motion.div>
                  ))
              : repos.map((repo) => (
                  <motion.div key={repo.id}>
                    <ProjectCard project={repo} />
                  </motion.div>
                ))}
          </motion.div>
        ) : (
          <div className="space-y-10">
            {/* Contribution Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl font-semibold mb-4">
                Contribution Activity
              </h2>
              <div className="bg-gray-800 p-6 rounded-lg">
                <CommitCalendar username="phung-khanh" />
              </div>
            </motion.div>

            {/* Stats and Language Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="flex flex-col h-full">
                <h2 className="text-2xl font-semibold mb-4">
                  Language Distribution
                </h2>
                <div className="bg-gray-800 p-6 rounded-lg flex-1">
                  <LanguageGraph
                    repos={repos.map((repo) => ({
                      language: repo.language || "Unknown",
                    }))}
                  />
                </div>
              </div>

              <div className="flex flex-col h-full">
                <h2 className="text-2xl font-semibold mb-4">GitHub Stats</h2>
                <div className="bg-gray-800 p-6 rounded-lg flex-1 flex items-center justify-center">
                  <GitHubStats username="phung-khanh" />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
