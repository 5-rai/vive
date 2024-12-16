import { useEffect, useRef, useState } from "react";
import NotificationIcon from "../../assets/NotificationIcon";
import Dropdown from "../common/Dropdown";
import { NavLink } from "react-router";

export default function NotificationButton() {
  const isPostExist = true; // 알림 API Response의 "post"값이 null인지 아닌지
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // 외부 클릭 시 드롭다운 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // 클릭 이벤트 추가
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // 이벤트 해제
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        className="flex items-center justify-center w-[36px] h-[36px] rounded-full hover:bg-secondary dark:hover:bg-white/20 transition-all duration-300 ease-in-out"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        <NotificationIcon className="w-[24px] h-[24px]" />
      </button>
      <Dropdown
        className="px-6 py-5 left-0 w-[364px]"
        isOpen={isOpen}
        onClose={() => setIsOpen((prev) => !prev)}
      >
        <p className="border-b border-gray-22 dark:border-gray-ee/50 pb-2 mb-2.5">
          알림
        </p>
        <ul className="flex flex-col gap-1 max-h-64 overflow-y-auto custom-scrollbar">
          {[1, 2, 3, 4, 5, 6].map((_, idx) => (
            <NavLink
              key={idx}
              className="px-3 py-3 rounded-lg hover:bg-secondary dark:hover:text-gray-22"
              to={
                isPostExist
                  ? `/channels/${"channelName"}/${"postId"}`
                  : `/user/${"userId"}`
              }
            >
              <li className="">감자님이 내 포스트에 좋아요를 눌렀습니다.</li>
            </NavLink>
          ))}
        </ul>
      </Dropdown>
    </div>
  );
}
