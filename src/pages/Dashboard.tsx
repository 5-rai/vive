import PostCard from "../components/common/PostCard";

export default function Dashboard() {
  const DASHBOARD_TEMP_POST = {
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

  return (
    <>
      <div className="p-[72px]">
        {/* Dashboard title */}
        <h2 className="text-[32px] font-bold my-10">카테고리</h2>
        {/* PostCard */}
        <section className="grid grid-cols-2 gap-10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <PostCard
              key={i}
              post={DASHBOARD_TEMP_POST.post}
              writer={DASHBOARD_TEMP_POST.writer}
              like={DASHBOARD_TEMP_POST.like}
              isLiked={false}
            />
          ))}
        </section>
      </div>
    </>
  );
}
