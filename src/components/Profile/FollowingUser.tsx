import { twMerge } from "tailwind-merge";
import { useAllUserStore } from "../../store/allUserStore";
import confirmAndNavigateToLogin from "../../utils/confirmAndNavigateToLogin";
import { useNavigate } from "react-router";
import { axiosInstance } from "../../api/axios";
import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { createNotification } from "../../api/notification";

interface FollowingUser {
  user: Follow;
  myFollowInfo: Follow | undefined;
}

export default function FollowingUser({ user, myFollowInfo }: FollowingUser) {
  const getUser = useAllUserStore((state) => state.getUser);
  const deleteFollowing = useAuthStore((state) => state.deleteFollowing);
  const addFollowing = useAuthStore((state) => state.addFollowing);
  const userInfo = getUser(user.user);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleFollow = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    confirmAndNavigateToLogin(navigate);

    try {
      setLoading(true);
      const { data } = await axiosInstance.post<Follow>("/follow/create", {
        userId: user.user,
      });

      addFollowing(data);

      await createNotification({
        notificationType: "FOLLOW",
        notificationTypeId: data._id,
        userId: data.user,
      });
    } catch (err) {
      console.error("팔로우 요청 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnFollow = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (!myFollowInfo) {
      console.error("언팔로우 불가: follow ID or access token 없음");
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.delete("/follow/delete", {
        data: { id: myFollowInfo._id },
      });

      deleteFollowing(myFollowInfo._id);
    } catch (err) {
      console.error("언팔로우 요청 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <article
      className="w-28 flex flex-col items-center gap-1 cursor-pointer"
      onClick={() => navigate(`/user/${user.user}`)}
    >
      <img
        src={userInfo?.image ?? "/logo.png"}
        alt="프로필 이미지"
        className="w-24 h-24 profile rounded-full"
      />
      <p className="text-base mb-1">{userInfo?.fullName}</p>
      <button
        className={twMerge(
          "w-full rounded-lg py-1 text-sm",
          myFollowInfo ? "secondary-btn" : "primary-btn"
        )}
        disabled={loading}
        onClick={myFollowInfo ? handleUnFollow : handleFollow}
      >
        {myFollowInfo ? "언팔로우" : "팔로우"}
      </button>
    </article>
  );
}
