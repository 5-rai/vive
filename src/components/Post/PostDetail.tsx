import { NavLink } from "react-router";
import YouTubeContainer from "../common/YoutubeContainer";
import LikeEmptyIcon from "../../assets/LikeEmptyIcon";
import profileImg from "../../assets/profileImg.jpg";
import { useAuthStore } from "../../store/authStore";
import MoreButton from "./MoreButton";
import LikeIcon from "../../assets/LikeIcon";

export default function PostDetail({
  post,
  handleLikeClick,
  likeCount,
  likeInformation,
}: {
  post: Post;
  likeCount: number;
  likeInformation: Like | null;
  handleLikeClick: () => void;
}) {
  const checkIsMyUserId = useAuthStore((state) => state.checkIsMyUserId);

  if (!post) return null;
  const { title, contents, youtubeUrl } = JSON.parse(post.title);
  const parsedUrl = new URL(youtubeUrl);
  const videoId = new URLSearchParams(parsedUrl.search).get("v");

  return (
    <section className="grow p-[60px]">
      <div className="w-[618px]">
        <YouTubeContainer videoId={videoId} />
        <div className="flex justify-between items-start gap-5 mt-5 mb-4">
          <h1 className="font-semibold text-2xl break-all">{title}</h1>
          {checkIsMyUserId(post.author._id) && <MoreButton post={post} />}
        </div>
        <div className="flex justify-between">
          <NavLink
            to={`/user/${post.author._id}`}
            className="flex gap-3 items-center"
          >
            <img
              className="w-[30px] h-[30px] rounded-full profile"
              src={post.author.image ?? profileImg}
              alt="유저 프로필 이미지"
            />
            <p className="font-medium">{post.author.fullName}</p>
          </NavLink>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="flex justify-center items-center gap-3 border rounded-full border-gray-c8 w-[72px] h-[30px] hover:bg-gray-ee/50 dark:hover:bg-gray-ee/10"
              onClick={handleLikeClick}
            >
              {likeInformation ? (
                <LikeIcon className="w-[14px] h-[14px]" />
              ) : (
                <LikeEmptyIcon className="w-[14px] h-[14px]" />
              )}
              <p>{likeCount}</p>
            </button>
          </div>
        </div>

        <hr className="bg-gray-22 dark:bg-gray-ee/50 my-5 border-none h-[1px]" />
        <p className="text-gray-54 dark:text-gray-c8">{contents}</p>
      </div>
    </section>
  );
}
