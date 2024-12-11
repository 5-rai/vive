import LikeIcon from "../../assets/LikeIcon";
import { useState } from "react";
import LikeEmptyIcon from "../../assets/LikeEmptyIcon";
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import ProfileImg from "../../assets/profileImg.jpg";
import Temp from "../../assets/youtube-temp.avif";
import Logo from "../../assets/Logo";

export default function PostCard({
  post,
  writer,
  like,
  isLiked,
}: PostCardProps) {
  const navigate = useNavigate();
  const [isCurrentLiked, setIsCurrentLiked] = useState(isLiked);
  const isWriter = !true;

  return (
    <article
      className="rounded-lg overflow-hidden border border-gray-ee dark:border-gray-ee/20 flex w-[447px] h-[163px] cursor-pointer"
      onClick={() => {
        navigate(`/channels/${post.channelName}/${post.postId}`);
      }}
    >
      <img
        src={post.thumbnail || Temp} /* 임시 */
        alt={`${post.title}-썸네일 이미지`}
        className="w-[170px] object-cover flex-shrink-0"
      />
      <section className="w-full px-4 py-3 flex flex-col justify-between border-l border-gray-ee dark:border-gray-ee/20 bg-white dark:bg-white/5">
        <section
          className={twMerge(
            "flex flex-col h-full",
            isWriter && "justify-around"
          )}
        >
          <p className="font-semibold mb-1 line-clamp-1 dark:text-white">
            {post.title}
          </p>
          <p
            className={twMerge(
              "text-sm text-gray-c8 dark:text-gray-ee",
              isWriter ? "line-clamp-4 h-20" : "line-clamp-3"
            )}
          >
            {post.content}
          </p>
        </section>
        {!isWriter && (
          <section className="flex justify-between w-full">
            <button
              type="button"
              className="flex items-center group"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/user/${writer.userId}`);
              }}
            >
              {writer.profileImg ? (
                <img
                  src={writer.profileImg || ProfileImg} /* 임시 */
                  alt={`${writer.name}-프로필 이미지`}
                  className="w-7 h-7 rounded-full mr-2"
                />
              ) : (
                <div className="w-7 h-7 rounded-full mr-2 border border-gray-ee flex items-center justify-center bg-white/20">
                  <Logo className="w-3 h-3" />
                </div>
              )}
              <p className="text-sm text-[#6c6c6c] dark:text-gray-c8 group-hover:text-gray-22 font-medium">
                {writer.name}
              </p>
            </button>
            <button
              type="button"
              className="rounded-full border border-gray-c8 flex items-center gap-[6px] px-2 py-[1px] hover:bg-gray-ee/50 dark:hover:bg-gray-ee/10"
              onClick={(e) => {
                e.stopPropagation();
                setIsCurrentLiked((prev) => !prev);
                // TODO: 좋아요 API 호출
                // TODO: 좋아요 수 업데이트
              }}
            >
              {isCurrentLiked ? (
                <LikeIcon className="w-4 h-4" />
              ) : (
                <LikeEmptyIcon className="w-4 h-4" />
              )}
              <p>{like}</p>
            </button>
          </section>
        )}
      </section>
    </article>
  );
}
