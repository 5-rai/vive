import { useEffect, useRef, useState } from "react";
import NotificationIcon from "../../assets/NotificationIcon";
import NotificationDropdown from "./NotificationDropdown";

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
      <button className="flex items-center justify-center w-[36px] h-[36px] rounded-full hover:bg-secondary dark:hover:bg-white/20 transition-all duration-300 ease-in-out">
        <NotificationIcon
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-[24px] h-[24px]"
        />
      </button>
      {isOpen && <NotificationDropdown isPostExist={isPostExist} />}
    </div>
  );
}
