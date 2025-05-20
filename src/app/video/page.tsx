"use client";

import VideoCard from "@/features/Video/Components/VideoCard";
import VideoPlayer from "@/features/Video/Components/VideoPlayer";
import { videos } from "@/shared/lib/config/videos";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function VideoPage() {
  const [selectedVideo, setSelectedVideo] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 py-6 pt-20">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Video Section */}
          <motion.div
            className="lg:w-2/3"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-4 transition-all duration-300 hover:shadow-2xl"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <VideoPlayer {...videos[selectedVideo]} />
              <motion.div
                className="mt-4 space-y-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-2xl font-bold text-white">
                  {videos[selectedVideo].title}
                </h1>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {videos[selectedVideo].description}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:w-1/3"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-4"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Up Next</h2>
                <motion.button
                  className="text-gray-400  transition-colors"
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                      clipRule="evenodd"
                    />
                  </svg>
                </motion.button>
              </div>
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                <AnimatePresence mode="wait">
                  {videos.map((video, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: selectedVideo === index ? 1.02 : 1,
                        backgroundColor:
                          selectedVideo === index
                            ? "rgba(255, 255, 255, 0.2)"
                            : "transparent",
                      }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        duration: 0.2,
                        delay: index * 0.1,
                      }}
                      whileHover={{
                        scale: selectedVideo === index ? 1.02 : 1.01,
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      <VideoCard
                        {...video}
                        onClick={() => setSelectedVideo(index)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </motion.div>
  );
}
