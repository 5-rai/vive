import { Outlet, NavLink } from "react-router";
import { useState, useRef, useEffect } from "react";
import SearchIcon from "../assets/SearchIcon";
import { useThemeStore } from "../store/themeStore";
import { axiosInstance } from "../api/axios";
import UserNavLink from "../components/common/UserNavLink";
import { useAllUserStore } from "../store/allUserStore";
import { useChannelStore } from "../store/channelStore";

export default function Sidebar() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const channels = useChannelStore((state) => state.channels);
  const [searchName, setSearchName] = useState(""); // 검색할 이름 상태 관리
  const [searchResults, setSearchResults] = useState<User[]>([]); // 검색한 이름의 결과값 상태 관리
  const debounceTimeout = useRef<number | null>(null); // 디바운스 타이머 관리
  const allUsers = useAllUserStore((state) => state.users);
  const fetchUsers = useAllUserStore((state) => state.fetchUsers);

  const toggledInputFocused = () => setIsInputFocused((prev) => !prev);

  // API GET 함수 (검색값 가져오기)
  const searchUsers = async (searchName: string) => {
    try {
      const response = await axiosInstance.get(`/search/users/${searchName}`);
      setSearchResults(response.data); // 검색 결과 저장
      console.log("유저 찾기 성공🎉", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchName(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current); // 기존 타이머를 취소
    }

    if (value.trim() !== "") {
      debounceTimeout.current = setTimeout(() => {
        searchUsers(value); // 0.5초 후 검색 실행
      }, 500);
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(fetchUsers, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <aside className="flex flex-col sticky top-[68px] screen-100vh w-[300px] min-w-[300px] p-7 gap-5 justify-between border-r border-gray-ee dark:border-gray-ee/50">
        <div className="h-fit">
          <p className="border-b border-gray-22 dark:border-gray-ee/50 py-2 mb-2.5 dark:text-gray-ee">
            카테고리
          </p>
          <div className="flex flex-col gap-1">
            {/* 상위 3개를 제외한 나머지 항목만 표시 */}
            {channels.slice(3).map((channel) => (
              <NavLink
                key={channel._id}
                to={`/channels/${channel.name}`}
                className={
                  "flex items-center h-11 px-7 py-1 rounded-lg hover:bg-secondary dark:hover:text-gray-22 transition-colors"
                }
              >
                {channel.name}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="grow overflow-y-hidden flex flex-col">
          <p className="border-b border-gray-22 dark:border-gray-ee/50 py-2 mb-4 dark:text-gray-ee">
            유저{" "}
            {searchResults.length > 0 ? searchResults.length : allUsers.length}{" "}
            명
          </p>
          <div className="relative mb-4">
            <SearchIcon
              color={
                isInputFocused
                  ? "#FCC404"
                  : isDarkMode
                  ? "rgba(200, 200, 200, 0.5)"
                  : "#c8c8c8"
              }
              className={`h-4 absolute left-4 top-3 transition-colors`}
            />
            <input
              className="group w-full h-10 border border-gray-c8 dark:border-gray-c8/50 rounded-full pl-12 focus:border-primary transition-colors"
              type="text"
              placeholder="유저 검색"
              autoCorrect="off"
              onFocus={toggledInputFocused}
              onBlur={toggledInputFocused}
              value={searchName}
              onChange={handleSearch} // 검색 이벤트 핸들러
            />
          </div>

          <div className="h-full flex flex-col overflow-y-auto gap-2.5 custom-scrollbar">
            {searchResults.length > 0
              ? searchResults.map((user) => (
                  <UserNavLink key={user._id} user={user} />
                ))
              : allUsers.map((user) => (
                  <UserNavLink key={user._id} user={user} />
                ))}
          </div>
        </div>
      </aside>
      <Outlet />
    </>
  );
}
