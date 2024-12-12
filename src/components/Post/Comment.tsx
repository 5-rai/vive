import CommentItem from "./CommentItem";
import CommentWrite from "./CommentWrite";
import { usePostStore } from "../../store/postStore";

export default function Comment() {
  const comments = usePostStore((state) => state.comments);
  return (
    <section className="flex flex-col w-[420px] screen-100vh py-[28px] border-l border-gray-ee dark:border-gray-ee/50">
      <p className="mb-[22px] font-medium text-xl px-6">
        댓글 {comments.length}개
      </p>
      <div className="flex flex-col w-full grow overflow-hidden">
        {comments.length === 0 ? (
          <div className="flex flex-col justify-center items-center gap-3 h-full text-gray-c8 text-xl mb-[115px]">
            <p>댓글이 아직 없어요...</p>
            <p>이 포스팅의 첫 번째 댓글을 달아주세요!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-5 overflow-y-auto custom-scrollbar px-6">
            {comments.map((comment) => (
              <CommentItem key={comment._id} comment={comment} />
            ))}
          </div>
        )}
      </div>
      <CommentWrite />
    </section>
  );
}
