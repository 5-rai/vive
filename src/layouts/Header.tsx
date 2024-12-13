import { useEffect, useState } from "react";
import LogoButton from "../components/Header/LogoButton";
import SearchButton from "../components/Header/SearchButton";
import LogInButton from "../components/Header/LogInButton";
import { useAuthStore } from "../store/authStore";
import NotificationButton from "../components/Header/NotificationButton";
import NewPostButton from "../components/Header/NewPostButton";
import ProfileButton from "../components/Header/ProfileButton";
import LogoutButton from "../components/Header/LogoutButton";
import { userStore } from "../store/userStore";
import SearchBar from "../components/Header/SearchBar";

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
              <SearchBar />
            ) : (
              // 로그인 + 검색창 안 클릭 시
              <SearchButton onClick={handleSearchClick} />
            )}
            <NotificationButton />
            <NewPostButton />
            <LogoutButton />
            <ProfileButton profileImage={profileImage} />
          </div>
        ) : (
          // 비로그인 시
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 gap-3">
            {isClicked ? (
              // 비로그인 + 검색 버튼 클릭 시 - 검색 입력 영역
              <SearchBar />
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
