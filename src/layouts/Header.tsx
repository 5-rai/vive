import LogoButton from "../components/Header/LogoButton";
import ProfileButton from "../components/Header/ProfileButton";
import NotificationButton from "../components/Header/NotificationButton";
import SearchButton from "../components/Header/SearchButton";
import NewPostButton from "../components/Header/NewPostButton";
import LogInButton from "../components/Header/LogInButton";
import { Link } from "react-router";

export default function Header() {
  const isLoggedIn = true;
  const isClicked = true;

  return (
    <header>
      <div className="border-b border-[#eee] w-full absolute left-0 right-0 bg-white/0">
        <div className="flex justify-between items-center w-[1440px] h-[68px] relative px-10 mx-auto">
          <Link to="/">
            <LogoButton />
          </Link>
          {isLoggedIn ? (
            isClicked ? (
              // 로그인 + 검색 버튼 클릭 시
              <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-3">
                {/* 검색 입력 영역 */}
                <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[514px] h-[43px] relative gap-2.5 px-[25px] py-[5px] rounded-3xl border border-black">
                  <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    className="flex-grow w-full h-full outline-none pr-3"
                  />
                  <Link to="/">
                    <SearchButton />
                  </Link>
                </div>

                <NotificationButton />
                <Link to="/write">
                  <NewPostButton />
                </Link>
                <Link to="/mypage">
                  <ProfileButton />
                </Link>
              </div>
            ) : (
              // 로그인 + 검색창 안 클릭 시
              <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-3">
                <Link to="/">
                  <SearchButton />
                </Link>
                <NotificationButton />
                <Link to="/write">
                  <NewPostButton />
                </Link>
                <Link to="/mypage">
                  <ProfileButton />
                </Link>
              </div>
            )
          ) : (
            // 비로그인 시
            <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-3">
              <Link to="/">
                <SearchButton />
              </Link>
              <Link to="/login">
                <LogInButton />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
