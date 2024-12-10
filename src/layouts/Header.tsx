import LogoButton from "../components/Header/LogoButton";
import ProfileButton from "../components/Header/ProfileButton";
import NotificationButton from "../components/Header/NotificationButton";
import SearchButton from "../components/Header/SearchButton";
import NewPostButton from "../components/Header/NewPostButton";
import LogInButton from "../components/Header/LogInButton";

export default function Header() {
  const isLoggedIn = false;
  const isClicked = true;

  return (
    <header className="sticky top-0">
      <div className="border-b border-[#eee] w-full absolute left-0 right-0 bg-transparent">
        <div className="flex justify-between items-center w-[1440px] h-[68px] relative px-10 mx-auto">
          <LogoButton />

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
                  <SearchButton />
                </div>
                <NotificationButton />
                <NewPostButton />
                <ProfileButton />
              </div>
            ) : (
              // 로그인 + 검색창 안 클릭 시
              <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-3">
                <SearchButton />
                <NotificationButton />
                <NewPostButton />
                <ProfileButton />
              </div>
            )
          ) : (
            // 비로그인 시
            <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-3">
              <SearchButton />
              <LogInButton />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
