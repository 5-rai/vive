import CommentItem from "./CommentItem";
import CommentWrite from "./CommentWrite";

export default function Comment() {
  return (
    <section className="w-[420px] h-full px-[25px] py-[28px]">
      <p className="mb-[22px] font-medium text-xl">댓글 N개</p>
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-5 h-[690px] overflow-y-auto">
          {[1, 2, 3, 4, 5].map((_, idx) => (
            <CommentItem key={idx} />
          ))}
        </div>
      </div>
      <CommentWrite />
    </section>
  );
}
