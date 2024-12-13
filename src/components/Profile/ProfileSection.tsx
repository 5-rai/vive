import { Link } from "react-router";
import ProfileTemp from "../../assets/profileImg.jpg";
import { USER_INFO } from "../../constants/profile";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Logo from "../../assets/Logo";

const TEMP_USER = {
  name: "음악하는 다람쥐",
  image: ProfileTemp,
  information: {
    postCount: 4,
    followerCount: 4,
    followingCount: 4,
  },
};

export default function ProfileSection({
  isMyProfile = false,
}: {
  isMyProfile?: boolean;
}) {
  const [isFollow, setIsFollow] = useState(false);

  return (
    <article className="border-b border-gray-ee dark:border-gray-ee/50 flex justify-center items-center gap-20 mb-10 p-10 w-full">
      {/* 정훈님 컴포넌트 재사용? */}
      <div className="flex flex-col gap-2 items-center">
        {TEMP_USER.image ? (
          <img
            src={TEMP_USER.image}
            alt="프로필 이미지"
            className="w-[124px] h-[124px] rounded-full profile-shadow border border-gray-ee"
          />
        ) : (
          <div className="w-[124px] h-[124px] rounded-full flex items-center justify-center border border-gray-ee profile-shadow">
            <Logo className="h-16 w-16" />
          </div>
        )}
        <p className="text-lg mt-[10px] dark:text-white">{TEMP_USER.name}</p>
      </div>
      <section className="w-max">
        <div className="flex w-[208px] justify-between mb-4">
          {(
            Object.keys(
              TEMP_USER.information
            ) as (keyof (typeof TEMP_USER)["information"])[]
          ).map((key) => (
            <div key={key} className="text-center">
              <p>{TEMP_USER.information[key]}</p>
              <p>{USER_INFO[key]}</p>
            </div>
          ))}
        </div>
        {isMyProfile ? (
          <div className="flex gap-[10px]">
            <Link to="/mypage/edit" className="w-full">
              <button
                type="button"
                className="primary-btn w-full py-1 rounded-full text-sm font-medium"
              >
                프로필 수정
              </button>
            </Link>
            <Link to="/mypage/edit/password" className="w-full">
              <button
                type="button"
                className="primary-btn w-full py-1 rounded-full text-sm font-medium"
              >
                비밀번호 변경
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex gap-[10px]">
            <button
              type="button"
              className={twMerge(
                "w-full py-1 rounded-full text-sm font-medium",
                isFollow ? "secondary-btn" : "primary-btn"
              )}
              onClick={() => setIsFollow((prev) => !prev)}
            >
              {isFollow ? "언팔로우" : "팔로우"}
            </button>
            <button
              type="button"
              className="primary-btn w-full py-1 rounded-full text-sm font-medium"
            >
              메세지 보내기
            </button>
          </div>
        )}
      </section>
    </article>
  );
}
