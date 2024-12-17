import { Link, useNavigate } from "react-router";

export default function RecentPosts({
  title,
  youtubeTitle,
  youtubeThumbnail,
  avatarImg,
}: {
  title: string;
  youtubeTitle: string;
  youtubeThumbnail: string;
  avatarImg: string;
}) {
  const navigate = useNavigate();
  const postClick = () => {
    navigate("/channels/channelName/postId");
  };
  const avatarClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    navigate("/user/userId");
  };
  return (
    <Link to="">
      <article
        onClick={postClick}
        className="group w-[208px] flex-col rounded-lg overflow-hidden border border-gray-ee dark:border-gray-ee/20"
      >
        <section className="relative h-[178px]">
          <div className="w-[208px] h-full">
            <img
              className="object-cover w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              src={youtubeThumbnail}
              alt={title}
            />
          </div>
          <div className="absolute inset-0 image-shadow"></div>
          <div
            onClick={avatarClick}
            className="group absolute left-2 bottom-2 flex items-center gap-2"
          >
            <img className="w-7 h-7 rounded-full profile" src={avatarImg} />
            <p className="text-gray-c8 text-sm font-medium group-hover:text-gray-ee overflow-hidden text-ellipsis whitespace-nowrap">
              avatar
            </p>
          </div>
        </section>
        <section className="p-2 bg-white dark:bg-white/5 flex flex-col gap-2 border-t border-gray-ee dark:border-gray-ee/20">
          <p className="text-base font-semibold dark:text-white line-clamp-1 break-all">
            {title}
          </p>
          <p className="line-clamp-2 text-gray-54 text-sm font-normal h-10 break-all">
            {youtubeTitle}
          </p>
        </section>
      </article>
    </Link>
  );
}
