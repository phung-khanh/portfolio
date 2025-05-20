interface VideoProps {
  source: string;
  title: string;
  thumbnail?: string;
  description?: string;
}

const VideoCard = ({
  source,
  title,
  thumbnail,
  onClick,
}: VideoProps & { onClick: () => void }) => {
  const getYouTubeThumbnail = (url: string) => {
    let videoId = "";
    if (url.includes("watch?v=")) {
      videoId = url.split("watch?v=")[1]?.split("&")[0] || "";
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
    } else if (url.includes("embed/")) {
      videoId = url.split("embed/")[1]?.split("?")[0] || "";
    }
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  };

  return (
    <div
      onClick={onClick}
      className="flex gap-2 p-2 cursor-pointer hover:bg-gray-100 hover:rounded-2xl rounded-2xl transition-colors"
    >
      <div className="relative w-40 h-24 flex-shrink-0">
        <img
          src={thumbnail || getYouTubeThumbnail(source)}
          alt={title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm line-clamp-2 text-black">{title}</h3>
      </div>
    </div>
  );
};

export default VideoCard;
