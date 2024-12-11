import { Outlet, NavLink } from "react-router";
import profileImg from "../assets/profileImg.jpg";
import { useState, useEffect } from "react";
import SearchIcon from "../assets/SearchIcon";
import { useThemeStore } from "../store/themeStore";
import { axiosInstance } from "../api/axios";

interface Channel {
  _id: string;
  name: string;
  description: string;
  authRequired: boolean;
}

export default function Sidebar() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);

  const toggledInputFocused = () => setIsInputFocused((prev) => !prev);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/channels");
        setChannels(response.data);
      } catch (error) {
        console.error("Failed to fetch channels", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChannels();
  }, []);

  return (
    <>
      <aside className="flex flex-col sticky top-[68px] screen-100vh w-[300px] min-w-[300px] p-7 gap-5 justify-between border-r border-gray-ee dark:border-gray-ee/50">
        <div className="h-fit">
          <p className="border-b border-gray-22 dark:border-gray-ee/50 py-2 mb-2.5 dark:text-gray-ee">
            카테고리
          </p>
          {loading ? (
            <p>Loading...</p>
          ) : (
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
          )}
        </div>
        <div className="grow overflow-y-hidden flex flex-col">
          <p className="border-b border-gray-22 dark:border-gray-ee/50 py-2 mb-4 dark:text-gray-ee">
            접속자 (N명)
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
            />
          </div>
          <div className="h-full flex flex-col overflow-y-auto gap-2.5 custom-scrollbar">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, idx) => (
              <NavLink
                key={idx}
                to={"/user/userId"}
                className={
                  "flex items-center gap-2.5 px-7 py-2 rounded-lg hover:bg-secondary dark:hover:text-gray-22 transition-colors"
                }
              >
                <img
                  className="w-7 h-7 rounded-full"
                  src={profileImg}
                  alt="유저 프로필 이미지"
                />
                <span>닉네임</span>
              </NavLink>
            ))}
          </div>
        </div>
      </aside>
      <Outlet />
    </>
  );
}
