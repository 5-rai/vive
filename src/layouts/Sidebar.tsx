import { Outlet, NavLink } from "react-router";
import profileImg from "../assets/profileImg.jpg";
import { useState } from "react";
import SearchIcon from "../assets/SearchIcon";

export default function Sidebar() {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const toggledInputFocused = () => setIsInputFocused((prev) => !prev);
  return (
    <>
      <aside className="flex flex-col sticky top-[68px] h-[90vh] w-[300px] min-w-[300px] p-7 gap-16 border-r border-gray-ee">
        <div className="h-[365px]">
          <p className="border-b py-2 border-gray-22 mb-2.5">카테고리</p>
          <div className="flex flex-col gap-2.5">
            {[1, 2, 3, 4, 5, 6].map(() => (
              <NavLink
                to={"/"}
                className={
                  "flex items-center h-11 px-7 py-1 rounded-lg hover:bg-secondary transition-colors"
                }
              >
                K-POP
              </NavLink>
            ))}
          </div>
        </div>
        <div>
          <p className="border-b py-2 border-gray-22 mb-4">접속자 (N명)</p>
          <div>
            <div className="relative mb-4">
              <SearchIcon
                color={isInputFocused ? "#FCC404" : "#c8c8c8"}
                className={`h-4 absolute left-4 top-3 transition-colors`}
              />
              <input
                className="group w-full h-10 border border-gray-c8 rounded-full pl-12 focus:border-primary transition-colors"
                type="text"
                autoCorrect="off"
                onFocus={toggledInputFocused}
                onBlur={toggledInputFocused}
              />
            </div>
            <div className="flex flex-col h-[270px] overflow-y-auto gap-2.5">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
                <NavLink
                  to={"/"}
                  className={
                    "flex items-center gap-2.5 px-7 py-2 rounded-lg hover:bg-secondary transition-colors"
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
        </div>
      </aside>
      <Outlet />
    </>
  );
}
