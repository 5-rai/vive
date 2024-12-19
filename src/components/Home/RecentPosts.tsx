import { useNavigate } from "react-router";

export default function RecentPosts({ post }: { post: PostData }) {
  const navigate = useNavigate();

  const postClick = () => {
    navigate(`/channels/${post.channelName}/${post.postId}`);
  };

  const avatarClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    navigate(`/user/${post.userId}`);
  };

  return (
    <article
      onClick={postClick}
      className="group w-[208px] flex-col rounded-lg overflow-hidden border border-gray-ee dark:border-gray-ee/20 cursor-pointer"
    >
      <section className="relative h-[178px]">
        <div className="w-[208px] h-full overflow-hidden">
          <img
            className="object-cover w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            src={post.imageUrl}
            alt={post.title}
          />
        </div>
        <div className="absolute inset-0 image-shadow"></div>
        <div
          onClick={avatarClick}
          className="group absolute left-2 bottom-2 flex items-center gap-2"
        >
          <img
            className="w-7 h-7 rounded-full profile"
            src={post.avatarImg}
            alt={post.userName}
          />
          <p className="text-gray-c8 text-sm font-medium group-hover:text-gray-ee overflow-hidden text-ellipsis whitespace-nowrap">
            {post.userName}
          </p>
        </div>
      </section>
      <section className="p-2 bg-white dark:bg-white/5 flex flex-col gap-2 border-t border-gray-ee dark:border-gray-ee/20">
        <p className="text-base font-semibold dark:text-white line-clamp-1 break-all">
          {post.title}
        </p>
        <p className="line-clamp-2 text-gray-54 text-sm font-normal h-10 break-all">
          {post.description}
        </p>
      </section>
    </article>
  );
}
