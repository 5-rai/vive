import PostCard from "../common/PostCard";

const TEMP_POST = {
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

export default function PostCardGridSection() {
  return (
    <section className="grid grid-cols-2 gap-10 pb-10">
      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
        <PostCard
          key={i}
          post={TEMP_POST.post}
          writer={TEMP_POST.writer}
          like={TEMP_POST.like}
          isLiked={false}
        />
      ))}
    </section>
  );
}
