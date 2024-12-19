import PostCard from "../common/PostCard";

export default function PostCardGridSection({ posts }: { posts: Post[] }) {
  return (
    <section className="pb-10 w-[934px] grow">
      {posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 h-[50vh] text-lg text-gray-54">
          <p>현재 작성된 포스트가 없어요...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-10">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} isSearch />
          ))}
        </div>
      )}
    </section>
  );
}
