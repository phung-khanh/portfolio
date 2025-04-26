/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as echarts from "echarts";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function LanguageGraph({
  repos,
}: {
  repos: { language: string | number }[];
}) {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef.current || repos.length === 0) return;

    const languages: Record<string, number> = {};
    repos.forEach((repo) => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });

    const sortedLanguages = Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6);

    const total = sortedLanguages.reduce((sum, [_, count]) => sum + count, 0);

    const colors = {
      JavaScript: "#f7df1e",
      TypeScript: "#3178c6",
      HTML: "#e34c26",
      CSS: "#563d7c",
      default: "#6366f1",
    };

    const chart = echarts.init(chartRef.current);

    const option: echarts.EChartsOption = {
      series: [
        {
          name: "Languages",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          padAngle: 7,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 12,
              fontWeight: "bold",
              formatter: "{b}\n{d}%",
            },
          },
          labelLine: {
            show: false,
          },
          data: sortedLanguages.map(([language, count]) => ({
            value: count,
            name: language,
            itemStyle: {
              color: colors[language as keyof typeof colors] || colors.default,
            },
          })),
        },
      ],
    };

    chart.setOption(option as any);

    // Cleanup chart instance when unmounting
    return () => {
      chart.dispose();
    };
  }, [repos]);

  const languageCounts: Record<string, number> = {};
  repos.forEach((repo) => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
  });
  const sortedLanguages = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const total = sortedLanguages.reduce((sum, [_, count]) => sum + count, 0);

  const colors = {
    JavaScript: "#f7df1e",
    TypeScript: "#3178c6",
    HTML: "#e34c26",
    CSS: "#563d7c",
    default: "#6366f1",
  };

  return (
    <div className="flex flex-col md:flex-row items-center">
      <div className="relative w-48 h-48">
        <div ref={chartRef} className="w-full h-full" />
      </div>
      <div className="mt-4 md:mt-0 md:ml-6 flex-grow">
        {sortedLanguages.map(([language, count], index) => (
          <motion.div
            key={language}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-2 last:mb-0"
          >
            <div className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{
                  backgroundColor:
                    colors[language as keyof typeof colors] || colors.default,
                }}
              ></div>
              <span className="text-sm">{language}</span>
              <span className="ml-auto text-sm text-gray-400">
                {((count / total) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-700 h-1.5 mt-1 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(count / total) * 100}%`,
                  backgroundColor:
                    colors[language as keyof typeof colors] || colors.default,
                }}
              ></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
