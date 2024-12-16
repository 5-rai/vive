import LikeIcon from "../../assets/LikeIcon";
import { useEffect, useState } from "react";
import LikeEmptyIcon from "../../assets/LikeEmptyIcon";
import { useNavigate } from "react-router";
import { useAllUserStore } from "../../store/allUserStore";
import { deleteLike, postLike } from "../../api/like";
import { isCustomTitle } from "../../utils/typeGuards";
import { useAuthStore } from "../../store/authStore";
import { useChannelStore } from "../../store/channelStore";

interface PostCardProps {
  post: Post | SearchPost;
  isSearch?: boolean;
}
interface Author {
  _id: string;
  fullName: string;
  image: string | null;
}

export default function PostCard({ post, isSearch = false }: PostCardProps) {
  const navigate = useNavigate();
  const [likeInformation, setLikeInformation] = useState<Like | null>(null);
  const [likeCount, setLikeCount] = useState(post.likes.length);

  const [author, setAuthor] = useState<Author | null>(null);
  const [postInformation, setPostInformation] = useState<CustomTitle | null>(
    null
  );
  const getUser = useAllUserStore((state) => state.getUser);
  const loggedInUser = useAuthStore((state) => state.user);
<<<<<<< HEAD
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
=======
  const getNameFromId = useChannelStore((state) => state.getNameFromId);
>>>>>>> a7ceb555dd46b11824651ceb900d4280e3ccf466

  useEffect(() => {
    parsePostTitle();
    if (isSearch) {
      setSearchPostAuthor();
    } else {
      setPostAuthor();
    }
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

<<<<<<< HEAD
  const findLikeInformation = () => {
    if (!loggedInUser || post.likes.length === 0) return;
    const myInfo =
      (post.likes as Like[]).find((like) => like.user === loggedInUser?._id) ??
      null;
    setLikeInformation(myInfo);
  };

=======
>>>>>>> a7ceb555dd46b11824651ceb900d4280e3ccf466
  const setPostAuthor = () => {
    const author = post.author as User;
    setAuthor({
      fullName: author.fullName,
      image: author.image,
      _id: author._id,
    });
  };

  const setSearchPostAuthor = () => {
    const authorId = post.author as string;

    if (authorId === loggedInUser?._id) {
      setAuthor({
        fullName: loggedInUser?.fullName,
        image: loggedInUser?.image,
        _id: loggedInUser?._id,
      });
    } else {
      const author = getUser(authorId);
      setAuthor({
        fullName: author?.fullName || "",
        image: author?.image || "",
        _id: authorId,
      });
    }
  };

  const handleCardClick = () => {
    if (typeof post.channel === "string") {
      const channelName = getNameFromId(post.channel);
      navigate(`/channels/${channelName}/${post._id}`);
      return;
    }
    navigate(`/channels/${post.channel.name}/${post._id}`);
  };

  const handleProfileClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(`/user/${author?._id}`);
  };

  const handleLikeClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      const result = window.confirm(
        "로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?"
      );
      if (result) navigate("/login");
      else return;
    }

    if (likeInformation) {
      const result = await deleteLike(likeInformation._id);
      if (result) {
        setLikeInformation(null);
        setLikeCount((prev) => Math.max(prev - 1, 0));
      }
    } else {
      const result = await postLike(post._id);
      if (result) {
        setLikeInformation(result);
        setLikeCount((prev) => prev + 1);
      }
    }
  };

  if (!postInformation) return null;

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
          <p className="font-semibold mb-1 line-clamp-1 dark:text-white break-all">
            {postInformation.title}
          </p>
          <p className="text-sm text-[#545454] dark:text-gray-c8 line-clamp-3 whitespace-pre-wrap break-all">
            {postInformation.contents}
          </p>
        </section>
        <section className="flex justify-between w-full">
          <button
            type="button"
            className="flex items-center group/author"
            onClick={handleProfileClick}
          >
            <img
              src={author?.image || "/logo.png"}
              alt={`${author?.fullName}-프로필 이미지`}
              className="w-7 h-7 rounded-full mr-2 bg-white/20 border border-gray-ee"
            />
            <p className="text-sm text-[#6c6c6c] dark:text-gray-c8 group-hover/author:text-gray-22 dark:group-hover/author:text-gray-c8/80 font-medium max-w-[130px] overflow-hidden text-ellipsis whitespace-nowrap">
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
