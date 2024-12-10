import YoutubeIcon from "../../assets/youtube.png";

interface BookmarkProps {
  title: string;
  description: string;
  url: string;
  thumbnail: string;
}

export default function Bookmark({
  title,
  description,
  url,
  thumbnail,
}: BookmarkProps) {
  return (
    <article className="border border-gray-c8 rounded-lg bg-white p-5 flex gap-20 justify-between">
      <section className="w-full max-w-[1000px] flex flex-col justify-between">
        <div>
          <p className="font-semibold text-xl">{title}</p>
          <p className="text-sm line-clamp-2">{description}</p>
        </div>
        <a href={url} target="_blank" className="flex items-center gap-1">
          <img src={YoutubeIcon} alt="유튜브 아이콘" />
          <p className="text-gray-22/70">{url}</p>
        </a>
      </section>
      <img src={thumbnail} alt="temp" className="h-32" />
    </article>
  );
}
