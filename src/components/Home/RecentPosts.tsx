import { useNavigate } from "react-router";

export default function RecentPosts({
  title,
  youtubeTitle,
  youtubeThumbnail,
  avatarImg,
  channelName,
  postId,
  userName,
  userId,
}: {
  title: string;
  youtubeTitle: string;
  youtubeThumbnail: string;
  avatarImg: string;
  channelName: string;
  postId: string;
  userName: string;
  userId: string;
}) {
  const navigate = useNavigate();
  const postClick = () => {
    navigate(`/channels/${channelName}/${postId}`);
  };
  const avatarClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    navigate(`/user/${userId}`);
  };
  return (
    <article
      onClick={postClick}
      className="cursor-pointer w-[208px] flex-col rounded-lg overflow-hidden border border-gray-ee dark:border-gray-ee/20"
    >
      <section className="relative h-[178px]">
        <img
          className="w-[208px] h-[178px] object-cover"
          src={youtubeThumbnail}
          alt={title}
        />
        <div className="absolute inset-0 image-shadow"></div>
        <div
          onClick={avatarClick}
          className="group absolute left-2 bottom-2 flex items-center gap-2"
        >
          <img className="w-6 h-6 rounded-full" src={avatarImg} />
          <p className="text-gray-c8 text-sm font-medium group-hover:text-gray-ee">
            {userName}
          </p>
        </div>
      </section>
      <section className="self-stretch p-2 bg-white dark:bg-white/5 flex flex-col gap-2 border-t border-gray-ee dark:border-gray-ee/20">
        <p className="self-stretch text-base font-semibold dark:text-white">
          {title}
        </p>
        <p className="line-clamp-2 text-gray-c8 text-sm font-normal h-10">
          {youtubeTitle}
        </p>
      </section>
    </article>
  );
}
