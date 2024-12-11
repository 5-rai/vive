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
    <a
      href={url}
      target="_blank"
      rel="noreferrer noopener"
      className="bg-white hover:bg-gray-ee transition-colors"
    >
      <article className="border border-gray-c8 rounded-lg p-5 flex gap-20 justify-between">
        <section className="w-full max-w-[1000px] flex flex-col justify-between">
          <div className="">
            <p className="font-semibold text-xl dark:text-gray-22">{title}</p>
            <p className="text-sm line-clamp-2 dark:text-gray-c8">
              {description}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <img src={YoutubeIcon} alt="유튜브 아이콘" />
            <p className="text-gray-22/70">{url}</p>
          </div>
        </section>
        <img src={thumbnail} alt="유튜브 썸네일" className="h-32" />
      </article>
    </a>
  );
}
