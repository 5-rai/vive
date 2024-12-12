import LikeIcon from "../../assets/LikeIcon";
import { useEffect, useState } from "react";
import LikeEmptyIcon from "../../assets/LikeEmptyIcon";
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import Temp from "../../assets/youtube-temp.avif";
import DefaultProfileImage from "./DefaultProfileImage";
import { useAllUserStore } from "../../store/allUserStore";

export default function PostCard({ post }: { post: Post | SearchPost }) {
  const navigate = useNavigate();
  const [isCurrentLiked, setIsCurrentLiked] = useState(false);
  const [author, setAuthor] = useState<User | undefined>();
  const postInformation = JSON.parse(post.title);
  const { findUserById } = useAllUserStore();
  const isWriter = !true; // zustand로 유저 id 관리 + 현 로그인 id와 작성자 id 비교

  useEffect(() => {
    if (typeof post.author === "string") {
      const user = findUserById(post.author, useAllUserStore.getState());
      setAuthor(user);
    } else {
      setAuthor(post.author);
    }
  }, [findUserById, post.author]);

  const handleCardClick = () => {
    if (typeof post.channel === "string") {
      navigate(`/channels/${post.channel}/${post._id}`);
      return;
    }
    navigate(`/channels/${post.channel._id}/${post._id}`);
  };

  const handleProfileClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (typeof post.author === "string") {
      navigate(`/user/${post.author}`);
      return;
    }
    navigate(`/user/${post.author._id}`);
  };

  return (
    <article
      className="rounded-lg overflow-hidden border border-gray-ee dark:border-gray-ee/20 flex w-[447px] h-[163px] cursor-pointer"
      onClick={handleCardClick}
    >
      <img
        src={post.image || Temp} /* 임시 */
        alt={`${postInformation.title}-썸네일 이미지`}
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
            {postInformation.title}
          </p>
          <p
            className={twMerge(
              "text-sm text-gray-c8 dark:text-gray-ee",
              isWriter ? "line-clamp-4 h-20" : "line-clamp-3"
            )}
          >
            {postInformation.contents}
          </p>
        </section>
        {!isWriter && (
          <section className="flex justify-between w-full">
            <button
              type="button"
              className="flex items-center group"
              onClick={handleProfileClick}
            >
              {author?.image ? (
                <img
                  src={author.image} /* 임시 */
                  alt={`${author.fullName}-프로필 이미지`}
                  className="w-7 h-7 rounded-full mr-2"
                />
              ) : (
                <DefaultProfileImage className="w-7 h-7 p-1.5 mr-2 border border-gray-ee dark:border-[#4B4B4B]" />
              )}
              <p className="text-sm text-[#6c6c6c] dark:text-gray-c8 group-hover:text-gray-22 dark:group-hover:text-gray-c8/80 font-medium">
                {author?.fullName}
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
              <p>{post.likes.length}</p>
            </button>
          </section>
        )}
      </section>
    </article>
  );
}
