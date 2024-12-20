import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import { useThemeStore } from "../../store/themeStore";
import { deletePost } from "../../api/post";
import MoreIcon from "../../assets/MoreIcon";
import Dropdown from "../common/Dropdown";
import { useModalStore } from "../../store/modalStore";
import { useToastStore } from "../../store/toastStore";

export default function MoreButton({ post }: { post: Post }) {
  const navigate = useNavigate();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [isOpen, setIsOpen] = useState(false);
  const { setModal } = useModalStore();
  const { showToast } = useToastStore();
  const handleDeletePost = async () => {
    await deletePost(post._id);
    navigate(`/channels/${post.channel.name}`);
  };

  const openDeleteModal = () => {
    setModal({
      isOpen: true,
      confirmText: "삭제",
      cancelText: "취소",
      children: "정말로 포스팅을 삭제하시겠습니까?",
      onConfirm: () => {
        handleDeletePost(); // 삭제 함수 실행
        setModal({ isOpen: false }); // 모달 닫기
        showToast("포스팅이 삭제되었습니다.", 1000);
      },
      onClose: () => setModal({ isOpen: false }), // 모달 닫기
    });
  };
  return (
    <div className="relative">
      <button
        type="button"
        className="w-[36px] h-[36px] flex justify-center items-center rounded-full hover:bg-gray-ee/80 dark:hover:bg-white/10 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        <MoreIcon color={isDarkMode ? "#eee" : undefined} />
      </button>
      <Dropdown
        className="w-24 right-0"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <NavLink
          to={`/posts/${post?._id}/edit`}
          className="py-1.5 text-center border-b dark:border-gray-ee/50 hover:bg-gray-ee/80 dark:hover:bg-white/10 transition-colors"
        >
          수정
        </NavLink>
        <button
          type="button"
          className="py-1.5 text-center text-red-accent hover:bg-red-accent dark:hover:bg-red-accent/80 hover:text-white transition-colors"
          onClick={openDeleteModal}
        >
          삭제
        </button>
      </Dropdown>
    </div>
  );
}
