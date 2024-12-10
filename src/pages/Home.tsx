import AdBanner from "../components/Home/AdBanner";
import RecentPosts from "../components/Home/RecentPosts";
import WeeklyArtist from "../components/Home/WeeklyArtist";

export default function Home() {
  return (
    <div className="px-[94px] mx-auto w-full h-[1024px] bg-yellow-200 flex-col justify-start items-start inline-flex">
      <div className="w-full">
        <span className="text-black text-2xl font-semibold font-[Pretendard] leading-[38.88px]">
          금주의
        </span>
        <span className="text-[#f38304] text-2xl font-semibold font-[Pretendard] leading-[38.88px]">
          아티스트
        </span>
      </div>

      <div className="mt-[103px] w-[952px] flex flex-wrap justify-between">
        <WeeklyArtist name="음악하는 다람쥐" images=".." />
        <WeeklyArtist name="음악하는 다람쥐" images=".." />
        <WeeklyArtist name="음악하는 다람쥐" images=".." />
        <WeeklyArtist name="음악하는 다람쥐" images=".." />
        <WeeklyArtist name="음악하는 다람쥐" images=".." />
      </div>

      <div className="mt-[100px] mb-[24px]">
        <span className="text-black text-2xl font-semibold font-['Pretendard'] leading-[38.88px]">
          최근{" "}
        </span>
        <span className="text-[#fcc404] text-2xl font-semibold font-['Pretendard'] leading-[38.88px]">
          K-POP
        </span>
        <span className="text-black text-2xl font-semibold font-['Pretendard'] leading-[38.88px]">
          {" "}
          포스트
        </span>
      </div>

      <div className="mt-[100px] w-[952px] flex flex-wrap justify-between">
        <RecentPosts />
        <RecentPosts />
        <RecentPosts />
        <RecentPosts />
      </div>

      <div className="mt-[100px] mb-[24px]">
        <span className="text-black text-2xl font-semibold font-['Pretendard'] leading-[38.88px]">
          최근{" "}
        </span>
        <span className="text-[#fcc404] text-2xl font-semibold font-['Pretendard'] leading-[38.88px]">
          인디음악
        </span>
        <span className="text-black text-2xl font-semibold font-['Pretendard'] leading-[38.88px]">
          {" "}
          포스트
        </span>
      </div>

      <div className="mt-[100px] w-[952px] flex flex-wrap justify-between">
        <RecentPosts />
        <RecentPosts />
        <RecentPosts />
        <RecentPosts />
      </div>

      <div className="mt-[100px]">
        <AdBanner />
      </div>
    </div>
  );
}
