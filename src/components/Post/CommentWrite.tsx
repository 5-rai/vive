import { useRef, useState } from "react";

export default function CommentWrite() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [comment, setComment] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    adjustHeight(e.target);
  };

  const adjustHeight = (textarea: HTMLTextAreaElement) => {
    // 높이가 5줄까지만 늘어나도록 설정
    if (textarea.scrollHeight < 24 * 5) {
      textarea.style.height = "auto"; // 기존 높이 초기화
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };
  return (
    <form className="flex flex-col items-end w-[417px] border-t border-gray-c8 gap-2 mt-5 fixed bottom-[54px]">
      <textarea
        ref={textareaRef}
        rows={1}
        className="w-full h-[47px] border border-gray-c8 px-6 py-2.5 mt-[23px] rounded-[15px] outline-none resize-none"
        onChange={handleChange}
        placeholder="댓글을 적어주세요!"
      ></textarea>
      <button
        disabled={!comment}
        className="bg-primary primary-btn rounded-[15px] w-[67px] h-[36px]"
      >
        등록
      </button>
    </form>
  );
}
