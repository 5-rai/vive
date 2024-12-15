import { NavLink, useNavigate } from "react-router";
import { usePostStore } from "../../store/postStore";
import { useState } from "react";
import { useThemeStore } from "../../store/themeStore";
import { deletePost } from "../../api/post";
import MoreIcon from "../../assets/MoreIcon";
import Dropdown from "../common/Dropdown";

export default function MoreButton() {
  const navigate = useNavigate();
  const post = usePostStore((state) => state.post);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  const [isOpen, setIsOpen] = useState(false);

  const handleDeletePost = async () => {
    if (!post) return;

    const isConfirmed = window.confirm("정말로 포스팅을 삭제하시겠습니까?");
    if (isConfirmed) {
      await deletePost(post._id);
      navigate(`/channels/${post.channel.name}`);
    }
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
          onClick={handleDeletePost}
        >
          삭제
        </button>
      </Dropdown>
    </div>
  );
}
