import { useNavigate } from "react-router";

export default function RecentPosts({ post }: { post: PostData }) {
  const navigate = useNavigate();

  // 클릭 이벤트 핸들러
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
      className="cursor-pointer w-[208px] flex-col rounded-lg overflow-hidden border border-gray-ee dark:border-gray-ee/20"
    >
      {/* 이미지 섹션 */}
      <section className="relative h-[178px]">
        <img
          className="w-[208px] h-[178px] object-cover"
          src={post.imageUrl}
          alt={post.title}
        />
        <div className="absolute inset-0 image-shadow"></div>
        <div
          onClick={avatarClick}
          className="group absolute left-2 bottom-2 flex items-center gap-2"
        >
          <img
            className="w-6 h-6 rounded-full"
            src={post.avatarImg}
            alt="avatar"
          />
          <p className="text-gray-c8 text-sm font-medium group-hover:text-gray-ee">
            {post.userName}
          </p>
        </div>
      </section>

      {/* 텍스트 섹션 */}
      <section className="self-stretch p-2 bg-white dark:bg-white/5 flex flex-col gap-2 border-t border-gray-ee dark:border-gray-ee/20">
        <p className="self-stretch text-base font-semibold dark:text-white">
          {post.title}
        </p>
        <p className="line-clamp-2 text-gray-c8 text-sm font-normal h-10">
          {post.description}
        </p>
      </section>
    </article>
  );
}
