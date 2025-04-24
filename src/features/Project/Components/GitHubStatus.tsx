import { fetchUserStats } from "@/shared/api/github";
import { UserStats } from "@/shared/api/github/types/IUserStats";
import { useEffect, useState } from "react";

export default function GitHubStats({ username }: { username: string }) {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) return;
    const loadStats = async () => {
      try {
        const data = await fetchUserStats(username);
        if (!data) {
          throw new Error("No data returned from GitHub API");
        }
        setStats(data);
      } catch (error) {
        console.error("Error fetching user stats:", error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, [username]);

  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            className="bg-gray-700 animate-pulse h-24 rounded-lg"
          ></div>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center text-gray-400">
        Failed to load GitHub stats
      </div>
    );
  }

  const statItems = [
    { icon: "⭐", label: "Total Stars", value: stats.totalStars },
    { icon: "👥", label: "Followers", value: stats.followers },
    { icon: "👤", label: "Following", value: stats.following },
    { icon: "📦", label: "Repositories", value: stats.publicRepos },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {statItems.map((item, index) => (
        <div key={index} className="bg-gray-700 p-4 rounded-lg text-center">
          <div className="text-xl mb-1">{item.icon}</div>
          <div className="text-2xl font-bold">{item.value}</div>
          <div className="text-xs text-gray-400">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
