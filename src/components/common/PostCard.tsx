import LikeIcon from "../../assets/LikeIcon";
import { useEffect, useState } from "react";
import LikeEmptyIcon from "../../assets/LikeEmptyIcon";
import { useNavigate } from "react-router";
import Temp from "../../assets/youtube-temp.avif";
import DefaultProfileImage from "./DefaultProfileImage";
import { useAllUserStore } from "../../store/allUserStore";
import { deleteLike, postLike } from "../../api/like";

const TEMP_ID = "6756d174f51b1507588c1bcf";

interface PostCardProps {
  post: Post | SearchPost;
  keyword?: string;
}

export default function PostCard({ post, keyword }: PostCardProps) {
  const navigate = useNavigate();
  const [likeInformation, setLikeInformation] = useState<Like | undefined>();
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [author, setAuthor] = useState<User | undefined>();
  const [postInformation, setPostInformation] = useState<
    CustomTitle | undefined | null
  >(null);
  const { findUserById } = useAllUserStore();

  useEffect(() => {
    // 이전 테스트로 생성된 데이터로 인해 추가된 코드
    // parsed가 CustomTitle 타입이 아닐 경우를 대비하여 타입 체크
    try {
      const parsed = JSON.parse(post.title);
      if (
        typeof parsed.youtubeUrl !== "string" ||
        typeof parsed.title !== "string" ||
        typeof parsed.contents !== "string"
      ) {
        setPostInformation(null);
        return;
      }
      setPostInformation(parsed);
    } catch (err) {
      console.error(err);
      setPostInformation(null);
    }

    if (typeof post.author === "string") {
      const user = findUserById(post.author, useAllUserStore.getState());
      setAuthor(user);
    } else {
      setAuthor(post.author);
      console.log(post.author);
    }

    // 좋아요 정보 찾기
    const likeInformation = post.likes.find((like) => like.user === TEMP_ID);
    setLikeInformation(likeInformation);
  }, []);

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

  const handleLikeClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (likeInformation) {
      const result = await deleteLike(likeInformation._id);
      if (result) {
        setLikeInformation(undefined);
        setLikeCount((prev) => prev - 1);
      }
    } else {
      const result = await postLike(post._id);
      if (result) {
        setLikeInformation(result);
        setLikeCount((prev) => prev + 1);
      }
    }
  };

  // 이전 테스트로 생성된 데이터로 인해 추가된 코드
  if (!postInformation) return null;

  if (
    keyword &&
    ![
      postInformation.title,
      postInformation.contents,
      postInformation.youtubeUrl,
    ].some((field) => field.includes(keyword))
  ) {
    return null;
  }

  return (
    <article
      className="group/all rounded-lg overflow-hidden border border-gray-ee dark:border-gray-ee/20 flex w-[447px] h-[163px] cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex-shrink-0 relative w-[170px] h-full overflow-hidden">
        <img
          src={post.image || Temp} /* 임시 */
          alt={`${postInformation.title}-썸네일 이미지`}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover/all:scale-105"
        />
      </div>
      <section className="w-full px-4 py-3 flex flex-col justify-between border-l border-gray-ee dark:border-gray-ee/20 bg-white dark:bg-white/5">
        <section className="flex flex-col h-full">
          <p className="font-semibold mb-1 line-clamp-1 dark:text-white">
            {postInformation.title}
          </p>
          <p className="text-sm text-[#545454] dark:text-gray-c8 line-clamp-3">
            {postInformation.contents}
          </p>
        </section>
        <section className="flex justify-between w-full">
          <button
            type="button"
            className="flex items-center group/author"
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
            <p className="text-sm text-[#6c6c6c] dark:text-gray-c8 group-hover/author:text-gray-22 dark:group-hover/author:text-gray-c8/80 font-medium">
              {author?.fullName}
            </p>
          </button>
          <button
            type="button"
            className="rounded-full border border-gray-c8 flex items-center gap-[6px] px-2 py-[1px] hover:bg-gray-ee/50 dark:hover:bg-gray-ee/10"
            onClick={handleLikeClick}
          >
            {likeInformation ? (
              <LikeIcon className="w-4 h-4" />
            ) : (
              <LikeEmptyIcon className="w-4 h-4" />
            )}
            <p>{likeCount}</p>
          </button>
        </section>
      </section>
    </article>
  );
}
