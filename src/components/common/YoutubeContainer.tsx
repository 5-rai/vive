import YouTube, { YouTubeProps } from "react-youtube";

export default function YouTubeContainer({ videoId }: { videoId?: string }) {
  const opts: YouTubeProps["opts"] = {
    height: "334",
    width: "596",
    playerVars: {
      rel: 0,
      modestbranding: 1,
    },
  };

  if (!videoId) return null;
  return <YouTube videoId={videoId} opts={opts} />;
}
