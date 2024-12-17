import PostCard from "../common/PostCard";

export default function PostCardGridSection({ posts }: { posts: Post[] }) {
  return (
    <section className="pb-10 w-[934px] grow">
      {posts.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-xl text-center">현재 작성된 포스트가 없습니다.</p>
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
