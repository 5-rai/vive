import LikeIcon from "../../assets/LikeIcon";
import { useEffect, useState } from "react";
import LikeEmptyIcon from "../../assets/LikeEmptyIcon";
import { useNavigate } from "react-router";
import DefaultProfileImage from "./DefaultProfileImage";
import { useAllUserStore } from "../../store/allUserStore";
import { deleteLike, postLike } from "../../api/like";
import { isCustomTitle } from "../../utils/typeGuards";

const TEMP_ID = "6756d174f51b1507588c1bcf";

interface PostCardProps {
  post: Post | SearchPost;
  keyword?: string;
}

interface Author {
  _id: string;
  fullName: string;
  image: string;
}

export default function PostCard({ post, keyword }: PostCardProps) {
  const navigate = useNavigate();
  const [likeInformation, setLikeInformation] = useState<Like | null>(null);
  const [likeCount, setLikeCount] = useState(post.likes.length);
  const [author, setAuthor] = useState<Author | null>(null);
  const [postInformation, setPostInformation] = useState<CustomTitle | null>(
    null
  );
  const { users } = useAllUserStore();

  useEffect(() => {
    parsePostTitle();
    setAuthorInformation();
    findLikeInformation();
  }, []);

  const parsePostTitle = () => {
    try {
      const parsed = JSON.parse(post.title);
      if (isCustomTitle(parsed)) {
        setPostInformation(parsed);
      } else {
        setPostInformation(null);
      }
    } catch (err) {
      console.error(err);
      setPostInformation(null);
    }
  };

  const setAuthorInformation = () => {
    if (typeof post.author === "string") {
      if (post.author === TEMP_ID) {
        setAuthor({
          fullName: "임시 사용자",
          image: "",
          _id: TEMP_ID,
        });
      } else {
        const user = users.find((user) => user._id === post.author);
        setAuthor({
          fullName: user?.fullName || "삭제된 사용자",
          image: user?.image || "",
          _id: post.author,
        });
      }
    } else {
      setAuthor({
        fullName: post.author.fullName,
        image: post.author.image,
        _id: post.author._id,
      });
    }
  };

  const findLikeInformation = () => {
    // 좋아요 정보 찾기
    const likeInformation =
      post.likes.find((like) => like.user === TEMP_ID) ?? null;
    setLikeInformation(likeInformation);
  };

  const handleCardClick = () => {
    if (typeof post.channel === "string") {
      navigate(`/channels/${post.channel}/${post._id}`);
      return;
    }
    navigate(`/channels/${post.channel._id}/${post._id}`);
  };

  const handleProfileClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(`/user/${author?._id}`);
  };

  const handleLikeClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (likeInformation) {
      const result = await deleteLike(likeInformation._id);
      if (result) {
        setLikeInformation(null);
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
          src={postInformation.image}
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
                src={author.image}
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
