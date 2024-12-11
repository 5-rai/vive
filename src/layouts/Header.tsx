import { useState } from "react";
import LogoButton from "../components/Header/LogoButton";
import SearchButton from "../components/Header/SearchButton";
import LogInButton from "../components/Header/LogInButton";
import { useAuthStore } from "../store/authStore";
import NotificationButton from "../components/Header/NotificationButton";
import NewPostButton from "../components/Header/NewPostButton";
import ProfileButton from "../components/Header/ProfileButton";
import SearchIcon from "../assets/SearchIcon";
import LogoutButton from "../components/Header/LogoutButton";

export default function Header() {
  const { isLoggedIn } = useAuthStore();
  const [isClicked, setIsClicked] = useState(false);

  const handleSearchClick = () => {
    console.log("클릭");
    setIsClicked(true); // 검색 버튼 클릭 시 isClicked 상태를 true로 변경
  };

  return (
    <header className="sticky top-0 border-b border-gray-ee dark:border-gray-ee/50 min-w-[1440px] w-full h-fit z-50 bg-white dark:bg-gray-22">
      <div className="flex justify-between items-center w-[1440px] h-[68px] px-10 mx-auto">
        <LogoButton />
        {isLoggedIn ? (
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 gap-3">
            {isClicked ? (
              // 로그인 + 검색 버튼 클릭 시 - 검색 입력 영역
              <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[514px] h-[43px] gap-2.5 px-[25px] py-[5px] rounded-full border border-gray-22 dark:border-gray-c8/50 bg-white dark:bg-white/10">
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  className="w-full h-full pr-3 bg-transparent focus:outline-none dark:text-gray-ee"
                />
                <button className="flex items-center justify-center w-[36px] h-[36px]">
                  <SearchIcon className="w-[19px] h-[19px]" />
                </button>
              </div>
            ) : (
              // 로그인 + 검색창 안 클릭 시
              <SearchButton onClick={handleSearchClick} />
            )}
            <NotificationButton />
            <NewPostButton />
            <LogoutButton />
            <ProfileButton />
          </div>
        ) : (
          // 비로그인 시
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 gap-3">
            {isClicked ? (
              // 비로그인 + 검색 버튼 클릭 시 - 검색 입력 영역
              <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[514px] h-[43px] gap-2.5 px-[25px] py-[5px] rounded-full border border-gray-22 dark:border-gray-c8/50 bg-white dark:bg-white/10">
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  className="w-full h-full pr-3 bg-transparent focus:outline-none dark:text-gray-ee"
                />
                <button className="flex items-center justify-center w-[36px] h-[36px]">
                  <SearchIcon className="w-[19px] h-[19px]" />
                </button>
              </div>
            ) : (
              // 비로그인 + 검색창 안 클릭 시
              <SearchButton onClick={handleSearchClick} />
            )}
            <LogInButton />
          </div>
        )}
      </div>
    </header>
  );
}
