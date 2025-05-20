interface VideoProps {
  source: string;
  title: string;
  thumbnail?: string;
  description?: string;
}

const VideoPlayer = ({ source, title }: VideoProps) => {
  const getYouTubeEmbedUrl = (url: string) => {
    // Handle different YouTube URL formats
    let videoId = "";
    if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1]?.split("&")[0] || "";
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
    } else if (url.includes("embed/")) {
      videoId = url.split("embed/")[1]?.split("?")[0] || "";
    }
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="w-full aspect-video">
      <iframe
        className="w-full h-full rounded-2xl"
        src={getYouTubeEmbedUrl(source)}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default VideoPlayer;
