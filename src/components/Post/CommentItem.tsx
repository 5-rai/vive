import { NavLink } from "react-router";
import profileImg from "../../assets/profileImg.jpg";

export default function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className="flex flex-col gap-2">
      <NavLink
        to={`/user/${comment.author._id}`}
        className={"flex items-center gap-[13px]"}
      >
        <img
          className="w-7 h-7 rounded-full object-cover"
          src={comment.author?.image ?? profileImg}
          alt="유저 프로필 이미지"
        />
        <span className="dark:text-white">{comment.author.fullName}</span>
      </NavLink>
      <p className="text-[#666666] dark:text-gray-c8 whitespace-pre-wrap">
        {comment.comment}
      </p>
    </div>
  );
}
