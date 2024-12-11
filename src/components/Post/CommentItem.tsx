import { NavLink } from "react-router";
import profileImg from "../../assets/profileImg.jpg";

export default function CommentItem() {
  return (
    <div className="flex flex-col gap-2">
      <NavLink
        to={"/user/userId"}
        className={"flex items-center w-fit gap-[13px] rounded-lg"}
      >
        <img
          className="w-[25px] h-[25px] rounded-full"
          src={profileImg}
          alt="유저 프로필 이미지"
        />
        <span>닉네임</span>
      </NavLink>
      <p className="text-[#666666]">와 너무 축하드려요~</p>
    </div>
  );
}
