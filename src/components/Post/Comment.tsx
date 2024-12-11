import CommentItem from "./CommentItem";
import CommentWrite from "./CommentWrite";

export default function Comment() {
  const commentLength = 0;
  return (
    <section className="flex flex-col w-[420px] screen-100vh py-[28px] border-l border-r border-gray-ee dark:border-gray-ee/50">
      <p className="mb-[22px] font-medium text-xl px-6">댓글 N개</p>
      <div className="flex flex-col w-full grow overflow-hidden">
        {commentLength === 0 ? (
          <div className="flex flex-col justify-center items-center gap-3 h-full text-gray-c8 text-xl mb-[115px]">
            <p>댓글이 아직 없어요...</p>
            <p>이 포스팅의 첫 번째 댓글을 달아주세요!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5 overflow-y-auto custom-scrollbar px-6">
            {[1, 2, 3, 4, 5, 6, 7].map((_, idx) => (
              <CommentItem key={idx} />
            ))}
          </div>
        )}
      </div>
      <CommentWrite />
    </section>
  );
}
