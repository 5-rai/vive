import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { axiosInstance } from "../../api/axios"; // Adjust the import path as needed
import { useAuthStore } from "../../store/authStore";
import { getOnePost } from "../../api/post";
import { useChannelStore } from "../../store/channelStore";

export default function NotificationDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { getNameFromId, setChannels } = useChannelStore();
  const [notificationLinks, setNotificationLinks] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!isLoggedIn) return;

      try {
        const response = await axiosInstance.get("/notifications");
        // `seen` 속성이 false인 항목만 필터링
        const unseenNotifications = response.data.filter(
          (notification: Notification) => !notification.seen
        );
        setNotifications(unseenNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    const fetchChannels = async () => {
      try {
        const response = await axiosInstance.get<Channel[]>("/channels");
        setChannels(response.data); // 채널 정보를 store에 설정
      } catch (error) {
        console.error("Error fetching channels:", error);
      }
    };

    fetchNotifications();
    fetchChannels();
  }, [isLoggedIn, setChannels]);

  const fetchPostChannelName = async (postId: string) => {
    try {
      const post = await getOnePost(postId); // post.ts의 getOnePost 함수 사용
      const channelId = post?.channel?._id;

      // 채널 ID로 이름 조회
      if (channelId) {
        const channelName = getNameFromId(channelId);
        return channelName || "알 수 없음";
      }
      return "알 수 없음";
    } catch (error) {
      console.error("Error fetching post channel name:", error);
      return "알 수 없음";
    }
  };

  const getNotificationLink = async (notification: Notification) => {
    if (notification.follow) {
      return `/user/${notification.author?._id}`;
    }

    if (notification.like || notification.comment) {
      if (!notification.post) {
        console.error("Post ID is missing in the notification.");
        return "#";
      }

      const channelName = await fetchPostChannelName(notification.post);
      return `/channels/${channelName}/${notification.post}`;
    }

    if (notification.message) {
      return `/messages/${notification.message}`;
    }

    return "#";
  };

  useEffect(() => {
    const updateLinks = async () => {
      const links: Record<string, string> = {};
      for (const notification of notifications) {
        links[notification._id] = await getNotificationLink(notification);
      }
      setNotificationLinks(links);
    };

    updateLinks();
  }, [notifications]);

  const getNotificationText = (notification: Notification) => {
    const authorName = notification.author?.fullName || "익명";

    if (notification.follow) {
      return `${authorName}님이 팔로잉했습니다.`;
    }

    if (notification.like) {
      return `${authorName}님이 내 포스트에 좋아요를 눌렀습니다.`;
    }

    if (notification.comment) {
      return `${authorName}님이 내 포스트에 댓글을 달았습니다.`;
    }

    if (notification.message) {
      return `${authorName}님에게 쪽지가 도착했습니다.`;
    }

    return "새로운 알림";
  };

  return (
    <div className="absolute px-8 py-3 left-0 w-[364px] bg-white dark:bg-gray-22 border dark:border-gray-ee/50 rounded-lg">
      <p className="border-b border-gray-22 dark:border-gray-ee/50 py-2 mb-2.5">
        알림
      </p>
      <ul className="flex flex-col gap-1 max-h-64 overflow-y-auto custom-scrollbar">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NavLink
              key={notification._id}
              className="px-7 py-3 rounded-lg hover:bg-secondary dark:hover:text-gray-22"
              to={notificationLinks[notification._id] || "#"}
            >
              <li className="line-clamp-1">
                {getNotificationText(notification)}
              </li>
            </NavLink>
          ))
        ) : (
          <li className="px-7 py-3 text-center text-gray-500">
            새로운 알림이 없습니다.
          </li>
        )}
      </ul>
    </div>
  );
}
