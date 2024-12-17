import { Link } from "react-router";
import UserAvatar from "../components/common/UserAvatar";
import AdBanner from "../components/Home/AdBanner";
import RecentPosts from "../components/Home/RecentPosts";
import { useAllUserStore } from "../store/allUserStore";

export default function Home() {
  const users = useAllUserStore((state) => state.users);

  const getRandomArtists = (arr: User[], count: number) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const randomArtists = getRandomArtists(users, 5);

  return (
    <div className="mx-auto py-10 flex-col justify-start flex w-[952px] gap-24 overflow-y-auto">
      <section>
        <div className="mb-3">
          <span className="text-2xl font-semibold">금주의 </span>
          <span className="text-highlight text-2xl font-semibold">
            아티스트
          </span>
        </div>

        {/* 랜덤으로 WeeklyArtist 5개 추출 */}
        <div className="flex flex-wrap justify-between px-2">
          {randomArtists.map((artist) => (
            <Link to={`/user/${artist._id}`} key={artist._id}>
              <UserAvatar name={artist.fullName} image={artist.image} />
            </Link>
          ))}
        </div>
      </section>
      <section>
        <div className="mb-3">
          <span className="text-2xl font-semibold">최근 </span>
          <span className="text-primary text-2xl font-semibold">K-POP</span>
          <span className="text-2xl font-semibold"> 포스트</span>
        </div>
        <div className="flex flex-wrap justify-between">
          {[1, 2, 3, 4].map((item) => (
            <RecentPosts
              key={item}
              title="이무진-청춘만화(COVER)"
              youtubeTitle="유튜브 영상 제목"
              youtubeThumbnail="/src/assets/profileImg.jpg"
              avatarImg="/src/assets/profileImg.jpg"
            />
          ))}
        </div>
      </section>
      <section>
        <div className="mb-3">
          <span className="text-2xl font-semibold">최근 </span>
          <span className="text-primary text-2xl font-semibold">인디음악</span>
          <span className="text-2xl font-semibold"> 포스트</span>
        </div>
        <div className="w-[952px] flex flex-wrap justify-between">
          {[1, 2, 3, 4].map((item) => (
            <RecentPosts
              key={item}
              title="이무진-청춘만화(COVER)"
              youtubeTitle="유튜브 영상 제목"
              youtubeThumbnail="/src/assets/profileImg.jpg"
              avatarImg="/src/assets/profileImg.jpg"
            />
          ))}
        </div>
      </section>
      <AdBanner />
    </div>
  );
}
