import { Link } from "react-router";
import profileImg from "../../assets/profileImg.jpg";

export default function CommentItem() {
  return (
    <div className="flex flex-col gap-2">
      <Link to={"/user/userId"} className={"flex items-center gap-[13px]"}>
        <img
          className="w-7 h-7 rounded-full object-cover"
          src={profileImg}
          alt="유저 프로필 이미지"
        />
        <span className="dark:text-white">닉네임</span>
      </Link>
      <p className="text-[#666666] dark:text-gray-c8 whitespace-pre-wrap">
        '와 너무 축하드려요~'
      </p>
    </div>
  );
}
