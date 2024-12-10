import { Link } from "react-router";
import ProfileTemp from "../../assets/profileImg.jpg";
import { USER_INFO } from "../../constants/profile";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const TEMP_USER = {
  name: "음악하는 다람쥐",
  image: ProfileTemp,
  information: {
    postCount: 4,
    followerCount: 4,
    followingCount: 4,
  },
};

export default function ProfileSection() {
  const isMyProfile = !true; // 임시
  const [isFollow, setIsFollow] = useState(false);

  return (
    <article className="border-b border-gray-ee flex justify-center items-center gap-20 mb-10 p-10 w-full">
      {/* 정훈님 컴포넌트 재사용? */}
      <div className="flex flex-col gap-2 items-center">
        <img
          src={TEMP_USER.image}
          alt="프로필 이미지"
          className="w-[122px] h-[122px] rounded-full profile-shadow"
        />
        <p className="text-lg mt-[10px]">{TEMP_USER.name}</p>
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
          <div>
            <Link to="/mypage/edit">
              <button
                type="button"
                className="primary-btn w-full py-1 rounded-full text-sm"
              >
                프로필 수정
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex gap-[10px]">
            <button
              type="button"
              className={twMerge(
                "w-full py-1 rounded-full text-sm",
                isFollow ? "secondary-btn" : "primary-btn"
              )}
              onClick={() => setIsFollow((prev) => !prev)}
            >
              {isFollow ? "언팔로우" : "팔로우"}
            </button>
            <button
              type="button"
              className="primary-btn w-full py-1 rounded-full text-sm"
            >
              메세지 보내기
            </button>
          </div>
        )}
      </section>
    </article>
  );
}
