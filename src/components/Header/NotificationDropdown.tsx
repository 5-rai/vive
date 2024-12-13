import { NavLink } from "react-router";

export default function NotificationDropdown({
  isPostExist,
}: {
  isPostExist: boolean;
}) {
  return (
    <div className="absolute px-8 py-3 left-0 w-[364px] bg-white dark:bg-gray-22 border dark:border-gray-ee/50 rounded-lg">
      <p className="border-b border-gray-22 dark:border-gray-ee/50 py-2 mb-2.5">
        알림
      </p>
      <ul className="flex flex-col gap-1 max-h-64 overflow-y-auto custom-scrollbar">
        {[1, 2, 3, 4, 5, 6].map((_, idx) => (
          <NavLink
            key={idx}
            className="px-7 py-3 rounded-lg hover:bg-secondary dark:hover:text-gray-22"
            to={`${
              isPostExist
                ? `/channels/${"channelName"}/${"postId"}`
                : `/user/${"userId"}`
            }`}
          >
            <li className="line-clamp-1">
              감자님이 내 포스트에 좋아요를 눌렀습니다.
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
}
