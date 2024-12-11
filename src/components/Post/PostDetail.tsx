import { NavLink } from "react-router";
import YouTubeContainer from "../common/YoutubeContainer";
import LikeEmptyIcon from "../../assets/LikeEmptyIcon";
import profileImg from "../../assets/profileImg.jpg";

export default function PostDetail() {
  return (
    <section className="grow p-[60px]">
      <YouTubeContainer videoId={"EtiPbWzUY9o"} />
      <h1 className="font-semibold text-2xl mt-5 mb-3">
        AKMU - '낙하 (NAKKA) (with IU)' OFFICIAL VIDEO
      </h1>
      <div className="flex justify-between">
        <NavLink to={"/user/userId"} className="flex gap-3 items-center">
          <img
            className="w-[30px] h-[30px] rounded-full"
            src={profileImg}
            alt="유저 프로필 이미지"
          />
          <p className="font-medium">AKMU</p>
        </NavLink>
        <button
          type="button"
          className="flex justify-center items-center gap-3 border rounded-full border-gray-c8 w-[72px] h-[30px] hover:bg-gray-ee/50 dark:hover:bg-gray-ee/10"
        >
          <LikeEmptyIcon className="w-[14px] h-[14px]" />
          <p>20</p>
        </button>
      </div>
      <hr className="bg-gray-22 dark:bg-gray-ee/50 my-5 border-none h-[1px]" />
      <p className="text-[#6C6C6C] dark:text-gray-c8">
        취업 성공해서 너무 신나요~
      </p>
    </section>
  );
}
