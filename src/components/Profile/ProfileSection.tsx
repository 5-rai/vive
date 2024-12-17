import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { axiosInstance } from "../../api/axios";
import { useAuthStore } from "../../store/authStore";
import UserAvatar from "../common/UserAvatar";
import confirmAndNavigateToLogin from "../../utils/confirmAndNavigateToLogin";

interface ProfileSectionProps {
  user: User | null;
  isMyProfile?: boolean;
}

export default function ProfileSection({
  user,
  isMyProfile = false,
}: ProfileSectionProps) {
  const navigate = useNavigate();
  const [isFollow, setIsFollow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useAuthStore();
  const [followersCount, setFollowersCount] = useState(
    user?.followers.length || 0
  ); // 팔로워 수 상태 추가
  const [followId, setFollowId] = useState<string | null>(null);
  const myId = useAuthStore((state) => state.user)?._id;

  useEffect(() => {
    const foundFollowId = user?.followers.find(
      (follower) => follower.follower === myId
    )?._id;

    // 상태 업데이트
    setFollowId(foundFollowId || null);
    setIsFollow(!!foundFollowId);
  }, [user?.followers]); // followers 배열 변경 시에만 실행

  const handleUnfollow = async () => {
    if (!followId || !isLoggedIn) {
      console.error("언팔로우 불가: follow ID or access token 없음");
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.delete("/follow/delete", {
        data: { id: followId },
      });

      // 상태 직접 업데이트
      setIsFollow(false);
      setFollowersCount((prevCount) => Math.max(prevCount - 1, 0));
      setFollowId(null);
    } catch (err) {
      console.error("언팔로우 요청 실패:", err);
      // 실패 시 상태 롤백
      setIsFollow(true);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    confirmAndNavigateToLogin(navigate);

    try {
      setLoading(true);
      const response = await axiosInstance.post("/follow/create", {
        userId: user!._id,
      });

      // 상태 직접 업데이트
      setIsFollow(true);
      setFollowersCount((prevCount) => prevCount + 1);
      setFollowId(response.data._id);
    } catch (err) {
      console.error("팔로우 요청 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMessage = () => {
    confirmAndNavigateToLogin(navigate);
  };

  return (
    <article className="border-b border-gray-ee dark:border-gray-ee/50 flex justify-center items-center gap-20 mb-10 p-10 w-full">
      <UserAvatar name={user?.fullName} image={user?.image} />
      <section className="w-max">
        <div className="flex w-[208px] justify-between mb-4">
          <div className="text-center">
            <p className="text-xl">{user?.posts.length}</p>
            <p className="text-lg">게시물</p>
          </div>
          <div className="text-center">
            <p className="text-xl">{followersCount}</p>
            <p className="text-lg">팔로워</p>
          </div>
          <div className="text-center">
            <p className="text-xl">{user?.following.length}</p>
            <p className="text-lg">팔로잉</p>
          </div>
        </div>
        {isMyProfile ? (
          <div className="flex gap-[10px]">
            <Link to="/mypage/edit" className="w-full">
              <button
                type="button"
                className="primary-btn w-full py-1 rounded-lg text-sm"
              >
                프로필 수정
              </button>
            </Link>
            <Link to="/mypage/edit/password" className="w-full">
              <button
                type="button"
                className="primary-btn w-full py-1 rounded-lg text-sm"
              >
                비밀번호 변경
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex gap-[10px]">
            <button
              type="button"
              className={twMerge(
                "w-full py-1 rounded-full text-sm font-medium",
                isFollow ? "secondary-btn" : "primary-btn",
                loading && "opacity-50 cursor-not-allowed"
              )}
              onClick={isFollow ? handleUnfollow : handleFollow}
              disabled={loading}
            >
              {isFollow ? "언팔로우" : "팔로우"}
            </button>
            <button
              type="button"
              className="primary-btn w-full py-1 rounded-lg text-sm"
              onClick={handleMessage}
            >
              메세지 보내기
            </button>
          </div>
        )}
      </section>
    </article>
  );
}
