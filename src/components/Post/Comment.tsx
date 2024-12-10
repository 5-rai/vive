import CommentItem from "./CommentItem";
import CommentWrite from "./CommentWrite";

export default function Comment() {
  const commentLength = 0;
  return (
    <section className="w-[420px] h-full px-[25px] py-[28px] border-l border-gray-ee">
      <p className="mb-[22px] font-medium text-xl">댓글 N개</p>
      <div className="flex flex-col w-full h-full">
        {commentLength === 0 ? (
          <div className="flex flex-col justify-center items-center gap-3 h-full text-gray-c8 text-xl mb-[115px]">
            <p>댓글이 아직 없어요...</p>
            <p>이 포스팅의 첫 번째 댓글을 달아주세요!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5 h-[690px] overflow-y-auto">
            {[1, 2, 3, 4, 5].map((_, idx) => (
              <CommentItem key={idx} />
            ))}
          </div>
        )}
      </div>
      <CommentWrite />
    </section>
  );
}
