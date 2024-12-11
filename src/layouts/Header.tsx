import LogoButton from "../components/Header/LogoButton";
import ProfileButton from "../components/Header/ProfileButton";
import NotificationButton from "../components/Header/NotificationButton";
import SearchButton from "../components/Header/SearchButton";
import NewPostButton from "../components/Header/NewPostButton";
import LogInButton from "../components/Header/LogInButton";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function Header() {
  const { isLoggedIn, logout } = useAuthStore();
  const [isClicked, setIsClicked] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // 로그아웃 상태로 설정
    navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
  };

  const handleSearchClick = () => {
    console.log("클릭");
    setIsClicked(true); // 검색 버튼 클릭 시 isClicked 상태를 true로 변경
  };

  return (
    <header className="sticky top-0 h-[68px]">
      <div className="border-b border-[#eee] w-full absolute left-0 right-0 bg-transparent">
        <div className="flex justify-between items-center w-[1440px] h-[68px] relative px-10 mx-auto">
          <LogoButton />

          {isLoggedIn ? (
            <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-3">
              {isClicked ? (
                // 로그인 + 검색 버튼 클릭 시 - 검색 입력 영역
                <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[514px] h-[43px] relative gap-2.5 px-[25px] py-[5px] rounded-3xl border border-black">
                  <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    className="flex-grow w-full h-full outline-none pr-3"
                  />
                  <SearchButton />
                </div>
              ) : (
                // 로그인 + 검색창 안 클릭 시
                <SearchButton onClick={handleSearchClick} />
              )}
              <NotificationButton />
              <NewPostButton />
              <ProfileButton />
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded-lg"
              >
                로그아웃
              </button>
            </div>
          ) : (
            // 비로그인 시

            <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-3">
              {isClicked ? (
                // 비로그인 + 검색 버튼 클릭 시 - 검색 입력 영역
                <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[514px] h-[43px] relative gap-2.5 px-[25px] py-[5px] rounded-3xl border border-black">
                  <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    className="flex-grow w-full h-full outline-none pr-3"
                  />
                  <SearchButton />
                </div>
              ) : (
                // 비로그인 + 검색창 안 클릭 시
                <SearchButton onClick={handleSearchClick} />
              )}
              <LogInButton />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
