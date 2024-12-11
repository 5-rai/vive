import { useNavigate } from "react-router";

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
    <article
      onClick={postClick}
      className="cursor-pointer w-[208px] backdrop:rounded-lg flex-col"
    >
      <section className="relative h-[178px] rounded-tl-lg rounded-tr-lg border-r border-gray-ee overflow-hidden">
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
            avatar
          </p>
        </div>
      </section>
      <section className="self-stretch p-2 bg-white rounded-bl-lg rounded-br-lg border-l border-r border-b border-gray-ee flex flex-col gap-2">
        <p className="self-stretch text-gray-22 text-base font-semibold">
          {title}
        </p>
        <p className="line-clamp-2 text-gray-c8 text-sm font-normal h-10">
          {youtubeTitle}
        </p>
      </section>
    </article>
  );
}
