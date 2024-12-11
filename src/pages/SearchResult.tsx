import PostCard from "../components/common/PostCard";
import UserAvatar from "../components/common/UserAvatar";
import ProfileTemp from "../assets/profileImg.jpg";
import { Link } from "react-router";

const TEMP_USER_AVATAR = {
  name: "음악하는 다람쥐",
  image: ProfileTemp,
};

const SEARCH_RESULT_TEMP_POST = {
  post: {
    postId: 123,
    channelName: "댄스",
    title: "이무진 - 청춘만화(COVER)",
    content: "해당 음원 유튜브 영상 제목 포스트 내용",
    thumbnail: "",
  },
  writer: {
    name: "Mark Twin",
    userId: 123,
    profileImg: "",
  },
  like: 20,
};

export default function SearchResult() {
  return (
    <>
      <section className="px-10 mx-auto pb-10">
        <article className="mb-28">
          <h2 className="text-3xl font-bold my-10">
            <span className="text-highlight">겨울</span>의 유저 검색 결과 5개
          </h2>
          <div className="w-full grid grid-cols-6 gap-10 justify-between">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Link to="/user/userId">
                <UserAvatar key={i} {...TEMP_USER_AVATAR} />
              </Link>
            ))}
          </div>
        </article>
        <article>
          <h2 className="text-3xl font-bold my-10">
            <span className="text-highlight">겨울</span>의 포스팅 검색 결과 6개
          </h2>
          <div className="grid grid-cols-2 gap-10">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <PostCard
                key={i}
                post={SEARCH_RESULT_TEMP_POST.post}
                writer={SEARCH_RESULT_TEMP_POST.writer}
                like={SEARCH_RESULT_TEMP_POST.like}
                isLiked={false}
              />
            ))}
          </div>
        </article>
      </section>
    </>
  );
}
