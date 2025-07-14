import { SpotifyTrack } from "@/shared/types/spotify";
import React, { useRef, useState } from "react";

interface SpotifyPlayerProps {
  track: SpotifyTrack;
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ track }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Pause when preview ends
  const handleEnded = () => setIsPlaying(false);

  return (
    <div className="flex items-center gap-4 bg-gray-900 rounded-lg p-4 shadow-md w-full max-w-md">
      <img
        src={track.album.images[0]?.url}
        alt={track.album.name}
        className="w-16 h-16 rounded shadow"
      />
      <div className="flex-1">
        <div className="font-semibold text-white truncate">{track.name}</div>
        <div className="text-sm text-gray-300 truncate">
          {track.artists.map((a) => a.name).join(", ")} &ndash;{" "}
          {track.album.name}
        </div>
        <div className="mt-2">
          {track.preview_url ? (
            <button
              onClick={handlePlayPause}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              {isPlaying ? "Pause" : "Play Preview"}
            </button>
          ) : (
            <span className="text-xs text-gray-400">No preview available</span>
          )}
        </div>
      </div>
      {track.preview_url && (
        <audio ref={audioRef} src={track.preview_url} onEnded={handleEnded} />
      )}
    </div>
  );
};

export default SpotifyPlayer;
