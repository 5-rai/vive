import { NavLink } from "react-router";
import profileImg from "../../assets/profileImg.jpg";
import { axiosInstance } from "../../api/axios";
import { useAuthStore } from "../../store/authStore";
import formatTimeAgo from "../../utils/formatTimeAgo";

export default function CommentItem({
  comment,
  setComments,
}: {
  comment: Comment;
  setComments: React.Dispatch<React.SetStateAction<Comment[] | undefined>>;
}) {
  const loggedInUser = useAuthStore((state) => state.user);
  const formattedTimeAgo = formatTimeAgo(comment.createdAt);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("정말로 이 댓글을 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      const response = await axiosInstance.delete(`/comments/delete`, {
        data: { id: comment._id },
      });

      if (response.status === 200) {
        alert("댓글이 성공적으로 삭제되었습니다.");
        setComments((prev) =>
          prev!.filter((prevComment) => prevComment._id !== comment._id)
        );
      } else {
        alert(response.data?.message || "댓글 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2.5">
        <NavLink
          to={`/user/${comment.author._id}`}
          className={"flex items-center gap-[13px]"}
        >
          <img
            className="w-7 h-7 rounded-full object-cover profile"
            src={comment.author?.image ?? profileImg}
            alt="유저 프로필 이미지"
          />
          <span className="dark:text-white">{comment.author.fullName}</span>
        </NavLink>
        <p className="text-sm text-[#888]">{formattedTimeAgo}</p>
      </div>
      <div className="relative">
        <p className="text-gray-54 dark:text-gray-c8 whitespace-pre-wrap break-words">
          {comment.comment}
        </p>

        {loggedInUser?._id === comment.author._id && (
          <div className="flex justify-end mt-2">
            <button onClick={handleDelete} className="text-red-500 text-sm">
              삭제
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
