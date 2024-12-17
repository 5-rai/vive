import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../store/authStore";
import Dropdown from "../common/Dropdown";

interface ProfileButtonProps {
  profileImage?: string | null;
}

export default function ProfileButton({ profileImage }: ProfileButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleMyPageClick = () => {
    navigate("/mypage");
    setIsOpen(false);
  };

  const handleMessageClick = () => {
    navigate("/message");
    setIsOpen(false);
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <section ref={ref} className="relative">
      <img
        className="w-[44px] h-[44px] rounded-full profile-shadow profile cursor-pointer"
        src={profileImage || "/logo.png"}
        alt="프로필"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      />
      <Dropdown
        className="w-[158px] p-3 top-12"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <button
          className="flex justify-center items-center self-stretch relative gap-2.5 px-5 py-2.5 rounded-lg hover:bg-[#fbefbf] hover:dark:bg-gray-44 group"
          onClick={handleMyPageClick}
        >
          <p className="text-base text-left text-black dark:text-gray-ee group-hover:text-black group-hover:dark:text-gray-22">
            마이페이지
          </p>
        </button>
        <button
          className="flex justify-center items-center self-stretch relative gap-2.5 px-5 py-2.5 rounded-lg hover:bg-[#fbefbf] hover:dark:bg-gray-44 group"
          onClick={handleMessageClick}
        >
          <p className="text-base text-left text-black dark:text-gray-ee group-hover:text-black group-hover:dark:text-gray-22">
            메세지함
          </p>
        </button>
        <button
          className="flex justify-center items-center self-stretch relative gap-2.5 px-5 py-2.5 rounded-lg hover:bg-[#fbefbf] hover:dark:bg-gray-44 group"
          onClick={handleLogoutClick}
        >
          <p className="text-base text-left text-black dark:text-gray-ee group-hover:text-black group-hover:dark:text-gray-22">
            로그아웃
          </p>
        </button>
      </Dropdown>
    </section>
  );
}
