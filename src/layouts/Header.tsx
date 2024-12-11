import { useState } from "react";
import LogoButton from "../components/Header/LogoButton";
import SearchButton from "../components/Header/SearchButton";
import LogInButton from "../components/Header/LogInButton";
import NotificationButton from "../components/Header/NotificationButton";
import NewPostButton from "../components/Header/NewPostButton";
import ProfileButton from "../components/Header/ProfileButton";
import SearchIcon from "../assets/SearchIcon";
import LogoutButton from "../components/Header/LogoutButton";

export default function Header() {
  const isLoggedIn = !false;
  const [isClicked, setIsClicked] = useState(false);

  const handleSearchButtonClick = () => {
    setIsClicked(true);
  };

  return (
    <header className="sticky top-0 border-b-[1px] border-[#eee] min-w-[1440px] w-screen h-fit z-50 bg-white">
      <div className="flex justify-between items-center w-[1440px] h-[68px] px-10 mx-auto">
        <LogoButton />
        {isLoggedIn ? (
          isClicked ? (
            // 로그인 + 검색 버튼 클릭 시
            <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 gap-3">
              <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[514px] h-[43px] gap-2.5 px-[25px] py-[5px] rounded-full border border-black">
                <input
                  type="text"
                  placeholder="검색어를 입력하세요"
                  className="flex-grow w-full h-full outline-none pr-3"
                />
                <button className="flex items-center justify-center w-[36px] h-[36px]">
                  <SearchIcon className="w-[19px] h-[19px]" />
                </button>
              </div>
              <NotificationButton />
              <NewPostButton />
              <LogoutButton />
              <ProfileButton />
            </div>
          ) : (
            // 로그인 + 검색창 안 클릭 시
            <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-3">
              <SearchButton onClick={handleSearchButtonClick} />
              <NotificationButton />
              <NewPostButton />
              <LogoutButton />
              <ProfileButton />
            </div>
          )
        ) : (
          // 비로그인 시
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-3">
            <SearchButton onClick={handleSearchButtonClick} />
            <LogInButton />
          </div>
        )}
      </div>
    </header>
  );
}
