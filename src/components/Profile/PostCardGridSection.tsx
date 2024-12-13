import PostCard from "../common/PostCard";

export default function PostCardGridSection({ posts }: { posts: Post[] }) {
  return (
    <section className="grid grid-cols-2 gap-10 pb-10">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </section>
  );
}
