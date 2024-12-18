import { useEffect, useRef } from "react";
import CommentItem from "./CommentItem";
import CommentWrite from "./CommentWrite";

export default function Comment({
  postAuthorId,
  comments,
  setComments,
}: {
  postAuthorId: string;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[] | undefined>>;
}) {
  const commentsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (commentsRef.current) {
      commentsRef.current.scrollTo({
        top: commentsRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [comments]);

  return (
    <section className="sticky top-[69px] flex flex-col min-w-[420px] w-[420px] screen-100vh py-[28px] border-l border-gray-ee dark:border-gray-ee/50">
      <p className="mb-[22px] font-medium text-xl px-6">
        댓글 {comments.length}개
      </p>
      <div className="flex flex-col w-full grow overflow-hidden">
        {comments.length === 0 ? (
          <div className="flex flex-col justify-center items-center gap-3 h-full text-gray-54 mb-[115px]">
            <p>댓글이 아직 없어요...</p>
            <p>이 포스팅의 첫 번째 댓글을 달아주세요!</p>
          </div>
        ) : (
          <div
            ref={commentsRef}
            className="flex flex-col gap-5 overflow-y-scroll custom-scrollbar ml-6 mr-2"
          >
            {comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                setComments={setComments}
              />
            ))}
          </div>
        )}
      </div>
      <CommentWrite postAuthorId={postAuthorId} setComments={setComments} />
    </section>
  );
}
