import { NavLink } from "react-router";
import profileImg from "../../assets/profileImg.jpg";

export default function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className="flex flex-col gap-2">
      <NavLink
        to={`/user/${comment.author._id}`}
        className={"flex items-center w-fit gap-[13px] rounded-lg"}
      >
        <img
          className="w-[25px] h-[25px] rounded-full"
          src={comment.author?.image ?? profileImg}
          alt="유저 프로필 이미지"
        />
        <span>{comment.author.fullName}</span>
      </NavLink>
      <p className="text-[#6C6C6C]">{comment.comment}</p>
    </div>
  );
}
