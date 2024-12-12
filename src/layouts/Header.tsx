import { useEffect, useState } from "react";
import LogoButton from "../components/Header/LogoButton";
import SearchButton from "../components/Header/SearchButton";
import LogInButton from "../components/Header/LogInButton";
import { useAuthStore } from "../store/authStore";
import NotificationButton from "../components/Header/NotificationButton";
import NewPostButton from "../components/Header/NewPostButton";
import ProfileButton from "../components/Header/ProfileButton";
import SearchIcon from "../assets/SearchIcon";
import LogoutButton from "../components/Header/LogoutButton";
import { userStore } from "../store/userStore";

export default function Header() {
  const { isLoggedIn } = useAuthStore();
  const [isClicked, setIsClicked] = useState(false);
  const { fetchUserProfile, profileImage } = userStore();

  useEffect(() => {
    // 로그인 상태일 때만 프로필 가져오기
    if (isLoggedIn) {
      fetchUserProfile();
    }
  }, [isLoggedIn]);

  const handleSearchClick = () => {
    setIsClicked(true); // 검색 버튼 클릭 시 상태 변경
  };

  const renderSearchInput = () => (
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
  );

  const renderLoggedInButtons = () => (
    <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 gap-3">
      {isClicked ? (
        // 로그인 + 검색 버튼 클릭 시 - 검색 입력 영역
        renderSearchInput()
      ) : (
        // 로그인 + 검색창 안 클릭 시
        <SearchButton onClick={handleSearchClick} />
      )}
      <NotificationButton />
      <NewPostButton />
      <LogoutButton />
      <ProfileButton profileImage={profileImage} /> {/* 프로필 이미지 전달 */}
    </div>
  );

  const renderLoggedOutButtons = () => (
    <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 gap-3">
      {isClicked ? (
        // 비로그인 + 검색 버튼 클릭 시 - 검색 입력 영역
        renderSearchInput()
      ) : (
        // 비로그인 + 검색창 안 클릭 시
        <SearchButton onClick={handleSearchClick} />
      )}
      <LogInButton />
    </div>
  );

  return (
    <header className="sticky top-0 border-b border-gray-ee dark:border-gray-ee/50 min-w-[1440px] w-full h-fit z-50 bg-white dark:bg-gray-22">
      <div className="flex justify-between items-center w-[1440px] h-[68px] px-10 mx-auto">
        <LogoButton />
        {isLoggedIn ? renderLoggedInButtons() : renderLoggedOutButtons()}
      </div>
    </header>
  );
}
